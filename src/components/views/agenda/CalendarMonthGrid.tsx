"use client";

import React from 'react';
import { playXboxSound } from '../../../utils/xboxAudio';
import { CalendarEvent } from './EventDetailPopover';

interface CalendarMonthGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedEventId: string | null;
  onSelectEvent: (event: CalendarEvent, position: { x: number; y: number }) => void;
  onSelectDay: (dayNum: number) => void;
}

const dayHeaders = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];

const colorPillClasses = {
  blue: 'bg-sky-500/90 text-white hover:bg-sky-400',
  green: 'bg-emerald-500/90 text-white hover:bg-emerald-400',
  orange: 'bg-orange-600/90 text-white hover:bg-orange-500',
  purple: 'bg-indigo-600/90 text-white hover:bg-indigo-500',
  slate: 'bg-slate-800/90 text-white hover:bg-slate-700',
};

export function CalendarMonthGrid({
  currentDate,
  events,
  selectedEventId,
  onSelectEvent,
  onSelectDay,
}: CalendarMonthGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get total days in month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Get starting day of week (0=Mon, 6=Sun)
  let startDayOfWeek = new Date(year, month, 1).getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6;

  // Build grid items
  const gridCells = [];
  // Prev month padding
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    gridCells.push({
      dayNum: prevMonthDays - i,
      isCurrentMonth: false,
      isToday: false,
      dateObj: new Date(year, month - 1, prevMonthDays - i),
    });
  }
  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const isToday = d === 20 && month === 0 && year === 2026;
    gridCells.push({
      dayNum: d,
      isCurrentMonth: true,
      isToday,
      dateObj: new Date(year, month, d),
    });
  }
  // Next month padding to reach multiple of 7
  const remaining = 35 - gridCells.length;
  for (let n = 1; n <= (remaining < 0 ? remaining + 7 : remaining); n++) {
    gridCells.push({
      dayNum: n,
      isCurrentMonth: false,
      isToday: false,
      dateObj: new Date(year, month + 1, n),
    });
  }

  // Helper to map calendar dayIndex (0=Mon...4=Fri) to events
  const getEventsForDay = (cell: typeof gridCells[0]) => {
    if (!cell.isCurrentMonth) return [];
    // Map day 20 -> Mon (0), 21 -> Tue (1), 22 -> Wed (2), 23 -> Thu (3), 24 -> Fri (4)
    if (cell.dayNum >= 20 && cell.dayNum <= 24) {
      const idx = cell.dayNum - 20;
      return events.filter((e) => e.dayIndex === idx);
    }
    return [];
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-transparent overflow-y-auto no-scrollbar select-none p-1">
      {/* DAY HEADERS */}
      <div className="grid grid-cols-7 border-b border-white/5 pb-2 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        {dayHeaders.map((dh) => (
          <div key={dh}>{dh}</div>
        ))}
      </div>

      {/* MONTH GRID CELLS */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 divide-x divide-y divide-white/5 border-b border-white/5 min-h-[480px]">
        {gridCells.map((cell, index) => {
          const cellEvents = getEventsForDay(cell);

          return (
            <div
              key={index}
              onClick={() => {
                if (cell.isCurrentMonth) {
                  playXboxSound('select');
                  onSelectDay(cell.dayNum);
                }
              }}
              className={`p-1.5 flex flex-col min-h-[90px] transition-colors cursor-pointer group ${
                cell.isCurrentMonth
                  ? 'hover:bg-white/3 text-white'
                  : 'text-slate-600 bg-black/10'
              }`}
            >
              {/* DATE NUMBER */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    cell.isToday
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : cell.isCurrentMonth
                      ? 'text-slate-300 group-hover:text-white'
                      : 'text-slate-600'
                  }`}
                >
                  {cell.dayNum}
                </span>
                {cellEvents.length > 0 && (
                  <span className="text-[9px] font-bold text-teal-400 opacity-80">
                    {cellEvents.length} rdv
                  </span>
                )}
              </div>

              {/* EVENTS BADGES */}
              <div className="space-y-1 overflow-hidden flex-1">
                {cellEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      playXboxSound('select');
                      const rect = e.currentTarget.getBoundingClientRect();
                      onSelectEvent(event, { x: rect.left + rect.width / 2, y: rect.top });
                    }}
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold truncate transition-transform hover:scale-102 cursor-pointer ${
                      colorPillClasses[event.color]
                    } ${selectedEventId === event.id ? 'ring-1 ring-white' : ''}`}
                  >
                    {event.title}
                  </div>
                ))}
                {cellEvents.length > 3 && (
                  <span className="text-[9px] text-slate-400 font-semibold block px-1">
                    +{cellEvents.length - 3} autres
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
