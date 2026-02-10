"use client";

import React from "react";
import { X } from "lucide-react";
import { useMapModeStore } from "../../store/mapModeStore";
import { useRecentViewStore } from "../../store/recentViewStore";

interface MapHeaderProps {
  title?: string;
}

const MapHeader = () => {
  const { setMapMode, selectedProperty, clearSelectedProperty, setSelectedId } =
    useMapModeStore();
  const { viewedIds } = useRecentViewStore();

  const title = selectedProperty?.title || "매물 위치";

  const handleClose = () => {
    setMapMode(false);
    clearSelectedProperty();
    setTimeout(() => {
      const targetId = selectedProperty?.id || viewedIds[0];
      if (targetId) {
        setSelectedId(targetId);
      }
    }, 100); // 150ms 지연
  };

  return (
    <div className="flex gap-3 items-center w-full px-5 pt-5 pointer-events-none">
      {/* Title & Badge Box */}
      <div className="bg-white border-[1.5px] border-[#F5F5F5] flex flex-1 gap-2.5 h-15 items-center px-5 rounded-xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.1)] pointer-events-auto">
        <h2 className="font-semibold text-[20px] text-black">{title}</h2>
        <div className="bg-[#E6EAEE] flex h-[25px] items-center justify-center px-2 rounded-sm shrink-0">
          <span className="font-semibold text-navy text-[12px] tracking-tight">
            종합데이터 모드
          </span>
        </div>
      </div>

      {/* Close Button Box */}
      <button
        onClick={handleClose}
        className="bg-white border-[1.5px] border-[#F5F5F5] flex items-center justify-center rounded-xl shadow-[0px_3px_5px_0px_rgba(0,0,0,0.1)] shrink-0 w-15 h-15 pointer-events-auto hover:bg-gray-50 transition-colors"
      >
        <X className="w-6 h-6 text-black" />
      </button>
    </div>
  );
};

export default MapHeader;
