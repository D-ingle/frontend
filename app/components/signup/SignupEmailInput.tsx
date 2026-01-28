"use client";

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SignupEmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  error?: boolean;
}

const SignupEmailInput = ({
  register,
  error,
  className,
  ...props
}: SignupEmailInputProps) => {
  return (
    <div className={cn("w-55.5 h-12", className)}>
      <input
        {...(register || {})}
        className={cn(
          "w-full h-full px-5 py-1.25 rounded-md border border-gray-300 outline-none transition-colors",
          "placeholder:text-[#9D9D9D] text-[18px] font-medium text-[#222222]",
          "focus:border-[#2EA98C]",
          error && "border-[#FF0000] focus:border-[#FF0000]",
          props.readOnly && "bg-[#F5F5F5] cursor-not-allowed",
        )}
        {...props}
      />
    </div>
  );
};

export default SignupEmailInput;
