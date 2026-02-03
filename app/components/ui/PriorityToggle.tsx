"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

export const PRIORITIES = [
  { id: "safety", label: "안전", color: "#F48787", bgColor: "#FFF7F7" },
  {
    id: "accessibility",
    label: "접근성",
    color: "#7CB7CD",
    bgColor: "#F7FCFE",
  },
  { id: "convenience", label: "편의", color: "#AB9FD5", bgColor: "#FAF9FD" },
  { id: "environment", label: "환경", color: "#82AA82", bgColor: "#F8FCF8" },
  { id: "noise", label: "소음", color: "#FBBA78", bgColor: "#FFFCF6" },
] as const;

export type PriorityId = (typeof PRIORITIES)[number]["id"];

interface PriorityToggleProps {
  selectedPriorities: string[];
  onToggle: (id: string) => void;
  className?: string;
  variant?: "default" | "compact";
}

const PriorityToggle = ({
  selectedPriorities,
  onToggle,
  className,
  variant = "default",
}: PriorityToggleProps) => {
  return (
    <div className={cn("flex flex-wrap gap-x-2 gap-y-4", className)}>
      {PRIORITIES.map((p) => {
        const isSelected = selectedPriorities.includes(p.id);
        const index = selectedPriorities.indexOf(p.id);

        return (
          <div key={p.id} className="relative pt-1.5 pl-1.5">
            {isSelected && (
              <span
                className={cn(
                  "absolute top-0 left-0 flex items-center justify-center rounded-full text-white font-bold shadow-sm z-10",
                  variant === "compact"
                    ? "w-5 h-5 text-[11px]"
                    : "w-5.5 h-5.5 text-[12px]",
                )}
                style={{ backgroundColor: p.color }}
              >
                {index + 1}
              </span>
            )}
            <button
              type="button"
              onClick={() => onToggle(p.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border transition-all duration-200",
                variant === "compact" ? "px-3 py-1.5" : "px-4 py-2",
                isSelected
                  ? "bg-white border-gray-200 shadow-sm"
                  : "bg-transparent border-transparent grayscale opacity-50 hover:grayscale-0 hover:opacity-100",
                isSelected && variant === "compact" && "border-solid",
              )}
              style={
                isSelected
                  ? {
                      borderColor: p.color,
                      backgroundColor:
                        variant === "compact" ? p.bgColor : "white",
                    }
                  : {}
              }
            >
              <Image
                src={`/icons/priority/${isSelected ? "ativate" : "deactivate"}/${p.id}.svg`}
                alt={p.label}
                width={variant === "compact" ? 18 : 20}
                height={variant === "compact" ? 18 : 20}
              />
              <span
                className={cn(
                  "font-bold whitespace-nowrap",
                  variant === "compact" ? "text-[14px]" : "text-[16px]",
                  isSelected ? "text-black" : "text-gray-400",
                )}
              >
                {p.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PriorityToggle;
