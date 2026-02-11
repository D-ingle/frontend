"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { MapPin } from "lucide-react";

interface CompareCardProps {
  id: string;
  price: string;
  name: string;
  floor: string;
  area: string;
  image: string;
  location: string;
  type: string;
  isEmpty?: boolean;
  onRemove?: (id: string) => void;
}

const CompareCard = ({
  id,
  price,
  name,
  floor,
  area,
  image,
  location,
  type,
  isEmpty = false,
  onRemove,
}: CompareCardProps) => {
  if (isEmpty) {
    return (
      <div className="bg-white border border-[#D9D9D9] border-solid rounded-[12px] w-[350px] h-[320px] flex items-center justify-center p-[18px]">
        <p className="font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[1.4] opacity-50 text-[16px] text-[#434343] uppercase text-center">
          비교하고 싶은 매물을 선택해주세요
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D9D9D9] border-solid rounded-[12px] w-[350px] h-[320px] overflow-visible flex flex-col relative">
      {/* Remove Button */}
      <div
        onClick={() => onRemove?.(id)}
        className="absolute -top-[20px] -right-[23px] bg-[#30cea1] size-[40px] rounded-full flex items-center justify-center cursor-pointer z-10 shadow-sm transition-transform hover:scale-110"
      >
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
      </div>

      {/* Image Area */}
      <div className="h-[200px] w-full relative rounded-t-[11px] overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover" />

        {/* Location Badge */}
        <div className="absolute top-[16px] left-[18px] bg-[rgba(0,0,0,0.4)] border border-[#E4E4E4] border-solid rounded-[30px] px-[10px] h-[32px] flex items-center justify-center gap-[2px]">
          <Image
            src="/icons/common/marker.svg"
            alt="marker"
            width={10}
            height={10}
          />
          <p className="font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[1.5] text-[12px] text-white uppercase">
            {location}
          </p>
        </div>
      </div>

      {/* Info Area */}
      <div className="bg-white flex flex-col gap-[8px] flex-1 px-[20px] py-[32px] justify-center rounded-b-[11px]">
        <p className="font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[1.1] text-[22px] text-[#434343] uppercase truncate w-full">
          {price}
        </p>
        <div className="flex flex-col gap-[4px] text-[16px] text-[#707070] uppercase">
          <div className="flex gap-[4px] items-center leading-[1.1] truncate w-full">
            <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold relative shrink-0">
              {type}
            </p>
            <p className="font-['Pretendard_Variable:Regular',sans-serif] font-normal relative shrink-0 truncate">
              {name.replace("아파트 ", "")}
            </p>
          </div>
          <p className="font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[1.1] relative shrink-0 truncate">
            {floor.replace("층수 ", "")}, {area.replace("면적 ", "")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompareCard;
