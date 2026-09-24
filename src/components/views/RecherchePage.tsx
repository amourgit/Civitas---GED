"use client";

import React, { useState } from 'react';
import { PageBackground } from '../shell/PageBackground';
import { AppleSpotlight, SpotlightCategory } from '../ui/AppleSpotlight';

export function RecherchePage() {
  const [activeCategory, setActiveCategory] = useState<SpotlightCategory>('all');

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-white overflow-hidden select-none relative">
      
      {/* ── 1. Arrière-plan immersif & transparent ── */}
      <PageBackground
        showAtmosphere={false}
        showDarkWash={false}
        showGlow={true}
        className="opacity-90 bg-transparent"
      />

      {/* ── 2. Contenu principal avec le moteur AppleSpotlight ── */}
      <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto max-w-7xl mx-auto w-full relative z-10 scrollbar-thin scrollbar-thumb-teal-500/30">
        <AppleSpotlight 
          initialCategory={activeCategory}
          embedded={true}
        />
      </main>

    </div>
  );
}

export default RecherchePage;
