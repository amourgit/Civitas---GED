import React, { useMemo } from 'react';
import { FolderItem } from '../../types/document';
import { Xbox3DCarousel } from '../carousel/Xbox3DCarousel';
import { XboxCardItem } from '../carousel/Xbox3DCard';

interface Folders3DViewProps {
  folders: FolderItem[];
  selectedFolderId: string | null;
  onSelectFolder: (folder: FolderItem) => void;
  onOpenFolder: (folder: FolderItem) => void;
}

// Color palette mapping to reproduce the vibrant Xbox dashboard look
const colorThemes: Array<XboxCardItem['themeColor']> = [
  'green',
  'blue',
  'purple',
  'cyan',
  'teal',
  'orange',
  'violet',
  'amber',
  'red'
];

export function Folders3DView({
  folders,
  selectedFolderId,
  onSelectFolder,
  onOpenFolder
}: Folders3DViewProps) {
  // Convert FolderItem[] to XboxCardItem[]
  const cardItems = useMemo<XboxCardItem[]>(() => {
    return folders.map((folder, index) => {
      const themeColor = colorThemes[index % colorThemes.length];
      return {
        id: folder.id,
        title: folder.name,
        subtitle: `${folder.itemCount} éléments • ${folder.size || '340 Mo'}`,
        badge: `${folder.itemCount}`,
        type: 'folder',
        themeColor,
        metadata: folder
      };
    });
  }, [folders]);

  const activeIndex = useMemo(() => {
    const idx = folders.findIndex(f => f.id === selectedFolderId);
    return idx >= 0 ? idx : 0;
  }, [folders, selectedFolderId]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative overflow-visible">
      {/* Xbox 360 3D Horizontal Carousel */}
      <Xbox3DCarousel
        items={cardItems}
        activeIndex={activeIndex}
        onSelectIndex={(newIndex) => {
          if (folders[newIndex]) {
            onSelectFolder(folders[newIndex]);
          }
        }}
        onOpenItem={(cardItem) => {
          const folder = folders.find(f => f.id === cardItem.id);
          if (folder) {
            onOpenFolder(folder);
          }
        }}
        className="w-full"
      />

      {/* Keyboard & Interaction Hint */}
      <div className="mt-4 flex items-center gap-3 text-xs text-white/40 tracking-wider font-light">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[11px]">
          ◀ ▶ Défiler
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[11px]">
          ↵ Ouvrir
        </span>
        <span>•</span>
        <span>Double-clic pour explorer le dossier</span>
      </div>
    </div>
  );
}
