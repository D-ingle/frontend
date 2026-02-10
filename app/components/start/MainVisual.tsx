"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";

export default function MainVisual() {
  const { user } = useUserStore();
  const router = useRouter();

  const handleStart = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.onboardingStatus) {
      router.push("/map");
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between text-center z-30 h-170">
      {/* 로고 (디자인 좌표 반영) */}

      <div className="mb-[39px] flex flex-col items-center justify-center gap-4">
        <Image src="/logo.svg" alt="D.HOME" width={135} height={30} priority />

        <h1 className="text-[36px] font-bold leading-[1.5] bg-clip-text text-transparent bg-gradient-to-l from-[#2EA98C] to-[#30CEA1] mb-[125px] whitespace-pre-line">
          {"직접 살아봐야만 알 수 있는 데이터를\n한 눈에 볼 수 있다면"}
        </h1>
      </div>

      <div
        className="mb-[31px] px-[20px] py-[16px] rounded-[60px] backdrop-blur-[5px] border-[1.5px] border-white shadow-[0px_5px_9.6px_0px_rgba(30,154,119,0.1),0px_3px_10.5px_0px_rgba(104,191,166,0.36)] flex gap-[4px] items-center mt-10"
        style={{
          background:
            "linear-gradient(134deg, rgba(48, 206, 161, 0.20) 0.82%, rgba(120, 231, 200, 0.20) 99.18%), rgba(255, 255, 255, 0.50)",
        }}
      >
        <span className="text-[16px] font-medium text-[#262626] tracking-[-0.48px] leading-[1.5]">
          임장하지 않아도 알려주는
        </span>
        <span className="text-[16px] font-bold text-[#2EA98C] tracking-[-0.48px] leading-[1.5]">
          스마트 주거 분석 플랫폼
        </span>
      </div>

      <button
        onClick={handleStart}
        className="w-[400px] h-[60px] flex items-center justify-center bg-[#063152] text-white text-[18px] font-extrabold rounded-[6px] transition-all hover:brightness-110 active:scale-[0.98] shadow-lg leading-[1.1]"
      >
        시작하기
      </button>
    </div>
  );
}
