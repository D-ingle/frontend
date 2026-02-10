import React from "react";
import Image from "next/image";
import { useModuleStore } from "@/app/store/moduleStore";
import { useMapModeStore } from "@/app/store/mapModeStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AccessibilityModule = () => {
  const { activeModules, toggleModule } = useModuleStore();
  const { selectedProperty } = useMapModeStore();
  const isActive = activeModules.includes("accessibility");
  const score = selectedProperty?.propertyScores?.accessibilityScore || 0;

  return (
    <div
      className={cn(
        "w-[340px] shrink-0 flex flex-col items-start overflow-hidden rounded-[16px] border-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto transition-all duration-300",
        isActive
          ? "border-[#7CB7CD] bg-[#D6EFF8]/90 backdrop-blur-[2.5px]"
          : "border-[#C4C4C4] bg-white/90 backdrop-blur-[2.5px]",
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "w-full h-[59px] flex items-center justify-between px-5 bg-white",
          isActive && "border-b border-[#7CB7CD]/20",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon Badge */}
          <div
            className={cn(
              "w-[29px] h-[29px] flex items-center justify-center rounded-[5px] transition-colors duration-300",
              isActive ? "bg-[#7CB7CD]" : "bg-[#9D9D9D]",
            )}
          >
            <Image
              src="/icons/module/accessibility/whitetrain.svg"
              width={12.67}
              height={15.83}
              alt="Accessibility"
            />
          </div>
          <span className="font-semibold text-[18px] text-black tracking-[-0.15px]">
            접근성 정보
          </span>
          <span
            className={cn(
              "font-semibold text-[18px] tracking-[-0.15px] transition-colors duration-300",
              isActive ? "text-[#0192C8]" : "text-[#555555]",
            )}
          >
            {score}점
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => toggleModule("accessibility")}
          className={cn(
            "w-[36px] h-[21px] rounded-[11px] border-[0.5px] flex items-center p-[3px] transition-all duration-200",
            isActive
              ? "bg-[#7CB7CD] border-[#7CB7CD] justify-end"
              : "bg-gray-200 border-gray-300 justify-start",
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
        {/* Estimated Commute Time */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            출퇴근 예상 시간
          </h3>
          <div className="flex gap-1.5 flex-1">
            {/* Transport Card */}
            <div className="flex-1 min-w-0 bg-white border-[1.5px] border-[#7CB7CD] rounded-lg p-3 pt-4 flex flex-col gap-10">
              <div className="flex items-center gap-1">
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <Image
                    src="/icons/module/accessibility/train.svg"
                    width={12}
                    height={15}
                    alt="Transit"
                  />
                </div>
                <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                  대중교통
                </span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <span className="font-semibold text-[14px] text-gray-900 tracking-[-0.15px] opacity-70">
                  평균
                </span>
                <div className="flex items-baseline">
                  <span className="font-semibold text-[24px] text-[#0192C8]">
                    49
                  </span>
                  <span className="font-semibold text-[24px] text-black">
                    분
                  </span>
                </div>
              </div>
            </div>

            {/* Car Card */}
            <div className="flex-1 min-w-0 bg-white border-[1.5px] border-[#7CB7CD] rounded-lg p-3 pt-4 flex flex-col gap-10">
              <div className="flex items-center gap-1">
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <Image
                    src="/icons/module/accessibility/car.svg"
                    width={14.4}
                    height={12.6}
                    alt="Car"
                  />
                </div>
                <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                  자동차
                </span>
              </div>
              <div className="flex items-center justify-end gap-1">
                <span className="font-semibold text-[14px] text-gray-900 tracking-[-0.15px] opacity-70">
                  평균
                </span>
                <div className="flex items-baseline">
                  <span className="font-semibold text-[24px] text-[#0192C8]">
                    27
                  </span>
                  <span className="font-semibold text-[24px] text-black">
                    분
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Transport */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            근처 지하철역 및 버스 정류장
          </h3>
          <div className="bg-white border-[1.5px] border-[#7CB7CD] rounded-lg p-4 py-5 flex flex-col gap-4">
            {/* Subway Item */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/accessibility/train.svg"
                      width={12}
                      height={15}
                      alt="Transit"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    4호선 명동역
                  </span>
                </div>
                <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                  100m
                </span>
              </div>
              <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px] truncate">
                에스컬레이터 : 3, 5, 6번 출구
              </p>
            </div>

            {/* Bus Item */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/accessibility/bus.svg"
                      width={15}
                      height={15}
                      alt="Bus"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    남산 3호터널 입구
                  </span>
                </div>
                <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                  500m
                </span>
              </div>
              <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                101, 2034, 2939, 123, 403, 20439
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityModule;
