import React from 'react';
import { FolderItem } from '../../types/document';
import { InteractiveFolderGallery, GalleryPhoto } from '../folder/InteractiveFolderGallery';

interface DocumentGridProps {
  folders: FolderItem[];
  selectedFolderId: string | null;
  onSelectFolder: (folder: FolderItem) => void;
  onOpenFolder: (folder: FolderItem) => void;
  onPreviewSpecial: (folder: FolderItem) => void;
  onShare: (folder: FolderItem) => void;
  onToggleFavorite: (folder: FolderItem) => void;
  onViewProperties: (folder: FolderItem) => void;
  onDelete: (folder: FolderItem) => void;
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
};

function getPhotosForFolder(folder: FolderItem): GalleryPhoto[] {
  if (folder.photos && folder.photos.length >= 5) {
    return folder.photos.slice(0, 5).map((p, idx) => ({ id: p.id ?? idx + 1, image: p.image }));
  }
  const themeList = curatedPhotosByTheme[folder.folderTheme] || curatedPhotosByTheme.gallery;
  return themeList.map((img, idx) => ({
    id: `${folder.id}-${idx}`,
    image: img,
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
  if (folders.length === 0) {
    return (
      <div className="w-full min-h-[350px] flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-[#07181b]/30 border border-white/[0.06] backdrop-blur-md">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
          📁
        </div>
        <h3 className="text-white font-semibold text-lg">Aucun dossier trouvé</h3>
        <p className="text-white/40 text-sm max-w-sm mt-1">
          Aucun élément ne correspond aux filtres actuels ou à votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative pb-8 sm:pb-12 overflow-visible">
      {/* Responsive Grid with InteractiveFolderGallery: 2 on mobile, 3 on tablet, 4+ on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 sm:gap-y-6 md:gap-y-7 gap-x-2 sm:gap-x-3 md:gap-x-4 lg:gap-x-6 justify-items-center overflow-visible pt-1 pb-6 sm:pb-8">
        {folders.map((folder) => {
          const photos = getPhotosForFolder(folder);

          return (
            <div 
              key={folder.id} 
              className="w-full flex justify-center overflow-visible"
              onClick={() => onSelectFolder(folder)}
            >
              <InteractiveFolderGallery
                folderName={folder.name}
                photos={photos}
                dragHintText="Glissez vers le bas pour fermer"
              />
            </div>
          );
        })}
      </div>

      {/* Subtle floor reflection for the entire grid */}
      <div className="w-full h-8 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none mt-2 rounded-2xl" />
    </div>
  );
}
