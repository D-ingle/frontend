import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ListItem from "./ListItem";
import ListDetail from "./ListDetail";

import PriorityToggle from "../ui/PriorityToggle";
import { useUserStore } from "@/app/store/userStore";
import { useModuleStore, ModuleId } from "@/app/store/moduleStore";
import { useMapModeStore } from "@/app/store/mapModeStore";
import { useGetMainProperty } from "@/shared/api/generated/main-property-controller/main-property-controller";
import { DealInfoDealType } from "@/shared/api/generated/model/dealInfoDealType";
import { formatNumberToKoreanPrice } from "@/app/utils/format";
import { usePropertyZzim } from "@/app/hooks/usePropertyZzim";
import { useRecentViewStore } from "@/app/store/recentViewStore";

const CONDITION_MAP: Record<number, string> = {
  1: "소음",
  2: "환경",
  3: "안전",
  4: "접근성",
  5: "편의",
};

const PROPERTY_TYPE_MAP: Record<string, string> = {
  ONE_ROOM: "원룸",
  APT: "아파트",
  VILLA: "빌라",
  OFFICETEL: "오피스텔",
};

import { usePropertyStore } from "@/app/store/propertyStore";

import { useSearchProperty } from "@/shared/api/generated/main-property-controller/main-property-controller";
import { PropertySearchRequestDTODealType } from "@/shared/api/generated/model/propertySearchRequestDTODealType";
import { PropertySearchRequestDTOPropertyType } from "@/shared/api/generated/model/propertySearchRequestDTOPropertyType";

const mIdMap: Record<ModuleId, number> = {
  noise: 1,
  environment: 2,
  safety: 3,
  accessibility: 4,
  convenience: 5,
};

const List = () => {
  const { selectedId, setSelectedId, clearSelectedProperty } =
    useMapModeStore();
  const [hasMounted, setHasMounted] = useState(false);

  const { user } = useUserStore();
  const { activeModules, toggleModule, resetToUserPreference } =
    useModuleStore();
  const { toggleZzim } = usePropertyZzim();
  const { addViewedId } = useRecentViewStore();
  const {
    selectedPropertyType,
    keyword,
    selectedTypes,
    depositRange,
    monthlyRentRange,
    salePriceRange,
    spaceRange,
    resetFilters,
  } = usePropertyStore();

  const { setPropertiesOnMap } = useMapModeStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const searchParams = useSearchParams();

  // URL 파라미터로 propertyId가 넘어오면 자동으로 상세창 열기
  useEffect(() => {
    if (hasMounted) {
      const propertyIdParam = searchParams.get("propertyId");
      if (propertyIdParam) {
        // Cascading render 방지를 위해 비동기 처리
        setTimeout(() => {
          setSelectedId(Number(propertyIdParam));
        }, 0);
      }
    }
  }, [hasMounted, searchParams, setSelectedId]);

  // 현재 활성화된 모듈이 사용자의 기본 선호도와 다른지 확인
  const isPriorityChanged = () => {
    const activeIds = activeModules.map((m) => mIdMap[m]).sort();
    const preferredIds = [...(user?.preferredConditions || [])].sort();
    return JSON.stringify(activeIds) !== JSON.stringify(preferredIds);
  };

  const firstRenderRef = useRef(true);

  // 필터가 변경되면 상세창을 닫습니다. (주거 형태 포함)
  useEffect(() => {
    // 첫 렌더링(마운트) 시에는 URL 파라미터로 열릴 수도 있으므로 건너뜁니다.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    // Cascading render 방지를 위해 비동기 처리
    setTimeout(() => {
      clearSelectedProperty();
    }, 0);
  }, [
    keyword,
    selectedTypes,
    depositRange,
    monthlyRentRange,
    salePriceRange,
    spaceRange,
    activeModules,
    selectedPropertyType,
    clearSelectedProperty,
  ]);

  // 필터가 하나라도 적용되었는지 확인 (주거 형태 필터 제외, 우선순위 변경 포함)
  const isFilterActive =
    keyword.trim() !== "" ||
    selectedTypes.length > 0 ||
    spaceRange[0] !== 0 ||
    spaceRange[1] !== 60 ||
    isPriorityChanged();

  // 요청할 우선순위 조건 생성 (검색 모드에서는 현재 활성화된 것만 전송)
  const getSelectConditions = () => {
    return activeModules.map((m) => mIdMap[m]).slice(0, 5);
  };

  // 메인 매물 조회 (기본 추천 - 선호도 기반)
  const mainPropertyQuery = useGetMainProperty(
    {
      select: (user?.preferredConditions || []).slice(0, 5),
      propertyType: selectedPropertyType,
      size: 30,
    },
    {
      query: {
        enabled: !!user && hasMounted && !isFilterActive,
      },
    },
  );

  // 매물 검색 조회 (필터/키워드 적용 시)
  const searchPropertyQuery = useSearchProperty(
    {
      requestDTO: {
        keyword: keyword || undefined,
        propertyType:
          selectedPropertyType as PropertySearchRequestDTOPropertyType,
        dealType: selectedTypes.includes("매매")
          ? PropertySearchRequestDTODealType.SALE
          : selectedTypes.includes("전세")
            ? PropertySearchRequestDTODealType.LEASE
            : selectedTypes.includes("월세")
              ? PropertySearchRequestDTODealType.RENT
              : undefined,
        minDeposit: selectedTypes.some((t) => ["월세", "전세"].includes(t))
          ? depositRange[0]
          : undefined,
        maxDeposit: selectedTypes.some((t) => ["월세", "전세"].includes(t))
          ? depositRange[1] >= 100000
            ? undefined
            : depositRange[1]
          : undefined,
        minMonthlyRent: selectedTypes.includes("월세")
          ? monthlyRentRange[0]
          : undefined,
        maxMonthlyRent: selectedTypes.includes("월세")
          ? monthlyRentRange[1] >= 500
            ? undefined
            : monthlyRentRange[1]
          : undefined,
        minPrice: selectedTypes.includes("매매")
          ? salePriceRange[0]
          : undefined,
        maxPrice: selectedTypes.includes("매매")
          ? salePriceRange[1] >= 1000000
            ? undefined
            : salePriceRange[1]
          : undefined,
        minExclusiveArea: spaceRange[0] * 3.3058, // 평 -> m2 변환
        maxExclusiveArea:
          spaceRange[1] >= 60 ? undefined : spaceRange[1] * 3.3058,
        selectConditions: getSelectConditions(),
        size: 30,
      },
    },
    {
      query: {
        enabled: !!user && hasMounted && isFilterActive,
      },
    },
  );

  const apiResponse = isFilterActive
    ? searchPropertyQuery.data
    : mainPropertyQuery.data;
  const isLoading = isFilterActive
    ? searchPropertyQuery.isLoading
    : mainPropertyQuery.isLoading;

  // 현재 리스트의 매물들을 지도에 표시하기 위해 동기화
  useEffect(() => {
    if (apiResponse?.data?.items) {
      const markers = apiResponse.data.items
        .filter((item) => item.latitude && item.longitude)
        .map((item) => {
          let priceStr = "";
          let dealLabel = "";
          const deal = item.dealInfo;
          if (deal?.dealType === DealInfoDealType.RENT) {
            priceStr = `${deal.deposit}/${deal.monthlyRent}`;
            dealLabel = "월세";
          } else if (deal?.dealType === DealInfoDealType.LEASE) {
            priceStr = formatNumberToKoreanPrice(deal.price || 0);
            dealLabel = "전세";
          } else if (deal?.dealType === DealInfoDealType.SALE) {
            priceStr = formatNumberToKoreanPrice(deal.price || 0);
            dealLabel = "매매";
          }

          return {
            id: item.propertyId || 0,
            lat: item.latitude!,
            lng: item.longitude!,
            title: item.apartmentName || "",
            price: priceStr,
            dealType: dealLabel,
          };
        });
      setPropertiesOnMap(markers);
    }
  }, [apiResponse, setPropertiesOnMap]);

  const houses =
    apiResponse?.data?.items?.map((item, index) => {
      let priceStr = "";
      const deal = item.dealInfo;
      if (deal?.dealType === DealInfoDealType.RENT) {
        priceStr = `월세 ${deal.deposit}/${deal.monthlyRent}`;
      } else if (deal?.dealType === DealInfoDealType.LEASE) {
        priceStr = `전세 ${formatNumberToKoreanPrice(deal.price || 0)}`;
      } else if (deal?.dealType === DealInfoDealType.SALE) {
        priceStr = `매매 ${formatNumberToKoreanPrice(deal.price || 0)}`;
      }

      const conditions = item.conditions || [];
      return {
        id: item.propertyId || 0,
        rank: index + 1,
        image:
          (item.imageUrl && item.imageUrl.trim() !== ""
            ? item.imageUrl
            : null) ||
          (item.propertyType === "APT"
            ? "/images/mockup/apt.svg"
            : "/images/mockup/oneroom.svg"),
        price: priceStr,
        name: item.apartmentName || "",
        type: PROPERTY_TYPE_MAP[item.propertyType || ""] || "아파트",
        area: `${item.supplyArea || 0}/${item.exclusiveArea || 0}m²`,
        floor: `${item.floor || 0}/${item.totalFloor || 0}층`,
        tags: conditions.map((c) => CONDITION_MAP[c] || ""),
        conditionIds: conditions,
        isLiked: item.liked,
      };
    }) || [];

  const handleReset = () => {
    // 모든 검색 필터 초기화
    resetFilters();
    // 모듈 상태를 사용자의 원래 선호도로 복구
    resetToUserPreference(user?.preferredConditions || []);
  };

  const handleTagClick = (conditionId: number) => {
    const idMap: Record<number, ModuleId> = {
      1: "noise",
      2: "environment",
      3: "safety",
      4: "accessibility",
      5: "convenience",
    };
    const moduleId = idMap[conditionId];
    if (moduleId) {
      toggleModule(moduleId);
    }
  };

  // Hydration을 방지하기 위해 마운트 전에는 뼈대만 렌더링하거나 기본값을 렌더링
  const username = hasMounted ? user?.username : "";
  const displayActiveModules = hasMounted ? activeModules : [];

  return (
    <div className="relative flex h-full no-scrollbar">
      {/* List Panel (Fixed Width, High Z-Index) */}
      <div className="relative w-100 h-full flex flex-col bg-white border-r border-[#F4F4F4] z-20 flex-none shadow-[4px_0_10px_rgba(0,0,0,0.02)] overflow-y-auto no-scrollbar">
        {/* Header: User Priorities */}
        <div className="py-8 px-5 flex-none border-b border-[#F4F4F4] bg-linear-to-b from-[#E5FAF4] via-white via-5% to-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/feature/list/curation.svg"
                alt="Sparkle"
                width={24}
                height={24}
              />
              <h2 className="text-[24px] font-bold text-[#000000]">
                <span className="bg-linear-to-r from-[#30CEA1] to-[#2EA98C] bg-clip-text text-transparent">
                  김민지
                </span>{" "}
                님의 우선순위
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Image
                src="/icons/common/reset.svg"
                alt="Reset"
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* Priority Tags Grid */}
          <div className="mb-6">
            <PriorityToggle
              selectedPriorities={displayActiveModules}
              onToggle={(id) => toggleModule(id as ModuleId)}
              variant="compact"
            />
          </div>

          {/* Tip Card */}
          <div className="flex items-center gap-2 p-4 bg-[#F8FAFB] rounded-xl border border-[#f5f5f5]">
            <Image
              src="/icons/feature/list/quotation.svg"
              alt="Quotation"
              width={15}
              height={15}
            />
            <p className="text-[12px] text-[#9D9D9D] leading-tight">
              최대 3개의 우선순위를 기반으로 딱 맞는 집을 추천해드려요.
            </p>
          </div>
        </div>

        <div className="flex-1 no-scrollbar min-h-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-10 h-10 border-4 border-[#30CEA1] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-[14px]">
                추천 매물을 불러오는 중...
              </p>
            </div>
          ) : houses.length > 0 ? (
            houses.map((property) => (
              <ListItem
                key={property.id}
                property={property}
                onClick={(id) => {
                  setSelectedId(id);
                  addViewedId(id);
                }}
                onTagClick={handleTagClick}
                onToggleZzim={toggleZzim}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 px-10 text-center">
              <p className="text-gray-400 text-[14px]">
                조건에 맞는 추천 매물이 없습니다.
              </p>
            </div>
          )}
          {/* Extra padding for list ending */}
          <div className="h-20" />
        </div>
      </div>

      {/* Detail Panel (Absolute, Slides Out from behind List) */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-100 w-100 h-full bg-white z-10 border-r border-[#E5E5E5]"
          >
            <ListDetail
              propertyId={selectedId}
              onClose={() => setSelectedId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default List;
