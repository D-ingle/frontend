"use client";

import React, { useState } from "react";
import { HousingTypeStep } from "@/app/components/onboarding/HousingTypeStep";
import { AnimatePresence, motion } from "framer-motion";

import { RegionSelectionStep } from "@/app/components/onboarding/RegionSelectionStep";
import { AtmosphereSelectionStep } from "@/app/components/onboarding/AtmosphereSelectionStep";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    housingType: "",
    regions: [] as string[],
    atmospheres: [] as string[],
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleHousingTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, housingType: type }));
    nextStep();
  };

  const handleRegionSelect = (regions: string[]) => {
    setFormData((prev) => ({ ...prev, regions }));
    nextStep();
  };

  const handleAtmosphereSelect = (atmospheres: string[]) => {
    setFormData((prev) => ({ ...prev, atmospheres }));
    setIsCompleted(true);
  };

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Radial Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, #E2F6F6 0%, #FFFFFF 100%)",
        }}
      />

      <div className="relative z-10 mt-16">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <>
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <HousingTypeStep
                    onNext={handleHousingTypeSelect}
                    onBack={() => (window.location.href = "/")}
                  />
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegionSelectionStep
                    onNext={handleRegionSelect}
                    onBack={prevStep}
                  />
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AtmosphereSelectionStep
                    onNext={handleAtmosphereSelect}
                    onBack={prevStep}
                  />
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
            >
              <div className="w-20 h-20 bg-main-400 rounded-full flex items-center justify-center text-white mb-8 shadow-lg">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-navy mb-4">
                설문 참여가 완료되었습니다!
              </h2>
              <p className="text-gray-500 mb-12 text-lg">
                입력하신 정보를 바탕으로 최고의 동네를 찾아드릴게요.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-8 py-4 border-2 border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                >
                  수정하기
                </button>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="px-10 py-4 bg-navy text-white rounded-2xl font-bold shadow-xl hover:bg-navy/90 transition-all"
                >
                  결과 확인하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
