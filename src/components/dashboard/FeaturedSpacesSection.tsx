import React from 'react';
import { 
  Scan, 
  ArrowRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface FeaturedSpacesSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onNavigateToIngestion: () => void;
  onQuickAction?: (actionName: string) => void;
}

export function FeaturedSpacesSection({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onNavigateToIngestion,
  onQuickAction
}: FeaturedSpacesSectionProps) {
  return (
    <section className="w-full flex flex-col gap-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          À la une & Espaces GED
        </h2>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            onNavigateToDocuments();
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Voir tout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Xbox Style Grid: Row 1 (2 large cards) + Row 2 (3 medium cards) */}
      <div className="w-full flex flex-col gap-1 sm:gap-1.5">
        
        {/* ROW 1: 2 Large Cards (50% / 50%) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5 items-stretch">
          
          {/* Card 1: Direction Générale & Stratégie */}
          <div 
            onClick={() => {
              setActiveCardId('hero-dg');
              onNavigateToDocuments();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId('hero-dg');
            }}
            className={`relative group cursor-pointer h-52 sm:h-64 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === 'hero-dg'
                ? 'border-2 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80" 
              alt="Direction Générale"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 brightness-[0.85]"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/80 via-blue-950/40 to-transparent mix-blend-multiply" />
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#020508]/95 via-[#020508]/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold border border-emerald-500/30">
                  ESPACE MAÎTRE
                </span>
                <span className="text-[11px] text-white/60 font-mono">SALLE S-01</span>
              </div>
              <span className="text-white font-bold text-sm sm:text-base tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                Direction Générale & Stratégie 2026
              </span>
              <span className="text-white/75 text-xs sm:text-sm font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-1">
                12 480 documents archivés et certifiés
              </span>
            </div>
          </div>

          {/* Card 2: Comptabilité & Clôture Fiscale */}
          <div 
            onClick={() => {
              setActiveCardId('hero-finance');
              onNavigateToDocuments();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId('hero-finance');
            }}
            className={`relative group cursor-pointer h-52 sm:h-64 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === 'hero-finance'
                ? 'border-2 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80" 
              alt="Comptabilité & Finances"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 brightness-[0.8]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#020508]/95 via-[#020508]/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[9px] font-mono font-bold border border-sky-500/30">
                  FINANCE & AUDIT
                </span>
                <span className="text-[11px] text-white/60 font-mono">SALLE S-02</span>
              </div>
              <span className="text-white font-bold text-sm sm:text-base tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                Comptabilité & Clôture Fiscale
              </span>
              <span className="text-white/75 text-xs sm:text-sm font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-1">
                Rapports d'audit, bilans et déclarations légales
              </span>
            </div>
          </div>

        </div>

        {/* ROW 2: 3 Medium Cards (33.3% / 33.3% / 33.3%) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-1.5 items-stretch">
          
          {/* Card 1: Espaces Collaboratifs RH */}
          <div 
            onClick={() => {
              setActiveCardId('row2-espaces');
              onNavigateToDocuments();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId('row2-espaces');
            }}
            className={`relative group cursor-pointer h-40 sm:h-48 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === 'row2-espaces'
                ? 'border-2 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80" 
              alt="Espaces Collaboratifs"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 brightness-[0.75]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020508]/95 via-[#020508]/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex flex-col justify-end">
              <span className="text-white font-bold text-xs sm:text-sm tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                Espaces Collaboratifs RH
              </span>
              <span className="text-white/75 text-[11px] sm:text-xs font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-1">
                4 espaces d'équipes et dossiers partagés
              </span>
            </div>
          </div>

          {/* Card 2: Numérisation & OCR Intelligent */}
          <div 
            onClick={() => {
              setActiveCardId('row2-ocr');
              onNavigateToIngestion();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId('row2-ocr');
            }}
            className={`relative group cursor-pointer h-40 sm:h-48 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === 'row2-ocr'
                ? 'border-2 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400" />
            
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
                <path d="M0 100 C 80 50, 150 120, 300 40 L 300 150 L 0 150 Z" fill="white" />
              </svg>
            </div>

            <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-md">
              <Scan className="w-5 h-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020508]/95 via-[#020508]/60 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex flex-col justify-end">
              <span className="text-white font-bold text-xs sm:text-sm tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                Numérisation & OCR Intelligent
              </span>
              <span className="text-white/80 text-[11px] sm:text-xs font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-1">
                Reconnaissance de texte et indexation IA
              </span>
            </div>
          </div>

          {/* Card 3: Circuits & Signatures Électroniques */}
          <div 
            onClick={() => {
              setActiveCardId('row2-wf');
              if (onQuickAction) onQuickAction('workflows');
              else onNavigateToDocuments();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId('row2-wf');
            }}
            className={`relative group cursor-pointer h-40 sm:h-48 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === 'row2-wf'
                ? 'border-2 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80" 
              alt="Signatures & Workflows"
              className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 brightness-[0.75]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020508]/95 via-[#020508]/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex flex-col justify-end">
              <span className="text-white font-bold text-xs sm:text-sm tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                Circuits & Signatures Électroniques
              </span>
              <span className="text-white/75 text-[11px] sm:text-xs font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-1">
                8 documents en attente de visa légal
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
