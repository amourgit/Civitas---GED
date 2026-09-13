import React, { useState, useEffect } from 'react';
import { X, Maximize2, Sparkles, Folder, ArrowLeft } from 'lucide-react';
import { InteractiveFolderGallery, GalleryPhoto } from './InteractiveFolderGallery';
import { FolderItem } from '../../types/document';
import { playXboxSound } from '../../utils/xboxAudio';

interface InteractiveFolderModalProps {
  folder: FolderItem;
  isOpen: boolean;
  onClose: () => void;
  onPhotoClick?: (photo: GalleryPhoto) => void;
}

export function InteractiveFolderModal({
  folder,
  isOpen,
  onClose,
  onPhotoClick
}: InteractiveFolderModalProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    if (isOpen) {
      playXboxSound('folderOpen');
    }
  }, [isOpen]);

  const handleClose = () => {
    playXboxSound('back');
    onClose();
  };

  const handleOpenPhoto = (photo: GalleryPhoto) => {
    playXboxSound('modalOpen');
    setSelectedPhoto(photo);
    if (onPhotoClick) onPhotoClick(photo);
  };

  const handleClosePhoto = () => {
    playXboxSound('back');
    setSelectedPhoto(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#020608]/90 backdrop-blur-2xl animate-in fade-in duration-300">
      {/* Top Header with Breadcrumbs & Actions */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.08] bg-[#03090c]/80 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux documents</span>
          </button>

          <div className="h-4 w-px bg-white/[0.1] mx-1" />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/40">Documents</span>
            <span className="text-white/30">›</span>
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Folder className="w-4 h-4 text-emerald-400" />
              <span>{folder.name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mode Dossier Interactif 3D</span>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage with user's InteractiveFolderGallery */}
      <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden p-6">
        {/* Luminous atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="w-full max-w-5xl">
          <InteractiveFolderGallery
            photos={folder.photos}
            folderName={folder.name}
            dragHintText="Glissez une photo vers le bas pour refermer le dossier"
          />
        </div>
      </div>

      {/* Photo Lightbox Preview modal if user clicks on an unstacked photo */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClosePhoto}
        >
          <div 
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#0a1518]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.image} 
              alt={selectedPhoto.title || "Photo"}
              className="w-full h-auto max-h-[75vh] object-contain"
            />
            <div className="p-4 bg-[#051114]/90 border-t border-white/10 flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium text-sm">
                  {selectedPhoto.title || `Image #${selectedPhoto.id}`}
                </h4>
                <p className="text-white/40 text-xs mt-0.5">
                  {selectedPhoto.dimensions || '3840 × 2160'} • {selectedPhoto.size || '7.4 Mo'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClosePhoto}
                className="px-4 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-medium cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
