"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MyPageSidebar from "../components/mypage/MyPageSidebar";
import { MyPageProvider, useMyPage } from "./MyPageContext";

const MyPageLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { currentMenu, setCurrentMenu } = useMyPage();
  const searchParams = useSearchParams();
  const menuParam = searchParams.get("menu");

  useEffect(() => {
    if (menuParam === "liked") {
      setCurrentMenu("찜한 집");
      // URL 파라미터 처리 후 깔끔하게 제거하고 싶을 수 있으나,
      // 일단은 동기화에 집중합니다.
    }
  }, [menuParam, setCurrentMenu]);

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
    <div className="min-h-screen bg-white no-scrollbar overflow-y-auto">
      <main className="pt-40 pb-20 px-10 max-w-350 mx-auto min-h-[calc(100vh-80px)]">
        <MyPageProvider>
          <Suspense fallback={null}>
            <MyPageLayoutContent>{children}</MyPageLayoutContent>
          </Suspense>
        </MyPageProvider>
      </main>
    </div>
  );
};

export default Layout;
