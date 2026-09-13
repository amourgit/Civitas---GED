import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  FileText, 
  Tag, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';
import { IngestionDocument } from '../../types/ingestion';
import { playXboxSound } from '../../utils/xboxAudio';

interface ExtractedDataModalProps {
  document: IngestionDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onValidate: (doc: IngestionDocument) => void;
}

export function ExtractedDataModal({
  document: doc,
  isOpen,
  onClose,
  onValidate
}: ExtractedDataModalProps) {
  const [activeTab, setActiveTab] = useState<'structured' | 'text' | 'entities' | 'metadata'>('structured');
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      playXboxSound('modalOpen');
    }
  }, [isOpen]);

  const handleClose = () => {
    playXboxSound('back');
    onClose();
  };

  if (!isOpen || !doc) return null;

  const handleCopyText = () => {
    navigator.clipboard?.writeText(doc.extractedData.rawText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl bg-[#071317]/95 border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Données extraites par Ingestion & OCR
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-mono font-semibold">
                  OCR {doc.extractedData.ocrConfidence}%
                </span>
              </div>
              <p className="text-xs text-white/50">
                {doc.filename} • {doc.extractedData.classification}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/5 bg-black/20">
          <button
            type="button"
            onClick={() => setActiveTab('structured')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'structured'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Données structurées</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Texte brut extrait</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('entities')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'entities'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Entités reconnues</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metadata')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'metadata'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Classification & Tags</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
          
          {/* TAB 1: Structured Data */}
          {activeTab === 'structured' && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(doc.extractedData.structured).map(([key, value]) => (
                  <div 
                    key={key}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-1"
                  >
                    <span className="text-[11px] font-medium text-white/45">{key}</span>
                    <span className="text-xs font-semibold text-white/90">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Raw Text Extracted */}
          {activeTab === 'text' && (
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Contenu OCR textuel extrait :</span>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopied ? 'Copié !' : 'Copier le texte'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono text-white/80 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto scrollbar-none">
                {doc.extractedData.rawText}
              </pre>
            </div>
          )}

          {/* TAB 3: Entities */}
          {activeTab === 'entities' && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doc.extractedData.entities.map((entity, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                        {entity.label}
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {entity.value}
                      </span>
                    </div>
                    {entity.confidence && (
                      <span className="text-[10px] font-mono text-white/40 bg-white/5 px-2 py-0.5 rounded">
                        {entity.confidence}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Metadata & Tags */}
          {activeTab === 'metadata' && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-white/50">Classification suggérée :</span>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-semibold text-xs">
                  {doc.extractedData.classification}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-white/50">Mots-clés & Tags générés :</span>
                <div className="flex flex-wrap gap-2">
                  {doc.extractedData.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-lg bg-black/40 border border-white/15 text-xs text-white/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/40">
          <div className="text-xs text-white/50">
            Statut actuel : <span className={doc.status === 'validated' ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>{doc.status === 'validated' ? 'Validé' : 'En attente de validation'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Fermer
            </button>

            {doc.status !== 'validated' && (
              <button
                type="button"
                onClick={() => {
                  onValidate(doc);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Valider ce document</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
