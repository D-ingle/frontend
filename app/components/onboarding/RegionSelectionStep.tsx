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
    <div className="flex flex-col w-full max-w-280 mx-auto pt-20 pb-10">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-gray-400 hover:text-navy transition-colors mb-10 text-sm"
      >
        <ChevronLeft size={16} />
        뒤로가기
      </button>

      <OnboardingProgress currentStep={2} totalSteps={3} />

      <div className="flex flex-col lg:flex-row mt-10">
        <div className="flex-1">
          <h1 className="text-[32px] font-bold text-navy mb-4 leading-[1.3]">
            선호하시는 지역구를
            <br />
            선택해주세요
            <span className="text-[18px] font-normal text-gray-400 ml-4">
              최대 3개 선택 가능
            </span>
          </h1>

          <div className="flex flex-wrap gap-3 mt-10 min-h-12">
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

        <div className="flex-1 flex items-center justify-center relative overflow-hidden ">
          <SeoulMap
            selectedRegions={selectedRegions}
            onRegionClick={handleRegionClick}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-8 mt-20">
        <button className="text-gray-400 hover:text-navy font-medium transition-colors">
          다음에 할래요
        </button>
        <button
          disabled={selectedRegions.length === 0}
          onClick={() => onNext(selectedRegions)}
          className={cn(
            "px-10 py-4 rounded-xl font-bold transition-all duration-300",
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
