import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Folder, 
  Layers, 
  History, 
  GitFork, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock, 
  Eye, 
  Download, 
  Share2, 
  Tag, 
  User, 
  Calendar, 
  SlidersHorizontal, 
  ExternalLink,
  Plus,
  Trash2,
  Copy,
  Check,
  ChevronRight
} from 'lucide-react';
import { AlfrescoNode, NodeVersion } from '../../types/repository';
import { playXboxSound } from '../../utils/xboxAudio';

interface RepositoryNodeInspectorProps {
  node: AlfrescoNode | null;
  onClose: () => void;
  onUpdateNode: (updatedNode: AlfrescoNode) => void;
  onNavigateToNode: (nodeId: string) => void;
  onShowNotification: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

type InspectorTab = 'properties' | 'versions' | 'relations' | 'permissions' | 'rules' | 'workflow' | 'preview';

export function RepositoryNodeInspector({
  node,
  onClose,
  onUpdateNode,
  onNavigateToNode,
  onShowNotification
}: RepositoryNodeInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>('properties');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProperties, setEditedProperties] = useState<Record<string, string | number | boolean>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!node) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    playXboxSound('select');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveProperties = () => {
    if (!node) return;
    const updatedProperties = { ...node.contentModel.properties };
    (Object.entries(editedProperties) as [string, string | number | boolean][]).forEach(([key, val]) => {
      if (updatedProperties[key]) {
        updatedProperties[key] = { ...updatedProperties[key], value: val };
      }
    });

    const updatedNode: AlfrescoNode = {
      ...node,
      contentModel: {
        ...node.contentModel,
        properties: updatedProperties
      },
      systemProperties: {
        ...node.systemProperties,
        modifier: 'admin.current',
        modifiedDate: new Date().toLocaleDateString('fr-FR') + ' ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      }
    };

    onUpdateNode(updatedNode);
    setIsEditing(false);
    playXboxSound('toastSuccess');
    onShowNotification('Propriétés du Content Model enregistrées.', 'success');
  };

  const handleRestoreVersion = (ver: NodeVersion) => {
    playXboxSound('achievement');
    onShowNotification(`Restauration vers la version ${ver.version} effectuée.`, 'success');
  };

  return (
    <aside className="w-80 sm:w-96 shrink-0 bg-[#060c13]/95 backdrop-blur-md border-l border-white/[0.08] flex flex-col h-full overflow-hidden select-none text-white font-sans z-20">
      {/* 1. Header with Node Identity & Close */}
      <div className="p-3.5 border-b border-white/[0.08] bg-black/40 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
            {node.isFolder ? (
              <Folder className="w-4 h-4 text-amber-400" />
            ) : (
              <FileText className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-mono font-bold text-xs text-white truncate" title={node.name}>
              {node.name}
            </h3>
            <p className="text-[10px] font-mono text-emerald-400/90 truncate">
              {node.nodeType} • v{node.version}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playXboxSound('back');
            onClose();
          }}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Fermer l'inspecteur"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Horizontal Tab Navigation (7 Alfresco Dimensions) */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-white/[0.06] bg-black/20 overflow-x-auto scrollbar-none text-[11px] font-mono">
        {[
          { id: 'properties', label: 'Propriétés', icon: SlidersHorizontal },
          { id: 'versions', label: `Versions (${node.versionsHistory.length || 1})`, icon: History },
          { id: 'relations', label: `Relations (${node.relations.length})`, icon: GitFork },
          { id: 'permissions', label: 'Gouvernance', icon: ShieldCheck },
          { id: 'rules', label: 'Règles', icon: Sparkles },
          { id: 'workflow', label: 'Workflow', icon: CheckCircle2 },
          { id: 'preview', label: 'Aperçu', icon: Eye }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playXboxSound('toggle');
                setActiveTab(tab.id as InspectorTab);
              }}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive 
                  ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-xs' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Body Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* TAB 1: PROPERTIES & CONTENT MODEL */}
        {activeTab === 'properties' && (
          <div className="space-y-4 text-xs">
            {/* Content Model Banner */}
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[11px] text-emerald-300">
                  CONTENT MODEL: {node.contentModel.modelName}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                  {node.contentModel.typeName}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Schéma documentaire typé avec typologie métier Alfresco.
              </p>
            </div>

            {/* Custom Business Properties Form */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Métadonnées Spécifiques
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[10px] font-mono text-emerald-400 hover:underline"
                >
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
              </div>

              <div className="space-y-2 rounded-xl bg-black/40 border border-white/[0.06] p-3">
                {Object.entries(node.contentModel.properties).map(([propKey, propData]) => (
                  <div key={propKey} className="space-y-0.5 pb-2 border-b border-white/[0.04] last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{propData.label} ({propKey})</span>
                      {propData.isMandatory && (
                        <span className="text-amber-400 font-bold">*Requis</span>
                      )}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={String(propData.value)}
                        onChange={(e) => setEditedProperties(prev => ({ ...prev, [propKey]: e.target.value }))}
                        className="w-full px-2 py-1 bg-black/60 border border-emerald-500/40 rounded text-xs text-white font-mono focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono font-medium text-white break-all">
                          {String(propData.value)}
                        </span>
                        <button
                          onClick={() => handleCopy(String(propData.value), propKey)}
                          className="text-slate-500 hover:text-white p-0.5"
                          title="Copier la valeur"
                        >
                          {copiedField === propKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleSaveProperties}
                  className="w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs shadow-md transition-all cursor-pointer"
                >
                  Enregistrer les modifications
                </button>
              )}
            </div>

            {/* Aspects Assigned */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Aspects Alfresco Associés
              </span>
              <div className="flex flex-wrap gap-1.5">
                {node.aspects.map(aspect => (
                  <span
                    key={aspect}
                    className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] font-mono text-slate-300"
                  >
                    {aspect}
                  </span>
                ))}
              </div>
            </div>

            {/* System Properties */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Propriétés Système (sys:)
              </span>
              <div className="rounded-xl bg-black/30 border border-white/[0.04] p-2.5 space-y-1.5 text-[10px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>NodeRef :</span>
                  <span className="text-slate-200 truncate max-w-[180px]" title={node.systemProperties.nodeRef}>
                    {node.systemProperties.nodeRef}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Créateur :</span>
                  <span className="text-slate-200">{node.systemProperties.creator} ({node.systemProperties.createdDate})</span>
                </div>
                <div className="flex justify-between">
                  <span>Modifié par :</span>
                  <span className="text-slate-200">{node.systemProperties.modifier} ({node.systemProperties.modifiedDate})</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VERSIONS & HISTORIQUE */}
        {activeTab === 'versions' && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="font-mono font-bold text-slate-200 text-xs">Historique des révisions</span>
              <span className="text-[10px] font-mono text-emerald-400">cm:versionable actif</span>
            </div>

            <div className="space-y-2.5">
              {node.versionsHistory.map((ver) => (
                <div
                  key={ver.version}
                  className={`p-3 rounded-xl border transition-all ${
                    ver.isCurrent
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-xs'
                      : 'bg-black/30 border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-white text-xs px-1.5 py-0.2 rounded bg-white/10">
                        v{ver.version}
                      </span>
                      {ver.isCurrent && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-bold">
                          Actuelle
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{ver.date}</span>
                  </div>

                  <p className="text-xs text-slate-200 font-medium mt-1.5">{ver.label}</p>
                  <p className="text-[11px] text-slate-400 italic mt-0.5">« {ver.comment} »</p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/[0.04] text-[10px] font-mono text-slate-400">
                    <span>Par {ver.author}</span>
                    {!ver.isCurrent && (
                      <button
                        type="button"
                        onClick={() => handleRestoreVersion(ver)}
                        className="text-emerald-400 hover:text-emerald-200 hover:underline cursor-pointer"
                      >
                        Restaurer cette version
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RELATIONS DOCUMENTAIRES */}
        {activeTab === 'relations' && (
          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[11px]">
              Alfresco relie les contenus selon les dépendances métier (Dossier parent, Justificatifs, Rapports d'instruction, Décisions).
            </div>

            <div className="space-y-2">
              {node.relations.length === 0 ? (
                <p className="text-center py-6 text-slate-500 font-mono text-xs">
                  Aucune relation documentaire déclarée.
                </p>
              ) : (
                node.relations.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      playXboxSound('select');
                      onNavigateToNode(rel.targetNodeId);
                    }}
                    className="p-3 rounded-xl bg-black/40 border border-white/[0.08] hover:border-emerald-500/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-slate-300">
                        {rel.relationType}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <h5 className="font-mono font-bold text-xs text-white mt-1 group-hover:text-emerald-300">
                      {rel.targetNodeName}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {rel.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PERMISSIONS & GOUVERNANCE (RBAC) */}
        {activeTab === 'permissions' && (
          <div className="space-y-3 text-xs">
            {/* Inheritance Toggle */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
              <div>
                <p className="font-bold text-white text-xs">Héritage des permissions</p>
                <p className="text-[10px] text-slate-400">Hérite des droits du dossier parent</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                node.inheritPermissions ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
              }`}>
                {node.inheritPermissions ? 'Activé' : 'Désactivé'}
              </span>
            </div>

            {/* Access Control List */}
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Contrôle d'Accès (ACL)
              </span>
              <div className="space-y-1.5">
                {node.permissions.map((perm) => (
                  <div
                    key={perm.id}
                    className="p-2.5 rounded-xl bg-black/30 border border-white/[0.06] flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-white">{perm.displayName}</p>
                      <p className="text-[10px] font-mono text-slate-400">{perm.principal}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                      {perm.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RÈGLES & AUTOMATISATION */}
        {activeTab === 'rules' && (
          <div className="space-y-3 text-xs">
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px]">
              Les règles s'exécutent automatiquement lors du dépôt ou de la modification de contenus.
            </div>

            {node.rules && node.rules.length > 0 ? (
              node.rules.map((rule) => (
                <div key={rule.id} className="p-3 rounded-xl bg-black/40 border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-white text-xs">{rule.title}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300">
                      Actif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">{rule.description}</p>
                  
                  <div className="pt-2 border-t border-white/[0.04] space-y-1 text-[10px] font-mono text-slate-400">
                    <p className="text-emerald-400">⚡ Événement : {rule.triggerEvent}</p>
                    {rule.actions.map((act, i) => (
                      <p key={i}>➔ Action {i+1} : {act.actionType}</p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-slate-500 font-mono text-xs">
                Aucune règle active sur ce dossier.
              </p>
            )}
          </div>
        )}

        {/* TAB 6: WORKFLOW & TÂCHES */}
        {activeTab === 'workflow' && (
          <div className="space-y-3 text-xs">
            {node.workflow ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-emerald-300 text-xs">
                    {node.workflow.definitionName}
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase">
                    {node.workflow.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Étape en cours :</span>
                    <span className="font-bold text-white">{node.workflow.currentStep}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Assigné à :</span>
                    <span className="text-emerald-300">{node.workflow.assigneeName}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>Échéance légale :</span>
                    <span className="text-amber-300">{node.workflow.dueDate}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Avancement du circuit</span>
                    <span>{node.workflow.progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${node.workflow.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center py-6 text-slate-500 font-mono text-xs">
                Aucun workflow actif sur ce contenu.
              </p>
            )}
          </div>
        )}

        {/* TAB 7: APERÇU / RENDITIONS */}
        {activeTab === 'preview' && (
          <div className="space-y-3 text-xs">
            {node.previewThumbnail && (
              <div className="rounded-xl overflow-hidden border border-white/10 aspect-video relative">
                <img
                  src={node.previewThumbnail}
                  alt={node.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {node.textContentSample && (
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-slate-400 uppercase">
                  Extrait Texte Indexé (OCR Solr) :
                </span>
                <pre className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[10px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {node.textContentSample}
                </pre>
              </div>
            )}
          </div>
        )}

      </div>
    </aside>
  );
}
