"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

export type TagType = "소음" | "안전" | "접근성" | "편의" | "환경";

interface CompareTagProps {
  type: TagType;
  className?: string;
}

const CompareTag = ({ type, className }: CompareTagProps) => {
  const styles = {
    안전: "bg-[#fff7f7] border-[#f48787] text-[#f48787]",
    편의: "bg-[#faf9fd] border-[#ab9fd5] text-[#ab9fd5]",
    소음: "bg-[#fffcf6] border-[#fbba78] text-[#fbba78]",
    접근성: "bg-[#f7fcfe] border-[#7cb7cd] text-[#7cb7cd]",
    환경: "bg-[#f0f9f1] border-[#76c893] text-[#76c893]", // Example for environment
  };

  return (
    <div
      className={cn(
        "border border-solid flex items-center justify-center px-[8px] py-[6px] rounded-[50px] text-[12px] font-medium leading-[1.1] whitespace-nowrap whitespace-pre",
        styles[type] || "bg-[#f7fcfe] border-[#7cb7cd] text-[#7cb7cd]",
        className,
      )}
    >
      {type}
    </div>
  );
};

export default CompareTag;
