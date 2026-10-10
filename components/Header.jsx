'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header({ kitCount = 0, onOpenKit, onOpenSearch }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Disciplines', href: '#sports' },
    { label: 'Gear Catalog', href: '#catalog' },
    { label: 'Cricket Pitch', href: '#cricket' },
    { label: 'AI Strategist', href: '#ai-strategist' },
    { label: 'Field Notes', href: '#field-notes' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#d8dbd2]/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1d2924] rounded-lg p-1">
            <div className="w-9 h-9 rounded-xl bg-[#e3ff76] p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <path fill="#1d2924" d="M10 38V10h14c9 0 15 5 15 13s-6 13-15 13h-4v-9h4c4 0 6-1 6-4s-2-4-6-4h-5v19z" />
                <path fill="#e3ff76" d="m26 7 5 8-4 3-5-8z" />
                <circle cx="37" cy="11" r="3" fill="#1d2924" />
              </svg>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-[#1d2924]">
              PLAYSTATE<span className="text-[#678c16] text-xl">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold tracking-wider uppercase text-[#1d2924]/80 hover:text-[#1d2924] relative py-1 transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1d2924] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Catalog"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1d2924] hover:bg-[#e7e9de] transition-colors focus:outline-none"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Kit Toggle */}
            <button
              onClick={onOpenKit}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#1d2924] text-[#f7f6f0] hover:bg-[#2b3c34] transition-all duration-200 group shadow-sm"
              aria-label="Open saved equipment kit"
            >
              <ShoppingBag className="w-4 h-4 text-[#e3ff76] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Kit</span>
              <motion.span
                key={kitCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-[#e3ff76] text-[#1d2924] text-xs font-bold flex items-center justify-center font-mono"
              >
                {kitCount}
              </motion.span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#e7e9de] text-[#1d2924]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div
          className="h-[2px] bg-[#1d2924] origin-left transition-transform duration-75"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden fixed top-20 left-0 right-0 bg-[#f7f6f0] border-b border-[#d8dbd2] shadow-xl z-30 p-6 space-y-4"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-base font-bold text-[#1d2924] py-3 border-b border-[#e5e8de]"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-4 h-4 text-[#667169]" />
            </a>
          ))}
        </motion.div>
      )}
    </>
  );
}
