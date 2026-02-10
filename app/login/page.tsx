"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Curation from "../components/curation/Curation";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "../types/login";
import { loginAction } from "./actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/userStore";

/**
 * 로그인 페이지
 * - 왼쪽: Curation 컴포넌트 (서브 컴포넌트 모드)
 * - 오른쪽: 로그인 폼 카드
 */
const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginAction,
    onSuccess: (res) => {
      if (res.success && res.user) {
        // Zustand 스토어에 유저 정보 저장 (localStorage에 자동 반영됨)
        setUser({
          username: res.user.username,
          preferredType: res.user.preferredType,
          preferredConditions: res.user.preferredConditions,
          onboardingStatus: res.user.onboardingStatus,
        });

        // 온보딩 상태에 따른 리다이렉션
        if (res.user.onboardingStatus) {
          router.push("/map");
        } else {
          router.push("/onboarding");
        }
        router.refresh();
      } else {
        alert(res.message);
      }
    },
    onError: () => {
      alert("네트워크 오류가 발생했습니다.");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen bg-[#E5F7F2] pt-20 overflow-hidden">
      {/* Left Content: Curation (Mascot & Animation) */}
      <div className="flex-1 hidden lg:flex items-center justify-center relative">
        <Curation
          description="로그인 하고 맞춤형 정보를 받아보세요!"
          isSubComponent
          showButton={false}
          transparentBg={true}
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full flex flex-col gap-5 mb-4">
              <div className="relative">
                <input
                  {...register("userId")}
                  type="text"
                  placeholder="아이디"
                  className={`w-full h-14 px-5 rounded-lg border text-[16px] text-[#262626] placeholder-[#C4C4C4] focus:outline-none transition-colors ${
                    errors.userId
                      ? "border-red-500"
                      : "border-[#D9D9D9] focus:border-[#2EA98C]"
                  }`}
                />
                {errors.userId && (
                  <p className="text-red-500 text-xs mt-1 absolute">
                    {errors.userId.message}
                  </p>
                )}
              </div>
              <div className="relative mt-4">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="비밀번호"
                  className={`w-full h-14 px-5 rounded-lg border text-[16px] text-[#262626] placeholder-[#C4C4C4] focus:outline-none transition-colors ${
                    errors.password
                      ? "border-red-500"
                      : "border-[#D9D9D9] focus:border-[#2EA98C]"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 absolute">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Options Area */}
            <div className="w-full flex items-center justify-between mb-10 mt-8">
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
            <button
              type="submit"
              disabled={!isValid || isPending}
              className={`w-full h-14 bg-main-400 text-white font-bold text-[18px] rounded-lg hover:shadow-lg hover:brightness-105 transition-all mb-6 ${
                !isValid || isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "로그인 중..." : "로그인"}
            </button>
          </form>

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
