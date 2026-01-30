"use client";

import React, { useState } from "react";
import { HousingTypeStep } from "@/app/components/onboarding/HousingTypeStep";
import { AnimatePresence, motion } from "framer-motion";

import { RegionSelectionStep } from "@/app/components/onboarding/RegionSelectionStep";
import { AtmosphereSelectionStep } from "@/app/components/onboarding/AtmosphereSelectionStep";
import Curation from "../components/Curation";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    housingType: "",
    regions: [] as string[],
    atmospheres: [] as string[],
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  if (currentStep === 3) {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }

  return (
    <main
      className="min-h-screen bg-white relative overflow-hidden"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #E2F6F6 0%, #FFF 100%), #FFF",
      }}
    >
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-50" />

      <div className="relative z-10">
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
          ) : isLoading ? (
            <Curation
              content="큐레이션 중"
              description="선택하신 조건에 맞는 최고의 매물들을 찾아드릴게요"
              isLoading={true}
            />
          ) : (
            <Curation
              content="큐레이션을 위한 단계가 모두 끝났어요!"
              description="시작하기 버튼을 누르시고 가장 잘 맞는 집을 함께 찾아봐요"
              isLoading={false}
              buttonLabel="D.HOME 시작하기"
              buttonLink="/map"
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
