'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const sports = [
  {
    name: 'Cricket',
    count: '5 ESSENTIALS',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        {/* Cricket bat & wickets */}
        <path d="M12 36 L30 18 L34 22 L16 40 Z" />
        <path d="M30 18 L36 12 L38 14 L32 20" />
        <circle cx="38" cy="38" r="4" className="fill-current opacity-20" />
        <path d="M36 34 L40 42" />
      </svg>
    ),
  },
  {
    name: 'Football',
    count: '2 ESSENTIALS',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        <circle cx="24" cy="24" r="18" />
        <polygon points="24,14 15,20 18,30 30,30 33,20" />
        <line x1="24" y1="14" x2="24" y2="6" />
        <line x1="15" y1="20" x2="8" y2="16" />
        <line x1="18" y1="30" x2="11" y2="38" />
        <line x1="30" y1="30" x2="37" y2="38" />
        <line x1="33" y1="20" x2="40" y2="16" />
      </svg>
    ),
  },
  {
    name: 'Hockey',
    count: '2 ESSENTIALS',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        <path d="M36 8 L18 36 C16 40, 10 40, 8 36 C6 32, 10 28, 14 28" />
        <circle cx="34" cy="38" r="4" className="fill-current opacity-20" />
      </svg>
    ),
  },
  {
    name: 'Basketball',
    count: '1 ESSENTIAL',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        <circle cx="24" cy="24" r="18" />
        <line x1="6" y1="24" x2="42" y2="24" />
        <line x1="24" y1="6" x2="24" y2="42" />
        <path d="M11 11 C 18 18, 18 30, 11 37" />
        <path d="M37 11 C 30 18, 30 30, 37 37" />
      </svg>
    ),
  },
  {
    name: 'Tennis',
    count: '1 ESSENTIAL',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        <ellipse cx="28" cy="20" rx="12" ry="14" />
        <path d="M20 32 L10 42" />
        <line x1="16" y1="20" x2="40" y2="20" />
        <line x1="28" y1="6" x2="28" y2="34" />
        <circle cx="38" cy="38" r="4" className="fill-current opacity-20" />
      </svg>
    ),
  },
  {
    name: 'Volleyball',
    count: '2 ESSENTIALS',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 6 C24 24, 6 24, 6 24" />
        <path d="M24 6 C24 24, 38 34, 38 34" />
        <path d="M6 24 C18 30, 24 42, 24 42" />
      </svg>
    ),
  },
  {
    name: 'Golf',
    count: '2 ESSENTIALS',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        <path d="M30 6 L18 38 L24 40 L32 38" />
        <circle cx="38" cy="40" r="3" className="fill-current opacity-20" />
        <line x1="10" y1="42" x2="42" y2="42" />
      </svg>
    ),
  },
  {
    name: 'Badminton',
    count: '1 ESSENTIAL',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12 stroke-current fill-none stroke-[1.8] stroke-linecap-round stroke-linejoin-round">
        <ellipse cx="30" cy="18" rx="10" ry="12" />
        <path d="M22 28 L10 40" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 15 L8 22 L18 20 Z" />
      </svg>
    ),
  },
];

export default function SportsDisciplines({ onSelectSport, selectedSport = 'All' }) {
  return (
    <section id="sports" className="py-20 border-t border-[#d8dbd2] bg-[#f7f6f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#667169] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1d2924]" />
              <span>DISCIPLINES & FIELDS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[#1d2924]">
              EIGHT SPORTS<span className="text-[#678c16]">.</span>
            </h2>
          </div>
          <p className="text-sm text-[#5b665f] max-w-sm leading-relaxed">
            Curated gear built around honest performance on pitch, hardwood, grass, turf, and clay.
          </p>
        </div>

        {/* 8-Card Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 border-t border-l border-[#d8dbd2] shadow-sm bg-white/40 backdrop-blur-sm">
          {sports.map((sport, index) => {
            const isSelected = selectedSport.toLowerCase() === sport.name.toLowerCase();

            return (
              <motion.button
                key={sport.name}
                onClick={() => onSelectSport(sport.name)}
                whileHover={{ y: -4, backgroundColor: 'rgba(227, 255, 118, 0.25)' }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 sm:p-8 text-left border-r border-b border-[#d8dbd2] transition-colors duration-200 group flex flex-col justify-between min-h-[190px] sm:min-h-[220px] ${
                  isSelected ? 'bg-[#e3ff76]/30 border-b-2 border-b-[#1d2924]' : 'hover:bg-white'
                }`}
              >
                {/* Index tag */}
                <div className="flex justify-between items-start w-full">
                  <span className="font-mono text-[10px] tracking-widest text-[#7c8679]">
                    0{index + 1}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#7c8679] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Animated Sport Icon */}
                <div className="my-auto py-2 text-[#1d2924] group-hover:scale-110 group-hover:text-[#1d2924] transition-transform duration-300 flex items-center justify-center">
                  {sport.icon}
                </div>

                {/* Sport Name & Count */}
                <div className="mt-2">
                  <span className="text-[10px] font-mono text-[#7c8679] block mb-1">
                    {sport.count}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1d2924]">
                    {sport.name}
                  </h3>
                </div>

                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1d2924]" />
                )}
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
