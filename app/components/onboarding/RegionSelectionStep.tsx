"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { OnboardingProgress } from "./OnboardingProgress";
import { RegionBadge } from "./RegionBadge";
import SeoulMap from "@/app/components/onboarding/SeoulMap";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface RegionSelectionStepProps {
  onNext: (regions: string[]) => void;
  onBack: () => void;
}

export const RegionSelectionStep = ({
  onNext,
  onBack,
}: RegionSelectionStepProps) => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const handleRegionClick = (regionName: string) => {
    setSelectedRegions((prev) => {
      if (prev.includes(regionName)) {
        return prev.filter((r) => r !== regionName);
      }
      if (prev.length >= 3) return prev;
      return [...prev, regionName];
    });
  };

  const removeRegion = (regionName: string) => {
    setSelectedRegions((prev) => prev.filter((r) => r !== regionName));
  };

  return (
    <div className="flex flex-col w-full max-w-350 mx-auto mt-12">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-navy transition-colors mt-12 mb-10 text-sm"
      >
        <ChevronLeft size={16} />
        뒤로가기
      </button>

      <OnboardingProgress currentStep={2} totalSteps={3} />

      <div className="flex mt-4 relative">
        {/* Content */}
        <div className="w-118 shrink-0 relative z-10">
          <h1 className="text-[32px] font-bold text-navy mb-4 leading-[1.3]">
            선호하시는 지역구를
            <br />
            선택해주세요
            <span className="text-[18px] font-normal text-gray-400 ml-4">
              최대 3개 선택 가능
            </span>
          </h1>

          <div className="flex flex-wrap gap-3 min-h-12">
            <AnimatePresence>
              {selectedRegions.map((region) => (
                <RegionBadge
                  key={region}
                  name={region}
                  onRemove={() => removeRegion(region)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Map Container - Moved left using negative margin */}
        <div className="flex relative w-180 h-180 -ml-30">
          <SeoulMap
            selectedRegions={selectedRegions}
            onRegionClick={handleRegionClick}
          />
        </div>
      </div>

      {/* Actions - Separated from the map flex container to stay at bottom right */}
      <div className="flex justify-end items-end gap-6 mb-10">
        <button className="text-gray-400 hover:text-navy font-medium transition-colors py-4 text-[18px]">
          다음에 할래요
        </button>
        <button
          disabled={selectedRegions.length === 0}
          onClick={() => onNext(selectedRegions)}
          className={cn(
            "px-10 py-4 rounded-xl font-bold transition-all duration-300 text-[18px]",
            selectedRegions.length > 0
              ? "bg-navy text-white hover:bg-navy/90 shadow-lg"
              : "bg-gray-100 text-gray-400 cursor-not-allowed",
          )}
        >
          다음질문
        </button>
      </div>
    </div>
  );
};
