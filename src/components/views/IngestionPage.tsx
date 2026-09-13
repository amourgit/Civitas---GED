import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Sparkles, CheckCircle2, ArrowLeft, Scan, Zap, ArrowRight } from 'lucide-react';
import { IngestionSession, IngestionDocument } from '../../types/ingestion';
import { initialIngestionSession } from '../../data/mockIngestion';
import { IngestionSessionHeader } from '../ingestion/IngestionSessionHeader';
import { IngestionDocumentCard } from '../ingestion/IngestionDocumentCard';
import { IngestionRightbar } from '../ingestion/IngestionRightbar';
import { ExtractedDataModal } from '../ingestion/ExtractedDataModal';
import { AddDocumentsModal } from '../ingestion/AddDocumentsModal';
import { playXboxSound } from '../../utils/xboxAudio';

interface IngestionPageProps {
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export function IngestionPage({ onShowToast }: IngestionPageProps) {
  const navigate = useNavigate();
  const [session, setSession] = useState<IngestionSession>(initialIngestionSession);
  
  // Selected Document for Extracted Data Modal
  const [selectedDocForData, setSelectedDocForData] = useState<IngestionDocument | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<IngestionDocument | null>(null);

  const notify = (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => {
    if (onShowToast) onShowToast(msg, type);
  };

  const handleBack = () => {
    playXboxSound('back');
    navigate('/documents');
  };

  const handleOpenPreview = (doc: IngestionDocument) => {
    playXboxSound('modalOpen');
    setPreviewDoc(doc);
  };

  const handleClosePreview = () => {
    playXboxSound('back');
    setPreviewDoc(null);
  };

  // Actions
  const handleValidateDoc = (doc: IngestionDocument) => {
    setSession(prev => ({
      ...prev,
      documents: prev.documents.map(d => 
        d.id === doc.id ? { ...d, status: 'validated' } : d
      )
    }));
    playXboxSound('toastSuccess');
    notify(`Document « ${doc.filename} » validé avec succès.`, 'success');
  };

  const handleDeleteDoc = (doc: IngestionDocument) => {
    setSession(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== doc.id)
    }));
    playXboxSound('back');
    notify(`Document « ${doc.filename} » retiré de la session.`, 'warning');
  };

  const handleRetryDoc = (doc: IngestionDocument) => {
    setSession(prev => ({
      ...prev,
      documents: prev.documents.map(d => 
        d.id === doc.id ? { ...d, status: 'pending' } : d
      )
    }));
    playXboxSound('toastInfo');
    notify(`Nouvelle analyse OCR déclenchée pour « ${doc.filename} »...`, 'info');
  };

  const handleAddDocs = (newDocs: IngestionDocument[]) => {
    setSession(prev => ({
      ...prev,
      documents: [...prev.documents, ...newDocs]
    }));
    playXboxSound('toastSuccess');
    notify(`${newDocs.length} document(s) importé(s) dans la session.`, 'success');
  };

  const handleValidateAll = () => {
    setSession(prev => ({
      ...prev,
      documents: prev.documents.map(d => ({ ...d, status: 'validated' }))
    }));
    playXboxSound('achievement');
    notify(`Tous les documents (${session.documents.length}) ont été validés !`, 'success');
  };

  const handleCompleteSession = () => {
    setSession(prev => ({ ...prev, status: 'completed' }));
    playXboxSound('achievement');
    notify('Session d’ingestion finalisée avec succès ! Les métadonnées sont archivées dans la GED.', 'success');
  };

  // Stats
  const total = session.documents.length;
  const validated = session.documents.filter(d => d.status === 'validated').length;
  const pending = session.documents.filter(d => d.status === 'pending').length;
  const errors = session.documents.filter(d => d.status === 'error').length;
  const progressPercent = total > 0 ? ((validated + (total - pending)) / (total * 2)) * 100 : 0;

  return (
    <div className="w-full h-full flex overflow-hidden relative select-none min-h-0">
      
      {/* Central Workspace (Scrollable) */}
      <div 
        className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden p-3 sm:p-6 gap-4 sm:gap-6 min-h-0"
        data-scrollable="true"
      >
        
        {/* Navigation Breadcrumb / Quick Back & Responsive Complete Session Button */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-white/50 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour</span>
          </button>

          {/* Complete session button visible only on mobile/tablet when rightbar is hidden */}
          <button
            type="button"
            onClick={handleCompleteSession}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 hover:text-white text-[10px] font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(74,222,128,0.25)]"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terminer la session</span>
          </button>
        </div>

        {/* 1. Header de Session (matches screenshot!) */}
        <IngestionSessionHeader
          sessionId={session.id}
          status="Active"
          onOpenScanner={() => {
            playXboxSound('select');
            navigate('/scanner');
          }}
          onAddDocuments={() => {
            playXboxSound('modalOpen');
            setIsAddModalOpen(true);
          }}
          onOpenSettings={() => notify("Paramètres d'analyse OCR et filtres d'extraction configurés.", 'info')}
          onSelectQuickSource={(source) => {
            if (source === 'scan') {
              playXboxSound('select');
              navigate('/scanner');
            } else {
              playXboxSound('modalOpen');
              setIsAddModalOpen(true);
            }
          }}
        />

        {/* PROMINENT MAIN SCANNER BANNER (In the main body of Ingestion Page) */}
        <div 
          onClick={() => {
            playXboxSound('select');
            navigate('/scanner');
          }}
          className="group relative w-full rounded-xl p-3.5 sm:p-5 bg-gradient-to-r from-emerald-950/80 via-[#071d17]/90 to-black/80 border border-emerald-500/40 shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.25)] transition-all duration-200 cursor-pointer overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-3 sm:gap-4 z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <Scan className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 animate-pulse" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  Scanner de Documents Live
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[9px] font-bold text-emerald-300 uppercase tracking-widest">
                  Auto-Lock
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-white/70 max-w-xl">
                Mode scan continu sans prise de vue manuelle. Capture automatique dès verrouillage à 100%.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[10px] sm:text-xs shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all shrink-0 z-10">
            <span>Scanner</span>
            <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* 2. Section Documents en cours d'ingestion */}
        <div className="flex flex-col gap-3">
          
          {/* Section Header & Subtitle */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                Documents en cours d'ingestion
              </h2>
              <button 
                type="button" 
                className="text-white/40 hover:text-white transition-colors cursor-pointer"
                title="Les documents sont analysés, les données extraites et attendent votre validation avant intégration dans la GED."
              >
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-white/50">
              {total} document(s) détecté(s) • Traitement OCR automatique
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {session.documents.map((doc) => (
              <IngestionDocumentCard
                key={doc.id}
                document={doc}
                onValidate={handleValidateDoc}
                onDelete={handleDeleteDoc}
                onRetry={handleRetryDoc}
                onViewExtractedData={(d) => {
                  playXboxSound('modalOpen');
                  setSelectedDocForData(d);
                }}
                onPreview={handleOpenPreview}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Right Sidebar: Statuts d'ingestion & Métadonnées d'extraction */}
      <IngestionRightbar
        session={session}
        onViewExtractedData={(d) => {
          playXboxSound('modalOpen');
          setSelectedDocForData(d);
        }}
        onPreviewDocument={handleOpenPreview}
        onDeleteDocument={handleDeleteDoc}
        onRetryDocument={handleRetryDoc}
        onCompleteSession={handleCompleteSession}
      />

      {/* Extracted Data Full Inspection Modal */}
      {selectedDocForData && (
        <ExtractedDataModal
          document={selectedDocForData}
          isOpen={Boolean(selectedDocForData)}
          onClose={() => {
            playXboxSound('back');
            setSelectedDocForData(null);
          }}
          onValidate={(d) => handleValidateDoc(d)}
        />
      )}

      {/* Add Documents Modal */}
      {isAddModalOpen && (
        <AddDocumentsModal
          isOpen={isAddModalOpen}
          onClose={() => {
            playXboxSound('back');
            setIsAddModalOpen(false);
          }}
          onAddDocuments={handleAddDocs}
        />
      )}

      {/* Document Preview Lightbox */}
      {previewDoc && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleClosePreview}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] rounded-2xl bg-[#081519] border border-emerald-400/40 p-4 shadow-2xl flex flex-col items-center gap-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-semibold text-sm">{previewDoc.filename}</span>
              <button 
                type="button"
                onClick={handleClosePreview}
                className="text-white/60 hover:text-white text-xs px-2 py-1 rounded bg-white/10 cursor-pointer"
              >
                ✕ Fermer
              </button>
            </div>
            <img 
              src={previewDoc.thumbnailUrl} 
              alt={previewDoc.filename} 
              className="max-h-[70vh] rounded-lg object-contain shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

    </div>
  );
}
