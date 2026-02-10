"use client";

import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface RegionBadgeProps {
  name: string;
  onRemove: () => void;
  size?: "sm" | "md";
}

export const RegionBadge = ({
  name,
  onRemove,
  size = "md",
}: RegionBadgeProps) => {
  const isSmall = size === "sm";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "flex items-center gap-2 bg-white border-2 border-main-400 rounded-full text-black font-medium",
        isSmall ? "px-4 py-2" : "px-5 py-3",
      )}
    >
      <span className={isSmall ? "text-[16px]" : "text-[18px]"}>{name}</span>
      <button
        onClick={onRemove}
        className="hover:bg-main-100 rounded-full p-0.5 transition-colors text-gray-400 font-semibold"
      >
        <X size={isSmall ? 16 : 20} />
      </button>
    </motion.div>
  );
};
