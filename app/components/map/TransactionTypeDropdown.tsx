"use client";

import React, { useEffect, useRef } from "react";
import * as Slider from "@radix-ui/react-slider";

interface TransactionTypeDropdownProps {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  depositRange: [number, number];
  setDepositRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  monthlyRentRange: [number, number];
  setMonthlyRentRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  salePriceRange: [number, number];
  setSalePriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

export default function TransactionTypeDropdown({
  selectedTypes,
  setSelectedTypes,
  depositRange,
  setDepositRange,
  monthlyRentRange,
  setMonthlyRentRange,
  salePriceRange,
  setSalePriceRange,
}: TransactionTypeDropdownProps) {
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  /**
   * 보증금 텍스트 포맷팅 함수
   */
  const formatDeposit = (val: number) => {
    if (val >= 100000) return "최대";
    if (val >= 10000) return `${(val / 10000).toFixed(0)}억`;
    return `${val}만`;
  };

  return (
    <div className="absolute top-[calc(100%+8px)] left-0 w-79.5 p-5 bg-white border border-[#E4E4E4] rounded-xl shadow-lg z-50">
      {/* Header */}
      <div className="flex items-baseline gap-2.5 mb-5">
        <h3 className="text-[16px] font-bold text-black leading-none">
          거래 유형
        </h3>
        <span className="text-[12px] font-medium text-[#C4C4C4] leading-none">
          중복 선택 가능
        </span>
      </div>

      {/* Checkbox Group */}
      <div className="flex items-center gap-2.5 mb-5">
        <Checkbox
          label="월세"
          checked={selectedTypes.includes("월세")}
          onChange={() => toggleType("월세")}
        />
        <Checkbox
          label="전세"
          checked={selectedTypes.includes("전세")}
          onChange={() => toggleType("전세")}
        />
        <Checkbox
          label="매매"
          checked={selectedTypes.includes("매매")}
          onChange={() => toggleType("매매")}
        />
      </div>

      {/* Divider */}
      {selectedTypes.length > 0 && (
        <div className="h-px bg-[#F1F1F1] w-full mb-5" />
      )}

      {/* Price Section */}
      <div className="flex flex-col gap-6">
        {/* 보증금 슬라이더 (월세 or 전세 체크 시) */}
        {(selectedTypes.includes("월세") || selectedTypes.includes("전세")) && (
          <RangeSlider
            title="보증금"
            range={depositRange}
            setRange={setDepositRange}
            max={100000} // 10억
            formatValue={formatDeposit}
          />
        )}

        {/* 월세 슬라이더 (월세 체크 시) */}
        {selectedTypes.includes("월세") && (
          <RangeSlider
            title="월세"
            range={monthlyRentRange}
            setRange={setMonthlyRentRange}
            max={500} // 500만
            formatValue={(val) => (val >= 500 ? "최대" : `${val}만`)}
          />
        )}

        {/* 매매가 슬라이더 (매매 체크 시) */}
        {selectedTypes.includes("매매") && (
          <RangeSlider
            title="매매가"
            range={salePriceRange}
            setRange={setSalePriceRange}
            max={1000000} // 100억
            formatValue={(val) =>
              val >= 1000000
                ? "최대"
                : val >= 10000
                  ? `${(val / 10000).toFixed(0)}억`
                  : `${val}만`
            }
          />
        )}
      </div>
    </div>
  );
}

/**
 * Reusable RangeSlider Sub-component
 */
function RangeSlider({
  title,
  range,
  setRange,
  max,
  formatValue,
}: {
  title: string;
  range: [number, number];
  setRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  max: number;
  formatValue: (val: number) => string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[14px] font-medium text-black">{title}</span>
        <span className="text-[16px] font-bold text-[#30CEA1]">
          {formatValue(range[0])}
          {title === "매매가" ? "" : "원"} ~ {formatValue(range[1])}
        </span>
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 mb-1"
        value={[range[0], range[1]]}
        max={max}
        step={max / 100}
        minStepsBetweenThumbs={1}
        onValueChange={(value) => setRange(value as [number, number])}
      >
        <Slider.Track className="bg-[#E4E4E4] relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-[#30CEA1] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-[#30CEA1] rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform focus:outline-none"
          aria-label={`${title} min`}
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-[#30CEA1] rounded-full shadow-sm cursor-pointer hover:scale-110 transition-transform focus:outline-none"
          aria-label={`${title} max`}
        />
      </Slider.Root>

      <div className="flex justify-between text-[12px] text-[#C4C4C4]">
        <span>0</span>
        <span>{formatValue(max / 2)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={onChange}
        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
          checked
            ? "bg-[#30CEA1] border-[#30CEA1]"
            : "border-[#D9D9D9] bg-white"
        }`}
      >
        {checked && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="text-[16px] font-medium text-[#434343]">{label}</span>
    </label>
  );
}
