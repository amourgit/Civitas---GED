import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Folder 
} from 'lucide-react';
import { AlfrescoNode } from '../../types/repository';
import { CONTENT_MODEL_DEFINITIONS, ALFRESCO_ASPECTS_LIST } from '../../data/alfrescoRepositoryData';
import { playXboxSound } from '../../utils/xboxAudio';

interface RepositoryUploadModalProps {
  currentNode: AlfrescoNode;
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (newNode: AlfrescoNode) => void;
}

export function RepositoryUploadModal({
  currentNode,
  isOpen,
  onClose,
  onUploadComplete
}: RepositoryUploadModalProps) {
  const [fileName, setFileName] = useState('');
  const [fileTitle, setFileTitle] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('ec:acteNaissance');
  const [modelFieldValues, setModelFieldValues] = useState<Record<string, any>>({});
  const [selectedAspects, setSelectedAspects] = useState<string[]>(['cm:versionable', 'cm:auditable', 'dp:archivageLegal']);
  const [versionComment, setVersionComment] = useState('Dépôt initial et indexation OCR');
  const [isProcessingAI, setIsProcessingAI] = useState(false);

  if (!isOpen) return null;

  const currentModelDef = CONTENT_MODEL_DEFINITIONS.find(m => m.id === selectedModelId);

  const handleSimulateAIAutoFill = () => {
    setIsProcessingAI(true);
    playXboxSound('toggle');
    setTimeout(() => {
      setIsProcessingAI(false);
      if (selectedModelId === 'ec:acteNaissance') {
        setFileName('Acte_Naissance_NZILA_2026_Extrait.pdf');
        setFileTitle('Extrait d’Acte de Naissance N° 00154/2026');
        setModelFieldValues({
          numActe: 'ACTE-2026-00154',
          annee: 2026,
          date: '18/09/2026',
          commune: 'Libreville',
          nomEnfant: 'NZILA',
          prenomEnfant: 'Céleste Grace',
          officierSignataire: 'Jean-Marc NZILA'
        });
      } else if (selectedModelId === 'ur:permisConstruire') {
        setFileName('Demande_PC_Angondje_Lot4.pdf');
        setFileTitle('Demande de Permis de Construire Lot 4');
        setModelFieldValues({
          reference: 'PC-048-2026-0940',
          demandeur: 'M. et Mme ONDO',
          parcelle: 'Section AK N° 88',
          dateDepot: '18/09/2026',
          statut: 'En attente d’instruction'
        });
      }
      playXboxSound('achievement');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const propsRecord: Record<string, any> = {};
    if (currentModelDef) {
      currentModelDef.fields.forEach(f => {
        propsRecord[`${currentModelDef.prefix}:${f.name}`] = {
          label: f.label,
          value: modelFieldValues[f.name] || f.example,
          type: f.type === 'number' ? 'number' : 'string'
        };
      });
    }

    const newNode: AlfrescoNode = {
      id: `node-${Date.now()}`,
      name: fileName.trim().endsWith('.pdf') ? fileName.trim() : `${fileName.trim()}.pdf`,
      title: fileTitle.trim() || fileName.trim(),
      description: `Document typé selon le modèle ${currentModelDef?.label || 'Standard'}.`,
      nodeType: selectedModelId as any,
      isFolder: false,
      parentId: currentNode.id,
      path: [...currentNode.path, fileName.trim()],
      mimetype: 'application/pdf',
      sizeFormatted: '4.5 Mo',
      sizeBytes: 4718592,
      version: '1.0',
      versionsHistory: [
        {
          version: '1.0',
          label: 'Dépôt initial',
          author: 'Jean-Marc NZILA (Officier)',
          date: new Date().toLocaleDateString('fr-FR') + ' ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          size: '4.5 Mo',
          comment: versionComment,
          isCurrent: true
        }
      ],
      contentModel: {
        modelName: `${currentModelDef?.prefix || 'cm'}:customModel`,
        typeName: selectedModelId,
        properties: propsRecord
      },
      systemProperties: {
        nodeRef: `workspace://SpacesStore/node-${Date.now()}`,
        creator: 'jean.nzila',
        createdDate: new Date().toLocaleDateString('fr-FR'),
        modifier: 'jean.nzila',
        modifiedDate: new Date().toLocaleDateString('fr-FR'),
        store: 'workspace://SpacesStore'
      },
      aspects: selectedAspects as any,
      tags: ['depot-recent', 'sgai', currentModelDef?.prefix || 'alfresco'],
      categories: ['/État Civil/Dépôts Directs'],
      inheritPermissions: true,
      permissions: [],
      relations: [
        {
          id: `rel-${Date.now()}`,
          targetNodeId: currentNode.id,
          targetNodeName: currentNode.name,
          targetNodeType: currentNode.nodeType,
          relationType: 'dossier_contains',
          description: `Document rattaché au dossier ${currentNode.name}.`
        }
      ],
      previewThumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80'
    };

    onUploadComplete(newNode);
    playXboxSound('achievement');
    onClose();
  };

  const toggleAspect = (aspectId: string) => {
    setSelectedAspects(prev => 
      prev.includes(aspectId) ? prev.filter(a => a !== aspectId) : [...prev, aspectId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 font-sans select-none">
      <div className="w-full max-w-2xl bg-[#071118] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-white/[0.08] bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white">
                DÉPÔT DANS LE REPOSITORY ALFRESCO
              </h3>
              <p className="text-[11px] font-mono text-emerald-400/90">
                Emplacement : {currentNode.path.join(' / ')}
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* AI Autofill Assistant Button */}
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">Assistant d'Extraction IA SGAI</p>
                <p className="text-[11px] text-slate-300">Pré-remplit les propriétés selon le Content Model détecté.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSimulateAIAutoFill}
              disabled={isProcessingAI}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-50"
            >
              {isProcessingAI ? 'Analyse OCR...' : 'Extraire avec l’IA'}
            </button>
          </div>

          {/* Basic File Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-mono text-[11px] text-slate-300 font-semibold">
                Nom du Fichier (cm:name) *
              </label>
              <input
                type="text"
                required
                placeholder="ex: Acte_Naissance_NZILA_2026.pdf"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-white font-mono focus:border-emerald-500/60 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[11px] text-slate-300 font-semibold">
                Titre d’Usage (cm:title)
              </label>
              <input
                type="text"
                placeholder="ex: Acte de Naissance Authentique"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg text-white font-mono focus:border-emerald-500/60 focus:outline-none"
              />
            </div>
          </div>

          {/* Content Model Selector */}
          <div className="space-y-1.5">
            <label className="font-mono text-[11px] text-slate-300 font-semibold flex items-center justify-between">
              <span>Sélection du Content Model Alfresco</span>
              <span className="text-emerald-400 text-[10px]">Typage documentaire fort</span>
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => {
                setSelectedModelId(e.target.value);
                setModelFieldValues({});
              }}
              className="w-full px-3 py-1.5 bg-black/60 border border-white/10 rounded-lg text-white font-mono text-xs focus:border-emerald-500/60 focus:outline-none"
            >
              {CONTENT_MODEL_DEFINITIONS.map(model => (
                <option key={model.id} value={model.id}>
                  {model.label} ({model.id})
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Content Model Fields */}
          {currentModelDef && (
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08] space-y-2.5">
              <span className="font-mono font-bold text-slate-300 text-[11px] uppercase">
                Propriétés du modèle : {currentModelDef.label}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentModelDef.fields.map(field => (
                  <div key={field.name} className="space-y-0.5">
                    <label className="text-[10px] font-mono text-slate-400">
                      {field.label} {field.required && <span className="text-amber-400">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder={field.example}
                      value={modelFieldValues[field.name] || ''}
                      onChange={(e) => setModelFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                      className="w-full px-2.5 py-1 bg-black/60 border border-white/10 rounded text-xs text-white font-mono focus:border-emerald-500/60 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aspects Checkboxes */}
          <div className="space-y-1.5">
            <span className="font-mono text-[11px] text-slate-300 font-semibold">
              Aspects & Sécurité à appliquer
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {ALFRESCO_ASPECTS_LIST.slice(0, 4).map(aspect => (
                <label
                  key={aspect.id}
                  onClick={() => toggleAspect(aspect.id)}
                  className={`p-2 rounded-lg border text-[11px] flex items-center gap-2 cursor-pointer transition-colors ${
                    selectedAspects.includes(aspect.id)
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-white'
                      : 'bg-black/30 border-white/[0.06] text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAspects.includes(aspect.id)}
                    onChange={() => {}}
                    className="accent-emerald-500 rounded"
                  />
                  <span className="font-mono truncate">{aspect.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-all shadow-md cursor-pointer"
            >
              Déposer et Indexer dans Alfresco
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
