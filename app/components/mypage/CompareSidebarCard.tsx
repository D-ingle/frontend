"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface CompareSidebarCardProps {
  id: string;
  price: string;
  name: string;
  area: string;
  floor: string;
  image: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

const CompareSidebarCard = ({
  id,
  price,
  name,
  area,
  floor,
  image,
  isSelected,
  onToggle,
}: CompareSidebarCardProps) => {
  return (
    <div
      onClick={() => onToggle(id)}
      className={cn(
        "relative flex items-center p-[20px] rounded-[12px] border border-solid cursor-pointer transition-all duration-300 gap-[20px] w-full h-[140px] overflow-clip",
        isSelected
          ? "border-[#D9D9D9] bg-[#DEFAF2]"
          : "border-[#D9D9D9] bg-white hover:border-[#30cea1]",
      )}
    >
      {/* House Image */}
      <div className="w-[100px] h-[100px] shrink-0 relative rounded-[4px] overflow-hidden bg-white">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Info Container */}
      <div className="content-stretch flex flex-col h-[100px] items-start justify-between leading-[1.1] py-[4px] relative shrink-0 uppercase flex-1 min-w-0">
        <p className="font-['Pretendard_Variable:Bold',sans-serif] font-bold relative shrink-0 text-[20px] text-[#434343] truncate w-full">
          {price}
        </p>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 text-[13px] text-[#707070]">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
            <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold relative shrink-0">
              아파트
            </p>
            <p className="font-['Pretendard_Variable:Regular',sans-serif] font-normal relative shrink-0 truncate">
              {name.replace("아파트 ", "")}
            </p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
            <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold relative shrink-0">
              면적
            </p>
            <p className="font-['Pretendard_Variable:Regular',sans-serif] font-normal relative shrink-0">
              {area.replace("면적 ", "")}
            </p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
            <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold relative shrink-0">
              층수
            </p>
            <p className="font-['Pretendard_Variable:Regular',sans-serif] font-normal relative shrink-0">
              {floor.replace("층수 ", "")}
            </p>
          </div>
        </div>
      </div>

      {/* Selection Toggle Button */}
      <div
        className={cn(
          "shrink-0 size-[40px] rounded-full flex items-center justify-center transition-all",
          isSelected ? "bg-[#30cea1]" : "bg-white border-2 border-[#30cea1]",
        )}
      >
        {isSelected ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4V16M4 10H16"
              stroke="#30cea1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default CompareSidebarCard;
