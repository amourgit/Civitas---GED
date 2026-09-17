import React, { useEffect } from 'react';
import { X, Folder, Calendar, Shield, HardDrive, FileText, CheckCircle, Hash } from 'lucide-react';
import { FolderItem } from '../../types/document';
import { playXboxSound } from '../../utils/xboxAudio';
import { getFolderMatricule } from '../../data/mockFolders';

interface FolderPropertiesModalProps {
  folder: FolderItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FolderPropertiesModal({ folder, isOpen, onClose }: FolderPropertiesModalProps) {
  useEffect(() => {
    if (isOpen) {
      playXboxSound('modalOpen');
    }
  }, [isOpen]);

  const handleClose = () => {
    playXboxSound('back');
    onClose();
  };

  if (!isOpen || !folder) return null;
  const matricule = getFolderMatricule(folder);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-md rounded-3xl bg-[#061518]/95 border border-cyan-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold text-base leading-snug">{folder.name}</h3>
              </div>
              <p className="text-white/40 text-xs">Propriétés du dossier GED</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Fermer les propriétés"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {/* Matricule gravé (calligraphie humaine, texte libre) */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
            <span className="text-white/50 flex items-center gap-2">
              <Hash className="w-4 h-4 text-amber-400" />
              Matricule gravé (base 10)
            </span>
            <span className="font-handwriting text-amber-200 text-sm font-bold tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              #{matricule}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
            <span className="text-white/50 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              Taille sur disque
            </span>
            <span className="text-white font-medium">{folder.size || '350 Mo'}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
            <span className="text-white/50 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Contenu
            </span>
            <span className="text-white font-medium">{folder.itemCount} éléments répertoriés</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
            <span className="text-white/50 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              Dernière mise à jour
            </span>
            <span className="text-white font-medium">{folder.updatedAt}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03]">
            <span className="text-white/50 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Niveau de sécurité
            </span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Chiffré AES-256
            </span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-medium text-xs transition-colors cursor-pointer"
          >
            Fermer les propriétés
          </button>
        </div>
      </div>
    </div>
  );
}
