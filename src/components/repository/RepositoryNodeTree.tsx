import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  Building2, 
  Users, 
  Landmark, 
  Archive, 
  Database,
  Search,
  HardDrive,
  X,
  PanelLeftClose
} from 'lucide-react';
import { AlfrescoNode } from '../../types/repository';
import { playXboxSound } from '../../utils/xboxAudio';

interface RepositoryNodeTreeProps {
  nodes: AlfrescoNode[];
  selectedNodeId: string;
  onSelectNode: (node: AlfrescoNode) => void;
  storageUsage?: string;
  totalNodesCount?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export function RepositoryNodeTree({
  nodes,
  selectedNodeId,
  onSelectNode,
  storageUsage = "48.6 Go / 100 Go",
  totalNodesCount = 14,
  isOpen = true,
  onClose
}: RepositoryNodeTreeProps) {
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(
    new Set(['root-repo', 'dir-etat-civil', 'dir-naissances', 'dir-naissances-2026', 'dossier-ec-2026-00152', 'dir-urbanisme'])
  );
  const [treeSearch, setTreeSearch] = useState('');

  const toggleExpand = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playXboxSound('toggle');
    setExpandedNodeIds(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const getNodeIcon = (node: AlfrescoNode, isExpanded: boolean) => {
    if (node.id === 'root-repo') {
      return <Database className="w-3.5 h-3.5 text-emerald-400" />;
    }
    if (node.id === 'dir-etat-civil' || node.id === 'dir-naissances') {
      return <Landmark className="w-3.5 h-3.5 text-emerald-400" />;
    }
    if (node.id === 'dir-urbanisme') {
      return <Building2 className="w-3.5 h-3.5 text-sky-400" />;
    }
    if (node.id === 'dir-rh') {
      return <Users className="w-3.5 h-3.5 text-amber-400" />;
    }
    if (node.id === 'dir-finances') {
      return <Layers className="w-3.5 h-3.5 text-purple-400" />;
    }
    if (node.id === 'dir-archives-legales') {
      return <Archive className="w-3.5 h-3.5 text-rose-400" />;
    }
    if (node.isFolder) {
      return isExpanded 
        ? <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
        : <Folder className="w-3.5 h-3.5 text-amber-300" />;
    }
    return <FileText className="w-3.5 h-3.5 text-slate-400" />;
  };

  const getChildNodes = (parentId: string | null) => {
    return nodes.filter(n => n.parentId === parentId);
  };

  const renderTreeNode = (node: AlfrescoNode, depth: number = 0) => {
    const children = getChildNodes(node.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedNodeIds.has(node.id);
    const isSelected = selectedNodeId === node.id;

    // Filter matching
    if (treeSearch.trim()) {
      const matches = node.name.toLowerCase().includes(treeSearch.toLowerCase()) ||
                      (node.title && node.title.toLowerCase().includes(treeSearch.toLowerCase()));
      const childrenMatch = children.some(c => 
        c.name.toLowerCase().includes(treeSearch.toLowerCase()) ||
        (c.title && c.title.toLowerCase().includes(treeSearch.toLowerCase()))
      );
      if (!matches && !childrenMatch) return null;
    }

    return (
      <div key={node.id} className="flex flex-col select-none">
        <div
          onClick={() => {
            playXboxSound('select');
            onSelectNode(node);
            if (onClose && window.innerWidth < 1024) {
              onClose();
            }
          }}
          style={{ paddingLeft: `${Math.max(4, depth * 12 + 4)}px` }}
          className={`group flex items-center justify-between gap-1 py-1 px-1.5 rounded-md cursor-pointer transition-colors text-xs ${
            isSelected
              ? 'bg-emerald-500/15 text-emerald-300 font-medium border border-emerald-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            {/* Expand / Collapse Toggle Arrow */}
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => toggleExpand(node.id, e)}
                className="w-3.5 h-3.5 flex items-center justify-center text-slate-500 hover:text-white shrink-0 p-0"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            ) : (
              <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-slate-700" />
              </span>
            )}

            {/* Node Icon */}
            <span className="shrink-0 flex items-center justify-center">
              {getNodeIcon(node, isExpanded)}
            </span>

            {/* Node Name */}
            <span className="truncate leading-tight font-mono text-[11px]">
              {node.name}
            </span>
          </div>

          {/* Minimal count indicator */}
          {node.isFolder && children.length > 0 && (
            <span className="text-[10px] font-mono text-slate-500 shrink-0">
              {children.length}
            </span>
          )}
        </div>

        {/* Render Children if expanded */}
        {hasChildren && isExpanded && (
          <div className="flex flex-col relative ml-2 pl-1 border-l border-white/[0.06]">
            {children.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootNodes = getChildNodes(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile/Tablet Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
        onClick={onClose}
      />

      <aside className="fixed inset-y-0 left-0 z-40 w-72 sm:w-80 lg:static lg:z-auto shrink-0 bg-[#050b10] border-r border-white/[0.08] flex flex-col h-full overflow-hidden select-none transition-transform shadow-2xl lg:shadow-none">
        
        {/* Minimal Header with Title, Search and Close on mobile */}
        <div className="p-2.5 border-b border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold text-white tracking-wider uppercase font-mono">
                Arborescence
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                ({totalNodesCount})
              </span>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
                title="Fermer l'arborescence"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tree Search Box */}
          <div className="relative flex items-center">
            <Search className="w-3 h-3 text-slate-500 absolute left-2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filtrer..."
              value={treeSearch}
              onChange={(e) => setTreeSearch(e.target.value)}
              className="w-full pl-7 pr-2 py-1 bg-black/50 border border-white/10 rounded text-[11px] text-white placeholder:text-slate-500 focus:outline-hidden focus:border-emerald-500/50 font-mono"
            />
          </div>
        </div>

        {/* Tree Content Area */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {rootNodes.map(root => renderTreeNode(root, 0))}
        </div>

        {/* Minimal Footer */}
        <div className="p-2 border-t border-white/[0.06] bg-black/40 text-[10px] flex items-center justify-between font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <HardDrive className="w-3 h-3 text-emerald-400" />
            <span>Store: {storageUsage}</span>
          </span>
          <span className="text-emerald-400">Solr 6</span>
        </div>
      </aside>
    </>
  );
}

