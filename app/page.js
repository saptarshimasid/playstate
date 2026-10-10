'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import SportsDisciplines from '@/components/SportsDisciplines';
import CatalogShowcase from '@/components/CatalogShowcase';
import CricketFeature from '@/components/CricketFeature';
import AiStrategist from '@/components/AiStrategist';
import FieldNotes from '@/components/FieldNotes';
import Footer from '@/components/Footer';
import KitDrawer from '@/components/KitDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import { products } from '@/data/products';

export default function HomePage() {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [kitItems, setKitItems] = useState([]);
  const [isKitOpen, setIsKitOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedSport, setSelectedSport] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate kit from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('playstate_kit');
      if (saved) {
        setKitItems(JSON.parse(saved));
      } else {
        // Starter initial item
        const defaultItem = products.find((p) => p.id === 'cricket-bat');
        if (defaultItem) {
          setKitItems([{ ...defaultItem, selected_option: 'Adult', quantity: 1 }]);
        }
      }
    } catch (e) {
      console.warn('LocalStorage not available');
    }
  }, []);

  // Sync kit to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('playstate_kit', JSON.stringify(kitItems));
    } catch (e) {
      // Ignored in private/storage-restricted mode
    }
  }, [kitItems]);

  const handleAddToKit = (product) => {
    setKitItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === product.id && i.selected_option === product.selected_option
      );
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx].quantity = (next[existingIdx].quantity || 1) + (product.quantity || 1);
        return next;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const handleUpdateQty = (id, newQty) => {
    setKitItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setKitItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearKit = () => {
    setKitItems([]);
  };

  const handleLoadPreset = (type) => {
    if (type === 'cricket') {
      const cricketItems = products.filter((p) => p.sport === 'Cricket').slice(0, 4);
      setKitItems(
        cricketItems.map((item) => ({
          ...item,
          selected_option: item.options ? item.options[0] : 'Standard',
          quantity: 1,
        }))
      );
      setIsKitOpen(true);
    } else if (type === 'football') {
      const footballItems = products.filter((p) => p.sport === 'Football');
      setKitItems(
        footballItems.map((item) => ({
          ...item,
          selected_option: item.options ? item.options[0] : 'Standard',
          quantity: 1,
        }))
      );
      setIsKitOpen(true);
    }
  };

  const handleAddPresetFromAi = (presetArray) => {
    if (!presetArray || !Array.isArray(presetArray)) return;
    setKitItems((prev) => {
      const merged = [...prev];
      presetArray.forEach((pItem) => {
        const found = merged.find((m) => m.id === pItem.id);
        if (found) {
          found.quantity = (found.quantity || 1) + 1;
        } else {
          merged.push({ ...pItem, quantity: 1 });
        }
      });
      return merged;
    });
    setIsKitOpen(true);
  };

  const handleSelectSport = (sportName) => {
    setSelectedSport(sportName);
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSearch = () => {
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Athletic Preloader */}
      <Preloader onComplete={() => setIsPreloaded(true)} />

      {/* Main Experience */}
      <div className="min-h-screen flex flex-col justify-between selection:bg-[#e3ff76] selection:text-[#1d2924]">
        
        {/* Sticky Glassmorphic Header */}
        <Header
          kitCount={kitItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}
          onOpenKit={() => setIsKitOpen(true)}
          onOpenSearch={handleOpenSearch}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onExploreClick={() => handleSelectSport('All')}
            onAiClick={() => {
              const aiElem = document.getElementById('ai-strategist');
              if (aiElem) aiElem.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Marquee Ribbon */}
          <Marquee />

          {/* Sports Disciplines */}
          <SportsDisciplines
            selectedSport={selectedSport}
            onSelectSport={handleSelectSport}
          />

          {/* Gear Catalog Showcase */}
          <CatalogShowcase
            products={products}
            selectedSport={selectedSport}
            onSelectSport={setSelectedSport}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToKit={handleAddToKit}
          />

          {/* Editorial Cricket Collection Spotlight */}
          <CricketFeature
            onAddCricketPack={() => handleLoadPreset('cricket')}
          />

          {/* AI Match Strategist (LangChain & LangGraph) */}
          <AiStrategist
            onAddPresetToKit={handleAddPresetFromAi}
          />

          {/* Field Notes & Care Manuals */}
          <FieldNotes />
        </main>

        {/* Ultra-Modern Animated Footer */}
        <Footer />

        {/* Floating Kit Drawer */}
        <KitDrawer
          isOpen={isKitOpen}
          onClose={() => setIsKitOpen(false)}
          kitItems={kitItems}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearKit={handleClearKit}
          onLoadPreset={handleLoadPreset}
        />

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToKit={handleAddToKit}
        />

      </div>
    </>
  );
}
