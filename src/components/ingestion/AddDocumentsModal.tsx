import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Scan, 
  FileText, 
  Mail, 
  Cloud, 
  Share2, 
  FolderTree,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { IngestionDocument } from '../../types/ingestion';
import { playXboxSound } from '../../utils/xboxAudio';

interface AddDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocuments: (newDocs: IngestionDocument[]) => void;
}

export function AddDocumentsModal({
  isOpen,
  onClose,
  onAddDocuments
}: AddDocumentsModalProps) {
  const [selectedSource, setSelectedSource] = useState<'files' | 'scan' | 'cloud'>('files');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      playXboxSound('modalOpen');
    }
  }, [isOpen]);

  const handleClose = () => {
    playXboxSound('back');
    onClose();
  };

  if (!isOpen) return null;

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newDocs: IngestionDocument[] = Array.from(fileList).map((file, index) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf';
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);

      return {
        id: `ing_user_${Date.now()}_${index}`,
        filename: file.name,
        size: `${sizeMb} Mo`,
        format: (['pdf', 'jpg', 'png', 'docx', 'xlsx', 'pptx'].includes(ext) ? ext : 'pdf') as any,
        formatBadge: ext.toUpperCase(),
        thumbnailUrl: ext === 'png' || ext === 'jpg'
          ? URL.createObjectURL(file)
          : 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=75',
        metadata: {
          nom: file.name.replace(/\.[^/.]+$/, ''),
          date: new Date().toISOString().split('T')[0],
          auteur: 'Amour Samuel NZILA NGALA',
          pages: 1,
          departement: 'Utilisateur'
        },
        status: 'pending',
        extractedData: {
          rawText: `DOCUMENT IMPORTÉ VIA LA SOURCE : ${selectedSource.toUpperCase()}\nNom de fichier : ${file.name}\nTaille : ${sizeMb} Mo\nAnalyse automatique en cours de finalisation...`,
          structured: {
            'Nom du document': file.name,
            'Source d’ingestion': selectedSource.toUpperCase(),
            'Taille': `${sizeMb} Mo`,
            'Statut OCR': 'Analyse achevée avec succès',
            'Confiance': '98 %'
          },
          entities: [
            { label: 'Fichier', value: file.name, confidence: 99 },
            { label: 'Utilisateur', value: 'Amour Samuel NZILA NGALA', confidence: 98 }
          ],
          tags: ['Nouveau', 'Import', selectedSource],
          classification: 'Document / Import utilisateur',
          ocrConfidence: 98.0
        }
      };
    });

    onAddDocuments(newDocs);
    onClose();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-[#071317]/95 border border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Ajouter des documents à la session
              </h3>
              <p className="text-xs text-white/50">
                Sélectionnez une source d'ingestion ou glissez vos fichiers
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

        {/* Source selector */}
        <div className="px-6 pt-5 pb-3">
          <label className="text-xs font-semibold text-white/60 mb-2 block">
            Mode d'acquisition :
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setSelectedSource('files')}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                selectedSource === 'files'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-black/30 border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Fichiers locaux</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSource('scan')}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                selectedSource === 'scan'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-black/30 border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              <Scan className="w-4 h-4" />
              <span>Scanner / Caméra</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSource('cloud')}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                selectedSource === 'cloud'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-black/30 border-white/10 text-white/70 hover:bg-white/5'
              }`}
            >
              <Cloud className="w-4 h-4" />
              <span>Connecteur Cloud</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop Area */}
        <div className="p-6">
          <input 
            type="file" 
            ref={fileInputRef} 
            multiple 
            className="hidden" 
            onChange={(e) => handleFiles(e.target.files)} 
          />

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full min-h-[200px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-emerald-400 bg-emerald-500/10 shadow-[0_0_30px_rgba(74,222,128,0.3)]'
                : 'border-white/15 bg-black/40 hover:border-emerald-400/50 hover:bg-black/60'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-3 shadow-md">
              <Upload className="w-6 h-6" />
            </div>

            <h4 className="text-sm font-semibold text-white mb-1">
              {isDragging ? 'Déposez vos documents ici' : 'Cliquez ou glissez-déposez vos fichiers'}
            </h4>
            <p className="text-xs text-white/50 max-w-sm mb-3">
              Supporte les formats PDF, Word (DOCX), Excel (XLSX), PowerPoint (PPTX), Images (JPG, PNG).
            </p>

            <span className="px-4 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold shadow-sm">
              Parcourir les fichiers
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 bg-black/40">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            Annuler
          </button>
        </div>

      </div>
    </div>
  );
}
