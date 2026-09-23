"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  ArrowLeft,
  CalendarDays,
  Megaphone,
  Newspaper
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { EventsSection } from '../events/EventsSection';

export function CalendrierPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-y-auto py-4 sm:py-6 lg:py-8 bg-[#070e17] text-white flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playXboxSound('back');
              navigate('/');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Retour à l'accueil Intranet"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CalendarDays className="w-4 h-4" />
              <span>AGENDA & PLANNING • PLANIFIER & SYNCHRONISER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Agenda & Événements d'Entreprise
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Information temporelle et événementielle : réunions, formations, conférences et échéances.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playXboxSound('select');
              navigate('/informations/agenda');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span>Tous les événements</span>
          </button>
        </div>
      </div>

      {/* ── SECTION PÉDAGOGIQUE DES 3 APPLICATIONS DE DIFFUSION ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
        <button 
          onClick={() => { playXboxSound('select'); navigate('/actualites'); }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 transition-colors text-left group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300 group-hover:bg-sky-500/30">
            <Newspaper className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
              <span>📰 Actualités & Publications</span>
            </div>
            <p className="text-slate-400 text-[11px]">Informer & expliquer • Information durable</p>
          </div>
        </button>

        <button 
          onClick={() => { playXboxSound('select'); navigate('/annonces'); }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 transition-colors text-left group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300 group-hover:bg-teal-500/30">
            <Megaphone className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
              <span>📢 Annonces & Flash Info</span>
            </div>
            <p className="text-slate-400 text-[11px]">Avertir & cibler • Information immédiate</p>
          </div>
        </button>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>📅 Agenda & Événements</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-normal">Page active</span>
            </div>
            <p className="text-slate-400 text-[11px]">Planifier & synchroniser • Dimension temporelle</p>
          </div>
        </div>
      </div>

      {/* ── RESPONSIVE EVENTS SECTION ── */}
      <div className="w-full flex-1">
        <EventsSection showTitle={false} />
      </div>
    </div>
  );
}
