import React from 'react';
import { 
  FolderOpen, 
  Eye, 
  Share2, 
  Edit2, 
  Copy, 
  Download, 
  Star, 
  ShieldCheck, 
  Info, 
  Archive, 
  Trash2 
} from 'lucide-react';
import { FolderItem } from '../../types/document';

interface FolderContextMenuProps {
  folder: FolderItem;
  onOpen: () => void;
  onPreview: () => void;
  onShare: () => void;
  onToggleFavorite: () => void;
  onViewProperties: () => void;
  onDownload: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function FolderContextMenu({
  folder,
  onOpen,
  onPreview,
  onShare,
  onToggleFavorite,
  onViewProperties,
  onDownload,
  onDelete,
  onClose
}: FolderContextMenuProps) {
  return (
    <div 
      className="absolute right-3 bottom-12 w-56 py-1.5 rounded-2xl bg-[#061417]/95 border border-white/[0.15] shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-xs"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-1.5 border-b border-white/[0.06] mb-1">
        <div className="font-semibold text-white/90 truncate">{folder.name}</div>
        <div className="text-[10px] text-white/40">{folder.itemCount} éléments • {folder.size || '350 Mo'}</div>
      </div>

      <button
        onClick={() => { onOpen(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-emerald-500/20 transition-colors cursor-pointer"
      >
        <FolderOpen className="w-3.5 h-3.5 text-emerald-400" />
        <span>Ouvrir</span>
      </button>

      {folder.isSpecialGallery && (
        <button
          onClick={() => { onPreview(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-emerald-500/20 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>Explorer en 3D</span>
        </button>
      )}

      {folder.permissions.canShare && (
        <button
          onClick={() => { onShare(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-blue-400" />
          <span>Partager</span>
        </button>
      )}

      <button
        onClick={() => { onToggleFavorite(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
      >
        <Star className={`w-3.5 h-3.5 ${folder.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-amber-400'}`} />
        <span>{folder.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}</span>
      </button>

      <button
        onClick={() => { onDownload(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-teal-400" />
        <span>Télécharger (.zip)</span>
      </button>

      <div className="h-px bg-white/[0.06] my-1" />

      <button
        onClick={() => { onViewProperties(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-1.5 text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
      >
        <Info className="w-3.5 h-3.5 text-white/50" />
        <span>Propriétés & Métadonnées</span>
      </button>

      {folder.permissions.canDelete && (
        <button
          onClick={() => { onDelete(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Déplacer vers Corbeille</span>
        </button>
      )}
    </div>
  );
}
