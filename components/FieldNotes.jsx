'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Clock, ShieldCheck } from 'lucide-react';

const notes = [
  {
    id: 'note-1',
    category: 'CRICKET WORKSHOP',
    readTime: '4 MIN READ',
    title: 'Knocking-in and Willow Preparation',
    summary: 'A new willow bat needs gradual compression before facing hard leather. Skipping preparation fractures edge fibers.',
    fullText: 'Use raw linseed oil sparingly on face and edges (avoiding splice and handle). Use a wooden bat mallet to deliver glancing, progressive taps along the toe and edges over 4–6 hours. Never play competitive hard-ball match innings before completing 2 net sessions with old, soft balls.'
  },
  {
    id: 'note-2',
    category: 'BALL AERODYNAMICS',
    readTime: '3 MIN READ',
    title: 'The Science of the Raised Seam',
    summary: 'How seam angle, ambient humidity, and shine maintenance govern conventional swing in outdoor conditions.',
    fullText: 'The 4-piece cricket ball seam acts as a boundary-layer trip wire. In high humidity, moisture increases air density slightly, assisting laminar-to-turbulent transition. Polishing one side with sweat while leaving the rough side natural creates the lateral pressure differential essential for late movement.'
  },
  {
    id: 'note-3',
    category: 'FOOTWORK & GRIP',
    readTime: '5 MIN READ',
    title: 'Outdoor Court Friction & Cleat Selection',
    summary: 'Surface transition guidelines between asphalt, natural turf, and synthetic sand-dressed hockey pitches.',
    fullText: 'Hard asphalt court play requires dense rubber outsoles with herringbone herringbone tread to prevent excessive slip. Natural grass pitches demand multi-stud studs to pierce loam without tearing turf roots. On sand-dressed synthetic turf, use dimpled multi-turf shoes to protect knee joint ligaments.'
  },
  {
    id: 'note-4',
    category: 'KIT LONGEVITY',
    readTime: '3 MIN READ',
    title: 'Post-Match Equipment Care Routine',
    summary: 'Proper ventilation, leather conditioning, and moisture extraction after rain or heavy sweat reps.',
    fullText: 'Never leave batting gloves or leather pads sealed inside a zipped synthetic kit bag overnight. Remove gear immediately, wipe exterior grime with a dry lint-free microfiber towel, and air dry in ambient shaded breeze away from direct intense sunlight to prevent leather cracking.'
  }
];

export default function FieldNotes() {
  const [expandedId, setExpandedId] = useState('note-1');

  return (
    <section id="field-notes" className="py-24 bg-[#f7f6f0] border-t border-[#d8dbd2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#667169] mb-2">
              <BookOpen className="w-4 h-4 text-[#1d2924]" />
              <span>PRACTICE &amp; CARE MANUALS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[#1d2924]">
              FIELD NOTES<span className="text-[#678c16]">.</span>
            </h2>
          </div>
          <p className="text-sm text-[#5b665f] max-w-sm leading-relaxed">
            Essential care guidelines, physics breakdowns, and practical knowledge from weekend league athletes.
          </p>
        </div>

        {/* Accordion / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => {
            const isExpanded = expandedId === note.id;

            return (
              <motion.div
                key={note.id}
                layout
                onClick={() => setExpandedId(isExpanded ? null : note.id)}
                className={`glass-panel rounded-2xl p-6 sm:p-8 border border-[#d8dbd2] cursor-pointer transition-all duration-300 ${
                  isExpanded ? 'bg-white shadow-xl ring-1 ring-[#1d2924]' : 'hover:bg-white/90 shadow-sm'
                }`}
              >
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono text-[#7c8679] mb-3">
                  <span className="font-bold text-[#1d2924]">{note.category}</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{note.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1d2924] mb-3 leading-snug">
                  {note.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#5b665f] leading-relaxed mb-4">
                  {note.summary}
                </p>

                {/* Expanded full body */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-[#e2e5da] text-xs text-[#1d2924] leading-relaxed font-sans bg-[#fbfbf8] p-4 rounded-xl"
                  >
                    {note.fullText}
                  </motion.div>
                )}

                {/* Bottom Toggle Prompt */}
                <div className="flex items-center gap-1 text-xs font-mono font-bold uppercase text-[#1d2924] pt-2">
                  <span>{isExpanded ? 'Collapse Note' : 'Read Full Guide'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
