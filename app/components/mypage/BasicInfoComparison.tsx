"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

interface BasicInfo {
  건물명: string;
  주소: string;
  매물형태: string;
  면적: string;
  층수: string;
  배당층_총층수: string;
  방향: string;
  주차: string;
}

interface BasicInfoComparisonProps {
  data: (BasicInfo | null)[]; // Up to 3
}

const InfoCard = ({
  info,
  isEmpty = false,
}: {
  info: BasicInfo | null;
  isEmpty?: boolean;
}) => {
  if (isEmpty || !info) {
    return (
      <div className="bg-white content-stretch flex h-[440px] items-center justify-center px-[18px] py-[21px] relative rounded-[10px] shrink-0 w-[350px] border border-[#d9d9d9] border-solid">
        <p className="font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[16px] text-[#9d9d9d] tracking-[0.55px] uppercase">
          비교 결과가 없습니다
        </p>
      </div>
    );
  }

  const rows = [
    { label: "건물명", value: info.건물명 },
    { label: "주소", value: info.주소 },
    { label: "매물형태", value: info.매물형태 },
    { label: "전용면적/\n공급면적", value: info.면적 },
    { label: "해당층/총층수", value: info.층수 },
    { label: "방향", value: info.방향 },
    { label: "총 주차대수/\n전기차 충전소", value: info.주차 },
  ];

  return (
    <div className="bg-white border border-[#d9d9d9] border-solid content-stretch flex items-start justify-center px-[18px] py-[21px] relative rounded-[10px] shrink-0 w-[350px]">
      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[301px]">
        {rows.map((row, idx) => (
          <React.Fragment key={idx}>
            <div className="content-stretch flex font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold gap-[16px] items-start leading-[20px] relative shrink-0 text-[16px] tracking-[0.55px] uppercase w-full">
              <p className="relative shrink-0 text-[#9d9d9d] w-[100px] whitespace-pre-wrap">
                {row.label}
              </p>
              <p className="relative shrink-0 text-[#555] flex-1">
                {row.value}
              </p>
            </div>
            {idx !== rows.length - 1 && (
              <div className="bg-[#e5e5e5] h-px shrink-0 w-full" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const BasicInfoComparison = ({ data }: BasicInfoComparisonProps) => {
  return (
    <div className="flex gap-[35px] items-start w-full">
      {[0, 1, 2].map((i) => (
        <InfoCard key={i} info={data[i]} isEmpty={!data[i]} />
      ))}
    </div>
  );
};

export default BasicInfoComparison;
