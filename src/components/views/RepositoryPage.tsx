import React, { useState } from 'react';
import { 
  Database, 
  Folder, 
  FileText, 
  Sparkles, 
  Layers, 
  GitFork, 
  ShieldCheck, 
  HardDrive, 
  Search, 
  Plus, 
  ArrowLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { AlfrescoNode, NodeRule } from '../../types/repository';
import { INITIAL_REPOSITORY_NODES } from '../../data/alfrescoRepositoryData';
import { RepositoryNodeList } from '../repository/RepositoryNodeList';
import { RepositoryNodeInspector } from '../repository/RepositoryNodeInspector';
import { RepositoryUploadModal } from '../repository/RepositoryUploadModal';
import { RepositoryRuleModal } from '../repository/RepositoryRuleModal';
import { RepositoryRelationsModal } from '../repository/RepositoryRelationsModal';
import { playXboxSound } from '../../utils/xboxAudio';

interface RepositoryPageProps {
  onShowNotification?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export function RepositoryPage({ onShowNotification }: RepositoryPageProps) {
  const [nodes, setNodes] = useState<AlfrescoNode[]>(INITIAL_REPOSITORY_NODES);
  const [currentNodeId, setCurrentNodeId] = useState<string>('dossier-ec-2026-00152');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [isRelationsModalOpen, setIsRelationsModalOpen] = useState(false);

  // Helper notify
  const notify = (msg: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    if (onShowNotification) {
      onShowNotification(msg, type);
    }
  };

  const currentNode = nodes.find(n => n.id === currentNodeId) || nodes[0];
  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;
  const childNodes = nodes.filter(n => n.parentId === currentNode.id);

  // Handlers - ONLY files trigger the right-hand inspector panel!
  const handleSelectNode = (node: AlfrescoNode) => {
    if (node.isFolder) {
      // Repertoires / Dossiers do not open the right inspector panel
      setSelectedNodeId(null);
    } else {
      // Only files open the right inspector panel
      setSelectedNodeId(node.id);
    }
  };

  const handleOpenFolder = (node: AlfrescoNode) => {
    setCurrentNodeId(node.id);
    setSelectedNodeId(null);
  };

  const handleNavigatePathIndex = (index: number) => {
    // Find ancestor node by slicing path
    const targetPath = currentNode.path.slice(0, index + 1);
    const targetNode = nodes.find(n => n.path.length === targetPath.length && n.path.every((seg, i) => seg === targetPath[i]));
    if (targetNode) {
      setCurrentNodeId(targetNode.id);
      setSelectedNodeId(null);
    }
  };

  const handleCreateFolder = () => {
    const folderName = prompt('Nom du nouveau dossier Alfresco (cm:folder) :');
    if (!folderName || !folderName.trim()) return;

    const newFolder: AlfrescoNode = {
      id: `folder-${Date.now()}`,
      name: folderName.trim(),
      title: folderName.trim(),
      description: 'Dossier créé via le gestionnaire de dépôt.',
      nodeType: 'cm:folder',
      isFolder: true,
      parentId: currentNode.id,
      path: [...currentNode.path, folderName.trim()],
      sizeFormatted: '0 Ko',
      sizeBytes: 0,
      version: '1.0',
      versionsHistory: [],
      contentModel: {
        modelName: 'cm:contentmodel',
        typeName: 'cm:folder',
        properties: {}
      },
      systemProperties: {
        nodeRef: `workspace://SpacesStore/folder-${Date.now()}`,
        creator: 'admin.current',
        createdDate: new Date().toLocaleDateString('fr-FR'),
        modifier: 'admin.current',
        modifiedDate: new Date().toLocaleDateString('fr-FR'),
        store: 'workspace://SpacesStore'
      },
      aspects: ['cm:titled', 'cm:auditable'],
      tags: ['nouveau-dossier'],
      categories: [],
      inheritPermissions: true,
      permissions: [],
      relations: [],
      childrenIds: []
    };

    setNodes(prev => [newFolder, ...prev]);
    playXboxSound('achievement');
    notify(`Dossier "${folderName}" créé avec succès.`, 'success');
  };

  const handleUploadComplete = (newNode: AlfrescoNode) => {
    setNodes(prev => [newNode, ...prev]);
    setSelectedNodeId(newNode.id);
    notify(`Document "${newNode.name}" indexé dans le Content Store.`, 'success');
  };

  const handleUpdateNode = (updatedNode: AlfrescoNode) => {
    setNodes(prev => prev.map(n => n.id === updatedNode.id ? updatedNode : n));
  };

  const handleAddRule = (newRule: NodeRule) => {
    const updated = {
      ...currentNode,
      rules: [...(currentNode.rules || []), newRule]
    };
    handleUpdateNode(updated);
    notify(`Règle "${newRule.title}" ajoutée au dossier.`, 'success');
  };

  const handleNavigateToNode = (targetNodeId: string) => {
    const target = nodes.find(n => n.id === targetNodeId);
    if (!target) return;

    if (target.isFolder) {
      setCurrentNodeId(target.id);
      setSelectedNodeId(null);
    } else {
      if (target.parentId) {
        setCurrentNodeId(target.parentId);
      }
      setSelectedNodeId(target.id);
    }
  };

  // Stats
  const totalNodesCount = nodes.length;
  const totalFoldersCount = nodes.filter(n => n.isFolder).length;
  const totalDocsCount = nodes.filter(n => !n.isFolder).length;
  const activeWorkflowsCount = nodes.filter(n => n.workflow && n.workflow.status === 'en_cours').length;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#03070b] overflow-hidden select-none">
      {/* Main Full-Width Workspace Layout directly under Topbar */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Explorer List taking full width of the screen */}
        <RepositoryNodeList
          currentNode={currentNode}
          childNodes={childNodes}
          selectedNode={selectedNode}
          onSelectNode={handleSelectNode}
          onOpenFolder={handleOpenFolder}
          onNavigatePathIndex={handleNavigatePathIndex}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onCreateFolder={handleCreateFolder}
          onOpenRuleModal={() => setIsRuleModalOpen(true)}
          onToggleViewRelations={() => setIsRelationsModalOpen(true)}
          onShowNotification={notify}
        />

        {/* Right Node Inspector (ONLY active when a file is selected) */}
        {selectedNode && !selectedNode.isFolder && (
          <RepositoryNodeInspector
            node={selectedNode}
            onClose={() => setSelectedNodeId(null)}
            onUpdateNode={handleUpdateNode}
            onNavigateToNode={handleNavigateToNode}
            onShowNotification={notify}
          />
        )}
      </div>

      {/* Modals */}
      <RepositoryUploadModal
        currentNode={currentNode}
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <RepositoryRuleModal
        currentNode={currentNode}
        isOpen={isRuleModalOpen}
        onClose={() => setIsRuleModalOpen(false)}
        onAddRule={handleAddRule}
      />

      {selectedNode && (
        <RepositoryRelationsModal
          currentNode={selectedNode}
          allNodes={nodes}
          isOpen={isRelationsModalOpen}
          onClose={() => setIsRelationsModalOpen(false)}
          onSelectNode={handleSelectNode}
        />
      )}

    </div>
  );
}
