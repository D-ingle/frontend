"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/store/userStore";
import { logoutAction } from "@/app/login/actions";
import { useRouter, usePathname } from "next/navigation";

import { usePropertyStore } from "@/app/store/propertyStore";
import { useModuleStore } from "@/app/store/moduleStore";
import { GetMainPropertyPropertyType } from "@/shared/api/generated/model/getMainPropertyPropertyType";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, clearUser } = useUserStore();
  const {
    selectedPropertyType,
    setPropertyType,
    syncWithUserPreference,
    resetFilters,
  } = usePropertyStore();
  const { resetToUserPreference } = useModuleStore();
  const [mounted, setMounted] = useState(false);

  // hydration 에러 방지
  useEffect(() => {
    // Cascading render 방지를 위해 비동기 처리
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  // 초기 유저 선호도 동기화
  useEffect(() => {
    if (mounted) {
      syncWithUserPreference();
    }
  }, [mounted, syncWithUserPreference]);

  const handleLogout = async () => {
    const res = await logoutAction();
    if (res.success) {
      clearUser(); // Zustand 스토어 비우기
      router.push("/");
      router.refresh();
    }
  };

  const menuItems = [
    {
      label: "아파트",
      href: "/map",
      type: GetMainPropertyPropertyType.APT,
    },
    {
      label: "원・투룸",
      href: "/map",
      type: GetMainPropertyPropertyType.ONE_ROOM,
    },
    {
      label: "주택・빌라",
      href: "/map",
      type: GetMainPropertyPropertyType.VILLA,
    },
    {
      label: "오피스텔",
      href: "/map",
      type: GetMainPropertyPropertyType.OFFICETEL,
    },
  ];

  const handleMenuClick = (type: GetMainPropertyPropertyType) => {
    // 1. 주거 형태 변경
    setPropertyType(type);
    // 2. 검색 필터 초기화
    resetFilters();
    // 3. 우선순위 모듈 초기화 (유저 선호도로 복구)
    resetToUserPreference(user?.preferredConditions || []);
    // 4. 지도 페이지로 이동
    router.push("/map");
  };

  return (
    <nav className="flex bg-white w-full items-center justify-between box-border h-20 px-10 fixed top-0 z-100 border-b border-[#c4c4c4]/30">
      <div className="flex items-center gap-18">
        {/* Logo */}
        <Link href="/" className="flex shrink-0">
          <Image
            src="/logo.svg"
            alt="D.HOME Logo"
            width={138}
            height={24}
            priority
          />
        </Link>

        {/* Central Menu */}
        <div className="flex items-center gap-12">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item.type)}
              className={cn(
                "text-[20px] font-semibold transition-colors duration-200",
                mounted &&
                  pathname === "/map" &&
                  selectedPropertyType === item.type
                  ? "text-[#30CEA1] font-bold"
                  : "text-black hover:text-[#30CEA1]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-7.5">
        {mounted && user ? (
          <>
            {/* 찜한 목록 */}
            <button
              onClick={() => router.push("/mypage?menu=liked")}
              className="font-semibold text-[#434343] leading-[1.1] text-[16px] hover:text-black transition-colors"
            >
              찜한 목록
            </button>
            <div className="bg-border-1 h-5.5 w-px" />
            <Link
              href="/mypage"
              className="font-semibold text-[#434343] text-[16px]"
            >
              <span className="text-[#30CEA1]">{user.username}</span> 님
              안녕하세요!
            </Link>
            <div className="bg-border-1 h-5.5 w-px" />
            <button
              onClick={handleLogout}
              className="font-semibold text-[#434343] leading-[1.1] text-[16px] hover:text-black transition-colors"
            >
              LOG OUT
            </button>
          </>
        ) : (
          <>
            {/* Log in */}
            <Link
              href="/login"
              className="font-semibold text-[#434343] leading-[1.1] uppercase text-[16px] hover:text-black transition-colors"
            >
              Log in
            </Link>
            <div className="bg-border-1 h-5.5 w-px" />
            {/* Sign in */}
            <Link
              href="/signup"
              className="font-semibold text-[#434343] leading-[1.1] uppercase text-[16px] hover:text-black transition-colors"
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
