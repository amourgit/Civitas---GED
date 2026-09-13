import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  PanelLeft, 
  PanelLeftClose
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { XboxAudioController } from '../shared/XboxAudioController';
import { playXboxSound } from '../../utils/xboxAudio';

interface TopBarProps {
  onSearchClick: () => void;
  onNotificationClick: () => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  onQuickAction?: (actionName: string) => void;
}

/**
 * Xbox Sleek 3-Part TopBar:
 * 1. Left: Sidebar Control button + EGEN Ribbon Logo + Project Name
 * 2. Center: Free, unboxed navigation links ("Accueil", "Documents", "Numérisation", "Espaces", "Tâches", "Workflows")
 * 3. Right: Compact icon-only tools + Audio + Notifications + Avatar + Xbox Gamerscore/Time
 */
export function TopBar({
  onSearchClick,
  onNotificationClick,
  onToggleSidebar,
  isSidebarOpen = false,
  onQuickAction
}: TopBarProps) {
  const navigate = useNavigate();
  const [timeStr, setTimeStr] = useState("10:50");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // convert 0 to 12
      setTimeStr(`${hours}:${mins} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full max-w-full flex items-center justify-between px-3 sm:px-4 md:px-8 pt-1.5 sm:pt-2 md:pt-4 pb-1 md:pb-2 mt-0 sm:mt-0.5 z-30 bg-transparent border-none select-none overflow-hidden">
      {/* 1. GAUCHE: Bouton Sidebar + Logo + Nom du Projet */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Bouton de contrôle de la sidebar (toujours visible) */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={() => {
              playXboxSound('toggle');
              onToggleSidebar();
            }}
            className={`p-1.5 sm:p-2 rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center outline-none ${
              isSidebarOpen 
                ? 'bg-sky-500/25 text-sky-300 border border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.4)]' 
                : 'bg-white/[0.04] hover:bg-white/10 text-white/80 hover:text-white border border-white/[0.06]'
            }`}
            title={isSidebarOpen ? "Fermer le Guide Xbox (Sidebar)" : "Ouvrir le Guide Xbox (Sidebar)"}
            aria-label="Contrôle de la sidebar"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4 text-sky-400" />
            ) : (
              <PanelLeft className="w-4 h-4 text-white/90" />
            )}
          </button>
        )}

        {/* Logo EGEN Compact (Texte masqué sur mobile) */}
        <div 
          onClick={() => {
            playXboxSound('select');
            navigate('/');
          }}
          className="flex items-center gap-2 cursor-pointer group"
          title="Retour Accueil"
        >
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-105 duration-200" viewBox="0 0 50 50" fill="none">
              <path
                d="M14 20 C14 10, 36 10, 36 20 C36 28, 14 26, 14 36 C14 44, 36 44, 36 36"
                stroke="url(#egen-logo-grad)"
                strokeWidth="6"
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]"
              />
              <defs>
                <linearGradient id="egen-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Nom du projet compact (masqué en version mobile) */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-white font-black text-sm sm:text-base tracking-wider leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              EGEN
            </span>
            <span className="text-white/80 font-light text-xs sm:text-sm tracking-widest leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              DOCUMENTS
            </span>
          </div>
        </div>
      </div>

      {/* 2. DROITE: Options sous forme d'icônes compactes + Gamerscore / Heure */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Recherche Icon Button */}
        <button
          type="button"
          onClick={() => {
            playXboxSound('toggle');
            onSearchClick();
          }}
          className="p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Rechercher (Ctrl+K)"
          aria-label="Recherche"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Contrôleur Audio Xbox Compact */}
        <XboxAudioController />

        {/* Notification Bell Icon */}
        <button
          type="button"
          onClick={() => {
            playXboxSound('notification');
            onNotificationClick();
          }}
          className="relative p-1.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Notifications GED"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
          <span className="absolute top-0.5 right-0.5 min-w-[13px] h-[13px] px-0.5 flex items-center justify-center rounded-full bg-sky-400 text-black text-[8px] font-black shadow-[0_0_6px_rgba(56,189,248,0.9)]">
            3
          </span>
        </button>

        {/* User Avatar Circle */}
        <div 
          onClick={() => {
            playXboxSound('toggle');
            if (onQuickAction) onQuickAction('profile');
          }}
          className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.3)] shrink-0 bg-emerald-950/40 cursor-pointer hover:scale-105 transition-transform"
          title="Profil Amour Samuel NZILA NGALA"
        >
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Xbox Gamerscore / GED Level & Live Time (as shown on top right of Xbox OS in screenshot) */}
        <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 text-white/90">
          {/* Xbox Score pill (G 18294 / GED Score) */}
          <div className="hidden xl:flex items-center gap-1 text-[11px] font-bold font-mono text-white/75 tracking-tighter">
            <span className="w-3.5 h-3.5 rounded-full bg-white/15 text-white/90 text-[9px] flex items-center justify-center font-bold">
              G
            </span>
            <span>18294</span>
          </div>

          {/* Time Display */}
          <span className="text-white font-bold text-xs sm:text-sm tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            {timeStr}
          </span>
        </div>
      </div>
    </header>
  );
}
