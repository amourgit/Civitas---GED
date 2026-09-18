import React from 'react';
import { 
  X, 
  GitFork, 
  Layers, 
  FileText, 
  Folder, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import { AlfrescoNode } from '../../types/repository';
import { playXboxSound } from '../../utils/xboxAudio';

interface RepositoryRelationsModalProps {
  currentNode: AlfrescoNode;
  allNodes: AlfrescoNode[];
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (node: AlfrescoNode) => void;
}

export function RepositoryRelationsModal({
  currentNode,
  allNodes,
  isOpen,
  onClose,
  onSelectNode
}: RepositoryRelationsModalProps) {
  if (!isOpen) return null;

  const relatedNodes = currentNode.relations.map(rel => {
    const targetNode = allNodes.find(n => n.id === rel.targetNodeId);
    return {
      relation: rel,
      node: targetNode
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 font-sans select-none text-white">
      <div className="w-full max-w-3xl bg-[#071118] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <GitFork className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white">
                GRAPHE DES RELATIONS METIER ALFRESCO
              </h3>
              <p className="text-[11px] font-mono text-emerald-400/90">
                Node Pivot : {currentNode.name} ({currentNode.nodeType})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Visual Graph Representation */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Explanation */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-300">
            Dans le Repository Alfresco, un document n’est pas isolé. Il est relié dynamiquement à son dossier d’instruction, à ses pièces justificatives probatoires et aux arrêtés ou actes d’autorité.
          </div>

          {/* Graphical Relation Map */}
          <div className="flex flex-col items-center gap-6 py-4">
            
            {/* Center: Current Node */}
            <div className="p-4 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-center shadow-[0_0_30px_rgba(16,185,129,0.3)] max-w-sm w-full">
              <div className="flex items-center justify-center gap-2 text-emerald-300 mb-1">
                {currentNode.isFolder ? <Folder className="w-5 h-5 text-amber-400" /> : <FileText className="w-5 h-5 text-emerald-400" />}
                <span className="font-mono font-bold text-xs uppercase">Node Central</span>
              </div>
              <h4 className="font-mono font-bold text-sm text-white truncate">{currentNode.name}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">{currentNode.title || currentNode.nodeType}</p>
              <span className="mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/40 border border-emerald-400/50 text-emerald-300">
                {currentNode.nodeType} • v{currentNode.version}
              </span>
            </div>

            {/* Related Nodes Grid */}
            <div className="w-full space-y-3">
              <div className="text-center font-mono text-[11px] text-slate-400 uppercase tracking-widest">
                Objets Documentaires Liés ({relatedNodes.length})
              </div>

              {relatedNodes.length === 0 ? (
                <div className="p-4 text-center text-slate-500 font-mono text-xs bg-black/30 rounded-xl border border-white/[0.04]">
                  Aucune relation déclarée sur cet objet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedNodes.map(({ relation, node }) => (
                    <div
                      key={relation.id}
                      onClick={() => {
                        if (node) {
                          playXboxSound('select');
                          onSelectNode(node);
                          onClose();
                        }
                      }}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-300">
                          {relation.relationType}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                      </div>
                      <h5 className="font-mono font-bold text-xs text-white group-hover:text-emerald-300">
                        {relation.targetNodeName}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {relation.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.08] bg-black/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors"
          >
            Fermer le Graphe
          </button>
        </div>

      </div>
    </div>
  );
}
