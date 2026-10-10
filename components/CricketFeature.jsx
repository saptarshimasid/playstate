'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus, Sparkles, MapPin } from 'lucide-react';

const hotspots = [
  {
    id: 'bat',
    label: 'Boundary Willow Bat',
    price: '₹3,490',
    top: '35%',
    left: '42%',
    desc: 'Grade-1 Kashmir willow blade with knocked-in edges and cane handle.'
  },
  {
    id: 'ball',
    label: 'Red Seam Ball',
    price: '₹490',
    top: '72%',
    left: '60%',
    desc: 'Hand-stitched 4-piece leather with elevated seam for true outdoor swing.'
  },
  {
    id: 'pads',
    label: 'Crease Batting Pads',
    price: '₹2,190',
    top: '55%',
    left: '25%',
    desc: 'High-density foam cane inserts with breathable knee roll support.'
  },
  {
    id: 'stumps',
    label: 'Backyard Wicket Set',
    price: '₹1,290',
    top: '22%',
    left: '75%',
    desc: 'Solid hardwood stumps and matched bails for outdoor turf stakes.'
  }
];

export default function CricketFeature({ onAddCricketPack }) {
  const [activePin, setActivePin] = useState(null);
  const [checkedItems, setCheckedItems] = useState([true, true, false, false]);

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const checklist = [
    { title: 'Check bat balance & pick-up weight', sub: 'Adult length recommended for players over 5 ft 8 in' },
    { title: 'Inspect seam hardness & ball condition', sub: 'Match ball density to practice surface and protective kit' },
    { title: 'Fasten three-strap pad security', sub: 'Ensure top bolster does not impede knee flexion during stride' },
    { title: 'Stake stumps on 22-yard outdoor pitch', sub: 'Check turf firmness before bowling full pace' },
  ];

  return (
    <section id="cricket" className="py-24 bg-[#1d2924] text-[#f7f6f0] overflow-hidden relative">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#e3ff76]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Editorial Photo with Hotspots */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121b17] aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/assets/cricket.webp"
                alt="Playstate cricket pitch equipment still life"
                className="w-full h-full object-cover object-[center_60%] transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d2924]/80 via-transparent to-transparent pointer-events-none" />

              {/* Photo stamp metadata */}
              <div className="absolute top-4 left-4 font-display text-5xl sm:text-7xl font-black text-white/10 select-none">
                04
              </div>

              <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest uppercase text-[#a6b4a3] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded">
                CRICKET STUDY · GRASS TURF
              </div>

              {/* Interactive Hotspot Pins */}
              {hotspots.map((pin) => (
                <div
                  key={pin.id}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
                    className="relative group p-2 focus:outline-none"
                    aria-label={`Inspect ${pin.label}`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#e3ff76] text-[#1d2924] flex items-center justify-center font-bold text-xs shadow-lg group-hover:scale-125 transition-transform animate-bounce">
                      +
                    </span>
                    <span className="absolute inset-0 rounded-full bg-[#e3ff76]/40 animate-ping" />
                  </button>

                  {/* Hotspot Popover */}
                  {activePin === pin.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-6 -top-12 z-30 w-56 p-3 rounded-xl bg-[#f7f6f0] text-[#1d2924] shadow-2xl border border-[#d8dbd2] text-xs space-y-1"
                    >
                      <div className="flex justify-between items-baseline font-bold font-display text-sm">
                        <span>{pin.label}</span>
                        <span className="text-[#678c16] font-mono">{pin.price}</span>
                      </div>
                      <p className="text-[11px] text-[#5b665f] leading-snug">
                        {pin.desc}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Right: Editorial Narrative & Match Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#cdd6c9]">
              <span className="w-2 h-2 rounded-full bg-[#e3ff76]" />
              <span>THE CRICKET COLLECTION</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
              BUILT FOR THE <br />
              <span className="text-[#e3ff76]">TWENTY-TWO</span> YARDS.
            </h2>

            <p className="text-sm sm:text-base text-[#abb9ad] leading-relaxed">
              From the crisp pickup of knocked-in willow to the hard raised seam of four-piece leather, our cricket collection is designed for players who appreciate authentic feel over commercial branding.
            </p>

            {/* Match Readiness Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#a6b4a3] block">
                MATCH READINESS CHECKLIST:
              </span>
              <div className="space-y-2">
                {checklist.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border transition-colors ${
                        checkedItems[idx]
                          ? 'bg-[#e3ff76] border-[#e3ff76] text-[#1d2924]'
                          : 'border-white/30 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#f7f6f0]">{item.title}</div>
                      <div className="text-[11px] text-[#abb9ad]">{item.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={onAddCricketPack}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#e3ff76] text-[#1d2924] font-bold text-xs uppercase tracking-wider hover:bg-[#efffae] transition-all duration-200 hover:shadow-[0_4px_20px_rgba(227,255,118,0.4)]"
              >
                <Plus className="w-4 h-4" />
                <span>LOAD CRICKET STARTER KIT (4 ITEMS)</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
