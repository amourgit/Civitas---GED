"use client";

import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Video, 
  Trash2, 
  Clock, 
  Tag 
} from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

export interface CalendarEvent {
  id: string;
  title: string;
  dayIndex: number; // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri
  startHour: number; // e.g. 9.0 for 9:00 AM, 9.5 for 9:30 AM
  durationHours: number; // e.g. 1.0 for 1 hour
  color: 'blue' | 'green' | 'orange' | 'purple' | 'slate';
  category?: string;
  location?: string;
  icon?: string;
}

interface EventDetailPopoverProps {
  event: CalendarEvent;
  position: { x: number; y: number };
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function EventDetailPopover({
  event,
  position,
  onClose,
  onDelete,
}: EventDetailPopoverProps) {
  const [responseStatus, setResponseStatus] = useState<string>('yes');
  const [selectedTag, setSelectedTag] = useState<string>(event.category || 'Personal');

  const tags = [
    { name: 'Important', color: 'bg-orange-500' },
    { name: 'Personal', color: 'bg-emerald-500' },
    { name: 'Strategy 2022', color: 'bg-purple-500' },
    { name: 'Other', color: 'bg-cyan-500' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Popover Card */}
      <div
        className="fixed z-50 w-76 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl space-y-3.5 text-white text-xs animate-in fade-in zoom-in-95 duration-150"
        style={{
          left: `${Math.min(Math.max(position.x - 150, 20), window.innerWidth - 320)}px`,
          top: `${Math.min(Math.max(position.y + 10, 20), window.innerHeight - 420)}px`,
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2.5">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-teal-400">
              Détails de la Réunion
            </span>
            <h3 className="text-sm font-extrabold text-white mt-0.5">
              {event.title}
            </h3>
            <p className="text-[11px] text-slate-300 mt-0.5 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>
                {Math.floor(event.startHour)}:{event.startHour % 1 === 0.5 ? '30' : '00'} - {Math.floor(event.startHour + event.durationHours)}:{(event.startHour + event.durationHours) % 1 === 0.5 ? '30' : '00'}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playXboxSound('back');
              onClose();
            }}
            className="p-1 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* GOING STATUS */}
        <div className="space-y-1.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Participation ? (GOING?)
          </p>

          <div className="space-y-1">
            {[
              { id: 'yes', label: 'Oui (Yes)' },
              { id: 'room', label: 'Oui, en salle de réunion' },
              { id: 'virtual', label: 'Oui, en visioconférence' },
              { id: 'no', label: 'Non (No)' },
              { id: 'maybe', label: 'Peut-être (Maybe)' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setResponseStatus(opt.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                  responseStatus === opt.id
                    ? 'bg-teal-500/20 text-teal-300 font-bold'
                    : 'bg-white/3 text-slate-300 hover:bg-white/8'
                }`}
              >
                <span>{opt.label}</span>
                {responseStatus === opt.id && <Check className="w-3.5 h-3.5 text-teal-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              alert("Rejoindre la visioconférence...");
            }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-colors cursor-pointer shadow-xs"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Rejoindre</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              onDelete(event.id);
            }}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Supprimer</span>
          </button>
        </div>

        {/* CATEGORY / TAG PILLS */}
        <div className="space-y-1.5 pt-2 border-t border-white/5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Tag className="w-3 h-3 text-slate-400" />
            <span>Catégorie</span>
          </p>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <button
                key={tag.name}
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setSelectedTag(tag.name);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                  selectedTag === tag.name
                    ? 'bg-white/20 text-white shadow-xs'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${tag.color}`} />
                <span>{tag.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
