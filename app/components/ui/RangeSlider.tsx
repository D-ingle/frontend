"use client";

import React, { useState, useEffect } from "react";
import * as Slider from "@radix-ui/react-slider";

interface RangeSliderProps {
  title: string;
  range: [number, number];
  setRange: (value: [number, number]) => void;
  max: number;
  formatValue: (val: number) => string;
  showUnit?: boolean;
}

export default function RangeSlider({
  title,
  range,
  setRange,
  max,
  formatValue,
  showUnit = true,
}: RangeSliderProps) {
  // 드래그 중 실시간 수치 표시를 위한 로컬 상태
  const [internalValue, setInternalValue] = useState<[number, number]>(range);

  // 외부(부모)에서 range가 변경될 경우(예: 초기화) 로컬 상태 동기화
  useEffect(() => {
    setInternalValue(range);
  }, [range]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4 leading-none">
        <span className="text-[14px] font-medium text-black">{title}</span>
        <span className="text-[16px] font-bold text-[#30CEA1]">
          {formatValue(internalValue[0])}
          {showUnit && title !== "매매가" ? "원" : ""} ~{" "}
          {formatValue(internalValue[1])}
        </span>
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 mb-1"
        value={[internalValue[0], internalValue[1]]}
        max={max}
        step={max / 100}
        minStepsBetweenThumbs={1}
        onValueChange={(value) => setInternalValue(value as [number, number])}
        onValueCommit={(value) => setRange(value as [number, number])}
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

      <div className="flex justify-between text-[12px] text-[#9D9D9D]">
        <span>0</span>
        <span>{formatValue(max / 2)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
