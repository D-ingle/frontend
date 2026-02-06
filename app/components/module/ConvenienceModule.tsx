import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useModuleStore } from "@/app/store/moduleStore";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ConvenienceModule = () => {
  const { activeModules, toggleModule } = useModuleStore();
  const isActive = activeModules.includes("convenience");
  const [selectedTime, setSelectedTime] = useState(5); // 5, 10, 20

  // Checkbox states for the facilities
  const [checkedItems, setCheckedItems] = useState({
    store: false,
    market: true,
    hospital: false,
  });

  const toggleItem = (key: keyof typeof checkedItems) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      className={cn(
        "w-[340px] shrink-0 flex flex-col items-start overflow-hidden rounded-[16px] border-2 shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] pointer-events-auto transition-all duration-300",
        isActive
          ? "border-[#AB9FD5] bg-[#E5E0F7]/90 backdrop-blur-[2.5px]"
          : "border-[#C4C4C4] bg-white/90 backdrop-blur-[2.5px]",
      )}
    >
      {/* Header Section */}
      <div
        className={cn(
          "w-full h-[59px] flex items-center justify-between px-5 bg-white",
          isActive && "border-b border-[#AB9FD5]/20",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon Badge */}
          <div
            className={cn(
              "w-[29px] h-[29px] flex items-center justify-center rounded-[5px] transition-colors duration-300",
              isActive ? "bg-[#AB9FD5]" : "bg-[#9D9D9D]",
            )}
          >
            <Image
              src="/icons/module/convenience/whiteapt.svg"
              width={17.063}
              height={16.188}
              alt="Convenience"
            />
          </div>
          <span className="font-semibold text-[18px] text-black tracking-[-0.15px]">
            편의 정보
          </span>
          <span
            className={cn(
              "font-semibold text-[18px] tracking-[-0.15px] transition-colors duration-300",
              isActive ? "text-[#745BCD]" : "text-[#555555]",
            )}
          >
            82점
          </span>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => toggleModule("convenience")}
          className={cn(
            "w-[36px] h-[21px] rounded-[11px] border-[0.5px] flex items-center p-[3px] transition-all duration-200",
            isActive
              ? "bg-[#AB9FD5] border-[#AB9FD5] justify-end"
              : "bg-gray-200 border-gray-300 justify-start",
          )}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
        </button>
      </div>

      {/* Contents Section */}
      <div
        className={cn(
          "w-full flex flex-col gap-5 p-5 transition-all duration-300 overflow-hidden",
          isActive ? "max-h-[1000px] opacity-100" : "max-h-0 py-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[16px] text-black tracking-[-0.15px]">
            편의 시설
          </h3>
          <div className="bg-white border-[1.5px] border-[#AB9FD5] rounded-lg p-4 py-5 flex flex-col gap-4">
            {/* Walk indicators */}
            <div className="flex items-center justify-between">
              {[5, 10, 20].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className="flex items-center gap-1.5 font-semibold text-[14px] text-black tracking-[-0.15px] group pointer-events-auto"
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-5 h-5 border-[1.18px] rounded-full transition-colors",
                      selectedTime === time
                        ? "border-[#AB9FD5]"
                        : "border-[#7B7B7B] group-hover:border-[#AB9FD5]",
                    )}
                  >
                    {selectedTime === time && (
                      <div className="w-[10.6px] h-[10.6px] bg-[#AB9FD5] rounded-full" />
                    )}
                  </div>
                  도보 {time}분
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[#E5E5E5] w-full" />

            {/* Facility List with Checkboxes */}
            <div className="flex flex-col gap-4">
              {/* Convenience Store */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/convenience/24shop.svg"
                      width={15.07}
                      height={13.5}
                      alt="Store"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    편의점
                  </span>
                </div>
                <button
                  onClick={() => toggleItem("store")}
                  className={cn(
                    "w-5 h-5 border rounded-[2px] flex items-center justify-center transition-colors",
                    checkedItems.store
                      ? "bg-[#AB9FD5] border-[#AB9FD5]"
                      : "bg-white border-[#AB9FD5]",
                  )}
                >
                  {checkedItems.store && (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                  )}
                </button>
              </div>

              {/* Market */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/convenience/market.svg"
                      width={12}
                      height={15.002}
                      alt="Market"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    대형마트, 백화점, 시장
                  </span>
                </div>
                <button
                  onClick={() => toggleItem("market")}
                  className={cn(
                    "w-5 h-5 border rounded-[2px] flex items-center justify-center transition-colors",
                    checkedItems.market
                      ? "bg-[#AB9FD5] border-[#AB9FD5]"
                      : "bg-white border-[#AB9FD5]",
                  )}
                >
                  {checkedItems.market && (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                  )}
                </button>
              </div>

              {/* Hospital */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="w-[18px] h-[18px] flex items-center justify-center">
                    <Image
                      src="/icons/module/convenience/hospital.svg"
                      width={16.2}
                      height={14.4}
                      alt="Hospital"
                    />
                  </div>
                  <span className="font-semibold text-[14px] text-black tracking-[-0.15px]">
                    병원
                  </span>
                </div>
                <button
                  onClick={() => toggleItem("hospital")}
                  className={cn(
                    "w-5 h-5 border rounded-[2px] flex items-center justify-center transition-colors",
                    checkedItems.hospital
                      ? "bg-[#AB9FD5] border-[#AB9FD5]"
                      : "bg-white border-[#AB9FD5]",
                  )}
                >
                  {checkedItems.hospital && (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvenienceModule;
