"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface InfoBadgeProps {
  icon: string;
  label: string;
  bgColor: string;
  className?: string;
  /** Figma의 absolute x, y 좌표를 직접 전달받아 배치 최적화 */
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export default function InfoBadge({
  icon,
  label,
  bgColor,
  className,
  style,
  height,
  width,
}: InfoBadgeProps) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-[8px] px-[17px] py-px rounded-[30px] w-[138px] h-[44px] bg-white/60 border border-white/80 shadow-[0px_3px_10.5px_0px_rgba(104,191,166,0.36),0px_5px_9.6px_0px_rgba(30,154,119,0.1)] backdrop-blur-[5px] z-20",
        className,
      )}
      style={style}
    >
      <div
        className="flex items-center justify-center shrink-0 w-[29px] h-[29px] rounded-[5px]"
        style={{ backgroundColor: bgColor }}
      >
        <div className="relative w-5.25 h-5.25 flex items-center justify-center">
          <Image
            src={icon}
            alt={label}
            width={width}
            height={height}
            className="object-contain"
          />
        </div>
      </div>
      <span className="text-[14px] font-semibold text-black tracking-[-0.1504px] whitespace-nowrap leading-[1.3]">
        {label}
      </span>
    </div>
  );
}
