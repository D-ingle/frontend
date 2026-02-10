"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AILoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full">
      <div className="relative w-24 h-24 mb-6">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/images/mascot/mascot_bg.svg"
            alt="loading background"
            fill
            className="opacity-60"
          />
        </motion.div>

        {/* Mascot Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/mascot/mascot.svg"
            alt="Ddingle Mascot"
            width={64}
            height={64}
            className="drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <motion.p
          className="text-[16px] font-bold text-main-500"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          AI가 매물을 분석하고 있습니다
        </motion.p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-main-300 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AILoading;
