"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useMapModeStore } from "../../../store/mapModeStore";

const CATEGORY_TOOLTIPS: Record<string, string> = {
  안전: "CCTV수, 범죄주의구간, 보안등, 경찰서 위치를 합산하여 산출한 점수입니다.",
  환경: "비선호 시설, 일사량, 미세먼지, 주변 공사장 등의 정보를 합산하여 산출한 점수입니다.",
  접근성:
    "지하철 및 버스 등의 대중교통의 위치와 거리를 합산하여 산출한 점수입니다.",
  편의: "도보 거리 내의 편의점, 대형마트, 병원 등의 편의시설을 합산하여 산출한 점수입니다.",
  소음: "평균 소음 데이터 및 유동인구를 합산하여 산출한 점수입니다.",
};

interface CurationSectionProps {
  conditions?: number[];
}

const CONDITION_MAP: Record<number, string> = {
  1: "소음",
  2: "환경",
  3: "편의",
  4: "접근성",
  5: "안전",
};

const CurationSection = ({ conditions }: CurationSectionProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { setMapMode } = useMapModeStore();

  const sortedMatchedConditions = (conditions || [])
    .map((cId) => CONDITION_MAP[cId])
    .filter(Boolean);

  return (
    <section className="px-5 py-8 bg-white" id="curation">
      <h3 className="text-[18px] font-bold text-[#000000] mb-4">
        맞춤 큐레이션 정보
      </h3>

      {/* D.HOME Summary Section */}
      <div className="mb-6">
        <div className="flex items-center gap-1 mb-2">
          <Image
            src="/icons/feature/list/curation.svg"
            width={16}
            height={16}
            alt="curation"
          />
          <span className="text-[16px] font-bold text-[#30CEA1]">
            D.HOME 요약
          </span>
        </div>
        <div>
          <p className="text-[16px] leading-[1.6] text-[#434343]">
            {sortedMatchedConditions.length > 0 ? (
              <>
                해당 지역의{" "}
                {sortedMatchedConditions.slice(0, 2).map((label, i) => (
                  <React.Fragment key={label}>
                    <span className="font-bold text-[#2EA98C]">
                      {label} 점수
                    </span>
                    {i === 0 && sortedMatchedConditions.length > 1
                      ? " 및 "
                      : ""}
                  </React.Fragment>
                ))}{" "}
                높아 거주 만족도가 기대되는 추천 매물입니다!
              </>
            ) : (
              <>
                거주 만족도가 높을 것으로 기대되는{" "}
                <span className="font-bold text-[#2EA98C]">추천 매물</span>
                입니다!
              </>
            )}
          </p>
        </div>
      </div>

      <div className="relative w-full aspect-361/280 bg-[#F8FAFB] rounded-xl flex items-center justify-center p-6 border border-[#E5E5E5]">
        <div className="relative w-40 h-40">
          {/* Background Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-40 h-40 border border-[#30CEA1] rounded-full" />
            <div className="absolute w-30 h-30 border border-dashed border-[#D9D9D9] rounded-full" />
            <div className="absolute w-20 h-20 border border-[#D9D9D9] rounded-full opacity-50" />
            <div className="absolute w-10 h-10 border border-[#D9D9D9] rounded-full opacity-30" />
          </div>

          {/* Axis Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
            {[0, 72, 144, 216, 288].map((angle) => {
              const rad = ((angle - 90) * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1="80"
                  y1="80"
                  x2={80 + 80 * Math.cos(rad)}
                  y2={80 + 80 * Math.sin(rad)}
                  stroke="#D9D9D9"
                  strokeWidth="0.5"
                />
              );
            })}
          </svg>

          {/* Radar Polygon */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 160 160"
          >
            <defs>
              <linearGradient
                id="radarGradient"
                x1="80"
                y1="13.6"
                x2="80"
                y2="118.83"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#30CEA1" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#30CEA1" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <polygon
              points="80,13.6 130.97,63.44 101.17,109.12 51.78,118.83 22.94,61.46"
              fill="url(#radarGradient)"
            />
          </svg>

          {/* Labels & Scores with Tooltips (Mock values as agreed) */}
          {/* 1. 안전 (Top - 83) */}
          <div
            className="absolute -top-13 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-help group"
            onMouseEnter={() => setHoveredCategory("안전")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#555555]">안전</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9D9D9D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#F48787] bg-[#FFD9D9] px-2 py-0.5 rounded mt-1">
              83
            </span>
            {hoveredCategory === "안전" && (
              <div className="absolute mb-2 top-5 -left-1 bg-[#E8FBF6] border border-[#30CEA1] rounded-md px-3 py-2 shadow-lg z-50 w-45">
                <p className="text-[#2EA98C] text-[10px] leading-tight font-medium whitespace-pre-line">
                  {CATEGORY_TOOLTIPS["안전"]}
                </p>
              </div>
            )}
          </div>

          {/* 2. 환경 (Right-ish - 67) */}
          <div
            className="absolute top-[15%] -right-12 flex flex-col items-center cursor-help"
            onMouseEnter={() => setHoveredCategory("환경")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#555555]">환경</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9D9D9D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#82AA82] bg-[#DAF0DA] px-2 py-0.5 rounded mt-1">
              67
            </span>
            {hoveredCategory === "환경" && (
              <div className="absolute top-5 mb-2 -right-1 bg-[#E8FBF6] border border-[#30CEA1] rounded-md px-3 py-2 shadow-lg z-20 w-45">
                <p className="text-[#2EA98C] text-[10px] leading-tight font-medium whitespace-pre-line">
                  {CATEGORY_TOOLTIPS["환경"]}
                </p>
              </div>
            )}
          </div>

          {/* 3. 접근성 (Bottom-Right - 45) */}
          <div
            className="absolute -bottom-8 -right-8 flex flex-col items-center cursor-help"
            onMouseEnter={() => setHoveredCategory("접근성")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#555555]">접근성</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9D9D9D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#7CB7CD] bg-[#D6EFF8] px-2 py-0.5 rounded mt-1">
              45
            </span>
            {hoveredCategory === "접근성" && (
              <div className="absolute top-5 mb-2 -right-1 bg-[#E8FBF6] border border-[#30CEA1] rounded-md px-3 py-2 shadow-lg z-20 w-45">
                <p className="text-[#2EA98C] text-[10px] leading-tight font-medium whitespace-pre-line">
                  {CATEGORY_TOOLTIPS["접근성"]}
                </p>
              </div>
            )}
          </div>

          {/* 4. 편의 (Bottom-Left - 60) */}
          <div
            className="absolute -bottom-8 -left-8 flex flex-col items-center cursor-help"
            onMouseEnter={() => setHoveredCategory("편의")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#555555]">편의</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9D9D9D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#AB9FD5] bg-[#E5E0F7] px-2 py-0.5 rounded mt-1">
              60
            </span>
            {hoveredCategory === "편의" && (
              <div className="absolute top-5 mb-2 -left-1 bg-[#E8FBF6] border border-[#30CEA1] rounded-md px-3 py-2 shadow-lg z-20 w-45">
                <p className="text-[#2EA98C] text-[10px] leading-tight font-medium whitespace-pre-line">
                  {CATEGORY_TOOLTIPS["편의"]}
                </p>
              </div>
            )}
          </div>

          {/* 5. 소음 (Left-ish - 10) */}
          <div
            className="absolute top-[15%] -left-12 flex flex-col items-center cursor-help"
            onMouseEnter={() => setHoveredCategory("소음")}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#555555]">소음</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9D9D9D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <span className="text-[12px] font-bold text-[#FBBA78] bg-[#FFEFD4] px-2 py-0.5 rounded mt-1">
              10
            </span>
            {hoveredCategory === "소음" && (
              <div className="absolute top-5 mb-2 -left-1 bg-[#E8FBF6] border border-[#30CEA1] rounded-md px-3 py-2 shadow-lg z-20 w-45">
                <p className="text-[#2EA98C] text-[10px] leading-tight font-medium whitespace-pre-line">
                  {CATEGORY_TOOLTIPS["소음"]}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setMapMode(true)}
        className="w-full h-12 mt-6 bg-navy text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#052844] transition-colors cursor-pointer"
      >
        종합 데이터 지도로 보기
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
};

export default CurationSection;
