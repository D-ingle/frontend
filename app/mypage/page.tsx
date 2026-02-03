"use client";

import React from "react";
import { useMyPage } from "./MyPageContext";
import UserInfo from "../components/mypage/UserInfo";
import MemberInfo from "../components/mypage/MemberInfo";
import ChangePassword from "../components/mypage/ChangePassword";
import CurationInfo from "../components/mypage/CurationInfo";
import LikedHouses from "../components/mypage/LikedHouses";
import RecentlyViewedHouses from "../components/mypage/RecentlyViewedHouses";
import HomeReport from "../components/mypage/HomeReport";

const Page = () => {
  const { currentMenu } = useMyPage();

  const renderContent = () => {
    switch (currentMenu) {
      case "나의정보":
        return <UserInfo />;
      case "회원정보":
        return <MemberInfo />;
      case "비밀번호 변경":
        return <ChangePassword />;
      case "큐레이션 정보":
        return <CurationInfo />;
      case "찜한 집":
        return <LikedHouses />;
      case "최근 본 집":
        return <RecentlyViewedHouses />;
      case "D.HOME 리포트":
        return <HomeReport />;
      default:
        return (
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-[28px] font-bold text-black">{currentMenu}</h2>
            <div className="flex-1 bg-gray-50 rounded-[10px] border border-dashed border-gray-300 flex items-center justify-center text-gray-500 h-100">
              {currentMenu} 페이지 준비 중입니다.
            </div>
          </div>
        );
    }
  };

  return <>{renderContent()}</>;
};

export default Page;
