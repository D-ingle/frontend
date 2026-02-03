"use client";

import React from "react";
import MyPageSidebar from "../components/mypage/MyPageSidebar";
import { MyPageProvider, useMyPage } from "./MyPageContext";

const MyPageLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { currentMenu, setCurrentMenu } = useMyPage();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-[32px] font-extrabold uppercase tracking-tight text-black leading-[1.3]">
          My page
        </h1>
        <div className="h-0.5 bg-main-400" />
      </div>

      <div className="flex gap-13.5">
        <MyPageSidebar
          currentMenu={currentMenu}
          onMenuChange={setCurrentMenu}
        />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-40 pb-20 px-10 max-w-350 mx-auto min-h-[calc(100vh-80px)]">
        <MyPageProvider>
          <MyPageLayoutContent>{children}</MyPageLayoutContent>
        </MyPageProvider>
      </main>
    </div>
  );
};

export default Layout;
