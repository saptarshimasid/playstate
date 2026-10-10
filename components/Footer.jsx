'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, Send, Radio, Globe } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    } catch (err) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121b17] text-[#f7f6f0] border-t border-white/10 relative overflow-hidden">
      
      {/* Background neon ambient pulse */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#e3ff76]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Waveform / Sound Frequency Bars Animation */}
      <div className="border-b border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-[#e3ff76] animate-pulse" />
            <span className="font-mono text-xs text-[#a6b4a3] tracking-widest uppercase">
              FIELD FREQUENCY · WAVEFORM MONITOR
            </span>
          </div>

          {/* Equalizer motion bars */}
          <div className="flex items-end gap-1.5 h-6">
            {[40, 75, 55, 90, 60, 85, 30, 95, 70, 45, 80, 65, 90, 50, 75, 40].map((height, i) => (
              <motion.div
                key={i}
                animate={{
                  height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2 + (i % 5) * 0.2,
                  ease: 'easeInOut',
                }}
                className="w-1 bg-[#e3ff76] rounded-full opacity-80 hover:opacity-100 cursor-pointer"
              />
            ))}
          </div>

          <div className="font-mono text-xs text-[#a6b4a3] tracking-wider">
            LOCAL SYSTEM TIME: <span className="text-[#e3ff76] font-bold">{localTime || 'LIVE'}</span>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e3ff76] p-1.5 flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <path fill="#1d2924" d="M10 38V10h14c9 0 15 5 15 13s-6 13-15 13h-4v-9h4c4 0 6-1 6-4s-2-4-6-4h-5v19z" />
                  <path fill="#e3ff76" d="m26 7 5 8-4 3-5-8z" />
                  <circle cx="37" cy="11" r="3" fill="#1d2924" />
                </svg>
              </div>
              <span className="font-display text-3xl font-bold tracking-tight text-[#f7f6f0]">
                PLAYSTATE<span className="text-[#e3ff76]">.</span>
              </span>
            </div>

            <p className="text-sm text-[#a6b4a3] max-w-sm leading-relaxed">
              An outdoor sports storefront built with high-fidelity animations, Next.js, Express.js, and Python LangChain &amp; LangGraph. Zero clutter. Pure sportsmanship.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/saptarshimasid/playstate"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e3ff76] hover:text-[#1d2924] flex items-center justify-center transition-all duration-200"
                aria-label="GitHub Repository"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e3ff76] hover:text-[#1d2924] flex items-center justify-center transition-all duration-200"
                aria-label="X / Twitter"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#e3ff76] hover:text-[#1d2924] flex items-center justify-center transition-all duration-200"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#e3ff76] font-bold">
              DISCIPLINES
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#a6b4a3]">
              <li><a href="#sports" className="hover:text-[#f7f6f0] transition-colors">CRICKET &amp; WILLOW</a></li>
              <li><a href="#sports" className="hover:text-[#f7f6f0] transition-colors">ASSOCIATION FOOTBALL</a></li>
              <li><a href="#sports" className="hover:text-[#f7f6f0] transition-colors">FIELD HOCKEY</a></li>
              <li><a href="#sports" className="hover:text-[#f7f6f0] transition-colors">COURTSIDE BASKETBALL</a></li>
              <li><a href="#sports" className="hover:text-[#f7f6f0] transition-colors">OPEN AIR VOLLEYBALL</a></li>
              <li><a href="#sports" className="hover:text-[#f7f6f0] transition-colors">BASELINE TENNIS &amp; GOLF</a></li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#e3ff76] font-bold">
              FIELD DISPATCH SUBSCRIPTION
            </h4>
            <p className="text-xs text-[#a6b4a3] leading-relaxed">
              Bi-weekly dispatch covering equipment Knocking-in guides, tournament prep, and new outdoor drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="athlete@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-xs text-[#f7f6f0] placeholder-[#7c8679] focus:outline-none focus:ring-2 focus:ring-[#e3ff76] pr-12"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#e3ff76] text-[#1d2924] flex items-center justify-center hover:bg-[#efffae] transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#e3ff76] font-mono flex items-center gap-1.5"
                >
                  <span>✔ Welcome to the dispatch roster!</span>
                </motion.div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#7c8679]">
          <div className="flex items-center gap-4">
            <span>© 2026 PLAYSTATE INC.</span>
            <span>·</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          {/* Back to top smooth button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-[#e3ff76] hover:text-[#1d2924] text-[#f7f6f0] transition-all group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
