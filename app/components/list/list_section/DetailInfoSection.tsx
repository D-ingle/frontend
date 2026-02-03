"use client";

import React from "react";
import Image from "next/image";

const DetailInfoSection = () => {
  const details = [
    { label: "단지명", value: "약수하이츠" },
    { label: "주소", value: "서울시 중구 다산로10길 30 101동 1102호" },
    { label: "매물 형태", value: "아파트" },
    { label: "전용/공용면적", value: "110.33m²/142.65m²", subValue: "/" },
    { label: "해당층/총층", value: "11층/20층" },
    { label: "방/욕실", value: "3개/2개" },
    { label: "방향", value: "남향" },
    { label: "세대당 주차대수/주차장 형태", value: "1.2대/자주식" },
  ];

  return (
    <section className="px-5 py-8 bg-white" id="detail">
      <h3 className="text-[18px] font-bold text-[#000000] mb-6">상세 정보</h3>

      {/* Floor Plan Image */}
      <div className="relative w-full aspect-401/300 bg-white border border-[#E5E5E5] rounded-xl mb-8 overflow-hidden flex items-center justify-center p-4">
        <Image
          src="/images/mockup/cad.png" // Placeholder SVG link from context or similar
          alt="Floor Plan"
          width={360}
          height={260}
          className="object-contain"
        />
      </div>

      {/* Info Table */}
      <div className="flex flex-col border-t border-[#ffffff]">
        {details.map((detail, index) => (
          <div
            key={index}
            className={`flex py-4 border-t border-[#F4F4F4] text-[14px] ${index === 0 ? "border-t-0" : ""}`}
          >
            <span className="w-1/3 text-[#9D9D9D] leading-tight pr-4 font-bold">
              {detail.label}
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[#434343] font-medium leading-tight text-right flex-1">
                {detail.value}
              </span>
              {detail.subValue && (
                <button className="ml-2 px-2 py-0.5 border border-[#D9D9D9] rounded text-[10px] text-[#9D9D9D]">
                  면적
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailInfoSection;
