"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { OnboardingProgress } from "../OnboardingProgress";
import { AtmosphereCard } from "./AtmosphereCard";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

const ICONS = {
  safety: "/icons/priority/ativate/safety.svg",
  convenience: "/icons/priority/ativate/convenience.svg",
  accessibility: "/icons/priority/ativate/accessibility.svg",
  noise: "/icons/priority/ativate/noise.svg",
  environment: "/icons/priority/ativate/environment.svg",
};

const ATMOSPHERES = [
  {
    id: "safety",
    title: "안전",
    description:
      "CCTV 개수, 범죄이력, 보안등, 안전 비상벨 등\n주변의 치안을 가장 중요하게 생각해요.",
    icon: ICONS.safety,
    iconBgColor: "bg-[#FFD9D9]",
  },
  {
    id: "convenience",
    title: "편의",
    description:
      "편의점, 마트, 관공서, 병원 등 주변 편의시설의\n밀도와 접근성이 가장 중요해요.",
    icon: ICONS.convenience,
    iconBgColor: "bg-[#E5E0F7]",
  },
  {
    id: "accessibility",
    title: "접근성",
    description: "지하철역, 버스 등 대중교통의\n접근성이 가장 중요해요.",
    icon: ICONS.accessibility,
    iconBgColor: "bg-[#D6EFF8]",
  },
  {
    id: "noise",
    title: "소음",
    description:
      "내가 집에 있는 시간 동안 조용하게 쉴 수 있는\n환경이 가장 중요해요.",
    icon: ICONS.noise,
    iconBgColor: "bg-[#FFEFD4]",
  },
  {
    id: "environment",
    title: "환경",
    description:
      "조도, 혐오시설, 주변 지형 및 미세먼지와 같은\n환경적인 인프라가 가장 중요해요.",
    icon: ICONS.environment,
    iconBgColor: "bg-[#DAF0DA]",
  },
];

import { useOnboardingStore } from "@/app/store/onboardingStore";

const CONDITION_ID_MAP: Record<string, number> = {
  noise: 1,
  environment: 2,
  safety: 3,
  accessibility: 4,
  convenience: 5,
};

interface AtmosphereSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const AtmosphereSelectionStep = ({
  onNext,
  onBack,
}: AtmosphereSelectionStepProps) => {
  const { preferredConditions, setPreferredConditions } = useOnboardingStore();

  const handleToggle = (id: string) => {
    const numId = CONDITION_ID_MAP[id];
    const nextConditions = preferredConditions.includes(numId)
      ? preferredConditions.filter((item) => item !== numId)
      : preferredConditions.length < 3
        ? [...preferredConditions, numId]
        : preferredConditions;
    setPreferredConditions(nextConditions);
  };

  const getOrderNumber = (id: string) => {
    const numId = CONDITION_ID_MAP[id];
    const index = preferredConditions.indexOf(numId);
    return index !== -1 ? index + 1 : undefined;
  };

  return (
    <div className="flex flex-col w-370 mx-auto pt-20 px-10 mt-15">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-gray-400 hover:text-navy transition-colors mb-10 text-sm"
      >
        <ChevronLeft size={16} />
        뒤로가기
      </button>

      <OnboardingProgress currentStep={3} totalSteps={3} />

      <h1 className="text-[32px] font-bold text-navy mt-4 mb-8 leading-[1.3]">
        집을 구하실 때 꼭<br />
        고려하시는 조건을 선택해주세요.
        <span className="text-[18px] font-normal text-gray-400 opacity-60 ml-4">
          최대 3개 선택 가능
        </span>
      </h1>

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 mt-8"
      >
        {ATMOSPHERES.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <AtmosphereCard
              title={item.title}
              description={item.description}
              icon={item.icon}
              iconBgColor={item.iconBgColor}
              isSelected={preferredConditions.includes(
                CONDITION_ID_MAP[item.id],
              )}
              orderNumber={getOrderNumber(item.id)}
              onClick={() => handleToggle(item.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-8 mt-10">
        <button className="text-gray-400 hover:text-navy font-medium transition-colors text-[18px]">
          다음에 할래요
        </button>
        <button
          disabled={preferredConditions.length === 0}
          onClick={onNext}
          className={cn(
            "px-10 py-4 rounded-xl font-bold transition-all duration-300 text-[18px]",
            preferredConditions.length > 0
              ? "bg-navy text-white hover:bg-navy/90 shadow-lg"
              : "bg-gray-100 text-gray-400 cursor-not-allowed",
          )}
        >
          완료하기
        </button>
      </div>
    </div>
  );
};
