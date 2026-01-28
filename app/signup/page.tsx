"use client";

import React from "react";
import { SignupForm } from "@/app/components/signup/SignupForm";
import { LucideChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-233 mx-auto py-10 md:py-20">
        <div className="flex flex-col gap-6 mb-10 w-full mt-20">
          <Link
            href="/login"
            className="flex items-center gap-1 text-[#9D9D9D] text-sm hover:text-[#555555] transition-colors"
          >
            <LucideChevronLeft size={16} />
            뒤로가기
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b-2 border-[#30CEA1] pb-5">
            <h1 className="text-[32px] font-bold text-[#222222]">회원가입</h1>
            <p className="text-[#666666] text-sm hidden md:block">
              <span className="text-[#FF0000] mr-1">*</span>필수 입력 항목입니다
            </p>
          </div>
        </div>

        <SignupForm />
      </div>
    </div>
  );
};

export default Page;
