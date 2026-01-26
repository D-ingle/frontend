"use client";

import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface RegionBadgeProps {
  name: string;
  onRemove: () => void;
}

export const RegionBadge = ({ name, onRemove }: RegionBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-main-400 rounded-full text-main-500 font-medium"
    >
      <span>{name}</span>
      <button
        onClick={onRemove}
        className="hover:bg-main-100 rounded-full p-0.5 transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};
