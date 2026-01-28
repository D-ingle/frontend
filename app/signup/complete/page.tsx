"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideChevronLeft } from "lucide-react";

const SignupCompletePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-233 mx-auto py-10 md:py-20">
        <div className="flex flex-col gap-6 mb-10 w-full mt-10">
          <Link
            href="/login"
            className="flex items-center gap-1 text-[#9D9D9D] text-sm hover:text-[#555555] transition-colors"
          >
            <LucideChevronLeft size={16} />
            뒤로가기
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b-2 border-[#30CEA1] pb-5">
            <h1 className="text-[32px] font-bold text-[#222222]">회원가입</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-30.75">
          {/* D.Home Logo */}
          <div className="mb-15.75">
            <Image
              src="/logo.svg"
              alt="D.Home Logo"
              width={277}
              height={48}
              priority
            />
          </div>

          <p className="text-[32px] font-extrabold text-[#222222] text-center mb-5 uppercase">
            D.Home 회원이 되신 걸 환영합니다!
          </p>

          <div className="text-[19px] font-medium text-[#262626] text-center mb-25.75 leading-[1.5]">
            <p>로그인을 완료하시고 다양한</p>
            <p>매물과 부동산 정보를 확인해보세요.</p>
          </div>

          <Link href="/login">
            <div className="bg-[#063152] flex items-center justify-center h-[60px] w-[400px] rounded-[6px] transition-colors hover:bg-[#052a46]">
              <span className="text-white font-bold text-[20px]">
                로그인하기
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupCompletePage;
