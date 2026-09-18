import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Folder, FileText } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { initialFolders } from '../../data/mockFolders';
import { FolderItem } from '../../types/document';

interface RecentViewedDocumentsSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onSelectDocument?: (docId: string) => void;
  onNavigateToDocuments: () => void;
}

export function RecentViewedDocumentsSection({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments
}: RecentViewedDocumentsSectionProps) {
  const navigate = useNavigate();

  const recentFolders = React.useMemo(() => {
    return initialFolders.slice(0, 4);
  }, []);

  const handleSelectFolder = (folder: FolderItem) => {
    playXboxSound('select');
    setActiveCardId(folder.id);
    navigate('/dossiers');
  };

  return (
    <section className="w-full flex flex-col justify-center select-none">
      {/* Sleek Compact Grid of 4 Recent Folders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 items-stretch">
        {recentFolders.map((folder) => {
          const isSelected = activeCardId === folder.id;
          return (
            <div
              key={folder.id}
              onClick={() => handleSelectFolder(folder)}
              onMouseEnter={() => {
                playXboxSound('hover');
                setActiveCardId(folder.id);
              }}
              className={`p-2 sm:p-2.5 md:p-3 rounded-[3px] bg-gradient-to-b from-[#091722]/90 to-[#030a10]/95 backdrop-blur-md cursor-pointer transition-all duration-150 flex flex-col justify-between h-24 sm:h-28 md:h-32 ${
                isSelected
                  ? 'border-2 border-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.35)] ring-1 ring-[#22c55e]/50'
                  : 'border border-white/10 hover:border-[#22c55e]/70'
              }`}
            >
              <div className="flex items-start justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xs bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Folder className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[8px] sm:text-[9px] font-mono font-bold text-emerald-300 block truncate">
                      {folder.matricule}
                    </span>
                    <span className="text-[7px] sm:text-[8px] text-white/50 font-mono block">
                      {folder.type || 'Dossier Métier'}
                    </span>
                  </div>
                </div>
                <span className="text-[7px] sm:text-[8px] font-mono px-1 py-0.2 rounded-xs bg-white/10 text-white/70 shrink-0">
                  {folder.status || 'Actif'}
                </span>
              </div>

              <div className="my-0.5">
                <h4 className="text-white font-bold text-[11px] sm:text-xs tracking-tight line-clamp-1 group-hover:text-emerald-200 transition-colors">
                  {folder.name}
                </h4>
              </div>

              <div className="pt-1 border-t border-white/[0.08] flex items-center justify-between text-[8px] sm:text-[9px] text-white/60 font-mono">
                <span className="flex items-center gap-1">
                  <FileText className="w-2.5 h-2.5 text-emerald-400" />
                  <span>{folder.itemCount || 12} pièces</span>
                </span>
                <span className="text-emerald-400 group-hover:underline flex items-center gap-0.5">
                  <span>Ouvrir</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
