"use client";

import React from "react";
import Image from "next/image";
import type { RealtorInfo } from "@/shared/api/generated/model/realtorInfo";

interface AgencySectionProps {
  realtorInfo?: RealtorInfo;
}

const AgencySection = ({ realtorInfo }: AgencySectionProps) => {
  return (
    <section className="bg-white px-5 py-10 flex flex-col gap-5" id="agency">
      <h3 className="text-[20px] font-semibold text-black leading-tight">
        중개사무소 정보
      </h3>

      <div className="flex flex-col py-2">
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-22">
            사무소명
          </span>
          <span className="text-[16px] font-semibold text-black">
            {realtorInfo?.officeName || "-"}
          </span>
        </div>
        <div className="w-full h-px bg-[#E5E5E5]" />
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-22">
            중개등록번호
          </span>
          <span className="text-[16px] font-semibold text-black">
            {realtorInfo?.licenseNumber || "-"}
          </span>
        </div>
        <div className="w-full h-px bg-[#E5E5E5]" />
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-22">
            사무소 번호
          </span>
          <span className="text-[16px] font-semibold text-black">
            {realtorInfo?.officePhone || "-"}
          </span>
        </div>
        <div className="w-full h-px bg-[#E5E5E5]" />
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-22">
            대표자명
          </span>
          <span className="text-[16px] font-semibold text-black">
            {realtorInfo?.username || "-"}
          </span>
        </div>
        <div className="w-full h-px bg-[#E5E5E5]" />
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-22">
            대표번호
          </span>
          <span className="text-[16px] font-semibold text-black">
            {realtorInfo?.phone || "-"}
          </span>
        </div>
        <div className="w-full h-px bg-[#E5E5E5]" />
        <div className="flex items-center gap-10 py-6">
          <span className="text-[16px] font-semibold text-[#707070] w-22">
            이메일
          </span>
          <span className="text-[16px] font-semibold text-black">
            {realtorInfo?.email || "-"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default AgencySection;
