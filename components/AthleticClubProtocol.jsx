'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle, ArrowRight, ShieldCheck, Flame, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';

const protocols = [
  {
    day: 'TUESDAY',
    time: '17:30 - 19:30',
    title: 'Willow Nets & Target Bowling',
    sport: 'Cricket',
    intensity: 'High Intensity',
    athletes: '14 Active',
    focus: 'Front-foot balance against seam swing, short-run reaction fielding, and slip cordon reflexes.',
    gearIds: ['cricket-bat', 'cricket-ball', 'cricket-pads', 'cricket-gloves']
  },
  {
    day: 'THURSDAY',
    time: '18:00 - 20:00',
    title: 'Sunday League Agility & Small-Sided Drills',
    sport: 'Football',
    intensity: 'Cardio Sprint',
    athletes: '18 Active',
    focus: 'Two-touch ground distribution, low-cone slalom turns, and transition counter-attack runs.',
    gearIds: ['football', 'training-cones']
  },
  {
    day: 'SATURDAY',
    time: '07:30 - 09:30',
    title: 'Baseline Tennis & Court Conditioning',
    sport: 'Tennis',
    intensity: 'Tactical Precision',
    athletes: '8 Active',
    focus: 'Crosscourt depth consistency, approach split-step timing, and first-serve placement accuracy.',
    gearIds: ['tennis-racket']
  },
  {
    day: 'SUNDAY',
    time: '08:00 - 12:00',
    title: 'Match-Day Full Squad Fixture',
    sport: 'Multi-Sport',
    intensity: 'Full Competitive',
    athletes: '24 Active',
    focus: 'Complete weekend fixture. Team strategy, pitch setup with boundary wickets, and endurance.',
    gearIds: ['cricket-stumps', 'cricket-bat', 'cricket-ball', 'training-cones']
  }
];

export default function AthleticClubProtocol({ onAddPresetToKit }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeSession = protocols[selectedIdx];

  const handleSyncGear = () => {
    const sessionItems = products.filter((p) =>
      activeSession.gearIds.includes(p.id)
    );
    if (sessionItems.length > 0 && onAddPresetToKit) {
      onAddPresetToKit(
        sessionItems.map((item) => ({
          ...item,
          selected_option: item.options ? item.options[0] : 'Standard',
          quantity: 1,
        }))
      );
    }
  };

  return (
    <section id="club-protocol" className="py-24 bg-[#f7f6f0] border-t border-[#d8dbd2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#667169] mb-2">
              <Calendar className="w-4 h-4 text-[#1d2924]" />
              <span>ROSTER &amp; TRAINING CALENDAR</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[#1d2924]">
              MATCH PROTOCOL<span className="text-[#678c16]">.</span>
            </h2>
          </div>
          <p className="text-sm text-[#5b665f] max-w-sm leading-relaxed">
            Organized weekly training sessions and field drills. Synchronize your gear checklist directly with our weekend league calendar.
          </p>
        </div>

        {/* 4-Day Timeline Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {protocols.map((proto, idx) => {
            const active = idx === selectedIdx;
            return (
              <button
                key={proto.day}
                onClick={() => setSelectedIdx(idx)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 relative ${
                  active
                    ? 'bg-[#1d2924] text-[#f7f6f0] border-[#1d2924] shadow-xl scale-[1.02]'
                    : 'bg-white/80 text-[#1d2924] border-[#d8dbd2] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className={`font-bold ${active ? 'text-[#e3ff76]' : 'text-[#7c8679]'}`}>
                    {proto.day}
                  </span>
                  <span className="text-[10px] opacity-70">{proto.time}</span>
                </div>
                <div className="font-display text-lg font-bold tracking-tight line-clamp-1">
                  {proto.title}
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[#e3ff76]' : 'bg-[#678c16]'}`} />
                  <span className={active ? 'text-[#cdd6c9]' : 'text-[#7c8679]'}>{proto.sport}</span>
                </div>

                {active && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e3ff76]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Protocol Focus Workspace */}
        <motion.div
          key={activeSession.day}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#d8dbd2] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left: Session Objectives */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#1d2924] text-[#e3ff76] text-xs font-mono font-bold uppercase">
                {activeSession.sport} FOCUS
              </span>
              <span className="px-3 py-1 rounded-full bg-[#e7e9de] text-[#1d2924] text-xs font-mono font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                {activeSession.intensity}
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-[#d8dbd2] text-[#5b665f] text-xs font-mono flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {activeSession.athletes}
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-4xl font-black text-[#1d2924] leading-tight">
              {activeSession.title}
            </h3>

            <p className="text-sm sm:text-base text-[#5b665f] leading-relaxed">
              {activeSession.focus}
            </p>

            <div className="pt-2 border-t border-[#e2e5da] flex items-center gap-2 text-xs font-mono text-[#7c8679]">
              <ShieldCheck className="w-4 h-4 text-[#678c16]" />
              <span>Full equipment inspection conducted 15 minutes before drill start.</span>
            </div>
          </div>

          {/* Right: Required Gear & Sync Button */}
          <div className="lg:col-span-5 bg-white/90 rounded-2xl p-6 border border-[#d8dbd2] shadow-sm space-y-5">
            <div className="flex justify-between items-center text-xs font-mono text-[#7c8679] pb-2 border-b border-[#e5e8de]">
              <span className="font-bold text-[#1d2924] uppercase">REQUIRED PROTOCOL GEAR</span>
              <span>{activeSession.gearIds.length} ESSENTIALS</span>
            </div>

            {/* Gear item list */}
            <div className="space-y-2">
              {activeSession.gearIds.map((id) => {
                const prod = products.find((p) => p.id === id);
                if (!prod) return null;

                return (
                  <div
                    key={id}
                    className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#f4f3ec] border border-[#ebece6]"
                  >
                    <div>
                      <div className="font-bold text-[#1d2924] font-display text-sm">{prod.name}</div>
                      <div className="text-[10px] text-[#7c8679] font-mono">{prod.category}</div>
                    </div>
                    <span className="font-mono font-bold text-[#678c16]">
                      ₹{prod.price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Action button */}
            <button
              onClick={handleSyncGear}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1d2924] text-[#e3ff76] font-bold text-xs uppercase tracking-wider hover:bg-[#2e4038] hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SYNC SESSION GEAR TO KIT DRAWER</span>
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
