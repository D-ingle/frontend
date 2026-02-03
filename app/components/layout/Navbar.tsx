"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/store/userStore";
import { logoutAction } from "@/app/login/actions";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { user, clearUser } = useUserStore();
  const [mounted, setMounted] = useState(false);

  // hydration 에러 방지 (client-side의 localStorage 데이터가 서버 렌더링 결과와 다를 수 있음)
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    const res = await logoutAction();
    if (res.success) {
      clearUser(); // Zustand 스토어 비우기
      router.push("/");
      router.refresh();
    }
  };

  const menuItems = [
    { label: "아파트", href: "/map" },
    { label: "원・투룸", href: "/map" },
    { label: "주택・빌라", href: "/map" },
    { label: "오피스텔", href: "/map" },
  ];

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
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-[20px] font-semibold transition-colors duration-200",
                item.label === "아파트"
                  ? "text-[#30CEA1] font-bold"
                  : "text-black hover:text-[#30CEA1]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-7.5">
        {mounted && user ? (
          <>
            {/* 찜한 목록 */}
            <button className="font-semibold text-[#434343] leading-[1.1] text-[16px] hover:text-black transition-colors">
              찜한 목록
            </button>
            <div className="bg-border-1 h-5.5 w-px" />
            <span className="font-semibold text-[#434343] text-[16px]">
              <span className="text-[#30CEA1]">{user.username}</span> 님
              안녕하세요!
            </span>
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
