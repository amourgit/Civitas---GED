import React from 'react';
import { motion } from 'framer-motion';
import { usePortalCarousel } from '../../context/PortalCarouselContext';
import { playXboxSound } from '../../utils/xboxAudio';

export function PortalCarouselNav() {
  const { tabs, activeTabId, setActiveTabId, activeIndex, switchTab } = usePortalCarousel();

  return (
    <nav
      aria-label="Navigation des espaces"
      className="w-full relative z-20 shrink-0 select-none bg-transparent"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5">
        {/* Conteneur fluide des options : boutons libres, sans boutons de contrôle, sans bordure de bas */}
        <div className="flex items-center gap-6 sm:gap-9 md:gap-11 overflow-x-auto no-scrollbar scroll-smooth">
          {tabs.map((tab, idx) => {
            const isActive = tab.id === activeTabId;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (!isActive) {
                    playXboxSound('select');
                    switchTab(idx);
                  }
                }}
                className={`group relative py-1 px-1 bg-transparent border-0 outline-hidden cursor-pointer transition-all duration-300 flex items-center shrink-0 ${
                  isActive ? 'cursor-default' : 'opacity-25 hover:opacity-70'
                }`}
              >
                <span
                  className={`transition-all duration-300 tracking-normal select-none ${
                    isActive
                      ? 'text-white font-bold text-base sm:text-lg tracking-tight drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]'
                      : 'text-white/60 font-normal text-xs sm:text-sm'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Soulignement actif Xbox épuré et lumineux sous le texte actif uniquement */}
                {isActive && (
                  <motion.span
                    layoutId="portalCarouselActiveLine"
                    className="absolute -bottom-1 left-1 right-1 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
