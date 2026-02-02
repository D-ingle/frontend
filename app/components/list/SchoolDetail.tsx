"use client";

import React from "react";
import { X, ChevronLeft, Building2, Users } from "lucide-react";
import Image from "next/image";

interface SchoolDetailProps {
  schoolName: string;
  onClose: () => void;
  onBack: () => void;
}

const SchoolDetail = ({ schoolName, onClose, onBack }: SchoolDetailProps) => {
  return (
    <main className="relative flex flex-col w-full h-full bg-white overflow-hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 p-5 bg-white border-b border-[#E5E5E5] flex-none">
        <div className="flex items-center gap-1 flex-1">
          <button
            onClick={onBack}
            className="p-1 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <h1 className="text-[18px] font-bold text-black truncate ml-1">
            {schoolName}
          </h1>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          <X className="w-6 h-6 text-black" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-safe">
        {/* Basic Info */}
        <div className="p-5">
          <h2 className="text-[24px] font-bold text-black mb-1">
            {schoolName}
          </h2>
          <p className="text-[15px] text-[#262626] mb-6">
            서울시 중구 동호로 15길 93
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[14px] text-[#262626]">
              <Building2 className="w-5 h-5 text-[#9D9D9D]" />
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-[#9D9D9D]">설립구분</span>
                <span>사립 · 일반고 · 공학</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#262626]">
              <Users className="w-5 h-5 text-[#9D9D9D]" />
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-[#9D9D9D]">전체 학생 수</span>
                <span>413명</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-4 bg-[#F4F4F4]" />

        {/* Graduation Status */}
        <div className="px-5 py-8">
          <h3 className="text-[18px] font-bold text-black mb-6">
            졸업생 진학 현황
          </h3>

          <div className="w-full h-12 rounded-md overflow-hidden flex mb-8">
            <div className="h-full bg-[#30CEA1]" style={{ width: "60%" }} />
            <div className="h-full bg-[#2EA98C]" style={{ width: "20%" }} />
            <div className="h-full bg-[#E5E5E5]" style={{ width: "20%" }} />
          </div>

          <div className="space-y-4">
            {[
              {
                label: "일반대",
                count: "60명",
                percent: "60%",
                color: "bg-[#30CEA1]",
              },
              {
                label: "전문대",
                count: "20명",
                percent: "20%",
                color: "bg-[#2EA98C]",
              },
              {
                label: "기타",
                count: "20명",
                percent: "20%",
                color: "bg-[#E5E5E5]",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-sm ${item.color}`} />
                  <span className="text-[15px] font-semibold text-[#262626]">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-black">
                    {item.count}
                  </span>
                  <span className="text-[15px] text-[#9D9D9D] font-medium">
                    {item.percent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4 bg-[#F4F4F4]" />

        {/* Detailed Info Table */}
        <div className="px-5 py-8">
          <h3 className="text-[18px] font-bold text-black mb-6">상세 정보</h3>
          <div className="border-t border-[#F4F4F4]">
            {[
              { label: "설립일", value: "1930.9 설립" },
              { label: "전체 학생 수", value: "413명 (남 53%, 여 47%)" },
              { label: "입학생 수", value: "52명" },
              { label: "학급당 학생 수", value: "17명" },
              { label: "학비", value: "40만원" },
              { label: "급식비", value: "4,195원" },
              { label: "주소", value: "서울시 중구 다산로 170" },
              { label: "홈페이지", value: "http://abcschool.kr", isLink: true },
              { label: "전화번호", value: "070-123-4567" },
            ].map((row, idx) => (
              <div
                key={idx}
                className="flex items-start py-4 border-b border-[#F4F4F4] text-[15px]"
              >
                <span className="w-32 shrink-0 text-[#9D9D9D] font-medium">
                  {row.label}
                </span>
                <span
                  className={`flex-1 font-bold text-black ${row.isLink ? "text-blue-500 underline" : ""}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4 bg-[#F4F4F4]" />

        {/* Nearby Complexes */}
        <div className="px-5 py-8 pb-12">
          <h3 className="text-[18px] font-bold text-black mb-6">
            같은 학군 배정 단지
          </h3>
          <div className="space-y-6 mb-8">
            {[
              {
                name: "약수하이츠",
                info: "아파트 · 중구 신당동",
                desc: "총 세대수 1,100세대",
              },
              {
                name: "청구E편한세상",
                info: "아파트 · 중구 신당동",
                desc: "총 세대수 800세대",
              },
              {
                name: "신당푸르지오",
                info: "아파트 · 중구 신당동",
                desc: "총 세대수 461세대",
              },
            ].map((complex, idx) => (
              <div
                key={idx}
                className="flex gap-4 group cursor-pointer hover:opacity-80 transition-opacity"
              >
                <div className="relative w-25 h-18.75 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/mockup/item.png"
                    alt={complex.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-[18px] font-bold text-black mb-1">
                    {complex.name}
                  </h4>
                  <p className="text-[12px] text-[#9D9D9D] mb-0.5">
                    {complex.info}
                  </p>
                  <p className="text-[12px] text-[#9D9D9D]">{complex.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full h-14 border border-[#E5E5E5] rounded-xl flex items-center justify-center gap-2 text-[16px] font-bold text-black hover:bg-gray-50 transition-colors">
            배정 단지 더보기
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default SchoolDetail;
