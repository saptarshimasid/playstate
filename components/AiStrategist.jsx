'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Cpu, ArrowRight, CheckCircle2, ShieldCheck, Dumbbell, ShoppingBag } from 'lucide-react';

export default function AiStrategist({ onAddPresetToKit }) {
  const [sport, setSport] = useState('Cricket');
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [surface, setSurface] = useState('Natural Grass Turf');
  const [focusArea, setFocusArea] = useState('Front Foot Timing & Drive Reps');
  
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [strategyResult, setStrategyResult] = useState(null);

  const sports = ['Cricket', 'Football', 'Hockey', 'Basketball', 'Tennis', 'Volleyball', 'Golf', 'Badminton'];
  const skillLevels = ['Beginner', 'Intermediate', 'Competitive'];
  const surfaces = ['Natural Grass Turf', 'Synthetic AstroTurf', 'Asphalt Hard Court', 'Red Clay / Compact Earth'];

  const runStrategist = async () => {
    setIsLoading(true);
    setActiveStep(1);

    // Simulate LangGraph visual progression steps for rich UX
    const stepTimer1 = setTimeout(() => setActiveStep(2), 500);
    const stepTimer2 = setTimeout(() => setActiveStep(3), 1000);

    try {
      // Connect to Express/Next.js API route that interfaces with Python LangGraph
      const res = await fetch('/api/ai/strategist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport,
          skill_level: skillLevel,
          playing_surface: surface,
          focus_area: focusArea,
        }),
      });

      const data = await res.json();
      setTimeout(() => {
        setStrategyResult(data);
        setIsLoading(false);
        setActiveStep(0);
      }, 1500);
    } catch (err) {
      console.error('Error invoking AI strategist:', err);
      setIsLoading(false);
      setActiveStep(0);
    }
  };

  return (
    <section id="ai-strategist" className="py-24 bg-[#edece4] border-t border-[#d8dbd2] relative overflow-hidden">
      
      {/* Background ambient pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#e3ff76]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#667169] mb-2">
              <Sparkles className="w-4 h-4 text-[#1d2924]" />
              <span>LANGCHAIN &amp; LANGGRAPH ENGINE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[#1d2924]">
              AI MATCH STRATEGIST<span className="text-[#678c16]">.</span>
            </h2>
          </div>
          <p className="text-sm text-[#5b665f] max-w-sm leading-relaxed">
            Stateful multi-node reasoning graph in Python that pairs equipment specs to your surface, mechanics, and conditioning plan.
          </p>
        </div>

        {/* Two-Column Interactive AI Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Parameter Controls */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 shadow-sm border border-[#d8dbd2] space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#1d2924] font-bold pb-2 border-b border-[#d8dbd2]">
              <Cpu className="w-4 h-4 text-[#678c16]" />
              <span>SPORT PARAMETERS AUDIT</span>
            </div>

            {/* Sport Selector */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[#7c8679] block mb-2">
                1. Select Sport Discipline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sports.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSport(s)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                      sport === s
                        ? 'bg-[#1d2924] text-[#e3ff76] shadow-sm'
                        : 'bg-white/80 text-[#1d2924] hover:bg-[#e0e3d7] border border-[#d8dbd2]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[#7c8679] block mb-2">
                2. Player Experience Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {skillLevels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSkillLevel(lvl)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                      skillLevel === lvl
                        ? 'bg-[#1d2924] text-[#e3ff76] shadow-sm'
                        : 'bg-white/80 text-[#1d2924] hover:bg-[#e0e3d7] border border-[#d8dbd2]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Playing Surface */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[#7c8679] block mb-2">
                3. Playing Surface Condition
              </label>
              <div className="relative">
                <select
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                  className="w-full appearance-none bg-white/90 border border-[#d8dbd2] hover:border-[#1d2924] rounded-xl px-4 py-2.5 pr-10 text-xs font-bold text-[#1d2924] focus:outline-none focus:ring-2 focus:ring-[#1d2924] cursor-pointer shadow-sm transition-all"
                >
                  {surfaces.map((sf) => (
                    <option key={sf} value={sf}>{sf}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#1d2924]/5 flex items-center justify-center pointer-events-none text-[#1d2924]">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
                    <path d="M4 6.25L8 10.25L12 6.25" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Focus Area */}
            <div>
              <label className="text-xs font-mono font-bold uppercase text-[#7c8679] block mb-2">
                4. Primary Training Focus
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                placeholder="e.g. Explosive Agility, Power Drives, Grip Precision"
                className="w-full bg-white/90 border border-[#d8dbd2] rounded-xl px-4 py-2.5 text-xs font-bold text-[#1d2924] focus:outline-none focus:ring-2 focus:ring-[#1d2924]"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={runStrategist}
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl bg-[#1d2924] text-[#e3ff76] font-bold text-xs uppercase tracking-wider hover:bg-[#2b3c34] hover:shadow-[0_6px_0_#e3ff76] transition-all flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#e3ff76] border-t-transparent rounded-full animate-spin" />
                  <span>EXECUTING LANGGRAPH NODES...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>COMPILE GAMEPLAN &amp; KIT PRESET</span>
                </>
              )}
            </button>

            {/* LangGraph Node Status Bar */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl bg-[#1d2924] text-[#f7f6f0] text-xs font-mono space-y-2 border border-white/10"
              >
                <div className="flex items-center justify-between text-[11px] text-[#e3ff76]">
                  <span>LANGGRAPH STATE PIPELINE:</span>
                  <span>NODE {activeStep}/3</span>
                </div>
                <div className="space-y-1 text-[10px] text-[#a6b4a3]">
                  <div className={activeStep >= 1 ? 'text-[#e3ff76]' : ''}>
                    ✔ Node 1: match_gear_node(catalog_slice)
                  </div>
                  <div className={activeStep >= 2 ? 'text-[#e3ff76]' : ''}>
                    ✔ Node 2: strategy_drills_node(surface, mechanics)
                  </div>
                  <div className={activeStep >= 3 ? 'text-[#e3ff76]' : ''}>
                    ✔ Node 3: compile_kit_pack_node(state_output)
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Right Display: Generated Match Strategy & Drills */}
          <div className="lg:col-span-7">
            {strategyResult ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Coach Verdict Card */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#1d2924] text-[#e3ff76] text-[10px] font-mono uppercase font-bold">
                      COACH STRATEGY VERDICT
                    </span>
                    <span className="text-xs font-mono text-[#7c8679]">
                      {strategyResult.sport} · {strategyResult.skill_level}
                    </span>
                  </div>

                  <p className="font-display text-xl sm:text-2xl font-bold text-[#1d2924] leading-snug">
                    {strategyResult.coach_verdict}
                  </p>

                  <div className="pt-2 border-t border-[#e2e5da] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-[#7c8679] block uppercase">PITCH / COURT CALIBRATION:</span>
                      <p className="text-[#1d2924] font-medium mt-0.5">{strategyResult.strategy?.pitch_prep}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#7c8679] block uppercase">WARM-UP TIMELINE:</span>
                      <p className="text-[#1d2924] font-medium mt-0.5">{strategyResult.strategy?.warmup_routine}</p>
                    </div>
                  </div>
                </div>

                {/* Training Drills Card */}
                <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white shadow-lg space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#1d2924]">
                    <Dumbbell className="w-4 h-4 text-[#678c16]" />
                    <span>PRESCRIBED TRAINING DRILLS</span>
                  </div>

                  <div className="space-y-3">
                    {strategyResult.drills?.map((drill, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/70 border border-[#e2e5da] flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-white transition-colors"
                      >
                        <div className="space-y-1">
                          <span className="font-mono text-[10px] text-[#7c8679]">DRILL 0{idx + 1}</span>
                          <h4 className="font-display text-base font-bold text-[#1d2924]">
                            {drill.title}
                          </h4>
                          <p className="text-xs text-[#5b665f] leading-relaxed">
                            {drill.description}
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-[#e7e9de] text-[#1d2924] font-mono text-xs font-bold whitespace-nowrap self-start">
                          {drill.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kit Pack Presets */}
                <div className="p-6 rounded-2xl bg-[#1d2924] text-[#f7f6f0] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#e3ff76] tracking-wider block">
                      AI COMPILED STARTER PACK
                    </span>
                    <h4 className="font-display text-lg font-bold text-[#f7f6f0]">
                      {strategyResult.starter_preset?.length || 0} Matched Items for {strategyResult.sport}
                    </h4>
                    <p className="text-xs text-[#a6b4a3] mt-1">
                      Ready to load directly into your interactive kit checklist.
                    </p>
                  </div>

                  <button
                    onClick={() => onAddPresetToKit(strategyResult.starter_preset)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#e3ff76] text-[#1d2924] font-bold text-xs uppercase tracking-wider hover:bg-[#efffae] transition-all whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>LOAD PRESET INTO KIT</span>
                  </button>
                </div>

              </motion.div>
            ) : (
              /* Default Blank State */
              <div className="glass-panel rounded-2xl p-12 text-center border border-[#d8dbd2] flex flex-col items-center justify-center min-h-[460px] space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#1d2924] text-[#e3ff76] flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#1d2924]">
                  Ready to Run Match Strategist
                </h3>
                <p className="text-sm text-[#5b665f] max-w-md leading-relaxed">
                  Select your sport discipline and field parameters on the left to trigger the LangGraph reasoning workflow and receive tailored gear recommendations.
                </p>
                <button
                  onClick={runStrategist}
                  className="px-6 py-3 rounded-lg bg-[#1d2924] text-[#f7f6f0] font-bold text-xs uppercase tracking-wider hover:bg-[#2b3c34] transition-all"
                >
                  Run Default Audit
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
