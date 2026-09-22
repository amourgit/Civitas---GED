"use client";

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  HelpCircle, 
  Settings, 
  ChevronDown, 
  Plus, 
  PieChart
} from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

interface CalendarHeaderProps {
  currentMonthLabel: string;
  viewMode: 'Day' | 'Week' | 'Month';
  onViewModeChange: (mode: 'Day' | 'Week' | 'Month') => void;
  showInsights: boolean;
  onToggleInsights: () => void;
  onCreateEvent: () => void;
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function CalendarHeader({
  currentMonthLabel,
  viewMode,
  onViewModeChange,
  showInsights,
  onToggleInsights,
  onCreateEvent,
  onToday,
  onPrev,
  onNext,
}: CalendarHeaderProps) {
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

  return (
    <header className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-2 py-3 bg-transparent shrink-0 border-b border-white/5">
      {/* LEFT SECTION: Create Button & Navigation Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Create Event Button */}
        <button
          type="button"
          onClick={() => {
            playXboxSound('select');
            onCreateEvent();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-teal-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Créer</span>
        </button>

        {/* Today Navigation Button */}
        <button
          type="button"
          onClick={() => {
            playXboxSound('select');
            onToday();
          }}
          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
        >
          Aujourd'hui
        </button>

        {/* Previous / Next Arrows */}
        <div className="flex items-center gap-0.5 bg-white/5 p-0.5 rounded-xl">
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              onPrev();
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Précédent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              onNext();
            }}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Suivant"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Month Title */}
        <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight ml-1 capitalize">
          {currentMonthLabel}
        </h2>
      </div>

      {/* RIGHT SECTION: Search, View Switcher & Insights Toggle */}
      <div className="flex items-center gap-2 justify-end">
        {/* Quick Search */}
        <button
          type="button"
          onClick={() => playXboxSound('select')}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Rechercher"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Help */}
        <button
          type="button"
          onClick={() => playXboxSound('select')}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Aide & Raccourcis"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={() => playXboxSound('select')}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Paramètres du calendrier"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* View Switcher Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setIsViewDropdownOpen((prev) => !prev);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
          >
            <span>{viewMode === 'Week' ? 'Semaine' : viewMode === 'Day' ? 'Jour' : 'Mois'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isViewDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsViewDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-0.5 text-xs">
                {(['Day', 'Week', 'Month'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      playXboxSound('select');
                      onViewModeChange(mode);
                      setIsViewDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                      viewMode === mode
                        ? 'bg-teal-500/20 text-teal-300 font-bold'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {mode === 'Week' ? 'Semaine' : mode === 'Day' ? 'Jour' : 'Mois'}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Toggle Time Insights Panel */}
        <button
          type="button"
          onClick={() => {
            playXboxSound('select');
            onToggleInsights();
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            showInsights
              ? 'bg-teal-500/20 text-teal-300 shadow-md shadow-teal-500/10'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
          title="Afficher/Masquer Time Insights"
        >
          <PieChart className="w-4 h-4 text-teal-400" />
          <span className="hidden md:inline">Time Insights</span>
        </button>
      </div>
    </header>
  );
}
