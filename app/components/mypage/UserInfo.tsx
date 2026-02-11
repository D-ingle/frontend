"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Script from "next/script";
import { useUserStore } from "@/app/store/userStore";
import {
  useGetDestination,
  useSaveDestination,
} from "@/shared/api/generated/user-controller/user-controller";
import { useQueryClient } from "@tanstack/react-query";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daum: any;
  }
}

import {
  useLikeList,
  useRecentView,
  useCompareList,
} from "@/shared/api/generated/property-controller/property-controller";
import { useRecentViewStore } from "@/app/store/recentViewStore";
import { DealInfoDealType } from "@/shared/api/generated/model/dealInfoDealType";

import { formatNumberToKoreanPrice } from "@/app/utils/format";
import { useRouter } from "next/navigation";
import RecentHouseCard from "./RecentHouseCard";

const CONDITION_MAP: Record<number, string> = {
  1: "소음",
  2: "환경",
  3: "안전",
  4: "접근성",
  5: "편의",
};

const UserInfo = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { viewedIds } = useRecentViewStore();

  const { data: destinationResponse, isLoading: isDestLoading } =
    useGetDestination();
  const { mutate: saveDest } = useSaveDestination({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["/api/v1/user/destination"],
        });
      },
    },
  });

  // 찜한 매물 수 조회를 위한 훅
  const { data: likeListResponse, isLoading: isLikeLoading } = useLikeList();
  const likedCount = likeListResponse?.data?.length || 0;

  // 최근 본 매물 조회를 위한 훅 (최근 3개)
  const recentIds = viewedIds.slice(0, 3);
  const { data: recentViewResponse, isLoading: isRecentLoading } =
    useRecentView(
      { propertyIds: recentIds },
      {
        query: {
          enabled: recentIds.length > 0,
        },
      },
    );

  const { data: compareResponse, isLoading: isCompareLoading } = useCompareList(
    { propertyIds: recentIds },
    {
      query: {
        enabled: recentIds.length > 0,
      },
    },
  );

  const recentHouses = useMemo(() => {
    return (
      recentViewResponse?.data?.map((item) => {
        const compareData = compareResponse?.data?.find(
          (c) => c.propertyId === item.propertyId,
        );

        let priceStr = "";
        const deal = item.dealInfo;
        if (deal?.dealType === DealInfoDealType.RENT) {
          priceStr = `월세 ${deal.deposit}/${deal.monthlyRent}`;
        } else if (deal?.dealType === DealInfoDealType.LEASE) {
          priceStr = `전세 ${formatNumberToKoreanPrice(deal.price || 0)}`;
        } else if (deal?.dealType === DealInfoDealType.SALE) {
          priceStr = `매매 ${formatNumberToKoreanPrice(deal.price || 0)}`;
        }

        // 점수 정보를 배열로 변환하여 정렬
        const allScores = [
          { label: "소음", score: compareData?.noiseScore || 0 },
          { label: "환경", score: compareData?.environmentScore || 0 },
          { label: "안전", score: compareData?.safetyScore || 0 },
          { label: "접근성", score: compareData?.accessibilityScore || 0 },
          { label: "편의", score: compareData?.convenienceScore || 0 },
        ];

        // 점수 높은 순으로 상위 5개 추출
        const top5Strengths = allScores
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
          .map((s) => s.label);

        // 사용자의 선호 조건 (한글 명칭으로 변환)
        const userPrefs =
          user?.preferredConditions?.map((c) => CONDITION_MAP[c]) || [];

        // 매물의 강점(상위 5개)과 사용자의 선호 조건의 교집합 필터링
        const personalizedTags = top5Strengths.filter((tag) =>
          userPrefs.includes(tag),
        );

        // 주소에서 시/구 추출 (예: "서울시 중구")
        const addressParts = compareData?.address;

        return {
          id: item.propertyId || 0,
          image:
            (item.imageUrl && item.imageUrl.trim() !== ""
              ? item.imageUrl
              : null) ||
            (item.propertyType === "APT"
              ? "/images/mockup/apt.svg"
              : "/images/mockup/oneroom.svg"),
          price: priceStr,
          name: item.apartmentName || "",
          type: item.propertyType || "아파트",
          area: `${item.supplyArea || 0}/${item.exclusiveArea || 0}m²`,
          floor: `${item.floor || 0}/${item.totalFloor || 0}층`,
          tags: personalizedTags,
          district: addressParts,
        };
      }) || []
    );
  }, [recentViewResponse, compareResponse, user?.preferredConditions]);

  const handleOpenPostcode = () => {
    // ... (기존 코드와 동일)
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: {
          address: string;
          addressType: string;
          bname: string;
          buildingName: string;
        }) => {
          let fullAddress = data.address;
          let extraAddress = "";

          if (data.addressType === "R") {
            if (data.bname !== "") {
              extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
              extraAddress +=
                extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
          }

          const spotName = data.buildingName || "나의 스팟";

          saveDest({
            data: {
              destinationAddress: fullAddress,
              destinationName: spotName,
            },
          });
        },
      }).open();
    }
  };

  const currentSpot = destinationResponse?.data;

  // 목데이터 (피그마 기반)
  const priorities = [
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
    {
      badge: "bg-[#F48787]",
      label: "안전",
      icon: "/icons/priority/ativate/safety.svg",
      color: "bg-[#FFD9D9]",
    },
  ];

  return (
    <div className="flex-1 flex flex-col gap-17.5 text-sans">
      <div className="flex flex-col gap-10">
        <h2 className="text-[28px] font-bold text-black border-none p-0 mb-0">
          나의 정보
        </h2>

        {/* Profile and Quick Stats */}
        <div className="flex gap-4.5">
          {/* User Profile Card */}
          <div className="flex-1 bg-white border border-border-1 rounded-xl p-7.5 flex flex-col gap-3">
            <h3 className="text-[22px] font-bold leading-normal">
              <span className="text-main-500">김민지</span> 님
            </h3>
            <p className="text-gray-800 text-[16px] font-medium opacity-80 leading-normal">
              minji00@gmail.com
            </p>
          </div>

          {/* Jjim Count Card */}
          <div className="w-77.5 bg-navy rounded-xl p-7.5 text-white relative flex flex-col justify-between h-32.25">
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
                {isLikeLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Image
                      src="/icons/common/white_heart.svg"
                      alt="white heart"
                      width={20}
                      height={20}
                    />
                    {likedCount}개
                  </>
                )}
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
                    className={`absolute -top-2 -left-2 w-6 h-6  ${item.badge} text-white rounded-full flex items-center justify-center text-[11px] font-semibold z-10 `}
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
                  원룸
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <Image
                  src="/icons/common/location.svg"
                  alt=""
                  width={25}
                  height={30}
                />
                <span className="px-3 py-1.5 bg-[#DEFAF2] border border-main-400 text-main-400 rounded-full text-[14px] font-medium">
                  구로구
                </span>
                <span className="px-3 py-1.5 bg-[#DEFAF2] border border-main-400 text-main-400 rounded-full text-[14px] font-medium">
                  양천구
                </span>
                <span className="px-3 py-1.5 bg-[#DEFAF2] border border-main-400 text-main-400 rounded-full text-[14px] font-medium">
                  영등포구
                </span>
              </div>
            </div>
          </div>

          {/* Key Spots */}
          <div className="flex-1 bg-white rounded-xl p-7.5 border border-border-1 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="text-[18px] font-bold text-gray-800">주요 스팟</h4>
              <button
                onClick={handleOpenPostcode}
                className="text-[14px] text-gray-400 hover:text-gray-500"
              >
                변경하기 ›
              </button>
            </div>
            {isDestLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-main-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : currentSpot?.destinationAddress ? (
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-1.5 text-gray-800 font-bold text-[16px]">
                  <Image
                    src="/icons/feature/list_detail/school/mappin.svg"
                    width={15}
                    height={15}
                    alt=""
                  />
                  <p className="text-[22px]">
                    {currentSpot.destinationName || "나의 스팟"}
                  </p>
                </div>
                <p className="text-[16px] text-gray-400 font-medium">
                  {currentSpot.destinationAddress}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 mt-4 text-gray-400">
                <p className="text-[14px]">등록된 주요 스팟이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />

      {/* Recently Viewed Houses */}
      <div className="flex flex-col gap-10">
        <div className="flex justify-between items-baseline">
          <h3 className="text-[22px] font-bold text-gray-800 leading-[1.3]">
            <span className="text-main-400">김민지</span> 님이 최근에 본 집
          </h3>
          <button className="text-[14px] text-gray-400 hover:text-gray-500 flex items-center gap-1 font-medium">
            전체보기 <span>›</span>
          </button>
        </div>

        {isRecentLoading || isCompareLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-main-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : recentHouses.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {recentHouses.map((house) => (
              <RecentHouseCard
                key={house.id}
                {...house}
                onClick={(id) => router.push(`/map?propertyId=${id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl text-gray-400">
            <p className="text-[16px]">최근에 본 집이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
