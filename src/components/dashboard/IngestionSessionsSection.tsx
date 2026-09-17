import React from 'react';
import { Scan, ArrowRight, RefreshCw, Cpu, CheckCircle2, Play, FilePlus } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface IngestionSessionsSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToIngestion: () => void;
}

const INGESTION_SESSIONS = [
  {
    id: 'ing-session-1',
    sessionId: '#S-2025-09-06-001',
    title: 'Lot Factures Fournisseurs & Bordereaux Q3',
    type: 'Scan Numérisation + OCR IA',
    docCount: 18,
    processedCount: 14,
    ocrConfidence: '98.4%',
    status: 'EN COURS D\'EXTRACTION',
    statusColor: 'text-amber-300 bg-amber-500/20 border-amber-500/40',
    progress: 78,
    targetRoom: 'Salle S-02 (Finance)',
    startedAt: 'Aujourd\'hui 14:15',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ing-session-2',
    sessionId: '#S-2025-09-05-004',
    title: 'Versements Archives Notariées & Actes Fonciers',
    type: 'Import Fichiers PDF/A & Indexation',
    docCount: 45,
    processedCount: 45,
    ocrConfidence: '99.8%',
    status: 'CONTRÔLE QUALITÉ REQUIS',
    statusColor: 'text-sky-300 bg-sky-500/20 border-sky-500/40',
    progress: 100,
    targetRoom: 'Salle S-01 (Direction)',
    startedAt: 'Hier 17:30',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
  }
];

export function IngestionSessionsSection({
  activeCardId,
  setActiveCardId,
  onNavigateToIngestion
}: IngestionSessionsSectionProps) {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Sessions d’ingestion & Numérisation en cours
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
            {INGESTION_SESSIONS.length} sessions actives
          </span>
        </div>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            onNavigateToIngestion();
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Espace Ingestion</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5">
        {INGESTION_SESSIONS.map((session) => (
          <div
            key={session.id}
            onClick={() => {
              playXboxSound('select');
              setActiveCardId(session.id);
              onNavigateToIngestion();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId(session.id);
            }}
            className={`relative group cursor-pointer h-40 sm:h-44 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === session.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src={session.image} 
              alt={session.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.55]"
            />

            {/* Top Bar with Session ID & Status */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-[2px] backdrop-blur-md text-[9px] font-mono font-bold border ${session.statusColor}`}>
                {session.status}
              </span>
              <span className="text-[10px] text-amber-300 font-mono font-bold bg-black/75 px-2 py-0.5 rounded-[2px] border border-white/10 flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5 text-amber-400" />
                OCR {session.ocrConfidence}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#020508]/98 via-[#020508]/80 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col justify-end">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {session.sessionId}
                </span>
                <span className="text-white/50 text-[10px]">•</span>
                <span className="text-white/60 text-[10px] font-mono">{session.type}</span>
              </div>

              <span className="text-white font-bold text-xs sm:text-sm tracking-tight truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {session.title}
              </span>

              {/* Progress bar */}
              <div className="mt-2">
                <div className="w-full flex items-center justify-between text-[9px] text-white/70 font-mono mb-1">
                  <span>{session.processedCount} / {session.docCount} docs traités</span>
                  <span className="text-amber-300 font-bold">{session.progress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/15 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${session.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-white/50 font-mono mt-2 pt-1 border-t border-white/10">
                <span>Vers : {session.targetRoom}</span>
                <span className="text-emerald-400 flex items-center gap-1 group-hover:underline">
                  <Play className="w-2.5 h-2.5 fill-emerald-400" />
                  Reprendre la session
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
