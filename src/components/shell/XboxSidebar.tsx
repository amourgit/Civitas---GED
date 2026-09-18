import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Layers, 
  FileText, 
  Users, 
  Bell, 
  Gamepad2, 
  Share2, 
  Search, 
  Volume2, 
  ShoppingBag, 
  PanelLeftClose, 
  Folder, 
  FolderPlus,
  Sparkles,
  ArrowUpFromLine,
  CheckCircle2,
  HardDrive,
  Clock,
  Scan,
  MoreHorizontal,
  Landmark,
  ClipboardList
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export interface XboxSidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
  accent?: boolean;
}

export interface XboxSidebarSection {
  title?: string;
  items: XboxSidebarItem[];
}

export interface XboxSidebarProps {
  items?: XboxSidebarItem[];
  sections?: XboxSidebarSection[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome?: () => void;
  onNavigateDossiers?: () => void;
  onNavigateDocuments?: () => void;
  onNavigateSuivi?: () => void;
  onNavigateIngestion?: () => void;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onCreateFolder?: () => void;
}

/**
 * Xbox Guide Modal Sidebar
 * Exactly matching the Xbox OS Guide overlay design:
 * - Floating dark rounded modal with comfortable screen margins
 * - Smooth slide animated open/close transition via motion/react
 * - Top tab icon bar with glowing active tab line
 * - Selected item with bright Xbox blue/cyan highlight frame
 * - Recent games / documents activity list with thumbnails & live progress bar
 * - Bottom quick-access action buttons
 */
export function XboxSidebar({
  items,
  sections,
  activeId,
  onSelect,
  isOpen,
  onClose,
  onNavigateHome,
  onNavigateDossiers,
  onNavigateDocuments,
  onNavigateSuivi,
  onNavigateIngestion,
  onOpenSearch,
  onOpenNotifications,
  onCreateFolder
}: XboxSidebarProps) {
  const [activeGuideTab, setActiveGuideTab] = useState<'home' | 'people' | 'messages' | 'activity' | 'share' | 'profile'>('home');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Dimmer Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 cursor-pointer"
            onClick={() => {
              playXboxSound('back');
              onClose();
            }}
            aria-label="Fermer le guide"
          />

          {/* Xbox Guide Floating Modal - Positioned with comfortable screen margins & smooth animation */}
          <motion.aside 
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-3 bottom-3 left-3 sm:top-5 sm:bottom-5 sm:left-5 w-[calc(100vw-2rem)] max-w-[340px] sm:max-w-[360px] md:max-w-[380px] bg-[#181a1f]/98 backdrop-blur-3xl text-white rounded-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-50 flex flex-col justify-between overflow-hidden select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Xbox Guide GED"
          >
        {/* TOP ROW: Guide Horizontal Tab Icons with active blue indicator line */}
        <div className="pt-3 px-4 border-b border-white/[0.08] bg-black/20 shrink-0">
          <div className="flex items-center justify-between pb-2">
            {/* Tab 1: Xbox / EGEN Guide Home */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('select');
                setActiveGuideTab('home');
              }}
              className="relative p-2 text-white hover:text-sky-400 transition-colors flex flex-col items-center cursor-pointer group"
              title="Guide Accueil"
            >
              {/* EGEN Xbox Icon */}
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white group-hover:text-sky-400 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.2c2.4 0 4.54.98 6.08 2.56-1.57 1.83-4.27 3.32-6.08 3.52-1.81-.2-4.51-1.69-6.08-3.52C7.46 5.18 9.6 4.2 12 4.2zm-7.6 7.8c0-1.87.64-3.59 1.72-4.96 1.48 1.94 4.09 3.58 5.88 3.96v5.8c-4.24-.48-7.6-4.08-7.6-4.8zm9.6 4.8v-5.8c1.79-.38 4.4-2.02 5.88-3.96 1.08 1.37 1.72 3.09 1.72 4.96 0 .72-3.36 4.32-7.6 4.8z" />
                </svg>
              </div>
              {activeGuideTab === 'home' && (
                <span className="absolute -bottom-2 left-1 right-1 h-[3px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
              )}
            </button>

            {/* Tab 2: People / Contacts */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setActiveGuideTab('people');
              }}
              className="relative p-2 text-white/70 hover:text-white transition-colors flex flex-col items-center cursor-pointer"
              title="Amis & Collaborateurs"
            >
              <Users className="w-5 h-5" />
              {activeGuideTab === 'people' && (
                <span className="absolute -bottom-2 left-1 right-1 h-[3px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
              )}
            </button>

            {/* Tab 3: Messages / Chat with Badge */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('notification');
                setActiveGuideTab('messages');
                if (onOpenNotifications) onOpenNotifications();
              }}
              className="relative p-2 text-white/70 hover:text-white transition-colors flex flex-col items-center cursor-pointer"
              title="Notifications & Discussions"
            >
              <div className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 flex items-center justify-center rounded-full bg-sky-400 text-black text-[9px] font-black shadow-[0_0_6px_rgba(56,189,248,0.9)]">
                  2
                </span>
              </div>
              {activeGuideTab === 'messages' && (
                <span className="absolute -bottom-2 left-1 right-1 h-[3px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
              )}
            </button>

            {/* Tab 4: Controller / Workflows */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setActiveGuideTab('activity');
              }}
              className="relative p-2 text-white/70 hover:text-white transition-colors flex flex-col items-center cursor-pointer"
              title="Activité & Processus"
            >
              <Gamepad2 className="w-5 h-5" />
              {activeGuideTab === 'activity' && (
                <span className="absolute -bottom-2 left-1 right-1 h-[3px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
              )}
            </button>

            {/* Tab 5: Share / Ingestion */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setActiveGuideTab('share');
                if (onNavigateIngestion) {
                  onNavigateIngestion();
                  onClose();
                }
              }}
              className="relative p-2 text-white/70 hover:text-white transition-colors flex flex-col items-center cursor-pointer"
              title="Partage & Numérisation"
            >
              <ArrowUpFromLine className="w-5 h-5" />
              {activeGuideTab === 'share' && (
                <span className="absolute -bottom-2 left-1 right-1 h-[3px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
              )}
            </button>

            {/* Tab 6: User Avatar */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setActiveGuideTab('profile');
              }}
              className="relative p-1.5 flex flex-col items-center cursor-pointer group"
              title="Profil Utilisateur"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-400/60 shadow-[0_0_8px_rgba(245,158,11,0.5)] bg-amber-950/40">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Avatar"
                  className="w-full h-full object-cover" 
                />
              </div>
              {activeGuideTab === 'profile' && (
                <span className="absolute -bottom-2 left-1 right-1 h-[3px] bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Contextual Actions Hints (matching "(X) Share last capture, (=) More options") */}
        <div className="px-4 py-2 flex items-center justify-between text-xs text-white/60 border-b border-white/[0.04]">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors" onClick={onNavigateIngestion}>
            <span className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[9px] font-mono font-bold text-white/80">
              X
            </span>
            <span>Numériser un fichier</span>
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors" onClick={onOpenSearch}>
            <span className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center text-[9px] font-mono font-bold text-white/80">
              Y
            </span>
            <span>Rechercher</span>
          </div>
        </div>

        {/* SCROLLABLE GUIDE BODY */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 scrollbar-thin scrollbar-thumb-white/10">
          {/* 1. PRIMARY FOCUSED ITEM: HOME (Prominent glowing outline as in reference image) */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              if (onNavigateHome) onNavigateHome();
              else onSelect('accueil');
              onClose();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-150 cursor-pointer text-left ${
              activeId === 'accueil'
                ? 'bg-sky-500/20 text-white border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.35)] ring-1 ring-sky-300/40'
                : 'bg-white/[0.05] hover:bg-white/10 text-white/90 border border-transparent hover:border-white/20'
            }`}
          >
            <Home className="w-5 h-5 text-white shrink-0" />
            <span className="text-base font-medium tracking-wide">Tableau de bord</span>
          </button>

          {/* 1.B PRIMARY FOCUSED ITEM: DOSSIERS MÉTIER */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              if (onNavigateDossiers) onNavigateDossiers();
              else onSelect('dossiers');
              onClose();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer text-left ${
              activeId === 'dossiers'
                ? 'bg-sky-500/20 text-white border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                : 'bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white border border-transparent'
            }`}
          >
            <FileText className="w-5 h-5 text-sky-400 shrink-0" />
            <span className="text-sm font-medium tracking-wide flex-1">Dossiers métier</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 font-bold">
              Actif
            </span>
          </button>

          {/* 2. SECONDARY ITEM: MY GAMES & APPS / DOCUMENTS & DOSSIERS */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              if (onNavigateDocuments) onNavigateDocuments();
              else onSelect('documents');
              onClose();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer text-left ${
              activeId === 'documents'
                ? 'bg-sky-500/20 text-white border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.35)]'
                : 'bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white border border-transparent'
            }`}
          >
            {/* Books/Folders icon */}
            <Layers className="w-5 h-5 text-white/70 shrink-0" />
            <span className="text-sm font-medium tracking-wide flex-1">Mes documents & dossiers</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white/60">
              GED
            </span>
          </button>

          {/* 2.B SUIVI DES DOSSIERS */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              if (onNavigateSuivi) onNavigateSuivi();
              else onSelect('suivi');
              onClose();
            }}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-150 cursor-pointer text-left ${
              activeId === 'suivi'
                ? 'bg-amber-500/20 text-white border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                : 'bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white border border-transparent'
            }`}
          >
            <ClipboardList className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-sm font-medium tracking-wide flex-1">Suivi des dossiers</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold">
              Traçabilité
            </span>
          </button>

          {/* 3. RECENT ACTIVITY LIST (Items with square thumbnails as in image) */}
          <div className="pt-2 space-y-1.5">
            {/* Item 1: Active Dossier / Music */}
            <div 
              onClick={() => {
                playXboxSound('select');
                if (onNavigateDocuments) onNavigateDocuments();
                onClose();
              }}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-transparent hover:border-white/10 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&auto=format&fit=crop&q=80" 
                  alt="Factures"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate group-hover:text-sky-300">
                  Factures & Comptabilité 2026
                </div>
                <div className="text-[11px] text-white/40 truncate">
                  8 documents en attente • DG
                </div>
              </div>
              <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 opacity-80" />
            </div>

            {/* Item 2: Ori-like colorful cover (Dossier RH) */}
            <div 
              onClick={() => {
                playXboxSound('select');
                if (onNavigateDocuments) onNavigateDocuments();
                onClose();
              }}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-transparent hover:border-white/10 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80" 
                  alt="RH"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate group-hover:text-sky-300">
                  Ressources Humaines & Contrats
                </div>
                <div className="text-[11px] text-white/40 truncate">
                  14 fichiers RH récents
                </div>
              </div>
            </div>

            {/* Item 3: Cyberpunk style item WITH INSTALLING / OCR PROGRESS BAR (identical to image!) */}
            <div 
              onClick={() => {
                playXboxSound('select');
                if (onNavigateIngestion) onNavigateIngestion();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-sky-950/20 border border-sky-500/20 hover:border-sky-400/40 transition-colors cursor-pointer group space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center shadow-md">
                  <Scan className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate group-hover:text-yellow-300">
                    Numérisation & Indexation OCR
                  </div>
                  <div className="text-[11px] text-sky-400 font-mono flex items-center justify-between">
                    <span>Indexation en cours...</span>
                    <span className="font-bold">43%</span>
                  </div>
                </div>
              </div>
              {/* Progress bar matching image */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[43%] h-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all duration-500" />
              </div>
            </div>

            {/* Item 4: Gears 5 style item (Marchés Publics) */}
            <div 
              onClick={() => {
                playXboxSound('select');
                if (onNavigateDocuments) onNavigateDocuments();
                onClose();
              }}
              className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-transparent hover:border-white/10 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80" 
                  alt="Projets"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate group-hover:text-sky-300">
                  Marchés Publics & Projets
                </div>
                <div className="text-[11px] text-white/40 truncate">
                  6 sous-dossiers actifs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TOOLBAR OF GUIDE (Identical to bottom row in reference image) */}
        <div className="p-3 bg-white/[0.03] border-t border-white/[0.08] shrink-0 overflow-visible">
          <div className="grid grid-cols-5 gap-1.5 overflow-visible">
            {/* Button 1: Notification Bell */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('notification');
                if (onOpenNotifications) onOpenNotifications();
                onClose();
              }}
              className="relative p-2.5 rounded-xl bg-transparent hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer overflow-visible"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[#E41E3F] text-white text-[9px] font-bold flex items-center justify-center shadow-md ring-1 ring-white/30 z-30">
                3
              </span>
            </button>

            {/* Button 2: GAME PASS / GED Badge */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('select');
                if (onNavigateDocuments) onNavigateDocuments();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-transparent hover:bg-white/10 text-white/90 hover:text-white flex flex-col items-center justify-center transition-colors cursor-pointer font-bold leading-tight overflow-visible"
              title="Pass GED Enterprise"
            >
              <span className="text-[9px] tracking-tighter text-sky-400">EGEN</span>
              <span className="text-[9px] tracking-widest text-white/70">GED</span>
            </button>

            {/* Button 3: Store / Espaces partagés */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                if (onCreateFolder) onCreateFolder();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-transparent hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer overflow-visible"
              title="Nouveau dossier"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            {/* Button 4: Search */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                if (onOpenSearch) onOpenSearch();
                onClose();
              }}
              className="p-2.5 rounded-xl bg-transparent hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer overflow-visible"
              title="Recherche"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Button 5: Audio Volume */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
              }}
              className="p-2.5 rounded-xl bg-transparent hover:bg-white/10 text-white/80 hover:text-emerald-400 flex items-center justify-center transition-colors cursor-pointer overflow-visible"
              title="Effets sonores Xbox"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>
  );
}
