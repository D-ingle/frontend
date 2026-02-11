"use client";

import React, { useEffect } from "react";
import CompareCard from "./CompareCard";
import CurationComparison from "./CurationComparison";
import BasicInfoComparison from "./BasicInfoComparison";
import Image from "next/image";
import CompareModal from "../compare/CompareModal";
import { cn } from "@/app/lib/utils";

interface House {
  id: string;
  price: string;
  name: string;
  area: string;
  floor: string;
  image: string;
  location: string;
  type: string;
}

interface CurationData {
  summary: string;
  tags: ("소음" | "안전" | "접근성" | "편의" | "환경")[];
  scores: {
    소음: number;
    환경: number;
    안전: number;
    편의: number;
    접근성: number;
  };
}

interface BasicInfo {
  건물명: string;
  주소: string;
  매물형태: string;
  면적: string;
  층수: string;
  배당층_총층수: string;
  방향: string;
  주차: string;
}

interface CompareMainProps {
  selectedHouses: (House | null)[];
  curationData: (CurationData | null)[];
  basicInfo: (BasicInfo | null)[];
  onRemove: (id: string) => void;
  isUnlocked: boolean;
  onUnlock: () => void;
}

const CompareMain = ({
  selectedHouses,
  curationData,
  basicInfo,
  onRemove,
  isUnlocked,
  onUnlock,
}: CompareMainProps) => {
  const activeHouses = selectedHouses.filter((h): h is House => h !== null);
  const titles = activeHouses.map((h) => h.name.replace("아파트 ", ""));

  return (
    <div className="flex-1 bg-white flex flex-col min-h-screen w-[1220px] ml-10 mt-10">
      {/* Main Content Areas inside a Blue Background Container for sections */}
      <div className="flex-1 flex flex-col gap-[8px] w-full">
        {/* Each major block is a styled section */}

        {/* Section 1: Property Cards */}
        <section className="bg-[#F8FAFB] px-[60px] py-[40px] flex flex-col gap-[28px]">
          <div className="content-stretch flex justify-between items-center relative shrink-0 w-full">
            <div className="flex flex-row items-center gap-4">
              <p className="font-['Pretendard_Variable:ExtraBold',sans-serif] font-extrabold leading-[1.1] opacity-90 text-[#191919] text-[28px]">
                내 매물 비교하기
              </p>
              <p className="font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[1.1] opacity-90 text-[16px] text-[#7b7b7b]">
                최대 3개까지 관심 매물을 비교할 수 있어요
              </p>
            </div>
            <div className="bg-[#f8fafb] border border-[#8298a8] border-solid content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[12px] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="relative shrink-0 size-[20px] mb-1">
                <Image
                  src="/icons/common/export.svg"
                  alt="PDF"
                  width={20}
                  height={20}
                />
              </div>
              <p className="font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#063152] text-[16px] uppercase ml-auto">
                PDF 리포트 내보내기
              </p>
            </div>
          </div>
          <div className="h-px bg-[#D9D9D9] w-full shrink-0" />
          <div className="content-stretch flex gap-[35px] items-end relative shrink-0 pt-[20px]">
            {[0, 1, 2].map((i) => (
              <CompareCard
                key={i}
                {...(selectedHouses[i] || {
                  id: `empty-${i}`,
                  price: "",
                  name: "",
                  floor: "",
                  area: "",
                  image: "",
                  location: "",
                  type: "",
                  isEmpty: true,
                })}
                isEmpty={!selectedHouses[i]}
                onRemove={onRemove}
              />
            ))}
          </div>
        </section>

        {/* Section Container with Blue Background for Curation & Basic Info */}
        <div className="relative">
          <div
            className={cn(
              "bg-[#f8fafb] flex flex-col gap-[60px] px-[60px] py-[60px] rounded-t-[12px] transition-all duration-500",
            )}
          >
            {/* Section 2: Curation */}
            <section className="flex flex-col gap-[28px]">
              <div className="flex flex-col gap-[28px]">
                <h2 className="font-['Pretendard_Variable:ExtraBold',sans-serif] font-extrabold opacity-90 text-[#191919] text-[28px]">
                  큐레이션 비교 결과
                </h2>
                <div className="h-px bg-[#D9D9D9] w-full" />
              </div>
              <CurationComparison data={curationData} />
            </section>

            {/* Section 3: Basic Info */}
            <section className="flex flex-col gap-[28px] mb-[60px]">
              <div className="flex flex-col gap-[28px]">
                <h2 className="font-['Pretendard_Variable:ExtraBold',sans-serif] font-extrabold opacity-90 text-[#191919] text-[28px]">
                  기본 정보 비교
                </h2>
                <div className="h-px bg-[#D9D9D9] w-full" />
              </div>
              <BasicInfoComparison data={basicInfo} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareMain;
