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
  LogOut,
  Grid,
  Newspaper,
  BarChart3,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropdownNavigation, NavItem } from './DropdownNavigation';
import { XboxAudioController } from '../shared/XboxAudioController';
import { playXboxSound } from '../../utils/xboxAudio';
import { useWorkspace } from '../../context/WorkspaceContext';
import { WorkspaceId } from '../../types/workspace';
import { EgenLogo } from '../ui/EgenLogo';

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
  const { currentWorkspace, setWorkspaceId, availableWorkspaces, currentApps } = useWorkspace();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<'English' | 'Français' | 'Español' | 'Deutsch'>('English');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
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

  // Determine if current route is within GED
  const isGedRoute = React.useMemo(() => {
    const path = location.pathname;
    return path.startsWith('/ged') || 
           path.startsWith('/documentation') || 
           path.startsWith('/salles') || 
           path.startsWith('/casier') || 
           path.startsWith('/rayon') || 
           path.startsWith('/dossier');
  }, [location.pathname]);

  // Determine current active route in GED
  const currentAppRoute = React.useMemo(() => {
    const path = location.pathname;
    if (path === '/' || path === '/accueil') return 'accueil';
    if (
      path.startsWith('/ged/documentation') ||
      path.startsWith('/documentation') ||
      path === '/salles' || 
      path === '/documents' || 
      path.startsWith('/salle') || 
      path.startsWith('/rayon') || 
      path.startsWith('/casier') || 
      path.startsWith('/dossier')
    ) return 'documentation';
    if (path === '/ged/ingestion' || path === '/ingestion') return 'ingestion';
    if (path === '/ged/sites' || path === '/espaces') return 'espaces';
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

  const desktopNavItems = React.useMemo<NavItem[]>(() => {
    return currentWorkspace.navItems.map((navItem) => ({
      ...navItem,
      subMenus: navItem.subMenus?.map((subMenu) => ({
        ...subMenu,
        items: subMenu.items.map((item) => ({
          ...item,
          onClick: () => {
            playXboxSound('select');
            if (item.link) {
              if (['intranet', 'extranet', 'public', 'personnel', 'rh'].includes(item.link)) {
                setWorkspaceId(item.link as WorkspaceId);
                if (onShowNotification) {
                  onShowNotification(`Espace activé : ${item.label}`, 'success');
                }
              } else if (item.link.startsWith('/')) {
                navigate(item.link);
              }
            } else {
              if (onShowNotification) {
                onShowNotification(`${item.label} (${currentWorkspace.name})`, 'info');
              }
            }
          }
        }))
      }))
    }));
  }, [currentWorkspace, setWorkspaceId, navigate, onShowNotification]);

  return (
    <div ref={menuRef} className="w-full shrink-0 z-50 select-none relative font-sans text-slate-800 overflow-visible">
      {/* 1. SUPREME TOPBAR: EXACT POWELL SOFTWARE LIGHT INTRANET TOPBAR */}
      <header className="w-full bg-white border-b border-slate-200/80 shadow-xs transition-colors overflow-visible flex flex-col">
        {/* ROW 1: BRAND & ACTIONS TOP ROW */}
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-7 h-12 flex items-center justify-between">
          
          {/* LEFT SECTION: Hamburger (Mobile/Tablet) + Sidebar Button (à gauche du Logo) + Logo & Brand + Workspace Selector Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-4 lg:gap-6 h-full min-w-0 overflow-visible">
          
          {/* Mobile Menu Button (Visible on screens < sm / mobile where sub-nav is collapsed) */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('toggle');
              setIsMobileMenuOpen(prev => !prev);
            }}
            className="sm:hidden p-1.5 -ml-1 text-slate-600 hover:text-[#008080] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center"
            title="Menu Intranet"
            aria-label="Menu Intranet"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* EGEN Official Logo & Brand */}
          <div 
            onClick={() => {
              playXboxSound('select');
              navigate('/');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 py-1 group overflow-visible hover:opacity-95 transition-opacity"
            title="EGEN — Écosystème Gouvernemental de l’Économie Numérique"
          >
            <EgenLogo size="md" variant="full" />
          </div>

          {/* Workspace Selector Dropdown Pill */}
          <div className="relative ml-1 sm:ml-2">
              <button
                type="button"
                onClick={() => {
                  playXboxSound('toggle');
                  setIsWorkspaceDropdownOpen(prev => !prev);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/90 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-xs"
                title="Changer d'espace de travail"
              >
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="hidden sm:inline text-slate-400 font-normal">Espace :</span>
                <span className="text-teal-700 font-bold max-w-[120px] truncate">{currentWorkspace.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isWorkspaceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isWorkspaceDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                    Sélectionner un Espace
                  </div>
                  {availableWorkspaces.map(ws => {
                    const isActive = ws.id === currentWorkspace.id;
                    return (
                      <button
                        key={ws.id}
                        onClick={() => {
                          playXboxSound('select');
                          setWorkspaceId(ws.id);
                          setIsWorkspaceDropdownOpen(false);
                          if (onShowNotification) {
                            onShowNotification(`Espace activé : ${ws.name}`, 'success');
                          }
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/60' 
                            : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs">{ws.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{ws.subtitle}</span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] bg-teal-600 text-white font-semibold px-2 py-0.5 rounded-full">
                            Actif
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
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

            {/* App Launcher Drawer / Dropdown in Glassmorphism */}
            {activeMenu === 'appLauncher' && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-16px)] sm:w-88 max-w-sm bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl p-3.5 sm:p-4 rounded-2xl z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150 text-white">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
                  <span className="font-semibold text-sm text-white tracking-tight">Applications ({currentWorkspace.name})</span>
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 font-medium px-2 py-0.5 rounded-full border border-teal-400/30">
                    {currentApps.length} Application{currentApps.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20">
                  {currentApps.length > 0 ? (
                    currentApps.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => {
                          playXboxSound('select');
                          setActiveMenu(null);
                          if (app.id === 'ged' && onOpenGED) {
                            onOpenGED();
                          } else {
                            navigate(app.url);
                          }
                          notify(`Application ${app.name} active`);
                        }}
                        className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white transition-all cursor-pointer group text-center max-w-full overflow-hidden"
                      >
                        <div className="relative mb-2 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-lg bg-teal-600/80 border border-teal-400/40 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                            {app.icon === 'FolderOpen' ? (
                              <FolderOpen className="w-5 h-5 text-teal-100" />
                            ) : app.icon === 'Calendar' ? (
                              <Calendar className="w-5 h-5 text-teal-100" />
                            ) : app.icon === 'ShieldCheck' ? (
                              <ShieldCheck className="w-5 h-5 text-teal-100" />
                            ) : app.icon === 'Newspaper' ? (
                              <Newspaper className="w-5 h-5 text-teal-100" />
                            ) : (
                              <Grid className="w-5 h-5 text-teal-100" />
                            )}
                          </div>
                          {app.status && (
                            <span className="absolute -top-1 -right-2 text-[8px] font-bold px-1.5 py-0.2 bg-teal-500 text-white rounded-full shadow-xs">
                              {app.status}
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-[11px] sm:text-xs text-white group-hover:text-teal-200 leading-tight truncate w-full px-1" title={app.name}>
                          {app.name}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-slate-300 truncate w-full px-1 mt-0.5" title={app.description}>
                          {app.description}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-6 px-2 text-slate-300">
                      <p className="text-xs font-semibold mb-1 text-teal-200">Aucune application active</p>
                      <p className="text-[10px] text-slate-400 mb-3">L'espace {currentWorkspace.name} n'a pas d'apps configurées.</p>
                      <button
                        onClick={() => {
                          playXboxSound('select');
                          setWorkspaceId('intranet');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 text-xs font-medium border border-teal-400/30 transition-all cursor-pointer"
                      >
                        Voir l'Intranet Général
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Link: Voir tous -> /applications */}
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => {
                      playXboxSound('select');
                      setActiveMenu(null);
                      navigate('/applications');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-teal-400/30 backdrop-blur-sm"
                  >
                    <span>Voir toutes les applications</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
                  onClick={() => { setActiveMenu(null); notify("À propos d'EGEN v4.2 — Écosystème Gouvernemental"); }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 hover:text-[#008080] cursor-pointer bg-transparent border-none"
                >
                  À propos d'EGEN
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
        </div>

        {/* SUB-SECTION DE NAVIGATION PRINCIPALE POUR L'ESPACE ACTIF (NIVEAU 1) */}
        <div className="hidden sm:flex items-center w-full px-2 sm:px-4 md:px-6 lg:px-7 h-9 bg-slate-50/80 border-t border-slate-100/90 overflow-visible">
          <AnimatePresence mode="wait">
            <motion.nav 
              key={currentWorkspace.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex items-center h-full w-full gap-1 overflow-visible"
            >
              <DropdownNavigation navItems={desktopNavItems} />
            </motion.nav>
          </AnimatePresence>
        </div>

      </header>

      {/* 2. DEUXIÈME NIVEAU (INFÉRIEUR) : TOPBAR EXTENSIBLE DE L'APPLICATION ACTIVE (GED / EGEN) - UNIQUEMENT SI DANS LA GED */}
      {isGedRoute && (
        <div className="w-full bg-[#070d14]/95 backdrop-blur-md border-b border-white/[0.08] text-white px-2 sm:px-4 md:px-6 lg:px-7 h-12 flex items-center justify-between shadow-md transition-all overflow-visible z-40 relative">
          
          {/* ZONE GAUCHE : Logo/App Identity + Status Badge + Slot Extensible Gauche */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 overflow-visible">
            {/* Logo & Identité de l'Application Active */}
            <div 
              onClick={() => {
                playXboxSound('select');
                navigate('/ged');
              }}
              className="flex items-center gap-2 cursor-pointer group select-none"
              title="Accueil GED EGEN"
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
      )}

      {/* MOBILE & TABLET DRAWER / MENU SLIDEOVER (Visible on < lg screens when hamburger is clicked) */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 ${isGedRoute ? 'top-[96px]' : 'top-[48px]'} z-40 bg-slate-900/40 backdrop-blur-xs flex animate-in fade-in duration-150`}>
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-slate-200">
            {/* Header info in drawer */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#008080] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  LD
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Laura Denvida</h4>
                  <p className="text-xs text-slate-500">EGEN — Écosystème Gouvernemental</p>
                </div>
              </div>
            </div>

            {/* Navigation links accordion for mobile & tablet */}
            <div className="p-3 space-y-1 flex-1 text-sm">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Navigation Principale
              </div>

              {/* Mon Espace Accordion (Extranet, Public, Intranet, Personnel) */}
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
                      onClick={() => { setIsMobileMenuOpen(false); notify("Espace Intranet"); }}
                      className="w-full text-left py-1.5 text-slate-600 hover:text-[#008080] flex items-center justify-between"
                    >
                      <span>Intranet</span>
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

