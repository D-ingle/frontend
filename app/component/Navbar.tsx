import React from "react";

export default function Navbar() {
  return (
    <div className="flex bg-white w-full items-center justify-between box-border h-[100px] px-[130px]">
      {/* Logo Placeholder */}
      <div className="bg-[#d9d9d9] h-[36px] w-[150px]" />

      {/* Right Menu */}
      <div className="flex items-center gap-[30px]">
        {/* 찜한 목록 */}
        <button className="font-semibold text-[#434343] leading-[1.1] text-[16px]">
          찜한 목록
        </button>

        {/* Divider */}
        <div className="bg-[#d9d9d9] h-[22px] w-[1px]" />

        {/* Log in / Sign in */}
        <button className="font-semibold text-[#434343] leading-[1.1] uppercase text-[16px]">
          Log in / Sign in
        </button>
      </div>
    </div>
  );
}
