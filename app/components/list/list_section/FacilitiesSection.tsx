"use client";

import React from "react";
import Image from "next/image";
import type { Facility } from "@/shared/api/generated/model/facility";
import type { Option } from "@/shared/api/generated/model/option";

interface FacilitiesSectionProps {
  facility?: Facility;
  option?: Option;
}

const OPTION_LABELS: Record<string, string> = {
  REFRIGERATOR: "냉장고",
  AIR_CONDITIONER: "에어컨",
  DESK: "책상",
  SHOE_CABINET: "신발장",
  WASHING_MACHINE: "세탁기",
  SINK: "싱크대",
  WARDROBE: "옷장",
  INDUCTION: "인덕션",
  MICROWAVE: "전자레인지",
};

const FACILITY_LABELS: Record<string, string> = {
  MANAGEMENT_OFFICE: "관리사무소",
  CHILDCARE: "보육시설",
  LIBRARY: "문고",
  COMMUNITY_FACILITY: "커뮤니티",
  PLAYGROUND: "어린이놀이터",
  REST_FACILITY: "휴게시설",
  COMMUNITY_SPACE: "주민공동시설",
  BICYCLE_STORAGE: "자전거보관소",
  OTHER: "기타",
};

const OPTION_ICONS: Record<string, string> = {
  REFRIGERATOR: "/icons/option/refrigerator.svg",
  AIR_CONDITIONER: "/icons/option/airconditioner.svg",
  DESK: "/icons/option/desk.svg",
  SHOE_CABINET: "/icons/option/shoe.svg",
  WASHING_MACHINE: "/icons/option/washingmachine.svg",
  SINK: "/icons/option/sink.svg",
  WARDROBE: "/icons/option/closet.svg",
  INDUCTION: "/icons/option/induction.svg",
  MICROWAVE: "/icons/option/microwave.svg",
};

const FACILITY_ICONS: Record<string, string> = {
  MANAGEMENT_OFFICE: "/icons/option/maintenance.svg",
  CHILDCARE: "/icons/option/kindergarden.svg",
  LIBRARY: "/icons/option/stationary.svg",
  COMMUNITY_FACILITY: "/icons/option/community.svg",
  PLAYGROUND: "/icons/option/playground.svg",
  REST_FACILITY: "/icons/option/cafe.svg",
  COMMUNITY_SPACE: "/icons/option/residencefacilities.svg",
  BICYCLE_STORAGE: "/icons/option/bicycle.svg",
  OTHER: "/icons/option/community.svg",
};

const FacilitiesSection = ({ facility, option }: FacilitiesSectionProps) => {
  const activeOptions = option?.options || [];
  const activeFacilities = facility?.facilities || [];

  return (
    <section className="px-5 py-8 bg-white" id="facilities">
      <div className="mb-10">
        <h3 className="text-[20px] font-bold text-[#000000] mb-6 flex items-baseline gap-2">
          옵션{" "}
          <span className="text-[#30CEA1] text-[18px] font-bold">
            {activeOptions.length}개
          </span>
        </h3>
        <div className="grid grid-cols-4 gap-y-8">
          {activeOptions.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center bg-[#F8FAFB] rounded-lg">
                <Image
                  src={
                    OPTION_ICONS[item.optionType || ""] ||
                    "/icons/option/refrigerator.svg"
                  }
                  alt={OPTION_LABELS[item.optionType || ""] || "Option"}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-[14px] font-semibold text-[#262626] text-center px-1">
                {OPTION_LABELS[item.optionType || ""] || "옵션"}
              </span>
            </div>
          ))}
          {activeOptions.length === 0 && (
            <p className="col-span-4 text-center text-gray-400 py-4 text-[14px]">
              등록된 옵션이 없습니다.
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-[20px] font-bold text-[#000000] mb-6 flex items-baseline gap-2">
          부대시설{" "}
          <span className="text-[#30CEA1] text-[18px] font-bold">
            {activeFacilities.length}개
          </span>
        </h3>
        <div className="grid grid-cols-4 gap-y-8">
          {activeFacilities.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center bg-[#F8FAFB] rounded-lg">
                <Image
                  src={
                    FACILITY_ICONS[item.facilityType || ""] ||
                    "/icons/option/community.svg"
                  }
                  alt={FACILITY_LABELS[item.facilityType || ""] || "Facility"}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-[14px] font-semibold text-[#262626] text-center px-1">
                {FACILITY_LABELS[item.facilityType || ""] || "시설"}
              </span>
            </div>
          ))}
          {activeFacilities.length === 0 && (
            <p className="col-span-4 text-center text-gray-400 py-4 text-[14px]">
              등록된 부대시설이 없습니다.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
