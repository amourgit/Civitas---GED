import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderOpen, Search, Zap, Star, Settings, ShieldCheck, 
  Sparkles, ExternalLink, ArrowRight, CheckCircle2, Bookmark,
  FileText, Compass, SlidersHorizontal, Globe, Layers, ChevronRight,
  LucideIcon
} from 'lucide-react';
import { NavItem, NavSubMenuItem as SubMenuItem } from '../shell/DropdownNavigation';
import { playXboxSound } from '../../utils/xboxAudio';

interface XboxMetroSlideViewProps {
  navItem: NavItem;
  categoryLabel: string;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
  onNavigateTab?: (tabId: string) => void;
}

// Map of icons for fallback
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Search,
  FolderOpen,
  Star,
  Settings,
  ShieldCheck,
  Sparkles,
  Bookmark,
  FileText,
  Compass,
  SlidersHorizontal,
  Globe,
  Layers,
};

export function XboxMetroSlideView({
  navItem,
  categoryLabel,
  onShowToast,
  onNavigateTab,
}: XboxMetroSlideViewProps) {
  const navigate = useNavigate();

  // Extract all subMenu items flattened for easy bento distribution
  const allSubMenuItems: SubMenuItem[] = React.useMemo(() => {
    const items: SubMenuItem[] = [];
    navItem.subMenus?.forEach(sub => {
      sub.items.forEach(item => {
        items.push(item);
      });
    });
    return items;
  }, [navItem]);

  // Featured item (hero in the center)
  const featuredItem = allSubMenuItems[0] || {
    label: navItem.label,
    description: `Module principal de gestion pour ${navItem.label}`,
    icon: FolderOpen,
  };

  // Secondary items for the right bento grid
  const secondaryItems = allSubMenuItems.slice(1, 7);

  // Background images for the featured hero card depending on category
  const heroImageMap: Record<string, string> = {
    administration: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    raccourcis: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    favoris: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    paramètres: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    parametres: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
  };

  const featuredImg = heroImageMap[categoryLabel.toLowerCase()] || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80';

  const handleItemClick = (item: SubMenuItem) => {
    playXboxSound('select');
    if (item.link) {
      navigate(item.link);
      onShowToast(`Navigation : ${item.label}`, 'success');
    } else {
      onShowToast(`Action sélectionnée : ${item.label}`, 'info');
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 py-2 select-none">
      {/* ── BENTO DASHBOARD TILES (Exact Xbox 360 Metro Style) ── */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        
        {/* ── COLONNE GAUCHE (Tiles Vertes / Accent Xbox) ── */}
        <div className="md:col-span-3 flex flex-col gap-3 sm:gap-3.5">
          {/* Tile 1: Grande tuile verte principale */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              if (featuredItem.link) navigate(featuredItem.link);
              else onShowToast(`${navItem.label} : Espace Principal Activé`, 'success');
            }}
            className="group relative flex flex-col justify-between p-4 sm:p-5 h-36 sm:h-44 bg-gradient-to-br from-[#107C10] to-[#0c5c0c] hover:from-[#138e13] hover:to-[#0e6d0e] border border-white/20 text-white text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_25px_rgba(16,124,16,0.35)] overflow-hidden cursor-pointer"
          >
            <div className="flex items-start justify-between w-full">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                {featuredItem.icon ? (
                  <featuredItem.icon className="w-5 h-5" />
                ) : (
                  <FolderOpen className="w-5 h-5" />
                )}
              </div>
              <span className="px-2 py-0.5 rounded-sm bg-black/30 text-[10px] font-mono text-emerald-200 tracking-wider uppercase">
                Actif
              </span>
            </div>

            <div className="mt-auto">
              <h3 className="font-bold text-sm sm:text-base leading-tight tracking-tight drop-shadow-xs">
                Mes {navItem.label}
              </h3>
              <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                Accès direct au hub central
              </p>
            </div>

            {/* Glossy overlay effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          </button>

          {/* Tile 2: Tuile verte secondaire - Parcourir */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              if (secondaryItems[0]?.link) navigate(secondaryItems[0].link);
              else onShowToast(`Parcourir : ${navItem.label}`, 'info');
            }}
            className="group relative flex items-center gap-3.5 p-3.5 sm:p-4 bg-gradient-to-r from-[#107C10] to-[#0d690d] hover:from-[#138e13] hover:to-[#0f770f] border border-white/20 text-white text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/30 group-hover:scale-110 transition-transform">
              <Compass className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-xs sm:text-sm leading-snug truncate">
                {secondaryItems[0]?.label || `Parcourir ${navItem.label}`}
              </h4>
              <span className="text-[10px] text-white/70 block truncate">
                {secondaryItems[0]?.description || "Catalogue & options"}
              </span>
            </div>
          </button>

          {/* Tile 3: Tuile verte tertiaire - Rechercher */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              onShowToast(`Recherche globale dans ${navItem.label}`, 'info');
            }}
            className="group relative flex items-center gap-3.5 p-3 sm:p-3.5 bg-gradient-to-r from-[#107C10] to-[#0d690d] hover:from-[#138e13] hover:to-[#0f770f] border border-white/20 text-white text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center shrink-0 border border-white/30 group-hover:scale-110 transition-transform">
              <Search className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-xs leading-snug">
                Rechercher dans {navItem.label}
              </h4>
              <span className="text-[9.5px] text-white/70">Filtre instantané</span>
            </div>
          </button>
        </div>

        {/* ── COLONNE CENTRALE (Grande affiche Hero Spotlight) ── */}
        <div className="md:col-span-5 flex flex-col">
          <div 
            onClick={() => handleItemClick(featuredItem)}
            className="group relative w-full h-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px] rounded-none overflow-hidden border border-white/20 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01]"
          >
            {/* Image de fond */}
            <img 
              src={featuredImg} 
              alt={featuredItem.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay sombre & cinéma */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />

            {/* Badges supérieurs */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
              <span className="px-2.5 py-1 rounded-sm bg-[#107C10] text-white text-[10px] font-black tracking-widest uppercase shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                À la une
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-mono">
                {categoryLabel.toUpperCase()}
              </span>
            </div>

            {/* Contenu textuel inférieur */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  Nouveau & Prioritaire
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
                {featuredItem.label}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
                {featuredItem.description || `Explorez toutes les fonctionnalités et paramètres de ${featuredItem.label}.`}
              </p>

              {/* Bouton d'action */}
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white text-slate-950 font-bold text-xs group-hover:bg-emerald-400 group-hover:text-black transition-colors shadow-lg">
                  <span>Accéder au module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Glossy highlight line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>

        {/* ── COLONNE DROITE (Bento Grid de tuiles secondaires) ── */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-3.5">
          {secondaryItems.slice(1, 5).map((item, idx) => {
            const ItemIcon = item.icon || FolderOpen;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleItemClick(item)}
                className="group relative flex flex-col justify-between p-3.5 sm:p-4 min-h-[110px] sm:min-h-[120px] bg-slate-900/80 hover:bg-slate-850 border border-white/15 hover:border-emerald-400/50 text-white text-left transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg backdrop-blur-md cursor-pointer overflow-hidden"
              >
                <div className="flex items-start justify-between w-full">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-white/10 flex items-center justify-center text-emerald-400 border border-white/15 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>

                <div className="mt-2 min-w-0">
                  <h4 className="font-semibold text-xs sm:text-sm text-white leading-tight truncate group-hover:text-emerald-300 transition-colors">
                    {item.label}
                  </h4>
                  <p className="text-[10px] text-white/60 line-clamp-1 mt-0.5">
                    {item.description || "Consulter le dossier"}
                  </p>
                </div>

                {/* Subtle top edge glow */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/0 group-hover:via-emerald-400/60 to-transparent transition-all" />
              </button>
            );
          })}

          {/* Tuile 5 / 6 : Toutes les options & raccourcis */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              onShowToast(`Affichage complet du catalogue ${navItem.label}`, 'info');
            }}
            className="sm:col-span-2 group relative flex items-center justify-between p-3 sm:p-4 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400 text-white text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/40">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  Toutes les options de {navItem.label}
                </h4>
                <p className="text-[10px] text-emerald-200/80 truncate">
                  Afficher les {allSubMenuItems.length} modules disponibles
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-sm bg-emerald-500 text-black font-bold text-[10px] uppercase tracking-wider shrink-0 shadow-xs">
              Explorer
            </span>
          </button>
        </div>

      </div>

      {/* ── BARRE DE CONTRÔLE MANETTE XBOX (Exactement comme sur la photo au bas) ── */}
      <div className="w-full flex items-center justify-between pt-3 pb-1 border-t border-white/10 text-white/70 text-xs select-none">
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          {/* Bouton A : Sélectionner */}
          <div className="flex items-center gap-1.5">
            <span className="w-4.5 h-4.5 rounded-full bg-[#107C10] text-white font-bold text-[11px] flex items-center justify-center shadow-xs border border-emerald-400/50">
              A
            </span>
            <span className="text-white/90 text-xs font-medium">Sélectionner</span>
          </div>

          {/* Bouton Y : Rechercher */}
          <div className="flex items-center gap-1.5">
            <span className="w-4.5 h-4.5 rounded-full bg-[#F2B705] text-black font-bold text-[11px] flex items-center justify-center shadow-xs border border-amber-300/50">
              Y
            </span>
            <span className="text-white/90 text-xs font-medium">Rechercher</span>
          </div>

          {/* Bouton X : Actions Rapides */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-4.5 h-4.5 rounded-full bg-[#0078D7] text-white font-bold text-[11px] flex items-center justify-center shadow-xs border border-blue-400/50">
              X
            </span>
            <span className="text-white/90 text-xs font-medium">Raccourcis</span>
          </div>
        </div>

        {/* Boutons LB / RB pour changer d'onglet */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-sm bg-white/15 text-white/80 font-mono text-[10px] border border-white/20">
            LB / RB
          </span>
          <span className="text-white/70 text-xs hidden sm:inline">Naviguer entre onglets</span>
        </div>
      </div>
    </div>
  );
}
