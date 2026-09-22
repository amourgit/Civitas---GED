"use client";

import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarWeekGrid } from './CalendarWeekGrid';
import { CalendarDayGrid } from './CalendarDayGrid';
import { CalendarMonthGrid } from './CalendarMonthGrid';
import { TimeInsightsPanel } from './TimeInsightsPanel';
import { EventDetailPopover, CalendarEvent } from './EventDetailPopover';

const initialEvents: CalendarEvent[] = [
  // MONDAY (dayIndex 0)
  { id: '1', title: 'Samy : Rom', dayIndex: 0, startHour: 9, durationHours: 0.5, color: 'blue' },
  { id: '2', title: 'Lamar : Rom', dayIndex: 0, startHour: 9.5, durationHours: 0.5, color: 'blue' },
  { id: '3', title: 'Project Phoenix', dayIndex: 0, startHour: 10, durationHours: 1, color: 'orange', category: 'Important' },
  { id: '4', title: 'Leadership week', dayIndex: 0, startHour: 11, durationHours: 1, color: 'blue' },
  { id: '5', title: 'Wawida : Rom', dayIndex: 0, startHour: 12.5, durationHours: 0.5, color: 'blue' },
  { id: '6', title: 'Sharron : Rom', dayIndex: 0, startHour: 1, durationHours: 0.5, color: 'blue' },
  { id: '7', title: 'Sync on lightning', dayIndex: 0, startHour: 1.5, durationHours: 0.5, color: 'blue' },
  { id: '8', title: 'Store opening', dayIndex: 0, startHour: 2, durationHours: 1, color: 'green', category: 'Personal' },
  { id: '9', title: 'Q2 workshop', dayIndex: 0, startHour: 3, durationHours: 1, color: 'blue', category: 'Strategy 2022' },

  // TUESDAY (dayIndex 1)
  { id: '10', title: 'Visioning workshop', dayIndex: 1, startHour: 9, durationHours: 2.5, color: 'purple', category: 'Strategy 2022' },
  { id: '11', title: 'DNS', dayIndex: 1, startHour: 12, durationHours: 3.5, color: 'blue' },
  { id: '12', title: 'Alen : Rom', dayIndex: 1, startHour: 3.5, durationHours: 0.5, color: 'blue' },
  { id: '13', title: 'Sales call', dayIndex: 1, startHour: 4, durationHours: 0.5, color: 'blue' },
  { id: '14', title: 'Piano recital', dayIndex: 1, startHour: 5, durationHours: 1, color: 'green', category: 'Personal' },

  // WEDNESDAY (dayIndex 2)
  { id: '15', title: 'Dropoff at school', dayIndex: 2, startHour: 7.5, durationHours: 1, color: 'green', category: 'Personal' },
  { id: '16', title: 'Button review', dayIndex: 2, startHour: 9, durationHours: 0.5, color: 'blue' },
  { id: '17', title: 'LT weekly', dayIndex: 2, startHour: 9.5, durationHours: 0.5, color: 'blue' },
  { id: '18', title: 'Review with Miguel', dayIndex: 2, startHour: 10, durationHours: 2, color: 'orange', category: 'Important' },
  { id: '19', title: 'Lunch w/ Sunday', dayIndex: 2, startHour: 12, durationHours: 1, color: 'green', category: 'Personal' },
  { id: '20', title: 'Crit club', dayIndex: 2, startHour: 1.5, durationHours: 1.25, color: 'blue' },
  { id: '21', title: 'HC request', dayIndex: 2, startHour: 3, durationHours: 0.5, color: 'blue' },
  { id: '22', title: 'AMA with Javier', dayIndex: 2, startHour: 4.5, durationHours: 1, color: 'blue' },

  // THURSDAY (dayIndex 3)
  { id: '23', title: 'Visioning workshop', dayIndex: 3, startHour: 9.5, durationHours: 2, color: 'purple', category: 'Strategy 2022' },
  { id: '24', title: 'Work on presentation', dayIndex: 3, startHour: 11.5, durationHours: 3.5, color: 'slate', icon: 'headphones' },
  { id: '25', title: 'Pitch to Trade Group', dayIndex: 3, startHour: 3.5, durationHours: 1, color: 'blue' },

  // FRIDAY (dayIndex 4)
  { id: '26', title: 'Coffee with Janine', dayIndex: 4, startHour: 9, durationHours: 0.5, color: 'green', category: 'Personal' },
  { id: '27', title: 'OKR planning', dayIndex: 4, startHour: 9.5, durationHours: 2, color: 'blue' },
  { id: '28', title: 'Lego : Rom', dayIndex: 4, startHour: 11.5, durationHours: 0.5, color: 'blue' },
  { id: '29', title: 'Alix : Rom', dayIndex: 4, startHour: 12, durationHours: 0.5, color: 'blue' },
  { id: '30', title: 'Jaiy : Rom', dayIndex: 4, startHour: 12.5, durationHours: 0.5, color: 'blue' },
  { id: '31', title: 'Perf sync for marketing', dayIndex: 4, startHour: 1.5, durationHours: 2, color: 'blue' },
  { id: '32', title: 'Marketing review', dayIndex: 4, startHour: 3.5, durationHours: 0.5, color: 'blue' },
  { id: '33', title: 'Branding review', dayIndex: 4, startHour: 4, durationHours: 0.5, color: 'blue' },
];

export function CalendarAgendaView() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 0, 20)); // Mon Jan 20, 2026
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [showInsights, setShowInsights] = useState(true);
  const [selectedEventPopover, setSelectedEventPopover] = useState<{
    event: CalendarEvent;
    position: { x: number; y: number };
  } | null>(null);

  const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
  const currentMonthLabel = monthFormatter.format(currentDate);

  const handleToday = () => {
    setCurrentDate(new Date(2026, 0, 20));
  };

  const handlePrev = () => {
    const d = new Date(currentDate);
    if (viewMode === 'Day') d.setDate(d.getDate() - 1);
    else if (viewMode === 'Week') d.setDate(d.getDate() - 7);
    else if (viewMode === 'Month') d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (viewMode === 'Day') d.setDate(d.getDate() + 1);
    else if (viewMode === 'Week') d.setDate(d.getDate() + 7);
    else if (viewMode === 'Month') d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedEventPopover(null);
  };

  const handleCreateEvent = () => {
    const newEv: CalendarEvent = {
      id: String(Date.now()),
      title: 'Nouvelle réunion',
      dayIndex: 0,
      startHour: 10,
      durationHours: 1,
      color: 'blue',
      category: 'Other',
    };
    setEvents((prev) => [...prev, newEv]);
  };

  return (
    <div className="w-full h-[calc(100vh-190px)] flex flex-col rounded-3xl bg-transparent overflow-hidden backdrop-blur-xs">
      {/* HEADER */}
      <CalendarHeader
        currentMonthLabel={currentMonthLabel}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        showInsights={showInsights}
        onToggleInsights={() => setShowInsights((prev) => !prev)}
        onCreateEvent={handleCreateEvent}
        onToday={handleToday}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* MAIN BODY AREA */}
      <div className="flex-1 min-h-0 flex items-stretch overflow-hidden bg-transparent">
        {/* VIEW RENDERER */}
        {viewMode === 'Week' && (
          <CalendarWeekGrid
            events={events}
            selectedEventId={selectedEventPopover?.event.id || null}
            onSelectEvent={(event, position) => {
              setSelectedEventPopover({ event, position });
            }}
          />
        )}

        {viewMode === 'Day' && (
          <CalendarDayGrid
            currentDate={currentDate}
            events={events}
            selectedEventId={selectedEventPopover?.event.id || null}
            onSelectEvent={(event, position) => {
              setSelectedEventPopover({ event, position });
            }}
          />
        )}

        {viewMode === 'Month' && (
          <CalendarMonthGrid
            currentDate={currentDate}
            events={events}
            selectedEventId={selectedEventPopover?.event.id || null}
            onSelectEvent={(event, position) => {
              setSelectedEventPopover({ event, position });
            }}
            onSelectDay={(dayNum) => {
              const d = new Date(currentDate);
              d.setDate(dayNum);
              setCurrentDate(d);
              setViewMode('Day');
            }}
          />
        )}

        {/* TIME INSIGHTS SIDE PANEL */}
        {showInsights && (
          <TimeInsightsPanel onClose={() => setShowInsights(false)} />
        )}
      </div>

      {/* EVENT DETAIL POPOVER CARD */}
      {selectedEventPopover && (
        <EventDetailPopover
          event={selectedEventPopover.event}
          position={selectedEventPopover.position}
          onClose={() => setSelectedEventPopover(null)}
          onDelete={handleDeleteEvent}
        />
      )}
    </div>
  );
}
