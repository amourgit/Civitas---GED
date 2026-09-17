import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  ListTodo, 
  GitFork, 
  PenTool, 
  Clock, 
  Briefcase,
  Layers,
  FilePlus,
  Upload,
  Scan,
  Share2,
  ShieldCheck,
  History,
  Tag,
  Search,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface AccueilPageProps {
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

export function AccueilPage({
  onNavigateToDocuments,
  onQuickAction
}: AccueilPageProps) {
  const navigate = useNavigate();
  const [activeCardId, setActiveCardId] = useState<string>('hero-dg');

  const handleGoToDocuments = () => {
    playXboxSound('select');
    onNavigateToDocuments();
    navigate('/documentation/salles');
  };

  const handleGoToIngestion = () => {
    playXboxSound('select');
    navigate('/ingestion');
  };

  return (
    <div 
      className="w-full flex-1 flex flex-col overflow-y-auto overflow-x-hidden px-4 sm:px-8 py-3 sm:py-4 gap-6 select-none min-h-0 scrollbar-thin scrollbar-thumb-white/10"
      data-scrollable="true"
    >
      {/* SECTION 1: "Watch & listen" -> "À la une & Espaces GED" */}
      <section className="w-full flex flex-col gap-2.5">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            À la une & Espaces GED
          </h2>
          <button 
            type="button"
            onClick={handleGoToDocuments}
            className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Xbox Style Grid: Row 1 (2 large cards) + Row 2 (3 medium cards) with minimal gap (gap-1 / gap-1.5) and minimal border radius (rounded-[3px]) */}
        <div className="w-full flex flex-col gap-1 sm:gap-1.5">
          
          {/* ROW 1: 2 Large Cards (50% / 50%) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5 items-stretch">
            
            {/* Card 1: Guardians style colorful banner (Direction Générale & Stratégie) */}
            <div 
              onClick={() => {
                setActiveCardId('hero-dg');
                handleGoToDocuments();
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
              {/* Cover Artwork Image with Rich Cosmic / Workplace atmosphere */}
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80" 
                alt="Direction Générale"
                className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 brightness-[0.85]"
              />

              {/* Colorful vibrant gradient overlay (inspired by Guardians of the Galaxy artwork) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/80 via-blue-950/40 to-transparent mix-blend-multiply" />
              
              {/* Dark bottom gradient for legible typography */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#020508]/95 via-[#020508]/70 to-transparent" />

              {/* Card Label Overlay at Bottom Left */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
                <span className="text-white font-bold text-sm sm:text-base tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-1">
                  Direction Générale & Stratégie 2026
                </span>
                <span className="text-white/75 text-xs sm:text-sm font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] line-clamp-1">
                  12 480 documents archivés et certifiés
                </span>
              </div>
            </div>

            {/* Card 2: Fast X style High-Contrast Banner (Comptabilité & Clôture Fiscale) */}
            <div 
              onClick={() => {
                setActiveCardId('hero-finance');
                handleGoToDocuments();
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
              {/* Cover Artwork Image */}
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80" 
                alt="Comptabilité & Finances"
                className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300 brightness-[0.8]"
              />

              {/* Dark split diagonal styling overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              
              {/* Bottom gradient */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#020508]/95 via-[#020508]/70 to-transparent" />

              {/* Card Label Overlay at Bottom Left */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end">
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
            
            {/* Card 1: Disney+ style Multi-Cast montage (Espaces Partagés GED) */}
            <div 
              onClick={() => {
                setActiveCardId('row2-espaces');
                handleGoToDocuments();
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

              {/* Vibrant blue/teal atmosphere */}
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

            {/* Card 2: Crunchyroll Vibrant Orange/Red style (Numérisation & OCR Intelligent) */}
            <div 
              onClick={() => {
                setActiveCardId('row2-ocr');
                handleGoToIngestion();
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
              {/* Vibrant orange artistic background matching Crunchyroll style */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400" />
              
              {/* Stylized geometric curves and waves */}
              <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                <svg className="w-full h-full" viewBox="0 0 300 150" fill="none">
                  <path d="M0 100 C 80 50, 150 120, 300 40 L 300 150 L 0 150 Z" fill="white" />
                </svg>
              </div>

              {/* Big Stylized OCR Scan / Logo Badge */}
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

            {/* Card 3: Succession / Max style Corporate Executives cover (Signatures & Workflows) */}
            <div 
              onClick={() => {
                setActiveCardId('row2-wf');
                if (onQuickAction) onQuickAction('workflows');
                else handleGoToDocuments();
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

      {/* SECTION 2: "Picks for you" -> "Suggestions pour vous" */}
      <section className="w-full flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Suggestions pour vous
          </h3>
        </div>

        {/* Horizontal Row of Compact Landscape Cards with low gap and low radius */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-1.5">
          {[
            {
              id: 'pick-mp',
              title: "Marchés Publics 2026",
              subtitle: "6 sous-dossiers",
              img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=80",
              tag: "Marchés"
            },
            {
              id: 'pick-rh',
              title: "Dossiers RH & Contrats",
              subtitle: "14 fichiers récents",
              img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&auto=format&fit=crop&q=80",
              tag: "RH"
            },
            {
              id: 'pick-audit',
              title: "Audit & Conformité RGPD",
              subtitle: "Certifié ISO 27001",
              img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500&auto=format&fit=crop&q=80",
              tag: "Sécurité"
            },
            {
              id: 'pick-immo',
              title: "Patrimoine & Immobilier",
              subtitle: "Baux et plans cadastraux",
              img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=80",
              tag: "Baux"
            },
            {
              id: 'pick-tech',
              title: "Architecture Cloud & IT",
              subtitle: "Schémas et protocoles",
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80",
              tag: "IT"
            },
            {
              id: 'pick-jur',
              title: "Contentieux & Juridique",
              subtitle: "3 dossiers actifs",
              img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=80",
              tag: "Juridique"
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveCardId(item.id);
                handleGoToDocuments();
              }}
              onMouseEnter={() => {
                playXboxSound('hover');
                setActiveCardId(item.id);
              }}
              className={`relative group cursor-pointer h-28 sm:h-32 rounded-[3px] overflow-hidden transition-all duration-150 ${
                activeCardId === item.id
                  ? 'border-2 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                  : 'border border-white/10 hover:border-[#22c55e]'
              }`}
            >
              <img 
                src={item.img} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.75]"
              />

              <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#020508]/95 via-[#020508]/60 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-2.5 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-bold mb-0.5">
                  {item.tag}
                </span>
                <span className="text-white font-bold text-xs tracking-tight truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  {item.title}
                </span>
                <span className="text-white/70 text-[10px] truncate">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Raccourcis & Actions Rapides */}
      <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-1">
        {[
          { label: 'Nouveau document', icon: <FilePlus className="w-3.5 h-3.5 text-emerald-400" />, action: 'new_doc' },
          { label: 'Importer des fichiers', icon: <Upload className="w-3.5 h-3.5 text-sky-400" />, action: 'import' },
          { label: 'Numérisation OCR', icon: <Scan className="w-3.5 h-3.5 text-amber-400" />, action: 'ocr' },
          { label: 'Créer un workflow', icon: <GitFork className="w-3.5 h-3.5 text-purple-400" />, action: 'create_wf' },
          { label: 'Partage sécurisé', icon: <Share2 className="w-3.5 h-3.5 text-emerald-400" />, action: 'share' },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={() => {
              playXboxSound('select');
              if (btn.action === 'new_doc' || btn.action === 'import') {
                handleGoToDocuments();
              } else if (btn.action === 'ocr') {
                handleGoToIngestion();
              } else if (onQuickAction) {
                onQuickAction(btn.action);
              }
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-[5px] bg-transparent hover:bg-white/10 border border-white/15 hover:border-emerald-400/60 hover:shadow-[0_0_15px_rgba(74,222,128,0.25)] transition-all duration-150 cursor-pointer text-xs font-medium text-white/90 hover:text-white overflow-visible"
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
