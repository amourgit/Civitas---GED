import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playXboxSound } from '../../utils/xboxAudio';
import { initialFolders } from '../../data/mockFolders';
import { FolderItem } from '../../types/document';
import { InteractiveFolderGallery, GalleryPhoto } from '../folder/InteractiveFolderGallery';
import { FolderFilesOverlay } from '../folder/FolderFilesOverlay';

interface FavoriteFoldersSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onSelectFolder?: (folderId: string) => void;
  onNavigateToDocuments: () => void;
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
  ]
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

export function FavoriteFoldersSection({
  activeCardId,
  setActiveCardId,
  onSelectFolder,
  onNavigateToDocuments
}: FavoriteFoldersSectionProps) {
  const navigate = useNavigate();
  const [overlayFolder, setOverlayFolder] = useState<FolderItem | null>(null);

  const favoriteFolders = React.useMemo(() => {
    const favs = initialFolders.filter(f => f.isFavorite);
    return favs.length >= 4 ? favs.slice(0, 4) : initialFolders.slice(0, 4);
  }, []);

  const handleSelect = (folder: FolderItem) => {
    playXboxSound('select');
    setActiveCardId(folder.id);
    if (onSelectFolder) {
      onSelectFolder(folder.id);
    }
  };

  return (
    <section className="w-full flex-1 flex flex-col justify-center select-none overflow-visible py-2">
      {/* Interactive Folder Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-6 justify-items-center items-center overflow-visible">
        {favoriteFolders.map((folder) => {
          const photos = getPhotosForFolder(folder);

          return (
            <div
              key={folder.id}
              className="w-full flex justify-center overflow-visible"
              onClick={() => handleSelect(folder)}
            >
              <InteractiveFolderGallery
                folderName={folder.name}
                matricule={folder.matricule}
                photos={photos}
                dragHintText="Glissez vers le bas pour fermer"
                onViewMore={() => {
                  playXboxSound('select');
                  setOverlayFolder(folder);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Full-Page Document Overlay Viewer when clicking "Voir plus" */}
      {overlayFolder && (
        <FolderFilesOverlay
          folder={overlayFolder}
          isOpen={!!overlayFolder}
          onClose={() => setOverlayFolder(null)}
        />
      )}
    </section>
  );
}
