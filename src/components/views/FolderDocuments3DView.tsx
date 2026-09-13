import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Share2, 
  FileText, 
  Info,
  Calendar,
  HardDrive,
  ChevronRight
} from 'lucide-react';
import { FolderItem } from '../../types/document';
import { FolderPerspectiveDocumentList, PerspectiveFileItem } from '../folder/FolderPerspectiveDocumentList';
import { 
  getLocationForFolder, 
  buildDocumentationUrl, 
  buildSalleUrl, 
  buildRayonUrl, 
  buildCasierUrl 
} from '../../data/archiveStructure';
import { playXboxSound } from '../../utils/xboxAudio';

interface FolderDocuments3DViewProps {
  folder: FolderItem;
  onBack: () => void;
  onSelectDocument?: (doc: any) => void;
}

export function FolderDocuments3DView({
  folder,
  onBack,
  onSelectDocument
}: FolderDocuments3DViewProps) {
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [previewDoc, setPreviewDoc] = useState<any | null>(null);

  // Dynamic physical location tracking matching the main documents engine
  const physicalLocation = useMemo(() => {
    return getLocationForFolder(folder.id);
  }, [folder.id]);

  // Files inside the folder (or fallback to photo items or generated files if none)
  const files = useMemo<PerspectiveFileItem[]>(() => {
    if (folder.filesInside && folder.filesInside.length > 0) {
      return folder.filesInside;
    }
    if (folder.photos && folder.photos.length > 0) {
      return folder.photos.map((p, i) => ({
        id: `p-${p.id || i}`,
        name: p.title || `Photo_${i + 1}.jpg`,
        type: 'image' as const,
        size: p.size || '4.2 Mo',
        updatedAt: folder.updatedAt,
        url: p.image
      }));
    }
    // Default fallback documents for rich exploration matching the reference variety
    return [
      { id: 'd1', name: `${folder.name}_Overview.pdf`, type: 'pdf' as const, size: '4.8 Mo', updatedAt: 'Aujourd’hui, 11:20' },
      { id: 'd2', name: 'Rapport_Synthese.docx', type: 'doc' as const, size: '2.3 Mo', updatedAt: 'Hier, 15:45' },
      { id: 'd3', name: 'Enregistrement_Reunion.mp4', type: 'video' as const, size: '48.5 Mo', updatedAt: '06 Sept. 2025' },
      { id: 'd4', name: 'Tableau_Metriques.xlsx', type: 'sheet' as const, size: '1.7 Mo', updatedAt: '04 Sept. 2025' },
      { id: 'd5', name: 'Charte_Visuelle.png', type: 'image' as const, size: '8.2 Mo', updatedAt: '03 Sept. 2025' },
      { id: 'd6', name: 'Briefing_Audio.mp3', type: 'audio' as const, size: '14.1 Mo', updatedAt: '02 Sept. 2025' },
      { id: 'd7', name: 'Archives_Livrables.zip', type: 'zip' as const, size: '85 Mo', updatedAt: '28 Août 2025' }
    ];
  }, [folder]);

  const handleOpenDoc = (fileItem: PerspectiveFileItem) => {
    playXboxSound('modalOpen');
    setPreviewDoc(fileItem);
    if (onSelectDocument) onSelectDocument(fileItem);
  };

  const handleClosePreview = () => {
    playXboxSound('back');
    setPreviewDoc(null);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-between relative select-none overflow-visible">
      {/* Top Header Bar for Folder Context */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-2.5 z-30 gap-3 border-b border-white/5 bg-black/20 shrink-0">
        {/* Left Section: Back Button and Breadcrumbs inline on tablet/desktop */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <button
            type="button"
            onClick={() => {
              playXboxSound('back');
              onBack();
            }}
            className="group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-transparent hover:bg-white/10 border border-white/15 hover:border-emerald-400/60 text-white/80 hover:text-emerald-300 transition-all cursor-pointer backdrop-blur-sm shrink-0 self-start xs:self-auto"
            title="Retour aux dossiers (Échap)"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span className="text-[10px] sm:text-xs font-tech font-bold tracking-wider uppercase hidden sm:inline">Retour aux dossiers</span>
            <span className="text-[10px] sm:text-xs font-tech font-bold tracking-wider uppercase sm:hidden">Retour</span>
          </button>

          {/* Breadcrumbs Path with traceable links to each physical hierarchy level */}
          <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-mono text-white/40 min-w-0">
            <Link 
              to={buildDocumentationUrl()}
              onClick={() => playXboxSound('select')}
              className="hidden lg:inline font-bold hover:text-emerald-400 transition-colors"
            >
              DOCUMENTATION
            </Link>
            <ChevronRight className="w-2.5 h-2.5 text-white/20 hidden lg:inline" />
            
            <Link 
              to={buildSalleUrl(physicalLocation.salle.id)}
              onClick={() => playXboxSound('select')}
              className="hover:text-emerald-400 transition-colors truncate"
            >
              SALLE: [{physicalLocation.salle.matricule}]
            </Link>
            <ChevronRight className="w-2.5 h-2.5 text-white/20" />

            <Link 
              to={buildRayonUrl(physicalLocation.salle.id, physicalLocation.rayon.id)}
              onClick={() => playXboxSound('select')}
              className="hover:text-emerald-400 transition-colors truncate"
            >
              RAYON: [{physicalLocation.rayon.matricule}]
            </Link>
            <ChevronRight className="w-2.5 h-2.5 text-white/20" />

            <Link 
              to={buildCasierUrl(physicalLocation.salle.id, physicalLocation.rayon.id, physicalLocation.casier.id)}
              onClick={() => playXboxSound('select')}
              className="hover:text-emerald-400 transition-colors truncate"
            >
              CASIER: [{physicalLocation.casier.matricule}]
            </Link>
            <ChevronRight className="w-2.5 h-2.5 text-white/20" />

            <span className="text-emerald-400 font-bold truncate">
              {folder.name.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Right Section: Folder Meta Badges (compact & clean, always inline on the right) */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-white/60 font-ai-mono shrink-0 justify-start xs:justify-end">
          <div className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-transparent border border-white/15">
            <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
            <span>{files.length} <span className="hidden sm:inline">fichiers</span><span className="sm:hidden">f.</span></span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-1 rounded-lg bg-transparent border border-white/15">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[60px] sm:max-w-none">{folder.updatedAt}</span>
          </div>
        </div>
      </div>

      {/* Center 3D Documents List with Realistic Vanishing Perspective Depth */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-auto overflow-visible">
        <FolderPerspectiveDocumentList
          files={files}
          activeIndex={activeDocIndex}
          onSelectIndex={setActiveDocIndex}
          onOpenDoc={handleOpenDoc}
          className="w-full"
        />
      </div>

      {/* Keyboard & Nav Hints */}
      <div className="w-full flex items-center justify-between px-8 py-3 text-xs text-white/40 tracking-wider font-light z-20 font-ai-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">
            ◀ ▶ Naviguer
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px]">
            ↵ Ouvrir
          </span>
        </div>

        <div className="flex items-center gap-2 text-white/50">
          <span>{activeDocIndex + 1} / {files.length}</span>
        </div>
      </div>

      {/* Document Detail / Image Preview Modal */}
      {previewDoc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setPreviewDoc(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#051114] border border-emerald-500/40 rounded-2xl p-6 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col gap-5 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-tech font-bold text-white tracking-wide">{previewDoc.name}</h2>
                  <p className="text-xs text-white/50 font-ai-mono">{previewDoc.size} • Modifié le {previewDoc.updatedAt}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClosePreview}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content Preview */}
            <div className="w-full h-72 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center relative">
              {previewDoc.url ? (
                <img 
                  src={previewDoc.url} 
                  alt={previewDoc.name} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/40">
                  <FileText className="w-12 h-12 text-emerald-400/60" />
                  <p className="text-xs font-tech">Aperçu document sécurisé GoFAST</p>
                  <span className="text-[11px] text-white/30 font-ai-mono">Prêt pour consultation et annotation</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClosePreview}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-tech font-semibold cursor-pointer"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = previewDoc.url || '#';
                  link.download = previewDoc.name;
                  link.click();
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.5)] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger le fichier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
