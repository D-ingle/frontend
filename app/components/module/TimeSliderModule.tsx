"use client";

import React, { useState } from "react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TimeSliderModule = () => {
  const [time, setTime] = useState(12); // Default to 12:00

  const formatTime = (t: number) => {
    const hours = Math.floor(t);
    const minutes = Math.round((t - hours) * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(parseFloat(e.target.value));
  };

  return (
    <div
      className={cn(
        "backdrop-blur-[2.3px] bg-white/90 px-[28px] py-[16px] rounded-[16px] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto",
        "w-[516px]", // 460px content + 28px * 2 padding
      )}
    >
      <div className="flex flex-col gap-[12px] w-full">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <p className="font-semibold text-[18px] text-black tracking-[-0.15px]">
            시간대별 데이터 보기
          </p>
          <div className="flex gap-[5px] items-center">
            <div className="w-5 h-5 flex items-center justify-center">
              <Image
                src="/icons/module/time/time.svg"
                width={20}
                height={20}
                alt="Time"
              />
            </div>
            <p className="font-bold text-[16px] text-[#063152] tracking-[-0.15px]">
              {formatTime(time)}
            </p>
          </div>
        </div>

        {/* Slider Area */}
        <div className="relative w-full h-[60px] flex flex-col justify-end pb-[1px]">
          {/* Labels */}
          <div className="flex justify-between w-[459px] absolute bottom-0 left-0">
            <span className="text-[13px] font-semibold text-[#7B7B7B] tracking-[-0.15px]">
              00:00
            </span>
            <span className="text-[13px] font-semibold text-[#7B7B7B] tracking-[-0.15px] translate-x-[4px]">
              12:00
            </span>
            <span className="text-[13px] font-semibold text-[#7B7B7B] tracking-[-0.15px]">
              24:00
            </span>
          </div>

          {/* Slider Input */}
          <div className="relative w-[459px] h-[34px] flex items-center mb-[18px]">
            {/* Custom Track Background */}
            <div
              className="absolute inset-x-0 h-[14px] rounded-[7px] shadow-[inset_0px_1px_4px_0px_rgba(0,0,0,0.1)] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(205, 212, 225) 0%, rgb(191, 222, 235) 30.769%, rgb(255, 249, 229) 58.199%, rgb(240, 219, 194) 70%, rgb(133, 143, 163) 99.038%)",
              }}
            />

            <input
              type="range"
              min="0"
              max="24"
              step="0.5"
              value={time}
              onChange={handleSliderChange}
              style={{
                // @ts-expect-error - Custom CSS property for dynamic thumb icon
                "--thumb-icon": `url('/icons/module/time/${time >= 6 && time < 18 ? "sun.svg" : "moon.svg"}')`,
              }}
              className="absolute inset-0 w-full h-[34px] appearance-none bg-transparent cursor-pointer outline-none z-10
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-[34px]
                [&::-webkit-slider-thumb]:h-[34px]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#063152]
                [&::-webkit-slider-thumb]:border-[1.5px]
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]
                [&::-webkit-slider-thumb]:bg-[image:var(--thumb-icon)]
                [&::-webkit-slider-thumb]:bg-no-repeat
                [&::-webkit-slider-thumb]:bg-center
                [&::-webkit-slider-thumb]:bg-[length:20px_20px]
                [&::-webkit-slider-thumb]:transition-[background-image]
                [&::-webkit-slider-thumb]:duration-300

                [&::-moz-range-thumb]:w-[34px]
                [&::-moz-range-thumb]:h-[34px]
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#063152]
                [&::-moz-range-thumb]:border-[1.5px]
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]
                [&::-moz-range-thumb]:bg-[image:var(--thumb-icon)]
                [&::-moz-range-thumb]:bg-no-repeat
                [&::-moz-range-thumb]:bg-center
                [&::-moz-range-thumb]:bg-[length:20px_20px]
                [&::-moz-range-thumb]:border-none
                [&::-moz-range-thumb]:transition-[background-image]
                [&::-moz-range-thumb]:duration-300
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSliderModule;
