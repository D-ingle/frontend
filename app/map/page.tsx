"use client";

import React from "react";
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

const MapPage = () => {
  const { isMapMode } = useMapModeStore();

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
            /* Modules Container */
            <div className="absolute top-4 bottom-4 right-5 pointer-events-none flex flex-col gap-2.5 overflow-y-auto no-scrollbar pb-10">
              <AccessibilityModule />
              <SafetyModule />
              <ConvenienceModule />
              <NoiseModule />
              <EnvironmentModule />
            </div>
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
