"use client";

import React from "react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FavoritePlacesModule = () => {
  return (
    <div
      className={cn(
        "w-[340px] flex flex-col items-start p-5 rounded-[16px] border-[1.5px] border-[#E5E5E5] bg-white/90 backdrop-blur-[2.5px] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto",
      )}
    >
      <div className="flex flex-col gap-3 w-full">
        <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
          자주 가는 곳
        </h3>

        <div className="bg-[#F9F9F9] rounded-[8px] p-4 py-5 flex flex-col items-start justify-center w-full">
          <div className="flex gap-1.5 items-center w-full">
            <div className="shrink-0 w-5 h-5 flex items-center justify-center mr-1">
              <Image
                src="/icons/common/mappin.svg"
                width={15}
                height={15}
                alt="Marker"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <p className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                신한 익스페이스
              </p>
              <p className="font-medium text-[13px] text-[#555555] truncate w-full">
                서울특별시 중구 명동 10길 52
              </p>
            </div>

            <button className="bg-[#063152] flex h-[25px] items-center justify-center px-2 py-1 rounded-[4px] shrink-0 hover:bg-[#0a416a] transition-colors">
              <span className="font-semibold text-[12px] text-white tracking-[-0.15px]">
                변경하기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePlacesModule;
