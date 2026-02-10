import React, { useEffect } from "react";
import Image from "next/image";
import { useModuleStore } from "@/app/store/moduleStore";
import { useMapModeStore } from "@/app/store/mapModeStore";
import {
  useGetSmartPole,
  useGetNearbyNoise,
} from "@/shared/api/generated/noise-controller/noise-controller";
import { NearbyNoiseData } from "@/app/types/nearby-noise";
import { MapItem } from "@/app/components/map/MapOverlays";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NoiseModule = () => {
  const { activeModules, toggleModule } = useModuleStore();
  const {
    selectedProperty,
    debouncedTime,
    setNoiseInfras,
    setPopulationInfras,
    clearNoiseInfras,
    clearPopulationInfras,
    setDistrictAvgNoise,
    setDistrictAvgPopulation,
    setNearbyNoiseInfras,
    clearNearbyNoiseInfras,
  } = useMapModeStore();
  const isActive = activeModules.includes("noise");
  const score = selectedProperty?.propertyScores?.noiseScore || 0;

  const { data: smartPoleData } = useGetSmartPole(
    {
      propertyId: selectedProperty?.id,
      time: Math.floor(debouncedTime),
      distance: 3000,
      weekend: true,
    } as unknown as Parameters<typeof useGetSmartPole>[0],
    {
      query: {
        enabled: !!selectedProperty?.id && isActive,
      },
    },
  );

  const { data: nearbyNoiseData } = useGetNearbyNoise(
    {
      propertyId: Number(selectedProperty?.id),
      distance: 2000,
    },
    {
      query: {
        enabled: !!selectedProperty?.id && isActive,
      },
    },
  );

  useEffect(() => {
    if (isActive && smartPoleData?.data?.noise?.items) {
      setNoiseInfras(smartPoleData.data.noise.items);
      if (smartPoleData.data.noise.districtAvgNoise !== undefined) {
        setDistrictAvgNoise(smartPoleData.data.noise.districtAvgNoise);
      }
    } else if (!isActive) {
      clearNoiseInfras();
    }
  }, [
    isActive,
    smartPoleData,
    setNoiseInfras,
    clearNoiseInfras,
    setDistrictAvgNoise,
  ]);

  useEffect(() => {
    if (isActive && smartPoleData?.data?.population?.items) {
      setPopulationInfras(smartPoleData.data.population.items);
      if (smartPoleData.data.population.districtAvgPopulation !== undefined) {
        setDistrictAvgPopulation(
          smartPoleData.data.population.districtAvgPopulation,
        );
      }
    } else if (!isActive) {
      clearPopulationInfras();
    }
  }, [
    isActive,
    smartPoleData,
    setPopulationInfras,
    clearPopulationInfras,
    setDistrictAvgPopulation,
  ]);

  useEffect(() => {
    const data = nearbyNoiseData?.data as unknown as NearbyNoiseData;
    if (isActive && data?.items) {
      setNearbyNoiseInfras(data.items);
    } else if (!isActive) {
      clearNearbyNoiseInfras();
    }
  }, [isActive, nearbyNoiseData, setNearbyNoiseInfras, clearNearbyNoiseInfras]);

  const noiseInfo = smartPoleData?.data?.noise;
  const populationInfo = smartPoleData?.data?.population;

  // 도보 시간 계산 (표준: 80m/min)
  const calculateWalkTime = (meters?: number) => {
    if (meters === undefined) return "-";
    const minutes = Math.ceil(meters / 80);
    return `도보 ${minutes}분`;
  };

  const { nearbyNoiseInfras } = useMapModeStore();

  const nearestFireStation = nearbyNoiseInfras
    .filter((item) => item.noiseType === "FIRE_STATION")
    .sort((a, b) => a.distanceMeter - b.distanceMeter)[0];

  const nearestHospital = nearbyNoiseInfras
    .filter((item) => item.noiseType === "EMERGENCY_CENTER")
    .sort((a, b) => a.distanceMeter - b.distanceMeter)[0];

  const nearestConstruction = nearbyNoiseInfras
    .filter((item) => item.noiseType === "CONSTRUCTION")
    .sort((a, b) => a.distanceMeter - b.distanceMeter)[0];

  const nearbyMapItems = [
    {
      name: "소방서",
      time: calculateWalkTime(nearestFireStation?.distanceMeter),
      icon: "/icons/module/noise/fire.svg",
      width: 14.75,
      height: 14.585,
    },
    {
      name: "대학병원",
      time: calculateWalkTime(nearestHospital?.distanceMeter),
      icon: "/icons/module/noise/hospital.svg",
      width: 16.2,
      height: 14.4,
    },
    {
      name: nearestConstruction?.name || "공사현장",
      time: calculateWalkTime(nearestConstruction?.distanceMeter),
      icon: "/icons/module/noise/construction.svg",
      sub: nearestConstruction?.endDate
        ? `${nearestConstruction.endDate} 종료예정`
        : undefined,
      width: 15.6,
      height: 15.63,
      truncate: true,
    },
  ];

  return (
    <div
      className={cn(
        "w-85 shrink-0 flex flex-col items-start overflow-hidden rounded-2xl border-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto transition-all duration-300",
        isActive
          ? "border-[#FBBA78] bg-[#FFEFD4]/90 backdrop-blur-[2.5px]"
          : "border-[#C4C4C4] bg-white/90 backdrop-blur-[2.5px]",
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "w-full h-14.75 flex items-center justify-between px-5 bg-white",
          isActive && "border-b border-[#FBBA78]/20",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon Badge */}
          <div
            className={cn(
              "w-7.25 h-7.25 flex items-center justify-center rounded-[5px] transition-colors duration-300",
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
            "w-9 h-5.25 rounded-[11px] border-[0.5px] flex items-center p-0.75 transition-all duration-200",
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
          isActive ? "max-h-250 opacity-100" : "max-h-0 py-0 opacity-0",
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
                  <div className="w-4.5 h-4.5 flex items-center justify-center">
                    <Image
                      src="/icons/module/safety/warning.svg"
                      width={13.5}
                      height={13.5}
                      alt="Warning"
                    />
                  </div>
                  <p className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    {noiseInfo?.overCount && noiseInfo.overCount > 0
                      ? "소음이 높은 편입니다."
                      : "소음이 낮은 편입니다."}
                  </p>
                </div>
                <p className="pl-5.5 text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                  {noiseInfo?.overCount && noiseInfo.overCount > 0
                    ? `반경 3km 내의 평균소음(dB)보다 높은 구간이 ${noiseInfo.overCount}곳이 있습니다.`
                    : `반경 3km 내의 평균소음(dB)보다 높은 구간이 없습니다.`}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-4.5 h-4.5 flex items-center justify-center">
                    <Image
                      src="/icons/module/safety/warning.svg"
                      width={13.5}
                      height={13.5}
                      alt="Warning"
                    />
                  </div>
                  <p className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    {populationInfo?.overCount && populationInfo.overCount > 0
                      ? "유동인구가 많은 편입니다."
                      : "유동인구가 적은 편입니다."}
                  </p>
                </div>
                <p className="pl-5.5 text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                  {populationInfo?.overCount && populationInfo.overCount > 0
                    ? `반경 3km 내의 평균 유동인구(명)보다 많은 구간이 ${populationInfo.overCount}곳이 있습니다.`
                    : `반경 3km 내의 평균 유동인구(명)보다 많은 구간이 없습니다.`}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E5E5E5] w-full" />

            {/* Stats MapItems */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-4.5 h-4.5 flex items-center justify-center">
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
                  <span className="text-[#EA8B2B]">
                    {Math.round(noiseInfo?.avgNoise || 0)}
                  </span>
                  <span className="text-[#9D9D9D]">
                    /{Math.round(noiseInfo?.districtAvgNoise || 0)}
                  </span>
                  <span className="text-[#7B7B7B]">dB</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-4.5 h-4.5 flex items-center justify-center">
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
                  <span className="text-[#EA8B2B]">
                    {Math.round(populationInfo?.avgPopulation || 0)}
                  </span>
                  <span className="text-[#9D9D9D]">
                    /{Math.round(populationInfo?.districtAvgPopulation || 0)}
                  </span>
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
            {nearestConstruction && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <div className="w-4.5 h-4.5 flex items-center justify-center">
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
                <p className="pl-5.5 text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                  {calculateWalkTime(nearestConstruction.distanceMeter)} 내 공사
                  {nearestConstruction.endDate
                    ? `(${nearestConstruction.endDate} 종료 예정)`
                    : ""}
                  으로 소음이 발생할 수 있습니다.
                </p>
              </div>
            )}

            {/* Divider */}
            {nearestConstruction && (
              <div className="h-px bg-[#E5E5E5] w-full" />
            )}

            {/* List of areas */}
            {nearbyMapItems.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <div className="w-4.5 h-4.5 shrink-0 flex items-center justify-center">
                      <Image
                        src={item.icon}
                        width={item.width}
                        height={item.height}
                        alt={item.name}
                      />
                    </div>
                    <span
                      className={cn(
                        "font-semibold text-[14px] text-black tracking-[-0.15px]",
                        item.truncate && "truncate",
                      )}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px] shrink-0">
                    {item.time}
                  </span>
                </div>
                {item.sub && (
                  <p className="pl-5.5 text-[12px] text-[#7B7B7B] tracking-[-0.15px] truncate">
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
