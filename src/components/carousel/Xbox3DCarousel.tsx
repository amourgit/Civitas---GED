import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Folder, File, Image as ImageIcon, Video, Music, Archive, Code, FileSpreadsheet, FileText } from 'lucide-react';
import { XboxCardItem } from './Xbox3DCard';
import { playXboxSound } from '../../utils/xboxAudio';

export interface Xbox3DCarouselProps {
  items: XboxCardItem[];
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenItem: (item: XboxCardItem) => void;
  className?: string;
}

const themeColorGradients: Record<string, { accent: string; border: string; glow: string; text: string; bg: string }> = {
  green: {
    accent: '#10b981',
    border: 'border-emerald-500/60',
    glow: 'shadow-[0_0_40px_rgba(16,185,129,0.55),inset_0_0_20px_rgba(16,185,129,0.2)]',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/15'
  },
  blue: {
    accent: '#38bdf8',
    border: 'border-sky-500/60',
    glow: 'shadow-[0_0_40px_rgba(56,189,248,0.55),inset_0_0_20px_rgba(56,189,248,0.2)]',
    text: 'text-sky-400',
    bg: 'bg-sky-500/15'
  },
  purple: {
    accent: '#a855f7',
    border: 'border-purple-500/60',
    glow: 'shadow-[0_0_40px_rgba(168,85,247,0.55),inset_0_0_20px_rgba(168,85,247,0.2)]',
    text: 'text-purple-400',
    bg: 'bg-purple-500/15'
  },
  cyan: {
    accent: '#06b6d4',
    border: 'border-cyan-500/60',
    glow: 'shadow-[0_0_40px_rgba(6,182,212,0.55),inset_0_0_20px_rgba(6,182,212,0.2)]',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/15'
  },
  teal: {
    accent: '#14b8a6',
    border: 'border-teal-500/60',
    glow: 'shadow-[0_0_40px_rgba(20,184,166,0.55),inset_0_0_20px_rgba(20,184,166,0.2)]',
    text: 'text-teal-400',
    bg: 'bg-teal-500/15'
  },
  orange: {
    accent: '#f97316',
    border: 'border-orange-500/60',
    glow: 'shadow-[0_0_40px_rgba(249,115,22,0.55),inset_0_0_20px_rgba(249,115,22,0.2)]',
    text: 'text-orange-400',
    bg: 'bg-orange-500/15'
  },
  violet: {
    accent: '#8b5cf6',
    border: 'border-violet-500/60',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.55),inset_0_0_20px_rgba(139,92,246,0.2)]',
    text: 'text-violet-400',
    bg: 'bg-violet-500/15'
  },
  amber: {
    accent: '#f59e0b',
    border: 'border-amber-500/60',
    glow: 'shadow-[0_0_40px_rgba(245,158,11,0.55),inset_0_0_20px_rgba(245,158,11,0.2)]',
    text: 'text-amber-400',
    bg: 'bg-amber-500/15'
  },
  red: {
    accent: '#f43f5e',
    border: 'border-rose-500/60',
    glow: 'shadow-[0_0_40px_rgba(244,63,94,0.55),inset_0_0_20px_rgba(244,63,94,0.2)]',
    text: 'text-rose-400',
    bg: 'bg-rose-500/15'
  }
};

export function Xbox3DCarousel({
  items,
  activeIndex,
  onSelectIndex,
  onOpenItem,
  className = ''
}: Xbox3DCarouselProps) {
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
        if (activeIndex < items.length - 1) {
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
        if (items[activeIndex]) {
          playXboxSound('folderOpen');
          onOpenItem(items[activeIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, items, onSelectIndex, onOpenItem]);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) {
      playXboxSound('scroll');
      onSelectIndex(activeIndex - 1);
    } else {
      playXboxSound('boundary');
    }
  }, [activeIndex, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex < items.length - 1) {
      playXboxSound('scroll');
      onSelectIndex(activeIndex + 1);
    } else {
      playXboxSound('boundary');
    }
  }, [activeIndex, items.length, onSelectIndex]);

  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(delta) > 20) {
      if (delta > 0) {
        if (activeIndex < items.length - 1) {
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

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/50">
        <Folder className="w-12 h-12 text-white/20 mb-3" />
        <p className="text-sm font-tech">Aucun élément à afficher.</p>
      </div>
    );
  }

  const currentItem = items[activeIndex] || items[0];

  return (
    <div 
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center select-none pt-8 md:pt-12 pb-4 overflow-visible ${className}`}
      onWheel={handleWheel}
      style={{ minHeight: '560px' }}
    >
      {/* 3D Realistic Perspective Stage with center vanishing point */}
      <div 
        className="relative w-full h-[500px] flex items-center justify-center px-4 md:px-8 mt-4 md:mt-8 overflow-visible"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Symmetric 3D Cards Rail along the Z-Depth Axis from Center */}
        <div className="relative w-full h-full flex items-center justify-center overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
          {items.map((item, idx) => {
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

            const themeKey = item.themeColor || 'green';
            const theme = themeColorGradients[themeKey] || themeColorGradients.green;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCurrent) {
                    playXboxSound('scroll');
                    onSelectIndex(idx);
                  } else {
                    playXboxSound('folderOpen');
                    onOpenItem(item);
                  }
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  playXboxSound('folderOpen');
                  onOpenItem(item);
                }}
                className={`absolute left-1/2 top-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer origin-center group pointer-events-auto ${
                  isCurrent ? 'cursor-pointer' : 'hover:brightness-125 hover:scale-[1.03]'
                }`}
                style={{
                  transform: transform3D,
                  opacity,
                  filter: 'none', // Strictly unblurred for absolute clarity
                  zIndex,
                  width: '230px',
                  height: '270px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main Card Frosted Glass Body */}
                <div 
                  className={`w-full h-full rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl border transition-all duration-300 ${
                    isCurrent 
                      ? `${theme.border} ${theme.glow} bg-gradient-to-b from-[#0b252c]/95 via-[#061519]/98 to-[#020709]/100` 
                      : 'border-white/12 hover:border-white/25 bg-gradient-to-b from-[#0c181f]/90 via-[#060e13]/95 to-[#030608]/98 shadow-[0_16px_36px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {/* Top Gloss Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between z-10">
                    <span className={`px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-urban font-bold tracking-wider ${theme.text} uppercase`}>
                      {item.badge || (item.type === 'folder' ? 'DOSSIER' : 'DOC')}
                    </span>
                    {item.subtitle && (
                      <span className="text-[11px] text-white/45 font-tech truncate max-w-[120px]">
                        {item.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Centered Emblem Icon */}
                  <div className="flex flex-col items-center justify-center my-auto z-10 py-1">
                    {item.coverImage ? (
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                        <img 
                          src={item.coverImage} 
                          alt={item.title} 
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
                        {item.customIcon || (
                          <Folder className="w-10 h-10" strokeWidth={1.75} />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="z-10 flex flex-col items-center text-center gap-0.5 mt-auto">
                    <h3 className="text-base font-tech font-bold text-white tracking-wide truncate max-w-[200px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Luminous Wave */}
                  <svg 
                    className="absolute bottom-0 left-0 right-0 w-full h-16 pointer-events-none z-0" 
                    viewBox="0 0 200 50" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id={`carousel-wave-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={theme.accent} stopOpacity={isCurrent ? "0.45" : "0.25"} />
                        <stop offset="100%" stopColor={theme.accent} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 50 Q 55 18, 120 32 T 200 12 L 200 50 Z" 
                      fill={`url(#carousel-wave-${item.id})`} 
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

                {/* Mirror Reflection on the Floor */}
                <div 
                  className="absolute -bottom-[265px] left-0 right-0 h-[260px] pointer-events-none origin-top overflow-hidden transition-all duration-300"
                  style={{
                    transform: 'scaleY(-1)',
                    maskImage: 'linear-gradient(to top, transparent 40%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.6) 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 40%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0.6) 100%)',
                    opacity: isCurrent ? 0.65 : 0.4
                  }}
                >
                  <div 
                    className={`w-full h-full rounded-3xl p-5 flex flex-col justify-between relative border ${
                      isCurrent 
                        ? `${theme.border} bg-gradient-to-b from-[#0b252c] to-[#020709]` 
                        : 'border-white/10 bg-gradient-to-b from-[#0c181f] to-[#030608]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-urban ${theme.text}`}>
                        {item.badge || 'DOSSIER'}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center my-auto py-1">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 ${theme.bg} ${theme.text}`}>
                        {item.customIcon || <Folder className="w-8 h-8" />}
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <span className="text-sm font-tech font-bold text-white/80 truncate max-w-[180px]">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Index Navigation Bar */}
      <div className="w-full max-w-4xl px-8 flex items-center justify-between mt-6 z-30">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {items.map((it, i) => (
            <button
              key={it.id}
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
              title={it.title}
            />
          ))}
        </div>

        <div className="flex items-center gap-2.5 text-xs text-white/50 font-tech">
          <span>{activeIndex + 1} / {items.length}</span>
          <span className="text-white/30">•</span>
          <span className="font-semibold text-white/80 truncate max-w-[160px]">{currentItem?.title}</span>
        </div>
      </div>
    </div>
  );
}

