"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  Sparkles,
  ArrowLeft,
  CalendarDays,
  Bell,
  CheckCircle2,
  Megaphone,
  Newspaper
} from 'lucide-react';
import { motion } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';

interface EventItem {
  id: string;
  title: string;
  category: 'Direction' | 'Technique' | 'RH' | 'Formation';
  startTime: string;
  endTime: string;
  location: string;
  participants: string[];
  isOnline?: boolean;
  accent: string;
}

const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 'e1',
    title: 'Comité de Direction Hebdomadaire (CODIR)',
    category: 'Direction',
    startTime: '09:00',
    endTime: '10:30',
    location: 'Salle de Conseil A - Étage 4',
    participants: ['Amour Samuel NZILA', 'Direction Générale', 'Responsables Métiers'],
    accent: '#0ea5e9',
  },
  {
    id: 'e2',
    title: 'Revue d’audit archivistique & numérisation GED',
    category: 'Technique',
    startTime: '11:15',
    endTime: '12:30',
    location: 'Salle Archives S-01',
    participants: ['Équipe GED', 'Auditeurs Externes'],
    accent: '#22c55e',
  },
  {
    id: 'e3',
    title: 'Point d’avancement Déploiement Intranet EGEN',
    category: 'Technique',
    startTime: '14:00',
    endTime: '15:15',
    location: 'Teams / Visioconférence',
    participants: ['Lead Dev', 'Architecture Cloud'],
    isOnline: true,
    accent: '#a855f7',
  },
  {
    id: 'e4',
    title: 'Session d’accueil des nouveaux collaborateurs',
    category: 'RH',
    startTime: '16:00',
    endTime: '17:00',
    location: 'Auditorium Principal',
    participants: ['Ressources Humaines', 'Promo Septembre'],
    accent: '#f59e0b',
  },
];

export function CalendrierPage() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(19);

  const days = [
    { num: 15, name: 'Lun', hasEvent: true },
    { num: 16, name: 'Mar', hasEvent: true },
    { num: 17, name: 'Mer', hasEvent: false },
    { num: 18, name: 'Jeu', hasEvent: true },
    { num: 19, name: 'Ven', isToday: true, hasEvent: true },
    { num: 20, name: 'Sam', hasEvent: false },
    { num: 21, name: 'Dim', hasEvent: false },
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070e17] text-white flex flex-col gap-6">
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
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400">
              <CalendarDays className="w-4 h-4" />
              <span>AGENDA & PLANNING • PLANIFIER & SYNCHRONISER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Agenda & Planning d'Entreprise
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Information temporelle et événementielle : réunions, formations, conférences, cérémonies et échéances.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => playXboxSound('select')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span>Nouvel Événement</span>
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
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
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
              <span>📢 Annonces</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </div>
            <p className="text-slate-400 text-[11px]">Avertir & cibler • Information immédiate et ciblée</p>
          </div>
        </button>

        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
            <CalendarDays className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>📅 Agenda</span>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded font-normal">Page active</span>
            </div>
            <p className="text-slate-400 text-[11px]">Planifier & synchroniser • Dimension temporelle</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Mini Calendar / Days strip & Events list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column: Calendar Strip and Rooms */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          {/* Week Strip */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-base">Septembre 2026</h2>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((d) => {
                const isSelected = selectedDay === d.num;
                return (
                  <button
                    key={d.num}
                    onClick={() => {
                      playXboxSound('hover');
                      setSelectedDay(d.num);
                    }}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/30' 
                        : d.isToday
                          ? 'bg-white/15 text-sky-400 border border-sky-400/40'
                          : 'bg-white/[0.03] hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono">{d.name}</span>
                    <span className="text-base font-bold mt-0.5">{d.num}</span>
                    {d.hasEvent && !isSelected && (
                      <span className="w-1 h-1 rounded-full bg-sky-400 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salles Disponibles */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col gap-3">
            <h2 className="font-bold text-white text-sm flex items-center justify-between">
              <span>Salles de réunion & Espaces</span>
              <span className="text-xs font-mono text-emerald-400">4 libres</span>
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Salle du Conseil A</div>
                  <div className="text-slate-400 text-[11px]">Étage 4 • Capacité 24 pers.</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-mono">Occupée</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Salle Polyvalente B</div>
                  <div className="text-slate-400 text-[11px]">Rez-de-chaussée • Capacité 15 pers.</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">Libre</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Espace Créatif Lab</div>
                  <div className="text-slate-400 text-[11px]">Niveau 2 • Capacité 8 pers.</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">Libre</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Events of the selected day */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Programme du Vendredi {selectedDay} Septembre 2026</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {SAMPLE_EVENTS.length} événements
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {SAMPLE_EVENTS.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-black/50 border border-white/10 hover:border-white/20 transition-all backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-1.5 self-stretch rounded-full shrink-0" 
                    style={{ backgroundColor: event.accent }}
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold"
                        style={{ backgroundColor: `${event.accent}20`, color: event.accent }}
                      >
                        {event.category}
                      </span>
                      {event.isOnline && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md">
                          <Video className="w-3 h-3" />
                          En Ligne
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-white group-hover:text-sky-300 transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-sky-400" />
                        {event.startTime} - {event.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {event.participants.length} participants
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => playXboxSound('select')}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    Détails & Visio
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
