"use client";

import React from "react";
import RangeSlider from "../../ui/RangeSlider";

interface SpaceDropdownProps {
  range: [number, number];
  setRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export default function SpaceDropdown({ range, setRange }: SpaceDropdownProps) {
  /**
   * 평수 텍스트 포맷팅 함수
   */
  const formatSpace = (val: number) => {
    if (val >= 60) return "60평 이상";
    if (val <= 10) return "10평 미만";
    return `${val}평`;
  };

  return (
    <div className="absolute top-[calc(100%+8px)] left-0 w-79.5 p-5 bg-white border border-[#E4E4E4] rounded-xl shadow-lg z-50">
      {/* Header */}
      <div className="flex items-baseline gap-2.5 mb-5">
        <h3 className="text-[16px] font-bold text-black leading-none">평수</h3>
        <span className="text-[12px] font-medium text-[#C4C4C4] leading-none">
          중복 선택 가능
        </span>
      </div>

      <RangeSlider
        title="평수"
        range={range}
        setRange={setRange}
        max={60}
        formatValue={formatSpace}
        showUnit={false}
      />
    </div>
  );
}
