"use client";

import React from "react";
import Image from "next/image";
import type { PropertyInfo } from "@/shared/api/generated/model/propertyInfo";

interface DetailInfoSectionProps {
  propertyInfo?: PropertyInfo;
  floorImageUrl?: string;
}

const ORIENTATION_MAP: Record<string, string> = {
  SOUTH: "남향",
  WEST: "서향",
  EAST: "동향",
  NORTH: "북향",
  SOUTH_EAST: "남동향",
  SOUTH_WEST: "남서향",
  NORTH_EAST: "북동향",
  NORTH_WEST: "북서향",
};

const PROPERTY_TYPE_MAP: Record<string, string> = {
  APT: "아파트",
  ONE_ROOM: "원룸",
  VILLA: "빌라",
  OFFICETEL: "오피스텔",
};

const DetailInfoSection = ({
  propertyInfo,
  floorImageUrl,
}: DetailInfoSectionProps) => {
  const details = [
    { label: "단지명", value: propertyInfo?.apartmentName || "-" },
    { label: "주소", value: propertyInfo?.address || "-" },
    {
      label: "매물 형태",
      value: propertyInfo?.propertyType
        ? PROPERTY_TYPE_MAP[propertyInfo.propertyType]
        : "-",
    },
    {
      label: "전용/공용면적",
      value: `${propertyInfo?.exclusiveArea || 0}m²/${propertyInfo?.supplyArea || 0}m²`,
      subValue: "/",
    },
    {
      label: "해당층/총층",
      value: `${propertyInfo?.floor || 0}층/${propertyInfo?.totalFloor || 0}층`,
    },
    {
      label: "방/욕실",
      value: `${propertyInfo?.bedrooms || 0}개/${propertyInfo?.bathrooms || 0}개`,
    },
    {
      label: "방향",
      value: propertyInfo?.orientation
        ? ORIENTATION_MAP[propertyInfo.orientation]
        : "-",
    },
    {
      label: "세대당 주차대수/주차장 형태",
      value: `${propertyInfo?.parkingRatio || 0}대/-`,
    },
  ];

  return (
    <section className="px-5 py-8 bg-white" id="detail">
      <h3 className="text-[18px] font-bold text-[#000000] mb-6">상세 정보</h3>

      {/* Floor Plan Image */}
      <div className="relative w-full aspect-401/300 bg-white rounded-xl mb-8 overflow-hidden flex items-center justify-center p-4">
        <Image
          src={floorImageUrl || "/images/mockup/placeholder.svg"}
          alt="Floor Plan"
          fill
        />
      </div>

      {/* Info Table */}
      <div className="flex flex-col border-t border-[#ffffff]">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-center py-4 border-b border-[#F4F4F4]"
          >
            <span className="w-1/3 text-[#9D9D9D] leading-tight pr-4 font-bold">
              {detail.label}
            </span>
            <div className="flex items-center justify-between flex-1">
              <span className="text-[#434343] font-medium leading-tight text-right flex-1">
                {detail.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailInfoSection;
