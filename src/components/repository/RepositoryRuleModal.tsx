import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu 
} from 'lucide-react';
import { AlfrescoNode, NodeRule } from '../../types/repository';
import { playXboxSound } from '../../utils/xboxAudio';

interface RepositoryRuleModalProps {
  currentNode: AlfrescoNode;
  isOpen: boolean;
  onClose: () => void;
  onAddRule: (rule: NodeRule) => void;
}

export function RepositoryRuleModal({
  currentNode,
  isOpen,
  onClose,
  onAddRule
}: RepositoryRuleModalProps) {
  const [ruleTitle, setRuleTitle] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [triggerEvent, setTriggerEvent] = useState<'on_create' | 'on_update' | 'on_enter_folder'>('on_create');
  const [actionType, setActionType] = useState<'extract_ai_metadata' | 'apply_content_model' | 'start_workflow' | 'apply_aspect'>('extract_ai_metadata');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleTitle.trim()) return;

    const newRule: NodeRule = {
      id: `rule-${Date.now()}`,
      title: ruleTitle.trim(),
      description: ruleDescription.trim() || 'Règle d’automatisation de gestion documentaire.',
      triggerEvent: triggerEvent,
      criteria: { mimeType: 'application/pdf' },
      actions: [
        {
          actionType: actionType,
          params: { config: 'Auto SGAI Engine' }
        }
      ],
      isActive: true
    };

    onAddRule(newRule);
    playXboxSound('achievement');
    setIsCreating(false);
    setRuleTitle('');
    setRuleDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 font-sans select-none text-white">
      <div className="w-full max-w-2xl bg-[#071118] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white">
                RÈGLES D'AUTOMATISATION DU DOSSIER
              </h3>
              <p className="text-[11px] font-mono text-teal-400/90">
                Dossier : {currentNode.name}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Rules List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-300 uppercase text-[11px]">
                Règles Actives ({currentNode.rules?.length || 0})
              </span>
              <button
                type="button"
                onClick={() => setIsCreating(!isCreating)}
                className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Nouvelle Règle
              </button>
            </div>

            {currentNode.rules && currentNode.rules.length > 0 ? (
              currentNode.rules.map(rule => (
                <div key={rule.id} className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-mono font-bold text-xs text-white">{rule.title}</h5>
                    <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-mono">
                      Actif
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">{rule.description}</p>
                  
                  <div className="pt-2 border-t border-white/[0.04] grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                    <div>
                      <span className="text-slate-500">Déclencheur : </span>
                      <span className="text-amber-300">{rule.triggerEvent}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Action : </span>
                      <span className="text-emerald-300">{rule.actions[0]?.actionType}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-slate-500 font-mono text-xs bg-black/20 rounded-xl border border-white/[0.04]">
                Aucune règle configurée sur ce dossier.
              </p>
            )}
          </div>

          {/* Form to create new rule */}
          {isCreating && (
            <form onSubmit={handleCreateRule} className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-3">
              <h5 className="font-mono font-bold text-xs text-teal-300 uppercase">
                Ajouter une Règle Alfresco
              </h5>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-300">Titre de la Règle *</label>
                <input
                  type="text"
                  required
                  placeholder="ex: Extraction IA & Typage Automatique"
                  value={ruleTitle}
                  onChange={(e) => setRuleTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-black/60 border border-white/10 rounded text-xs text-white font-mono focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-300">Événement Déclencheur</label>
                  <select
                    value={triggerEvent}
                    onChange={(e: any) => setTriggerEvent(e.target.value)}
                    className="w-full px-2 py-1.5 bg-black/60 border border-white/10 rounded text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="on_create">À la création / Dépôt (on_create)</option>
                    <option value="on_update">À la mise à jour (on_update)</option>
                    <option value="on_enter_folder">À l'entrée dans le dossier</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-300">Action Automatique</label>
                  <select
                    value={actionType}
                    onChange={(e: any) => setActionType(e.target.value)}
                    className="w-full px-2 py-1.5 bg-black/60 border border-white/10 rounded text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="extract_ai_metadata">Extraction IA OCR des métadonnées</option>
                    <option value="apply_content_model">Appliquer le Content Model Métier</option>
                    <option value="start_workflow">Lancer le Circuit de Validation</option>
                    <option value="apply_aspect">Appliquer Aspect Valeur Probatoire</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1 rounded bg-white/10 text-white font-mono text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold font-mono text-xs shadow"
                >
                  Enregistrer la Règle
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.08] bg-black/40 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
}
