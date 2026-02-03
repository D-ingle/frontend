"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { cn } from "@/app/lib/utils";
import PriorityToggle from "../ui/PriorityToggle";

const DISTRICTS = [
  "종로구",
  "중구",
  "용산구",
  "성동구",
  "광진구",
  "동대문구",
  "중랑구",
  "성북구",
  "강북구",
  "도봉구",
  "노원구",
  "은평구",
  "서대문구",
  "마포구",
  "양천구",
  "강서구",
  "구로구",
  "금천구",
  "영등포구",
  "동작구",
  "관악구",
  "서초구",
  "강남구",
  "송파구",
  "강동구",
];

const HOUSING_TYPES = [
  { id: "one-room", label: "원룸", icon: "/icons/navigation/ativate/room.svg" },
  {
    id: "villa",
    label: "빌라 · 투룸",
    icon: "/icons/navigation/ativate/room_two.svg",
  },
  {
    id: "officetel",
    label: "오피스텔",
    icon: "/icons/navigation/ativate/officetel.svg",
  },
  {
    id: "apartment",
    label: "아파트",
    icon: "/icons/navigation/ativate/apt.svg",
  },
];

const CurationInfo = () => {
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    "safety",
    "accessibility",
    "convenience",
  ]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "강남구",
    "관악구",
    "송파구",
  ]);
  const [selectedHousingType, setSelectedHousingType] =
    useState<string>("one-room");
  const [isRegionOpen, setIsRegionOpen] = useState(true);

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const toggleRegion = (name: string) => {
    setSelectedRegions((prev) => {
      if (prev.includes(name)) {
        return prev.filter((r) => r !== name);
      }
      if (prev.length < 3) {
        return [...prev, name];
      }
      return prev;
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-5 w-240">
      {/* Card Container */}
      <div className="bg-white border-2 border-[#f0f0f0] rounded-xl p-15 flex flex-col gap-15">
        {/* Header Section */}
        <div className="flex flex-col gap-7 w-full">
          <div className="flex items-center">
            <h2 className="text-[28px] font-extrabold text-gray-800 leading-normal opacity-90 m-0 p-0">
              큐레이션 정보
            </h2>
          </div>
          <div className="h-px bg-[#D9D9D9] w-full" />
        </div>

        {/* My Priorities */}
        <div className="flex flex-col gap-6">
          <div className="flex items-baseline gap-2.5">
            <h3 className="text-[20px] font-bold text-black">나의 우선순위</h3>
            <span className="text-[14px] text-gray-400 font-medium">
              최대 3개 선택가능
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <PriorityToggle
              selectedPriorities={selectedPriorities}
              onToggle={togglePriority}
            />
          </div>
        </div>

        {/* Frequent Spot */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[20px] font-bold text-black">자주가는 스팟</h3>
          <div className="bg-gray-50 rounded-xl p-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image
                  src="/icons/feature/list_detail/school/mappin.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[18px] font-bold text-black leading-normal">
                  신한 익스페이스
                </span>
                <span className="text-[14px] text-gray-400 font-medium">
                  서울특별시 중구 명동 10길 52
                </span>
              </div>
            </div>
            <button className="px-6 py-2 bg-gray-200 text-gray-600 rounded-md text-[14px] font-bold hover:bg-gray-300 transition-colors">
              변경하기
            </button>
          </div>
        </div>

        {/* Preferred Regions */}
        <div className="flex flex-col gap-6">
          <div className="flex items-baseline gap-2.5">
            <h3 className="text-[20px] font-bold text-black">선호 지역구</h3>
            <span className="text-[14px] text-gray-400 font-medium">
              최대 3개 선택가능
            </span>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 flex flex-col gap-8">
            <div className="flex justify-between items-center h-4">
              <div className="flex gap-3">
                {selectedRegions.map((r) => (
                  <span
                    key={r}
                    className="px-5 py-2 bg-white border border-main-400 text-main-500 rounded-full text-[16px] font-bold flex items-center gap-2"
                  >
                    {r}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className="text-gray-400"
              >
                {isRegionOpen ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </button>
            </div>

            <div className="h-px bg-gray-200 w-full" />

            {isRegionOpen && (
              <div className="grid grid-cols-5 gap-y-4 gap-x-2">
                {DISTRICTS.map((d) => {
                  const isSelected = selectedRegions.includes(d);
                  return (
                    <button
                      key={d}
                      onClick={() => toggleRegion(d)}
                      className={cn(
                        "py-2 px-1 rounded-full border text-[14px] font-bold transition-all duration-200",
                        isSelected
                          ? "bg-main-100 border-main-400 text-main-500"
                          : "bg-white border-gray-200 text-gray-400 hover:border-main-400/50",
                      )}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Preferred Housing Type */}
        <div className="flex flex-col gap-6">
          <h3 className="text-[20px] font-bold text-black">선호 주거 형태</h3>
          <div className="flex gap-4 items-center justify-start">
            {HOUSING_TYPES.map((type) => {
              const isSelected = selectedHousingType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedHousingType(type.id)}
                  className={cn(
                    "w-50 flex items-center justify-center gap-3 h-15 rounded-xl border-2 transition-all duration-300",
                    isSelected
                      ? " border-main-400 text-main-500 shadow-sm bg-[#DEFAF2]"
                      : "border-transparent text-gray-400 hover:border-main-400/30",
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center bg-transparent",
                    )}
                  >
                    <Image
                      src={type.icon}
                      alt={type.label}
                      width={32}
                      height={32}
                      className={cn(!isSelected && "grayscale opacity-50")}
                    />
                  </div>
                  <span className="text-[20px] font-bold">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-5">
        <button
          onClick={() => {
            console.log("Saving Curation Data:", {
              selectedPriorities,
              selectedRegions,
              selectedHousingType,
            });
          }}
          className="w-54.75 h-15 bg-navy text-white rounded-md text-[20px] font-bold flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default CurationInfo;
