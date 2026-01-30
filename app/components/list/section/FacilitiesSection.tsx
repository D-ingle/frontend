"use client";

import React from "react";
import Image from "next/image";

const FacilitiesSection = () => {
  const options = [
    { label: "냉장고", icon: "/list_detail/option/refrigerator.svg" },
    { label: "에어컨", icon: "/list_detail/option/airconditioner.svg" },
    { label: "책상", icon: "/list_detail/option/desk.svg" },
    { label: "신발장", icon: "/list_detail/option/shoe.svg" },
    { label: "세탁기", icon: "/list_detail/option/washingmachine.svg" },
    { label: "싱크대", icon: "/list_detail/option/sink.svg" },
    { label: "옷장", icon: "/list_detail/option/closet.svg" },
    { label: "인덕션", icon: "/list_detail/option/induction.svg" },
    { label: "전자레인지", icon: "/list_detail/option/microwave.svg" },
  ];

  const buildingFacilities = [
    { label: "헬스장", icon: "/list_detail/option/gym.svg" },
    { label: "세탁방", icon: "/list_detail/option/laudryshop.svg" },
    { label: "주차장", icon: "/list_detail/option/parking.svg" },
    { label: "커뮤니티", icon: "/list_detail/option/community.svg" },
    { label: "관리사무소", icon: "/list_detail/option/maintenance.svg" },
    {
      label: "주민공동시설",
      icon: "/list_detail/option/residencefacilities.svg",
    },
    { label: "어린이놀이터", icon: "/list_detail/option/playground.svg" },
    { label: "문고", icon: "/list_detail/option/stationary.svg" },
    { label: "자전거보관소", icon: "/list_detail/option/bicycle.svg" },
    { label: "보육시설", icon: "/list_detail/option/kindergarden.svg" },
    { label: "휴게시설", icon: "/list_detail/option/cafe.svg" },
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
