"use client";

import React, { useState } from "react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SafetyModule = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMainRoadMode, setIsMainRoadMode] = useState(false);

  return (
    <div
      className={cn(
        "w-[340px] shrink-0 flex flex-col items-start overflow-hidden rounded-[16px] border-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto transition-all duration-300",
        isActive
          ? "border-[#F48787] bg-[#FFD9D9]/90 backdrop-blur-[2.5px]"
          : "border-[#C4C4C4] bg-white/90 backdrop-blur-[2.5px]",
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "w-full h-[59px] flex items-center justify-between px-5 bg-white",
          isActive && "border-b border-[#F48787]/20",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon Badge */}
          <div
            className={cn(
              "w-[29px] h-[29px] flex items-center justify-center rounded-[5px] transition-colors duration-300",
              isActive ? "bg-[#F48787]" : "bg-[#9D9D9D]",
            )}
          >
            <Image
              src="/icons/module/safety/white_cctv.svg"
              width={16}
              height={16}
              alt="Safety"
            />
          </div>
          <span className="font-semibold text-[18px] text-black tracking-[-0.15px]">
            안전 정보
          </span>
          <span
            className={cn(
              "font-semibold text-[18px] tracking-[-0.15px] transition-colors duration-300",
              isActive ? "text-[#E05353]" : "text-[#555555]",
            )}
          >
            82점
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => setIsActive(!isActive)}
          className={cn(
            "w-[36px] h-[21px] rounded-[11px] border-[0.5px] flex items-center p-[3px] transition-all duration-200",
            isActive
              ? "bg-[#F48787] border-[#F48787] justify-end"
              : "bg-[#F8FAFB] border-[#8298A8] justify-start",
          )}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
        </button>
      </div>

      {/* Contents Section */}
      <div
        className={cn(
          "w-full flex flex-col gap-5 p-5 transition-all duration-300 overflow-hidden",
          isActive ? "max-h-[1000px] opacity-100" : "max-h-0 py-0 opacity-0",
        )}
      >
        {/* Safety Alert */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            안전 알림
          </h3>
          <div className="bg-white border-[1.5px] border-[#F48787] rounded-lg p-4 py-5 flex flex-col gap-4">
            {/* Warning Item */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/module/safety/warning.svg"
                  width={18}
                  height={18}
                  alt="Warning"
                />
                <p className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                  범죄주의 구간을 지나갑니다.
                </p>
              </div>
              <div className="pl-[22px]">
                <p className="text-[12px] font-medium text-[#7B7B7B] tracking-[-0.15px] leading-[1.3] whitespace-pre-wrap">
                  경로 상에 노인 범죄주의 구간을 지나는 곳이 존재합니다.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-0 relative w-full border-t border-[#E5E5E5]" />

            {/* Stats Items */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    {isMainRoadMode ? (
                      <div className="w-2 h-2 bg-[#F48787] rounded-full shadow-[0_0_8px_#F48787]" />
                    ) : (
                      <Image
                        src="/icons/module/safety/cctv.svg"
                        width={18}
                        height={18}
                        alt="CCTV"
                      />
                    )}
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    경로 구역 내 CCTV 개수
                  </span>
                </div>
                <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                  24개
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    {isMainRoadMode ? (
                      <div className="w-2 h-2 bg-[#F48787] rounded-full shadow-[0_0_8px_#F48787]" />
                    ) : (
                      <Image
                        src="/icons/module/safety/lamp.svg"
                        width={18}
                        height={18}
                        alt="Lamp"
                      />
                    )}
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    경로 구역 내 가로등 개수
                  </span>
                </div>
                <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                  12개
                </span>
              </div>
            </div>
          </div>

          {/* Path Mode Toggle Button */}
          <button
            onClick={() => setIsMainRoadMode(!isMainRoadMode)}
            className="w-full bg-[#F48787] text-white py-4 rounded-lg font-semibold text-[16px] tracking-[-0.15px] hover:bg-[#E05353] transition-colors"
          >
            {isMainRoadMode ? "기본 경로 확인하기" : "큰길 우선 경로 확인하기"}
          </button>
        </div>

        {/* Nearby Police Stations */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            인근 경찰서 위치
          </h3>
          <div className="bg-white border-[1.5px] border-[#F48787] rounded-lg p-4 py-5 flex flex-col gap-4">
            {[
              { name: "명동파출소", time: "도보 3분" },
              { name: "서울 중부경찰서", time: "도보 15분" },
              { name: "충무파출소", time: "도보 20분" },
            ].map((station, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Image
                    src={
                      isMainRoadMode
                        ? "/icons/module/safety/police.svg"
                        : "/icons/module/safety/police.svg"
                    } // Using available icon, figma showed a star/shield version for one
                    width={18}
                    height={18}
                    alt="Police"
                  />
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    {station.name}
                  </span>
                </div>
                <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                  {station.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyModule;
