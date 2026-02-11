"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";
import { ChevronRight } from "lucide-react";

interface HouseCardProps {
  id: string;
  price: string;
  name: string;
  area: string;
  floor: string;
  image: string;
  variant: "checkbox" | "navigation";
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onClick?: (id: string) => void;
}

const HouseCard = ({
  id,
  price,
  name,
  area,
  floor,
  image,
  variant,
  isSelected,
  onSelect,
  onClick,
}: HouseCardProps) => {
  return (
    <div
      onClick={() => (variant === "checkbox" ? onSelect?.(id) : onClick?.(id))}
      className={cn(
        "relative flex items-center p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 gap-5 shadow-sm",
        isSelected
          ? "border-main-400 bg-[#DEFAF2]"
          : "border-[#f4f4f4] bg-white hover:border-gray-200",
      )}
    >
      {/* Selection UI for Liked Houses */}

      {/* House Image */}
      <div
        className={cn(
          "w-30 h-30 shrink-0 relative rounded-md overflow-hidden bg-gray-100",
        )}
      >
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Info Container */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <p className="text-[20px] font-extrabold text-black leading-tight">
          {price}
        </p>
        <p className="text-[14px] font-bold text-gray-800 leading-tight truncate w-full">
          {name}
        </p>
        <div className="flex flex-col gap-0.5 mt-1">
          <p className="text-[12px] font-medium text-gray-500">{area}</p>
          <p className="text-[12px] font-medium text-gray-500">{floor}</p>
        </div>
      </div>

      {/* Navigation UI for Recently Viewed */}
      {variant === "navigation" && (
        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-main-400 text-main-400">
          <ChevronRight size={24} />
        </div>
      )}

      {variant === "checkbox" && (
        <div
          className={cn(
            "absolute top-16 right-5 w-7 h-7 flex items-center justify-center rounded-sm border transition-colors",
            isSelected
              ? "bg-main-400 border-main-400"
              : "bg-white border-gray-300",
          )}
        >
          {isSelected && (
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4L4.5 7.5L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};

export default HouseCard;
