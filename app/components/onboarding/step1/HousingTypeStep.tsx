"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { HousingTypeCard } from "./HousingTypeCard";
import { OnboardingProgress } from "../OnboardingProgress";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

import { useOnboardingStore } from "@/app/store/onboardingStore";

const HOUSING_TYPES = [
  {
    id: "ONE_ROOM",
    title: "원룸",
    description: "부담 없는 첫 독립을 위해서!",
    icon: "/icons/navigation/ativate/room.svg",
  },
  {
    id: "VILLA",
    title: "빌라 · 투룸",
    description: "공간 분리가 필요하다면?",
    icon: "/icons/navigation/ativate/room_two.svg",
  },
  {
    id: "OFFICETEL",
    title: "오피스텔",
    description: "보안과 편의시설이 우선",
    icon: "/icons/navigation/ativate/officetel.svg",
  },
  {
    id: "APT",
    title: "아파트",
    description: "쾌적한 인프라를 원한다면?",
    icon: "/icons/navigation/ativate/apt.svg",
  },
];

interface HousingTypeStepProps {
  onNext: () => void;
  onBack: () => void;
}

export const HousingTypeStep = ({ onNext, onBack }: HousingTypeStepProps) => {
  const { preferredType, setPreferredType } = useOnboardingStore();

  const handleNext = () => {
    if (preferredType) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col w-350 mx-auto pt-20 pb-10 mt-15">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-gray-400 hover:text-navy transition-colors mb-10 text-sm"
      >
        <ChevronLeft size={16} />
        뒤로가기
      </button>

      <OnboardingProgress currentStep={1} totalSteps={3} />

      <h1 className="text-[32px] font-bold text-navy mt-4 mb-16 leading-[1.3]">
        찾으시는 주거 형태를
        <br />
        알려주세요
      </h1>

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {HOUSING_TYPES.map((type) => (
          <motion.div
            key={type.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <HousingTypeCard
              title={type.title}
              description={type.description}
              icon={type.icon}
              isSelected={preferredType === type.id}
              onClick={() => setPreferredType(type.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Actions */}
      <div className="flex justify-end items-center gap-8 mt-20">
        <button className="text-gray-400 hover:text-navy font-medium transition-colors text-[18px]">
          다음에 할래요
        </button>
        <button
          disabled={!preferredType}
          onClick={handleNext}
          className={cn(
            "px-10 py-4 rounded-xl font-bold transition-all duration-300 text-[18px]",
            preferredType
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
