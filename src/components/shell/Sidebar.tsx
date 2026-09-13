import React from 'react';
import { 
  Folder, 
  FolderOpen,
  User, 
  Share2, 
  Clock, 
  Star, 
  Trash2, 
  LayoutGrid, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Archive,
  HardDrive
} from 'lucide-react';
import { CategoryFilter, NavigationSection } from '../../types/document';

interface SidebarProps {
  currentSection: NavigationSection;
  onSelectSection: (section: NavigationSection) => void;
  currentCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
}

export function Sidebar({
  currentSection,
  onSelectSection,
  currentCategory,
  onSelectCategory
}: SidebarProps) {
  const mainNavItems: Array<{ id: NavigationSection; label: string; icon: React.ReactNode }> = [
    { id: 'documents', label: 'Documents', icon: <Folder className="w-4 h-4" /> },
    { id: 'my_files', label: 'Mes fichiers', icon: <User className="w-4 h-4" /> },
    { id: 'shared', label: 'Partagés avec moi', icon: <Share2 className="w-4 h-4" /> },
    { id: 'recent', label: 'Récents', icon: <Clock className="w-4 h-4" /> },
    { id: 'favorites', label: 'Favoris', icon: <Star className="w-4 h-4" /> },
    { id: 'trash', label: 'Corbeille', icon: <Trash2 className="w-4 h-4" /> },
  ];

  const categoryItems: Array<{ id: CategoryFilter; label: string; icon: React.ReactNode }> = [
    { id: 'all', label: 'Tout', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'images', label: 'Images', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'videos', label: 'Vidéos', icon: <Video className="w-4 h-4" /> },
    { id: 'music', label: 'Musique', icon: <Music className="w-4 h-4" /> },
    { id: 'archives', label: 'Archives', icon: <Archive className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-[260px] lg:w-[280px] shrink-0 h-full flex flex-col justify-between py-6 px-4 bg-transparent border-none z-10 overflow-y-auto scrollbar-none select-none">
      <div className="space-y-6">
        {/* Section 1: Navigation Principale - Style Menu Xbox Libre (Pur Texte) */}
        <div className="space-y-2">
          {mainNavItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`group relative w-full flex items-center gap-3.5 px-2 py-1.5 bg-transparent border-none text-sm font-medium transition-all duration-200 cursor-pointer outline-none text-left ${
                  isActive
                    ? 'text-[#4ade80] font-bold translate-x-1.5 drop-shadow-[0_0_12px_rgba(74,222,128,0.7)]'
                    : 'text-white/70 hover:text-white hover:translate-x-1'
                }`}
              >
                <span className={`shrink-0 transition-all duration-200 ${isActive ? 'text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] scale-110' : 'text-white/60 group-hover:text-white'}`}>
                  {isActive && item.id === 'documents' ? <FolderOpen className="w-4 h-4" /> : item.icon}
                </span>
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section 2: Catégories - Menu Xbox (Pur Texte) */}
        <div className="space-y-2 pt-2">
          <div className="px-2 text-[11px] font-bold text-emerald-400/80 tracking-widest uppercase">
            Catégories
          </div>
          <div className="space-y-1.5">
            {categoryItems.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`group relative w-full flex items-center gap-3.5 px-2 py-1.5 bg-transparent border-none text-sm font-medium transition-all duration-200 cursor-pointer outline-none text-left ${
                    isActive
                      ? 'text-[#4ade80] font-bold translate-x-1.5 drop-shadow-[0_0_12px_rgba(74,222,128,0.7)]'
                      : 'text-white/70 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <span className={`shrink-0 transition-all duration-200 ${isActive ? 'text-[#4ade80] drop-shadow-[0_0_10px_rgba(74,222,128,0.9)] scale-110' : 'text-white/60 group-hover:text-white'}`}>
                    {cat.icon}
                  </span>
                  <span className="tracking-wide">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 3: Espace Utilisé - Floating libre sans bordure */}
      <div className="pt-4 space-y-3">
        <div className="flex items-center gap-3">
          {/* Circular progress badge with neon ring */}
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-transparent border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)] shrink-0">
            <HardDrive className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="17"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                className="text-white/[0.08]"
              />
              <circle
                cx="20"
                cy="20"
                r="17"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={106.8}
                strokeDashoffset={106.8 * (1 - 0.248)}
                strokeLinecap="round"
                className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.9)]"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-white/50 text-[11px] uppercase tracking-wider font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              Espace utilisé
            </span>
            <div className="flex items-baseline gap-1 text-sm font-semibold text-white">
              <span className="text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">24,8 Go</span>
              <span className="text-white/40 text-xs">/ 100 Go</span>
            </div>
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden p-0.5">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            style={{ width: '24.8%' }}
          />
        </div>

        {/* Small motto from mockup */}
        <div className="flex items-center gap-2 pt-1 text-white/40 text-[11px] leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
          <div className="w-5 h-5 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
            G
          </div>
          <span>Plus qu'un stockage, une vraie gestion.</span>
        </div>
      </div>
    </aside>
  );
}
