"use client";

import React, { useEffect, useState } from "react";
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

import { Suspense } from "react";

// Shared interfaces for simplicity in this file
// ... House interface was here ...
// ... MOCK_HOUSES, MOCK_CURATION, MOCK_BASIC_INFO were here ...

const ComparePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");
  const initialIds = idsParam ? idsParam.split(",") : [];

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

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
      location: compareItem?.address || "ggdd", // CompareList에 주소가 있음
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

    return {
      summary: curationInfo?.description || "큐레이션 분석 중입니다...",
      tags: ["안전", "편의"] as (
        | "소음"
        | "안전"
        | "접근성"
        | "편의"
        | "환경"
      )[], // 백엔드에서 제공하지 않으므로 기본태그
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
      <div className="flex-1">
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
