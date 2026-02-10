"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface RecentHouseCardProps {
  id: number;
  image: string;
  price: string;
  name: string;
  type: string;
  area: string;
  floor: string;
  tags: string[];
  district?: string;
  onClick?: (id: number) => void;
}

const RecentHouseCard = ({
  id,
  image,
  price,
  name,
  type,
  area,
  floor,
  tags,
  district = "서울시 중구",
  onClick,
}: RecentHouseCardProps) => {
  return (
    <div
      onClick={() => onClick?.(id)}
      className="bg-white border border-[#D9D9D9] flex flex-col items-start overflow-hidden relative rounded-xl w-full hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full h-50 shrink-0">
        <Image src={image} alt={name} fill className="object-cover" />
        {/* Location Badge */}
        <div className="absolute top-4 left-4.5 h-8 px-3 bg-black/40 border border-white/20 rounded-full flex items-center justify-center gap-1 z-10">
          <Image
            src="/icons/common/marker.svg"
            alt="marker"
            width={12}
            height={16}
            className="brightness-0 invert"
          />
          <p className="text-white text-[12px] font-medium font-sans">{area}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white flex flex-col gap-3 p-5 w-full flex-1">
        <p className="text-[20px] font-bold text-[#434343] leading-[1.1] uppercase">
          {price}
        </p>
        <div className="flex flex-col gap-1 items-start w-full">
          <p className="text-[13px] text-[#707070] font-normal leading-[1.1] uppercase">
            {name}
          </p>
          <div className="flex items-center w-full">
            <p className="text-[13px] text-[#707070] font-normal leading-[1.1] uppercase">
              {type}, {floor}, {area}
            </p>
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex gap-1.5 items-start mt-auto">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className={cn(
                "border border-solid flex items-center justify-center px-2 py-1 rounded-full min-w-11.25",
                tag === "소음"
                  ? "border-[#FBBA78] text-[#FBBA78] bg-[#FFFCF6]"
                  : tag === "접근성"
                    ? "border-[#7CB7CD] text-[#7CB7CD] bg-[#F7FCFE]"
                    : tag === "안전"
                      ? "border-[#F48787] text-[#F48787] bg-[#FFF7F7]"
                      : tag === "편의"
                        ? "border-[#AB9FD5] text-[#AB9FD5] bg-[#FAF9FD]"
                        : "border-[#82AA82] text-[#82AA82] bg-[#F8FCF8]",
              )}
            >
              <span className="text-[12px] font-medium leading-[1.1]">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentHouseCard;
