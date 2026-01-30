"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Curation from "../components/Curation";
import { Check } from "lucide-react";

/**
 * 로그인 페이지
 * - 왼쪽: Curation 컴포넌트 (서브 컴포넌트 모드)
 * - 오른쪽: 로그인 폼 카드
 */
const LoginPage = () => {
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  return (
    <div className="flex h-screen bg-[#E5F7F2] pt-20 overflow-hidden">
      {/* Left Content: Curation (Mascot & Animation) */}
      <div className="flex-1 hidden lg:flex items-center justify-center relative">
        <Curation
          description="로그인 하고 맞춤형 정보를 받아보세요!"
          isSubComponent
          showButton={false}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-5 z-10">
        <div className="w-169 h-181 bg-white/30 rounded-[30px] border border-[#E4E4E4] shadow-[0_4px_30px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center px-28.75 py-10">
          {/* Logo Area */}
          <div className="mb-14">
            <Image
              src="/logo.svg"
              alt="D.HOME Logo"
              width={260}
              height={46}
              priority
              className="object-contain"
            />
          </div>

          {/* Form Area */}
          <div className="w-full flex flex-col gap-3 mb-4">
            <input
              type="text"
              placeholder="아이디"
              className="w-full h-14 px-5 rounded-lg border border-[#D9D9D9] text-[16px] text-[#262626] placeholder-[#C4C4C4] focus:outline-none focus:border-[#2EA98C] transition-colors"
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-full h-14 px-5 rounded-lg border border-[#D9D9D9] text-[16px] text-[#262626] placeholder-[#C4C4C4] focus:outline-none focus:border-[#2EA98C] transition-colors"
            />
          </div>

          {/* Options Area */}
          <div className="w-full flex items-center justify-between mb-10">
            <label
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setStayLoggedIn(!stayLoggedIn)}
            >
              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                  stayLoggedIn
                    ? "bg-[#2EA98C] border-[#2EA98C]"
                    : "border-[#D9D9D9] bg-white"
                }`}
              >
                {stayLoggedIn && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="text-[14px] font-semibold text-[#434343] group-hover:text-black transition-colors">
                로그인 유지
              </span>
            </label>

            <Link
              href="/find-account"
              className="text-[12px] text-[#9D9D9D] hover:text-[#7B7B7B] transition-colors"
            >
              아이디/비밀번호 찾기
            </Link>
          </div>

          {/* Login Button */}
          <button className="w-full h-14 bg-main-400 text-white font-bold text-[18px] rounded-lg hover:shadow-lg hover:brightness-105 transition-all mb-6">
            로그인
          </button>

          {/* Footer Area */}
          <p className="text-[14px] text-[#7B7B7B]">
            아직 디닷홈 회원이 아니신가요?{" "}
            <Link
              href="/signup"
              className="text-[#30CEA1] font-bold border-b border-[#30CEA1] ml-1 hover:brightness-95"
            >
              회원가입 하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
