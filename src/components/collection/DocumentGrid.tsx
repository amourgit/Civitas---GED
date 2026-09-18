import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  Video, 
  Archive, 
  Download, 
  Share2, 
  Star, 
  Trash2, 
  Eye, 
  Calendar, 
  Tag, 
  HardDrive,
  FolderOpen,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { FolderItem, GalleryPhoto } from '../../types/document';
import { InteractiveFolderGallery } from '../folder/InteractiveFolderGallery';
import { playXboxSound } from '../../utils/xboxAudio';

interface DocumentGridProps {
  folders: FolderItem[];
  selectedFolderId: string | null;
  onSelectFolder: (folder: FolderItem) => void;
  onOpenFolder?: (folder: FolderItem) => void;
  onPreviewSpecial?: (folder: FolderItem) => void;
  onShare?: (folder: FolderItem) => void;
  onToggleFavorite?: (folder: FolderItem) => void;
  onViewProperties?: (folder: FolderItem) => void;
  onDelete?: (folder: FolderItem) => void;
}

const curatedPhotosByTheme: Record<string, string[]> = {
  gallery: [
    "https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg",
    "https://cdn.21st.dev/assets/mirror/e7/e7138a367854517395ba458c0c7c6481cf28afdc227b7d0045973e03e5b1d1c0.jpg",
    "https://cdn.21st.dev/assets/mirror/96/9626c87f656eaa15e08486db4e7ecc217c0243440a21d301a3af6c8092b22a9b.jpg",
    "https://cdn.21st.dev/assets/mirror/da/dacbcb481226af6c6e6bf6426da535ce260db87270fb641953617ffe4a1145bf.jpg",
    "https://cdn.21st.dev/assets/mirror/6e/6e5ed03abf45ab11ad4c94b60bb3cb60326807a1777b2a6e8888d3179f237cd9.jpg",
  ],
  emerald: [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
  ],
  purple: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
  ],
  blue: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
  ],
  amber: [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
  ],
  teal: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
  ],
  cyan: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
  ],
  steel: [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
  ],
};

function getPhotosForFolder(folder: FolderItem): GalleryPhoto[] {
  if (folder.photos && folder.photos.length >= 5) {
    return folder.photos.slice(0, 5).map((p, idx) => ({ id: p.id ?? idx + 1, image: p.image, title: p.title }));
  }
  const themeList = curatedPhotosByTheme[folder.folderTheme] || curatedPhotosByTheme.gallery;
  return themeList.map((img, idx) => ({
    id: `${folder.id}-${idx}`,
    image: img,
    title: `Document ${idx + 1}`
  }));
}

export function DocumentGrid({
  folders,
  selectedFolderId,
  onSelectFolder,
  onOpenFolder,
  onPreviewSpecial,
  onShare,
  onToggleFavorite,
  onViewProperties,
  onDelete
}: DocumentGridProps) {
  // In-situ opened folder state inside the exact same page & section
  const [inSituFolder, setInSituFolder] = useState<FolderItem | null>(null);
  const [selectedPreviewPhoto, setSelectedPreviewPhoto] = useState<GalleryPhoto | null>(null);

  if (folders.length === 0) {
    return (
      <div className="w-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-[#07181b]/30 border border-white/[0.06] backdrop-blur-md">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
          <FolderOpen className="w-7 h-7" />
        </div>
        <h3 className="text-white font-semibold text-lg">Aucun dossier trouvé</h3>
        <p className="text-white/40 text-sm max-w-sm mt-1">
          Aucun élément ne correspond aux filtres actuels ou à votre recherche.
        </p>
      </div>
    );
  }

  // If a folder is opened in-situ, render its content cleanly in the same container
  if (inSituFolder) {
    const photos = getPhotosForFolder(inSituFolder);
    const files = inSituFolder.filesInside || photos.map((p, idx) => ({
      id: String(p.id),
      name: p.title || `Pièce_Justificative_${idx + 1}.pdf`,
      type: 'pdf' as const,
      size: '1.4 MB',
      updatedAt: inSituFolder.updatedAt,
      url: p.image
    }));

    return (
      <div className="w-full bg-[#08121d]/90 border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 animate-in fade-in duration-200 shadow-2xl">
        {/* Navigation bar with back button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-start sm:items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playXboxSound('back');
                setInSituFolder(null);
                setSelectedPreviewPhoto(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 text-xs font-semibold font-mono transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span>Tous les dossiers</span>
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                {inSituFolder.matricule && (
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/25">
                    N° {inSituFolder.matricule}
                  </span>
                )}
                <span className="text-[11px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  {files.length} élément{files.length > 1 ? 's' : ''}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Modifié le {inSituFolder.updatedAt}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {inSituFolder.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  onToggleFavorite(inSituFolder);
                }}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  inSituFolder.isFavorite 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                    : 'bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white border-white/10'
                }`}
                title="Favoris"
              >
                <Star className="w-4 h-4" />
              </button>
            )}
            {onShare && (
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  onShare(inSituFolder);
                }}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Partager"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Folder Description and Properties */}
        {inSituFolder.description && (
          <div className="p-4 rounded-xl bg-black/30 border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
            <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Description</span>
            {inSituFolder.description}
          </div>
        )}

        {/* In-situ Documents & Photos Grid */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Contenu & Pièces justificatives du dossier ({files.length})</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">
              Cliquez sur une pièce pour l'aperçu instantané
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {files.map((file, idx) => {
              const photoMatch = photos[idx % photos.length];
              return (
                <div
                  key={file.id || idx}
                  onClick={() => {
                    playXboxSound('select');
                    setSelectedPreviewPhoto(photoMatch);
                  }}
                  className="bg-black/40 hover:bg-black/60 border border-white/10 hover:border-emerald-500/40 rounded-xl p-3.5 transition-all flex flex-col justify-between gap-3 cursor-pointer group shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-400/50">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.type.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {photoMatch?.image && (
                    <div className="w-full h-28 rounded-lg overflow-hidden border border-white/[0.06] bg-black/50 relative">
                      <img 
                        src={photoMatch.image} 
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                        <span className="text-[10px] text-white font-mono bg-black/60 px-1.5 py-0.5 rounded">
                          Aperçu visuel
                        </span>
                        <Eye className="w-4 h-4 text-emerald-300" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-white/[0.04]">
                    <span>{file.updatedAt}</span>
                    <span className="text-emerald-400 flex items-center gap-1 group-hover:underline">
                      <span>Ouvrir</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* In-situ Full Image Preview Modal */}
        {selectedPreviewPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
            onClick={() => setSelectedPreviewPhoto(null)}
          >
            <div 
              className="bg-[#0b1624] border border-white/20 rounded-2xl max-w-3xl w-full p-4 flex flex-col gap-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="font-mono text-sm font-bold text-white">
                  {selectedPreviewPhoto.title || 'Aperçu du document'}
                </h4>
                <button
                  type="button"
                  onClick={() => setSelectedPreviewPhoto(null)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  Fermer
                </button>
              </div>

              <div className="w-full max-h-[60vh] rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <img 
                  src={selectedPreviewPhoto.image} 
                  alt="Aperçu"
                  className="max-h-[60vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
                <span>Dossier : {inSituFolder.name}</span>
                <span className="text-emerald-400">Prêt pour consultation officielle</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default Grid View: Clean, spaced out without overload
  return (
    <div className="w-full relative pb-4 sm:pb-8 md:pb-12 overflow-visible mt-0 sm:mt-2">
      {/* Responsive Grid: well-proportioned with generous gaps */}
      <div className="grid grid-cols-1 min-[340px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 sm:gap-y-6 md:gap-y-8 gap-x-3 sm:gap-x-5 justify-items-center overflow-visible pt-1 pb-4">
        {folders.map((folder) => {
          const photos = getPhotosForFolder(folder);

          return (
            <div 
              key={folder.id} 
              className="w-full flex justify-center overflow-visible"
              onClick={() => {
                playXboxSound('select');
                onSelectFolder(folder);
              }}
            >
              <InteractiveFolderGallery
                folderName={folder.name}
                matricule={folder.matricule}
                photos={photos}
                dragHintText="Glissez vers le bas pour fermer"
                onViewMore={() => {
                  playXboxSound('select');
                  if (onOpenFolder) {
                    onOpenFolder(folder);
                  } else {
                    setInSituFolder(folder);
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

