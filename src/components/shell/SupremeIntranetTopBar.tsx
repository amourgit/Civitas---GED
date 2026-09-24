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
  Megaphone,
  BarChart3,
  Database,
  AppWindow,
  Info,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropdownNavigation, NavItem } from './DropdownNavigation';
import { BreadcrumbLevel2Nav } from '../navigation/BreadcrumbLevel2Nav';
import { XboxAudioController } from '../shared/XboxAudioController';
import { playXboxSound } from '../../utils/xboxAudio';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useService } from '../../context/ServiceContext';
import { WorkspaceId } from '../../types/workspace';
import { EgenLogo } from '../ui/EgenLogo';
import { WorkspaceAndServiceSelectorsColumn } from './WorkspaceAndServiceSelectorsColumn';
import { GooeyInput } from '../ui/GooeyInput';

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
  const { selectedService } = useService();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<'English' | 'Français' | 'Español' | 'Deutsch'>('English');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFullNav, setShowFullNav] = useState(false);
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

  // Auto switch to Breadcrumb navigation mode when navigating away from Home
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/accueil') {
      setShowFullNav(false);
    }
  }, [location.pathname]);

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
    const baseNavItems = (currentWorkspace.navItems || []).map((navItem) => ({
      ...navItem,
      onClick: () => {
        playXboxSound('select');
        setShowFullNav(false);
        if (navItem.link) {
          navigate(navItem.link);
        } else if (onShowNotification) {
          onShowNotification(`${navItem.label} (${currentWorkspace.name})`, 'info');
        }
      },
      subMenus: navItem.subMenus?.map((subMenu) => ({
        ...subMenu,
        items: subMenu.items.map((item) => ({
          ...item,
          onClick: () => {
            playXboxSound('select');
            setShowFullNav(false);
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

    if (!selectedService) {
      return baseNavItems;
    }

    // Add site sub-options to the right of the Level 2 nav list when a site is selected
    const serviceSubNavItems: NavItem[] = [
      {
        id: 8802,
        label: 'Applications',
        link: `/sites/${selectedService.uuid}/applications`,
        onClick: () => {
          playXboxSound('select');
          setShowFullNav(false);
          navigate(`/sites/${selectedService.uuid}/applications`);
        }
      },
      {
        id: 8803,
        label: 'Membres & Équipes',
        link: `/sites/${selectedService.uuid}/membres`,
        onClick: () => {
          playXboxSound('select');
          setShowFullNav(false);
          navigate(`/sites/${selectedService.uuid}/membres`);
        }
      },
      {
        id: 8804,
        label: 'Ressources',
        link: `/sites/${selectedService.uuid}/ressources`,
        onClick: () => {
          playXboxSound('select');
          setShowFullNav(false);
          navigate(`/sites/${selectedService.uuid}/ressources`);
        }
      }
    ];

    return [...baseNavItems, ...serviceSubNavItems];
  }, [currentWorkspace, selectedService, setWorkspaceId, navigate, onShowNotification, setShowFullNav]);

  // Group workspaces by category
  const workspaceGroups = React.useMemo(() => {
    const categories: { key: string; label: string; items: typeof availableWorkspaces }[] = [
      {
        key: 'public',
        label: 'Espaces Publique',
        items: availableWorkspaces.filter(ws => ws.category === 'public')
      },
      {
        key: 'organisationnel',
        label: 'Espace Organisationnel',
        items: availableWorkspaces.filter(ws => ws.category === 'organisationnel')
      },
      {
        key: 'personnel',
        label: 'Espace Personnel',
        items: availableWorkspaces.filter(ws => ws.category === 'personnel')
      }
    ];
    return categories.filter(cat => cat.items.length > 0);
  }, [availableWorkspaces]);

  return (
    <div ref={menuRef} className="w-full shrink-0 z-50 select-none relative font-sans text-slate-100 overflow-visible border-b border-white/10">
      {/* 1. SUPREME TOPBAR: EXACT POWELL SOFTWARE LIGHT INTRANET TOPBAR */}
      <header className="w-full bg-transparent transition-colors overflow-visible flex flex-col">
        {/* ROW 1: BRAND & ACTIONS TOP ROW */}
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-7 h-11 sm:h-12 flex items-center justify-between gap-1.5 sm:gap-2">
          
          {/* LEFT SECTION: Hamburger (Mobile/Tablet) + Logo & Brand + Workspace & Service Selectors Parent Column */}
          <div className={`items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 h-full min-w-0 flex-1 sm:flex-initial overflow-visible ${isSearchOpen ? 'hidden lg:flex' : 'flex'}`}>
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setIsMobileMenuOpen(prev => !prev);
              }}
              className="sm:hidden p-1 -ml-0.5 text-slate-300 hover:text-teal-400 hover:bg-white/10 rounded-lg transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center shrink-0"
              title="Menu Intranet"
              aria-label="Menu Intranet"
            >
              {isMobileMenuOpen ? (
                <X className="w-4.5 h-4.5 text-slate-200" />
              ) : (
                <Menu className="w-4.5 h-4.5 text-slate-200" />
              )}
            </button>

            {/* EGEN Official Logo & Brand */}
            <div 
              onClick={() => {
                playXboxSound('select');
                navigate('/');
              }}
              className="flex items-center cursor-pointer shrink-0 py-0.5 group overflow-visible hover:opacity-95 transition-opacity"
              title="EGEN — Écosystème Gouvernemental de l’Économie Numérique"
            >
              <div className="block sm:hidden">
                <EgenLogo size="sm" variant="full" />
              </div>
              <div className="hidden sm:block">
                <EgenLogo size="md" variant="full" />
              </div>
            </div>

            {/* PARENT COMPONENT: WORKSPACE & SERVICE SELECTORS IN COLUMN */}
            <WorkspaceAndServiceSelectorsColumn onShowNotification={onShowNotification} />
          </div>

        {/* RIGHT SECTION: Minimal Dimension Buttons without background (Free text/icons) */}
        <div className={`items-center gap-1 sm:gap-2 lg:gap-3.5 overflow-visible ${isSearchOpen ? 'w-full flex justify-between items-center lg:w-auto lg:shrink-0 lg:justify-end' : 'flex shrink-0'}`}>
          
          {/* 1. Search Gooey Input with fluid liquid spring physics */}
          <div className={`relative overflow-visible flex items-center justify-start ${isSearchOpen ? 'flex-1 lg:flex-initial' : ''}`}>
            <GooeyInput
              placeholder="Rechercher..."
              collapsedWidth={115}
              expandedWidth={220}
              expandedOffset={40}
              value={searchQuery}
              onValueChange={setSearchQuery}
              expanded={isSearchOpen}
              onOpenChange={setIsSearchOpen}
              onClick={() => {
                playXboxSound('toggle');
                setActiveMenu(null);
                setIsMobileMenuOpen(false);
              }}
              onSubmit={(val) => {
                if (onOpenGlobalSearch) {
                  onOpenGlobalSearch();
                } else if (val.trim()) {
                  notify(`Recherche : ${val.trim()}`);
                }
              }}
            />
          </div>

          {/* Mobile/Tablet Cancel Button when Search is expanded */}
          {isSearchOpen && (
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="lg:hidden text-xs text-teal-300 hover:text-white font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 hover:border-teal-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_2px_8px_rgba(0,0,0,0.08)] transition-all cursor-pointer shrink-0 whitespace-nowrap active:scale-95"
              title="Annuler la recherche"
            >
              Annuler
            </button>
          )}

          {/* 2. Language Selector */}
          <div className={`relative overflow-visible ${isSearchOpen ? 'hidden lg:block' : ''}`}>
            <button
              type="button"
              onClick={() => handleMenuClick('lang')}
              className="flex items-center gap-0.5 sm:gap-1 text-[12px] sm:text-[13px] font-medium text-slate-300 hover:text-teal-400 transition-colors cursor-pointer bg-transparent border-none px-1 py-1 overflow-visible"
              title="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5 sm:hidden text-slate-300" />
              <span className="hidden sm:inline">{currentLang}</span>
              <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform duration-200 ${activeMenu === 'lang' ? 'rotate-180 text-teal-400' : ''}`} />
            </button>

            {/* Language Dropdown */}
            {activeMenu === 'lang' && (
              <div className="absolute right-0 top-9 w-32 bg-slate-900/85 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-1 z-50 text-xs animate-in fade-in duration-150 text-white">
                {(['English', 'Français', 'Español', 'Deutsch'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setActiveMenu(null);
                      notify(`Langue changée : ${lang}`);
                    }}
                    className="w-full text-left px-2.5 py-1 text-slate-200 hover:bg-white/15 hover:text-white flex items-center justify-between cursor-pointer bg-transparent border-none text-[11px]"
                  >
                    <span>{lang}</span>
                    {currentLang === lang && <Check className="w-3 h-3 text-teal-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Separator Line */}
          <div className={`${isSearchOpen ? 'hidden lg:block' : 'hidden sm:block'} h-4 sm:h-4.5 w-px bg-white/20 mx-0.5`} />

          {/* 4. App Launcher Grid Icon */}
          <div className={`relative overflow-visible flex items-center ${isSearchOpen ? 'hidden lg:flex' : ''}`}>
            <button
              type="button"
              onClick={() => handleMenuClick('appLauncher')}
              className="relative p-1 text-teal-400 hover:text-teal-300 transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center overflow-visible group"
              title="Lanceur d'applications de l'intranet"
              aria-label="Lanceur d'applications"
            >
              <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 flex flex-wrap gap-0.5 items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 rounded-[2px] bg-teal-400 group-hover:bg-teal-300 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-[2px] bg-teal-400 group-hover:bg-teal-300 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-[2px] bg-teal-400 group-hover:bg-teal-300 transition-colors" />
                <div className="w-1.5 h-1.5 rounded-[2px] bg-teal-400 group-hover:bg-teal-300 transition-colors" />
              </div>

              <span className="absolute -top-1.5 -right-2 bg-[#E41E3F] text-white text-[9px] sm:text-[10px] font-bold min-w-[16px] sm:min-w-[17px] h-[16px] sm:h-[17px] px-1 rounded-full flex items-center justify-center shadow-md ring-2 ring-slate-900 leading-none pointer-events-none z-30">
                2
              </span>
            </button>

            {/* App Launcher Drawer */}
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
                            ) : app.icon === 'Megaphone' ? (
                              <Megaphone className="w-5 h-5 text-teal-100" />
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
          <div className={`relative overflow-visible ${isSearchOpen ? 'hidden lg:flex' : 'hidden xs:flex'}`}>
            <button
              type="button"
              onClick={() => handleMenuClick('create')}
              className="p-1 text-teal-400 hover:text-teal-300 transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center overflow-visible"
              title="Créer un nouveau contenu ou document"
              aria-label="Créer"
            >
              <CirclePlus className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
            </button>

            {/* Create Dropdown */}
            {activeMenu === 'create' && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-24px)] sm:w-56 max-w-xs bg-slate-900/85 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-1.5 z-50 text-xs animate-in fade-in duration-150 text-white">
                <div className="px-3 py-1 text-[10px] font-bold text-teal-300 uppercase tracking-wider border-b border-white/10 mb-1">
                  Nouveau contenu
                </div>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Création de nouveau dossier GED"); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white flex items-center gap-2 cursor-pointer bg-transparent border-none text-[11px]"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nouveau Dossier GED</span>
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Téléversement de fichier"); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white flex items-center gap-2 cursor-pointer bg-transparent border-none text-[11px]"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Importer un Document</span>
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Nouvelle publication sur My Board"); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white flex items-center gap-2 cursor-pointer bg-transparent border-none text-[11px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Nouvelle Publication</span>
                </button>
              </div>
            )}
          </div>

          {/* 6. Settings Gear Icon */}
          <div className={`relative overflow-visible ${isSearchOpen ? 'hidden lg:flex' : 'hidden sm:flex'}`}>
            <button
              type="button"
              onClick={() => handleMenuClick('settings')}
              className="p-1 text-slate-300 hover:text-teal-400 transition-colors cursor-pointer bg-transparent border-none flex items-center justify-center overflow-visible"
              title="Paramètres de l'intranet"
              aria-label="Paramètres"
            >
              <Settings className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
            </button>

            {/* Settings Dropdown */}
            {activeMenu === 'settings' && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-24px)] sm:w-52 max-w-xs bg-slate-900/85 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-1.5 z-50 text-xs animate-in fade-in duration-150 text-white">
                <div className="px-3 py-1 text-[10px] font-bold text-teal-300 uppercase tracking-wider border-b border-white/10 mb-1">
                  Configuration
                </div>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Préférences d'affichage"); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white cursor-pointer bg-transparent border-none text-[11px]"
                >
                  Préférences d'affichage
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("Paramètres de sécurité & accès"); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white cursor-pointer bg-transparent border-none text-[11px]"
                >
                  Permissions & Sécurité
                </button>
                <button 
                  onClick={() => { setActiveMenu(null); notify("À propos d'EGEN v4.2 — Écosystème Gouvernemental"); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white cursor-pointer bg-transparent border-none text-[11px]"
                >
                  À propos d'EGEN
                </button>
              </div>
            )}
          </div>

          {/* 7. Profil Utilisateur */}
          <div className={`relative overflow-visible items-center shrink-0 ${isSearchOpen ? 'hidden lg:flex' : 'flex'}`}>
            <button
              type="button"
              onClick={() => handleMenuClick('profile')}
              className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-white/30 hover:border-teal-400 shadow-2xs shrink-0 bg-slate-800 ml-0.5 sm:ml-1 cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-teal-400/30 flex items-center justify-center p-0 focus:outline-none aspect-square"
              title="Profil Utilisateur"
              aria-label="Menu Profil"
            >
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-full aspect-square block pointer-events-none"
              />
            </button>

            {/* Popup Profil */}
            <AnimatePresence>
              {activeMenu === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed sm:absolute right-2 sm:right-0 top-12 sm:top-10 w-[calc(100vw-24px)] sm:w-60 max-w-xs bg-slate-900/85 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 p-2.5 z-50 text-xs origin-top-right text-white"
                >
                  <div className="flex items-center gap-2.5 pb-2 mb-2 border-b border-white/10">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-xs aspect-square">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                        alt="Avatar" 
                        className="w-full h-full object-cover rounded-full aspect-square"
                      />
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-xs truncate">Laura Denvida</p>
                      <p className="text-[10px] text-slate-300 truncate">HR Manager • Paris</p>
                      <span className="inline-flex items-center gap-1 mt-0.5 px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[8px] font-semibold border border-emerald-400/30">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                        Connecté
                      </span>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Accès au profil complet"); }}
                      className="w-full text-left px-2 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2 transition-colors font-medium text-[11px]"
                    >
                      <User className="w-3.5 h-3.5 text-teal-300" />
                      <span>Mon profil complet</span>
                    </button>
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Préférences du compte"); }}
                      className="w-full text-left px-2 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2 transition-colors text-[11px]"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-teal-300" />
                      <span>Préférences & Compte</span>
                    </button>
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Favoris & signets"); }}
                      className="w-full text-left px-2 py-1.5 text-slate-200 hover:bg-white/15 hover:text-white rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2 transition-colors text-[11px]"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-teal-300" />
                      <span>Mes favoris GED</span>
                    </button>
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-white/10">
                    <button 
                      onClick={() => { setActiveMenu(null); notify("Déconnexion du portail intranet"); }}
                      className="w-full text-left px-2 py-1 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-lg cursor-pointer bg-transparent border-none flex items-center gap-2 transition-colors font-medium text-[11px]"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>Se déconnecter</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 8. Date & Heure - Retiré depuis la version tablette (uniquement visible sur desktop lg+) */}
          <div className="hidden lg:flex flex-col items-end justify-center text-right select-none pl-2 sm:pl-3 ml-0.5 sm:ml-1 border-l border-white/15 shrink-0">
            <span className="text-white font-bold text-xs sm:text-[13px] tracking-tight leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {timeStr}
            </span>
            <span className="text-[10px] sm:text-[11px] text-white/50 font-normal tracking-tight leading-tight mt-0.5 capitalize whitespace-nowrap">
              {dateLongStr}
            </span>
          </div>

        </div>
        </div>

        {/* ROW 2: NIVEAU 2 DE LA TOPBAR PRINCIPALE (Pleine largeur sans max-w comme le niveau 1) */}
        {!isGedRoute && (
          <div className="w-full bg-transparent px-2 sm:px-4 md:px-6 lg:px-7 h-10 sm:h-11 flex items-center justify-between overflow-visible z-30">
            {(location.pathname === '/' || location.pathname === '/accueil' || showFullNav) ? (
              <div className="w-full flex items-center justify-between">
                <DropdownNavigation navItems={desktopNavItems} />
                {showFullNav && (
                  <button
                    onClick={() => setShowFullNav(false)}
                    className="text-xs text-slate-300 hover:text-white bg-white/10 px-2 py-1 rounded-md ml-2 cursor-pointer shrink-0"
                  >
                    Mode Fil d'ariane
                  </button>
                )}
              </div>
            ) : (
              <BreadcrumbLevel2Nav onToggleFullMenu={() => setShowFullNav(true)} />
            )}
          </div>
        )}

      </header>

      {/* 2. DEUXIÈME NIVEAU : TOPBAR EXTENSIBLE DE L'APPLICATION ACTIVE (GED) */}
      {isGedRoute && (
        <div className="w-full bg-transparent text-white px-2 sm:px-4 md:px-6 lg:px-7 h-12 flex items-center justify-between shadow-none transition-all overflow-visible z-40 relative">
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 overflow-visible">
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

            {appSlotLeft && (
              <div className="flex items-center gap-1 pl-1">
                {appSlotLeft}
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center justify-center max-w-3xl mx-2 overflow-x-auto scrollbar-none">
            {appSlotCenter || null}
          </div>

          <div className="flex items-center gap-2 shrink-0 overflow-visible">
            {appSlotRight && (
              <div className="flex items-center gap-1">
                {appSlotRight}
              </div>
            )}
          </div>

        </div>
      )}

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden fixed inset-0 ${isGedRoute ? 'top-[96px]' : 'top-[48px]'} z-40 bg-slate-900/40 backdrop-blur-xs flex animate-in fade-in duration-150`}>
          <div className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-slate-200">
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

            <div className="p-3 space-y-1 flex-1 text-sm">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Navigation Principale
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-100 bg-white">
                <button
                  type="button"
                  onClick={() => toggleMobileCategory('espaces_switcher')}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#008080]" />
                    <span className="font-semibold text-xs">Changer d'Espace ({currentWorkspace.name})</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedMobileCategory === 'espaces_switcher' ? 'rotate-180 text-[#008080]' : ''}`} />
                </button>
                {expandedMobileCategory === 'espaces_switcher' && (
                  <div className="bg-slate-50/80 px-3 py-2 space-y-2.5 border-t border-slate-100 text-xs">
                    {workspaceGroups.map(group => (
                      <div key={group.key} className="space-y-1">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                          {group.label}
                        </div>
                        <div className="space-y-1">
                          {group.items.map(ws => {
                            const isWsActive = ws.id === currentWorkspace.id;
                            return (
                              <button
                                key={ws.id}
                                onClick={() => {
                                  playXboxSound('select');
                                  setWorkspaceId(ws.id);
                                  setIsMobileMenuOpen(false);
                                  if (onShowNotification) {
                                    onShowNotification(`Espace activé : ${ws.name}`, 'success');
                                  }
                                }}
                                className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg text-left transition-colors ${
                                  isWsActive 
                                    ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200' 
                                    : 'text-slate-600 hover:bg-white hover:text-slate-900 font-medium'
                                }`}
                              >
                                <span>{ws.name}</span>
                                {isWsActive ? (
                                  <span className="text-[9px] bg-teal-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                                    Actif
                                  </span>
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 pb-1 border-t border-slate-100">
                <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Navigation — {currentWorkspace.name}</span>
                </p>
                <div className="space-y-1.5">
                  {desktopNavItems.map((item) => {
                    const hasSubMenus = item.subMenus && item.subMenus.length > 0;
                    const isExpanded = expandedMobileCategory === String(item.id);
                    return (
                      <div key={item.id} className="rounded-xl overflow-hidden border border-slate-100 bg-white">
                        {hasSubMenus ? (
                          <>
                            <button
                              type="button"
                              onClick={() => toggleMobileCategory(String(item.id))}
                              className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                            >
                              <span className="font-semibold text-xs">{item.label}</span>
                              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#008080]' : ''}`} />
                            </button>
                            {isExpanded && (
                              <div className="bg-slate-50/80 px-3 py-2 space-y-3 border-t border-slate-100 text-xs">
                                {item.subMenus?.map((sub) => (
                                  <div key={sub.title} className="space-y-1.5">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                      {sub.title}
                                    </div>
                                    <div className="space-y-1">
                                      {sub.items.map((subItem) => {
                                        const IconComp = subItem.icon;
                                        return (
                                          <button
                                            key={subItem.label}
                                            onClick={() => {
                                              setIsMobileMenuOpen(false);
                                              if (subItem.onClick) subItem.onClick();
                                            }}
                                            className="w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-left text-slate-600 hover:bg-slate-100 hover:text-[#008080] transition-colors"
                                          >
                                            {IconComp && <IconComp className="w-3.5 h-3.5 text-teal-600 shrink-0" />}
                                            <div className="flex flex-col min-w-0">
                                              <span className="font-medium text-xs text-slate-800 truncate">{subItem.label}</span>
                                              {subItem.description && (
                                                <span className="text-[10px] text-slate-400 truncate">{subItem.description}</span>
                                              )}
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              if (item.onClick) item.onClick();
                            }}
                            className="w-full flex items-center justify-between p-3 text-left font-medium text-slate-700 hover:bg-slate-50 hover:text-[#008080] transition-colors"
                          >
                            <span className="font-semibold text-xs">{item.label}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

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

          <div 
            className="flex-1" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
