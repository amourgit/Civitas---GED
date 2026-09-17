import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { FolderItem } from '../../types/document';
import { FolderVisual } from './FolderVisual';
import { FolderContextMenu } from './FolderContextMenu';
import { getFolderMatricule } from '../../data/mockFolders';

interface FolderCardProps {
  key?: React.Key;
  folder: FolderItem;
  isSelected?: boolean;
  onSelect?: (folder: FolderItem) => void;
  onOpen?: (folder: FolderItem) => void;
  onPreviewSpecial?: (folder: FolderItem) => void;
  onShare?: (folder: FolderItem) => void;
  onToggleFavorite?: (folder: FolderItem) => void;
  onViewProperties?: (folder: FolderItem) => void;
  onDelete?: (folder: FolderItem) => void;
}

export function FolderCard({
  folder,
  isSelected,
  onSelect,
  onOpen,
  onPreviewSpecial,
  onShare,
  onToggleFavorite,
  onViewProperties,
  onDelete
}: FolderCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const matricule = getFolderMatricule(folder);

  const handleOpen = () => {
    if (onOpen) onOpen(folder);
    else if (onSelect) onSelect(folder);
  };

  return (
    <div
      onClick={() => onSelect?.(folder)}
      onDoubleClick={handleOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMenuOpen(false);
      }}
      className="group relative flex flex-col items-center justify-between p-2 rounded-2xl transition-all duration-300 cursor-pointer select-none min-h-[190px]"
    >
      {/* Dynamic ambient floor spotlight under the folder (free from any card box) */}
      <div 
        className={`absolute bottom-9 w-28 h-5 rounded-full transition-all duration-300 pointer-events-none ${
          isSelected 
            ? 'opacity-80 scale-110' 
            : isHovered 
              ? 'opacity-40 scale-100' 
              : 'opacity-10 scale-90'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.7) 0%, rgba(16,185,129,0.15) 50%, transparent 80%)',
          filter: 'blur(5px)'
        }}
      />

      {/* Options menu trigger button (floating discreetly at top right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className={`absolute top-0 right-1 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-30 ${
          isMenuOpen || isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        title="Options du dossier"
      >
        <MoreHorizontal className="w-4 h-4 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]" />
      </button>

      {/* 3D Visual Preview - completely free */}
      <div className="w-full flex-1 flex items-center justify-center pt-2">
        <FolderVisual folder={folder} isHovered={isHovered} />
      </div>

      {/* Label and Info Metadata */}
      <div className="w-full flex flex-col items-center text-center mt-2 z-10">
        {/* Name pill / highlight */}
        <div 
          className={`px-3 py-1 rounded-lg transition-all duration-200 flex items-center justify-center max-w-[95%] ${
            isSelected
              ? 'bg-emerald-500/25 border border-emerald-400/60 text-white shadow-[0_0_16px_rgba(16,185,129,0.4)] backdrop-blur-sm'
              : 'bg-transparent text-white/95 group-hover:text-emerald-300'
          }`}
        >
          <h3 
            className="font-medium text-[13px] sm:text-sm tracking-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            title={folder.name}
          >
            {folder.name}
          </h3>
        </div>

        {/* Matricule gravé en calligraphie humaine - texte libre sans background */}
        <div className="mt-0.5 flex items-center justify-center pointer-events-none select-none">
          <span className="font-handwriting text-amber-200/90 text-xs sm:text-sm font-bold tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] opacity-90 rotate-[-1deg]">
            #{matricule}
          </span>
        </div>

        {/* Item count & Updated date */}
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/50 font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          <span>{folder.itemCount} éléments</span>
          <span>•</span>
          <span>{folder.updatedAt}</span>
        </div>
      </div>

      {/* Context Menu Dropdown */}
      {isMenuOpen && (
        <FolderContextMenu
          folder={folder}
          onOpen={() => handleOpen()}
          onPreview={() => onPreviewSpecial ? onPreviewSpecial(folder) : handleOpen()}
          onShare={() => onShare?.(folder)}
          onToggleFavorite={() => onToggleFavorite?.(folder)}
          onViewProperties={() => onViewProperties?.(folder)}
          onDownload={() => {
            // Simulated download
          }}
          onDelete={() => onDelete?.(folder)}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
