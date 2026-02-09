import React from "react";
import Image from "next/image";
import { useModuleStore } from "@/app/store/moduleStore";
import { useMapModeStore } from "@/app/store/mapModeStore";
import { useGetEnvironmentTotal } from "@/shared/api/generated/environment-controller/environment-controller";
import { useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const EnvironmentModule = () => {
  const { activeModules, toggleModule } = useModuleStore();
  const {
    selectedProperty,
    setEnvironmentInfras,
    clearEnvironmentInfras,
    clearSelectedEnvironment,
    environmentInfras,
  } = useMapModeStore();
  const isActive = activeModules.includes("environment");

  const { data: envData } = useGetEnvironmentTotal(
    {
      propertyId: selectedProperty?.id as number,
      distance: 3000,
    },
    {
      query: {
        enabled: isActive && !!selectedProperty?.id,
      },
    },
  );

  useEffect(() => {
    if (isActive && envData?.data?.items) {
      setEnvironmentInfras(envData.data.items);
    } else if (!isActive) {
      clearEnvironmentInfras();
      clearSelectedEnvironment();
    }
  }, [
    isActive,
    envData,
    setEnvironmentInfras,
    clearEnvironmentInfras,
    clearSelectedEnvironment,
  ]);

  const score =
    envData?.data?.environmentScore ||
    selectedProperty?.propertyScores?.environmentScore ||
    0;
  const pmData = envData?.data?.particulateMatter;

  // 도보 시간 계산 (표준: 80m/min)
  const calculateWalkTime = (meters?: number) => {
    if (!meters) return "-";
    const minutes = Math.ceil(meters / 80);
    return `도보 ${minutes}분`;
  };

  const nearestPark = environmentInfras
    .filter((item) => item.natureType === "PARK")
    .sort((a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0))[0];

  const nearestTrail = environmentInfras
    .filter((item) => item.natureType === "WALK")
    .sort((a, b) => (a.distanceMeters || 0) - (b.distanceMeters || 0))[0];

  const parkTime = calculateWalkTime(nearestPark?.distanceMeters);
  const trailTime = calculateWalkTime(nearestTrail?.distanceMeters);

  return (
    <div
      className={cn(
        "w-[340px] shrink-0 flex flex-col items-start overflow-hidden rounded-[16px] border-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto transition-all duration-300",
        isActive
          ? "border-[#82AA82] bg-[#DAF0DA]/90 backdrop-blur-[2.5px]"
          : "border-[#C4C4C4] bg-white/90 backdrop-blur-[2.5px]",
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "w-full h-[59px] flex items-center justify-between px-5 bg-white",
          isActive && "border-b border-[#82AA82]/20",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon Badge */}
          <div
            className={cn(
              "w-[29px] h-[29px] flex items-center justify-center rounded-[5px] transition-colors duration-300",
              isActive ? "bg-[#82AA82]" : "bg-[#9D9D9D]",
            )}
          >
            <Image
              src="/icons/module/environment/whitetree.svg"
              width={14.853}
              height={18.567}
              alt="Environment"
            />
          </div>
          <span className="font-semibold text-[18px] text-black tracking-[-0.15px]">
            환경 정보
          </span>
          <span
            className={cn(
              "font-semibold text-[18px] tracking-[-0.15px] transition-colors duration-300",
              isActive ? "text-[#29AD29]" : "text-[#555555]",
            )}
          >
            {score}점
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => toggleModule("environment")}
          className={cn(
            "w-[36px] h-[21px] rounded-[11px] border-[0.5px] flex items-center p-[3px] transition-all duration-200",
            isActive
              ? "bg-[#82AA82] border-[#82AA82] justify-end"
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
          isActive ? "max-h-[1200px] opacity-100" : "max-h-0 py-0 opacity-0",
        )}
      >
        {/* Life Environment Information */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            생활 환경 정보
          </h3>
          <div className="bg-white border-[1.5px] border-[#82AA82] rounded-lg p-4 py-5 flex flex-col gap-4">
            {/* Slope Alert */}
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
                  경사도가 높은 편입니다.
                </p>
              </div>
              <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                반경 500m 내의 경사도가 12.8%로 평균값에 비해 높은 편입니다.
              </p>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#E5E5E5] w-full" />

            {/* Facilities */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/environment/dog.svg"
                      width={16.286}
                      height={12.857}
                      alt="Park"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    도심공원
                  </span>
                </div>
                <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                  {parkTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/environment/mountain.svg"
                      width={12.9}
                      height={11.143}
                      alt="Trail"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    산책로
                  </span>
                </div>
                <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                  {trailTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/environment/slope.svg"
                      width={10}
                      height={8}
                      alt="Slope"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    경사도/평균
                  </span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-[14px] tracking-[-0.15px]">
                  <span className="text-[#29AD29]">12.8</span>
                  <span className="text-[#9D9D9D]">/10</span>
                  <span className="text-[#7B7B7B]">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Facilities to Avoid */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            인근 기피시설 위치
          </h3>
          <div className="bg-white border-[1.5px] border-[#82AA82] rounded-lg p-4 py-5 flex flex-col gap-3">
            {[
              {
                name: "폐기물 수집",
                time: "-",
                icon: "/icons/module/environment/factory.svg",
                width: 15,
                height: 15,
              },
              {
                name: "하수처리장",
                time: "-",
                icon: "/icons/module/environment/factory.svg",
                width: 15,
                height: 15,
              },
              {
                name: "장례시설",
                time: "-",
                icon: "/icons/module/environment/funeral.svg",
                width: 14.571,
                height: 14.571,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
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
            ))}
          </div>
        </div>

        {/* Dust Concentration */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            미세먼지 농도
          </h3>
          <div className="flex gap-2">
            <div className="flex-1 bg-white border-[1.5px] border-[#82AA82] rounded-lg p-3 pt-4 pb-4 flex flex-col gap-8">
              <div className="flex items-center gap-1">
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <Image
                    src="/icons/module/environment/dust.svg"
                    width={14.571}
                    height={12.857}
                    alt="Dust"
                  />
                </div>
                <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                  미세먼지 농도
                </span>
              </div>
              <div className="flex items-baseline justify-end gap-1">
                <span className="font-semibold text-[14px] text-black">
                  평균
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-semibold text-[24px] text-[#29AD29]">
                    {pmData?.pm10 ?? 15}
                  </span>
                  <span className="text-[14px] font-medium text-[#7B7B7B]">
                    ㎍/㎥
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-white border-[1.5px] border-[#82AA82] rounded-lg p-3 pt-4 pb-4 flex flex-col gap-8">
              <div className="flex items-center gap-1">
                <div className="w-[18px] h-[18px] flex items-center justify-center">
                  <Image
                    src="/icons/module/environment/dust.svg"
                    width={14.571}
                    height={12.857}
                    alt="Fine Dust"
                  />
                </div>
                <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                  초미세먼지 농도
                </span>
              </div>
              <div className="flex items-baseline justify-end gap-1">
                <span className="font-semibold text-[14px] text-black">
                  평균
                </span>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-semibold text-[24px] text-[#29AD29]">
                    {pmData?.pm25 ?? 21}
                  </span>
                  <span className="text-[14px] font-medium text-[#7B7B7B]">
                    ㎍/㎥
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentModule;
