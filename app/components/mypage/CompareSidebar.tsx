"use client";

import React, { useState } from "react";
import CompareSidebarCard from "./CompareSidebarCard";
import { Search } from "lucide-react";
import Image from "next/image";

interface House {
  id: string;
  price: string;
  name: string;
  area: string;
  floor: string;
  image: string;
}

const MOCK_HOUSES: House[] = [
  {
    id: "1",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
  },
  {
    id: "2",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
  },
  {
    id: "3",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
  },
  {
    id: "4",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
  },
  {
    id: "5",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
  },
  {
    id: "6",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
  },
];

interface CompareSidebarProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
  userName: string;
}

const CompareSidebar = ({
  selectedIds,
  onToggle,
  userName,
}: CompareSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHouses = MOCK_HOUSES.filter((house) =>
    house.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-[400px] bg-white border-r border-[#D9D9D9] flex flex-col h-[calc(100vh-80px)] sticky top-[80px] left-0 z-20">
      {/* Sidebar Header */}
      <div className="flex flex-col px-[17px] pt-[32px] gap-[24px]">
        {/* Title */}
        <div className="flex gap-[8px] items-center">
          <div className="size-[24px] relative flex items-center justify-center mb-1">
            <Image
              src="/icons/feature/list/curation.svg"
              alt="logo"
              width={18}
              height={18}
            />
          </div>
          <div className="content-stretch flex gap-[2px] items-center leading-[24px] relative shrink-0 text-[18px] text-[#262626] tracking-[-0.6px]">
            <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold relative shrink-0">
              {userName}
            </p>
            <p className="font-['Pretendard_Variable:Medium',sans-serif] font-medium relative shrink-0">
              님의 매물 비교하기
            </p>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-[16px] font-medium text-[#7B7B7B] tracking-[-0.6px] -mt-[20px] ml-[32px] opacity-90">
          비교하고 싶은 매물을 클릭해 보세요
        </p>

        {/* Search Bar */}
        <div className="bg-[#F8FAFB] border border-[#E5E5E5] rounded-[4px] h-[48px] px-[12px] py-[10px] flex items-center justify-between">
          <input
            type="text"
            placeholder="찜한 목록 내에서 검색해보세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-[14px] font-medium text-[#262626] placeholder:text-[#7B7B7B] tracking-[-0.6px] w-full"
          />
          <Search size={24} className="text-[#7B7B7B] shrink-0" />
        </div>
      </div>

      {/* House List */}
      <div className="flex-1 overflow-y-auto px-[17px] mt-[24px] flex flex-col gap-[12px] pb-[40px] no-scrollbar">
        {filteredHouses.map((house) => (
          <CompareSidebarCard
            key={house.id}
            {...house}
            isSelected={selectedIds.includes(house.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default CompareSidebar;
