"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SummarySection from "./list_section/SummarySection";
import CurationSection from "./list_section/CurationSection";
import DetailInfoSection from "./list_section/DetailInfoSection";
import FacilitiesSection from "./list_section/FacilitiesSection";
import SchoolSection from "./list_section/SchoolSection";
import AgencySection from "./list_section/AgencySection";
import SchoolDetail from "./list_section/detail/SchoolDetail";
import ContactModal from "./list_section/detail/ContactModal";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { useGetPropertyDetail } from "@/shared/api/generated/detail-property-controller/detail-property-controller";
import { useCurate } from "@/shared/api/generated/personalized-curation-controller/personalized-curation-controller";

import { useMapModeStore } from "@/app/store/mapModeStore";
import { usePropertyZzim } from "@/app/hooks/usePropertyZzim";
import { formatNumberToKoreanPrice } from "@/app/utils/format";

const sections = [
  { id: "curation", label: "맞춤 큐레이션 정보" },
  { id: "detail", label: "상세 정보" },
  { id: "facilities", label: "옵션 및 부대시설" },
  { id: "school", label: "학군 정보" },
  { id: "agency", label: "중개사무소 정보" },
];

const ListDetail = ({
  propertyId,
  onClose,
}: {
  propertyId: number;
  onClose?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("curation");
  const [selectedSchoolName, setSelectedSchoolName] = useState<string | null>(
    null,
  );
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { setSelectedProperty, clearSelectedProperty } = useMapModeStore();
  const { toggleZzim } = usePropertyZzim();

  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tabsBoxRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const { data: apiResponse, isLoading } = useGetPropertyDetail(propertyId);
  const { data: curationResponse, isLoading: isAiLoading } =
    useCurate(propertyId);
  const detailData = apiResponse?.data;

  // 활성 탭이 바뀔 때마다 탭바를 자동으로 스크롤하여 활성 탭을 왼쪽 처음에 맞춤
  useEffect(() => {
    const activeTabElement = tabRefs.current.get(activeTab);
    if (activeTabElement && tabsBoxRef.current) {
      const container = tabsBoxRef.current;
      const scrollLeft = activeTabElement.offsetLeft;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // 매물 정보를 불러오면 지도에 좌표 설정
  useEffect(() => {
    if (detailData?.propertyInfo) {
      const { latitude, longitude, apartmentName } = detailData.propertyInfo;
      const deal = detailData.deal;
      let priceStr = "";
      let dealLabel = "";

      if (deal) {
        if (deal.dealType === "RENT") {
          priceStr = `${deal.deposit}/${deal.monthlyRent}`;
          dealLabel = "월세";
        } else if (deal.dealType === "LEASE") {
          priceStr = formatNumberToKoreanPrice(deal.price || 0);
          dealLabel = "전세";
        } else if (deal.dealType === "SALE") {
          priceStr = formatNumberToKoreanPrice(deal.price || 0);
          dealLabel = "매매";
        }
      }

      if (latitude && longitude) {
        setSelectedProperty({
          id: propertyId,
          lat: latitude,
          lng: longitude,
          title: apartmentName || "매물 위치",
          price: priceStr,
          dealType: dealLabel,
          propertyScores: detailData.propertyScore,
        });
      }
    }
  }, [detailData, setSelectedProperty, propertyId]);

  // 스크롤 감지 및 탭 포커스 자동 전환
  useEffect(() => {
    if (isLoading) return;

    const observerOption = {
      root: document.querySelector(".scroll-container"), // 스크롤이 발생하는 컨테이너
      rootMargin: "-108px 0px -80% 0px", // 헤더(60)+탭(48) 및 하단 여백 고려
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOption,
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  const handleClose = () => {
    clearSelectedProperty();
    onClose?.();
  };

  const scrollToSection = (id: string) => {
    isManualScrolling.current = true;
    setActiveTab(id);

    // 이전에 설정된 타임아웃 제거
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const element = document.getElementById(id);
    if (element) {
      const mainContainer = element.closest(".scroll-container");
      if (mainContainer) {
        const offset = 60 + 48;
        mainContainer.scrollTo({
          top: element.offsetTop - offset,
          behavior: "smooth",
        });

        // 부드러운 스크롤이 끝날 즈음 감지 로직 재활성화 (대략 800ms)
        scrollTimeoutRef.current = setTimeout(() => {
          isManualScrolling.current = false;
        }, 800);
      }
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (isManualScrolling.current) return;

    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    // 바닥에 거의 도달했는지 확인 (오차 범위 10px)
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isAtBottom) {
      setActiveTab("agency");
    }
  };

  return (
    <main className="relative flex flex-col w-full h-full bg-white overflow-hidden">
      {/* Top Header (Fixed) */}
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 py-5 px-5 bg-white border-b border-[#E5E5E5] flex-none">
        <h1 className="flex-1 text-[20px] font-bold text-[#000000] truncate">
          {detailData?.propertyInfo?.apartmentName || "매물 상세"}
        </h1>
        <button
          onClick={handleClose}
          className="flex-1 flex justify-end text-[#000000] hover:opacity-70 transition-opacity"
        >
          <X className="w-6 h-6 cursor-pointer" />
        </button>
      </header>

      {/* Main Scrollable Content */}
      <main
        onScroll={handleScroll}
        className="scroll-container flex-1 overflow-y-auto no-scrollbar scroll-smooth"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-20">
            <div className="w-10 h-10 border-4 border-[#30CEA1] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-[14px]">
              상세 정보를 불러오는 중...
            </p>
          </div>
        ) : (
          <>
            <SummarySection
              propertyId={propertyId}
              propertyInfo={detailData?.propertyInfo}
              deal={detailData?.deal}
              images={detailData?.images}
              conditions={detailData?.conditions}
              isLiked={detailData?.propertyInfo?.liked}
              onToggleZzim={toggleZzim}
            />

            <div className="h-4 bg-[#F4F4F4]" />

            {/* Tab Bar (Sticky) */}
            <nav
              ref={tabsBoxRef}
              className="sticky top-0 z-40 flex w-full h-12 bg-white border-b border-[#E5E5E5] overflow-x-auto no-scrollbar flex-none"
            >
              {sections.map((tab) => (
                <button
                  key={tab.id}
                  ref={(el) => {
                    if (el) tabRefs.current.set(tab.id, el);
                    else tabRefs.current.delete(tab.id);
                  }}
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
            <div id="curation">
              <CurationSection
                conditions={detailData?.conditions}
                aiSummary={curationResponse?.data?.description}
                isAiLoading={isAiLoading}
              />
            </div>
            <div className="h-4 bg-[#F4F4F4]" />

            <div id="detail">
              <DetailInfoSection
                propertyInfo={detailData?.propertyInfo}
                floorImageUrl={detailData?.images?.floorImageUrl}
              />
            </div>
            <div className="h-4 bg-[#F4F4F4]" />

            <div id="facilities">
              <FacilitiesSection
                facility={detailData?.facility}
                option={detailData?.option}
              />
            </div>
            <div className="h-4 bg-[#F4F4F4]" />

            <div id="school">
              <SchoolSection
                onOpenSchoolDetail={(name) => setSelectedSchoolName(name)}
              />
            </div>
            <div className="h-4 bg-[#F4F4F4]" />

            <div id="agency">
              <AgencySection realtorInfo={detailData?.realtorInfo} />
            </div>
            <div className="h-4 bg-[#F4F4F4]" />
          </>
        )}
        {/* Footer padding */}
        {/* <div className="h-8" /> */}
      </main>

      {/* Bottom Contact Bar (Fixed) */}
      <footer className="sticky bottom-0 z-50 flex items-center gap-3 w-full h-20 px-5 bg-white border-t border-[#E5E5E5] pb-safe flex-none">
        <button className="flex items-center justify-center w-12 h-12 border border-[#D9D9D9] rounded-lg text-[#434343] cursor-pointer">
          <Image
            src="/icons/feature/list_detail/contact/contact.svg"
            width={20}
            height={18}
            alt="Contact"
          />
        </button>
        <button
          onClick={() => setIsContactModalOpen(true)}
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

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        realtorInfo={detailData?.realtorInfo}
        apartmentName={detailData?.propertyInfo?.apartmentName}
      />
    </main>
  );
};

export default ListDetail;
