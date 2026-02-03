"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface HousingTypeCardProps {
  title: string;
  description: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

export const HousingTypeCard = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: HousingTypeCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start p-6 w-84.5 h-61.25 rounded-2xl border-2 transition-all duration-300 text-left",
        isSelected
          ? "border-main-400 bg-main-100 shadow-[0_8px_20px_0_rgba(48,206,161,0.15)]"
          : "border-gray-100 bg-white hover:border-main-400/50",
      )}
    >
      <div className="flex w-full justify-between items-start mb-auto">
        <h3
          className={cn(
            "text-[36px] font-bold",
            isSelected ? "text-main-500" : "text-navy",
          )}
        >
          {title}
        </h3>
        <div
          className={cn(
            "flex items-center justify-center p-3 w-17 h-17 rounded-md",
            isSelected ? "bg-white" : "bg-main-100",
          )}
        >
          <Image
            src={icon}
            alt={title}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </div>

      <p
        className={cn(
          "text-[20px] leading-[1.6]",
          isSelected ? "text-main-500" : "text-gray-400",
        )}
      >
        {description}
      </p>
    </motion.button>
  );
};
