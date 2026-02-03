"use client";

import React from "react";
import Image from "next/image";
import { X, Phone } from "lucide-react";
import Portal from "@/app/components/ui/Portal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        className="fixed inset-0 z-150 flex items-center justify-center px-5 bg-black/50"
        onClick={onClose}
      >
        <div
          className="w-full max-w-100 bg-white rounded-xl shadow-[0px_4px_12.2px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative flex items-center justify-center h-18.5 px-8 pt-7.5 pb-5 mb-5">
            <h2 className="text-[20px] font-semibold text-black leading-none">
              연락처 보기
            </h2>
            <button
              onClick={onClose}
              className="absolute right-8 top-7.5 text-black hover:opacity-70 transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 flex flex-col items-center">
            <p className="text-[16px] font-semibold text-[#555555] mb-5 text-center">
              중개사무소에 연락하여 방문일을 예약하세요
            </p>

            <div className="w-full space-y-3.5">
              {/* Agency Info Box */}
              <button className="w-full h-28 bg-[#F8FAFB] rounded-md p-4 flex items-center gap-3 text-left hover:bg-[#F2F5F7] transition-colors group">
                <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden">
                  <Image
                    src="/images/mockup/item.png"
                    alt="Agency"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[16px] font-bold text-black truncate">
                      딩글공인중개사사무소
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9D9D9D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex gap-3 text-[12px]">
                      <span className="w-16 shrink-0">대표명</span>
                      <span className="text-[#262626] font-semibold">
                        신정인
                      </span>
                    </div>
                    <div className="flex gap-3 text-[12px]">
                      <span className=" w-16 shrink-0">중개등록번호</span>
                      <span className="text-[#262626] font-semibold truncate">
                        경기-2024-000001
                      </span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Contact Details Box */}
              <div className="w-full bg-[#F8FAFB] rounded-md p-6 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#2EA98C]">
                    <Phone className="w-5 h-5 fill-current" />
                  </div>
                  <span className="text-[28px] font-bold text-[#2EA98C] tracking-tight">
                    010-0000-0000
                  </span>
                </div>

                <div className="w-full h-px bg-[#E5E5E5] mb-5" />

                <div className="text-center space-y-2">
                  <p className="text-[14px] font-semibold text-[#262626]">
                    서울 중구 명동10길 52
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[12px] font-semibold text-[#262626]">
                    <span>평일 9:00 - 19:00</span>
                    <div className="w-px h-3.25 bg-[#E5E5E5]" />
                    <span>토요일 10:00 - 14:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ContactModal;
