'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, Search, Zap, Cpu, Check } from 'lucide-react';
import { AssistantMode, ASSISTANT_MODES, AssistantModeConfig } from './assistantModes';
import { playXboxSound } from '../../utils/xboxAudio';
import { WaterGlassModal } from '../ui/WaterGlassModal';

interface AssistantRobotButtonProps {
  currentMode: AssistantMode;
  onSelectMode: (mode: AssistantMode) => void;
  isFullscreenActive: boolean;
  onToggleFullscreen: () => void;
  className?: string;
}

const BADGE_ICONS: Record<AssistantModeConfig['iconName'], React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  Search,
  Zap,
  Cpu,
};

const LONG_PRESS_DURATION = 3000; // 3 seconds

export function AssistantRobotButton({
  currentMode,
  onSelectMode,
  isFullscreenActive,
  onToggleFullscreen,
  className = '',
}: AssistantRobotButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const triggeredRef = useRef<boolean>(false);

  const modeConfig = ASSISTANT_MODES[currentMode] || ASSISTANT_MODES.conversation;
  const BadgeIcon = BADGE_ICONS[modeConfig.iconName];

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Cleanup hold timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;

    triggeredRef.current = false;
    startTimeRef.current = performance.now();
    setIsHolding(true);
    setHoldProgress(0);

    const checkProgress = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / LONG_PRESS_DURATION) * 100);
      setHoldProgress(progress);

      if (elapsed >= LONG_PRESS_DURATION) {
        triggeredRef.current = true;
        setIsHolding(false);
        setHoldProgress(0);
        setJustCompleted(true);
        setIsOpen(false);
        setTimeout(() => setJustCompleted(false), 500);

        // 3-second hold action: Toggle Fullscreen
        playXboxSound('select');
        try {
          if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate([40, 50, 40]);
          }
        } catch {
          // ignore
        }
        onToggleFullscreen();
        return;
      }

      timerRef.current = requestAnimationFrame(checkProgress);
    };

    timerRef.current = requestAnimationFrame(checkProgress);
  };

  const handlePointerUp = () => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }

    const wasTriggered = triggeredRef.current;
    setIsHolding(false);
    setHoldProgress(0);

    // If released before 3s, register as a standard click -> toggle dropdown
    if (!wasTriggered) {
      playXboxSound('toggle');
      setIsOpen((prev) => !prev);
    }
  };

  const handlePointerLeave = () => {
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const strokeDashoffset = 100 - holdProgress;

  return (
    <div ref={containerRef} className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
        onContextMenu={(e) => e.preventDefault()}
        className={`relative p-2 rounded-xl transition-all cursor-pointer border flex items-center justify-center outline-none touch-none ${
          isFullscreenActive
            ? 'bg-teal-400 text-slate-950 border-teal-300 shadow-md shadow-teal-500/25 ring-2 ring-teal-400/50'
            : isOpen
            ? 'bg-white/15 text-white border-white/30'
            : isHolding
            ? 'bg-white/15 text-white border-teal-400/60 scale-95 shadow-inner'
            : 'bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border-white/10'
        } ${justCompleted ? 'ring-4 ring-emerald-400/80 scale-110' : ''}`}
        title={`Assistant IA [${modeConfig.name}] — Clic : Modes | Maintien 3s : Plein écran 3D`}
        aria-label={`Assistant IA Mode ${modeConfig.name}`}
      >
        {/* Robot Icon */}
        <Bot className={`w-4 h-4 transition-transform duration-200 ${isHolding ? 'scale-110 text-teal-300' : ''}`} />

        {/* 3-Second Hold SVG Ring */}
        {isHolding && (
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[1px]"
            viewBox="0 0 36 36"
          >
            <path
              className="text-white/10"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-teal-400"
              strokeDasharray="100, 100"
              strokeDashoffset={strokeDashoffset}
              strokeWidth="3"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        )}

        {/* Status Badge in Top-Right Corner (like "en ligne" status) */}
        <span
          className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full ${modeConfig.color.badgeBg} ${modeConfig.color.badgeText} flex items-center justify-center ring-2 ring-slate-950 shadow-sm shadow-black/50 transition-transform duration-200 ${
            isFullscreenActive ? 'scale-110 animate-pulse' : ''
          }`}
          title={`Mode actif : ${modeConfig.name}`}
        >
          <BadgeIcon className="w-2.5 h-2.5 stroke-[2.5]" />
        </span>
      </button>

      {/* Mode Selector Dropdown - Pure Transparent Water Glassmorphism via WaterGlassModal */}
      {isOpen && (
        <WaterGlassModal
          align="right"
          width="w-56"
          optionsComponent={
            <div className="space-y-1">
              {Object.values(ASSISTANT_MODES).map((mode) => {
                const IconComponent = BADGE_ICONS[mode.iconName];
                const isSelected = currentMode === mode.id;

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      playXboxSound('select');
                      onSelectMode(mode.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2.5 transition-all duration-200 cursor-pointer border-none ${
                      isSelected
                        ? 'bg-white/[0.10] text-teal-300 font-medium shadow-sm'
                        : 'text-slate-200/90 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isSelected
                            ? `${mode.color.bg} ${mode.color.text}`
                            : 'bg-white/[0.04] text-slate-300'
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[12.5px] tracking-tight truncate">
                        {mode.name}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          }
        />
      )}
    </div>
  );
}

export default AssistantRobotButton;
