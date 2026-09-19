import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCw, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { PORTAL_MOCK_DATA, CalendarEventItem } from '../../data/portalMockData';

interface PortalTeamCalendarProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export function PortalTeamCalendar({ onShowToast }: PortalTeamCalendarProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [page, setPage] = useState(0);

  const handleRefresh = () => {
    playXboxSound('toggle');
    onShowToast?.("Calendrier synchronisé avec Exchange & Teams.", "info");
  };

  const handleEventClick = (event: CalendarEventItem) => {
    playXboxSound('select');
    navigate('/calendrier');
  };

  const events = activeTab === 'upcoming' 
    ? PORTAL_MOCK_DATA.calendarEvents 
    : [
        {
          id: 'past-1',
          month: 'Fév',
          day: '28',
          weekday: 'Fri',
          title: 'Sprint Retrospective & Demo',
          time: '04:00 PM',
          location: 'Teams Meeting',
        }
      ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-white tracking-tight">
          Team calendar
        </h3>
      </div>

      {/* Tabs & Refresh */}
      <div className="flex items-center justify-between border-b border-white/10 pb-1">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              playXboxSound('select');
              setActiveTab('upcoming');
            }}
            className={`text-xs font-semibold pb-1.5 transition-all cursor-pointer relative ${
              activeTab === 'upcoming'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => {
              playXboxSound('select');
              setActiveTab('past');
            }}
            className={`text-xs font-semibold pb-1.5 transition-all cursor-pointer relative ${
              activeTab === 'past'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Past
          </button>
        </div>

        <button
          onClick={handleRefresh}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          title="Rafraîchir"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Events List */}
      <div className="flex flex-col divide-y divide-white/10 min-h-[190px]">
        {events.map((ev) => (
          <div
            key={ev.id}
            onClick={() => handleEventClick(ev)}
            className="py-3 flex items-start gap-3.5 group cursor-pointer hover:bg-white/5 px-2 rounded-xl transition-all"
          >
            {/* Date Block */}
            <div className="w-11 h-12 rounded-lg bg-black/40 border border-white/10 flex flex-col items-center justify-center shrink-0 group-hover:border-teal-400/40 transition-colors">
              <span className="text-[10px] font-semibold text-teal-400 uppercase tracking-wider leading-none">
                {ev.month}
              </span>
              <span className="text-base font-bold text-white leading-tight">
                {ev.day}
              </span>
              <span className="text-[9px] text-slate-400 font-medium leading-none">
                {ev.weekday}
              </span>
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-teal-300 transition-colors truncate">
                {ev.title}
              </h4>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-teal-400/80" />
                  {ev.time}
                </span>
              </div>
              {ev.location && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span className="truncate">{ev.location}</span>
                </div>
              )}
            </div>

            {/* Calendar Icon Right */}
            <div className="p-1 text-slate-400 group-hover:text-teal-400 transition-colors self-center">
              <CalendarIcon className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
        <button
          onClick={() => {
            playXboxSound('toggle');
            setPage(p => Math.max(0, p - 1));
          }}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>
        <button
          onClick={() => {
            playXboxSound('toggle');
            setPage(p => p + 1);
            onShowToast?.("Page suivante du calendrier chargée.", "info");
          }}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
