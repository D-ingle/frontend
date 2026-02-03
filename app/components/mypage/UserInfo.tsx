"use client";

import React from "react";
import { useUserStore } from "@/app/store/userStore";
import Image from "next/image";

const UserInfo = () => {
  const { user } = useUserStore();

  // 목데이터 (피그마 기반)
  const priorities = [
    {
      badge: "bg-[#F48787]",
      label: "안전",
      icon: "/icons/priority/ativate/safety.svg",
      color: "bg-[#FFD9D9]",
    },
    {
      badge: "bg-[#7CB7CD]",
      label: "접근성",
      icon: "/icons/priority/ativate/accessibility.svg",
      color: "bg-[#D6EFF8]",
    },
    {
      badge: "bg-[#AB9FD5]",
      label: "편의",
      icon: "/icons/priority/ativate/convenience.svg",
      color: "bg-[#E5E0F7]",
    },
  ];

  const preferences = ["오피스텔", "강남구", "관악구", "송파구"];

  return (
    <div className="flex-1 flex flex-col gap-17.5 text-sans">
      <div className="flex flex-col gap-10">
        <h2 className="text-[28px] font-bold text-black border-none p-0 mb-0">
          나의 정보
        </h2>

        {/* Profile and Quick Stats */}
        <div className="flex gap-10">
          {/* User Profile Card */}
          <div className="flex-1 bg-white border border-border-1 rounded-xl p-7.5 flex flex-col gap-3">
            <h3 className="text-[22px] font-bold leading-normal">
              <span className="text-main-500">
                {user?.username || "김딩글"}
              </span>{" "}
              님
            </h3>
            <p className="text-gray-800 text-[16px] font-medium opacity-80 leading-normal">
              Ddingle@ditonic.io
            </p>
          </div>

          {/* Jjim Count Card */}
          <div className="w-84.5 bg-navy rounded-xl p-7.5 text-white relative flex flex-col justify-between h-32.25">
            <div className="flex justify-between items-center">
              <span className="text-[16px] font-medium opacity-80">
                찜한 집
              </span>
              <button className="text-[12px] opacity-80 flex items-center gap-1 hover:opacity-100 transition-opacity">
                전체보기
                <span className="inline-block translate-y-px">›</span>
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[32px] font-bold leading-none flex items-center gap-2">
                <Image
                  src="/icons/feature/list/like.svg"
                  alt="like"
                  width={30}
                  height={30}
                />
                12개
              </span>
            </div>
          </div>
        </div>

        {/* Priorities and Preferences */}
        <div className="flex gap-4">
          {/* My Priorities */}
          <div className="flex-1 bg-white rounded-xl p-7.5 border border-border-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[18px] font-bold text-gray-800">
                나의 우선순위
              </h4>
              <button className="text-[14px] text-gray-400 hover:text-gray-500">
                변경하기 ›
              </button>
            </div>
            <div className="flex justify-center gap-6 py-4">
              {priorities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 relative"
                >
                  <div
                    className={`absolute -top-1 -left-1 w-6 h-6  ${item.badge} text-white rounded-full flex items-center justify-center text-[11px] font-semibold z-10 border-2 border-white`}
                  >
                    {idx + 1}
                  </div>
                  <div
                    className={`w-17 h-17 ${item.color} rounded-[10px] flex items-center justify-center`}
                  >
                    <Image src={item.icon} alt="" width={30} height={30} />
                  </div>
                  <span className="text-[14px] text-gray-500 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* My Preferences */}
          <div className="flex-1 bg-white rounded-xl p-7.5 border border-border-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[18px] font-bold text-gray-800">
                나의 선호 기준
              </h4>
              <button className="text-[14px] text-gray-400 hover:text-gray-500">
                변경하기 ›
              </button>
            </div>
            <div className="flex flex-col gap-5 mt-1">
              <div className="flex flex-wrap gap-2 mt-2">
                <Image
                  src="/icons/navigation/ativate/room.svg"
                  alt=""
                  width={25}
                  height={25}
                />

                <span className="px-3 py-1.5 bg-[#DEFAF2] border border-main-400 text-main-400 rounded-md text-[14px] font-medium">
                  오피스텔
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Image
                  src="/icons/common/location.svg"
                  alt=""
                  width={25}
                  height={30}
                />
                <span className="px-3 py-1.5 bg-[#DEFAF2] border border-main-400 text-main-400 rounded-full text-[14px] font-medium">
                  강남구
                </span>
                <span className="px-3 py-1.5 bg-[#DEFAF2] border border-main-400 text-main-400 rounded-full text-[14px] font-medium">
                  관악구
                </span>
                <span className="px-3 py-1.5 bg-[#DEFAF2] border border-main-400 text-main-400 rounded-full text-[14px] font-medium">
                  송파구
                </span>
              </div>
            </div>
          </div>

          {/* Key Spots */}
          <div className="flex-1 bg-white rounded-xl p-7.5 border border-border-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[18px] font-bold text-gray-800">주요 스팟</h4>
              <button className="text-[14px] text-gray-400 hover:text-gray-500">
                변경하기 ›
              </button>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center gap-1.5 text-gray-800 font-bold text-[16px]">
                <Image
                  src="/icons/feature/list_detail/school/mappin.svg"
                  width={15}
                  height={15}
                  alt=""
                />
                <p className="text-[22px]">신한 익스페이스</p>
              </div>
              <p className="text-[16px] text-gray-400 font-medium">
                서울특별시 중구 명동 10길 52
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed Houses */}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-baseline">
          <h3 className="text-[22px] font-bold text-gray-800 leading-[1.3]">
            <span className="text-main-400">{user?.username || "김딩글"}</span>{" "}
            님이 최근에 본 집
          </h3>
          <button className="text-[14px] text-gray-400 hover:text-gray-500 flex items-center gap-1 font-medium">
            전체보기 <span>›</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer h-85.75"
            >
              <div className="h-50 bg-amber-200 relative shrink-0">
                <div className="absolute top-4 left-4.5 bg-black/40 border border-border-1/20 text-white px-2.5 h-8 rounded-full text-[12px] flex items-center justify-center gap-2 font-medium">
                  <Image
                    src="/icons/common/marker.svg"
                    alt="marker"
                    width={10}
                    height={10}
                  />
                  <p>서울시 중구</p>
                </div>
                <Image
                  src="/images/mockup/item.png"
                  alt="house"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>

              <div className="p-5 flex flex-col gap-3.5">
                <h4 className="text-[20px] font-bold leading-[1.1]">
                  전세 6억 9,000
                </h4>
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] text-gray-500 font-medium leading-none">
                    약수 하이츠 104동
                  </p>
                  <p className="text-[14px] text-gray-500 font-medium leading-none">
                    아파트, 2/20층, 142.65m²
                  </p>
                </div>
                <div className="flex gap-1.5 mt-auto">
                  <span className="px-2 py-0.5 border border-[#FBBA78] text-[#FBBA78] rounded-sm text-[11px] font-semibold uppercase">
                    소음
                  </span>
                  <span className="px-2 py-0.5 border border-[#7CB7CD] text-[#7CB7CD] rounded-sm text-[11px] font-semibold uppercase">
                    접근성
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
