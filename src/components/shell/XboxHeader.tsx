import React, { useState, useEffect } from 'react';
import { Wifi, Search, Bell, Sparkles } from 'lucide-react';

interface XboxHeaderProps {
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
}

export function XboxHeader({
  onSearchClick,
  onNotificationClick
}: XboxHeaderProps) {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format 15:42
      setTimeStr(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      );
      // Format: Sam. 6 Sept. 2025
      const formattedDate = now.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      // Capitalize first letter
      setDateStr(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-8 pt-6 pb-2 bg-transparent z-30 select-none">
      {/* Left Spacer or Subtle Brand Accent */}
      <div className="flex items-center gap-3">
        {onSearchClick && (
          <button
            type="button"
            onClick={onSearchClick}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/20 hover:bg-black/40 border border-white/10 hover:border-emerald-400/50 text-white/70 hover:text-white transition-all text-xs cursor-pointer backdrop-blur-sm"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white/60">Rechercher...</span>
            <kbd className="text-[10px] font-mono text-white/40 bg-white/5 px-1.5 py-0.5 rounded border border-white/10 ml-2">
              Ctrl+K
            </kbd>
          </button>
        )}
      </div>

      {/* Right: Wifi + Authentic Xbox Live Clock and Date */}
      <div className="flex items-center gap-4">
        {onNotificationClick && (
          <button
            type="button"
            onClick={onNotificationClick}
            className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          </button>
        )}

        <div className="flex items-center gap-3">
          {/* Wifi Icon */}
          <Wifi className="w-4 h-4 text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />

          {/* Clock & Date */}
          <div className="flex flex-col text-right">
            <span className="text-white font-medium text-base tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {timeStr || '15:42'}
            </span>
            <span className="text-white/50 text-[11px] font-normal tracking-wide mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {dateStr || 'Sam. 6 Sept. 2025'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
