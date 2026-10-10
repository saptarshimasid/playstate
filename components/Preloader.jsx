'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        // Accelerating curve
        const increment = Math.max(1, Math.floor((100 - prev) / 8) + Math.floor(Math.random() * 6));
        return Math.min(100, prev + increment);
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#1d2924] text-[#f7f6f0] p-6 sm:p-12 select-none"
        >
          {/* Top meta */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#a6b4a3] uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e3ff76] animate-pulse" />
              <span>PLAYSTATE · FIELD DISPATCH</span>
            </div>
            <span>EST. OUTDOOR CULTURE</span>
          </div>

          {/* Center Brand Animation */}
          <div className="my-auto flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-6"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#e3ff76] p-3 shadow-2xl flex items-center justify-center relative overflow-hidden group">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <path fill="#1d2924" d="M10 38V10h14c9 0 15 5 15 13s-6 13-15 13h-4v-9h4c4 0 6-1 6-4s-2-4-6-4h-5v19z" />
                  <path fill="#e3ff76" d="m26 7 5 8-4 3-5-8z" />
                  <circle cx="37" cy="11" r="3" fill="#1d2924" />
                </svg>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase font-bold text-[#f7f6f0]"
            >
              PLAYSTATE<span className="text-[#e3ff76]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 text-xs sm:text-sm tracking-widest font-mono text-[#a6b4a3] uppercase"
            >
              Outfitting Eight Outdoor Disciplines
            </motion.p>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full max-w-xl mx-auto space-y-3">
            <div className="flex justify-between items-baseline text-xs sm:text-sm font-mono text-[#f7f6f0]">
              <span className="tracking-widest uppercase text-[#a6b4a3]">INITIALIZING EXPERIENCE</span>
              <span className="font-bold text-xl sm:text-2xl text-[#e3ff76]">{progress}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-[#2a3a34] rounded-full overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-[#e3ff76] rounded-full shadow-[0_0_12px_#e3ff76]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
