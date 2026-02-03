"use client";

import React from "react";
import Image from "next/image";

const FacilitiesSection = () => {
  const options = [
    { label: "냉장고", icon: "/icons/option/refrigerator.svg" },
    { label: "에어컨", icon: "/icons/option/airconditioner.svg" },
    { label: "책상", icon: "/icons/option/desk.svg" },
    { label: "신발장", icon: "/icons/option/shoe.svg" },
    { label: "세탁기", icon: "/icons/option/washingmachine.svg" },
    { label: "싱크대", icon: "/icons/option/sink.svg" },
    { label: "옷장", icon: "/icons/option/closet.svg" },
    { label: "인덕션", icon: "/icons/option/induction.svg" },
    { label: "전자레인지", icon: "/icons/option/microwave.svg" },
  ];

  const buildingFacilities = [
    { label: "헬스장", icon: "/icons/option/gym.svg" },
    { label: "세탁방", icon: "/icons/option/laudryshop.svg" },
    { label: "주차장", icon: "/icons/option/parking.svg" },
    { label: "커뮤니티", icon: "/icons/option/community.svg" },
    { label: "관리사무소", icon: "/icons/option/maintenance.svg" },
    {
      label: "주민공동시설",
      icon: "/icons/option/residencefacilities.svg",
    },
    { label: "어린이놀이터", icon: "/icons/option/playground.svg" },
    { label: "문고", icon: "/icons/option/stationary.svg" },
    { label: "자전거보관소", icon: "/icons/option/bicycle.svg" },
    { label: "보육시설", icon: "/icons/option/kindergarden.svg" },
    { label: "휴게시설", icon: "/icons/option/cafe.svg" },
  ];

  return (
    <section className="px-5 py-8 bg-white" id="facilities">
      <div className="mb-10">
        <h3 className="text-[20px] font-bold text-[#000000] mb-6 flex items-baseline gap-2">
          옵션{" "}
          <span className="text-[#30CEA1] text-[18px] font-bold">
            {options.length}개
          </span>
        </h3>
        <div className="grid grid-cols-4 gap-y-8">
          {options.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center bg-[#F8FAFB] rounded-lg">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-[14px] font-semibold text-[#262626]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[20px] font-bold text-[#000000] mb-6 flex items-baseline gap-2">
          부대시설{" "}
          <span className="text-[#30CEA1] text-[18px] font-bold">
            {buildingFacilities.length}개
          </span>
        </h3>
        <div className="grid grid-cols-4 gap-y-8">
          {buildingFacilities.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 flex items-center justify-center bg-[#F8FAFB] rounded-lg">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-[14px] font-semibold text-[#262626]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
