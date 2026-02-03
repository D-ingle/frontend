import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CurationProps {
  content?: string;
  description?: string;
  isLoading?: boolean;
  buttonLabel?: string;
  buttonLink?: string;
  isSubComponent?: boolean;
  showButton?: boolean;
}

const Curation = ({
  content,
  description,
  isLoading,
  buttonLabel,
  buttonLink,
  isSubComponent = false,
  showButton = true,
}: CurationProps) => {
  return (
    <main
      className={`relative flex flex-col items-center justify-center overflow-hidden bg-transparent ${isSubComponent ? "w-full h-full" : "min-h-screen bg-white"}`}
    >
      {!isSubComponent && (
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(172, 235, 217, 0.60) 0%, rgba(255, 255, 255, 0.60) 100%), #FFF",
          }}
        />
      )}

      {/* Rotating Background Circles & Mascot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Background Circles */}
        <div className="absolute flex items-center justify-center">
          {/* Outer Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-181 h-181 rounded-full border-4 border-white/60"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              boxShadow: "0 2px 24.4px 0 rgba(255, 255, 255, 0.70)",
            }}
          >
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full drop-shadow-[0_2px_24.4px_rgba(48,203,159,0.20)]" />
            <div className="absolute bottom-1/2 right-[-18] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full drop-shadow-[0_2px_24.4px_rgba(48,203,159,0.20)]" />
          </motion.div>

          {/* Middle Circle */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-151 h-151 rounded-full border-4 border-white/60 bg-white/25 shadow-[0_2px_24.4px_0_rgba(255,255,255,0.70)]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full drop-shadow-[0_2px_24.4px_rgba(48,203,159,0.20)]" />
          </motion.div>

          {/* Inner Circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-86.5 h-86.5 rounded-full border-4 border-white/40 bg-white/6 shadow-[0_2px_24.4px_0_rgba(255,255,255,0.70)]"
          ></motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-75.5 h-75.5 rounded-full border-4 border-white/40 shadow-[0_2px_24.4px_0_rgba(255,255,255,0.70)]"
          ></motion.div>
        </div>

        {/* Mascot - Perfectly Centered */}
        <div className="relative w-70 h-70 flex items-center justify-center">
          {/* Mascot Glow Background */}
          <div className="absolute inset-0 bg-[#30CEA1]/10 rounded-full blur-3xl" />

          <motion.div
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex items-center justify-center"
          >
            {/* Mascot BG */}
            <div className="absolute flex items-center justify-center w-70 h-70">
              <Image
                src="/images/mascot/mascot_bg.svg"
                alt="Mascot Background"
                width={500}
                height={500}
              />
            </div>

            {/* Mascot Main */}
            <Image
              src="/images/mascot/mascot.svg"
              alt="Mascot"
              width={160}
              height={160}
              priority
              className="relative z-10 drop-shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Content Layer (Title & Button) */}
      <div
        className={`relative z-10 flex flex-col items-center justify-between py-20 ${isSubComponent ? "h-full" : "min-h-screen"} w-full text-center`}
      >
        {/* Top Section: Title & Description */}
        <div className="flex flex-col items-center gap-6 mt-30">
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="px-8"
            >
              <h1 className="text-[32px] font-extrabold text-transparent bg-clip-text bg-linear-to-l from-[#2ea98c] to-[#30cea1] leading-normal min-h-[48px]">
                {content}
              </h1>
            </motion.div>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[20px] font-medium text-[#262626] max-w-200 rounded-[60px] bg-white/50 shadow-[0_3px_10.5px_rgba(104,191,166,0.36)] px-8 py-3 backdrop-blur-[10px] border-4 border-white"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Bottom Section: Start Button */}
        <div className="mb-10">
          {showButton && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={buttonLink || "/"}
                className={`inline-flex items-center justify-center px-15 py-4 rounded-lg bg-navy text-white text-[20px] font-bold shadow-lg hover:bg-navy/90 transition-all duration-300 mb-20 ${isLoading ? "cursor-not-allowed opacity-0" : ""}`}
              >
                {buttonLabel}
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Curation;
