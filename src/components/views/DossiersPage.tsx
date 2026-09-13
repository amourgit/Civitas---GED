import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FolderPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import { FolderItem } from '../../types/document';
import { DocumentGrid } from '../collection/DocumentGrid';
import { 
  getCasierById, 
  getRayonById, 
  getSalleById, 
  getFoldersForCasier, 
  buildDocumentationUrl, 
  buildRayonUrl 
} from '../../data/archiveStructure';
import { ArchiveHeaderPipeline } from '../archive/ArchiveHeaderPipeline';
import { playXboxSound } from '../../utils/xboxAudio';

interface DossiersPageProps {
  folders: FolderItem[];
  selectedFolderId: string | null;
  onSelectFolder: (folder: FolderItem) => void;
  onToggleFavorite: (folder: FolderItem) => void;
  onDeleteFolder: (folder: FolderItem) => void;
  onViewProperties: (folder: FolderItem) => void;
  onPreviewSpecial: (folder: FolderItem) => void;
  onShare: (folder: FolderItem) => void;
  onCreateFolder?: () => void;
}

export function DossiersPage({
  folders,
  selectedFolderId,
  onSelectFolder,
  onToggleFavorite,
  onDeleteFolder,
  onViewProperties,
  onPreviewSpecial,
  onShare,
  onCreateFolder
}: DossiersPageProps) {
  const { salleId, rayonId, casierId } = useParams<{ salleId?: string; rayonId?: string; casierId: string }>();
  const navigate = useNavigate();

  const casier = getCasierById(casierId);
  const rayon = (rayonId ? getRayonById(rayonId) : undefined) || (casier ? getRayonById(casier.rayonId) : undefined);
  const salle = (salleId ? getSalleById(salleId) : undefined) || (rayon ? getSalleById(rayon.salleId) : undefined);

  const finalSalleId = salle ? salle.id : 's01';
  const finalRayonId = rayon ? rayon.id : 'ry101';

  const casierFolders = useMemo(() => {
    if (!casier) return [];
    return getFoldersForCasier(casier.id, folders);
  }, [casier, folders]);

  const handleOpenFolder = (folder: FolderItem) => {
    playXboxSound('select');
    onSelectFolder(folder);
  };

  if (!casier) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-2">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Casier introuvable</h2>
        <p className="text-sm text-white/50 max-w-md">
          Le casier identifié par « {casierId} » n'existe pas dans le rayonnage.
        </p>
        <button
          type="button"
          onClick={() => {
            playXboxSound('back');
            navigate(buildDocumentationUrl());
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux salles de documentation</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative select-none min-h-0">
      {/* Dynamic Archive Header Pipeline */}
      <ArchiveHeaderPipeline
        currentLevel="dossier"
        salle={salle}
        rayon={rayon}
        casier={casier}
        title={`Dossiers du casier : ${casier.name}`}
        subtitle={`Niveau 4 — ${casier.lockerType} • ${casierFolders.length} dossier(s) indexé(s)`}
        backTo={buildRayonUrl(finalSalleId, finalRayonId)}
        backLabel={rayon ? `Retour au rayon (${rayon.matricule})` : 'Retour aux salles'}
        rightAction={
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-xs font-bold text-white bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-emerald-400/30">
              <span className="hidden sm:inline">{casierFolders.length} dossier(s)</span>
              <span className="sm:hidden">{casierFolders.length} doss.</span>
            </span>
            {onCreateFolder && (
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  onCreateFolder();
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-emerald-500/25 text-emerald-300 hover:text-white border border-emerald-400/50 text-[10px] sm:text-xs font-semibold cursor-pointer transition-all"
              >
                <FolderPlus className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                <span className="hidden sm:inline">Créer dossier</span>
                <span className="sm:hidden">Créer</span>
              </button>
            )}
          </div>
        }
      />

      {/* Main Viewport Content */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-2 sm:px-4 md:px-6 py-2 sm:py-3 pb-12 min-h-0"
        data-scrollable="true"
      >
        <DocumentGrid
          folders={casierFolders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={onSelectFolder}
          onOpenFolder={handleOpenFolder}
          onPreviewSpecial={onPreviewSpecial}
          onShare={onShare}
          onToggleFavorite={onToggleFavorite}
          onViewProperties={onViewProperties}
          onDelete={onDeleteFolder}
        />
      </div>
    </div>
  );
}
