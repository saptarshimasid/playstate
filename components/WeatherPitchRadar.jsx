'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudSun, Wind, Droplets, Gauge, ShieldAlert, Sparkles, Compass } from 'lucide-react';

const conditions = [
  {
    id: 'dry-sun',
    name: 'Hard Sun / Dry Pitch',
    temp: '32°C',
    humidity: '34%',
    wind: '12 km/h',
    surface: 'Hardened Compact Grass',
    swingRating: 28,
    bounceRating: 88,
    tractionRating: 72,
    gearAdvice: 'Maximum ball bounce. High-density pads recommended. Ensure bat toe guard is intact against hard impact.',
    recommendedGear: 'Boundary Cricket Bat & Red Seam Ball'
  },
  {
    id: 'humid-overcast',
    name: 'Humid Overcast / Dew',
    temp: '23°C',
    humidity: '82%',
    wind: '18 km/h',
    surface: 'Moist Natural Turf',
    swingRating: 92,
    bounceRating: 54,
    tractionRating: 65,
    gearAdvice: 'Optimal atmospheric density for late swing and seam movement. Dry ball regularly with microfiber towel.',
    recommendedGear: 'Red Seam Ball & First Innings Gloves'
  },
  {
    id: 'windy-park',
    name: 'Gale Wind / Park Sessions',
    temp: '18°C',
    humidity: '55%',
    wind: '34 km/h',
    surface: 'Open Public Field',
    swingRating: 75,
    bounceRating: 68,
    tractionRating: 80,
    gearAdvice: 'Erratic ball drift. Heavy shuttlecocks or weighted balls essential. Position boundary cones securely.',
    recommendedGear: 'Sunday League Football & Training Cones'
  },
  {
    id: 'asphalt-court',
    name: 'Court Heat / Asphalt',
    temp: '36°C',
    humidity: '28%',
    wind: '8 km/h',
    surface: 'Hard Asphalt Court',
    swingRating: 15,
    bounceRating: 95,
    tractionRating: 90,
    gearAdvice: 'High abrasive friction on outdoor surfaces. Check basketball pebble grip and tennis felt durability.',
    recommendedGear: 'Courtside Basketball & Baseline Tennis Set'
  }
];

export default function WeatherPitchRadar() {
  const [activeConditionId, setActiveConditionId] = useState('humid-overcast');

  const current = conditions.find((c) => c.id === activeConditionId) || conditions[0];

  return (
    <section id="pitch-radar" className="py-24 bg-[#1d2924] text-[#f7f6f0] border-t border-white/10 relative overflow-hidden">
      
      {/* Background glowing radar mesh */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#e3ff76]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#e3ff76] mb-2">
              <Compass className="w-4 h-4 text-[#e3ff76] animate-spin-slow" />
              <span>LIVE FIELD TELEMETRY</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-[0.95]">
              PITCH RADAR &amp; <br />
              <span className="text-[#e3ff76]">ATMOSPHERIC</span> DYNAMICS.
            </h2>
          </div>
          <p className="text-sm text-[#a6b4a3] max-w-sm leading-relaxed">
            Physics matters. Simulate real-time weather, pitch moisture, and aerodynamic drag to tune equipment for outdoor match conditions.
          </p>
        </div>

        {/* Condition Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {conditions.map((item) => {
            const active = item.id === activeConditionId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveConditionId(item.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden ${
                  active
                    ? 'bg-[#e3ff76] text-[#1d2924] border-[#e3ff76] shadow-[0_4px_24px_rgba(227,255,118,0.25)] scale-[1.02]'
                    : 'bg-white/5 text-[#f7f6f0] border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono uppercase mb-2">
                  <span className={active ? 'text-[#1d2924]' : 'text-[#a6b4a3]'}>
                    {item.temp}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${active ? 'bg-[#1d2924]' : 'bg-[#e3ff76]'}`} />
                </div>
                <div className="font-display text-lg sm:text-xl font-bold tracking-tight">
                  {item.name}
                </div>
                <div className="text-[11px] font-mono mt-1 opacity-80">
                  {item.surface}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Telemetry Display & Dials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/30 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          
          {/* Left: Atmospheric Readouts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono tracking-widest text-[#a6b4a3] uppercase">
                ATMOSPHERIC BENCHMARK
              </span>
              <span className="text-xs font-mono font-bold text-[#e3ff76]">
                ACTIVE SENSOR RUNNING
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <CloudSun className="w-5 h-5 mx-auto mb-1 text-[#e3ff76]" />
                <span className="text-[10px] font-mono text-[#a6b4a3] block">TEMP</span>
                <span className="font-display text-xl font-bold text-white">{current.temp}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <Droplets className="w-5 h-5 mx-auto mb-1 text-[#e3ff76]" />
                <span className="text-[10px] font-mono text-[#a6b4a3] block">HUMIDITY</span>
                <span className="font-display text-xl font-bold text-white">{current.humidity}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                <Wind className="w-5 h-5 mx-auto mb-1 text-[#e3ff76]" />
                <span className="text-[10px] font-mono text-[#a6b4a3] block">WIND VELOCITY</span>
                <span className="font-display text-xl font-bold text-white">{current.wind}</span>
              </div>
            </div>

            {/* Tactical Gear Advice */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#e3ff76]">
                <ShieldAlert className="w-4 h-4" />
                <span>PITCH CALIBRATION VERDICT</span>
              </div>
              <p className="text-xs sm:text-sm text-[#cdd6c9] leading-relaxed">
                {current.gearAdvice}
              </p>
              <div className="pt-2 text-[11px] font-mono text-[#a6b4a3]">
                KEY MATCH GEAR: <span className="text-[#f7f6f0] font-bold">{current.recommendedGear}</span>
              </div>
            </div>

          </div>

          {/* Right: Physics Impact Bars & Drag Vector */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#a6b4a3] font-bold">
              PHYSICAL PERFORMANCE DYNAMICS
            </h4>

            {/* Metric 1: Ball Aerodynamic Swing / Knuckle Index */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f7f6f0]">BALL AERODYNAMIC SWING INDEX</span>
                <span className="text-[#e3ff76] font-bold">{current.swingRating}%</span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                <motion.div
                  key={`swing-${current.id}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${current.swingRating}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-[#e3ff76] rounded-full shadow-[0_0_10px_#e3ff76]"
                />
              </div>
              <span className="text-[10px] font-mono text-[#a6b4a3]">
                High air moisture increases differential boundary layer pressure on leather seams.
              </span>
            </div>

            {/* Metric 2: Surface Rebound Elasticity */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f7f6f0]">SURFACE REBOUND &amp; BOUNCE HEIGHT</span>
                <span className="text-[#e3ff76] font-bold">{current.bounceRating}%</span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                <motion.div
                  key={`bounce-${current.id}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${current.bounceRating}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-400 to-[#e3ff76] rounded-full shadow-[0_0_10px_#e3ff76]"
                />
              </div>
              <span className="text-[10px] font-mono text-[#a6b4a3]">
                Hard compact clay &amp; asphalt accelerate coefficient of restitution.
              </span>
            </div>

            {/* Metric 3: Cleat & Sole Traction Friction */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#f7f6f0]">CLEAT &amp; OUTSOLE TRACTION COEFFICIENT</span>
                <span className="text-[#e3ff76] font-bold">{current.tractionRating}%</span>
              </div>
              <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                <motion.div
                  key={`traction-${current.id}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${current.tractionRating}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-[#e3ff76] rounded-full shadow-[0_0_10px_#e3ff76]"
                />
              </div>
              <span className="text-[10px] font-mono text-[#a6b4a3]">
                Multi-stud configurations reduce lateral slip on damp loam without joint shear.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
