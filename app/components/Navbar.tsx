"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

export default function Navbar() {
  const menuItems = [
    { label: "아파트", href: "/apt" },
    { label: "원・투룸", href: "/room" },
    { label: "주택・빌라", href: "/house" },
    { label: "오피스텔", href: "/officetel" },
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
        {/* 찜한 목록 */}
        <button className="font-semibold text-[#434343] leading-[1.1] text-[16px] hover:text-black transition-colors">
          찜한 목록
        </button>

        {/* Divider */}
        <div className="bg-border-1 h-5.5 w-px" />

        {/* Log in / Sign in */}
        <Link
          href="/signup"
          className="font-semibold text-[#434343] leading-[1.1] uppercase text-[16px] hover:text-black transition-colors"
        >
          Log in / Sign in
        </Link>
      </div>
    </nav>
  );
}
