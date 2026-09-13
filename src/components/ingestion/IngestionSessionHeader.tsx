import React from 'react';
import { 
  Scan, 
  FileText, 
  Mail, 
  Cloud, 
  Share2, 
  FolderTree, 
  Plus, 
  Sliders,
  Sparkles
} from 'lucide-react';

interface IngestionSessionHeaderProps {
  sessionId: string;
  status: string;
  onAddDocuments: () => void;
  onOpenSettings: () => void;
  onSelectQuickSource: (source: string) => void;
  onOpenScanner?: () => void;
}

export function IngestionSessionHeader({
  sessionId,
  status,
  onAddDocuments,
  onOpenSettings,
  onSelectQuickSource,
  onOpenScanner
}: IngestionSessionHeaderProps) {
  const quickSources = [
    { id: 'scan', label: 'Scan', icon: <Scan className="w-4 h-4" /> },
    { id: 'import', label: 'Fichiers', icon: <FileText className="w-4 h-4" /> },
    { id: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
    { id: 'cloud', label: 'Cloud', icon: <Cloud className="w-4 h-4" /> },
    { id: 'api', label: 'API', icon: <Share2 className="w-4 h-4" /> },
    { id: 'folder', label: 'Dossiers', icon: <FolderTree className="w-4 h-4" /> }
  ];

  return (
    <div className="relative w-full rounded-2xl p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-white/10 via-[#07171d]/85 to-[#02090c]/95 border border-emerald-500/30 shadow-[0_0_20px_rgba(74,222,128,0.15)]">
      {/* Ambient background glow & glass shine */}
      <div 
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-2xl opacity-25"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 80%)'
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-6">
        
        {/* Left Column: Title, Subtitle, Sources & Action Buttons */}
        <div className="flex-1 flex flex-col gap-3 max-w-xl">
          
          {/* Status Label & Title */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                Ingestion en cours
              </span>
            </div>

            <h1 className="text-base sm:text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Session d'ingestion
            </h1>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-white/60 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                {sessionId}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-semibold">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                {status}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed font-normal">
            Ajoutez vos documents depuis différentes sources. Ils seront automatiquement analysés et organisés.
          </p>

          {/* Quick Sources Circle Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap pt-0.5">
            {quickSources.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (s.id === 'scan' && onOpenScanner) {
                    onOpenScanner();
                  } else {
                    onSelectQuickSource(s.id);
                  }
                }}
                className="group flex flex-col items-center gap-1 cursor-pointer outline-none"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-transparent hover:bg-emerald-500/20 border border-white/20 hover:border-emerald-400/60 flex items-center justify-center text-white/75 hover:text-emerald-300 transition-all duration-200 shadow-sm group-hover:scale-105">
                  {React.cloneElement(s.icon as React.ReactElement, { className: 'w-3.5 h-3.5 sm:w-4 sm:h-4' })}
                </div>
                <span className="text-[9px] sm:text-[10px] text-white/50 group-hover:text-white/90 transition-colors">
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {onOpenScanner && (
              <button
                type="button"
                onClick={onOpenScanner}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold text-[10px] sm:text-xs shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all cursor-pointer hover:scale-[1.02]"
              >
                <Scan className="w-3.5 h-3.5 text-black animate-pulse" />
                <span>Scanner Live</span>
              </button>
            )}

            <button
              type="button"
              onClick={onAddDocuments}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-[10px] sm:text-xs shadow-md transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter</span>
            </button>

            <button
              type="button"
              onClick={onOpenSettings}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-transparent hover:bg-white/10 border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-[10px] sm:text-xs font-medium transition-all cursor-pointer backdrop-blur-sm"
            >
              <Sliders className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Paramètres</span>
            </button>
          </div>

        </div>

        {/* Right Column: 3D Hologram & Optical Scanner Illustration (Hidden on mobile/tablet) */}
        <div className="hidden lg:flex relative w-72 h-44 sm:h-48 items-center justify-center pointer-events-none select-none shrink-0">
          
          {/* Ambient Glows */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-cyan-500/15 to-transparent blur-2xl rounded-full opacity-70" />

          {/* Holographic Scanner Glass Bed */}
          <div className="relative w-56 h-32 rounded-2xl bg-black/40 border border-cyan-400/40 transform rotate-x-12 rotate-z-[-6deg] shadow-[0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-md flex items-center justify-center overflow-hidden">
            {/* Cyan Laser Scan Line moving */}
            <div 
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#22d3ee] animate-pulse"
              style={{ top: '45%' }}
            />
            {/* Grid texture on scanner bed */}
            <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
          </div>

          {/* Floating Floating Hologram Documents */}
          <div className="absolute top-2 right-8 w-24 h-32 rounded-xl bg-gradient-to-b from-white/20 to-white/5 border border-white/30 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transform rotate-12 backdrop-blur-lg flex flex-col p-2.5 gap-1.5 animate-bounce [animation-duration:4s]">
            <div className="w-1/2 h-1.5 rounded bg-emerald-400/80" />
            <div className="w-full h-1 rounded bg-white/40" />
            <div className="w-5/6 h-1 rounded bg-white/30" />
            <div className="w-4/5 h-1 rounded bg-white/30" />
            <div className="mt-auto w-full h-4 rounded bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
              <span className="text-[8px] font-mono text-emerald-300">OCR READY</span>
            </div>
          </div>

          <div className="absolute top-6 left-8 w-22 h-28 rounded-xl bg-gradient-to-b from-white/15 to-white/5 border border-cyan-400/30 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transform -rotate-6 backdrop-blur-md flex flex-col p-2 gap-1.5">
            <div className="w-1/2 h-1.5 rounded bg-cyan-400/80" />
            <div className="w-full h-1 rounded bg-white/30" />
            <div className="w-3/4 h-1 rounded bg-white/20" />
          </div>

          {/* Optical Target Overlay badge */}
          <div className="absolute bottom-2 right-4 px-3 py-1.5 rounded-lg bg-black/60 border border-cyan-400/50 text-[11px] font-mono font-bold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] backdrop-blur-md flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>OCR 99.4%</span>
          </div>

        </div>

      </div>
    </div>
  );
}
