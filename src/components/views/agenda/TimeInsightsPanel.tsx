"use client";

import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  HelpCircle, 
  Edit, 
  Info
} from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

interface TimeInsightsPanelProps {
  onClose: () => void;
}

export function TimeInsightsPanel({ onClose }: TimeInsightsPanelProps) {
  const [breakdownMode, setBreakdownMode] = useState<'type' | 'color'>('color');

  const categories = [
    { name: 'Important', hours: '2 hr', color: 'bg-orange-500', hex: '#f97316' },
    { name: 'Personal', hours: '5 hr', color: 'bg-emerald-500', hex: '#10b981' },
    { name: 'Strategy 2022', hours: '2 hr', color: 'bg-purple-500', hex: '#a855f7' },
    { name: 'Other', hours: '15 hr', color: 'bg-cyan-500', hex: '#06b6d4' },
    { name: 'Remaining', hours: '4.5 hr', color: 'bg-slate-400', hex: '#94a3b8' },
  ];

  const meetingStats = [
    { period: 'Dec 31 - Jan 4', hours: '14h', value: 65 },
    { period: 'Jan 6 - 10', hours: '22h', value: 95 },
    { period: 'Jan 13 - 17', hours: '6.5h', value: 30 },
  ];

  return (
    <aside className="w-72 sm:w-80 h-full bg-transparent border-l border-white/5 p-4 space-y-5 overflow-y-auto no-scrollbar shrink-0 text-white text-xs">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            20 - 24 JANVIER
          </span>
          <h3 className="text-base font-bold text-white flex items-center gap-1.5 mt-0.5">
            <span>Time Insights</span>
            <Lock className="w-3.5 h-3.5 text-teal-400" />
          </h3>
        </div>

        <button
          type="button"
          onClick={() => {
            playXboxSound('back');
            onClose();
          }}
          className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Fermer le panneau"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* TIME BREAKDOWN SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-300 font-bold">
            <span>Répartition du temps</span>
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" />
          </div>
          <button
            type="button"
            onClick={() => playXboxSound('select')}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MODE TOGGLE BUTTONS */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5">
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setBreakdownMode('type');
            }}
            className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              breakdownMode === 'type'
                ? 'bg-teal-500/20 text-teal-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Par type
          </button>
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setBreakdownMode('color');
            }}
            className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              breakdownMode === 'color'
                ? 'bg-teal-500/20 text-teal-300 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Par couleur
          </button>
        </div>

        {/* DONUT CHART (SVG) */}
        <div className="flex justify-center py-2">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Ring Background */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="14"
              />
              {/* Donut Segments */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="14"
                strokeDasharray="125 113.8"
                strokeDashoffset="0"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#10b981"
                strokeWidth="14"
                strokeDasharray="41 197.8"
                strokeDashoffset="-125"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="14"
                strokeDasharray="36 202.8"
                strokeDashoffset="-166"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#a855f7"
                strokeWidth="14"
                strokeDasharray="18 220.8"
                strokeDashoffset="-202"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#f97316"
                strokeWidth="14"
                strokeDasharray="18 220.8"
                strokeDashoffset="-220"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-base font-extrabold text-white">28.5h</span>
              <span className="text-[10px] text-slate-400 block">Total</span>
            </div>
          </div>
        </div>

        {/* CATEGORIES LEGEND LIST */}
        <div className="space-y-1.5 pt-2 border-t border-white/5">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color} shrink-0`} />
                <span className="text-slate-300 font-medium">{cat.name}</span>
              </div>
              <span className="font-bold text-white">{cat.hours}</span>
            </div>
          ))}
        </div>

        {/* ADJUST WORKING HOURS BUTTON */}
        <button
          type="button"
          onClick={() => playXboxSound('select')}
          className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 transition-colors cursor-pointer text-center"
        >
          Ajuster les heures de travail
        </button>
      </div>

      {/* TIME IN MEETINGS SECTION */}
      <div className="space-y-3 pt-3 border-t border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold">
            <span>Temps en réunion</span>
            <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-white/3 p-3 rounded-2xl">
          <div>
            <span className="text-[10px] text-slate-400 block">Plus de réunions</span>
            <span className="text-xs font-bold text-teal-300">Mardi</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">Moyenne quotidienne</span>
            <span className="text-xs font-bold text-white">4.3h</span>
          </div>
        </div>

        {/* BAR CHART FOR WEEKS */}
        <div className="space-y-2">
          {meetingStats.map((stat) => (
            <div key={stat.period} className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>{stat.period}</span>
                <span className="font-bold text-teal-300">{stat.hours}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
