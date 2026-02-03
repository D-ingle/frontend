"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

export type MyPageMenu =
  | "나의정보"
  | "회원정보"
  | "비밀번호 변경"
  | "큐레이션 정보"
  | "찜한 집"
  | "최근 본 집"
  | "D.HOME 리포트";

interface MyPageSidebarProps {
  currentMenu: MyPageMenu;
  onMenuChange: (menu: MyPageMenu) => void;
}

const MyPageSidebar = ({ currentMenu, onMenuChange }: MyPageSidebarProps) => {
  const sections = [
    {
      title: "나의 정보",
      items: [
        "나의정보",
        "회원정보",
        "비밀번호 변경",
        "큐레이션 정보",
      ] as MyPageMenu[],
    },
    {
      title: "나의 관심",
      items: ["찜한 집", "최근 본 집", "D.HOME 리포트"] as MyPageMenu[],
    },
  ];

  return (
    <aside className="w-75 h-120 shrink-0 bg-[#fafafa] rounded-xl pt-8 pb-12 px-8 flex flex-col gap-9 border border-gray-100">
      {sections.map((section) => (
        <div key={section.title} className="flex flex-col gap-6">
          <h3 className="text-[20px] font-bold text-black border-none px-0 mb-0">
            {section.title}
          </h3>
          <ul className="flex flex-col gap-2">
            {section.items.map((item) => (
              <li
                key={item}
                onClick={() => onMenuChange(item)}
                className={cn(
                  "px-0 py-0 text-[16px] cursor-pointer transition-colors duration-200",
                  currentMenu === item
                    ? "text-[#2EA98C] font-bold"
                    : "text-gray-500 hover:text-black font-medium",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default MyPageSidebar;
