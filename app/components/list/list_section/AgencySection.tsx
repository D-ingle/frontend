"use client";

import React from "react";
import Image from "next/image";

const AgencySection = () => {
  return (
    <section className="bg-white px-5 py-10 flex flex-col gap-5" id="agency">
      <h3 className="text-[20px] font-semibold text-black leading-tight">
        중개사무소 정보
      </h3>

      <div className="bg-[#F8FAFB] px-4 py-3 rounded-lg flex flex-col gap-3 w-full">
        <div className="flex gap-3 items-center w-full">
          <div className="relative size-20 shrink-0 bg-white rounded overflow-hidden">
            <Image
              src="/images/mockup/item.png"
              alt="Agency Office"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between py-1.5 h-20 shrink-0 gap-3">
            <p className="text-[16px] font-semibold text-black">
              명동공인중개사사무소
            </p>
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-4 items-center">
                <span className="text-[12px] font-semibold text-[#555555] w-20">
                  중개등록번호
                </span>
                <span className="text-[12px] font-semibold text-[#262626]">
                  경기-2024-000001
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-[12px] font-semibold text-[#555555] w-20">
                  사무소번호
                </span>
                <span className="text-[12px] font-semibold text-[#262626]">
                  02-1234-5678
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full mt-5">
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-14">
            대표자명
          </span>
          <span className="text-[16px] font-semibold text-black">신정인</span>
        </div>
        <div className="w-full h-px bg-[#E5E5E5]" />
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-14">
            대표번호
          </span>
          <span className="text-[16px] font-semibold text-black">
            010-1234-5678
          </span>
        </div>
        <div className="w-full h-px bg-[#E5E5E5]" />
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-14">
            이메일
          </span>
          <span className="text-[16px] font-semibold text-black">
            abc@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
};

export default AgencySection;
