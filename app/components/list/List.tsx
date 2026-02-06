"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ListItem from "./ListItem";
import ListDetail from "./ListDetail";
import ContactModal from "./list_section/detail/ContactModal";

import { useEffect } from "react";
import PriorityToggle from "../ui/PriorityToggle";
import { useUserStore } from "@/app/store/userStore";
import { useModuleStore, ModuleId } from "@/app/store/moduleStore";
import { useGetMainProperty } from "@/shared/api/generated/main-property-controller/main-property-controller";
import { GetMainPropertyPropertyType } from "@/shared/api/generated/model/getMainPropertyPropertyType";
import { DealInfoDealType } from "@/shared/api/generated/model/dealInfoDealType";
import { formatPrice, formatNumberToKoreanPrice } from "@/app/utils/format";

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

const List = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const { user } = useUserStore();
  const { activeModules, toggleModule } = useModuleStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const { data: apiResponse, isLoading } = useGetMainProperty(
    {
      select: user?.preferredConditions || [],
      propertyType:
        (user?.preferredType as GetMainPropertyPropertyType) ||
        GetMainPropertyPropertyType.APT,
      size: 10,
    },
    {
      query: {
        enabled: !!user && hasMounted,
      },
    },
  );

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

      return {
        id: item.propertyId || 0,
        rank: index + 1,
        image: item.imageUrl || "/images/mockup/item.png",
        price: priceStr,
        name: item.apartmentName || "",
        type: PROPERTY_TYPE_MAP[item.propertyType || ""] || "아파트",
        area: `${item.supplyArea || 0}/${item.exclusiveArea || 0}m²`,
        floor: `${item.floor || 0}/${item.totalFloor || 0}층`,
        tags: (item.conditions || []).map((c) => CONDITION_MAP[c] || ""),
        isLiked: item.liked,
      };
    }) || [];

  const handleReset = () => {
    // 모든 활성 모듈 해제
    activeModules.forEach((id) => toggleModule(id));
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
                  {username || "딩글"}
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
          <div className="flex items-center gap-2 p-4 bg-[#F8FAFB] rounded-xl">
            <Image
              src="/icons/feature/list/quotation.svg"
              alt="Quotation"
              width={20}
              height={20}
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
                onClick={(id) => setSelectedId(id)}
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
