"use client";

import React from "react";
import { LucideChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TermsCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  required?: boolean;
}

export const TermsCheckbox = ({
  id,
  checked,
  onChange,
  label,
  required = false,
}: TermsCheckboxProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#F0F0F0] last:border-b-0 ">
      <div className="flex items-center gap-3">
        <div
          onClick={() => onChange(!checked)}
          className={cn(
            "w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-colors",
            checked
              ? "bg-[#2EA98C] border-[#2EA98C]"
              : "bg-white border-[#D9D9D9]",
          )}
        >
          {checked && (
            <svg
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 4.5L4.5 8L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <div className="text-sm font-medium text-[#555555]">{label}</div>
      </div>
      <LucideChevronRight className="w-4 h-4 text-[#D9D9D9] cursor-pointer" />
    </div>
  );
};
