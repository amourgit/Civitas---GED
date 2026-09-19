import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  FileText, 
  FileSpreadsheet, 
  Presentation, 
  Plus, 
  MoreHorizontal, 
  ChevronDown,
  ExternalLink,
  Upload
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { PORTAL_MOCK_DATA, DocumentItem } from '../../data/portalMockData';

interface PortalDocumentsProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export function PortalDocuments({ onShowToast }: PortalDocumentsProps) {
  const navigate = useNavigate();
  const [isNewOpen, setIsNewOpen] = useState(false);

  const getDocIcon = (type: DocumentItem['type']) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-4 h-4 text-amber-400 fill-amber-400/20 shrink-0" />;
      case 'docx':
        return (
          <div className="w-4 h-4 rounded-xs bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-xs">
            W
          </div>
        );
      case 'xlsx':
        return (
          <div className="w-4 h-4 rounded-xs bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-xs">
            X
          </div>
        );
      case 'pptx':
        return (
          <div className="w-4 h-4 rounded-xs bg-orange-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0 shadow-xs">
            P
          </div>
        );
      default:
        return <FileText className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  const handleDocClick = (doc: DocumentItem) => {
    playXboxSound('select');
    if (doc.type === 'folder') {
      navigate('/ged/documentation/salles');
    } else {
      onShowToast?.(`Ouverture de ${doc.name} dans la visionneuse GED certifiée.`, 'info');
      navigate('/ged/sites');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header with See All */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-white tracking-tight">
          Documents
        </h3>
        <button
          onClick={() => {
            playXboxSound('select');
            navigate('/ged');
          }}
          className="text-xs font-semibold text-[#008272] dark:text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>See all</span>
        </button>
      </div>

      {/* Action Sub-bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-1.5 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          {/* New Document Button */}
          <div className="relative">
            <button
              onClick={() => {
                playXboxSound('select');
                setIsNewOpen(prev => !prev);
              }}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-teal-300 hover:text-teal-200 hover:bg-white/5 font-semibold transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isNewOpen && (
              <div className="absolute left-0 mt-1 w-44 rounded-xl bg-slate-900/95 border border-white/15 shadow-2xl py-1 z-50 backdrop-blur-xl text-xs font-medium animate-in fade-in zoom-in-95 duration-100">
                <button 
                  onClick={() => { setIsNewOpen(false); navigate('/ged/ingestion'); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-teal-500/20 hover:text-teal-300 flex items-center gap-2"
                >
                  <Folder className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dossier</span>
                </button>
                <button 
                  onClick={() => { setIsNewOpen(false); navigate('/ged/ingestion'); }}
                  className="w-full text-left px-3 py-1.5 text-slate-200 hover:bg-teal-500/20 hover:text-teal-300 flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5 text-sky-400" />
                  <span>Téléverser fichier</span>
                </button>
              </div>
            )}
          </div>

          <button 
            onClick={() => onShowToast?.("Options documentaires avancées.", "info")}
            className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* View switcher */}
        <button 
          onClick={() => onShowToast?.("Vue 'Tous les documents' activée.", "info")}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <span>All Documents</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Table Header */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 px-2 py-1">
        <div className="flex items-center gap-1 cursor-pointer hover:text-white">
          <span>Name</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>
      </div>

      {/* Document Items List */}
      <div className="flex flex-col divide-y divide-white/5">
        {PORTAL_MOCK_DATA.documents.map((doc) => (
          <div
            key={doc.id}
            onClick={() => handleDocClick(doc)}
            className="py-2.5 px-2 flex items-center justify-between gap-3 group cursor-pointer hover:bg-white/5 rounded-xl transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              {getDocIcon(doc.type)}
              <span className="text-xs text-slate-200 group-hover:text-teal-300 font-medium truncate transition-colors">
                {doc.name}
              </span>
            </div>

            <span className="text-[11px] text-slate-500 hidden sm:inline truncate shrink-0">
              {doc.modifiedDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
