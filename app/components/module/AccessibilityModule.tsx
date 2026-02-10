import React, { useEffect } from "react";
import Image from "next/image";
import { useModuleStore } from "@/app/store/moduleStore";
import { useMapModeStore } from "@/app/store/mapModeStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useGetTraffic } from "@/shared/api/generated/accessibility-controller/accessibility-controller";
import { useGetTMapPrediction } from "@/shared/api/generated/t-map-controller/t-map-controller";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AccessibilityModule = () => {
  const { activeModules, toggleModule } = useModuleStore();
  const {
    selectedProperty,
    setAccessibilityTraffic,
    clearAccessibilityTraffic,
    clearSelectedAccessibility,
    debouncedTime,
  } = useMapModeStore();
  const isActive = activeModules.includes("accessibility");

  // 편의성 종합 점수 API 연동
  const { data: trafficData } = useGetTraffic(
    { propertyId: selectedProperty?.id || 0 },
    {
      query: {
        enabled: isActive && !!selectedProperty?.id,
      },
    },
  );

  // 주요 목적지 소요시간 API 연동 (T-Map Prediction)
  const formatPredictionTime = (t: number) => {
    const today = new Date(); // 현재 날짜 동적 적용
    const hours = Math.floor(t);
    const minutes = Math.round((t - hours) * 60);

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hh}:${mm}:00+0900`;
  };

  const { data: predictionData } = useGetTMapPrediction(
    {
      propertyId: selectedProperty?.id || 0,
      predictionTime: formatPredictionTime(debouncedTime),
    },
    {
      query: {
        enabled: isActive && !!selectedProperty?.id,
      },
    },
  );

  const tmapInfo = predictionData?.data;
  const carTimeMinutes = tmapInfo?.totalTime
    ? Math.floor(tmapInfo.totalTime / 60)
    : 0;
  const carDistanceKm = tmapInfo?.totalDistance
    ? (tmapInfo.totalDistance / 1000).toFixed(1)
    : "0";

  // 대중교통 시간 추정 (자동차 시간 기준 1.6배 + 대기시간 10분)
  const transitTimeMinutes = carTimeMinutes
    ? Math.floor(carTimeMinutes * 1.6 + 10)
    : 0;

  const trafficInfo = trafficData?.data;
  const score =
    trafficInfo?.accessibilityScore ??
    selectedProperty?.propertyScores?.accessibilityScore ??
    0;

  // 교통 정보를 지도 스토어에 동기화
  useEffect(() => {
    if (isActive && trafficInfo) {
      setAccessibilityTraffic(
        trafficInfo.subways || [],
        trafficInfo.buses || [],
      );
    } else {
      clearAccessibilityTraffic();
      clearSelectedAccessibility();
    }
  }, [
    isActive,
    trafficInfo,
    setAccessibilityTraffic,
    clearAccessibilityTraffic,
    clearSelectedAccessibility,
  ]);

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
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
              출퇴근 예상 시간
            </h3>
            {tmapInfo && (
              <span className="text-[12px] text-[#7B7B7B] font-medium">
                약 {carDistanceKm}km
              </span>
            )}
          </div>
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
                    {transitTimeMinutes || "-"}
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
                    {carTimeMinutes || "-"}
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
            {/* Subway List */}
            {trafficInfo?.subways?.map((subway, idx) => (
              <div key={`subway-${idx}`} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-[18px] h-[18px] flex items-center justify-center">
                      <Image
                        src="/icons/module/accessibility/train.svg"
                        width={12}
                        height={15}
                        alt="Subway"
                      />
                    </div>
                    <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                      {subway.name}
                    </span>
                  </div>
                  <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                    {subway.distance}m
                  </span>
                </div>
                {/* 
                  API 명세상 출구 정보 등 추가 설명 필드가 현재 없으므로, 
                  기존의 가짜 텍스트 대신 깔끔하게 이름만 노출합니다.
                */}
              </div>
            ))}

            {/* Bus List */}
            {trafficInfo?.buses?.map((bus, idx) => (
              <div key={`bus-${idx}`} className="flex flex-col gap-1.5">
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
                      {bus.name}
                    </span>
                  </div>
                  <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                    {bus.distance}m
                  </span>
                </div>
                {bus.busNumber && bus.busNumber.length > 0 && (
                  <p className="pl-[22px] text-[12px] text-[#7B7B7B] tracking-[-0.15px] leading-tight">
                    {bus.busNumber.join(", ")}
                  </p>
                )}
              </div>
            ))}

            {!trafficInfo?.subways?.length && !trafficInfo?.buses?.length && (
              <p className="text-center text-[14px] text-[#7B7B7B] py-4">
                주변 교통 정보가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityModule;
