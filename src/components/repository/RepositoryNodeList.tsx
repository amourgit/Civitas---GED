import React, { useState } from 'react';
import { 
  Folder, 
  FolderPlus, 
  Upload, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  LayoutList, 
  LayoutGrid, 
  GitFork, 
  ChevronRight, 
  Eye, 
  FolderOpen,
  ArrowLeft
} from 'lucide-react';
import { AlfrescoNode } from '../../types/repository';
import { FolderItem } from '../../types/document';
import { InteractiveFolderGallery, GalleryPhoto } from '../folder/InteractiveFolderGallery';
import { FolderFilesOverlay } from '../folder/FolderFilesOverlay';
import { playXboxSound } from '../../utils/xboxAudio';

interface RepositoryNodeListProps {
  currentNode: AlfrescoNode;
  childNodes: AlfrescoNode[];
  selectedNode: AlfrescoNode | null;
  onSelectNode: (node: AlfrescoNode) => void;
  onOpenFolder: (node: AlfrescoNode) => void;
  onNavigatePathIndex: (index: number) => void;
  onOpenUploadModal: () => void;
  onCreateFolder: () => void;
  onOpenRuleModal: () => void;
  onToggleViewRelations: () => void;
  onShowNotification: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const thematicPhotos: Record<string, string[]> = {
  emerald: [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
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
  purple: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
  ],
  gallery: [
    "https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg",
    "https://cdn.21st.dev/assets/mirror/e7/e7138a367854517395ba458c0c7c6481cf28afdc227b7d0045973e03e5b1d1c0.jpg",
    "https://cdn.21st.dev/assets/mirror/96/9626c87f656eaa15e08486db4e7ecc217c0243440a21d301a3af6c8092b22a9b.jpg",
    "https://cdn.21st.dev/assets/mirror/da/dacbcb481226af6c6e6bf6426da535ce260db87270fb641953617ffe4a1145bf.jpg",
    "https://cdn.21st.dev/assets/mirror/6e/6e5ed03abf45ab11ad4c94b60bb3cb60326807a1777b2a6e8888d3179f237cd9.jpg",
  ]
};

function getNodeTheme(node: AlfrescoNode): FolderItem['folderTheme'] {
  if (node.nodeType.startsWith('ec:')) return 'emerald';
  if (node.nodeType.startsWith('ur:')) return 'blue';
  if (node.nodeType.startsWith('rh:')) return 'amber';
  if (node.nodeType.startsWith('fin:')) return 'purple';
  if (node.nodeType.startsWith('dp:')) return 'teal';
  return 'gallery';
}

function getNodeMatricule(node: AlfrescoNode): string {
  if (node.name.includes('2026')) {
    const matched = node.name.match(/\d+/g);
    if (matched && matched.length > 0) {
      return matched.join('');
    }
  }
  const hash = Math.abs(node.id.split('').reduce((acc, c) => acc * 33 + c.charCodeAt(0), 5381));
  return `2026${String(hash).slice(0, 6)}`;
}

function nodeToFolderItem(node: AlfrescoNode, childNodes: AlfrescoNode[]): FolderItem {
  const theme = getNodeTheme(node);
  const matricule = getNodeMatricule(node);
  const themeList = thematicPhotos[theme] || thematicPhotos.gallery;
  const photos: GalleryPhoto[] = themeList.map((img, i) => ({
    id: `${node.id}-${i}`,
    image: img,
    title: `Pièce_${i + 1}.pdf`
  }));

  return {
    id: node.id,
    name: node.title || node.name,
    matricule,
    type: 'folder',
    itemCount: childNodes.length || (node.childrenIds?.length ?? 3),
    updatedAt: node.systemProperties?.modifiedDate || 'Aujourd’hui',
    category: 'documents',
    folderTheme: theme,
    iconType: 'administrative',
    description: node.description,
    photos,
    permissions: {
      canEdit: true,
      canShare: true,
      canDelete: false,
      canDownload: true
    },
    filesInside: childNodes.map(child => ({
      id: child.id,
      name: child.name,
      type: child.name.endsWith('.pdf') ? 'pdf' : child.name.endsWith('.xlsx') ? 'sheet' : 'doc',
      size: child.sizeFormatted,
      updatedAt: child.systemProperties?.modifiedDate || '2026-09-18'
    }))
  };
}

export function RepositoryNodeList({
  currentNode,
  childNodes,
  selectedNode,
  onSelectNode,
  onOpenFolder,
  onNavigatePathIndex,
  onOpenUploadModal,
  onCreateFolder,
  onOpenRuleModal,
  onToggleViewRelations,
  onShowNotification
}: RepositoryNodeListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [overlayFolder, setOverlayFolder] = useState<FolderItem | null>(null);

  const filteredNodes = childNodes.filter(node => {
    if (filterType === 'folders' && !node.isFolder) return false;
    if (filterType === 'documents' && node.isFolder) return false;
    if (filterType === 'workflows' && !node.workflow) return false;
    if (filterType === 'probatoire' && !node.aspects.includes('dp:valeurProbatoire')) return false;

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchName = node.name.toLowerCase().includes(q);
      const matchTitle = node.title?.toLowerCase().includes(q);
      const matchTag = node.tags.some(t => t.toLowerCase().includes(q));
      return matchName || matchTitle || matchTag;
    }
    return true;
  });

  const folderNodes = filteredNodes.filter(n => n.isFolder);
  const fileNodes = filteredNodes.filter(n => !n.isFolder);

  const getNodeBadgeColor = (type: string) => {
    if (type.startsWith('ec:')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (type.startsWith('ur:')) return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    if (type.startsWith('rh:')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (type.startsWith('fin:')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    if (type === 'cm:folder') return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#04090e]/95 text-white overflow-hidden select-none w-full">
      
      {/* Clean, Unified Single Topbar for Repository */}
      <div className="px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-[#050c12] flex flex-wrap items-center justify-between gap-3 shrink-0">
        
        {/* Left: Breadcrumbs navigation */}
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          {currentNode.path.length > 1 && (
            <button
              type="button"
              onClick={() => {
                playXboxSound('back');
                onNavigatePathIndex(currentNode.path.length - 2);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-white/10 text-xs font-mono transition-all cursor-pointer shadow-xs"
              title="Dossier parent"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
              <span>Parent</span>
            </button>
          )}

          {/* Breadcrumb path */}
          <div className="flex items-center gap-1 font-mono text-xs text-slate-300 overflow-hidden">
            {currentNode.path.map((segment, idx) => {
              const isLast = idx === currentNode.path.length - 1;
              return (
                <React.Fragment key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      playXboxSound('select');
                      onNavigatePathIndex(idx);
                    }}
                    className={`hover:text-emerald-400 transition-colors cursor-pointer px-2 py-1 rounded truncate max-w-[160px] sm:max-w-[240px] ${
                      isLast 
                        ? 'text-white font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300' 
                        : 'text-slate-400 hover:bg-white/[0.03]'
                    }`}
                  >
                    {segment}
                  </button>
                  {!isLast && <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Actions, Filter & View Switcher */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          
          {/* Quick Filter Search */}
          <input
            type="text"
            placeholder="Filtrer les dossiers & actes..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-36 sm:w-48 px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono"
          />

          {/* Nouveau Dossier */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              onCreateFolder();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-white/15 text-white text-xs font-medium transition-all hover:border-emerald-400/50 cursor-pointer shadow-xs"
            title="Créer un nouveau sous-dossier"
          >
            <FolderPlus className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Nouveau Dossier</span>
          </button>

          {/* Déposer Contenu */}
          <button
            type="button"
            onClick={() => {
              playXboxSound('modalOpen');
              onOpenUploadModal();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] cursor-pointer"
            title="Déposer un document dans ce dossier"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Déposer</span>
          </button>

          {/* Graphe Relations */}
          <button
            type="button"
            onClick={onToggleViewRelations}
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-emerald-500/20 border border-white/10 text-slate-300 hover:text-emerald-400 text-xs transition-colors cursor-pointer hidden md:flex items-center"
            title="Graphe des relations documentaires"
          >
            <GitFork className="w-4 h-4" />
          </button>

          {/* View Mode Switcher (Grid vs Table) */}
          <div className="flex items-center bg-black/50 border border-white/10 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setViewMode('grid');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vue Grille Dossiers 3D"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grille</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setViewMode('table');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                viewMode === 'table' 
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-xs' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Vue Tableau Liste"
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tableau</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Full-Width Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent w-full">
        {filteredNodes.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/10">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Folder className="w-6 h-6" />
            </div>
            <p className="text-white font-semibold text-sm">Ce dossier est vide</p>
            <p className="text-slate-400 text-xs max-w-sm mt-1">
              Déposez des documents ou créez des sous-dossiers.
            </p>
            <button
              onClick={onOpenUploadModal}
              className="mt-4 px-4 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono hover:bg-emerald-500/30 transition-colors cursor-pointer"
            >
              + Déposer un premier document
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="w-full overflow-x-auto rounded-xl border border-white/[0.08] bg-[#071118]/40 shadow-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-black/40 text-slate-400 font-mono text-[11px] uppercase">
                  <th className="py-3 px-4 font-semibold">Nom & Titre Documentaire</th>
                  <th className="py-3 px-4 font-semibold">Type Content Model</th>
                  <th className="py-3 px-4 font-semibold">Version</th>
                  <th className="py-3 px-4 font-semibold">Taille</th>
                  <th className="py-3 px-4 font-semibold">Aspects & Sécurité</th>
                  <th className="py-3 px-4 font-semibold">Workflow</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode?.id === node.id;
                  const folderItem = node.isFolder ? nodeToFolderItem(node, childNodes) : null;

                  return (
                    <tr
                      key={node.id}
                      onClick={() => {
                        playXboxSound('select');
                        onSelectNode(node);
                      }}
                      onDoubleClick={() => {
                        if (node.isFolder) {
                          playXboxSound('select');
                          onOpenFolder(node);
                        }
                      }}
                      className={`group transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-500/15 text-white font-medium shadow-[inset_2px_0_0_0_#10b981]' 
                          : 'hover:bg-white/[0.04] text-slate-200'
                      }`}
                    >
                      {/* Name & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5 min-w-[220px]">
                          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                            node.isFolder ? 'bg-amber-500/10 border-amber-500/30' : 'bg-black/40 border-white/10'
                          }`}>
                            {node.isFolder ? (
                              <Folder className="w-4 h-4 text-amber-400" />
                            ) : (
                              <FileText className="w-4 h-4 text-emerald-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-mono font-semibold text-xs text-white truncate group-hover:text-emerald-300">
                              {node.name}
                            </p>
                            {node.title && (
                              <p className="text-[11px] text-slate-400 truncate">
                                {node.title}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Content Model */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${getNodeBadgeColor(node.nodeType)}`}>
                          {node.nodeType}
                        </span>
                      </td>

                      {/* Version */}
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-white/[0.06] border border-white/10">
                          v{node.version}
                        </span>
                      </td>

                      {/* Size */}
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                        {node.sizeFormatted}
                      </td>

                      {/* Aspects */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap max-w-[200px]">
                          {node.aspects.includes('dp:valeurProbatoire') && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono flex items-center gap-1" title="Valeur probatoire certifiée">
                              <ShieldCheck className="w-2.5 h-2.5" /> Probatoire
                            </span>
                          )}
                          {node.aspects.includes('dp:archivageLegal') && (
                            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-mono" title="DUA & Conservation légale">
                              DUA
                            </span>
                          )}
                          {node.aspects.includes('cm:versionable') && (
                            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[9px] font-mono">
                              Vers.
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Workflow Info */}
                      <td className="py-3 px-4">
                        {node.workflow ? (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[11px] text-emerald-300 font-mono truncate max-w-[140px]" title={node.workflow.definitionName}>
                              {node.workflow.currentStep}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px] font-mono">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {node.isFolder && folderItem && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playXboxSound('modalOpen');
                                setOverlayFolder(folderItem);
                              }}
                              className="px-2 py-1 rounded text-teal-400 hover:text-teal-200 hover:bg-teal-500/10 text-[11px] font-mono flex items-center gap-1"
                              title="Aperçu interactif des pièces"
                            >
                              <FolderOpen className="w-3.5 h-3.5" />
                              <span className="hidden lg:inline">Aperçu</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playXboxSound('select');
                              onSelectNode(node);
                            }}
                            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10"
                            title="Inspecter le node"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {node.isFolder && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playXboxSound('select');
                                onOpenFolder(node);
                              }}
                              className="p-1.5 rounded text-amber-400 hover:text-amber-200 hover:bg-amber-500/10"
                              title="Ouvrir le dossier"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View - Full Page Width with Authentic Default Interactive 3D Folders */
          <div className="space-y-10 w-full">
            
            {/* 1. Folders Section */}
            {folderNodes.length > 0 && (
              <div className="w-full">
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                      <Folder className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
                      Dossiers & Répertoires ({folderNodes.length})
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    Glissez ou cliquez pour explorer les pièces documentaires
                  </span>
                </div>

                {/* Generous Full-Width Responsive Folder Grid */}
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 justify-items-center w-full overflow-visible pt-1 pb-4">
                  {folderNodes.map((folderNode) => {
                    const folderItem = nodeToFolderItem(folderNode, childNodes);

                    return (
                      <div 
                        key={folderNode.id}
                        className="w-full flex justify-center overflow-visible"
                        onClick={() => {
                          playXboxSound('select');
                          onSelectNode(folderNode);
                        }}
                      >
                        <InteractiveFolderGallery
                          folderName={folderItem.name}
                          matricule={folderItem.matricule}
                          photos={folderItem.photos}
                          dragHintText="Glissez vers le bas pour fermer"
                          onViewMore={() => {
                            playXboxSound('select');
                            onOpenFolder(folderNode);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Documents & Actes Section */}
            {fileNodes.length > 0 && (
              <div className="w-full">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-200 font-bold">
                      Fichiers & Actes Documentaires ({fileNodes.length})
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Cliquez sur une pièce pour l'inspecter
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3.5 w-full">
                  {fileNodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;

                    return (
                      <div
                        key={node.id}
                        onClick={() => {
                          playXboxSound('select');
                          onSelectNode(node);
                        }}
                        className={`group p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                            : 'bg-[#071118]/60 hover:bg-[#071118]/90 border-white/[0.08] hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${getNodeBadgeColor(node.nodeType)}`}>
                              {node.nodeType}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-mono font-bold text-xs text-white truncate group-hover:text-emerald-300">
                              {node.name}
                            </h4>
                            {node.title && (
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {node.title}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>v{node.version} • {node.sizeFormatted}</span>
                          {node.aspects.includes('dp:valeurProbatoire') && (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> Scellé
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive Folder Preview Overlay */}
      {overlayFolder && (
        <FolderFilesOverlay
          folder={overlayFolder}
          isOpen={!!overlayFolder}
          onClose={() => setOverlayFolder(null)}
          onCardClick={(card) => {
            onShowNotification(`Ouverture du document : ${card.title}`, 'info');
          }}
        />
      )}

    </div>
  );
}
