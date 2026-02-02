"use client";

import React from "react";
import Image from "next/image";

interface SchoolItemProps {
  name: string;
  type: string;
  distance: string;
  time?: string;
  onClick?: () => void;
}

const SchoolItem = ({
  name,
  type,
  distance,
  time,
  onClick,
}: SchoolItemProps) => {
  return (
    <div className="group cursor-pointer relative" onClick={onClick}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-[18px] font-bold text-[#000000]">
                {name}
              </span>
              <span className="text-[13px] text-[#9D9D9D]">{type}/공학</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[16px] text-[#9D9D9D]">학교까지 거리</span>
            <div className="flex items-center gap-1 ml-1 pt-0.5">
              <Image
                src="/icons/feature/list_detail/school/mappin.svg"
                alt="Marker"
                width={14}
                height={14}
              />
              <span className="text-[18px] font-bold text-[#2EA98C]">
                {distance}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/icons/feature/list_detail/arrow2.svg"
            alt="Arrow"
            width={8}
            height={8}
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolItem;
