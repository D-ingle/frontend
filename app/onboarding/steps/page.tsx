"use client";

import React from "react";
import { HousingTypeStep } from "@/app/components/onboarding/step1/HousingTypeStep";
import { AnimatePresence, motion } from "framer-motion";

import { RegionSelectionStep } from "@/app/components/onboarding/step2/RegionSelectionStep";
import { AtmosphereSelectionStep } from "@/app/components/onboarding/step3/AtmosphereSelectionStep";
import Curation from "@/app/components/curation/Curation";

import { useOnboardingStore } from "@/app/store/onboardingStore";
import { useUserStore } from "@/app/store/userStore";
import { useOnboard } from "@/shared/api/generated/onboarding-controller/onboarding-controller";
import { OnboardRequestDTOPreferredType } from "@/shared/api/generated/model";

export default function OnboardingStepsPage() {
  const {
    preferredType,
    preferredDistricts,
    preferredConditions,
    reset: resetOnboarding,
  } = useOnboardingStore();
  const { user, setUser } = useUserStore();

  const [currentStep, setCurrentStep] = React.useState(1);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isCurationLoading, setIsCurationLoading] = React.useState(false);

  // useOnboard 훅 (React Query)
  const { mutate: onboardMutate } = useOnboard({
    mutation: {
      onSuccess: (response) => {
        if (response.success) {
          console.log("Onboarding Success:", response);
          setIsCompleted(true);

          if (user) {
            setUser({
              ...user,
              preferredType,
              preferredConditions,
            });
          }

          setTimeout(() => {
            setIsCurationLoading(false);
            resetOnboarding();
          }, 3000);
        } else {
          alert(response.error?.message || "정보 저장 중 오류가 발생했습니다.");
          setIsCompleted(false);
          setIsCurationLoading(false);
        }
      },
      onError: (error) => {
        console.error("Onboarding Mutation Error:", error);
        const errorData = error.response?.data as {
          error?: { message?: string };
        };
        alert(errorData?.error?.message || "서버 통신 중 오류가 발생했습니다.");
        setIsCompleted(false);
        setIsCurationLoading(false);
      },
    },
  });

  const nextStep = () =>
    setCurrentStep((prev: number) => Math.min(prev + 1, 3));
  const prevStep = () =>
    setCurrentStep((prev: number) => Math.max(prev - 1, 1));

  const handleHousingTypeSelect = () => {
    nextStep();
  };

  const handleRegionSelect = () => {
    nextStep();
  };

  const handleAtmosphereSelect = () => {
    console.log("Onboarding Submit Started", {
      preferredType,
      preferredDistricts,
      preferredConditions,
    });

    setIsCurationLoading(true);
    setIsCompleted(true);

    onboardMutate({
      data: {
        propertyType: preferredType as OnboardRequestDTOPreferredType,
        preferredDistricts,
        preferredConditions: preferredConditions.map(Number),
      },
    });
  };

  return (
    <main
      className="min-h-screen bg-white relative overflow-hidden"
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #E2F6F6 0%, #FFF 100%), #FFF",
      }}
    >
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
                    onBack={() => (window.location.href = "/onboarding")}
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
          ) : isCurationLoading ? (
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
