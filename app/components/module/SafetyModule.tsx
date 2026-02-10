"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useModuleStore } from "@/app/store/moduleStore";
import { useMapModeStore } from "@/app/store/mapModeStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  useGetSafetyModal,
  useGetSafetyRoute,
} from "@/shared/api/generated/safety-controller/safety-controller";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SafetyModule = () => {
  const { activeModules, toggleModule } = useModuleStore();
  const {
    selectedProperty,
    setPoliceInfras,
    clearPoliceInfras,
    clearSelectedPolice,
    setSafetyRoute,
    clearSafetyRoute,
  } = useMapModeStore();
  const isActive = activeModules.includes("safety");
  const [isMainRoadMode, setIsMainRoadMode] = useState(false);
  const score = selectedProperty?.propertyScores?.safetyScore || 0;

  // 지도 안전 모달 데이터 조회
  const { data: safetyData, isLoading } = useGetSafetyModal(
    selectedProperty?.id || 0,
    {
      query: {
        enabled: isActive && !!selectedProperty?.id,
      },
    },
  );

  const safetyInfo = safetyData?.data;

  // 지하철역 경로 및 Safety 요소 조회 API 연동
  const { data: routeData } = useGetSafetyRoute(selectedProperty?.id || 0, {
    query: {
      enabled: isActive && !!selectedProperty?.id,
    },
  });

  const routeInfo = routeData?.data;

  // 경찰서 정보를 지도 마커 스토어에 동기화
  useEffect(() => {
    if (isActive && safetyInfo?.polices) {
      setPoliceInfras(safetyInfo.polices);
    } else {
      clearPoliceInfras();
      clearSelectedPolice();
    }
  }, [
    isActive,
    safetyInfo?.polices,
    setPoliceInfras,
    clearPoliceInfras,
    clearSelectedPolice,
  ]);

  // 안전 경로 및 설비 정보를 지도 스토어에 동기화
  useEffect(() => {
    if (isActive && routeInfo) {
      setSafetyRoute(
        routeInfo.path?.points || [],
        routeInfo.cctvs || [],
        routeInfo.lights || [],
      );
    } else {
      clearSafetyRoute();
    }
  }, [isActive, routeInfo, setSafetyRoute, clearSafetyRoute]);

  // 안전 알림 메시지 생성 로직
  const getAlertMessage = () => {
    if (!safetyInfo) return null;
    const { nearByCrimeZones, passedCrimeZone } = safetyInfo;

    if (nearByCrimeZones && passedCrimeZone) {
      return "주변 범죄 주의 구간을 지나갑니다.";
    }
    if (passedCrimeZone) {
      return "범죄 주의 구간을 지나갑니다.";
    }
    if (nearByCrimeZones) {
      return "범죄 주의 구간이 주변에 있습니다.";
    }
    return null;
  };

  const alertMessage = getAlertMessage();
  const hasAlert = !!alertMessage;

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
              width={17.437}
              height={17.5}
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
            {score}점
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => toggleModule("safety")}
          className={cn(
            "w-[36px] h-[21px] rounded-[11px] border-[0.5px] flex items-center p-[3px] transition-all duration-200",
            isActive
              ? "bg-[#F48787] border-[#F48787] justify-end"
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
        {/* Safety Alert */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            안전 알림
          </h3>
          <div className="bg-white border-[1.5px] border-[#F48787] rounded-lg p-4 py-5 flex flex-col gap-4">
            {isLoading ? (
              <div className="flex justify-center p-2">
                <div className="w-5 h-5 border-2 border-[#F48787] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Warning Item */}
                {hasAlert && (
                  <>
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
                        <p className="font-semibold text-[16px] text-black tracking-[-0.15px]">
                          {alertMessage}
                        </p>
                      </div>
                    </div>
                    {/* Divider */}
                    <div className="h-0 relative w-full border-t border-[#E5E5E5]" />
                  </>
                )}

                {/* Stats Items */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-[18px] h-[18px] flex items-center justify-center">
                        <Image
                          src="/icons/module/safety/cctv.svg"
                          width={15}
                          height={15}
                          alt="CCTV"
                        />
                      </div>
                      <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                        경로 구역 내 CCTV 개수
                      </span>
                    </div>
                    <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                      {safetyInfo?.pathCctvCount ?? 0}개
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-[18px] h-[18px] flex items-center justify-center">
                        <Image
                          src="/icons/module/safety/lamp.svg"
                          width={13.5}
                          height={15}
                          alt="Lamp"
                        />
                      </div>
                      <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                        경로 구역 내 가로등 개수
                      </span>
                    </div>
                    <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                      {safetyInfo?.pathLightCount ?? 0}개
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Nearby Police Stations */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            인근 경찰서 위치
          </h3>
          <div className="bg-white border-[1.5px] border-[#F48787] rounded-lg p-4 py-5 flex flex-col gap-4">
            {isLoading ? (
              <div className="flex justify-center p-2">
                <div className="w-5 h-5 border-2 border-[#F48787] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : safetyInfo?.polices && safetyInfo.polices.length > 0 ? (
              safetyInfo.polices.map((station, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-[18px] h-[18px] flex items-center justify-center">
                      <Image
                        src="/icons/module/safety/police.svg"
                        width={13.5}
                        height={16.359}
                        alt="Police"
                      />
                    </div>
                    <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                      {station.policeOfficeName}
                    </span>
                  </div>
                  <span className="font-semibold text-[14px] text-[#7B7B7B] tracking-[-0.15px]">
                    도보 {Math.round((station.durationTime || 0) / 60)}분
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 text-[14px]">
                주변에 경찰서가 없습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyModule;
