import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Archive, 
  File, 
  Eye, 
  Download, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Lock,
  Calendar,
  HardDrive,
  Folder
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export interface PerspectiveFileItem {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'doc' | 'sheet' | 'zip' | 'audio' | 'video' | 'folder';
  size: string;
  updatedAt: string;
  url?: string;
  description?: string;
  securityLevel?: string;
}

interface FolderPerspectiveDocumentListProps {
  files: PerspectiveFileItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenDoc: (file: PerspectiveFileItem) => void;
  className?: string;
}

const getFileTypeDetails = (type: string) => {
  switch (type) {
    case 'pdf':
      return {
        badge: 'PDF',
        accent: '#f43f5e',
        border: 'border-rose-500/50 hover:border-rose-400',
        activeGlow: 'shadow-[0_0_35px_rgba(244,63,94,0.5),inset_0_0_15px_rgba(244,63,94,0.2)]',
        bg: 'bg-rose-500/15',
        text: 'text-rose-400',
        gradient: 'from-rose-500/20 via-rose-950/40 to-[#05080a]',
        icon: FileText
      };
    case 'doc':
      return {
        badge: 'DOCX',
        accent: '#38bdf8',
        border: 'border-sky-500/50 hover:border-sky-400',
        activeGlow: 'shadow-[0_0_35px_rgba(56,189,248,0.5),inset_0_0_15px_rgba(56,189,248,0.2)]',
        bg: 'bg-sky-500/15',
        text: 'text-sky-400',
        gradient: 'from-sky-500/20 via-sky-950/40 to-[#05080a]',
        icon: FileText
      };
    case 'sheet':
      return {
        badge: 'XLSX',
        accent: '#22c55e',
        border: 'border-emerald-500/50 hover:border-emerald-400',
        activeGlow: 'shadow-[0_0_35px_rgba(34,197,94,0.5),inset_0_0_15px_rgba(34,197,94,0.2)]',
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-400',
        gradient: 'from-emerald-500/20 via-emerald-950/40 to-[#05080a]',
        icon: FileSpreadsheet
      };
    case 'image':
      return {
        badge: 'IMG',
        accent: '#2dd4bf',
        border: 'border-teal-500/50 hover:border-teal-400',
        activeGlow: 'shadow-[0_0_35px_rgba(45,212,191,0.5),inset_0_0_15px_rgba(45,212,191,0.2)]',
        bg: 'bg-teal-500/15',
        text: 'text-teal-400',
        gradient: 'from-teal-500/20 via-teal-950/40 to-[#05080a]',
        icon: ImageIcon
      };
    case 'video':
      return {
        badge: 'MP4',
        accent: '#a855f7',
        border: 'border-purple-500/50 hover:border-purple-400',
        activeGlow: 'shadow-[0_0_35px_rgba(168,85,247,0.5),inset_0_0_15px_rgba(168,85,247,0.2)]',
        bg: 'bg-purple-500/15',
        text: 'text-purple-400',
        gradient: 'from-purple-500/20 via-purple-950/40 to-[#05080a]',
        icon: Video
      };
    case 'audio':
      return {
        badge: 'AUDIO',
        accent: '#fb923c',
        border: 'border-orange-500/50 hover:border-orange-400',
        activeGlow: 'shadow-[0_0_35px_rgba(251,146,60,0.5),inset_0_0_15px_rgba(251,146,60,0.2)]',
        bg: 'bg-orange-500/15',
        text: 'text-orange-400',
        gradient: 'from-orange-500/20 via-orange-950/40 to-[#05080a]',
        icon: Music
      };
    case 'zip':
      return {
        badge: 'ZIP',
        accent: '#f59e0b',
        border: 'border-amber-500/50 hover:border-amber-400',
        activeGlow: 'shadow-[0_0_35px_rgba(245,158,11,0.5),inset_0_0_15px_rgba(245,158,11,0.2)]',
        bg: 'bg-amber-500/15',
        text: 'text-amber-400',
        gradient: 'from-amber-500/20 via-amber-950/40 to-[#05080a]',
        icon: Archive
      };
    case 'folder':
      return {
        badge: 'DOSSIER',
        accent: '#10b981',
        border: 'border-emerald-500/50 hover:border-emerald-400',
        activeGlow: 'shadow-[0_0_35px_rgba(16,185,129,0.5),inset_0_0_15px_rgba(16,185,129,0.2)]',
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-400',
        gradient: 'from-emerald-500/20 via-emerald-950/40 to-[#05080a]',
        icon: Folder
      };
    default:
      return {
        badge: 'DOC',
        accent: '#22d3ee',
        border: 'border-cyan-500/50 hover:border-cyan-400',
        activeGlow: 'shadow-[0_0_35px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(34,211,238,0.2)]',
        bg: 'bg-cyan-500/15',
        text: 'text-cyan-400',
        gradient: 'from-cyan-500/20 via-cyan-950/40 to-[#05080a]',
        icon: File
      };
  }
};

export function FolderPerspectiveDocumentList({
  files,
  activeIndex,
  onSelectIndex,
  onOpenDoc,
  className = ''
}: FolderPerspectiveDocumentListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIndex < files.length - 1) {
          playXboxSound('scroll');
          onSelectIndex(activeIndex + 1);
        } else {
          playXboxSound('boundary');
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIndex > 0) {
          playXboxSound('scroll');
          onSelectIndex(activeIndex - 1);
        } else {
          playXboxSound('boundary');
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (files[activeIndex]) {
          playXboxSound('modalOpen');
          onOpenDoc(files[activeIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, files, onSelectIndex, onOpenDoc]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      playXboxSound('scroll');
      onSelectIndex(activeIndex - 1);
    } else {
      playXboxSound('boundary');
    }
  }, [activeIndex, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex < files.length - 1) {
      playXboxSound('scroll');
      onSelectIndex(activeIndex + 1);
    } else {
      playXboxSound('boundary');
    }
  }, [activeIndex, files.length, onSelectIndex]);

  // Wheel interaction
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) > 20) {
      if (delta > 0) {
        if (activeIndex < files.length - 1) {
          playXboxSound('scroll');
          onSelectIndex(activeIndex + 1);
        } else {
          playXboxSound('boundary');
        }
      } else {
        if (activeIndex > 0) {
          playXboxSound('scroll');
          onSelectIndex(activeIndex - 1);
        } else {
          playXboxSound('boundary');
        }
      }
    }
  };

  if (!files || files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-72 text-white/50">
        <File className="w-12 h-12 text-white/20 mb-3" />
        <p className="text-sm font-tech">Aucun document dans ce dossier.</p>
      </div>
    );
  }

  const currentActiveFile = files[activeIndex] || files[0];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center select-none pt-8 md:pt-12 pb-4 overflow-visible ${className}`}
      onWheel={handleWheel}
      style={{ minHeight: '560px' }}
    >
      {/* 3D Symmetric Perspective Stage with center vanishing point */}
      <div 
        className="relative w-full h-[500px] flex items-center justify-center px-4 md:px-8 mt-4 md:mt-8 overflow-visible"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Symmetric 3D Rails along the Z-Depth Axis from Center */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
          {files.map((file, idx) => {
            const offset = idx - activeIndex;
            const isLeft = offset < 0;
            const isCurrent = offset === 0;
            const isRight = offset > 0;
            const k = Math.abs(offset);
            const isHovered = hoveredIndex === idx;

            // Rigorous 3D Symmetric Z-Axis Geometry:
            // - Vanishing point is at 50% 50% (main center).
            // - Center card is the largest, facing forward (rotateY 0°), elevated to +60px Z.
            // - Right wing cards: translate X > 0, translate Z < 0, rotated at -30° inward.
            // - Left wing cards: translate X < 0, translate Z < 0, rotated at +30° inward.
            let transform3D = '';
            let opacity = 1;
            let isVisible = true;

            // Spacing constants for natural non-overlapping perspective spacing
            const stepX = 195;
            const stepZ = 135;
            const baseAngle = 30;

            if (isCurrent) {
              // Active Center Card: Max prominence, facing user directly
              transform3D = `translate3d(calc(-50% + 0px), -50%, 60px) rotateY(0deg) scale(1.14)`;
              opacity = 1;
            } else if (isRight) {
              // Right Wing: Cards receding in distance to the right
              const tx = 180 + (k - 1) * stepX;
              const tz = - (k * stepZ);
              const ry = - baseAngle;
              const scale = Math.max(0.70, 1 - k * 0.045);
              
              transform3D = `translate3d(calc(-50% + ${tx}px), -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
              opacity = Math.max(0.60, 1 - k * 0.05);

              if (k > 10) isVisible = false; // Viewport culling
            } else if (isLeft) {
              // Left Wing: Cards receding in distance to the left
              const tx = - (180 + (k - 1) * stepX);
              const tz = - (k * stepZ);
              const ry = baseAngle;
              const scale = Math.max(0.70, 1 - k * 0.045);
              
              transform3D = `translate3d(calc(-50% + ${tx}px), -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
              opacity = Math.max(0.60, 1 - k * 0.05);

              if (k > 10) isVisible = false; // Viewport culling
            }

            if (!isVisible) return null;

            // Dynamic Z-Index elevation: Hovered card gets highest priority (80), Active card (60)
            const zIndex = isHovered ? 80 : (isCurrent ? 60 : 50 - k);

            const theme = getFileTypeDetails(file.type);
            const IconComponent = theme.icon;

            return (
              <div
                key={file.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCurrent) {
                    playXboxSound('scroll');
                    onSelectIndex(idx);
                  } else {
                    playXboxSound('modalOpen');
                    onOpenDoc(file);
                  }
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  playXboxSound('modalOpen');
                  onOpenDoc(file);
                }}
                className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer origin-center group pointer-events-auto ${
                  isCurrent ? 'cursor-pointer' : 'hover:brightness-125 hover:scale-[1.03]'
                }`}
                style={{
                  transform: transform3D,
                  opacity,
                  filter: 'none', // Strictly unblurred for maximum legibility
                  zIndex,
                  width: '230px',
                  height: '270px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main Card Glass Tile */}
                <div 
                  className={`w-full h-full rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl border transition-all duration-300 ${
                    isCurrent 
                      ? `${theme.border} ${theme.activeGlow} bg-gradient-to-b from-[#0a2329]/95 via-[#061418]/98 to-[#020709]/100` 
                      : `border-white/12 hover:border-emerald-400/60 bg-gradient-to-b from-[#0c181f]/90 via-[#060e13]/95 to-[#030608]/98 shadow-[0_16px_36px_rgba(0,0,0,0.8)]`
                  }`}
                >
                  {/* Subtle Top Ambient Specular Light */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

                  {/* Top Header: File Badge & Format */}
                  <div className="flex items-center justify-between z-10">
                    <span className={`px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-urban font-bold tracking-wider ${theme.text} uppercase`}>
                      {theme.badge}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-white/45 font-tech">
                      <span>{file.size}</span>
                    </div>
                  </div>

                  {/* Centered Large Icon & Visual Emblem */}
                  <div className="flex flex-col items-center justify-center my-auto z-10 py-1">
                    {file.url ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.6)] relative">
                        <img 
                          src={file.url} 
                          alt={file.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div 
                        className={`w-18 h-18 rounded-2xl flex items-center justify-center border border-white/15 ${theme.bg} ${theme.text} transition-transform duration-300 group-hover:scale-105`}
                        style={{
                          boxShadow: `0 0 25px ${theme.accent}35`
                        }}
                      >
                        <IconComponent className="w-9 h-9" />
                      </div>
                    )}
                  </div>

                  {/* Card Title and Metadata */}
                  <div className="z-10 flex flex-col items-center text-center gap-0.5 mt-auto">
                    <h3 className="text-base font-tech font-bold text-white tracking-wide truncate max-w-[200px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {file.name}
                    </h3>
                    <span className="text-[11px] text-white/45 font-tech truncate max-w-[190px]">
                      {file.updatedAt}
                    </span>
                  </div>

                  {/* Bottom Luminous Curved Neon Wave (Exactly matching reference screenshot) */}
                  <svg 
                    className="absolute bottom-0 left-0 right-0 w-full h-14 pointer-events-none z-0" 
                    viewBox="0 0 200 50" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id={`grad-wave-${file.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={theme.accent} stopOpacity={isCurrent ? "0.45" : "0.28"} />
                        <stop offset="100%" stopColor={theme.accent} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 50 Q 55 18, 120 32 T 200 12 L 200 50 Z" 
                      fill={`url(#grad-wave-${file.id})`} 
                    />
                    <path 
                      d="M0 50 Q 55 18, 120 32 T 200 12" 
                      fill="none" 
                      stroke={theme.accent} 
                      strokeWidth={isCurrent ? "2" : "1.5"} 
                      className="opacity-90"
                      style={{
                        filter: `drop-shadow(0 0 6px ${theme.accent})`
                      }}
                    />
                  </svg>
                </div>

                {/* Mirror Reflection on the Dark Glossy Floor (Directly underneath) */}
                <div 
                  className="absolute -bottom-[265px] left-0 right-0 h-[260px] pointer-events-none origin-top overflow-hidden transition-all duration-300"
                  style={{
                    transform: 'scaleY(-1)',
                    maskImage: 'linear-gradient(to top, transparent 35%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.65) 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 35%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.65) 100%)',
                    opacity: isCurrent ? 0.65 : 0.45
                  }}
                >
                  <div 
                    className={`w-full h-full rounded-2xl p-5 flex flex-col justify-between relative border ${
                      isCurrent 
                        ? `${theme.border} bg-gradient-to-b from-[#0a2329] to-[#020709]` 
                        : 'border-white/10 bg-gradient-to-b from-[#0c181f] to-[#030608]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-ai-mono ${theme.text}`}>
                        {theme.badge}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto py-1">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 ${theme.bg} ${theme.text}`}>
                        <IconComponent className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs font-tech font-bold text-white/80 truncate max-w-[180px]">
                        {file.name}
                      </span>
                    </div>

                    {/* Bottom wave in reflection */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-10"
                      style={{
                        background: `radial-gradient(ellipse at 50% 100%, ${theme.accent}50, transparent 70%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrub Navigation Bar / Quick Document Index Tracker & Direct Actions */}
      <div className="w-full max-w-4xl px-8 flex items-center justify-between mt-6 z-30">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {files.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                playXboxSound('scroll');
                onSelectIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex 
                  ? 'w-10 bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]' 
                  : 'w-2.5 bg-white/20 hover:bg-white/45'
              }`}
              title={f.name}
            />
          ))}
        </div>

        {/* Action Controls for Selected Active Card */}
        {currentActiveFile && (
          <div className="flex items-center gap-2.5 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => {
                playXboxSound('modalOpen');
                onOpenDoc(currentActiveFile);
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-tech font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>OUVRIR</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const link = document.createElement('a');
                link.href = currentActiveFile.url || '#';
                link.download = currentActiveFile.name;
                link.click();
              }}
              className="p-1.5 rounded-xl bg-transparent hover:bg-white/15 border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Télécharger"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="p-1.5 rounded-xl bg-transparent hover:bg-white/15 border border-white/15 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Partager le document"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2.5 text-xs text-white/50 font-ai-mono">
          <span>{activeIndex + 1} / {files.length}</span>
          <span className="text-white/30">•</span>
          <span className="font-tech font-semibold text-white/80 truncate max-w-[140px]">{currentActiveFile?.name}</span>
        </div>
      </div>
    </div>
  );
}
