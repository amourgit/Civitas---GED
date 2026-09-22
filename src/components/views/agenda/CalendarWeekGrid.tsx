"use client";

import React from 'react';
import { Headphones } from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';
import { CalendarEvent } from './EventDetailPopover';

interface CalendarWeekGridProps {
  events: CalendarEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: CalendarEvent, position: { x: number; y: number }) => void;
}

const days = [
  { day: 'MON', date: 20, isToday: true },
  { day: 'TUE', date: 21, isToday: false },
  { day: 'WED', date: 22, isToday: false },
  { day: 'THU', date: 23, isToday: false },
  { day: 'FRI', date: 24, isToday: false },
];

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

// Color styling map matching Google Calendar / screenshot exactly
const colorClasses = {
  blue: 'bg-sky-500/90 text-white hover:bg-sky-400 shadow-sky-500/10 border-0',
  green: 'bg-emerald-500/90 text-white hover:bg-emerald-400 shadow-emerald-500/10 border-0',
  orange: 'bg-orange-600/90 text-white hover:bg-orange-500 shadow-orange-500/10 border-0',
  purple: 'bg-indigo-600/90 text-white hover:bg-indigo-500 shadow-indigo-500/10 border-0',
  slate: 'bg-slate-800/95 text-white hover:bg-slate-700 shadow-slate-800/20 border-0',
};

export function CalendarWeekGrid({
  events,
  selectedEventId,
  onSelectEvent,
}: CalendarWeekGridProps) {
  // Height per 1-hour row in pixels
  const HOUR_HEIGHT_PX = 58;
  const START_HOUR = 6; // 6 AM start

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-transparent overflow-y-auto no-scrollbar relative select-none">
      {/* 1. DAY HEADERS */}
      <div className="sticky top-0 z-20 bg-slate-950/40 backdrop-blur-md flex items-stretch border-b border-white/5">
        {/* Time Column Placeholder */}
        <div className="w-16 shrink-0 border-r border-white/5" />

        {/* Days Grid Header */}
        <div className="flex-1 grid grid-cols-5 divide-x divide-white/5">
          {days.map((d) => (
            <div
              key={d.day}
              className="py-2 text-center flex flex-col items-center justify-center gap-1"
            >
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {d.day}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs transition-all ${
                  d.isToday
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                {d.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ALL-DAY EVENTS BANNER */}
      <div className="flex border-b border-white/5 bg-white/1 shrink-0 min-h-[32px]">
        <div className="w-16 shrink-0 border-r border-white/5 flex items-center justify-center text-[9px] text-slate-500 font-bold uppercase">
          Toute la journée
        </div>
        <div className="flex-1 grid grid-cols-5 divide-x divide-white/5 p-1">
          {/* Mon All-day */}
          <div className="px-0.5">
            <div className="bg-emerald-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold truncate shadow-xs">
              Zürich design days
            </div>
          </div>
          <div />
          <div />
          <div />
          {/* Fri All-day */}
          <div className="px-0.5">
            <div className="bg-emerald-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold truncate shadow-xs">
              Pick up new bike
            </div>
          </div>
        </div>
      </div>

      {/* 3. HOURLY GRID CONTAINER */}
      <div className="relative flex-1 flex" style={{ height: `${hours.length * HOUR_HEIGHT_PX}px` }}>
        {/* TIME LABELS COLUMN */}
        <div className="w-16 shrink-0 border-r border-white/5 relative text-right pr-2">
          {hours.map((h, i) => (
            <div
              key={h.label}
              className="absolute text-[10px] font-semibold text-slate-400/80 transform -translate-y-1/2"
              style={{ top: `${i * HOUR_HEIGHT_PX}px` }}
            >
              {h.label}
            </div>
          ))}
        </div>

        {/* 5 DAYS GRID BACKGROUND LINES */}
        <div className="flex-1 grid grid-cols-5 divide-x divide-white/5 relative">
          {days.map((_, dayIdx) => (
            <div key={dayIdx} className="relative h-full">
              {/* Horizontal hour lines */}
              {hours.map((_, hourIdx) => (
                <div
                  key={hourIdx}
                  className="absolute left-0 right-0 border-t border-white/5"
                  style={{ top: `${hourIdx * HOUR_HEIGHT_PX}px` }}
                />
              ))}

              {/* CURRENT TIME INDICATOR LINE (Monday 12:00 PM) */}
              {dayIdx === 0 && (
                <div
                  className="absolute left-0 right-0 border-t-2 border-slate-900 z-10 flex items-center"
                  style={{ top: `${(12 - START_HOUR) * HOUR_HEIGHT_PX}px` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 -ml-1.25 shadow-md" />
                </div>
              )}
            </div>
          ))}

          {/* EVENTS OVERLAY LAYER */}
          <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
            {events.map((event) => {
              const topPx = (event.startHour - START_HOUR) * HOUR_HEIGHT_PX;
              const heightPx = Math.max(event.durationHours * HOUR_HEIGHT_PX, 20);

              return (
                <div
                  key={event.id}
                  className="relative h-full pointer-events-auto"
                  style={{ gridColumnStart: event.dayIndex + 1 }}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      playXboxSound('select');
                      const rect = e.currentTarget.getBoundingClientRect();
                      onSelectEvent(event, { x: rect.left + rect.width / 2, y: rect.top });
                    }}
                    className={`absolute left-0.5 right-0.5 rounded-lg p-1.5 shadow-xs cursor-pointer transition-all hover:scale-[1.02] hover:z-30 overflow-hidden ${
                      colorClasses[event.color]
                    } ${
                      selectedEventId === event.id
                        ? 'ring-2 ring-white scale-[1.02] z-30'
                        : ''
                    }`}
                    style={{
                      top: `${topPx}px`,
                      height: `${heightPx}px`,
                    }}
                  >
                    <div className="flex items-center gap-1">
                      {event.icon === 'headphones' && (
                        <Headphones className="w-3 h-3 text-white shrink-0" />
                      )}
                      <span className="font-extrabold text-[10px] sm:text-[11px] leading-snug truncate">
                        {event.title}
                      </span>
                    </div>

                    {heightPx > 32 && (
                      <span className="text-[9px] opacity-90 block truncate mt-0.5 font-medium">
                        {Math.floor(event.startHour)}:{event.startHour % 1 === 0.5 ? '30' : '00'} - {Math.floor(event.startHour + event.durationHours)}:{(event.startHour + event.durationHours) % 1 === 0.5 ? '30' : '00'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
