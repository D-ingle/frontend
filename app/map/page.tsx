"use client";

import React, { useEffect, useRef, Suspense } from "react";
import FilterBar from "../components/map/FilterBar";
import List from "../components/list/List";
import KakaoMap from "../components/map/KakaoMap";
import MapHeader from "../components/map/MapHeader";
import AccessibilityModule from "../components/module/AccessibilityModule";
import SafetyModule from "../components/module/SafetyModule";
import ConvenienceModule from "../components/module/ConvenienceModule";
import NoiseModule from "../components/module/NoiseModule";
import EnvironmentModule from "../components/module/EnvironmentModule";
import { useMapModeStore } from "../store/mapModeStore";
import { useModuleStore, ModuleId } from "../store/moduleStore";
import { useUserStore } from "../store/userStore";
import FavoritePlacesModule from "../components/module/FavoritePlacesModule";
import TimeSliderModule from "../components/module/TimeSliderModule";
import { Toast } from "../components/ui/Toast";

const MapPage = () => {
  const { isMapMode } = useMapModeStore();
  const { user } = useUserStore();
  const { resetModules, toastMessage, setToastMessage, getDisplayOrder } =
    useModuleStore();

  const initialActivatedRef = useRef(false);
  const listInitialActivatedRef = useRef(false);

  // 초기 진입 및 모드 전환 시 우선순위 활성화 로직
  useEffect(() => {
    if (!user?.preferredConditions || user.preferredConditions.length === 0)
      return;

    const idMap: Record<number, ModuleId> = {
      1: "noise",
      2: "environment",
      3: "safety",
      4: "accessibility",
      5: "convenience",
    };

    if (isMapMode) {
      // 종합데이터 모드 진입 시: 첫 번째 우선순위 모듈만 활성화
      if (!initialActivatedRef.current) {
        const firstPriorityId = user.preferredConditions[0];
        const moduleId = idMap[firstPriorityId];

        if (moduleId) {
          resetModules([moduleId]);
        }
        initialActivatedRef.current = true;
      }

      // 리스트 뷰 초기화 플래그 리셋 (다시 돌아갈 때 다시 켜지도록)
      if (listInitialActivatedRef.current) {
        listInitialActivatedRef.current = false;
      }
    } else {
      // 리스트 뷰 (초기 혹은 복귀): 온보딩 모든 우선순위 활성화
      if (!listInitialActivatedRef.current) {
        const preferredModuleIds = user.preferredConditions
          .map((id) => idMap[id])
          .filter(Boolean) as ModuleId[];

        resetModules(preferredModuleIds);
        listInitialActivatedRef.current = true;
      }

      // 종합데이터 모드 초기화 플래그 리셋
      if (initialActivatedRef.current) {
        initialActivatedRef.current = false;
      }
    }
  }, [isMapMode, user, resetModules]);

  const renderModule = (id: ModuleId) => {
    switch (id) {
      case "accessibility":
        return <AccessibilityModule key={id} />;
      case "safety":
        return <SafetyModule key={id} />;
      case "convenience":
        return <ConvenienceModule key={id} />;
      case "noise":
        return <NoiseModule key={id} />;
      case "environment":
        return <EnvironmentModule key={id} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Map: Always fills the screen */}
      <div className="absolute inset-0 z-0">
        <KakaoMap />
      </div>

      {/* UI Overlay: Container for FilterBar, List, MapHeader, and Modules */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        {/* Top UI Area */}
        {isMapMode ? (
          <MapHeader />
        ) : (
          <div className="pointer-events-auto z-50 flex-none">
            <FilterBar />
          </div>
        )}

        {/* Content UI Area */}
        <div className="flex-1 relative pointer-events-none overflow-hidden">
          {isMapMode ? (
            <>
              {/* Modules Container (Right Side) */}
              <div className="absolute top-4 bottom-4 right-5 pointer-events-none flex flex-col gap-2.5 overflow-y-auto no-scrollbar h-full pb-10">
                {getDisplayOrder().map((id) => renderModule(id))}
              </div>

              {/* Toast Notification */}
              <Toast
                message={toastMessage}
                onClose={() => setToastMessage(null)}
              />

              {/* Favorite Places Module (Top-Left Side) */}
              <div className="absolute top-4 left-5 pointer-events-none">
                <FavoritePlacesModule />
              </div>

              {/* Time Slider Module (Bottom-Center) */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none">
                <TimeSliderModule />
              </div>
            </>
          ) : (
            /* List Panel */
            <div className="absolute inset-y-0 left-0 w-auto h-full pointer-events-auto z-10">
              <Suspense
                fallback={
                  <div className="w-100 h-full bg-white animate-pulse" />
                }
              >
                <List />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
