"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

const rankBadgeImg =
  "http://localhost:3845/assets/8537a5d1a92518c0e6ad6ee9a2dbe22dde7f7eef.svg";

interface AtmosphereCardProps {
  title: string;
  description: string;
  icon: string; // Changed to string for SVG URL
  iconBgColor: string;
  isSelected: boolean;
  orderNumber?: number;
  onClick: () => void;
}

export const AtmosphereCard = ({
  title,
  description,
  icon,
  iconBgColor,
  isSelected,
  orderNumber,
  onClick,
}: AtmosphereCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start p-6 rounded-3xl border-2 transition-all duration-300 text-left w-114 h-44 bg-white",
        isSelected
          ? "border-navy shadow-sm"
          : "border-gray-100 hover:border-gray-200",
      )}
    >
      {/* Rank Number Badge */}
      {isSelected && orderNumber !== undefined && (
        <div className="absolute top-[-20] left-[-17] w-10.25 h-10.25">
          <img src={rankBadgeImg} alt="" className="w-full h-full" />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[18px]">
            {orderNumber}
          </span>
        </div>
      )}

      <div className="flex w-full justify-between items-start">
        <h3 className="text-[26px] font-bold text-navy mb-1">{title}</h3>

        <div
          className={cn(
            "flex items-center justify-center p- rounded-sm w-16.25 h-16.25",
            iconBgColor,
          )}
        >
          <img src={icon} alt={title} />
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-[17px] leading-[1.4] text-gray-500 font-medium whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </motion.button>
  );
};
