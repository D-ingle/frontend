"use client";

import React, { useState } from "react";
import { cn } from "@/app/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  createdAt: string;
}

const MOCK_REPORTS: Report[] = Array.from({ length: 7 }, (_, i) => ({
  id: `${i + 1}`,
  title: "약수하이츠 vs 신금호자이아파트 vs 금호두산아파트",
  createdAt: "2026-01-28 09:48",
}));

const HomeReport = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const handleBulkDownload = () => {
    console.log("Downloading selected reports:", selectedIds);
    // Prepare for batch PDF creation/download
  };

  const handleSingleDownload = (id: string) => {
    console.log("Downloading single report:", id);
  };

  return (
    <div className="flex-1 flex flex-col gap-15 w-240">
      {/* Content Card */}
      <div className="bg-white border-2 border-[#f0f0f0] rounded-xl p-15 flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-[28px] font-extrabold text-gray-800 leading-normal opacity-90 m-0 p-0">
              D.HOME 리포트
            </h2>
            <p className="text-[16px] font-medium text-gray-500">
              비교하기에서 내보냈던 리포트들을 확인해보세요.
            </p>
          </div>
          <div className="h-px bg-[#D9D9D9] w-full" />
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center w-full">
          <h3 className="text-[24px] font-bold text-black">
            리포트 PDF 다운로드
          </h3>
          <button
            onClick={handleBulkDownload}
            disabled={selectedIds.length === 0}
            className={cn(
              "px-6 py-2.5 rounded-full text-[16px] font-bold transition-all",
              selectedIds.length > 0
                ? "bg-main-400 text-white shadow-sm hover:opacity-90"
                : "bg-gray-100 text-gray-400 cursor-not-allowed",
            )}
          >
            {selectedIds.length > 0
              ? `${selectedIds.length}개 선택 다운로드`
              : "선택 다운로드"}
          </button>
        </div>

        {/* Report List */}
        <div className="flex flex-col w-full border-t border-[#f4f4f4]">
          {MOCK_REPORTS.map((report) => {
            const isSelected = selectedIds.includes(report.id);
            return (
              <div
                key={report.id}
                className={cn(
                  "flex items-center justify-between p-6 border-b border-[#f4f4f4] transition-colors",
                  isSelected ? "bg-[#DEFAF2]/30" : "bg-white hover:bg-gray-50",
                )}
              >
                <div className="flex items-center gap-6 flex-1 min-w-0">
                  {/* Custom Checkbox */}
                  <div
                    onClick={() => toggleSelection(report.id)}
                    className={cn(
                      "w-5 h-5 flex items-center justify-center rounded-sm border cursor-pointer transition-colors shrink-0",
                      isSelected
                        ? "bg-main-400 border-main-400"
                        : "bg-white border-gray-300",
                    )}
                  >
                    {isSelected && (
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 4L4.5 7.5L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Title & Date */}
                  <div className="flex items-center gap-10 flex-1 min-w-0">
                    <p className="text-[18px] font-bold text-gray-800 truncate flex-1 leading-tight">
                      {report.title}
                    </p>
                    <div className="h-4 w-px bg-gray-200 hidden md:block" />
                    <span className="text-[16px] font-medium text-gray-400 shrink-0">
                      {report.createdAt}
                    </span>
                  </div>
                </div>

                {/* Individual Download Button */}
                <button
                  onClick={() => handleSingleDownload(report.id)}
                  className="ml-8 p-2 text-main-400 hover:bg-main-100/30 rounded-lg transition-colors shrink-0"
                >
                  <Download size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 py-10 w-full">
        <div className="flex items-center gap-1.5">
          <ChevronsLeft
            className="text-gray-300 cursor-pointer hover:text-gray-500"
            size={20}
          />
          <ChevronLeft
            className="text-gray-300 cursor-pointer hover:text-gray-500"
            size={20}
          />
        </div>
        <div className="flex items-center gap-5">
          <span className="text-[18px] font-bold text-black border-b-2 border-transparent cursor-pointer">
            1
          </span>
          <span className="text-[18px] font-medium text-gray-400 hover:text-black cursor-pointer">
            2
          </span>
          <span className="text-[18px] font-medium text-gray-400 hover:text-black cursor-pointer">
            3
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <ChevronRight
            className="text-gray-400 cursor-pointer hover:text-black"
            size={20}
          />
          <ChevronsRight
            className="text-gray-400 cursor-pointer hover:text-black"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeReport;
