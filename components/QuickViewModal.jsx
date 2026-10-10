'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Plus, Minus, ShieldCheck, Tag } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToKit }) {
  const [selectedOption, setSelectedOption] = useState(
    product?.options ? product.options[0] : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!product) return null;

  // Calculate sprite styles
  const isSupport = product.sheet === 'support';
  const idx = product.image;
  let posX = 0;
  let posY = 0;

  if (isSupport) {
    posX = (idx % 2) * 100;
    posY = Math.floor(idx / 2) * 100;
  } else {
    posX = (idx % 4) * (100 / 3);
    posY = Math.floor(idx / 4) * (100 / 2);
  }

  const spriteStyle = {
    '--pos-x': `${posX}%`,
    '--pos-y': `${posY}%`,
  };

  const handleAdd = () => {
    onAddToKit({
      ...product,
      selected_option: selectedOption,
      quantity,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl bg-[#f7f6f0] border border-[#d8dbd2] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-[#e7e9de] flex items-center justify-center text-[#1d2924] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Product Sprite Preview */}
            <div className="w-full md:w-1/2 bg-[#f4f3ec] p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-[#d8dbd2]">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-inner relative border border-[#e5e8de]">
                <div
                  className={`product-sprite ${isSupport ? 'support' : ''}`}
                  style={spriteStyle}
                />
              </div>

              {product.tag && (
                <div className="absolute top-4 left-4 bg-[#1d2924] text-[#e3ff76] px-3 py-1 rounded text-[10px] font-mono font-bold tracking-wider">
                  {product.tag}
                </div>
              )}
            </div>

            {/* Right: Product Specifications */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#7c8679]">
                  {product.sport} · {product.category}
                </span>

                <h3 className="font-display text-2xl font-bold text-[#1d2924] leading-tight">
                  {product.name}
                </h3>

                <div className="font-display text-xl font-bold text-[#678c16]">
                  ₹{product.price.toLocaleString()}
                </div>

                <p className="text-xs text-[#5b665f] leading-relaxed">
                  {product.description}
                </p>

                {/* Option Selector */}
                {product.options && product.options.length > 0 && (
                  <div className="pt-2">
                    <label className="text-[10px] font-mono uppercase font-bold text-[#7c8679] block mb-2">
                      Select Specification:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedOption(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedOption === opt
                              ? 'bg-[#1d2924] text-[#e3ff76]'
                              : 'bg-white border border-[#d8dbd2] text-[#1d2924] hover:bg-[#e7e9de]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Bullet Points */}
                {product.details && product.details.length > 0 && (
                  <div className="pt-2 border-t border-[#e5e8de]">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#7c8679] block mb-1.5">
                      Technical Notes:
                    </span>
                    <ul className="space-y-1 text-[11px] text-[#667169]">
                      {product.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#678c16] font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Quantity and Add to Kit button */}
              <div className="pt-4 border-t border-[#e5e8de] flex items-center gap-3">
                <div className="flex items-center gap-3 bg-white border border-[#d8dbd2] rounded-xl px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#1d2924] hover:text-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-sm font-bold text-[#1d2924] px-1">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#1d2924] hover:text-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={isSuccess}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSuccess
                      ? 'bg-[#e3ff76] text-[#1d2924]'
                      : 'bg-[#1d2924] text-[#f7f6f0] hover:bg-[#2b3c34] hover:shadow-lg'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>ADDED TO KIT</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>ADD TO SAVED KIT</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
