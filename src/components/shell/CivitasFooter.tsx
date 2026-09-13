import React from 'react';

interface CivitasFooterProps {
  categories?: string[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
  brandTitle?: string;
  brandTagline?: string;
}

export function CivitasFooter({
  categories = ['APPS', 'TRAVAIL', 'CRÉATION', 'AVENIR'],
  activeCategory = 'APPS',
  onSelectCategory,
  brandTitle = 'CIVITAS',
  brandTagline = 'Innover pour un meilleur demain'
}: CivitasFooterProps) {
  return (
    <footer className="w-full flex items-end justify-between px-8 pb-6 pt-2 bg-transparent z-20 select-none">
      {/* Brand Identity at Bottom Left */}
      <div className="flex items-center gap-3">
        {/* Glowing C Logo */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
            {/* White / Silver Base Arc */}
            <path
              d="M32 10 A 15 15 0 1 0 32 30"
              stroke="#e2e8f0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Emerald Neon Glowing Accent */}
            <path
              d="M30 28 A 15 15 0 0 1 12 28"
              stroke="#4ade80"
              strokeWidth="4.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_#4ade80]"
            />
          </svg>
        </div>

        <div className="flex flex-col">
          <span className="text-white font-bold text-sm tracking-[0.2em] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {brandTitle}
          </span>
          <span className="text-white/45 text-[10px] tracking-wider font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {brandTagline}
          </span>
        </div>
      </div>

      {/* Horizontal Category Nav at Bottom Right */}
      <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] text-white/50">
        {categories.map((cat, idx) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <React.Fragment key={cat}>
              {idx > 0 && <span className="text-white/20 select-none">/</span>}
              <button
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat)}
                className={`transition-colors cursor-pointer outline-none ${
                  isActive 
                    ? 'text-white font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]' 
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                {cat}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </footer>
  );
}
