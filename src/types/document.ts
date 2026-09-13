export interface GalleryPhoto {
  id: string | number;
  image: string;
  title?: string;
  dimensions?: string;
  size?: string;
}

export type CategoryFilter = 'all' | 'documents' | 'images' | 'videos' | 'music' | 'archives';

export type NavigationSection = 'documents' | 'my_files' | 'shared' | 'recent' | 'favorites' | 'trash';

export type SortOption = 'recent' | 'oldest' | 'name_asc' | 'name_desc' | 'items_count';

export type ViewMode = 'grid' | 'list';

export interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'image' | 'video' | 'music' | 'archive';
  itemCount: number;
  updatedAt: string;
  category: CategoryFilter;
  folderTheme: 'gallery' | 'purple' | 'blue' | 'emerald' | 'amber' | 'gold' | 'cyan' | 'magenta' | 'steel' | 'violet' | 'azure' | 'dark-box' | 'orange' | 'teal' | 'deep-purple';
  iconType: 'photo' | 'folder-glow' | 'document' | 'team' | 'education' | 'finance' | 'resources' | 'marketing' | 'administrative' | 'personal' | 'partners' | 'archive' | 'events' | 'system' | 'misc';
  coverImage?: string;
  photos?: GalleryPhoto[];
  isSpecialGallery?: boolean;
  isFavorite?: boolean;
  size?: string;
  description?: string;
  permissions: {
    canEdit: boolean;
    canShare: boolean;
    canDelete: boolean;
    canDownload: boolean;
  };
  filesInside?: Array<{
    id: string;
    name: string;
    type: 'image' | 'pdf' | 'doc' | 'sheet' | 'zip' | 'audio' | 'video';
    size: string;
    updatedAt: string;
    url?: string;
  }>;
}
