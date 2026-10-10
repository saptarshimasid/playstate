'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Sparkles, Compass } from 'lucide-react';

export default function Hero({ onExploreClick, onAiClick }) {
  const containerRef = useRef(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const rotateBadge = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section ref={containerRef} className="relative overflow-hidden pt-8 pb-20 sm:pt-14 sm:pb-28">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-[#e3ff76]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Copy */}
          <motion.div style={{ y: yText }} className="lg:col-span-6 space-y-8">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#e7e9de] border border-[#d8dbd2] text-xs font-mono uppercase tracking-wider text-[#1d2924]">
              <span className="w-2 h-2 rounded-full bg-[#1d2924] ring-4 ring-[#e3ff76] animate-ping" />
              <span>SEASON 2026 · OUTDOOR FIELD ACTIVE</span>
            </div>

            {/* Giant Athletic Typography */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-[#1d2924] leading-[0.92]">
                PLAYED <br />
                <span className="relative inline-block italic transform -rotate-2 text-[#1d2924]">
                  OUTSIDE
                  {/* Athletic accent swish */}
                  <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#1d2924]" viewBox="0 0 200 20" fill="none">
                    <path d="M5 15 Q 100 2, 195 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-[#678c16]">.</span>
              </h1>
            </div>

            {/* Narrative description */}
            <p className="text-base sm:text-lg text-[#5b665f] leading-relaxed max-w-lg">
              Precision equipment, authentic materials, and field-tested concepts across eight outdoor sports. No shortcuts, no artificial sheen — built for players who choose the open air.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                onClick={onExploreClick}
                className="inline-flex items-center justify-between gap-6 px-7 py-4 rounded-lg bg-[#1d2924] text-[#f7f6f0] font-bold text-sm tracking-wider uppercase hover:bg-[#2e4038] hover:shadow-[0_8px_0_#e3ff76] hover:-translate-y-1 transition-all duration-200 group"
              >
                <span>EXPLORE GEAR</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#ai-strategist"
                onClick={onAiClick}
                className="inline-flex items-center justify-between gap-4 px-6 py-4 rounded-lg bg-[#e3ff76] text-[#1d2924] font-bold text-sm tracking-wider uppercase hover:bg-[#efffae] hover:-translate-y-1 transition-all duration-200 group border border-[#1d2924]"
              >
                <Sparkles className="w-4 h-4 text-[#1d2924]" />
                <span>AI MATCH STRATEGIST</span>
              </a>
            </div>

            {/* Bottom Coordinates & Field Stamp */}
            <div className="pt-6 border-t border-[#d8dbd2] flex items-center justify-between text-xs font-mono text-[#717d72]">
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#1d2924]" />
                <span>28°38&apos;N 77°13&apos;E · HARD SUN AUDIT</span>
              </div>
              <span className="font-bold text-[#1d2924]">16 CURATED ESSENTIALS</span>
            </div>

          </motion.div>

          {/* Right Hero Visual & Parallax Art Frame */}
          <motion.div style={{ y: yImage }} className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image Frame with architectural cut */}
              <motion.div
                style={{ scale: scaleImage }}
                className="relative h-[480px] sm:h-[580px] w-full rounded-tr-[70px] rounded-bl-[16px] rounded-tl-[16px] rounded-br-[16px] overflow-hidden bg-[#e4d8c4] shadow-2xl border border-[#d8dbd2] group"
              >
                <img
                  src="/assets/hero.webp"
                  alt="Playstate handcrafted outdoor sports gear arrangement"
                  className="w-full h-full object-cover object-[center_65%] group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Overhead glass label */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-[#1d2924] bg-white/70 backdrop-blur-md px-3.5 py-2 rounded">
                  <span>OUTDOOR FIELD STUDY #01</span>
                  <span className="font-bold">NATURAL WILLOW & LEATHER</span>
                </div>

                {/* Floating Note Badge */}
                <div className="absolute bottom-6 right-6 glass-panel border border-[#1d2924]/20 p-4 rounded-lg shadow-lg max-w-[200px] text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1d2924]">
                    <span className="w-2 h-2 rounded-full bg-[#e3ff76] border border-[#1d2924]" />
                    <span>FIELD READY</span>
                  </div>
                  <p className="text-[11px] text-[#5b665f] leading-snug">
                    Zero synthetic compromise. Built for physical turf and dirt.
                  </p>
                </div>
              </motion.div>

              {/* Rotating Circular Stamp */}
              <motion.div
                style={{ rotate: rotateBadge }}
                className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#e3ff76] shadow-xl border-4 border-[#f7f6f0] flex items-center justify-center p-2 z-20"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full animate-stamp">
                  <path
                    id="stampCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8.5px] font-mono font-bold tracking-[2px] uppercase fill-[#1d2924]">
                    <textPath href="#stampCirclePath" startOffset="0%">
                      · PLAYSTATE · OUTSIDE FIRST ·
                    </textPath>
                  </text>
                </svg>
                {/* Center Star / Symbol */}
                <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-[#1d2924]">
                  ★
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
