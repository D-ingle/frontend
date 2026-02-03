"use client";

import React from "react";
import Checkbox from "../../ui/Checkbox";
import RangeSlider from "../../ui/RangeSlider";

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
