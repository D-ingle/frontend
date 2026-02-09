"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({ message, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className="fixed top-24 left-1/2 z-[100] flex items-center gap-[13px] px-[20px] py-[16px] bg-[#fff7ed] border border-[#f54900] rounded-[8px] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)] min-w-[340px] whitespace-nowrap"
        >
          <div className="relative w-4 h-4 flex-shrink-0">
            <Image
              src="/icons/common/tooltip.svg"
              alt="tooltip"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[#f54900] text-[16px] font-bold leading-[1.3]">
            TIP
          </span>
          <span className="text-[#f54900] text-[16px] font-semibold leading-[1.3]">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
