"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ListItem from "./ListItem";
import ListDetail from "./ListDetail";
import ContactModal from "./list_section/detail/ContactModal";

const properties = [
  {
    id: 1,
    rank: 1,
    image: "/images/mockup/item.png",
    price: "전세 6억 9,000",
    name: "약수하이츠 104동",
    type: "아파트",
    area: "107/84m²",
    floor: "2/20층",
    tags: ["소음", "접근성"],
    isLiked: true,
  },
  {
    id: 2,
    rank: 2,
    image: "/images/mockup/item.png",
    price: "전세 6억 9,000",
    name: "약수하이츠 104동",
    type: "아파트",
    area: "107/84m²",
    floor: "2/20층",
    tags: ["소음", "접근성"],
    isLiked: false,
  },
  {
    id: 3,
    rank: 3,
    image: "/images/mockup/item.png",
    price: "전세 6억 9,000",
    name: "약수하이츠 104동",
    type: "아파트",
    area: "107/84m²",
    floor: "2/20층",
    tags: ["소음", "접근성"],
    isLiked: false,
  },
  {
    id: 4,
    image: "/images/mockup/item.png",
    price: "전세 6억 9,000",
    name: "약수하이츠 104동",
    type: "아파트",
    area: "107/84m²",
    floor: "2/20층",
    tags: ["소음", "접근성"],
    isLiked: false,
  },
];

const priorities = ["안전", "접근성", "편의", "환경", "소음"];

const priorityStyles: Record<
  string,
  { icon: string; color: string; bgColor: string }
> = {
  안전: {
    icon: "/icons/priority/safety_badge.svg",
    color: "#F48787",
    bgColor: "#FFF7F7",
  },
  접근성: {
    icon: "/icons/priority/accessibility_badge.svg",
    color: "#7CB7CD",
    bgColor: "#F7FCFE",
  },
  편의: {
    icon: "/icons/priority/convenience_badge.svg",
    color: "#AB9FD5",
    bgColor: "#FAF9FD",
  },
  환경: {
    icon: "/icons/priority/environment_badge.svg",
    color: "#82AA82",
    bgColor: "#F8FCF8",
  },
  소음: {
    icon: "/icons/priority/noise_badge.svg",
    color: "#FBBA78",
    bgColor: "#FFFCF6",
  },
};

const List = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="relative flex h-full no-scrollbar">
      {/* List Panel (Fixed Width, High Z-Index) */}
      <div className="relative w-100 h-full flex flex-col bg-white border-r border-[#F4F4F4] z-20 flex-none shadow-[4px_0_10px_rgba(0,0,0,0.02)] overflow-y-auto no-scrollbar">
        {/* Header: User Priorities */}
        <div className="py-8 px-5 flex-none border-b border-[#F4F4F4] bg-linear-to-b from-[#E5FAF4] via-white via-5% to-white">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/feature/list/curation.svg"
                alt="Sparkle"
                width={24}
                height={24}
              />
              <h2 className="text-[24px] font-bold text-[#000000]">
                <span className="bg-linear-to-r from-[#30CEA1] to-[#2EA98C] bg-clip-text text-transparent">
                  딩글
                </span>{" "}
                님의 우선순위
              </h2>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Image
                src="/icons/common/reset.svg"
                alt="Reset"
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* Priority Tags Grid */}
          <div className="flex flex-wrap gap-2 mb-6">
            {priorities.map((label, i) => {
              const style = priorityStyles[label];
              if (!style) return null;

              return (
                <div
                  key={i}
                  className="relative pt-2 pl-2 cursor-pointer group"
                >
                  {/* Ranking Badge */}
                  <div
                    className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center rounded-full text-white text-[11px] font-semibold z-10"
                    style={{ backgroundColor: style.color }}
                  >
                    {i + 1}
                  </div>

                  {/* Tag Body */}
                  <div
                    className="flex items-center gap-1 px-3 py-1.5 rounded-[30px] border transition-shadow hover:shadow-[2px_2px_4px_rgba(0,0,0,0.05)]"
                    style={{
                      backgroundColor: style.bgColor,
                      borderColor: style.color,
                    }}
                  >
                    <Image
                      src={style.icon}
                      alt={label}
                      width={20}
                      height={20}
                    />
                    <span className={`text-[14px] font-medium`}>{label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tip Card */}
          <div className="flex items-center gap-2 p-4 bg-[#F8FAFB] rounded-xl">
            <Image
              src="/icons/feature/list/quotation.svg"
              alt="Quotation"
              width={20}
              height={20}
            />
            <p className="text-[12px] text-[#9D9D9D] leading-tight">
              최대 3개의 우선순위를 기반으로 딱 맞는 집을 추천해드려요.
            </p>
          </div>
        </div>

        <div className="flex-1 no-scrollbar">
          {properties.map((property) => (
            <ListItem
              key={property.id}
              property={property}
              onClick={(id) => setSelectedId(id)}
            />
          ))}
          {/* Extra padding for list ending */}
          <div className="h-20" />
        </div>
      </div>

      {/* Detail Panel (Absolute, Slides Out from behind List) */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 left-100 w-100 h-full bg-white z-10 border-r border-[#E5E5E5]"
          >
            <ListDetail
              onClose={() => setSelectedId(null)}
              onOpenContact={() => setIsContactModalOpen(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal (Global level to avoid transform issues) */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default List;
