"use client";

import React from "react";
import Image from "next/image";

interface CompareModalProps {
  onUnlock: () => void;
  remainingPasses?: number;
}

const CompareModal = ({ onUnlock, remainingPasses = 3 }: CompareModalProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="bg-white flex flex-col items-center px-[99px] py-[40px] rounded-[12px] shadow-[0px_4px_12.2px_0px_rgba(0,0,0,0.15)] max-w-[540px] w-full">
        {/* Lock Icon */}
        <div className="flex flex-col items-center gap-[18px] mb-[40px]">
          <div className="text-[#ACEBD9]">
            <Image
              src="/icons/common/lock.svg"
              alt="Lock"
              width={56}
              height={56}
            />
          </div>
          <div className="text-center">
            <h2 className="font-bold text-[26px] text-[#434343] leading-[1.5]">
              D.Home 리포트
            </h2>
            <p className="font-bold text-[26px] text-[#434343] leading-[1.5]">
              지금 바로 확인해보세요!
            </p>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center gap-[10px] w-full">
          <p className="font-bold text-[18px] text-[#2ea98c]">
            무료 이용권 {remainingPasses}회 남았어요
          </p>
          <button
            onClick={onUnlock}
            className="bg-[#2ea98c] h-[73px] w-full flex items-center justify-center rounded-[36.5px] px-[45px] hover:bg-[#269077] transition-colors group"
          >
            <span className="font-semibold text-[24px] text-white">
              무료 이용권으로 열람하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
