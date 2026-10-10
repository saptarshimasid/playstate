'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, Download, ShoppingBag, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function KitDrawer({
  isOpen,
  onClose,
  kitItems = [],
  onUpdateQty,
  onRemoveItem,
  onClearKit,
  onLoadPreset
}) {
  const totalAmount = kitItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleDownload = async () => {
    if (kitItems.length === 0) return;

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e3ff76', '#1d2924', '#ffffff', '#678c16']
    });

    try {
      const res = await fetch('/api/kit/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: kitItems, kitName: 'Playstate Athlete Pack' }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playstate-kit.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error('Error downloading checklist:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#f7f6f0] border-l border-[#d8dbd2] shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#d8dbd2] flex items-center justify-between bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1d2924]" />
                <h3 className="font-display text-xl font-bold text-[#1d2924]">
                  SAVED KIT CHECKLIST
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#e3ff76] text-[#1d2924] text-xs font-mono font-bold">
                  {kitItems.length}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full hover:bg-[#e7e9de] flex items-center justify-center text-[#1d2924] transition-colors"
                aria-label="Close Kit Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {kitItems.length > 0 ? (
                <>
                  <div className="flex justify-between items-center text-xs font-mono text-[#7c8679] pb-2 border-b border-[#e5e8de]">
                    <span>SELECTED ESSENTIALS</span>
                    <button
                      onClick={onClearKit}
                      className="hover:text-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>

                  {kitItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-xl bg-white border border-[#d8dbd2] shadow-sm flex items-start justify-between gap-4"
                    >
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#7c8679]">
                          {item.sport} · {item.selected_option || 'Standard'}
                        </span>
                        <h4 className="font-display text-base font-bold text-[#1d2924]">
                          {item.name}
                        </h4>
                        <div className="text-xs font-mono font-bold text-[#678c16]">
                          ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                          <span className="text-[10px] font-normal text-[#7c8679] ml-1">
                            (₹{item.price.toLocaleString()} ea)
                          </span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#7c8679] hover:text-red-500 transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2 bg-[#f4f3ec] border border-[#d8dbd2] rounded-lg px-2 py-1">
                          <button
                            onClick={() => onUpdateQty(item.id, Math.max(1, (item.quantity || 1) - 1))}
                            className="text-[#1d2924] hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-[#1d2924] px-1">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, (item.quantity || 1) + 1)}
                            className="text-[#1d2924] hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#e7e9de] flex items-center justify-center mx-auto text-[#7c8679]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-[#1d2924]">
                    Your Kit is Currently Empty
                  </h4>
                  <p className="text-xs text-[#667169] max-w-xs mx-auto leading-relaxed">
                    Explore the catalog or load one of our sport starter presets to build your game-day equipment list.
                  </p>

                  {/* Preset quick actions */}
                  <div className="pt-4 space-y-2">
                    <button
                      onClick={() => onLoadPreset('cricket')}
                      className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#d8dbd2] hover:bg-[#e3ff76] text-[#1d2924] text-xs font-bold font-mono uppercase transition-all"
                    >
                      ⚡ Load Cricket Pitch Essentials
                    </button>
                    <button
                      onClick={() => onLoadPreset('football')}
                      className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#d8dbd2] hover:bg-[#e3ff76] text-[#1d2924] text-xs font-bold font-mono uppercase transition-all"
                    >
                      ⚽ Load Sunday Football &amp; Cones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Total & Download */}
            <div className="p-6 border-t border-[#d8dbd2] bg-white/70 backdrop-blur-md space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-[#7c8679] uppercase">TOTAL ESTIMATE</span>
                <span className="font-display text-2xl font-bold text-[#1d2924]">
                  ₹{totalAmount.toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleDownload}
                disabled={kitItems.length === 0}
                className="w-full py-4 rounded-xl bg-[#1d2924] text-[#e3ff76] font-bold text-xs uppercase tracking-wider hover:bg-[#2e4038] hover:shadow-[0_4px_16px_rgba(29,41,36,0.3)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>EXPORT KIT CHECKLIST (.TXT)</span>
              </button>

              <p className="text-[10px] text-center text-[#7c8679] font-mono">
                Stored privately in your browser session · No checkout tracking
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
