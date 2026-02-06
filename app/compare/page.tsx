"use client";

import React, { useState } from "react";
import CompareSidebar from "../components/mypage/CompareSidebar";
import CompareMain from "../components/mypage/CompareMain";

// Shared interfaces for simplicity in this file
interface House {
  id: string;
  price: string;
  name: string;
  area: string;
  floor: string;
  image: string;
  location: string;
}

const MOCK_HOUSES: House[] = [
  {
    id: "1",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
    location: "서울시 중구",
  },
  {
    id: "2",
    price: "전세 6억 9,000",
    name: "아파트 남산타운아파트 101동",
    area: "면적 110/85m²",
    floor: "층수 5/15층",
    image: "/images/mockup/item.png",
    location: "서울시 중구",
  },
  {
    id: "3",
    price: "전세 5억 5,000",
    name: "빌라 옥수동 빌라",
    area: "면적 60/45m²",
    floor: "층수 3/5층",
    image: "/images/mockup/item.png",
    location: "서울시 성동구",
  },
  {
    id: "4",
    price: "전세 6억 9,000",
    name: "아파트 약수 하이츠 104동",
    area: "면적 107/84m²",
    floor: "층수 2/20층",
    image: "/images/mockup/item.png",
    location: "서울시 중구",
  },
  {
    id: "5",
    price: "전세 6억 9,000",
    name: "아파트 남산타운아파트 101동",
    area: "면적 110/85m²",
    floor: "층수 5/15층",
    image: "/images/mockup/item.png",
    location: "서울시 중구",
  },
  {
    id: "6",
    price: "전세 5억 5,000",
    name: "빌라 옥수동 빌라",
    area: "면적 60/45m²",
    floor: "층수 3/5층",
    image: "/images/mockup/item.png",
    location: "서울시 성동구",
  },
];

const MOCK_CURATION: any = {
  "1": {
    summary:
      "조용한 주거 환경을 선호하는 딩글님께 추천하는 집이에요. 밤늦은 귀갓길도 CCTV와 밝은 가로등 덕분에 안심할 수 있어요.",
    tags: ["안전", "소음"],
    scores: { 소음: 96, 환경: 70, 안전: 80, 편의: 80, 접근성: 60 },
  },
  "2": {
    summary:
      "주변에 병원, 은행 등 필수 인프라가 잘 갖춰져 있어요. 바쁜 일상 속에서 라이프스타일이 한층 편리해집니다.",
    tags: ["접근성", "편의"],
    scores: { 소음: 60, 환경: 60, 안전: 60, 편의: 95, 접근성: 90 },
  },
  "3": {
    summary:
      "주변에 병원, 은행 등 필수 인프라가 잘 갖춰져 있어요. 바쁜 일상 속에서 라이프스타일이 한층 편리해집니다.",
    tags: ["접근성", "편의"],
    scores: { 소음: 60, 환경: 60, 안전: 60, 편의: 95, 접근성: 90 },
  },
  "4": {
    summary:
      "주변에 병원, 은행 등 필수 인프라가 잘 갖춰져 있어요. 바쁜 일상 속에서 라이프스타일이 한층 편리해집니다.",
    tags: ["접근성", "편의"],
    scores: { 소음: 60, 환경: 60, 안전: 60, 편의: 95, 접근성: 90 },
  },
  "5": {
    summary:
      "주변에 병원, 은행 등 필수 인프라가 잘 갖춰져 있어요. 바쁜 일상 속에서 라이프스타일이 한층 편리해집니다.",
    tags: ["접근성", "편의"],
    scores: { 소음: 60, 환경: 60, 안전: 60, 편의: 95, 접근성: 90 },
  },
  "6": {
    summary:
      "주변에 병원, 은행 등 필수 인프라가 잘 갖춰져 있어요. 바쁜 일상 속에서 라이프스타일이 한층 편리해집니다.",
    tags: ["접근성", "편의"],
    scores: { 소음: 60, 환경: 60, 안전: 60, 편의: 95, 접근성: 90 },
  },
};

const MOCK_BASIC_INFO: any = {
  "1": {
    건물명: "약수하이츠 104동",
    주소: "서울시 중구 동호로 10길 30 101동",
    매물형태: "아파트",
    면적: "110.39m²/142.65m²",
    층수: "11층/20층",
    방향: "남향",
    주차: "0 / 1.2대",
  },
};

const ComparePage = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1", "2"]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  // Always ensure we have 3 slots, padded with null if necessary
  const displayIds = [...selectedIds, null, null, null].slice(0, 3);

  const selectedHouses = displayIds.map((id) =>
    id ? MOCK_HOUSES.find((h) => h.id === id) : null,
  ) as (House | null)[];

  const curationData = displayIds.map((id) => (id ? MOCK_CURATION[id] : null));

  const basicInfo = displayIds.map((id) => {
    if (!id) return null;
    return (
      MOCK_BASIC_INFO[id] ||
      (MOCK_BASIC_INFO["1"]
        ? {
            ...MOCK_BASIC_INFO["1"],
            건물명: MOCK_HOUSES.find((h) => h.id === id)?.name || "정보 없음",
          }
        : null)
    );
  });

  return (
    <div className="flex w-full h-full bg-white mt-20">
      <CompareSidebar
        selectedIds={selectedIds}
        onToggle={toggleSelection}
        userName="딩글"
      />
      <div className="flex-1">
        <CompareMain
          selectedHouses={selectedHouses}
          curationData={curationData}
          basicInfo={basicInfo}
          onRemove={toggleSelection}
        />
      </div>
    </div>
  );
};

export default ComparePage;
