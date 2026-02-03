"use client";

import React, { createContext, useContext, useState } from "react";

export type MyPageMenu =
  | "나의정보"
  | "회원정보"
  | "비밀번호 변경"
  | "큐레이션 정보"
  | "찜한 집"
  | "최근 본 집"
  | "D.HOME 리포트";

interface MyPageContextType {
  currentMenu: MyPageMenu;
  setCurrentMenu: (menu: MyPageMenu) => void;
}

const MyPageContext = createContext<MyPageContextType | undefined>(undefined);

export const MyPageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentMenu, setCurrentMenu] = useState<MyPageMenu>("나의정보");

  return (
    <MyPageContext.Provider value={{ currentMenu, setCurrentMenu }}>
      {children}
    </MyPageContext.Provider>
  );
};

export const useMyPage = () => {
  const context = useContext(MyPageContext);
  if (context === undefined) {
    throw new Error("useMyPage must be used within a MyPageProvider");
  }
  return context;
};
