import React from 'react';
import { 
  Play, 
  Settings2, 
  Scan, 
  Upload, 
  FolderTree, 
  Mail, 
  Cloud, 
  Share2, 
  FolderSync, 
  Grid, 
  History,
  HardDrive,
  PanelLeftClose
} from 'lucide-react';

interface IngestionSidebarProps {
  activeSource: string;
  onSelectSource: (sourceId: string) => void;
  onNewSession?: () => void;
  onOpenTools?: () => void;
  onOpenScanner?: () => void;
  storageUsed?: string;
  storageTotal?: string;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function IngestionSidebar({
  activeSource,
  onSelectSource,
  onNewSession,
  onOpenTools,
  onOpenScanner,
  storageUsed = '24,8 Go',
  storageTotal = '100 Go',
  className = '',
  isOpen = true,
  onClose
}: IngestionSidebarProps) {
  const sources = [
    { id: 'scan', label: 'Scan / OCR', icon: <Scan className="w-4 h-4" /> },
    { id: 'import', label: 'Importation de fichiers', icon: <Upload className="w-4 h-4" /> },
    { id: 'folder', label: 'Bureau / Dossier', icon: <FolderTree className="w-4 h-4" /> },
    { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { id: 'cloud', label: 'Connecteurs (Cloud)', icon: <Cloud className="w-4 h-4" /> },
    { id: 'api', label: 'API / Webhooks', icon: <Share2 className="w-4 h-4" /> },
    { id: 'shared', label: 'Dossier partagé', icon: <FolderSync className="w-4 h-4" /> },
    { id: 'apps', label: 'Applications métier', icon: <Grid className="w-4 h-4" /> }
  ];

  return (
    <aside 
      className={`shrink-0 flex flex-col justify-between py-6 px-5 bg-transparent border-none z-50 select-none overflow-y-auto scrollbar-none transition-transform duration-300 ease-out max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-72 max-lg:bg-[#040e12]/95 max-lg:backdrop-blur-2xl max-lg:border-r max-lg:border-emerald-500/25 max-lg:shadow-[0_0_50px_rgba(0,0,0,0.95)] ${
        isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
      } ${className}`}
      aria-label="Navigation Ingestion"
    >
      <div className="flex flex-col gap-6">
        
        {/* Mobile/Tablet Close Header */}
        <div className="flex items-center justify-between lg:hidden pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="text-xs font-semibold text-white/70 uppercase tracking-wider font-mono">Menu Ingestion</span>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-transparent hover:bg-white/10 text-white/70 hover:text-emerald-400 border border-white/10 transition-colors cursor-pointer"
              title="Fermer le menu"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Top Header Label */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/50 tracking-wider uppercase pl-1">
            <span className="text-emerald-400">›</span>
            <span>Ingestion de documents</span>
          </div>

          {/* Action: Nouvelle session (Xbox Style Free Floating Text & Glowing Icon) */}
          <button
            type="button"
            onClick={onNewSession}
            className="group flex items-center gap-3 px-2 py-2 text-left cursor-pointer transition-all duration-200 outline-none"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-emerald-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] shrink-0 group-hover:scale-110 transition-transform">
              <Play className="w-3 h-3 fill-emerald-400 translate-x-0.5" />
            </div>
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              Nouvelle session
            </span>
          </button>

          {/* Outils d'ingestion */}
          <button
            type="button"
            onClick={onOpenTools}
            className="group flex items-center gap-3 px-2 py-1.5 text-white/70 hover:text-white transition-all text-xs cursor-pointer text-left outline-none"
          >
            <Settings2 className="w-4 h-4 text-white/60 group-hover:text-white shrink-0" />
            <span className="group-hover:translate-x-0.5 transition-transform">Outils d'ingestion</span>
          </button>
        </div>

        {/* Section SOURCES */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400/70 tracking-widest uppercase pl-2 mb-1">
            <span>⌄ SOURCES</span>
          </div>

          {sources.map((src) => {
            const isActive = activeSource === src.id;
            return (
              <button
                key={src.id}
                type="button"
                onClick={() => {
                  if (src.id === 'scan' && onOpenScanner) {
                    onOpenScanner();
                  } else {
                    onSelectSource(src.id);
                  }
                }}
                className={`group flex items-center gap-3 px-2 py-1.5 bg-transparent border-none transition-all duration-200 text-left text-xs cursor-pointer outline-none ${
                  isActive
                    ? 'text-[#4ade80] font-bold translate-x-1.5 drop-shadow-[0_0_10px_rgba(74,222,128,0.7)]'
                    : 'text-white/70 hover:text-white hover:translate-x-1'
                }`}
              >
                <span className={`shrink-0 transition-all duration-200 ${isActive ? 'text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.9)] scale-110' : 'text-white/60 group-hover:text-white'}`}>
                  {src.icon}
                </span>
                <span className="truncate tracking-wide">{src.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section HISTORIQUE */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400/70 tracking-widest uppercase pl-2 mb-1">
            <span>• HISTORIQUE</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectSource('history')}
            className={`group flex items-center gap-3 px-2 py-1.5 bg-transparent border-none transition-all duration-200 text-left text-xs cursor-pointer outline-none ${
              activeSource === 'history'
                ? 'text-[#4ade80] font-bold translate-x-1.5 drop-shadow-[0_0_10px_rgba(74,222,128,0.7)]'
                : 'text-white/70 hover:text-white hover:translate-x-1'
            }`}
          >
            <History className={`w-4 h-4 shrink-0 transition-colors ${activeSource === 'history' ? 'text-[#4ade80]' : 'text-white/60 group-hover:text-white'}`} />
            <span className="tracking-wide">Sessions précédentes</span>
          </button>
        </div>

      </div>

      {/* Storage Indicator at Bottom of Sidebar */}
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-3.5">
        {/* Radial Progress Circle */}
        <div className="relative w-10 h-10 shrink-0 flex items-center justify-center">
          <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
            <circle
              cx="20"
              cy="20"
              r="15"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3.5"
              fill="none"
            />
            <circle
              cx="20"
              cy="20"
              r="15"
              stroke="#4ade80"
              strokeWidth="3.5"
              strokeDasharray="94.2"
              strokeDashoffset="70.5"
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-[0_0_6px_#4ade80]"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-emerald-400">
            <HardDrive className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-white tracking-tight">Espace utilisé</span>
          <span className="text-[10px] text-white/50">{storageUsed} / {storageTotal}</span>
          <span className="text-[9px] text-white/35 mt-0.5 leading-tight">
            Plus d'options de stockage pour vos besoins.
          </span>
        </div>
      </div>
    </aside>
  );
}
