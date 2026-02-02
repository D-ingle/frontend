"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SummarySection from "./section/SummarySection";
import CurationSection from "./section/CurationSection";
import DetailInfoSection from "./section/DetailInfoSection";
import FacilitiesSection from "./section/FacilitiesSection";
import SchoolSection from "./section/SchoolSection";
import AgencySection from "./section/AgencySection";
import ReviewSection from "./section/ReviewSection";
import SchoolDetail from "./SchoolDetail";
import Image from "next/image";

const sections = [
  { id: "curation", label: "맞춤 큐레이션 정보" },
  { id: "detail", label: "상세 정보" },
  { id: "facilities", label: "옵션 및 부대시설" },
  { id: "school", label: "학군 정보" },
  { id: "review", label: "후기 사진" },
  { id: "agency", label: "중개사무소 정보" },
];

const ListDetail = ({
  onClose,
  onOpenContact,
}: {
  onClose?: () => void;
  onOpenContact?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("curation");
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(
    null,
  );

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const mainContainer = element.closest("main");
      if (mainContainer) {
        // Offset for sticky header (60px) + tab bar (48px)
        const offset = 60 + 48;
        mainContainer.scrollTo({
          top: element.offsetTop - offset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <main className="relative flex flex-col w-full h-full bg-white overflow-hidden">
      {/* Top Header (Fixed) */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 py-5 px-5 bg-white border-b border-[#E5E5E5] flex-none">
        <h1 className="flex-1 text-[20px] font-bold text-[#000000] truncate">
          약수하이츠 11동
        </h1>
        <button
          onClick={onClose}
          className="flex-1 flex justify-end text-[#000000] hover:opacity-70 transition-opacity"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        <SummarySection />

        <div className="h-4 bg-[#F4F4F4]" />

        {/* Tab Bar (Sticky) */}
        <nav className="sticky top-0 z-40 flex w-full h-12 bg-white border-b border-[#E5E5E5] overflow-x-auto no-scrollbar flex-none">
          {sections.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`flex-none px-4 h-full text-[14px] font-medium transition-colors relative ${
                activeTab === tab.id ? "text-[#000000]" : "text-[#9D9D9D]"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#000000]" />
              )}
            </button>
          ))}
        </nav>

        {/* Render Sections */}
        <CurationSection />
        <div className="h-4 bg-[#F4F4F4]" />

        <DetailInfoSection />
        <div className="h-4 bg-[#F4F4F4]" />

        <FacilitiesSection />
        <div className="h-4 bg-[#F4F4F4]" />

        <SchoolSection
          onOpenSchoolDetail={(name) => setSelectedSchoolName(name)}
        />
        <div className="h-4 bg-[#F4F4F4]" />

        <AgencySection />
        <div className="h-4 bg-[#F4F4F4]" />

        <ReviewSection />
        {/* Footer padding */}
        <div className="h-8" />
      </main>

      {/* Bottom Contact Bar (Fixed) */}
      <footer className="sticky bottom-0 z-50 flex items-center gap-3 w-full h-20 px-5 bg-white border-t border-[#E5E5E5] pb-safe flex-none">
        <button className="flex items-center justify-center w-12 h-12 border border-[#D9D9D9] rounded-lg text-[#434343] cursor-pointer">
          <Image
            src="/list_detail/contact/contact.svg"
            width={20}
            height={18}
            alt="Contact"
          />
        </button>
        <button
          onClick={onOpenContact}
          className="flex-1 h-12 bg-navy text-white font-bold rounded-lg hover:bg-[#052844] transition-colors cursor-pointer"
        >
          연락처 보기
        </button>
      </footer>

      {/* School Detail Overlay */}
      <AnimatePresence>
        {selectedSchoolName && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-60 bg-white"
          >
            <SchoolDetail
              schoolName={selectedSchoolName}
              onBack={() => setSelectedSchoolName(null)}
              onClose={() => {
                setSelectedSchoolName(null);
                onClose?.();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ListDetail;
