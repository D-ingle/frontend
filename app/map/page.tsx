"use client";

import React, { useEffect, useRef } from "react";
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
  const {
    activeModules,
    toggleModule,
    toastMessage,
    setToastMessage,
    getDisplayOrder,
  } = useModuleStore();

  const initialActivatedRef = useRef(false);

  // 초기 진입 시 우선순위 1순위 활성화 로직
  useEffect(() => {
    if (
      user?.preferredConditions?.[0] &&
      !initialActivatedRef.current &&
      activeModules.length === 0
    ) {
      const priorityId = user.preferredConditions[0];
      const idMap: Record<number, ModuleId> = {
        1: "noise",
        2: "environment",
        3: "safety",
        4: "accessibility",
        5: "convenience",
      };
      const moduleId = idMap[priorityId];
      if (moduleId) {
        toggleModule(moduleId);
        initialActivatedRef.current = true;
      }
    }
  }, [user, activeModules.length, toggleModule]);

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
              <List />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
