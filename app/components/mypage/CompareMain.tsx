"use client";

import React, { useEffect, useRef } from "react";
import CompareCard from "./CompareCard";
import CurationComparison from "./CurationComparison";
import BasicInfoComparison from "./BasicInfoComparison";
import Image from "next/image";
import CompareModal from "../compare/CompareModal";
import { cn } from "@/app/lib/utils";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface House {
  id: string;
  price: string;
  name: string;
  area: string;
  floor: string;
  image: string;
  location: string;
  type: string;
}

interface CurationData {
  summary: string;
  tags: ("소음" | "안전" | "접근성" | "편의" | "환경")[];
  scores: {
    소음: number;
    환경: number;
    안전: number;
    편의: number;
    접근성: number;
  };
}

interface BasicInfo {
  건물명: string;
  주소: string;
  매물형태: string;
  면적: string;
  층수: string;
  배당층_총층수: string;
  방향: string;
  주차: string;
}

interface CompareMainProps {
  selectedHouses: (House | null)[];
  curationData: (CurationData | null)[];
  basicInfo: (BasicInfo | null)[];
  onRemove: (id: string) => void;
  isUnlocked: boolean;
  onUnlock: () => void;
}

const CompareMain = ({
  selectedHouses,
  curationData,
  basicInfo,
  onRemove,
  isUnlocked,
  onUnlock,
}: CompareMainProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          // PDF 제외 요소 숨기기
          const excludeElements = clonedDoc.querySelectorAll(
            '[data-pdf-exclude="true"]',
          );
          excludeElements.forEach((el) => {
            (el as HTMLElement).style.display = "none";
          });

          // 상단 여백 및 간격 제거
          const reportContainer = clonedDoc.querySelector(
            ".flex-1.bg-white.flex.flex-col",
          ) as HTMLElement;
          if (reportContainer) {
            reportContainer.style.marginTop = "0";
            reportContainer.style.marginLeft = "0";
            reportContainer.style.paddingTop = "0";
          }

          const firstSection = clonedDoc.querySelector(
            "section",
          ) as HTMLElement;
          if (firstSection) {
            firstSection.style.paddingTop = "0";
            firstSection.style.marginTop = "0";
          }

          // 3. 레이아웃 압축 (1페이지에 더 많은 정보를 담기 위해 간격 축소)
          const tightenContainer = clonedDoc.querySelector(
            '[data-pdf-tighten="true"]',
          ) as HTMLElement;
          if (tightenContainer) {
            tightenContainer.style.gap = "20px";
            tightenContainer.style.padding = "20px";
            tightenContainer.style.marginBottom = "20px";
          }

          // 모든 섹션의 패딩 및 간격 축소
          const sections = clonedDoc.querySelectorAll("section");
          sections.forEach((sec) => {
            const s = sec as HTMLElement;
            s.style.paddingTop = "20px";
            s.style.paddingBottom = "20px";
            s.style.gap = "20px";
          });

          const texts = clonedDoc.querySelectorAll("p, span, div");
          texts.forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.classList.contains("truncate")) {
              htmlEl.classList.remove("truncate");
              htmlEl.style.whiteSpace = "normal";
              htmlEl.style.overflow = "visible";
            }
            const style = window.getComputedStyle(htmlEl);
            const fontSize = parseFloat(style.fontSize);
            const lineHeight = style.lineHeight;
            if (lineHeight.includes("px")) {
              const lhPx = parseFloat(lineHeight);
              if (lhPx < fontSize * 1.2) {
                htmlEl.style.lineHeight = "1.4";
              }
            }
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `D-ingle_비교리포트_${new Date().toISOString().slice(0, 10)}.pdf`,
      );
    } catch (error) {
      console.error("PDF export error:", error);
    }
  };

  return (
    <div
      className="flex-1 bg-white flex flex-col min-h-screen w-[1220px] ml-10 mt-10"
      ref={reportRef}
    >
      {/* Main Content Areas inside a Blue Background Container for sections */}
      <div className="flex-1 flex flex-col gap-[8px] w-full">
        {/* Each major block is a styled section */}

        {/* Section 1: Property Cards */}
        <section className="bg-[#F8FAFB] px-[60px] py-[40px] flex flex-col gap-[28px]">
          <div className="content-stretch flex justify-between items-center relative shrink-0 w-full">
            <div
              className="flex flex-row items-center gap-4"
              data-pdf-exclude="true"
            >
              <p className="font-['Pretendard_Variable:ExtraBold',sans-serif] font-extrabold leading-[1.1] opacity-90 text-[#191919] text-[28px]">
                내 매물 비교하기
              </p>
              <p className="font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[1.1] opacity-90 text-[16px] text-[#7b7b7b]">
                최대 3개까지 관심 매물을 비교할 수 있어요
              </p>
            </div>
            <div
              className="bg-[#f8fafb] border border-[#8298a8] border-solid content-stretch flex gap-[10px] items-center justify-center px-[20px] py-[12px] rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={handleDownloadPDF}
              data-pdf-exclude="true"
            >
              <div className="relative shrink-0 size-[20px] mb-1">
                <Image
                  src="/icons/common/export.svg"
                  alt="PDF"
                  width={20}
                  height={20}
                />
              </div>
              <p className="font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[1.5] relative shrink-0 text-[#063152] text-[16px] uppercase ml-auto">
                PDF 리포트 내보내기
              </p>
            </div>
          </div>
          <div className="h-px bg-[#D9D9D9] w-full shrink-0" />
          <div className="content-stretch flex gap-[35px] items-end relative shrink-0 pt-[20px]">
            {[0, 1, 2].map((i) => (
              <CompareCard
                key={i}
                {...(selectedHouses[i] || {
                  id: `empty-${i}`,
                  price: "",
                  name: "",
                  floor: "",
                  area: "",
                  image: "",
                  location: "",
                  type: "",
                  isEmpty: true,
                })}
                isEmpty={!selectedHouses[i]}
                onRemove={onRemove}
              />
            ))}
          </div>
        </section>

        {/* Section Container with Blue Background for Curation & Basic Info */}
        <div className="relative">
          <div
            className={cn(
              "bg-[#f8fafb] flex flex-col gap-[60px] px-[60px] py-[60px] rounded-t-[12px] transition-all duration-500",
            )}
            data-pdf-tighten="true"
          >
            {/* Section 2: Curation */}
            <section className="flex flex-col gap-[28px]">
              <div className="flex flex-col gap-[28px]">
                <h2 className="font-['Pretendard_Variable:ExtraBold',sans-serif] font-extrabold opacity-90 text-[#191919] text-[28px]">
                  큐레이션 비교 결과
                </h2>
                <div className="h-px bg-[#D9D9D9] w-full" />
              </div>
              <CurationComparison data={curationData} />
            </section>

            {/* Section 3: Basic Info */}
            <section
              className="flex flex-col gap-[28px] mb-[60px]"
              data-pdf-tighten="true"
            >
              <div className="flex flex-col gap-[28px]">
                <h2 className="font-['Pretendard_Variable:ExtraBold',sans-serif] font-extrabold opacity-90 text-[#191919] text-[28px]">
                  기본 정보 비교
                </h2>
                <div className="h-px bg-[#D9D9D9] w-full" />
              </div>
              <BasicInfoComparison data={basicInfo} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareMain;
