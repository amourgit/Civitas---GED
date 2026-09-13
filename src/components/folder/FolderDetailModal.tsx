import React from 'react';
import { 
  X, 
  ArrowLeft, 
  Folder, 
  FileText, 
  Download, 
  Upload, 
  Share2, 
  FileSpreadsheet, 
  FileCode, 
  Image as ImageIcon,
  Video, 
  Archive,
  Star
} from 'lucide-react';
import { FolderItem } from '../../types/document';

interface FolderDetailModalProps {
  folder: FolderItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenSpecialGallery?: (folder: FolderItem) => void;
}

export function FolderDetailModal({
  folder,
  isOpen,
  onClose,
  onOpenSpecialGallery
}: FolderDetailModalProps) {
  if (!isOpen || !folder) return null;

  const renderFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-purple-400" />;
      case 'video':
        return <Video className="w-5 h-5 text-pink-400" />;
      case 'sheet':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'zip':
        return <Archive className="w-5 h-5 text-amber-400" />;
      case 'doc':
      case 'pdf':
      default:
        return <FileText className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#03090b]/90 backdrop-blur-2xl animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.08] bg-[#040d10]/70">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux dossiers</span>
          </button>

          <div className="h-4 w-px bg-white/[0.1] mx-1" />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/40">Documents</span>
            <span className="text-white/30">›</span>
            <span className="text-emerald-400 font-semibold">{folder.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {folder.isSpecialGallery && onOpenSpecialGallery && (
            <button
              onClick={() => onOpenSpecialGallery(folder)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              Vue Galerie Interactive 3D
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto w-full space-y-6">
        {/* Banner summary */}
        <div className="p-6 rounded-3xl bg-[#081f24]/60 border border-cyan-400/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <Folder className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-white text-xl font-bold tracking-tight">{folder.name}</h2>
              <p className="text-white/50 text-xs mt-1 max-w-xl">
                {folder.description || 'Dossier documentaire géré par GoFAST avec chiffrement et gestion des versions.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70">
              <span className="text-white/40">Taille :</span> <strong className="text-white font-semibold">{folder.size || '450 Mo'}</strong>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70">
              <span className="text-white/40">Éléments :</span> <strong className="text-white font-semibold">{folder.itemCount}</strong>
            </div>
          </div>
        </div>

        {/* Files list inside */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm tracking-wide">Fichiers contenus</h3>
            <span className="text-white/40 text-xs">{folder.filesInside?.length || 0} fichier(s) listé(s)</span>
          </div>

          <div className="bg-[#07191d]/50 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-xl">
            <div className="grid grid-cols-12 px-6 py-3 border-b border-white/[0.06] text-xs font-semibold text-white/40 uppercase tracking-wider">
              <div className="col-span-6">Nom du fichier</div>
              <div className="col-span-3">Dernière modification</div>
              <div className="col-span-2">Taille</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {(folder.filesInside || []).map((file) => (
                <div 
                  key={file.id} 
                  className="grid grid-cols-12 items-center px-6 py-3.5 hover:bg-white/[0.04] transition-colors text-sm"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                      {renderFileIcon(file.type)}
                    </div>
                    <span className="text-white/90 font-medium truncate">{file.name}</span>
                  </div>
                  <div className="col-span-3 text-xs text-white/50">{file.updatedAt}</div>
                  <div className="col-span-2 text-xs text-white/60">{file.size}</div>
                  <div className="col-span-1 text-right">
                    <button 
                      className="p-1.5 rounded-lg text-white/40 hover:text-emerald-400 hover:bg-white/[0.08] transition-colors"
                      title="Télécharger"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
