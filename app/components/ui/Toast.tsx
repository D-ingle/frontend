"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
  variant?: "success" | "warning";
}

export const Toast = ({
  message,
  onClose,
  duration = 3000,
  variant = "warning",
}: ToastProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  const isSuccess = variant === "success";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          className={cn(
            "fixed top-24 left-1/2 z-[100] flex items-center rounded-[8px] shadow-[0px_5px_15px_0px_rgba(0,0,0,0.15)] whitespace-nowrap transition-all",
            isSuccess
              ? "bg-[#EEFAF5] border border-[#30cea1] px-[24px] py-[14px] justify-center min-w-[300px]"
              : "bg-[#fff7ed] border border-[#f54900] px-[20px] py-[16px] gap-[13px] min-w-[340px]",
          )}
        >
          {!isSuccess && (
            <>
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
            </>
          )}
          <span
            className={cn(
              "text-[16px] leading-[1.3]",
              isSuccess
                ? "text-[#1A9C79] font-bold"
                : "text-[#f54900] font-semibold",
            )}
          >
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
