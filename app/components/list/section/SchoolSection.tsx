"use client";

import React, { useState } from "react";
import Image from "next/image";

const SchoolSection = () => {
  const [activeTab, setActiveTab] = useState("elementary");

  const tabs = [
    { id: "elementary", label: "초등학교" },
    { id: "middle", label: "중학교" },
    { id: "high", label: "고등학교" },
  ];

  const schools = {
    elementary: [
      {
        name: "서울매란초등학교",
        type: "공립",
        distance: "394m",
        time: "도보 5분",
      },
      {
        name: "서울장수초등학교",
        type: "사립",
        distance: "620m",
        time: "도보 10분",
      },
    ],
    middle: [
      { name: "대경중학교", type: "사립", distance: "450m", time: "도보 7분" },
    ],
    high: [
      {
        name: "대경정보산업고등학교",
        type: "사립",
        distance: "510m",
        time: "도보 8분",
      },
    ],
  };

  const currentSchools = schools[activeTab as keyof typeof schools] || [];

  return (
    <section className="px-5 py-8 bg-white" id="school">
      <h3 className="text-[20px] font-bold text-[#000000] mb-6">학군 정보</h3>

      {/* Internal Tabs */}
      <div className="flex gap-2 p-2 bg-[#F8FAFB] rounded-lg mb-8 uppercase">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 h-9 rounded text-[14px] font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-navy text-white shadow-sm"
                : "bg-white text-black border border-[#F5F5F5]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Assign School Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between px-3 py-2 bg-[#F8FAFB] rounded-lg mb-6">
          <span className="text-[14px] font-bold text-navy">학군배정 학교</span>
          <span className="text-[12px] text-[#9D9D9D]">서울청구초통학구역</span>
        </div>

        <div className="flex flex-col gap-8 px-1">
          {currentSchools.map((school, idx) => (
            <div key={idx} className="group cursor-pointer relative">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[18px] font-bold text-[#000000]">
                    {school.name}
                  </span>
                  <span className="text-[13px] text-[#9D9D9D]">
                    {school.type}/공학
                  </span>
                </div>
                <Image
                  src="/list_detail/thumbnail/arrow.svg"
                  alt="Arrow"
                  width={20}
                  height={20}
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[16px] text-[#9D9D9D]">
                  학교까지 거리
                </span>
                <div className="flex items-center gap-1 ml-1 pt-0.5">
                  <Image
                    src="/list_detail/school/mappin.svg"
                    alt="Marker"
                    width={18}
                    height={18}
                  />
                  <span className="text-[18px] font-bold text-[#2EA98C]">
                    902m
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exception School Section */}
      <div>
        <div className="flex items-center px-3 py-2 bg-[#F8FAFB] rounded-lg mb-6">
          <span className="text-[14px] font-bold text-navy">
            학군배정 예외학교
          </span>
        </div>
        <div className="flex flex-col gap-8 px-1">
          {/* Mocked for demonstration mirroring Figma */}
          <div className="group cursor-pointer relative">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="text-[18px] font-bold text-[#000000]">
                  서울청구초등학교
                </span>
                <span className="text-[13px] text-[#9D9D9D]">공립/공학</span>
              </div>
              <Image
                src="/list_detail/thumbnail/arrow.svg"
                alt="Arrow"
                width={20}
                height={20}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] text-[#9D9D9D]">학교까지 거리</span>
              <div className="flex items-center gap-1 ml-1 pt-0.5">
                <Image
                  src="/list_detail/school/mappin.svg"
                  alt="Marker"
                  width={18}
                  height={18}
                />
                <span className="text-[18px] font-bold text-[#2EA98C]">
                  902m
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[#F4F4F4]" />

          <div className="group cursor-pointer relative">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-1.5 pt-0.5">
                <span className="text-[18px] font-bold text-[#000000]">
                  서울청구초등학교
                </span>
                <span className="text-[13px] text-[#9D9D9D]">사립/공학</span>
              </div>
              <Image
                src="/list_detail/thumbnail/arrow.svg"
                alt="Arrow"
                width={20}
                height={20}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] text-[#9D9D9D]">학교까지 거리</span>
              <div className="flex items-center gap-1 ml-1 pt-0.5">
                <Image
                  src="/list_detail/school/mappin.svg"
                  alt="Marker"
                  width={18}
                  height={18}
                />
                <span className="text-[18px] font-bold text-[#2EA98C]">
                  902m
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolSection;
