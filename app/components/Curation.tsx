import React from "react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CurationProps {
  content: string;
  description: string;
  isLoading: boolean;
  buttonLabel?: string;
  buttonLink?: string;
}

const Curation = ({
  content,
  description,
  isLoading,
  buttonLabel,
  buttonLink,
}: CurationProps) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at center, #ACEBD9 0%, #D6F5EC 50%, #FFFFFF 100%)",
        }}
      />

      {/* Rotating Background Circles */}
      <div className="absolute flex items-center justify-center pointer-events-none">
        {/* Outer Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-181 h-181 rounded-full border-4 border-white/80"
        >
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
          <div className="absolute bottom-1/2 right-[-18] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
        </motion.div>

        {/* Middle Circle */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-151 h-151 rounded-full border-4 border-white/60"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
        </motion.div>

        {/* Inner Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-86.5 h-86.5 rounded-full border-4 border-white/40"
        ></motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-75.5 h-75.5 rounded-full border-4 border-white/40"
        ></motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-20">
        {/* Title Tag */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 px-8 py-4"
          >
            <h1 className="text-[32px] font-bold text-[#30CEA1] uppercase tracking-tight">
              {content}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[20px] font-medium text-[#262626] max-w-200 rounded-[60px] bg-white/50 shadow-[0_3px_10.5px_rgba(104,191,166,0.36)] px-5 py-4"
          >
            {description}
          </motion.p>
        </div>
        {/* Mascot */}
        <div className="relative w-45 h-45 mb-20 flex items-center justify-center">
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
                src="/mascot_bg.svg"
                alt="Mascot Background"
                width={500}
                height={500}
              />
            </div>

            {/* Mascot Main */}
            <Image
              src="/mascot.svg"
              alt="Mascot"
              width={128}
              height={128}
              priority
              className="relative z-10 drop-shadow-xl"
            />
          </motion.div>
        </div>
        {/* Start Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href={buttonLink || "/"}
            className={`inline-flex items-center justify-center px-15 py-4 rounded-lg bg-navy text-white text-[20px] font-bold shadow-lg hover:bg-navy/90 transition-all duration-300 z-50 ${isLoading ? "cursor-not-allowed opacity-0" : ""}`}
          >
            {buttonLabel}
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default Curation;
