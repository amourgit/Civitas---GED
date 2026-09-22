"use client";

import React from 'react';
import { Headphones, Clock } from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';
import { CalendarEvent } from './EventDetailPopover';

interface CalendarDayGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: CalendarEvent, position: { x: number; y: number }) => void;
}

const hours = [
  { label: '6 AM', hour: 6 },
  { label: '7 AM', hour: 7 },
  { label: '8 AM', hour: 8 },
  { label: '9 AM', hour: 9 },
  { label: '10 AM', hour: 10 },
  { label: '11 AM', hour: 11 },
  { label: '12 PM', hour: 12 },
  { label: '1 PM', hour: 13 },
  { label: '2 PM', hour: 14 },
  { label: '3 PM', hour: 15 },
  { label: '4 PM', hour: 16 },
  { label: '5 PM', hour: 17 },
  { label: '6 PM', hour: 18 },
];

const colorClasses = {
  blue: 'bg-sky-500/90 text-white hover:bg-sky-400 shadow-sky-500/10 border-0',
  green: 'bg-emerald-500/90 text-white hover:bg-emerald-400 shadow-emerald-500/10 border-0',
  orange: 'bg-orange-600/90 text-white hover:bg-orange-500 shadow-orange-500/10 border-0',
  purple: 'bg-indigo-600/90 text-white hover:bg-indigo-500 shadow-indigo-500/10 border-0',
  slate: 'bg-slate-800/95 text-white hover:bg-slate-700 shadow-slate-800/20 border-0',
};

const dayNamesFr = ['DIMANCHE', 'LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'];

export function CalendarDayGrid({
  currentDate,
  events,
  selectedEventId,
  onSelectEvent,
}: CalendarDayGridProps) {
  const HOUR_HEIGHT_PX = 64;
  const START_HOUR = 6;

  // Map JS day (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat) to calendar dayIndex (0=Mon...4=Fri)
  const jsDay = currentDate.getDay();
  const calendarDayIndex = jsDay >= 1 && jsDay <= 5 ? jsDay - 1 : 0;
  const dayName = dayNamesFr[jsDay];
  const dateNum = currentDate.getDate();

  // Filter events for active day
  const dayEvents = events.filter((e) => e.dayIndex === calendarDayIndex);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-transparent overflow-y-auto no-scrollbar relative select-none">
      {/* DAY HEADER */}
      <div className="sticky top-0 z-20 bg-slate-950/50 backdrop-blur-md flex items-center border-b border-white/5 py-3 px-4 gap-4">
        <div className="w-16 shrink-0 text-right text-[11px] font-bold text-slate-400">
          HEURE
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shadow-lg shadow-blue-500/30">
            {dateNum}
          </div>
          <div>
            <span className="text-xs font-extrabold text-white tracking-wider uppercase block">
              {dayName}
            </span>
            <span className="text-[11px] text-teal-300 font-medium">
              {dayEvents.length} Événement{dayEvents.length > 1 ? 's' : ''} prévu{dayEvents.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* HOURLY GRID */}
      <div className="relative flex-1 flex" style={{ height: `${hours.length * HOUR_HEIGHT_PX}px` }}>
        {/* TIME LABELS COLUMN */}
        <div className="w-16 shrink-0 border-r border-white/5 relative text-right pr-3">
          {hours.map((h, i) => (
            <div
              key={h.label}
              className="absolute text-[11px] font-semibold text-slate-400 transform -translate-y-1/2"
              style={{ top: `${i * HOUR_HEIGHT_PX}px` }}
            >
              {h.label}
            </div>
          ))}
        </div>

        {/* DAY COLUMN CONTENT */}
        <div className="flex-1 relative">
          {/* Horizontal Hour Lines */}
          {hours.map((_, hourIdx) => (
            <div
              key={hourIdx}
              className="absolute left-0 right-0 border-t border-white/5"
              style={{ top: `${hourIdx * HOUR_HEIGHT_PX}px` }}
            />
          ))}

          {/* CURRENT TIME INDICATOR LINE */}
          <div
            className="absolute left-0 right-0 border-t-2 border-slate-900 z-10 flex items-center"
            style={{ top: `${(12 - START_HOUR) * HOUR_HEIGHT_PX}px` }}
          >
            <div className="w-3 h-3 rounded-full bg-slate-900 -ml-1.5 shadow-md" />
          </div>

          {/* EVENTS OVERLAY */}
          <div className="absolute inset-0 p-1 pointer-events-none">
            {dayEvents.map((event) => {
              const topPx = (event.startHour - START_HOUR) * HOUR_HEIGHT_PX;
              const heightPx = Math.max(event.durationHours * HOUR_HEIGHT_PX, 32);

              return (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    playXboxSound('select');
                    const rect = e.currentTarget.getBoundingClientRect();
                    onSelectEvent(event, { x: rect.left + rect.width / 2, y: rect.top });
                  }}
                  className={`absolute left-3 right-3 rounded-xl p-2.5 shadow-md cursor-pointer transition-all hover:scale-[1.01] hover:z-30 pointer-events-auto flex items-center justify-between ${
                    colorClasses[event.color]
                  } ${
                    selectedEventId === event.id ? 'ring-2 ring-white z-30' : ''
                  }`}
                  style={{
                    top: `${topPx}px`,
                    height: `${heightPx}px`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    {event.icon === 'headphones' && (
                      <Headphones className="w-4 h-4 text-white shrink-0" />
                    )}
                    <div>
                      <span className="font-extrabold text-xs leading-snug block">
                        {event.title}
                      </span>
                      {event.category && (
                        <span className="text-[10px] opacity-80 block italic">
                          {event.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold opacity-90 flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>
                      {Math.floor(event.startHour)}:{event.startHour % 1 === 0.5 ? '30' : '00'} - {Math.floor(event.startHour + event.durationHours)}:{(event.startHour + event.durationHours) % 1 === 0.5 ? '30' : '00'}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
