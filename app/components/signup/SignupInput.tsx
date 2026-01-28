"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SignupInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  rightElement?: React.ReactNode;
}

export const SignupInput = ({
  name,
  label,
  required = false,
  error,
  description,
  rightElement,
  ...props
}: SignupInputProps) => {
  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-4 w-232.5 relative">
      <div className="flex items-center gap-1">
        <label className="text-[20px] font-bold text-[#222222]">{label}</label>
        {required && <span className="text-[#FF0000] font-bold">*</span>}
      </div>
      <div className="w-121">
        <div className="flex items-center border border-gray-300 rounded-md px-5 py-1.25">
          <input
            {...register(name)}
            className={cn(
              "w-121 h-9.5 outline-none transition-colors",
              "placeholder:text-[#9D9D9D] text-[18px]",
              "focus:border-[#2EA98C]",
              error && "border-[#FF0000] focus:border-[#FF0000]",
            )}
            {...props}
          />
          {rightElement && (
            <div className="flex items-center">{rightElement}</div>
          )}
        </div>
        {error && (
          <p className="absolute text-sm text-[#FF0000] mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};
