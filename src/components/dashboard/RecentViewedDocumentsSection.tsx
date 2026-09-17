import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FolderOpen } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { DocumentGrid } from '../collection/DocumentGrid';
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
  onSelectDocument,
  onNavigateToDocuments
}: RecentViewedDocumentsSectionProps) {
  const navigate = useNavigate();

  // Use the actual existing folders from the app
  const recentFolders = React.useMemo(() => {
    return initialFolders.slice(0, 4);
  }, []);

  const handleSelectFolder = (folder: FolderItem) => {
    playXboxSound('select');
    setActiveCardId(folder.id);
    navigate('/dossiers');
  };

  return (
    <section className="w-full flex flex-col gap-3">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Dossiers
          </h3>
          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/75 text-[10px] font-mono">
            {recentFolders.length} récents
          </span>
        </div>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            navigate('/dossiers');
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Tous les dossiers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Real Interactive Folder Grid from the app */}
      <DocumentGrid
        folders={recentFolders}
        selectedFolderId={activeCardId}
        onSelectFolder={handleSelectFolder}
        onOpenFolder={handleSelectFolder}
        onPreviewSpecial={() => {}}
        onShare={() => {}}
        onToggleFavorite={() => {}}
        onViewProperties={handleSelectFolder}
        onDelete={() => {}}
      />
    </section>
  );
}
