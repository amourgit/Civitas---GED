import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Home, 
  CirclePlus, 
  Settings, 
  LayoutGrid, 
  Globe, 
  Check, 
  ExternalLink,
  FileText,
  Users,
  Building2,
  Leaf,
  Briefcase,
  FolderOpen,
  Calendar,
  Layers,
  Sparkles,
  MessageSquare,
  Mail,
  Cloud,
  X,
  Menu,
  Star,
  Zap,
  ShieldCheck,
  User,
  SlidersHorizontal,
  Bookmark,
  Radio,
  Lock,
  Compass,
  PanelLeft,
  PanelLeftClose,
  Bell,
  Scan,
  CheckSquare,
  GitFork,
  Plus,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XboxAudioController } from '../shared/XboxAudioController';
import { playXboxSound } from '../../utils/xboxAudio';

export interface SupremeIntranetTopBarProps {
  // Global Intranet Props (Level 1)
  onOpenGlobalSearch?: () => void;
  onOpenGED?: () => void;
  currentAppName?: string;
  onShowNotification?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;

  // Extensible Application Tier Props (Level 2)
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onQuickAction?: (actionName: string) => void;

  // Extensible Slots for Custom Application Extensions
  appSlotLeft?: React.ReactNode;
  appSlotCenter?: React.ReactNode;
  appSlotRight?: React.ReactNode;
  appBadge?: string;
  appBreadcrumb?: string;
}

export function SupremeIntranetTopBar({
  onOpenGlobalSearch,
  onOpenGED,
  currentAppName = "EGEN GED Documents",
  onShowNotification,
  onToggleSidebar,
  isSidebarOpen = false,
  onSearchClick,
  onNotificationClick,
  onQuickAction,
  appSlotLeft,
  appSlotCenter,
  appSlotRight,
  appBadge,
  appBreadcrumb
}: SupremeIntranetTopBarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<'English' | 'Français' | 'Español' | 'Deutsch'>('English');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeStr, setTimeStr] = useState("10:50");
  const [dateLongStr, setDateLongStr] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Live time ticker & long date for App Tier
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      setTimeStr(`${displayHours}:${mins} ${ampm}`);

      const formattedDate = now.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setDateLongStr(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Determine current active route in GED
  const currentAppRoute = React.useMemo(() => {
    const path = location.pathname;
    if (path === '/' || path === '/accueil') return 'accueil';
    if (
      path.startsWith('/documentation') ||
      path === '/salles' || 
      path === '/documents' || 
      path.startsWith('/salle') || 
      path.startsWith('/rayon') || 
      path.startsWith('/casier') || 
      path.startsWith('/dossier')
    ) return 'documentation';
    if (path === '/ingestion') return 'ingestion';
    if (path === '/espaces') return 'espaces';
    if (path === '/taches') return 'taches';
    if (path === '/workflows') return 'workflows';
    return 'accueil';
  }, [location.pathname]);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMenuClick = (menuName: string) => {
    playXboxSound('toggle');
    setActiveMenu(prev => prev === menuName ? null : menuName);
  };

  const toggleMobileCategory = (cat: string) => {
    playXboxSound('toggle');
    setExpandedMobileCategory(prev => prev === cat ? null : cat);
  };

  const notify = (msg: string) => {
    playXboxSound('select');
    if (onShowNotification) {
      onShowNotification(msg, 'info');
    }
  };

  return (
    <div ref={menuRef} className="w-full shrink-0 z-50 select-none relative font-sans text-slate-800 overflow-visible">
      {/* 1. SUPREME TOPBAR: EXACT POWELL SOFTWARE LIGHT INTRANET TOPBAR */}
      <header className="w-full bg-white border-b border-slate-200/80 px-2 sm:px-4 md:px-6 lg:px-7 h-12 flex items-center justify-between shadow-xs transition-colors overflow-visible">
        
        {/* LEFT SECTION: Hamburger (Mobile/Tablet) + Logo & Brand + Desktop Navigation Links */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 h-full min-w-0 overflow-visible">
          
          {/* Mobile / Tablet Menu Button (Visible on < lg screens) */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('toggle');
              setIsMobileMenuOpen(prev => !prev);
            }}
            className="lg:hidden p-1.5 -ml-1 text-slate-600 hover:text-[#008080] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center"
            title="Menu Intranet"
            aria-label="Menu Intranet"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Powell Software 4-Petal Pinwheel Logo */}
          <div 
            onClick={() => {
              playXboxSound('select');
              notify("Portail Intranet Powell Software");
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 py-1 group overflow-visible"
            title="Powell Software Intranet Supreme"
          >
            {/* Exact 4-Petal Pinwheel Vector Logo */}
            <div className="w-6.5 h-6.5 sm:w-8 sm:h-8 shrink-0 relative flex items-center justify-center overflow-visible">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full drop-shadow-xs transition-transform duration-200 group-hover:scale-105 overflow-visible"
                fill="none"
              >
                {/* Top petal: deep purple */}
                <path 
                  d="M50 50 C50 32, 38 16, 26 24 C14 32, 28 50, 50 50 Z" 
                  fill="#472C5B" 
                />
                {/* Right petal: coral red */}
                <path 
                  d="M50 50 C68 50, 84 38, 76 26 C68 14, 50 28, 50 50 Z" 
                  fill="#F25F4C" 
                />
                {/* Bottom petal: bright magenta pink */}
                <path 
                  d="M50 50 C50 68, 62 84, 74 76 C86 68, 72 50, 50 50 Z" 
                  fill="#C42662" 
                />
                {/* Left petal: vibrant teal cyan */}
                <path 
                  d="M50 50 C32 50, 16 62, 24 74 C32 86, 50 72, 50 50 Z" 
                  fill="#00A499" 
                />
              </svg>
            </div>

            {/* Brand Typography */}
            <div className="flex items-center gap-1 sm:gap-1.5 tracking-tight">
              <span className="text-[#1e293b] font-bold text-xs sm:text-sm md:text-base leading-none">
                Powell
              </span>
              <span className="text-[#475569] font-normal text-xs sm:text-sm md:text-base leading-none">
                Software
              </span>
            </div>
          </div>

          {/* Intranet Navigation Links (Visible on desktop & large tablets lg+) */}
          <nav className="hidden lg:flex items-center gap-1 lg:gap-2.5 xl:gap-3.5 h-full text-[13px] font-medium text-[#334155]">
            
            {/* Home Link with Chevron */}
            <div className="relative h-full flex items-center">
              <button
                type="button"
                onClick={() => handleMenuClick('home')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors cursor-pointer bg-transparent border-none text-[#334155] hover:text-[#008080] ${
                  activeMenu === 'home' ? 'text-[#008080] font-semibold' : ''
                }`}
              >
                <span>Home</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'home' ? 'rotate-180 text-[#008080]' : ''}`} />
              </button>

              {/* Home Dropdown Menu */}
              {activeMenu === 'home' && (
                <div className="absolute top-11 left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Accueil Global
                  </div>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Fil d'actualité intranet"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Actualités de l'entreprise</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Événements et plannings"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Calendrier général</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Documents récents"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Dernières publications</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                </div>
              )}
            </div>

            {/* Mon espace Link with Chevron (Extranet, Public, Cellule, Personnel) */}
            <div className="relative h-full flex items-center">
              <button
                type="button"
                onClick={() => handleMenuClick('monespace')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors cursor-pointer bg-transparent border-none text-[#334155] hover:text-[#008080] ${
                  activeMenu === 'monespace' ? 'text-[#008080] font-semibold' : ''
                }`}
              >
                <span>Mon espace</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'monespace' ? 'rotate-180 text-[#008080]' : ''}`} />
              </button>

              {/* Mon Espace Dropdown Menu */}
              {activeMenu === 'monespace' && (
                <div className="absolute top-11 left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Espaces de travail
                  </div>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Accès à l'Extranet Partenaires"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-sky-500" />
                      <span className="font-medium">Extranet</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Partenaires</span>
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Accès à l'Espace Public"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Radio className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium">Public</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Diffusion</span>
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Accès à l'Espace Cellule"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-purple-500" />
                      <span className="font-medium">Cellule</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Équipe</span>
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Accès à l'Espace Personnel"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-teal-600" />
                      <span className="font-medium">Personnel</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Privé</span>
                  </button>
                </div>
              )}
            </div>

            {/* Administration Link with Chevron */}
            <div className="relative h-full flex items-center">
              <button
                type="button"
                onClick={() => handleMenuClick('administration')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors cursor-pointer bg-transparent border-none text-[#334155] hover:text-[#008080] ${
                  activeMenu === 'administration' ? 'text-[#008080] font-semibold' : ''
                }`}
              >
                <span>Administration</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'administration' ? 'rotate-180 text-[#008080]' : ''}`} />
              </button>

              {/* Administration Dropdown Menu */}
              {activeMenu === 'administration' && (
                <div className="absolute top-11 left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Gestion & Contrôle
                  </div>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Gestion des utilisateurs et rôles"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Utilisateurs & Rôles</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Gestion des droits d'accès et sécurité"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Droits & Sécurité</span>
                    <Lock className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Journaux d'audit et flux d'archivage"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Journaux d'audit & Flux</span>
                    <FileText className="w-3.5 h-3.5 text-sky-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Configuration globale du système"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Configuration Système</span>
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              )}
            </div>

            {/* Raccourci Link with Chevron */}
            <div className="relative h-full flex items-center">
              <button
                type="button"
                onClick={() => handleMenuClick('raccourci')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors cursor-pointer bg-transparent border-none text-[#334155] hover:text-[#008080] ${
                  activeMenu === 'raccourci' ? 'text-[#008080] font-semibold' : ''
                }`}
              >
                <span>Raccourci</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'raccourci' ? 'rotate-180 text-[#008080]' : ''}`} />
              </button>

              {/* Raccourci Dropdown Menu */}
              {activeMenu === 'raccourci' && (
                <div className="absolute top-11 left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Accès Rapide
                  </div>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Accès rapide aux bordereaux en cours"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Bordereaux en cours</span>
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Recherche d'archives express"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Recherche Express</span>
                    <Search className="w-3.5 h-3.5 text-[#008080]" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Documents récents"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Documents récents</span>
                    <FolderOpen className="w-3.5 h-3.5 text-teal-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Scanner & Import rapide"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Scanner & Import</span>
                    <CirclePlus className="w-3.5 h-3.5 text-emerald-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Favori Link with Chevron */}
            <div className="relative h-full flex items-center">
              <button
                type="button"
                onClick={() => handleMenuClick('favori')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors cursor-pointer bg-transparent border-none text-[#334155] hover:text-[#008080] ${
                  activeMenu === 'favori' ? 'text-[#008080] font-semibold' : ''
                }`}
              >
                <span>Favori</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'favori' ? 'rotate-180 text-[#008080]' : ''}`} />
              </button>

              {/* Favori Dropdown Menu */}
              {activeMenu === 'favori' && (
                <div className="absolute top-11 left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Mes Favoris
                  </div>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Dossiers et séries épinglés"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Dossiers épinglés</span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Bordereaux suivis"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Bordereaux suivis</span>
                    <Bookmark className="w-3.5 h-3.5 text-emerald-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Modèles types et fiches d'archivage"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Modèles types</span>
                    <FileText className="w-3.5 h-3.5 text-sky-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Espaces favoris"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Espaces favoris</span>
                    <Compass className="w-3.5 h-3.5 text-purple-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Paramètre Link with Chevron */}
            <div className="relative h-full flex items-center">
              <button
                type="button"
                onClick={() => handleMenuClick('parametre')}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors cursor-pointer bg-transparent border-none text-[#334155] hover:text-[#008080] ${
                  activeMenu === 'parametre' ? 'text-[#008080] font-semibold' : ''
                }`}
              >
                <span>Paramètre</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'parametre' ? 'rotate-180 text-[#008080]' : ''}`} />
              </button>

              {/* Paramètre Dropdown Menu */}
              {activeMenu === 'parametre' && (
                <div className="absolute top-11 left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Préférences & Réglages
                  </div>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Préférences d'affichage et thèmes"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Affichage & Thème</span>
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Notifications et alertes de suivi"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Alertes & Notifications</span>
                    <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Langue et formats régionaux"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Langue & Formats</span>
                    <Globe className="w-3.5 h-3.5 text-sky-500" />
                  </button>
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Workflows et circuits de validation"); }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer"
                  >
                    <span>Workflows de validation</span>
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  </button>
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* RIGHT SECTION: Minimal Dimension Buttons without background (Free text/icons) */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-3.5 shrink-0 overflow-visible">
          
          {/* 1. Search Icon Button (Free, minimal) */}
          <div className="relative overflow-visible">
            <button
              type="button"
              onClick={() => {
                if (onOpenGlobalSearch) {
                  onOpenGlobalSearch();
                } else {
                  setIsSearchOpen(prev => !prev);
                  playXboxSound('toggle');
                }
              }}
              className="p-1 sm:p-1.5 text-slate-500 hover:text-[#008080] transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center overflow-visible"
              title="Rechercher dans tout l'intranet"
              aria-label="Recherche Intranet"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
            </button>

            {/* Quick search input popup for mobile & tablet (Responsive width) */}
            {isSearchOpen && (
              <div className="fixed sm:absolute inset-x-2 top-12 sm:top-9 sm:inset-auto sm:right-0 w-[calc(100vw-16px)] sm:w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-2.5 z-50 flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Rechercher sur l'intranet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      notify(`Recherche : ${searchQuery}`);
                      setIsSearchOpen(false);
                    }
                  }}
                  autoFocus
                  className="w-full text-xs text-slate-800 focus:outline-none bg-transparent"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer bg-transparent border-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* 2. Language Selector (Hidden label on very small screens, responsive popup) */}
          <div className="relative overflow-visible">
            <button
              type="button"
              onClick={() => handleMenuClick('lang')}
              className="flex items-center gap-0.5 sm:gap-1 text-[12px] sm:text-[13px] font-medium text-slate-600 hover:text-[#008080] transition-colors cursor-pointer bg-transparent border-none px-1 py-1 overflow-visible"
              title="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5 sm:hidden text-slate-500" />
              <span className="hidden sm:inline">{currentLang}</span>
              <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'lang' ? 'rotate-180 text-[#008080]' : ''}`} />
            </button>

            {/* Language Dropdown */}
            {activeMenu === 'lang' && (
              <div className="absolute right-0 top-9 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in duration-150">
                {(['English', 'Français', 'Español', 'Deutsch'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setActiveMenu(null);
                      notify(`Langue changée : ${lang}`);
                    }}
                    className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center justify-between cursor-pointer bg-transparent border-none"
                  >
                    <span>{lang}</span>
                    {currentLang === lang && <Check className="w-3.5 h-3.5 text-[#008080]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Subtle Vertical Separator Line */}
          <div className="h-4 sm:h-4.5 w-px bg-slate-300/80 mx-0.5" />

          {/* 4. App Launcher Grid Icon with Red Facebook-style Floating Notification Badge "2" */}
          <div className="relative overflow-visible flex items-center">
            <button
              type="button"
              onClick={() => handleMenuClick('appLauncher')}
              className="relative p-1 text-[#008080] hover:text-emerald-700 transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center overflow-visible group"
              title="Lanceur d'applications de l'intranet"
              aria-label="Lanceur d'applications"
            >
              {/* 4-square grid / Waffle icon in teal */}
              <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 flex flex-wrap gap-0.5 items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 rounded-[2px] bg-[#008080] group-hover:bg-emerald-700 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-[2px] bg-[#008080] group-hover:bg-emerald-700 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-[2px] bg-[#008080] group-hover:bg-emerald-700 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-[2px] bg-[#008080] group-hover:bg-emerald-700 transition-colors" />
              </div>

              {/* Red Badge "2" - Facebook notification style (Unclipped, perfectly floating at top right) */}
              <span className="absolute -top-1.5 -right-2 bg-[#E41E3F] text-white text-[9px] sm:text-[10px] font-bold min-w-[16px] sm:min-w-[17px] h-[16px] sm:h-[17px] px-1 rounded-full flex items-center justify-center shadow-md ring-2 ring-white leading-none pointer-events-none z-30">
                2
              </span>
            </button>

            {/* App Launcher Drawer / Dropdown (Responsive width on mobile) */}
            {activeMenu === 'appLauncher' && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-16px)] sm:w-80 max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 sm:p-4 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                  <span className="font-semibold text-sm text-slate-800">Applications Intranet</span>
                  <span className="text-[10px] sm:text-[11px] bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded-full border border-emerald-200">
                    Suite Connectée
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {/* Current GED App (Highlighted) */}
                  <button 
                    onClick={() => {
                      setActiveMenu(null);
                      if (onOpenGED) onOpenGED();
                      notify("Application GED EGEN Documents active");
                    }}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-400/40 text-emerald-800 hover:bg-emerald-500/20 transition-all cursor-pointer group/app text-center overflow-visible"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-xs mb-1.5">
                      <FolderOpen className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-semibold text-[11px] leading-tight line-clamp-1">GED Docs</span>
                    <span className="text-[9px] text-emerald-600 font-medium">Actif</span>
                  </button>

                  {/* Teams */}
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Ouverture de Microsoft Teams"); }}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-center bg-transparent"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#464EB8] flex items-center justify-center text-white shadow-xs mb-1.5">
                      <MessageSquare className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-medium text-[11px] text-slate-700 leading-tight">MS Teams</span>
                    <span className="text-[9px] text-slate-400">Collaboration</span>
                  </button>

                  {/* Outlook */}
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Ouverture de Microsoft Outlook"); }}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-center bg-transparent"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0078D4] flex items-center justify-center text-white shadow-xs mb-1.5">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-medium text-[11px] text-slate-700 leading-tight">Outlook</span>
                    <span className="text-[9px] text-slate-400">Messagerie</span>
                  </button>

                  {/* OneDrive */}
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Ouverture de OneDrive Cloud"); }}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-center bg-transparent"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0078D4] flex items-center justify-center text-white shadow-xs mb-1.5">
                      <Cloud className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-medium text-[11px] text-slate-700 leading-tight">OneDrive</span>
                    <span className="text-[9px] text-slate-400">Stockage</span>
                  </button>

                  {/* HR Portal */}
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Portail RH Laura Denvida"); }}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-center bg-transparent"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#D83B01] flex items-center justify-center text-white shadow-xs mb-1.5">
                      <Briefcase className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-medium text-[11px] text-slate-700 leading-tight">Portail RH</span>
                    <span className="text-[9px] text-slate-400">Carrières</span>
                  </button>

                  {/* Intranet V2 */}
                  <button 
                    onClick={() => { setActiveMenu(null); notify("Intranet V2 Dashboard"); }}
                    className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer text-center bg-transparent"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#008080] flex items-center justify-center text-white shadow-xs mb-1.5">
                      <Layers className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-medium text-[11px] text-slate-700 leading-tight">Intranet V2</span>
                    <span className="text-[9px] text-slate-400">Portail</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. Plus / Create Icon */}
          <div className="relative overflow-visible">
            <button
              type="button"
              onClick={() => handleMenuClick('create')}
              className="p-1 text-[#008080] hover:text-emerald-700 transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center overflow-visible"
              title="Créer un nouveau contenu ou document"
              aria-label="Créer"
            >
              <CirclePlus className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>

            {/* Create Dropdown */}
            {activeMenu === 'create' && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-24px)] sm:w-56 max-w-xs bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs animate-in fade-in duration-150">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Nouveau contenu
                </div>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Création de nouveau dossier GED"); }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center gap-2 cursor-pointer bg-transparent border-none"
                >
                  <FolderOpen className="w-4 h-4 text-emerald-500" />
                  <span>Nouveau Dossier GED</span>
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Téléversement de fichier"); }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center gap-2 cursor-pointer bg-transparent border-none"
                >
                  <FileText className="w-4 h-4 text-cyan-500" />
                  <span>Importer un Document</span>
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Nouvelle publication sur My Board"); }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] flex items-center gap-2 cursor-pointer bg-transparent border-none"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Nouvelle Publication</span>
                </button>
              </div>
            )}
          </div>

          {/* 6. Settings Gear Icon */}
          <div className="relative overflow-visible">
            <button
              type="button"
              onClick={() => handleMenuClick('settings')}
              className="p-1 text-slate-500 hover:text-[#008080] transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center overflow-visible"
              title="Paramètres de l'intranet"
              aria-label="Paramètres"
            >
              <Settings className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
            </button>

            {/* Settings Dropdown */}
            {activeMenu === 'settings' && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-24px)] sm:w-52 max-w-xs bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in duration-150">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Configuration
                </div>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Préférences d'affichage"); }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] cursor-pointer bg-transparent border-none"
                >
                  Préférences d'affichage
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Paramètres de sécurité & accès"); }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] cursor-pointer bg-transparent border-none"
                >
                  Permissions & Sécurité
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("À propos de Powell Intranet v4.2"); }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] cursor-pointer bg-transparent border-none"
                >
                  À propos de Powell Intranet
                </button>
              </div>
            )}
          </div>

          {/* 7. Profil Utilisateur (Taille harmonisée avec les autres icônes, cliquable avec popup animée) */}
          <div className="relative overflow-visible flex items-center">
            <button
              type="button"
              onClick={() => handleMenuClick('profile')}
              className="w-6 h-6 rounded-full overflow-hidden border border-slate-300 hover:border-[#008080] shadow-2xs shrink-0 bg-slate-100 ml-0.5 sm:ml-1 cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-[#008080]/25 flex items-center justify-center p-0 focus:outline-none aspect-square"
              title="Profil Utilisateur"
              aria-label="Menu Profil"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-full aspect-square block pointer-events-none"
              />
            </button>

            {/* Popup Profil avec animation fluide */}
            <AnimatePresence>
              {activeMenu === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-24px)] sm:w-64 max-w-xs bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 z-50 text-xs origin-top-right"
                >
                  <div className="flex items-center gap-3 pb-3 mb-2.5 border-b border-slate-100">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-xs aspect-square">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                        alt="Avatar" 
                        className="w-full h-full object-cover rounded-full aspect-square"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-xs truncate">Laura Denvida</p>
                      <p className="text-[11px] text-slate-400 truncate">HR Manager • Paris</p>
                      <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 text-[9px] font-medium border border-emerald-100">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                        Connecté
                      </span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Accès au profil complet"); }}
                      className="w-full text-left px-2.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2.5 transition-colors font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mon profil complet</span>
                    </button>
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Préférences du compte"); }}
                      className="w-full text-left px-2.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2.5 transition-colors"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      <span>Préférences & Compte</span>
                    </button>
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Favoris & signets"); }}
                      className="w-full text-left px-2.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2.5 transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>Mes favoris GED</span>
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Déconnexion du portail intranet"); }}
                      className="w-full text-left px-2.5 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2.5 transition-colors font-medium text-xs"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </header>

      {/* 2. DEUXIÈME NIVEAU (INFÉRIEUR) : TOPBAR EXTENSIBLE DE L'APPLICATION ACTIVE (GED / EGEN) */}
      <div className="w-full bg-[#070d14]/95 backdrop-blur-md border-b border-white/[0.08] text-white px-2 sm:px-4 md:px-6 lg:px-7 h-12 flex items-center justify-between shadow-md transition-all overflow-visible z-40 relative">
        
        {/* ZONE GAUCHE : Sidebar Toggle + Logo/App Identity + Status Badge + Slot Extensible Gauche */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 overflow-visible">
          {/* Bouton de contrôle Sidebar / Guide Xbox */}
          {onToggleSidebar && (
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                onToggleSidebar();
              }}
              className={`p-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-center outline-none ${
                isSidebarOpen 
                  ? 'bg-sky-500/25 text-sky-300 border border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.4)]' 
                  : 'bg-white/[0.04] hover:bg-white/10 text-white/80 hover:text-white border border-white/[0.06]'
              }`}
              title={isSidebarOpen ? "Fermer le volet latéral" : "Ouvrir le volet latéral"}
              aria-label="Contrôle de la navigation latérale"
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 text-sky-400" />
              ) : (
                <PanelLeft className="w-4 h-4 text-white/90" />
              )}
            </button>
          )}

          {/* Logo & Identité de l'Application Active */}
          <div 
            onClick={() => {
              playXboxSound('select');
              navigate('/');
            }}
            className="flex items-center gap-2 cursor-pointer group select-none"
            title="Accueil GED"
          >
            <div className="relative flex items-center justify-center w-7 h-7 shrink-0">
              <svg className="w-6 h-6 transition-transform group-hover:scale-105 duration-200" viewBox="0 0 50 50" fill="none">
                <path
                  d="M14 20 C14 10, 36 10, 36 20 C36 28, 14 26, 14 36 C14 44, 36 44, 36 36"
                  stroke="url(#egen-logo-grad-sub)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(74,222,128,0.7)]"
                />
                <defs>
                  <linearGradient id="egen-logo-grad-sub" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#4ade80" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-xs sm:text-sm tracking-wider leading-none">
                EGEN
              </span>
              <span className="text-emerald-400 font-medium text-[10px] sm:text-xs tracking-widest leading-none hidden sm:inline">
                DOCUMENTS
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold tracking-tight uppercase hidden md:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                GED
              </span>
            </div>
          </div>

          {/* Mini-Slot d'extension Gauche (Flexible & Sans limitation pour toute app) */}
          {appSlotLeft && (
            <div className="flex items-center gap-1 pl-1 border-l border-white/10">
              {appSlotLeft}
            </div>
          )}
        </div>

        {/* ZONE CENTRE : Slot Extensible Optionnel ou Espace libre (Navigation centrale retirée) */}
        <div className="flex-1 flex items-center justify-center max-w-3xl mx-2 overflow-x-auto scrollbar-none">
          {appSlotCenter || null}
        </div>

        {/* ZONE DROITE : Heure & Date longue au format discret/réduit */}
        <div className="flex items-center gap-2 shrink-0 overflow-visible">
          {appSlotRight && (
            <div className="flex items-center gap-1 pr-1 border-r border-white/10">
              {appSlotRight}
            </div>
          )}

          <div className="flex flex-col items-end justify-center text-right select-none pr-1">
            <span className="text-white font-bold text-xs sm:text-sm tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {timeStr}
            </span>
            <span className="text-[10px] sm:text-[11px] text-white/50 font-normal tracking-tight leading-tight mt-0.5 capitalize">
              {dateLongStr}
            </span>
          </div>
        </div>

      </div>

      {/* MOBILE & TABLET DRAWER / MENU SLIDEOVER (Visible on < lg screens when hamburger is clicked) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[96px] z-40 bg-slate-900/40 backdrop-blur-xs flex animate-in fade-in duration-150">
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-slate-200">
            {/* Header info in drawer */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#008080] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  LD
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Laura Denvida</h4>
                  <p className="text-xs text-slate-500">Portail Intranet Powell Software</p>
                </div>
              </div>
            </div>

            {/* Navigation links accordion for mobile & tablet */}
            <div className="p-3 space-y-1 flex-1 text-sm">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Navigation Principale
              </div>

              {/* Home Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory('home')}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-[#008080]" />
                    <span>Home</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedMobileCategory === 'home' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMobileCategory === 'home' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1.5 border-t border-slate-100 text-xs">
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Fil d'actualité"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Actualités de l'entreprise
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Calendrier général"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Calendrier & Plannings
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Publications récentes"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Dernières publications
                    </button>
                  </div>
                )}
              </div>

              {/* Mon Espace Accordion (Extranet, Public, Cellule, Personnel) */}
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory('monespace')}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#008080]" />
                    <span>Mon espace</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedMobileCategory === 'monespace' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMobileCategory === 'monespace' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1.5 border-t border-slate-100 text-xs">
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Extranet Partenaires"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] flex items-center justify-between"
                    >
                      <span>Extranet</span>
                      <Globe className="w-3.5 h-3.5 text-sky-500" />
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Espace Public"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] flex items-center justify-between"
                    >
                      <span>Public</span>
                      <Radio className="w-3.5 h-3.5 text-emerald-500" />
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Cellule Opérationnelle"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] flex items-center justify-between"
                    >
                      <span>Cellule</span>
                      <Users className="w-3.5 h-3.5 text-purple-500" />
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Espace Personnel"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] flex items-center justify-between"
                    >
                      <span>Personnel</span>
                      <User className="w-3.5 h-3.5 text-teal-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Administration Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory('administration')}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#008080]" />
                    <span>Administration</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedMobileCategory === 'administration' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMobileCategory === 'administration' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1.5 border-t border-slate-100 text-xs">
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Gestion Utilisateurs & Rôles"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Utilisateurs & Rôles
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Droits d'accès & Sécurité"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Droits & Sécurité
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Journaux d'audit & Flux"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Journaux d'audit & Flux
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Configuration Système"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Configuration Système
                    </button>
                  </div>
                )}
              </div>

              {/* Raccourci Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory('raccourci')}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Raccourci</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedMobileCategory === 'raccourci' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMobileCategory === 'raccourci' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1.5 border-t border-slate-100 text-xs">
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Bordereaux en cours"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Bordereaux en cours
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Recherche Express"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Recherche Express
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Documents récents"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Documents récents
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Scanner & Import"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Scanner & Import rapide
                    </button>
                  </div>
                )}
              </div>

              {/* Favori Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory('favori')}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Favori</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedMobileCategory === 'favori' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMobileCategory === 'favori' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1.5 border-t border-slate-100 text-xs">
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Dossiers épinglés"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Dossiers épinglés
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Bordereaux suivis"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Bordereaux suivis
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Modèles types d'archivage"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Modèles types
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Espaces favoris"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Espaces favoris
                    </button>
                  </div>
                )}
              </div>

              {/* Paramètre Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory('parametre')}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-4 h-4 text-[#008080]" />
                    <span>Paramètre</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedMobileCategory === 'parametre' ? 'rotate-180' : ''}`} />
                </button>
                {expandedMobileCategory === 'parametre' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1.5 border-t border-slate-100 text-xs">
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Affichage & Thème"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Affichage & Thème
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Alertes & Notifications"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Alertes & Notifications
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Langue & Formats"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Langue & Formats
                    </button>
                    <button 
                      onClick={() => { setIsMobileMenuOpen(false); notify("Workflows de validation"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] block"
                    >
                      Workflows de validation
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions inside drawer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenGED) onOpenGED();
                  notify("Application GED EGEN Documents active");
                }}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FolderOpen className="w-4 h-4" />
                <span>Ouvrir GED Documents</span>
              </button>
            </div>
          </div>

          {/* Clickable backdrop area to close */}
          <div 
            className="flex-1" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

