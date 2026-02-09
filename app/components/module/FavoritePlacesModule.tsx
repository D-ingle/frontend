"use client";

import React from "react";
import Image from "next/image";
import Script from "next/script";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  useGetDestination,
  useSaveDestination,
} from "@/shared/api/generated/user-controller/user-controller";
import { useQueryClient } from "@tanstack/react-query";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare global {
  interface Window {
    daum: any;
  }
}

const FavoritePlacesModule = () => {
  const queryClient = useQueryClient();

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

  const handleOpenPostcode = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
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
  const hasAddress = !!currentSpot?.destinationAddress;

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />
      <div
        className={cn(
          "w-[340px] flex flex-col items-start p-5 rounded-[16px] border-[1.5px] border-[#E5E5E5] bg-white/90 backdrop-blur-[2.5px] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto",
        )}
      >
        <div className="flex flex-col gap-3 w-full">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            자주 가는 곳
          </h3>

          <div className="bg-[#F9F9F9] rounded-[8px] p-4 py-5 flex flex-col items-start justify-center w-full">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1.5 items-center flex-1 min-w-0 h-10">
                <div className="shrink-0 w-5 h-5 flex items-center justify-center mr-1">
                  {isDestLoading ? (
                    <div className="w-4 h-4 border-2 border-main-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Image
                      src={
                        hasAddress
                          ? "/icons/common/mappin.svg"
                          : "/icons/common/graymappin.svg"
                      }
                      width={15}
                      height={15}
                      alt="Marker"
                    />
                  )}
                </div>

                {isDestLoading ? (
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
                    <div className="h-3 w-32 bg-gray-200 animate-pulse rounded" />
                  </div>
                ) : hasAddress ? (
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <p className="font-semibold text-[14px] text-black tracking-[-0.15px] truncate">
                      {currentSpot.destinationName || "나의 스팟"}
                    </p>
                    <p className="font-medium text-[13px] text-[#555555] truncate w-full">
                      {currentSpot.destinationAddress}
                    </p>
                  </div>
                ) : (
                  <p className="font-semibold text-[14px] text-[#555555] tracking-[-0.15px]">
                    주소를 등록해주세요.
                  </p>
                )}
              </div>

              <button
                onClick={handleOpenPostcode}
                className="bg-[#063152] flex h-[25px] items-center justify-center px-2 py-1 rounded-[4px] shrink-0 hover:bg-[#0a416a] transition-colors"
                disabled={isDestLoading}
              >
                <span className="font-semibold text-[12px] text-white tracking-[-0.15px]">
                  {hasAddress ? "변경하기" : "등록하기"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoritePlacesModule;
