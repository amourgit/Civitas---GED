import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MoreHorizontal, 
  Database, 
  Eye, 
  Trash2, 
  Download,
  RotateCw,
  FileText,
  Sparkles
} from 'lucide-react';
import { IngestionSession, IngestionDocument } from '../../types/ingestion';

interface IngestionRightbarProps {
  session: IngestionSession;
  onViewExtractedData: (doc: IngestionDocument) => void;
  onPreviewDocument: (doc: IngestionDocument) => void;
  onDeleteDocument: (doc: IngestionDocument) => void;
  onRetryDocument: (doc: IngestionDocument) => void;
  onCompleteSession: () => void;
  className?: string;
}

export function IngestionRightbar({
  session,
  onViewExtractedData,
  onPreviewDocument,
  onDeleteDocument,
  onRetryDocument,
  onCompleteSession,
  className = ''
}: IngestionRightbarProps) {
  const [activeMenuDocId, setActiveMenuDocId] = useState<string | null>(null);

  const total = session.documents.length;
  const validated = session.documents.filter(d => d.status === 'validated').length;
  const pending = session.documents.filter(d => d.status === 'pending').length;
  const errors = session.documents.filter(d => d.status === 'error').length;

  const progressPercent = total > 0 ? (validated / total) * 100 : 0;

  return (
    <aside 
      className={`hidden lg:flex w-80 sm:w-88 xl:w-96 shrink-0 flex-col justify-between p-5 bg-[#03090b]/80 border-l border-white/10 select-none overflow-y-auto scrollbar-none z-20 ${className}`}
      aria-label="Détails de la session"
    >
      <div className="flex flex-col gap-5">
        
        {/* 1. Header: Détails de la session + Status */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white tracking-tight">
            Détails de la session
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span>Active</span>
          </div>
        </div>

        {/* 2. Progress Ring & Counts (matches screenshot!) */}
        <div className="rounded-2xl p-4 bg-black/40 border border-white/10 flex items-center gap-4">
          
          {/* Progress Ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="30"
                cy="30"
                r="24"
                stroke="#4ade80"
                strokeWidth="4"
                strokeDasharray="150.8"
                strokeDashoffset={150.8 - (150.8 * (validated + pending)) / (total || 1)}
                strokeLinecap="round"
                fill="none"
                className="drop-shadow-[0_0_8px_#4ade80]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <span className="text-xs font-bold leading-none">{pending}</span>
              <span className="text-[9px] text-white/40 leading-none">/ {total}</span>
            </div>
          </div>

          {/* Counts Info */}
          <div className="flex flex-col gap-0.5">
            <h4 className="text-xs font-semibold text-white">
              Documents à traiter
            </h4>
            <p className="text-[11px] text-white/60">
              <span className="text-emerald-400">{validated} validé</span> • <span className="text-amber-300">{pending} en attente</span> • <span className="text-red-400">{errors} erreur</span>
            </p>
          </div>
        </div>

        {/* 3. Session Metadata Key-Value */}
        <div className="rounded-2xl p-4 bg-black/30 border border-white/5 flex flex-col gap-2.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-white/45">ID de session</span>
            <span className="font-mono text-white/90 text-[11px]">{session.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/45">Créée le</span>
            <span className="text-white/80 text-[11px]">{session.createdAt}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/45">Initiée par</span>
            <span className="text-white/80 text-[11px] truncate max-w-[170px] text-right">{session.createdBy}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/45">Type d'ingestion</span>
            <span className="text-white/80 text-[11px]">{session.type}</span>
          </div>
        </div>

        {/* 4. Compact Document List */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white tracking-wide">
              Liste des documents
            </h3>
            <button 
              type="button" 
              className="text-[11px] text-white/40 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Tout voir
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto scrollbar-none pr-0.5">
            {session.documents.map((doc) => {
              const isMenuOpen = activeMenuDocId === doc.id;
              return (
                <div
                  key={doc.id}
                  className="relative group rounded-xl p-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-emerald-400/40 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Small Thumbnail */}
                    <div className="relative w-9 h-11 rounded-lg overflow-hidden shrink-0 bg-transparent border border-white/10">
                      {doc.thumbnailUrl ? (
                        <img 
                          src={doc.thumbnailUrl} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                          <FileText className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-white truncate max-w-[150px]" title={doc.filename}>
                        {doc.filename}
                      </span>
                      <span className="text-[10px] text-white/40">
                        {doc.size} • {doc.formatBadge}
                      </span>
                      <div className="mt-0.5">
                        {doc.status === 'validated' ? (
                          <span className="text-[9px] font-semibold text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Validé
                          </span>
                        ) : (
                          <span className="text-[9px] font-semibold text-amber-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            En attente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Context Menu Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveMenuDocId(isMenuOpen ? null : doc.id)}
                      className="w-7 h-7 rounded-lg bg-transparent hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>

                    {isMenuOpen && (
                      <div 
                        className="absolute right-0 top-8 w-48 rounded-xl bg-[#071317]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-xl py-1.5 z-50 flex flex-col text-xs text-white/90"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuDocId(null);
                            onViewExtractedData(doc);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 hover:bg-emerald-500/20 text-left transition-colors cursor-pointer"
                        >
                          <Database className="w-3 h-3 text-emerald-400" />
                          <span>Voir les données</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuDocId(null);
                            onPreviewDocument(doc);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 text-left transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-sky-400" />
                          <span>Prévisualiser</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuDocId(null);
                            onRetryDocument(doc);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 text-left transition-colors cursor-pointer"
                        >
                          <RotateCw className="w-3 h-3 text-amber-400" />
                          <span>Réessayer</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuDocId(null);
                            onDeleteDocument(doc);
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-500/20 text-red-400 text-left transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 5. Bottom Final Validation Button */}
      <div className="pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onCompleteSession}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 hover:from-emerald-500/35 hover:to-teal-500/35 border border-emerald-400/60 hover:border-emerald-300 text-emerald-300 hover:text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(74,222,128,0.25)] cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Terminer la session</span>
        </button>
      </div>

    </aside>
  );
}
