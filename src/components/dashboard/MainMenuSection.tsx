import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Archive, 
  ClipboardList, 
  Inbox, 
  Search, 
  BarChart3, 
  Settings, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface MainMenuSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onNavigateToIngestion: () => void;
  onQuickAction?: (actionName: string) => void;
}

export function MainMenuSection({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onNavigateToIngestion,
  onQuickAction
}: MainMenuSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="w-full flex flex-col justify-center select-none">
      {/* BENTO GRID (Mobile: 2 columns, 3 compact rows | Desktop: Row 1 = 7/5, Row 2 = 3/3/3/3) */}
      <div className="grid grid-cols-12 gap-1 sm:gap-1.5 md:gap-2">

        {/* BENTO CARD 1: SITES (au lieu de Dossiers Métier - col-span-6 md:col-span-7) */}
        <div
          id="card-bento-sites"
          onClick={() => {
            setActiveCardId('bento-sites');
            playXboxSound('select');
            navigate('/ged/sites');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-sites');
          }}
          className={`col-span-6 md:col-span-7 relative group cursor-pointer rounded-[3px] p-1.5 sm:p-2.5 md:p-3.5 flex flex-col justify-between overflow-hidden transition-all duration-150 bg-gradient-to-br from-[#0c1b30] via-[#091424] to-[#040811] h-20 sm:h-24 md:h-auto ${
            activeCardId === 'bento-sites'
              ? 'border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.35)] ring-1 ring-sky-400/50'
              : 'border border-white/10 hover:border-sky-400/80 hover:shadow-[0_0_14px_rgba(56,189,248,0.2)]'
          }`}
        >
          <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
            <FileText className="w-14 sm:w-20 md:w-28 h-14 sm:h-20 md:h-28 text-sky-400" />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 min-w-0">
              <span className="px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-xs bg-sky-500/20 text-sky-300 text-[7px] sm:text-[9px] md:text-[10px] font-mono font-bold border border-sky-500/40 flex items-center gap-1 shrink-0">
                <FileText className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-400 shrink-0" />
                <span>SITES</span>
              </span>
              <span className="hidden lg:inline-block px-1.5 py-0.2 rounded-xs bg-white/[0.08] text-white/70 text-[8px] font-mono">
                ALFRESCO SHARE
              </span>
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xs bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-300 group-hover:bg-sky-500 group-hover:text-black transition-all shrink-0">
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </div>
          </div>

          <div className="relative z-10 my-0.5 sm:my-1">
            <h3 className="text-white font-bold text-[11px] sm:text-xs md:text-base tracking-tight truncate group-hover:text-sky-200 transition-colors">
              Sites
            </h3>
            <p className="text-white/70 text-[8px] sm:text-[9px] md:text-[11px] mt-0.5 line-clamp-1">
              Espaces collaboratifs, membres & bibliothèque
            </p>
          </div>

          <div className="relative z-10 pt-0.5 sm:pt-1.5 border-t border-white/[0.08]">
            {/* Desktop / tablet stepper */}
            <div className="hidden sm:flex items-center gap-1 text-[8px] sm:text-[9px] font-mono overflow-x-auto no-scrollbar py-0.2">
              <span className="px-1.5 py-0.2 rounded-xs bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">Tableaux de bord</span>
              <span className="text-white/30 shrink-0">•</span>
              <span className="px-1.5 py-0.2 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">Membres</span>
              <span className="text-white/30 shrink-0">•</span>
              <span className="px-1.5 py-0.2 rounded-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">Espaces Documentaires</span>
            </div>
            {/* Mobile compact label */}
            <div className="flex sm:hidden items-center justify-between text-[7px] text-sky-400/90 font-mono">
              <span>Espaces collaboratifs</span>
              <span className="text-white/40">Alfresco</span>
            </div>
          </div>
        </div>

        {/* BENTO CARD 2: ARCHIVES PHYSIQUES (col-span-6 md:col-span-5) */}
        <div
          id="card-bento-archives"
          onClick={() => {
            setActiveCardId('bento-archives');
            playXboxSound('select');
            onNavigateToDocuments();
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-archives');
          }}
          className={`col-span-6 md:col-span-5 relative group cursor-pointer rounded-[3px] p-1.5 sm:p-2.5 md:p-3.5 flex flex-col justify-between overflow-hidden transition-all duration-150 bg-gradient-to-br from-[#1a102b] via-[#10091d] to-[#040208] h-20 sm:h-24 md:h-auto ${
            activeCardId === 'bento-archives'
              ? 'border-2 border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.4)] ring-1 ring-purple-400/50'
              : 'border border-white/10 hover:border-purple-400/80 hover:shadow-[0_0_14px_rgba(192,132,252,0.2)]'
          }`}
        >
          <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
            <Archive className="w-14 sm:w-20 md:w-28 h-14 sm:h-20 md:h-28 text-purple-400" />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 min-w-0">
              <span className="px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-xs bg-purple-500/20 text-purple-300 text-[7px] sm:text-[9px] md:text-[10px] font-mono font-bold border border-purple-500/40 flex items-center gap-1 shrink-0">
                <Archive className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400 shrink-0" />
                <span>ARCHIVES</span>
              </span>
              <span className="hidden lg:inline-block px-1.5 py-0.2 rounded-xs bg-white/[0.08] text-white/70 text-[8px] font-mono">
                S-01 / S-02
              </span>
            </div>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xs bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:bg-purple-500 group-hover:text-black transition-all shrink-0">
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </div>
          </div>

          <div className="relative z-10 my-0.5 sm:my-1">
            <h3 className="text-white font-bold text-[11px] sm:text-xs md:text-base tracking-tight truncate group-hover:text-purple-200 transition-colors">
              Archives Physiques
            </h3>
            <p className="text-white/70 text-[8px] sm:text-[9px] md:text-[11px] mt-0.5 line-clamp-1">
              Rayonnages & cotes légales
            </p>
          </div>

          <div className="relative z-10 pt-0.5 sm:pt-1.5 border-t border-white/[0.08]">
            {/* Desktop / tablet tags */}
            <div className="hidden sm:flex items-center gap-1 text-[8px] sm:text-[9px] font-mono text-purple-300 flex-wrap">
              <span className="px-1.5 py-0.2 rounded-xs bg-purple-500/15 border border-purple-500/30">Salle</span>
              <span className="text-white/40">→</span>
              <span className="px-1.5 py-0.2 rounded-xs bg-purple-500/15 border border-purple-500/30">Rayon</span>
              <span className="text-white/40">→</span>
              <span className="px-1.5 py-0.2 rounded-xs bg-purple-500/15 border border-purple-500/30">Casier</span>
              <span className="ml-auto text-[8px] sm:text-[9px] text-emerald-400 font-sans flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Cotes</span>
              </span>
            </div>
            {/* Mobile compact label */}
            <div className="flex sm:hidden items-center justify-between text-[7px] text-purple-300/90 font-mono">
              <span>Salle → Casier</span>
              <span className="text-emerald-400">Pérenne</span>
            </div>
          </div>
        </div>

        {/* BENTO CARD 3: DÉPÔTS & INGESTION IA (col-span-6 md:col-span-3) */}
        <div
          id="card-bento-depots"
          onClick={() => {
            setActiveCardId('bento-depots');
            playXboxSound('select');
            navigate('/ged/depots');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-depots');
          }}
          className={`col-span-6 md:col-span-3 relative group cursor-pointer rounded-[3px] p-1.5 sm:p-2 md:p-2.5 flex flex-col justify-between bg-gradient-to-b from-[#0b1b16] to-[#040c09] transition-all duration-150 h-20 sm:h-24 md:h-auto ${
            activeCardId === 'bento-depots'
              ? 'border-2 border-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.35)] ring-1 ring-emerald-400/50'
              : 'border border-white/10 hover:border-emerald-400/70'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xs bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all shrink-0">
              <Inbox className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="text-[7px] sm:text-[8px] font-mono font-bold px-1 sm:px-1.5 py-0.2 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OCR IA
            </span>
          </div>
          <div className="my-0.5 sm:my-1">
            <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-white group-hover:text-emerald-200 transition-colors truncate">
              Dépôts & Ingestion
            </h4>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/60 line-clamp-1">
              Numérisation & OCR
            </p>
          </div>
          <div className="flex items-center justify-between pt-0.5 sm:pt-1 border-t border-white/[0.06] text-[7px] sm:text-[8px] md:text-[9px] text-emerald-400/90 font-mono">
            <span>300 DPI</span>
            <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/40 group-hover:text-white" />
          </div>
        </div>

        {/* BENTO CARD 4: RECHERCHE MULTI-CRITÈRES (col-span-6 md:col-span-3) */}
        <div
          id="card-bento-recherche"
          onClick={() => {
            setActiveCardId('bento-recherche');
            playXboxSound('select');
            navigate('/ged/recherche');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-recherche');
          }}
          className={`col-span-6 md:col-span-3 relative group cursor-pointer rounded-[3px] p-1.5 sm:p-2 md:p-2.5 flex flex-col justify-between bg-gradient-to-b from-[#081822] to-[#040b10] transition-all duration-150 h-20 sm:h-24 md:h-auto ${
            activeCardId === 'bento-recherche'
              ? 'border-2 border-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.35)] ring-1 ring-teal-400/50'
              : 'border border-white/10 hover:border-teal-400/70'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xs bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all shrink-0">
              <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="text-[7px] sm:text-[8px] font-mono font-bold px-1 sm:px-1.5 py-0.2 rounded-xs bg-teal-500/20 text-teal-300 border border-teal-500/30">
              INDEXÉ
            </span>
          </div>
          <div className="my-0.5 sm:my-1">
            <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-white group-hover:text-teal-200 transition-colors truncate">
              Recherche Avancée
            </h4>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/60 line-clamp-1">
              Cotes & plein texte
            </p>
          </div>
          <div className="flex items-center justify-between pt-0.5 sm:pt-1 border-t border-white/[0.06] text-[7px] sm:text-[8px] md:text-[9px] text-teal-400/90 font-mono">
            <span>Index unifié</span>
            <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/40 group-hover:text-white" />
          </div>
        </div>

        {/* BENTO CARD 5: ADMINISTRATION (au lieu de Suivi des Sorties - col-span-6 md:col-span-3) */}
        <div
          id="card-bento-administration"
          onClick={() => {
            setActiveCardId('bento-administration');
            playXboxSound('select');
            navigate('/ged/administration');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-administration');
          }}
          className={`col-span-6 md:col-span-3 relative group cursor-pointer rounded-[3px] p-1.5 sm:p-2 md:p-2.5 flex flex-col justify-between bg-gradient-to-b from-[#141b27] to-[#070b12] transition-all duration-150 h-20 sm:h-24 md:h-auto ${
            activeCardId === 'bento-administration'
              ? 'border-2 border-indigo-400 shadow-[0_0_16px_rgba(129,140,248,0.35)] ring-1 ring-indigo-400/50'
              : 'border border-white/10 hover:border-indigo-400/70'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xs bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-all shrink-0">
              <Settings className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="text-[7px] sm:text-[8px] font-mono font-bold px-1 sm:px-1.5 py-0.2 rounded-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              SYSTÈME
            </span>
          </div>
          <div className="my-0.5 sm:my-1">
            <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
              Administration
            </h4>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/60 line-clamp-1">
              Plan de classement & droits
            </p>
          </div>
          <div className="flex items-center justify-between pt-0.5 sm:pt-1 border-t border-white/[0.06] text-[7px] sm:text-[8px] md:text-[9px] text-indigo-400/90 font-mono">
            <span>Gouvernance</span>
            <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/40 group-hover:text-white" />
          </div>
        </div>

        {/* BENTO CARD 6: RAPPORTS & GOUVERNANCE (col-span-6 md:col-span-3) */}
        <div
          id="card-bento-rapports"
          onClick={() => {
            setActiveCardId('bento-rapports');
            playXboxSound('select');
            navigate('/ged/rapports');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-rapports');
          }}
          className={`col-span-6 md:col-span-3 relative group cursor-pointer rounded-[3px] p-1.5 sm:p-2 md:p-2.5 flex flex-col justify-between bg-gradient-to-b from-[#09151e] to-[#040a0f] transition-all duration-150 h-20 sm:h-24 md:h-auto ${
            activeCardId === 'bento-rapports'
              ? 'border-2 border-indigo-400 shadow-[0_0_16px_rgba(129,140,248,0.3)] ring-1 ring-indigo-400/50'
              : 'border border-white/10 hover:border-indigo-400/70'
          }`}
        >
          <div className="flex items-center justify-between gap-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-xs bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-all shrink-0">
              <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <span className="text-[7px] sm:text-[8px] font-mono font-bold px-1 sm:px-1.5 py-0.2 rounded-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              AUDIT
            </span>
          </div>
          <div className="my-0.5 sm:my-1">
            <h4 className="text-[10px] sm:text-xs md:text-sm font-bold text-white group-hover:text-indigo-200 transition-colors truncate">
              Rapports & Audit
            </h4>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-white/60 line-clamp-1">
              Volumétrie & conformité
            </p>
          </div>
          <div className="flex items-center justify-between pt-0.5 sm:pt-1 border-t border-white/[0.06] text-[7px] sm:text-[8px] md:text-[9px] text-indigo-300 font-mono">
            <span>DUA & Stats</span>
            <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/40 group-hover:text-white" />
          </div>
        </div>

      </div>
    </section>
  );
}
