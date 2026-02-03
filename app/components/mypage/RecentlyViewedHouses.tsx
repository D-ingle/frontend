"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import HouseCard from "./HouseCard";

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

const RecentlyViewedHouses = () => {
  const handleHouseClick = (id: string) => {
    console.log("Navigating to house detail:", id);
    // window.location.href = `/property/${id}`;
  };

  return (
    <div className="flex-1 flex flex-col gap-15 w-240">
      {/* Content Card */}
      <div className="bg-white border-2 border-[#f0f0f0] rounded-xl p-15 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-7 w-full">
          <h2 className="text-[28px] font-extrabold text-gray-800 leading-normal opacity-90 m-0 p-0">
            최근 본 집
          </h2>
          <div className="h-px bg-[#D9D9D9] w-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {MOCK_HOUSES.map((house) => (
            <HouseCard
              key={house.id}
              {...house}
              variant="navigation"
              onClick={handleHouseClick}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 py-10 w-full">
        <div className="flex items-center gap-1.5">
          <ChevronsLeft
            className="text-gray-300 cursor-pointer hover:text-gray-500"
            size={20}
          />
          <ChevronLeft
            className="text-gray-300 cursor-pointer hover:text-gray-500"
            size={20}
          />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-[18px] font-bold text-black border-b-2 border-transparent cursor-pointer">
            1
          </span>
          <span className="text-[18px] font-medium text-gray-400 hover:text-black cursor-pointer">
            2
          </span>
          <span className="text-[18px] font-medium text-gray-400 hover:text-black cursor-pointer">
            3
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ChevronRight
            className="text-gray-400 cursor-pointer hover:text-black"
            size={20}
          />
          <ChevronsRight
            className="text-gray-400 cursor-pointer hover:text-black"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedHouses;
