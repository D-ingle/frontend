"use client";

import React from "react";
import Image from "next/image";

const SummarySection = () => {
  const priorityFactors = ["소음", "환경", "편의", "접근성", "안전"];

  return (
    <section>
      {/* Image Section */}
      <div className="relative w-full aspect-401/260 bg-gray-200">
        <Image
          src="/images/mockup/item.png"
          alt="Property Image"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full text-white text-[12px]">
          1 / 7
        </div>
      </div>

      {/* Basic Info Section */}
      <div className="px-5 py-6 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[24px] font-bold text-[#000000] mb-1">
              전세 6억 9,000
            </h2>
          </div>
          <button className="text-[#30CEA1] mt-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
        <div className="flex gap-5 items-center mb-8">
          <p className="text-[16px] text-gray-900">아파트</p>
          <button className="text-[12px] text-gray-400 underline">
            단지정보 보러가기 →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-2 mb-6">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/feature/list_detail/area.svg"
              alt="Area"
              width={12}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">면적</span>
            <span className="text-[#434343] font-medium text-[14px]">
              107/84m²
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/feature/list_detail/roombathroom.svg"
              alt="Area"
              width={12}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">
              방/욕실
            </span>
            <span className="text-[#434343] font-medium text-[14px]">
              3/2개
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/feature/list_detail/floor.svg"
              alt="Area"
              width={12}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">층수</span>
            <span className="text-[#434343] font-medium text-[14px]">
              2/20층
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Image
              src="/icons/feature/list_detail/direction.svg"
              alt="Area"
              width={14}
              height={12}
            />
            <span className="text-black text-[14px] font-semibold">방향</span>
            <span className="text-[#434343] font-medium text-[14px]">남향</span>
          </div>
        </div>

        <div className="px-5 py-4 border-[#F4F4F4] w-full h-30 bg-[#F8FAFB]">
          <div className="flex items-center gap-1 mb-1">
            <Image
              src="/icons/feature/list_detail/curation.svg"
              alt="Area"
              width={15}
              height={15}
              className="mb-1"
            />
            <p className="text-[14px] text-[#2EA98C] font-semibold">
              이 집이 가진 강점을 확인해보세요.
            </p>
          </div>
          <p className="text-[12px] text-gray-400 mb-5">
            컬러로 표시된 키워드는 유저 님의 관심사와 일치하는 키워드에요
          </p>
          <div className="flex gap-2">
            {priorityFactors.map((a, i) => {
              return (
                <span
                  key={i}
                  className={`px-3 py-1.5  text-[13px] rounded-full font-bold border 
                    ${a === "소음" && "border-[#FBBA78] text-[#FBBA78] bg-[#FFFCF6]"}
                    ${a === "환경" && "border-[#82AA82] text-[#82AA82] bg-[#F8FCF8]"}
                    ${a === "편의" && "border-gray-300 text-gray-400 bg-gray-50"}
                    ${a === "안전" && "border-[#F48787] text-[#F48787] bg-[#FFF7F7]"}
                    ${a === "접근성" && "border-[#7CB7CD] text-[#7CB7CD] bg-[#F7FCFE]"}`}
                >
                  {a}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Curation Badge Section */}
    </section>
  );
};

export default SummarySection;
