import React from 'react';
import { 
  FolderTree, 
  Archive, 
  Inbox, 
  ClipboardList, 
  Search, 
  BarChart3, 
  Settings, 
  ArrowRight, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  Repeat,
  CheckCircle2,
  Clock,
  Layers,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    <section className="w-full flex flex-col gap-4 sm:gap-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.08] pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 bg-[#22c55e] rounded-xs shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Menu principal
          </h2>
          <span className="text-xs text-emerald-400/90 font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            SGAI • ARCHIVAGE INSTITUTIONNEL
          </span>
        </div>
        <p className="text-xs text-white/50">
          Organisation documentaire en Bento • Cœur de métier & Conservation physique
        </p>
      </div>

      {/* BENTO GRID (Solid layout with asymmetric columns: 7/5, 4/4/4, 6/6) */}
      <div className="grid grid-cols-12 gap-1 sm:gap-1.5">

        {/* BENTO CARD 1: DOSSIERS MÉTIER (col-span-12 lg:col-span-7) - Cœur documentaire du service */}
        <div
          id="card-bento-dossiers"
          onClick={() => {
            setActiveCardId('bento-dossiers');
            playXboxSound('select');
            navigate('/dossiers');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-dossiers');
          }}
          className={`col-span-12 lg:col-span-7 relative group cursor-pointer rounded-sm p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-150 bg-gradient-to-br from-[#0c1b30] via-[#091424] to-[#040811] ${
            activeCardId === 'bento-dossiers'
              ? 'border-2 border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.35)] ring-1 ring-sky-400/50'
              : 'border border-white/10 hover:border-sky-400/80 hover:shadow-[0_0_18px_rgba(56,189,248,0.2)]'
          }`}
        >
          {/* Subtle watermark icon */}
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
            <FileText className="w-44 h-44 text-sky-400" />
          </div>

          {/* Top header row */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-sm bg-sky-500/20 text-sky-300 text-[11px] font-mono font-bold border border-sky-500/40 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                CŒUR DOCUMENTAIRE DU SERVICE
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-white/[0.08] text-white/70 text-[10px] font-mono">
                ÉTAT CIVIL • URBANISME • CM
              </span>
            </div>
            <div className="w-8 h-8 rounded-sm bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-300 group-hover:bg-sky-500 group-hover:text-black transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-3">
            <h3 className="text-white font-black text-xl sm:text-2xl tracking-tight leading-snug group-hover:text-sky-200 transition-colors">
              Dossiers Métier & Cycle de Vie
            </h3>
            <p className="text-white/75 text-xs sm:text-sm font-normal mt-1.5 max-w-xl leading-relaxed">
              Espace de gestion documentaire du service courant : suivi de l'instruction, regroupement des pièces justificatives et distinction claire entre le dossier numérique et son archivage physique.
            </p>
          </div>

          {/* Bottom lifecycle pipeline chips */}
          <div className="relative z-10 pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded-xs bg-sky-500/20 text-sky-300 border border-sky-500/30">🆕 Nouveaux</span>
            <span className="text-white/30">→</span>
            <span className="px-2 py-0.5 rounded-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">🔄 En traitement</span>
            <span className="text-white/30">→</span>
            <span className="px-2 py-0.5 rounded-xs bg-orange-500/20 text-orange-300 border border-orange-500/30">⚠️ À compléter</span>
            <span className="text-white/30">→</span>
            <span className="px-2 py-0.5 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">✅ Clôturés</span>
            <span className="text-white/30">→</span>
            <span className="px-2 py-0.5 rounded-xs bg-purple-500/25 text-purple-200 font-bold border border-purple-400/40">🗄️ Archivés</span>
          </div>
        </div>

        {/* BENTO CARD 2: ARCHIVES PHYSIQUES (col-span-12 lg:col-span-5) - Conservation spatiale */}
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
          className={`col-span-12 lg:col-span-5 relative group cursor-pointer rounded-sm p-5 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-150 bg-gradient-to-br from-[#1a102b] via-[#10091d] to-[#040208] ${
            activeCardId === 'bento-archives'
              ? 'border-2 border-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.4)] ring-1 ring-purple-400/50'
              : 'border border-white/10 hover:border-purple-400/80 hover:shadow-[0_0_18px_rgba(192,132,252,0.2)]'
          }`}
        >
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none">
            <Archive className="w-40 h-40 text-purple-400" />
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-sm bg-purple-500/20 text-purple-300 text-[11px] font-mono font-bold border border-purple-500/40 flex items-center gap-1.5">
                <Archive className="w-3.5 h-3.5 text-purple-400" />
                CONSERVATION LÉGALE
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-white/[0.08] text-white/70 text-[10px] font-mono">
                S-01 & S-02
              </span>
            </div>
            <div className="w-8 h-8 rounded-sm bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:bg-purple-500 group-hover:text-black transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="relative z-10 my-3">
            <h3 className="text-white font-extrabold text-lg sm:text-xl tracking-tight leading-snug group-hover:text-purple-200 transition-colors">
              Archives Physiques
            </h3>
            <p className="text-white/70 text-xs sm:text-sm font-normal mt-1 leading-relaxed">
              Arborescence spatiale : Salle → Rayon → Casier → Dossier. Cotes de conservation permanente et inventaires certifiés.
            </p>
          </div>

          <div className="relative z-10 pt-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300">
              <span className="px-2 py-0.5 rounded-xs bg-purple-500/15 border border-purple-500/30">Salle</span>
              <span className="text-white/40">→</span>
              <span className="px-2 py-0.5 rounded-xs bg-purple-500/15 border border-purple-500/30">Rayon</span>
              <span className="text-white/40">→</span>
              <span className="px-2 py-0.5 rounded-xs bg-purple-500/15 border border-purple-500/30">Casier</span>
              <span className="ml-auto text-[10px] text-emerald-400 font-sans flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cotes légales
              </span>
            </div>
          </div>
        </div>

        {/* BENTO CARD 3: SUIVI DES DOSSIERS / SORTIES PHYSIQUES (col-span-12 sm:col-span-6 lg:col-span-4) */}
        <div
          id="card-bento-suivi"
          onClick={() => {
            setActiveCardId('bento-suivi');
            playXboxSound('select');
            navigate('/suivi');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-suivi');
          }}
          className={`col-span-12 sm:col-span-6 lg:col-span-4 relative group cursor-pointer rounded-sm p-4 sm:p-5 flex flex-col justify-between h-48 bg-gradient-to-b from-[#1c1205] to-[#0a0702] transition-all duration-150 ${
            activeCardId === 'bento-suivi'
              ? 'border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.35)] ring-1 ring-amber-400/50'
              : 'border border-white/10 hover:border-amber-400/70'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-sm bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all">
              <ClipboardList className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
              TRAÇABILITÉ
            </span>
          </div>

          <div className="my-auto">
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors">
              Suivi des Dossiers & Sorties
            </h4>
            <p className="text-[11px] text-white/60 mt-1 leading-snug">
              Traçabilité des dossiers physiques sortis du casier : agent, service, motif et retour au casier.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-amber-400/90 font-mono">
            <span>Salle 02 → Agent → Retour</span>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* BENTO CARD 4: DÉPÔTS & INGESTION IA (col-span-12 sm:col-span-6 lg:col-span-4) */}
        <div
          id="card-bento-depots"
          onClick={() => {
            setActiveCardId('bento-depots');
            playXboxSound('select');
            navigate('/depots');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-depots');
          }}
          className={`col-span-12 sm:col-span-6 lg:col-span-4 relative group cursor-pointer rounded-sm p-4 sm:p-5 flex flex-col justify-between h-48 bg-gradient-to-b from-[#0b1b16] to-[#040c09] transition-all duration-150 ${
            activeCardId === 'bento-depots'
              ? 'border-2 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.35)] ring-1 ring-emerald-400/50'
              : 'border border-white/10 hover:border-emerald-400/70'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-sm bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all">
              <Inbox className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OCR IA
            </span>
          </div>

          <div className="my-auto">
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-200 transition-colors">
              Dépôts & Ingestion
            </h4>
            <p className="text-[11px] text-white/60 mt-1 leading-snug">
              Numérisation de pièces, reconnaissance OCR intelligente et bordereaux de versement aux archives.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-emerald-400/90 font-mono">
            <span>Versements & Scans</span>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* BENTO CARD 5: RECHERCHE UNIFIÉE (col-span-12 sm:col-span-6 lg:col-span-4) */}
        <div
          id="card-bento-recherche"
          onClick={() => {
            setActiveCardId('bento-recherche');
            playXboxSound('select');
            navigate('/recherche');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-recherche');
          }}
          className={`col-span-12 sm:col-span-6 lg:col-span-4 relative group cursor-pointer rounded-sm p-4 sm:p-5 flex flex-col justify-between h-48 bg-gradient-to-b from-[#081822] to-[#040b10] transition-all duration-150 ${
            activeCardId === 'bento-recherche'
              ? 'border-2 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.35)] ring-1 ring-teal-400/50'
              : 'border border-white/10 hover:border-teal-400/70'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-sm bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-black transition-all">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-teal-500/20 text-teal-300 border border-teal-500/30">
              INDEXÉ
            </span>
          </div>

          <div className="my-auto">
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-teal-200 transition-colors">
              Recherche Unifiée
            </h4>
            <p className="text-[11px] text-white/60 mt-1 leading-snug">
              Moteur transversal par cotes, personnes concernées, dates d'actes et plein texte OCR.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-teal-400/90 font-mono">
            <span>Index multi-critères</span>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* BENTO CARD 6: RAPPORTS & STATISTIQUES (col-span-12 sm:col-span-6 lg:col-span-6) */}
        <div
          id="card-bento-rapports"
          onClick={() => {
            setActiveCardId('bento-rapports');
            playXboxSound('select');
            navigate('/rapports');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-rapports');
          }}
          className={`col-span-12 sm:col-span-6 lg:col-span-6 relative group cursor-pointer rounded-sm p-4 sm:p-5 flex flex-col justify-between h-40 bg-gradient-to-b from-[#09151e] to-[#040a0f] transition-all duration-150 ${
            activeCardId === 'bento-rapports'
              ? 'border-2 border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.3)] ring-1 ring-sky-400/50'
              : 'border border-white/10 hover:border-sky-400/70'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-all">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-200 transition-colors">
                  Rapports & Statistiques
                </h4>
                <p className="text-[11px] text-white/60 mt-0.5">
                  Indicateurs d'archivage, volumétries versées et échéances de DUA.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
              MÉTRIQUES
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-sky-400 font-mono">
            <span>Pilotage réglementaire & DUA</span>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* BENTO CARD 7: ADMINISTRATION & PLAN DE CLASSEMENT (col-span-12 sm:col-span-6 lg:col-span-6) */}
        <div
          id="card-bento-admin"
          onClick={() => {
            setActiveCardId('bento-admin');
            playXboxSound('select');
            navigate('/administration');
          }}
          onMouseEnter={() => {
            playXboxSound('hover');
            setActiveCardId('bento-admin');
          }}
          className={`col-span-12 sm:col-span-6 lg:col-span-6 relative group cursor-pointer rounded-sm p-4 sm:p-5 flex flex-col justify-between h-40 bg-gradient-to-b from-[#14141e] to-[#08080f] transition-all duration-150 ${
            activeCardId === 'bento-admin'
              ? 'border-2 border-indigo-400 shadow-[0_0_18px_rgba(129,140,248,0.3)] ring-1 ring-indigo-400/50'
              : 'border border-white/10 hover:border-indigo-400/70'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-black transition-all">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                  Administration & Plan de Classement
                </h4>
                <p className="text-[11px] text-white/60 mt-0.5">
                  Gouvernance, communicabilité légale, habilitations et plan territorial.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              GOUVERNANCE
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] text-indigo-300 font-mono">
            <span>Règles de communicabilité</span>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </div>
        </div>

      </div>
    </section>
  );
}
