import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Database, 
  Eye, 
  RotateCw, 
  Trash2, 
  Download,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { IngestionDocument } from '../../types/ingestion';

interface IngestionDocumentCardProps {
  key?: React.Key;
  document: IngestionDocument;
  onViewExtractedData: (doc: IngestionDocument) => void;
  onPreview: (doc: IngestionDocument) => void;
  onRetry: (doc: IngestionDocument) => void;
  onDelete: (doc: IngestionDocument) => void;
  onValidate?: (doc: IngestionDocument) => void;
}

export function IngestionDocumentCard({
  document: doc,
  onViewExtractedData,
  onPreview,
  onRetry,
  onDelete,
  onValidate
}: IngestionDocumentCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Determine format badge color
  const getBadgeStyle = () => {
    switch (doc.format) {
      case 'pdf':
        return 'bg-red-600 text-white';
      case 'jpg':
        return 'bg-sky-600 text-white';
      case 'png':
        return 'bg-emerald-600 text-white';
      case 'docx':
      case 'doc':
        return 'bg-blue-600 text-white';
      case 'xlsx':
        return 'bg-emerald-600 text-white';
      case 'pptx':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="relative group rounded-2xl p-4 bg-black/35 hover:bg-black/50 border border-white/10 hover:border-emerald-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_25px_rgba(74,222,128,0.2)] transition-all duration-200 flex flex-col justify-between">
      
      {/* 1. Document Preview Container & ⋯ Menu */}
      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-black/50 border border-white/10 mb-3 group/thumb">
        
        {/* Document Thumbnail Preview */}
        {doc.thumbnailUrl ? (
          <img 
            src={doc.thumbnailUrl} 
            alt={doc.filename}
            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-white/30">
            <FileText className="w-10 h-10 mb-1 text-emerald-400/50" />
            <span className="text-[10px] font-mono">Page 1 • OCR</span>
          </div>
        )}

        {/* Subtle dark gradient overlay for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Format Badge (e.g. PDF, JPG, PNG, DOCX, XLSX, PPTX) */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm ${getBadgeStyle()}`}>
            {doc.formatBadge}
          </span>
        </div>

        {/* ⋯ Context Menu Trigger Button */}
        <div className="absolute top-2 right-2 z-20" ref={menuRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="w-7 h-7 rounded-lg bg-transparent hover:bg-white/15 border border-white/20 hover:border-emerald-400 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
            title="Options du document"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* Context Dropdown Menu (Glassmorphism style matching the screenshot) */}
          {isMenuOpen && (
            <div 
              className="absolute right-0 top-8 w-56 rounded-2xl bg-[#071317]/95 border border-emerald-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl py-2 z-50 animate-in fade-in duration-150 flex flex-col gap-0.5 text-xs text-white/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onViewExtractedData(doc);
                }}
                className="flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-500/20 hover:text-emerald-300 text-left transition-colors cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Voir les données extraites</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onPreview(doc);
                }}
                className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10 text-left transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>Prévisualiser le document</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onRetry(doc);
                }}
                className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10 text-left transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Réessayer l'ingestion</span>
              </button>

              {onValidate && doc.status !== 'validated' && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onValidate(doc);
                  }}
                  className="flex items-center gap-2.5 px-4 py-2 hover:bg-emerald-500/20 text-emerald-300 text-left transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Valider ce document</span>
                </button>
              )}

              <div className="h-px bg-white/10 my-1 mx-3" />

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete(doc);
                }}
                className="flex items-center gap-2.5 px-4 py-2 hover:bg-red-500/20 text-red-400 text-left transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Supprimer</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  const link = document.createElement('a');
                  link.href = doc.thumbnailUrl || '#';
                  link.download = doc.filename;
                  link.click();
                }}
                className="flex items-center gap-2.5 px-4 py-2 hover:bg-white/10 text-left transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-white/60" />
                <span>Télécharger le fichier</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. File Information & Extracted Metadata Snippet */}
      <div className="flex flex-col gap-1 text-xs">
        
        {/* Filename */}
        <h4 className="font-semibold text-white truncate text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" title={doc.filename}>
          {doc.filename}
        </h4>

        {/* Size • Format */}
        <p className="text-[11px] text-white/50 mb-1.5">
          {doc.size} • {doc.formatBadge}
        </p>

        {/* Extracted Metadata Fields */}
        <div className="flex flex-col gap-0.5 text-[11px] text-white/70 py-1 border-t border-white/5">
          <div className="truncate">
            <span className="text-white/40">Nom : </span>
            <span className="text-white/85 font-medium">{doc.metadata.nom}</span>
          </div>
          <div className="truncate">
            <span className="text-white/40">Date : </span>
            <span className="text-white/75">{doc.metadata.date}</span>
          </div>
          <div className="truncate">
            <span className="text-white/40">Auteur : </span>
            <span className="text-white/75">{doc.metadata.auteur}</span>
          </div>
        </div>
      </div>

      {/* 3. Status Badge Pill */}
      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
        {doc.status === 'validated' ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-semibold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Validé</span>
          </div>
        ) : doc.status === 'processing' ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[10px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Analyse...</span>
          </div>
        ) : doc.status === 'error' ? (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-[10px] font-semibold">
            <AlertCircle className="w-3 h-3 text-red-400" />
            <span>Erreur</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>En attente</span>
          </div>
        )}

        {/* Quick View Button */}
        <button
          type="button"
          onClick={() => onViewExtractedData(doc)}
          className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium hover:underline cursor-pointer"
        >
          Détails OCR →
        </button>
      </div>

    </div>
  );
}
