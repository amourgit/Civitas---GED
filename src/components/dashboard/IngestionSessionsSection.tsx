import React from 'react';
import { Cpu, Play } from 'lucide-react';
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
    <section className="w-full flex flex-col justify-center select-none">
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 items-stretch">
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
            className={`relative group cursor-pointer h-28 sm:h-36 md:h-44 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === session.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src={session.image} 
              alt={session.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.55]"
            />

            {/* Top Bar with Session ID & Status */}
            <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2 sm:left-2 sm:right-2 z-10 flex items-center justify-between gap-1">
              <span className={`px-1.5 py-0.2 rounded-xs backdrop-blur-md text-[7px] sm:text-[8px] md:text-[9px] font-mono font-bold border truncate ${session.statusColor}`}>
                {session.status}
              </span>
              <span className="text-[7px] sm:text-[8px] md:text-[9px] text-amber-300 font-mono font-bold bg-black/75 px-1 py-0.2 rounded-xs border border-white/10 flex items-center gap-0.5 shrink-0">
                <Cpu className="w-2 h-2 text-amber-400" />
                <span>OCR {session.ocrConfidence}</span>
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#020508]/98 via-[#020508]/80 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2.5 md:p-3 flex flex-col justify-end">
              <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400 font-bold">
                  {session.sessionId}
                </span>
                <span className="text-white/50 text-[8px] hidden sm:inline">•</span>
                <span className="text-white/60 text-[8px] sm:text-[9px] font-mono truncate hidden sm:inline">{session.type}</span>
              </div>

              <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-tight truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {session.title}
              </span>

              {/* Progress bar */}
              <div className="mt-1">
                <div className="w-full flex items-center justify-between text-[7px] sm:text-[8px] md:text-[9px] text-white/70 font-mono mb-0.5">
                  <span className="truncate">{session.processedCount}/{session.docCount} traités</span>
                  <span className="text-amber-300 font-bold ml-1">{session.progress}%</span>
                </div>
                <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/15 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${session.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[7px] sm:text-[8px] md:text-[9px] text-white/50 font-mono mt-1 pt-0.5 border-t border-white/10 gap-1">
                <span className="truncate">Vers : {session.targetRoom}</span>
                <span className="text-emerald-400 flex items-center gap-0.5 group-hover:underline shrink-0">
                  <Play className="w-2 h-2 fill-emerald-400" />
                  <span>Reprendre</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
