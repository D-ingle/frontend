"use client";

import React from "react";
import Image from "next/image";

const ReviewSection = () => {
  return (
    <section className="bg-white p-5 flex flex-col gap-5" id="review">
      {/* Title */}
      <div className="flex items-end gap-1 font-semibold leading-tight">
        <p className="text-[20px] text-black">약수하이츠</p>
        <p className="text-[18px] text-[#555555]">에 대한 후기 사진이에요.</p>
      </div>

      {/* Main Image View */}
      <div className="relative w-full h-56 overflow-hidden flex flex-col items-center justify-end">
        <Image
          src="/mockup/item.png"
          alt="Review Photo"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default ReviewSection;
