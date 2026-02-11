"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import HouseCard from "./HouseCard";
import { useRecentViewStore } from "@/app/store/recentViewStore";
import { useRecentView } from "@/shared/api/generated/property-controller/property-controller";
import { formatNumberToKoreanPrice } from "@/app/utils/format";
import { DealInfoDealType } from "@/shared/api/generated/model/dealInfoDealType";

const RecentlyViewedHouses = () => {
  const router = useRouter();
  const { viewedIds } = useRecentViewStore();
  const [isMounted, setIsMounted] = useState(false);

  // Hydration mismatch 방지
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: apiResponse, isLoading } = useRecentView(
    { propertyIds: viewedIds },
    {
      query: {
        enabled: isMounted && viewedIds.length > 0,
      },
    },
  );

  const handleHouseClick = (id: string) => {
    router.push(`/map?propertyId=${id}`);
  };

  const houses =
    apiResponse?.data?.map((item) => {
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
        name: item.apartmentName || "",
        area: `면적 ${item.supplyArea || 0}/${item.exclusiveArea || 0}m²`,
        floor: `층수 ${item.floor || 0}/${item.totalFloor || 0}층`,
        image:
          (item.imageUrl && item.imageUrl.trim() !== ""
            ? item.imageUrl
            : null) ||
          (item.propertyType === "APT"
            ? "/images/mockup/apt.svg"
            : "/images/mockup/oneroom.svg"),
      };
    }) || [];

  if (!isMounted) return null;

  return (
    <div className="flex-1 flex flex-col gap-15 w-240">
      {/* Content Card */}
      <div className="bg-white border-2 border-[#f0f0f0] rounded-xl p-15 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-7 w-full">
          <h2 className="text-[28px] font-extrabold text-gray-800 leading-normal opacity-90 m-0 p-0">
            최근 본 집
          </h2>
          <div className="h-px bg-[#D9D9D9] w-full" />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-main-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : houses.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 w-full">
            {houses.map((house) => (
              <HouseCard
                key={house.id}
                {...house}
                variant="navigation"
                onClick={handleHouseClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-[18px]">최근 본 매물이 없습니다.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {houses.length > 0 && (
        <div className="flex items-center justify-center gap-4 py-10 w-full">
          <div className="flex items-center gap-1.5">
            <ChevronsLeft
              className="text-gray-300 cursor-pointer hover:text-gray-500"
              size={20}
            />
            <ChevronLeft
              className="text-gray-300 cursor-pointer hover:text-gray-500"
              size={20}
            />
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[18px] font-bold text-black border-b-2 border-transparent cursor-pointer">
              1
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChevronRight
              className="text-gray-400 cursor-pointer hover:text-black"
              size={20}
            />
            <ChevronsRight
              className="text-gray-400 cursor-pointer hover:text-black"
              size={20}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewedHouses;
