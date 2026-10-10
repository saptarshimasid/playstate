'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Eye, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

export default function CatalogShowcase({
  products = [],
  selectedSport = 'All',
  onSelectSport,
  onQuickView,
  onAddToKit,
  searchQuery = '',
  setSearchQuery,
}) {
  const [sortOption, setSortOption] = useState('featured');
  const [justAddedId, setJustAddedId] = useState(null);

  const sportsList = ['All', 'Cricket', 'Football', 'Hockey', 'Basketball', 'Tennis', 'Volleyball', 'Golf', 'Badminton'];

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedSport && selectedSport !== 'All') {
      result = result.filter(
        (p) => p.sport.toLowerCase() === selectedSport.toLowerCase()
      );
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sport.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortOption === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedSport, searchQuery, sortOption]);

  const handleAdd = (item) => {
    onAddToKit(item);
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1200);
  };

  // Sprite position helper
  const getSpriteStyle = (product) => {
    const isSupport = product.sheet === 'support';
    const idx = product.image;

    if (isSupport) {
      const posX = (idx % 2) * 100;
      const posY = Math.floor(idx / 2) * 100;
      return {
        '--pos-x': `${posX}%`,
        '--pos-y': `${posY}%`,
      };
    } else {
      const posX = (idx % 4) * (100 / 3);
      const posY = Math.floor(idx / 4) * (100 / 2);
      return {
        '--pos-x': `${posX}%`,
        '--pos-y': `${posY}%`,
      };
    }
  };

  return (
    <section id="catalog" className="py-24 bg-[#f7f6f0] border-t border-[#d8dbd2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[#667169] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1d2924]" />
              <span>THE COLLECTION</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[#1d2924]">
              GEAR CATALOG<span className="text-[#678c16]">.</span>
            </h2>
          </div>
          <p className="text-sm text-[#5b665f] max-w-sm leading-relaxed">
            16 equipment concepts with transparent guide prices. Add items to your kit checklist or configure custom options.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 mb-10 shadow-sm border border-[#d8dbd2] space-y-4">
          
          {/* Top row: Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#667169] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search bat, ball, hockey stick, racket, cones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 border border-[#d8dbd2] text-sm text-[#1d2924] placeholder-[#7c8679] focus:outline-none focus:ring-2 focus:ring-[#1d2924] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono uppercase text-[#7c8679] hover:text-[#1d2924]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 sm:self-auto self-end">
              <SlidersHorizontal className="w-4 h-4 text-[#667169]" />
              <span className="text-xs font-mono uppercase text-[#667169]">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white/80 border border-[#d8dbd2] rounded-xl px-3 py-2 text-xs font-bold text-[#1d2924] focus:outline-none focus:ring-2 focus:ring-[#1d2924] cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>

          </div>

          {/* Bottom row: Sport Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-[#e2e5da]">
            {sportsList.map((sport) => {
              const active = selectedSport.toLowerCase() === sport.toLowerCase();
              return (
                <button
                  key={sport}
                  onClick={() => onSelectSport(sport)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                    active
                      ? 'bg-[#1d2924] text-[#f7f6f0] shadow-sm scale-105'
                      : 'bg-white/70 text-[#1d2924] hover:bg-[#e7e9de] border border-[#d8dbd2]'
                  }`}
                >
                  {sport}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-[#7c8679] mb-8">
          <span>SHOWING {filteredProducts.length} OF {products.length} ESSENTIALS</span>
          {selectedSport !== 'All' && (
            <button
              onClick={() => onSelectSport('All')}
              className="text-[#1d2924] font-bold hover:underline"
            >
              Reset to All Sports
            </button>
          )}
        </div>

        {/* 4-Column Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between bg-white/90 border border-[#d8dbd2] rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f4f3ec] border border-[#ebece6]">
                    
                    {/* Sprite Image */}
                    <div
                      className={`product-sprite ${product.sheet === 'support' ? 'support' : ''}`}
                      style={getSpriteStyle(product)}
                    />

                    {/* Tag badge */}
                    {product.tag && (
                      <div className="absolute top-3 left-3 bg-[#f7f6f0]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-wider text-[#1d2924] border border-[#d8dbd2]">
                        {product.tag}
                      </div>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={() => onQuickView(product)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-md backdrop-blur-sm flex items-center justify-center text-[#1d2924] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-[#e3ff76]"
                      aria-label={`Quick view ${product.name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#7c8679] uppercase block mb-1">
                        {product.sport} · {product.category}
                      </span>
                      <h3
                        onClick={() => onQuickView(product)}
                        className="font-display text-lg font-bold text-[#1d2924] group-hover:text-[#678c16] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#667169] mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Add-to-Kit action */}
                    <div className="mt-4 pt-3 border-t border-[#ebece6] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#8b9484] block font-mono">GUIDE PRICE</span>
                        <span className="text-base font-display font-bold text-[#1d2924]">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAdd(product)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                          isAdded
                            ? 'bg-[#e3ff76] text-[#1d2924] scale-110'
                            : 'bg-[#1d2924] text-[#f7f6f0] hover:bg-[#e3ff76] hover:text-[#1d2924] hover:rotate-90'
                        }`}
                        aria-label={`Add ${product.name} to kit`}
                      >
                        {isAdded ? <Check className="w-5 h-5 stroke-[2.5]" /> : <Plus className="w-5 h-5" />}
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 glass-panel rounded-2xl p-8 border border-[#d8dbd2]">
            <h3 className="font-display text-2xl font-bold text-[#1d2924]">No matching equipment found</h3>
            <p className="text-sm text-[#667169] mt-2 mb-6">
              Try adjusting your search terms or choose from another sport discipline.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectSport('All');
              }}
              className="px-6 py-2.5 rounded-lg bg-[#1d2924] text-[#f7f6f0] font-bold text-xs uppercase tracking-wider hover:bg-[#2b3c34]"
            >
              View Complete Catalog
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
