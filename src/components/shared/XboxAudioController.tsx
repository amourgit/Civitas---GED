import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Check, ChevronRight } from 'lucide-react';
import { xboxAudio, playXboxSound, XboxSoundType } from '../../utils/xboxAudio';

interface XboxAudioControllerProps {
  className?: string;
}

export function XboxAudioController({ className = '' }: XboxAudioControllerProps) {
  const [isMuted, setIsMuted] = useState(xboxAudio.getIsMuted());
  const [volume, setVolume] = useState(xboxAudio.getVolume());
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleToggleMute = () => {
    const nextMuted = xboxAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    xboxAudio.setVolume(newVol);
    playXboxSound('select');
  };

  const soundPresets: { type: XboxSoundType; label: string; desc: string; buttonCode: string }[] = [
    { type: 'select', label: 'Bouton A (Sélection)', desc: 'Clic franc & résonance Xbox', buttonCode: 'A' },
    { type: 'back', label: 'Bouton B (Retour & Fermeture)', desc: 'Descente feutrée & sub-thud console', buttonCode: 'B' },
    { type: 'modalOpen', label: 'Ouverture Modal (Feutré)', desc: 'Bloom soyeux & harmonique doux non-agressif', buttonCode: 'LB' },
    { type: 'folderOpen', label: 'Ouverture Dossier 3D', desc: 'Whoosh guide & nappe céleste', buttonCode: 'RB' },
    { type: 'hover', label: 'Survol (Focus)', desc: 'Micro-tick soyeux & discret', buttonCode: 'RT' },
    { type: 'scroll', label: 'Scroll & Carrousel', desc: 'Tic tactile pas-à-pas', buttonCode: 'RS' },
    { type: 'boundary', label: 'Butée / Fin de Liste (Edge Bump)', desc: 'Butée feutrée & rebond amorti en fin de contenu', buttonCode: '🛑' },
    { type: 'toastSuccess', label: 'Toast Succès', desc: 'Triade cristalline ascendante', buttonCode: '✨' },
    { type: 'toastInfo', label: 'Toast Information', desc: 'Double pulsation limpide & moderne', buttonCode: 'ℹ️' },
    { type: 'toastWarning', label: 'Toast Attention', desc: 'Double notch d’avertissement', buttonCode: '⚠️' },
    { type: 'toastError', label: 'Toast Erreur / Retrait', desc: 'Descente d’alerte & sub-thump', buttonCode: '⛔' },
    { type: 'notification', label: 'Sonnerie & Notif (Ring)', desc: 'Double carillon mélodique', buttonCode: 'X' },
    { type: 'achievement', label: 'Succès Xbox (Validation)', desc: 'Carillon légendaire de trophée', buttonCode: '🏆' },
  ];

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Xbox Audio Toggle Button */}
      <button
        type="button"
        onClick={() => {
          handleToggleMute();
          playXboxSound('select');
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => playXboxSound('hover')}
        title={isMuted ? "Activer les sons Xbox (Clic droit pour le panneau)" : "Sons Xbox actifs (Clic droit pour le panneau)"}
        className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-md ${
          isMuted
            ? 'bg-black/30 border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
            : 'bg-emerald-950/40 border border-emerald-400/50 text-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.45)] hover:border-emerald-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.7)] scale-100 hover:scale-105'
        }`}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4 animate-pulse" />
        )}

        {/* Xbox Live Glowing Pulse Indicator */}
        {!isMuted && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#22c55e]"></span>
          </span>
        )}
      </button>

      {/* Quick Test / Volume Popover */}
      {isOpen && (
        <div 
          className="absolute right-0 top-12 w-80 rounded-2xl bg-[#081519]/95 backdrop-blur-xl border border-emerald-400/30 p-4 shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in-95 duration-200 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
                <span className="text-emerald-400 text-[10px] font-black">X</span>
              </div>
              <span className="text-xs font-bold tracking-wider text-white">
                EFFETS SONORES XBOX
              </span>
            </div>
            <button
              type="button"
              onClick={handleToggleMute}
              className={`text-[11px] px-2 py-0.5 rounded-full border transition-all cursor-pointer font-medium ${
                isMuted
                  ? 'bg-red-500/20 border-red-400/40 text-red-300'
                  : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
              }`}
            >
              {isMuted ? 'Muet' : 'Activé'}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="py-3 flex flex-col gap-1.5 border-b border-white/10">
            <div className="flex justify-between text-[11px] text-white/70">
              <span>Volume des effets</span>
              <span className="font-mono text-emerald-300">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-white/10 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sound Presets Tester */}
          <div className="pt-2 flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">
              Tester les effets en direct
            </span>

            <div className="flex flex-col gap-1 max-h-56 overflow-y-auto pr-1">
              {soundPresets.map((snd) => (
                <button
                  key={snd.type}
                  type="button"
                  onClick={() => playXboxSound(snd.type)}
                  onMouseEnter={() => playXboxSound('hover')}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-white/10 transition-all text-left cursor-pointer border border-transparent hover:border-emerald-400/30"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-emerald-500/30 group-hover:text-emerald-300 text-[10px] font-bold flex items-center justify-center text-white/70 transition-colors">
                      {snd.buttonCode}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white group-hover:text-emerald-300 transition-colors">
                        {snd.label}
                      </span>
                      <span className="text-[10px] text-white/50">{snd.desc}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
