"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

interface ListItemProps {
  property: {
    id: number;
    rank?: number;
    image: string;
    price: string;
    name: string;
    type: string;
    area: string;
    floor: string;
    tags: string[];
    isLiked?: boolean;
  };
  onClick: (id: number) => void;
}

const ListItem = ({ property, onClick }: ListItemProps) => {
  return (
    <div
      onClick={() => onClick(property.id)}
      className="flex gap-4 p-5 border-b border-[#F4F4F4] cursor-pointer hover:bg-gray-50 transition-colors"
    >
      {/* Image Section */}
      <div className="relative w-40 h-40 overflow-hidden flex-none bg-gray-100 mt-auto rounded-xl">
        <Image
          src={property.image}
          alt={property.name}
          width={160}
          height={160}
          className="object-cover"
        />
        {/* Rank Badge */}
        {property.rank && (
          <div className="absolute bottom-0 left-2 w-12 h-16 pointer-events-none">
            <div className="relative w-full h-20 flex flex-col items-center pt-8">
              <Image
                src="/icons/feature/list/rank_badge.svg"
                alt="Rank Badge"
                fill
                className="object-contain"
              />
              <span className="relative z-10 text-[12px] font-bold text-white">
                {property.rank}순위
              </span>
            </div>
          </div>
        )}
        {/* Heart Icon */}
        <button
          className={`absolute top-2 right-2 p-1.5 rounded-full ${
            property.isLiked ? "text-[#30CEA1]" : "text-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            // Handle like logic here
          }}
        >
          <Heart
            className="w-5 h-5"
            fill={property.isLiked ? "currentColor" : "rgba(0,0,0,0.2)"}
            stroke={property.isLiked ? "currentColor" : "white"}
          />
        </button>
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-between h-40 flex-1 py-2">
        <div>
          <h3 className="text-[20px] font-bold text-[#000000]">
            {property.price}
          </h3>
          <p className="text-[13px] text-[#707070] mb-3">
            {property.type} · {property.name}
          </p>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-400 font-bold">면적</span>
              <span className="text-[13px] text-[#707070] font-medium">
                {property.area}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-400 font-bold">층수</span>
              <span className="text-[13px] text-[#707070] font-medium">
                {property.floor}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 mb-1">
          {property.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 text-[12px] rounded-full font-bold border ${
                tag === "소음"
                  ? "border-[#FBBA78] text-[#FBBA78] bg-[#FFFCF6]"
                  : tag === "접근성"
                    ? "border-[#7CB7CD] text-[#7CB7CD] bg-[#F7FCFE]"
                    : tag === "안전"
                      ? "border-[#F48787] text-[#F48787] bg-[#FFF7F7]"
                      : tag === "편의"
                        ? "border-[#AB9FD5] text-[#AB9FD5] bg-[#FAF9FD]"
                        : "border-[#82AA82] text-[#82AA82] bg-[#F8FCF8]"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
