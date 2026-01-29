"use client";

import React from "react";
import Checkbox from "./Checkbox";

interface ResidenceTypeDropdownProps {
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ResidenceTypeDropdown({
  selectedTypes,
  setSelectedTypes,
}: ResidenceTypeDropdownProps) {
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const options = ["아파트", "원 · 투룸", "주택 · 빌라", "오피스텔"];

  return (
    <div className="absolute top-[calc(100%+8px)] left-0 w-79.5 px-4.5 py-5 bg-white border border-[#E4E4E4] rounded-xl shadow-lg z-50">
      {/* Header */}
      <div className="flex items-baseline gap-2.5 mb-5">
        <h3 className="text-[16px] font-bold text-black leading-none">
          주거 형태
        </h3>
        <span className="text-[12px] font-medium text-[#C4C4C4] leading-none">
          중복 선택 가능
        </span>
      </div>

      {/* Checkbox Group */}
      <div className="flex flex-wrap gap-x-2.5 gap-y-5">
        {options.map((option) => (
          <Checkbox
            key={option}
            label={option}
            checked={selectedTypes.includes(option)}
            onChange={() => toggleType(option)}
          />
        ))}
      </div>
    </div>
  );
}
