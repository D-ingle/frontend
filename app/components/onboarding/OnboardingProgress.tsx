"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress = ({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step == currentStep;
          return (
            <div
              key={step}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                isActive ? "w-8 bg-main-400" : "w-2 bg-gray-100",
              )}
            />
          );
        })}
      </div>
      <div className="text-[16px] font-medium">
        <span className="text-navy">{currentStep}단계</span>
        <span className="text-gray-400"> / {totalSteps}단계</span>
      </div>
    </div>
  );
};
