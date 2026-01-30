"use client";

import React from "react";

const CurationSection = () => {
  return (
    <section className="px-5 py-8 bg-white" id="curation">
      <h3 className="text-[18px] font-bold text-[#000000] mb-6">
        맞춤 큐레이션 정보
      </h3>

      <div className="relative w-full aspect-361/280 bg-[#F8FAFB] rounded-xl flex items-center justify-center p-6 border border-[#E5E5E5]">
        <div className="relative w-40 h-40">
          {/* Background Circles (Radii: 80, 60, 40, 20) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer Circle (Solid) */}
            <div className="absolute w-40 h-40 border border-[#30CEA1] rounded-full" />
            {/* Three Inner Circles (Dashed) */}
            <div className="absolute w-30 h-30 border border-dashed border-[#D9D9D9] rounded-full" />
            {/* Two Smaller Circles (Solid) */}
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

          {/* Labels & Scores */}
          {/* 1. 안전 (Top - 83) */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-[12px] text-[#555555]">안전</span>
            <span className="text-[12px] font-bold text-[#F48787] bg-[#FFD9D9] px-2 py-0.5 rounded mt-1">
              83
            </span>
            {/* Tooltip Badge */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#E8FBF6] border border-[#30CEA1] rounded-md px-2 py-1 shadow-sm whitespace-nowrap z-10 scale-[0.8]">
              <p className="text-[#2EA98C] text-[10px] leading-tight font-medium">
                CCTV수, 범죄주의구간, 보안등, 경찰서 위치를 <br />
                합산하여 산출한 점수입니다.
              </p>
            </div>
          </div>

          {/* 2. 환경 (Right-ish - 67) */}
          <div className="absolute top-[20%] -right-8 flex flex-col items-center">
            <span className="text-[12px] text-[#555555]">환경</span>
            <span className="text-[12px] font-bold text-[#82AA82] bg-[#DAF0DA] px-2 py-0.5 rounded mt-1">
              67
            </span>
          </div>

          {/* 3. 접근성 (Bottom-Right - 45) */}
          <div className="absolute bottom-0 -right-4 flex flex-col items-center">
            <span className="text-[12px] text-[#555555]">접근성</span>
            <span className="text-[12px] font-bold text-[#7CB7CD] bg-[#D6EFF8] px-2 py-0.5 rounded mt-1">
              45
            </span>
          </div>

          {/* 4. 편의 (Bottom-Left - 60) */}
          <div className="absolute bottom-0 -left-2 flex flex-col items-center">
            <span className="text-[12px] text-[#555555]">편의</span>
            <span className="text-[12px] font-bold text-[#AB9FD5] bg-[#E5E0F7] px-2 py-0.5 rounded mt-1">
              60
            </span>
          </div>

          {/* 5. 소음 (Left-ish - 75) */}
          <div className="absolute top-[20%] -left-6 flex flex-col items-center">
            <span className="text-[12px] text-[#555555]">소음</span>
            <span className="text-[12px] font-bold text-[#FBBA78] bg-[#FFEFD4] px-2 py-0.5 rounded mt-1">
              10
            </span>
          </div>

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
        </div>
      </div>

      <button className="w-full h-12 mt-6 bg-navy text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-[#052844] transition-colors">
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
