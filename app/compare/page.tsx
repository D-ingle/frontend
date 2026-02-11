"use client";

import React, { useState } from "react";
import CompareSidebar from "../components/mypage/CompareSidebar";
import CompareMain from "../components/mypage/CompareMain";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useRecentView,
  useCompareList,
} from "@/shared/api/generated/property-controller/property-controller";
import { getCurateQueryOptions } from "@/shared/api/generated/personalized-curation-controller/personalized-curation-controller";
import { useQueries } from "@tanstack/react-query";
import { DealInfoDealType } from "@/shared/api/generated/model/dealInfoDealType";
import { formatNumberToKoreanPrice } from "@/app/utils/format";
import { useUserStore } from "@/app/store/userStore";

import { Suspense } from "react";

// Shared interfaces for simplicity in this file
// ... House interface was here ...
// ... MOCK_HOUSES, MOCK_CURATION, MOCK_BASIC_INFO were here ...

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

const ComparePageContent = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");
  const initialIds = idsParam ? idsParam.split(",") : [];

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // 비교 대상(selectedIds)이 변경될 때마다 잠금 상태 초기화
  React.useEffect(() => {
    setIsUnlocked(false);
  }, [selectedIds]);

  // 2. 상단 카드용 기본 정보 (RecentView API 재사용)
  const { data: recentViewResponse, isLoading: isRecentLoading } =
    useRecentView({
      propertyIds: selectedIds.map(Number),
    });

  // 3. 기술 상세 정보 및 점수 조회
  const { data: compareResponse, isLoading: isCompareLoading } = useCompareList(
    {
      propertyIds: selectedIds.map(Number),
    },
  );

  // 4. AI 큐레이션 개별 조회 (ID별로 개별 쿼리 실행)
  const curationQueries = useQueries({
    queries: selectedIds.map((id) => getCurateQueryOptions(Number(id))),
  });

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((item) => item !== id);
        // URL 업데이트 (동기화)
        const params = new URLSearchParams(searchParams);
        if (next.length > 0) {
          params.set("ids", next.join(","));
        } else {
          params.delete("ids");
        }
        router.replace(`/compare?${params.toString()}`);
        return next;
      }
      if (prev.length < 3) {
        const next = [...prev, id];
        const params = new URLSearchParams(searchParams);
        params.set("ids", next.join(","));
        router.replace(`/compare?${params.toString()}`);
        return next;
      }
      return prev;
    });
  };

  // 데이터 매핑: selectedHouses (상단 카드)
  const selectedHouses = [0, 1, 2].map((_, index) => {
    const id = selectedIds[index];
    if (!id) return null;

    const item = recentViewResponse?.data?.find(
      (h) => String(h.propertyId) === id,
    );

    const compareItem = compareResponse?.data?.find(
      (h) => String(h.propertyId) === id,
    );

    if (!item) return null;

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
      id: String(item.propertyId),
      price: priceStr,
      name: item.apartmentName || "정보 없음",
      area: `면적 ${item.supplyArea || 0}/${item.exclusiveArea || 0}m²`,
      floor: `층수 ${item.floor || 0}/${item.totalFloor || 0}층`,
      image: item.imageUrl || "/images/mockup/item.png",
      location: compareItem?.address || "정보 없음",
      type: item.propertyType
        ? PROPERTY_TYPE_MAP[item.propertyType]
        : "정보 없음",
    };
  });

  // 데이터 매핑: curationData
  const curationData = [0, 1, 2].map((_, index) => {
    const id = selectedIds[index];
    if (!id) return null;

    const compareInfo = compareResponse?.data?.find(
      (c) => String(c.propertyId) === id,
    );
    const curationInfo = curationQueries[index]?.data?.data;

    // 점수 정보를 배열로 변환하여 정렬
    const allScores = [
      { label: "소음", score: compareInfo?.noiseScore || 0 },
      { label: "환경", score: compareInfo?.environmentScore || 0 },
      { label: "안전", score: compareInfo?.safetyScore || 0 },
      { label: "접근성", score: compareInfo?.accessibilityScore || 0 },
      { label: "편의", score: compareInfo?.convenienceScore || 0 },
    ];

    // 점수 높은 순으로 상위 5개 추출
    const top5Strengths = allScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((s) => s.label);

    // 사용자의 선호 조건 (한글 명칭으로 변환)
    const userPrefs =
      user?.preferredConditions?.map((c) => CONDITION_MAP[c]) || [];

    // 매물의 강점(상위 5개)과 사용자의 선호 조건의 교집합 필터링
    const personalizedTags = top5Strengths.filter((tag) =>
      userPrefs.includes(tag),
    ) as ("소음" | "안전" | "접근성" | "편의" | "환경")[];

    return {
      summary: curationInfo?.description || "분석 중...",
      tags: personalizedTags,
      isAiLoading: curationQueries[index]?.isLoading,
      scores: {
        소음: compareInfo?.noiseScore || 0,
        환경: compareInfo?.environmentScore || 0,
        안전: compareInfo?.safetyScore || 0,
        편의: compareInfo?.convenienceScore || 0,
        접근성: compareInfo?.accessibilityScore || 0,
      },
    };
  });

  // 데이터 매핑: basicInfo
  const basicInfo = [0, 1, 2].map((_, index) => {
    const id = selectedIds[index];
    if (!id) return null;

    const recentInfo = recentViewResponse?.data?.find(
      (h) => String(h.propertyId) === id,
    );
    const compareInfo = compareResponse?.data?.find(
      (c) => String(c.propertyId) === id,
    );

    if (!recentInfo) return null;

    return {
      건물명: recentInfo.apartmentName || "",
      주소: compareInfo?.address || "정보 없음",
      매물형태: "아파트", // PropertyListDTO lacks this formatted
      면적: `${recentInfo.supplyArea || 0}m²/${recentInfo.exclusiveArea || 0}m²`,
      층수: `${recentInfo.floor || 0}층`,
      배당층_총층수: `${recentInfo.floor || 0}층 / ${recentInfo.totalFloor || 0}층`,
      방향: compareInfo?.orientation || "정보 없음",
      주차: compareInfo?.parkingRatio
        ? `세대당 ${compareInfo.parkingRatio}대`
        : "정보 없음",
    };
  });

  const isLoading = isRecentLoading || isCompareLoading;

  return (
    <div className="flex w-full h-full bg-white mt-20">
      <CompareSidebar
        selectedIds={selectedIds}
        onToggle={toggleSelection}
        userName="딩글"
      />
      <div className="flex-1 relative overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-main-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <CompareMain
            selectedHouses={selectedHouses}
            curationData={curationData}
            basicInfo={basicInfo}
            onRemove={toggleSelection}
            isUnlocked={isUnlocked}
            onUnlock={() => setIsUnlocked(true)}
          />
        )}
      </div>
    </div>
  );
};

const ComparePage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-4 border-main-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ComparePageContent />
    </Suspense>
  );
};

export default ComparePage;
