"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { formatPrice } from "@/app/utils/format";
import { useModuleStore } from "@/app/store/moduleStore";
import type { PropertyInfo } from "@/shared/api/generated/model/propertyInfo";
import type { DealInfo } from "@/shared/api/generated/model/dealInfo";
import type { PropertyImages } from "@/shared/api/generated/model/propertyImages";
import { cn } from "@/app/lib/utils";

interface SummarySectionProps {
  propertyId?: number;
  propertyInfo?: PropertyInfo;
  deal?: DealInfo;
  images?: PropertyImages;
  conditions?: number[];
  isLiked?: boolean;
  onToggleZzim?: (id: number, isLiked: boolean) => void;
}

const ORIENTATION_MAP: Record<string, string> = {
  SOUTH: "남향",
  WEST: "서향",
  EAST: "동향",
  NORTH: "북향",
  SOUTH_EAST: "남동향",
  SOUTH_WEST: "남서향",
  NORTH_EAST: "북동향",
  NORTH_WEST: "북서향",
};

const PROPERTY_TYPE_MAP: Record<string, string> = {
  APT: "아파트",
  ONE_ROOM: "원룸",
  VILLA: "빌라",
  OFFICETEL: "오피스텔",
};

const CONDITION_MAP: Record<number, string> = {
  1: "소음",
  2: "환경",
  3: "안전",
  4: "접근성",
  5: "편의",
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const SummarySection = ({
  propertyId,
  propertyInfo,
  deal,
  images,
  conditions,
  isLiked,
  onToggleZzim,
}: SummarySectionProps) => {
  const { activeModules } = useModuleStore();

  const activeModuleNames = activeModules.map((mId) => {
    switch (mId) {
      case "noise":
        return "소음";
      case "environment":
        return "환경";
      case "safety":
        return "안전";
      case "accessibility":
        return "접근성";
      case "convenience":
        return "편의";
      default:
        return "";
    }
  });

  // 매물 데이터의 전체 조건 이름 리스트 (순서 유지)
  const allConditionNames = (conditions || []).map((cId) => CONDITION_MAP[cId]);

  // 상위 5개까지 노출
  const displayConditionNames = allConditionNames.slice(0, 5);

  // 상위 3개 중 사용자의 우선순위와 일치하는 것들 (활성화 대상)
  const finalActiveNames = displayConditionNames.filter((name) =>
    activeModuleNames.includes((name || "") as any),
  );

  const priorityFactors = ["소음", "환경", "안전", "접근성", "편의"];

  const hasImages =
    images?.propertyImageUrls &&
    images.propertyImageUrls.filter((url) => url && url.trim() !== "").length >
      0;

  const placeholderImage =
    propertyInfo?.propertyType === "ONE_ROOM"
      ? "/images/mockup/oneroom.svg"
      : "/images/mockup/apt.svg";

  const imageUrls: string[] = hasImages
    ? (images.propertyImageUrls as string[])
    : [placeholderImage];

  const [[page, direction], setPage] = useState([0, 0]);
  const currentIndex = Math.abs(page % (imageUrls.length || 1));

  const paginate = (newDirection: number) => {
    if (!hasImages) return; // 이미지가 없으면 페이지 전환 불가
    setPage([page + newDirection, newDirection]);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (!hasImages) return; // 이미지가 없으면 드래그(스와이프) 불가

    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  // adjacent images for preloading
  const prevIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
  const nextIndex = (currentIndex + 1) % imageUrls.length;

  return (
    <section>
      {/* Image Section (Swiper) */}
      <div className="relative w-full h-[224px] bg-gray-200 overflow-hidden group">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 w-full h-full"
            drag={hasImages ? "x" : false} // 이미지가 있을 때만 드래그 허용
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
          >
            <Image
              src={imageUrls[currentIndex]}
              alt={
                hasImages
                  ? `Property Image ${currentIndex + 1}`
                  : "Property Placeholder"
              }
              fill
              className={cn(
                "object-cover",
                hasImages && "cursor-grab active:cursor-grabbing",
              )}
              draggable={false}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Preloading adjacent images (Hidden) */}
        {hasImages && (
          <div className="hidden">
            <Image
              src={imageUrls[prevIndex]}
              alt="preload"
              width={1}
              height={1}
            />
            <Image
              src={imageUrls[nextIndex]}
              alt="preload"
              width={1}
              height={1}
            />
          </div>
        )}

        {/* Figma Design Indicator (Backdrop Blur + Arrows) - Only show if multiple images exist */}
        {hasImages && imageUrls.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 p-2.5 bg-black/20 backdrop-blur-[2px] border border-[#e4e4e4] rounded-[30px] z-20">
            <button
              onClick={() => paginate(-1)}
              className="text-white hover:text-[#30CEA1] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <span className="font-medium text-[12px] text-white select-none whitespace-nowrap text-center">
              {currentIndex + 1} / {imageUrls.length}
            </span>

            <button
              onClick={() => paginate(1)}
              className="text-white hover:text-[#30CEA1] transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Basic Info Section */}
      <div className="px-5 py-6 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[24px] font-bold text-[#000000]">
              {formatPrice(deal)}
            </h2>
          </div>
          <button
            onClick={() => {
              if (propertyId && onToggleZzim) {
                onToggleZzim(propertyId, Boolean(isLiked));
              }
            }}
            className="cursor-pointer"
          >
            {isLiked ? (
              <Image
                src="/icons/common/like.svg"
                alt="Favorite"
                width={24}
                height={24}
              />
            ) : (
              <Image
                src="/icons/common/unlike_border.svg"
                alt="Favorite"
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
        <div className="flex gap-5 items-center mb-8">
          <p className="text-[16px] text-gray-900">
            {propertyInfo?.propertyType
              ? PROPERTY_TYPE_MAP[propertyInfo.propertyType]
              : "-"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/feature/list_detail/area.svg"
              alt="Area"
              width={12}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">면적</span>
            <span className="text-[#434343] font-medium text-[14px]">
              {propertyInfo?.supplyArea}/{propertyInfo?.exclusiveArea}m²
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/feature/list_detail/roombathroom.svg"
              alt="Area"
              width={12}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">
              방/욕실
            </span>
            <span className="text-[#434343] font-medium text-[14px]">
              {propertyInfo?.bedrooms}/{propertyInfo?.bathrooms}개
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/feature/list_detail/floor.svg"
              alt="Area"
              width={12}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">층수</span>
            <span className="text-[#434343] font-medium text-[14px]">
              {propertyInfo?.floor}/{propertyInfo?.totalFloor}층
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              src="/icons/feature/list_detail/direction.svg"
              alt="Area"
              width={14}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">방향</span>
            <span className="text-[#434343] font-medium text-[14px]">
              {propertyInfo?.orientation
                ? ORIENTATION_MAP[propertyInfo.orientation]
                : "-"}
            </span>
          </div>
        </div>

        <div className="px-5 py-4 border-[#F4F4F4] w-full h-30 bg-[#F8FAFB]">
          <div className="flex items-center gap-1 mb-1">
            <Image
              src="/icons/feature/list_detail/curation.svg"
              alt="Area"
              width={15}
              height={15}
              className="mb-1"
            />
            <span className="text-[14px] font-bold text-[#30CEA1]">
              이 집의 큐레이션 포인트
            </span>
          </div>
          <p className="text-[12px] text-gray-400 mb-5">
            컬러로 표시된 키워드는 유저 님의 관심사와 일치하는 키워드에요
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {priorityFactors.map((a, i) => {
              const isActive = finalActiveNames.includes(a);
              return (
                <span
                  key={i}
                  className={`px-3 py-1.5 text-[13px] rounded-full font-bold border transition-colors
                    ${
                      isActive
                        ? ""
                        : "text-[#9D9D9D] border-[#D9D9D9] bg-[#F5F5F5]"
                    }
                    ${isActive && a === "소음" ? "border-[#FBBA78] text-[#FBBA78] bg-[#FFFCF6]" : ""}
                    ${isActive && a === "환경" ? "border-[#82AA82] text-[#82AA82] bg-[#F8FCF8]" : ""}
                    ${isActive && a === "편의" ? "border-[#AB9FD5] text-[#AB9FD5] bg-[#FAF9FD]" : ""}
                    ${isActive && a === "안전" ? "border-[#F48787] text-[#F48787] bg-[#FFF7F7]" : ""}
                    ${isActive && a === "접근성" ? "border-[#7CB7CD] text-[#7CB7CD] bg-[#F7FCFE]" : ""}`}
                >
                  {a}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Curation Badge Section */}
    </section>
  );
};

export default SummarySection;
