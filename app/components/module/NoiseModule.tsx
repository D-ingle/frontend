import React from "react";
import Image from "next/image";
import { useModuleStore } from "@/app/store/moduleStore";
import { useMapModeStore } from "@/app/store/mapModeStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NoiseModule = () => {
  const { activeModules, toggleModule } = useModuleStore();
  const { selectedProperty } = useMapModeStore();
  const isActive = activeModules.includes("noise");
  const score = selectedProperty?.propertyScores?.noiseScore || 0;

  return (
    <div
      className={cn(
        "w-[340px] shrink-0 flex flex-col items-start overflow-hidden rounded-[16px] border-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto transition-all duration-300",
        isActive
          ? "border-[#FBBA78] bg-[#FFEFD4]/90 backdrop-blur-[2.5px]"
          : "border-[#C4C4C4] bg-white/90 backdrop-blur-[2.5px]",
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "w-full h-[59px] flex items-center justify-between px-5 bg-white",
          isActive && "border-b border-[#FBBA78]/20",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon Badge */}
          <div
            className={cn(
              "w-[29px] h-[29px] flex items-center justify-center rounded-[5px] transition-colors duration-300",
              isActive ? "bg-[#FBBA78]" : "bg-[#9D9D9D]",
            )}
          >
            <Image
              src="/icons/module/noise/whitenoise.svg"
              width={17.529}
              height={15.75}
              alt="Noise"
            />
          </div>
          <span className="font-semibold text-[18px] text-black tracking-[-0.15px]">
            소음 정보
          </span>
          <span
            className={cn(
              "font-semibold text-[18px] tracking-[-0.15px] transition-colors duration-300",
              isActive ? "text-[#EA8B2B]" : "text-[#555555]",
            )}
          >
            {score}점
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => toggleModule("noise")}
          className={cn(
            "w-[36px] h-[21px] rounded-[11px] border-[0.5px] flex items-center p-[3px] transition-all duration-200",
            isActive
              ? "bg-[#FBBA78] border-[#FBBA78] justify-end"
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
        {/* Average Noise Information */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            평균 소음 정보
          </h3>
          <div className="bg-white border-[1.5px] border-[#FBBA78] rounded-lg p-4 py-5 flex flex-col gap-4">
            {/* Alerts */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/safety/warning.svg"
                      width={13.5}
                      height={13.5}
                      alt="Warning"
                    />
                  </div>
                  <p className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    소음이 높은 편입니다.
                  </p>
                </div>
                <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                  반경 500m 내의 평균소음(NdB)보다 높은 구간이 3곳이 있습니다.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/safety/warning.svg"
                      width={13.5}
                      height={13.5}
                      alt="Warning"
                    />
                  </div>
                  <p className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    유동인구가 많은 편입니다.
                  </p>
                </div>
                <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                  반경 500m 내의 평균 유동인구(N명)보다 많은 구간이 3곳이
                  있습니다.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#E5E5E5] w-full" />

            {/* Stats Items */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/noise/noise.svg"
                      width={15.025}
                      height={13.5}
                      alt="Noise"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    현재 소음/평균
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-[14px] tracking-[-0.15px]">
                  <span className="text-[#EA8B2B]">53</span>
                  <span className="text-[#9D9D9D]">/20</span>
                  <span className="text-[#7B7B7B]">dB</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/noise/crowd.svg"
                      width={15.75}
                      height={13.5}
                      alt="Crowd"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    현재 유동인구/평균
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-[14px] tracking-[-0.15px]">
                  <span className="text-[#EA8B2B]">1200</span>
                  <span className="text-[#9D9D9D]">/50</span>
                  <span className="text-[#7B7B7B]">명</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Noise Areas */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
              소음 발생 예상 구간
            </h3>
            <p className="text-[12px] text-[#7B7B7B] tracking-[-0.15px]">
              반경 500m내에 예상되는 소음 발생 구간입니다.
            </p>
          </div>
          <div className="bg-white border-[1.5px] border-[#FBBA78] rounded-lg p-4 py-5 flex flex-col gap-4">
            {/* Construction Alert */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <Image
                    src="/icons/module/safety/warning.svg"
                    width={13.5}
                    height={13.5}
                    alt="Warning"
                  />
                </div>
                <p className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                  공사 소음이 발생할 수 있습니다.
                </p>
              </div>
              <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                도보 1분 내 공사(2026.03.01 종료 예정)으로 소음이 발생할 수
                있습니다.
              </p>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#E5E5E5] w-full" />

            {/* List of areas */}
            {[
              {
                name: "소방서",
                time: "도보 4분",
                icon: "/icons/module/noise/fire.svg",
                width: 14.75,
                height: 14.585,
              },
              {
                name: "8차선 도로",
                time: "도보 7분",
                icon: "/icons/module/noise/road.svg",
                width: 14.402,
                height: 12.6,
              },
              {
                name: "대학병원",
                time: "도보 7분",
                icon: "/icons/module/noise/hospital.svg",
                width: 16.2,
                height: 14.4,
              },
              {
                name: "남산예장공원 조경 정비 공사",
                time: "도보 1분",
                icon: "/icons/module/noise/construction.svg",
                sub: "2026.03.01 종료예정",
                width: 15.6,
                height: 15.63,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-[18px] h-[18px] flex items-center justify-center">
                      <Image
                        src={item.icon}
                        width={item.width}
                        height={item.height}
                        alt={item.name}
                      />
                    </div>
                    <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                    {item.time}
                  </span>
                </div>
                {item.sub && (
                  <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px]">
                    {item.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoiseModule;
