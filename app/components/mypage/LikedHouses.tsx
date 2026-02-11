"use client";

import React, { useState } from "react";
import { cn } from "@/app/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useRouter } from "next/navigation";
import HouseCard from "./HouseCard";
import { useLikeList } from "@/shared/api/generated/property-controller/property-controller";
import { formatNumberToKoreanPrice } from "@/app/utils/format";
import { DealInfoDealType } from "@/shared/api/generated/model/dealInfoDealType";

const LikedHouses = () => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const { data: apiResponse, isLoading } = useLikeList();

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedIds.length > 0) {
      router.push(`/compare?ids=${selectedIds.join(",")}`);
    }
  };

  const handleToggleMode = () => {
    setIsSelectionMode((prev) => !prev);
    if (isSelectionMode) {
      setSelectedIds([]); // 모드 해제 시 선택 초기화
    }
  };

  const handlesNavigation = (id: string) => {
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

  return (
    <div className="flex-1 flex flex-col gap-15 w-240">
      {/* Content Card */}
      <div className="bg-white border-2 border-[#f0f0f0] rounded-xl p-15 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-7 w-full">
          <h2 className="text-[28px] font-extrabold text-gray-800 leading-normal opacity-90 m-0 p-0">
            찜한 집
          </h2>
          <div className="h-px bg-[#D9D9D9] w-full" />
        </div>

        {/* Action Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-baseline gap-2.5">
            <h3 className="text-[24px] font-bold text-black">
              내 매물 비교하기
            </h3>
            {isSelectionMode && (
              <span className="text-[14px] text-gray-400 font-medium">
                최대 3개 선택가능
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {isSelectionMode ? (
              <>
                <button
                  onClick={handleToggleMode}
                  className="px-6 py-2 rounded-full text-[16px] font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  비교 취소하기
                </button>
                <button
                  onClick={handleCompare}
                  disabled={selectedIds.length === 0}
                  className={cn(
                    "px-6 py-2 rounded-full text-[16px] font-bold transition-all",
                    selectedIds.length > 0
                      ? "bg-main-400 text-white shadow-sm hover:opacity-90"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed",
                  )}
                >
                  {selectedIds.length > 0
                    ? `${selectedIds.length}개 선택 비교하기`
                    : "비교하기"}
                </button>
              </>
            ) : (
              <button
                onClick={handleToggleMode}
                className="px-6 py-2 rounded-full text-[16px] font-bold bg-main-400 text-white shadow-sm hover:opacity-90 transition-all"
              >
                비교할 매물 선택하기
              </button>
            )}
          </div>
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
                variant={isSelectionMode ? "checkbox" : "navigation"}
                isSelected={isSelectionMode && selectedIds.includes(house.id)}
                onSelect={isSelectionMode ? toggleSelection : undefined}
                onClick={!isSelectionMode ? handlesNavigation : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-[18px]">찜한 매물이 없습니다.</p>
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

export default LikedHouses;
