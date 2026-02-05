"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare global {
  interface Window {
    daum: any;
  }
}

const FavoritePlacesModule = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState<string | null>(null);

  // Load address from localStorage on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem("favorite-address");
    const savedPlaceName = localStorage.getItem("favorite-place-name");
    if (savedAddress) {
      setAddress(savedAddress);
      setPlaceName(savedPlaceName || "등록된 장소");
    }
  }, []);

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

          setAddress(fullAddress);
          const defaultName = data.buildingName || "우리 집";
          setPlaceName(defaultName);

          // Save to localStorage
          localStorage.setItem("favorite-address", fullAddress);
          localStorage.setItem("favorite-place-name", defaultName);
        },
      }).open();
    }
  };

  const hasAddress = !!address;

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
                </div>

                {hasAddress ? (
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <p className="font-semibold text-[14px] text-black tracking-[-0.15px] truncate">
                      {placeName}
                    </p>
                    <p className="font-medium text-[13px] text-[#555555] truncate w-full">
                      {address}
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
