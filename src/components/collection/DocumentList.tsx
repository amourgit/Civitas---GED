import React from 'react';
import { MoreHorizontal, Folder, Star } from 'lucide-react';
import { FolderItem } from '../../types/document';

interface DocumentListProps {
  folders: FolderItem[];
  selectedFolderId: string | null;
  onSelectFolder: (folder: FolderItem) => void;
  onOpenFolder: (folder: FolderItem) => void;
  onToggleFavorite: (folder: FolderItem) => void;
}

export function DocumentList({
  folders,
  selectedFolderId,
  onSelectFolder,
  onOpenFolder,
  onToggleFavorite
}: DocumentListProps) {
  return (
    <div className="w-full bg-black/25 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
      <div className="grid grid-cols-12 px-6 py-3 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-white/50">
        <div className="col-span-5">Nom du dossier</div>
        <div className="col-span-3">Dernière modification</div>
        <div className="col-span-2">Éléments</div>
        <div className="col-span-1">Taille</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      <div className="divide-y divide-white/[0.06]">
        {folders.map((folder) => {
          const isSelected = selectedFolderId === folder.id;
          return (
            <div
              key={folder.id}
              onClick={() => onSelectFolder(folder)}
              onDoubleClick={() => onOpenFolder(folder)}
              className={`grid grid-cols-12 items-center px-6 py-3 text-sm transition-colors cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'hover:bg-white/[0.06] text-white/90'
              }`}
            >
              <div className="col-span-5 flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(folder);
                  }}
                  className="text-white/30 hover:text-amber-400 transition-colors"
                >
                  <Star className={`w-4 h-4 ${folder.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                </button>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Folder className="w-4 h-4" />
                </div>
                <span className="font-semibold truncate text-white">
                  {folder.name}
                </span>
                {folder.isSpecialGallery && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Galerie 3D
                  </span>
                )}
              </div>

              <div className="col-span-3 text-white/50 text-xs">
                {folder.updatedAt}
              </div>

              <div className="col-span-2 text-white/60 text-xs">
                {folder.itemCount} éléments
              </div>

              <div className="col-span-1 text-white/40 text-xs">
                {folder.size || '350 Mo'}
              </div>

              <div className="col-span-1 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenFolder(folder);
                  }}
                  className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08]"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
