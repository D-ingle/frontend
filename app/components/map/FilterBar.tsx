"use client";

import React, { useState } from "react";
import Image from "next/image";
import TransactionTypeDropdown from "./TransactionTypeDropdown";
import ResidenceTypeDropdown from "./ResidenceTypeDropdown";
import SpaceDropdown from "./SpaceDropdown";
import { useEffect } from "react";
import { useRef } from "react";

/**
 * FilterBar Component
 * 검색어 입력, 거래 유형, 주거 형태, 평수 필터 및 초기화 버튼을 포함하는 바
 */
export default function FilterBar() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  //(거래 유형 드랍박스 상태값들)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [depositRange, setDepositRange] = useState<[number, number]>([0, 0]); // in 10k KRW (만원)
  const [monthlyRentRange, setMonthlyRentRange] = useState<[number, number]>([
    0, 0,
  ]);
  const [salePriceRange, setSalePriceRange] = useState<[number, number]>([
    0, 0,
  ]);

  //(주거 형태 드랍박스 상태값)
  const [selectedResidenceTypes, setSelectedResidenceTypes] = useState<
    string[]
  >([]);

  //(평수 드랍박스 상태값)
  const [spaceRange, setSpaceRange] = useState<[number, number]>([0, 60]);

  const toggleFilter = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilter]);

  /**
   * 거래 유형 버튼 라벨 생성 함수
   */
  const getTransactionTypeLabel = () => {
    if (selectedTypes.length === 0) return "거래 유형";

    const parts: string[] = [];
    if (selectedTypes.includes("전세")) parts.push("전세");
    if (selectedTypes.includes("월세")) parts.push("월세");
    if (selectedTypes.includes("매매")) parts.push("매매");

    const baseLabel = parts.join("/");

    // Summary logic for labels
    const format = (range: [number, number], unit: string) => {
      const min = range[0];
      const max = range[1];
      const formattedMin =
        min >= 10000 ? `${(min / 10000).toFixed(0)}억` : `${min}만`;
      const formattedMax =
        max >= 100000
          ? "최대"
          : max >= 10000
            ? `${(max / 10000).toFixed(0)}억`
            : `${max}만`;
      return `${unit}${formattedMin}~${formattedMax}`;
    };

    const priceParts: string[] = [];
    if (selectedTypes.includes("전세") || selectedTypes.includes("월세")) {
      priceParts.push(`보${format(depositRange, "")}`);
    }
    if (selectedTypes.includes("월세")) {
      priceParts.push(`월${format(monthlyRentRange, "")}`);
    }
    if (selectedTypes.includes("매매")) {
      priceParts.push(`매${format(salePriceRange, "")}`);
    }

    const priceLabel = priceParts.length > 0 ? ` ${priceParts.join(", ")}` : "";

    return `${baseLabel}${priceLabel}`;
  };

  /**
   * 주거 형태 버튼 라벨 생성 함수
   */
  const getResidenceTypeLabel = () => {
    if (selectedResidenceTypes.length === 0) return "주거 형태";
    return selectedResidenceTypes.join(", ");
  };

  /**
   * 평수 버튼 라벨 생성 함수
   */
  const getSpaceLabel = () => {
    if (spaceRange[0] === 0 && spaceRange[1] === 60) return "평수";

    const format = (val: number) => {
      if (val >= 60) return "60평 이상";
      if (val <= 10) return "10평 미만";
      return `${val}평`;
    };

    return `${format(spaceRange[0])}~${format(spaceRange[1])}`;
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setDepositRange([0, 0]);
    setMonthlyRentRange([0, 0]);
    setSalePriceRange([0, 0]);
    setSelectedResidenceTypes([]);
    setSpaceRange([0, 60]);
    setOpenFilter(null);
  };

  return (
    <div className="flex items-center gap-6 bg-white w-full h-20 px-5 py-4 border-b border-[#E4E4E4]">
      {/* 검색 입력 영역 */}
      <div className="relative flex items-center w-[366px]">
        <input
          type="text"
          placeholder="지역, 단지, 지하철역 등을 입력하세요"
          className="w-[366px] h-12 pl-5 pr-12 bg-[#F8FAFB] border border-[#E4E4E4] rounded-lg text-[16px] text-[#707070] placeholder:text-[#C4C4C4] focus:outline-none focus:border-[#30CEA1] transition-colors"
        />
        <div className="absolute right-4 flex items-center justify-center pointer-events-none">
          <Image
            src="/icon/search_icon.svg"
            alt="Search"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* 필터 버튼들 */}
      <div ref={dropdownRef} className="flex items-center gap-2.5">
        <div className="relative min-w-28">
          <FilterButton
            label={getTransactionTypeLabel()}
            focus={openFilter === "거래 유형"}
            active={selectedTypes.length > 0}
            onClick={() => toggleFilter("거래 유형")}
          />
          {openFilter === "거래 유형" && (
            <TransactionTypeDropdown
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              depositRange={depositRange}
              setDepositRange={setDepositRange}
              monthlyRentRange={monthlyRentRange}
              setMonthlyRentRange={setMonthlyRentRange}
              salePriceRange={salePriceRange}
              setSalePriceRange={setSalePriceRange}
            />
          )}
        </div>
        <div className="relative min-w-28">
          <FilterButton
            label={getResidenceTypeLabel()}
            focus={openFilter === "주거 형태"}
            active={selectedResidenceTypes.length > 0}
            onClick={() => toggleFilter("주거 형태")}
          />
          {openFilter === "주거 형태" && (
            <ResidenceTypeDropdown
              selectedTypes={selectedResidenceTypes}
              setSelectedTypes={setSelectedResidenceTypes}
            />
          )}
        </div>
        <div className="relative min-w-20">
          <FilterButton
            label={getSpaceLabel()}
            focus={openFilter === "평수"}
            active={spaceRange[0] !== 0 || spaceRange[1] !== 60}
            onClick={() => toggleFilter("평수")}
          />
          {openFilter === "평수" && (
            <SpaceDropdown range={spaceRange} setRange={setSpaceRange} />
          )}
        </div>
      </div>

      {/* 필터 초기화 */}
      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
      >
        <Image src="/icon/rotate_icon.svg" alt="Reset" width={20} height={20} />
        <span className="text-[16px] text-[#707070]">필터 초기화</span>
      </button>
    </div>
  );
}

/**
 * FilterButton Sub-component
 * 드롭다운 트리거 역할을 하는 버튼
 */
function FilterButton({
  label,
  focus,
  active,
  onClick,
}: {
  label: string;
  focus?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-full h-12 px-2 border rounded-lg transition-colors group  ${
        active
          ? "border-[#30CEA1] bg-[#E8FBF6]"
          : focus
            ? "border-[#30CEA1]"
            : "border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#30CEA1]"
      } hover:bg-[#f5f5f5]`}
    >
      <span
        className={`text-[16px] font-medium ${
          active ? "text-[#30CEA1]" : "text-[#434343]"
        }`}
      >
        {label}
      </span>
      <ChevronDownIcon
        className={`ml-2 transition-transform duration-200 text-gray-400 ${
          focus && "rotate-180"
        }`}
      />
    </button>
  );
}

/**
 * ChevronDownIcon
 * 드롭다운 표시를 위한 화살표 아이콘 (SVG)
 */
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}
