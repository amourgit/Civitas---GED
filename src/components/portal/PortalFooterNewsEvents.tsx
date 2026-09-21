import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface PortalFooterNewsEventsProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

interface EventItem {
  id: string;
  badgeType: 'split' | 'image' | 'single';
  badgeTopText: string;
  badgeBottomText: string;
  badgeBgImage?: string;
  title: string;
  dateString: string;
  route: string;
}

export function PortalFooterNewsEvents({ onShowToast }: PortalFooterNewsEventsProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPage1: EventItem[] = [
    {
      id: 'ev-1',
      badgeType: 'split',
      badgeTopText: 'OCT 16',
      badgeBottomText: 'DEC 16',
      title: 'New Hire Orientation',
      dateString: 'Wed, Oct 16, 12:00 PM',
      route: '/calendrier'
    },
    {
      id: 'ev-2',
      badgeType: 'image',
      badgeTopText: 'JUL',
      badgeBottomText: '1',
      badgeBgImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=160&auto=format&fit=crop&q=80',
      title: 'Canada Day',
      dateString: 'Wed, Jul 1, All day',
      route: '/calendrier'
    },
    {
      id: 'ev-3',
      badgeType: 'image',
      badgeTopText: 'JUL',
      badgeBottomText: '4',
      badgeBgImage: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=160&auto=format&fit=crop&q=80',
      title: 'Independence Day',
      dateString: 'Sat, Jul 4, All day',
      route: '/calendrier'
    },
    {
      id: 'ev-4',
      badgeType: 'single',
      badgeTopText: 'JUL',
      badgeBottomText: '28',
      title: 'New Hire Orientation',
      dateString: 'Tue, Jul 28, 12:00 PM',
      route: '/calendrier'
    }
  ];

  const eventsPage2: EventItem[] = [
    {
      id: 'ev-5',
      badgeType: 'single',
      badgeTopText: 'AUG',
      badgeBottomText: '14',
      title: 'All-Hands Company Meeting',
      dateString: 'Fri, Aug 14, 10:00 AM',
      route: '/calendrier'
    },
    {
      id: 'ev-6',
      badgeType: 'single',
      badgeTopText: 'AUG',
      badgeBottomText: '22',
      title: 'IT Infrastructure Maintenance',
      dateString: 'Sat, Aug 22, All day',
      route: '/calendrier'
    },
    {
      id: 'ev-7',
      badgeType: 'single',
      badgeTopText: 'SEP',
      badgeBottomText: '05',
      title: 'Leadership Strategy Review',
      dateString: 'Tue, Sep 05, 02:00 PM',
      route: '/calendrier'
    },
    {
      id: 'ev-8',
      badgeType: 'single',
      badgeTopText: 'SEP',
      badgeBottomText: '30',
      title: 'Compliance Training Deadline',
      dateString: 'Wed, Sep 30, 05:00 PM',
      route: '/calendrier'
    }
  ];

  const currentEvents = currentPage === 1 ? eventsPage1 : eventsPage2;

  const handleNewsClick = (title: string, route: string = '/actualites') => {
    playXboxSound('select');
    onShowToast?.(`Ouverture de l'article : "${title}"`, 'info');
    navigate(route);
  };

  const handleEventClick = (event: EventItem) => {
    playXboxSound('select');
    onShowToast?.(`Événement sélectionné : "${event.title}" (${event.dateString})`, 'info');
    navigate(event.route);
  };

  const handleAddEvent = () => {
    playXboxSound('select');
    onShowToast?.("Ouverture de l'éditeur pour planifier un nouvel événement.", 'info');
    navigate('/calendrier');
  };

  const handleSeeAllEvents = () => {
    playXboxSound('select');
    navigate('/calendrier');
  };

  return (
    <footer id="portal-footer" className="w-full shrink-0 relative select-none mt-0 z-20">
      {/* ── Top Parabolic Curved Arch (Pleine largeur d'écran) ── */}
      <div className="w-full overflow-hidden leading-none pointer-events-none -mb-1">
        <svg 
          className="w-full h-6 sm:h-8 md:h-10 text-[#0B1E34] block" 
          viewBox="0 0 1440 60" 
          fill="currentColor" 
          preserveAspectRatio="none"
        >
          <path d="M 0,60 L 0,45 Q 720,-10 1440,45 L 1440,60 Z" />
        </svg>
      </div>

      <div className="w-full bg-[#0B1E34] text-white shadow-2xl rounded-none pt-2 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ── Inner Centered Container: Les deux sections en ligne (News & Events) ── */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-14 rounded-none">
        
        {/* ════════════════════════════════════════════════════════════════════════
            1. SECTION NEWS (Gauche, ~62% de largeur sur grand écran)
            ════════════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-[62%] xl:w-[64%] flex flex-col rounded-none">
          {/* Section Header */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-5 rounded-none">
            News
          </h2>

          {/* Grille interne News : Carte principale + 3 cartes empilées */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start rounded-none">
            
            {/* ── Sub-Column A: Featured Large Card (md:col-span-7) ── */}
            <div 
              onClick={() => handleNewsClick('New learning hub launches company-wide')}
              className="md:col-span-7 flex flex-col cursor-pointer group rounded-none"
            >
              {/* Grand visuel de bureau moderne sans aucun arrondi */}
              <div className="w-full aspect-[16/10] overflow-hidden bg-slate-900 border border-slate-700/60 rounded-none relative">
                <img
                  src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&auto=format&fit=crop&q=80"
                  alt="New learning hub launches company-wide"
                  className="w-full h-full object-cover object-center rounded-none transition-transform duration-500 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Titre & Description de l'article principal */}
              <h3 className="text-white font-bold text-base sm:text-lg leading-snug mt-3.5 group-hover:text-teal-300 transition-colors rounded-none">
                New learning hub launches company-wide
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-3 rounded-none">
                We&apos;ve just launched a brand-new learning hub to help you grow your skills, explore new topics, and track your training in one place. Check it out and start...
              </p>
            </div>

            {/* ── Sub-Column B: 3 Stacked News Items (md:col-span-5) ── */}
            <div className="md:col-span-5 flex flex-col gap-4 sm:gap-4.5 rounded-none">
              
              {/* Item 1: Vacation days */}
              <div 
                onClick={() => handleNewsClick("Vacation days just got better: here's what's new")}
                className="flex items-start gap-3 sm:gap-3.5 cursor-pointer group rounded-none"
              >
                <div className="w-[102px] h-[68px] sm:w-[110px] sm:h-[72px] shrink-0 bg-slate-900 border border-slate-700/60 overflow-hidden rounded-none">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=260&auto=format&fit=crop&q=80"
                    alt="Vacation days"
                    className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col min-w-0 rounded-none">
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-teal-300 transition-colors line-clamp-2 rounded-none">
                    Vacation days just got better: here&apos;s what&apos;s new
                  </h4>
                  <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed mt-1 line-clamp-2 rounded-none">
                    This is your guide to the updated time-off and vacation rules!
                  </p>
                </div>
              </div>

              {/* Item 2: New remote work guidelines */}
              <div 
                onClick={() => handleNewsClick('New remote work guidelines now live')}
                className="flex items-start gap-3 sm:gap-3.5 cursor-pointer group rounded-none"
              >
                <div className="w-[102px] h-[68px] sm:w-[110px] sm:h-[72px] shrink-0 bg-slate-900 border border-slate-700/60 overflow-hidden rounded-none">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=260&auto=format&fit=crop&q=80"
                    alt="New remote work guidelines"
                    className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col min-w-0 rounded-none">
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-teal-300 transition-colors line-clamp-2 rounded-none">
                    New remote work guidelines now live
                  </h4>
                  <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed mt-1 line-clamp-2 rounded-none">
                    Everything you need to know about working from home in 2025.
                  </p>
                </div>
              </div>

              {/* Item 3: Mandatory compliance training */}
              <div 
                onClick={() => handleNewsClick('Mandatory compliance training now available')}
                className="flex items-start gap-3 sm:gap-3.5 cursor-pointer group rounded-none"
              >
                <div className="w-[102px] h-[68px] sm:w-[110px] sm:h-[72px] shrink-0 bg-slate-900 border border-slate-700/60 overflow-hidden rounded-none">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=260&auto=format&fit=crop&q=80"
                    alt="Mandatory compliance training"
                    className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col min-w-0 rounded-none">
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-teal-300 transition-colors line-clamp-2 rounded-none">
                    Mandatory compliance training now available
                  </h4>
                  <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed mt-1 line-clamp-2 rounded-none">
                    Our annual compliance courses are now live. All employees must complete them by September 30....
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            2. SECTION EVENTS (Droite, ~38% de largeur sur grand écran)
            ════════════════════════════════════════════════════════════════════════ */}
        <div className="w-full lg:w-[38%] xl:w-[36%] flex flex-col rounded-none">
          {/* Header row: "Events" + "See all" */}
          <div className="flex items-center justify-between w-full mb-3 rounded-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight rounded-none">
              Events
            </h2>
            <button
              onClick={handleSeeAllEvents}
              className="text-slate-300 hover:text-white text-xs font-normal transition-colors cursor-pointer rounded-none"
            >
              See all
            </button>
          </div>

          {/* Action Link: "+ Add event" */}
          <button
            onClick={handleAddEvent}
            className="flex items-center gap-1.5 text-slate-200 hover:text-teal-300 text-xs font-medium cursor-pointer transition-colors w-fit mb-4 rounded-none"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add event</span>
          </button>

          {/* Events List (4 items strictly rounded-none) */}
          <div className="flex flex-col gap-3.5 sm:gap-4 w-full rounded-none">
            {currentEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="flex items-center gap-3.5 cursor-pointer group rounded-none"
              >
                {/* Date Badge: Sharp square 0px border-radius */}
                {event.badgeType === 'split' ? (
                  <div className="w-12 h-12 shrink-0 bg-[#253245] border border-slate-700/80 rounded-none flex flex-col items-center justify-center text-center p-0.5 leading-tight">
                    <span className="text-[9px] font-bold text-slate-300 tracking-wider uppercase">
                      {event.badgeTopText}
                    </span>
                    <span className="text-[9px] font-bold text-white tracking-wider uppercase mt-1">
                      {event.badgeBottomText}
                    </span>
                  </div>
                ) : event.badgeType === 'image' ? (
                  <div className="w-12 h-12 shrink-0 relative overflow-hidden bg-slate-900 border border-slate-700/80 rounded-none flex flex-col items-center justify-center text-center p-0.5 leading-none">
                    {event.badgeBgImage && (
                      <img
                        src={event.badgeBgImage}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-none"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <span className="text-[9px] font-bold text-slate-200 tracking-wider uppercase drop-shadow-sm">
                        {event.badgeTopText}
                      </span>
                      <span className="text-base font-bold text-white leading-none mt-0.5 drop-shadow-md">
                        {event.badgeBottomText}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 shrink-0 bg-[#253245] border border-slate-700/80 rounded-none flex flex-col items-center justify-center text-center p-0.5 leading-none">
                    <span className="text-[9px] font-bold text-slate-300 tracking-wider uppercase">
                      {event.badgeTopText}
                    </span>
                    <span className="text-base font-bold text-white leading-none mt-0.5">
                      {event.badgeBottomText}
                    </span>
                  </div>
                )}

                {/* Event Details */}
                <div className="flex flex-col min-w-0 rounded-none">
                  <h4 className="text-white font-bold text-xs sm:text-sm leading-snug group-hover:text-teal-300 transition-colors truncate rounded-none">
                    {event.title}
                  </h4>
                  <p className="text-slate-400 text-[11px] sm:text-xs mt-0.5 rounded-none">
                    {event.dateString}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Events Pagination (Previous / Next) */}
          <div className="flex items-center justify-between w-full mt-6 pt-3.5 border-t border-slate-700/60 text-xs rounded-none">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  playXboxSound('select');
                  setCurrentPage(prev => prev - 1);
                }
              }}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 transition-colors rounded-none select-none ${
                currentPage === 1
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                if (currentPage < 2) {
                  playXboxSound('select');
                  setCurrentPage(prev => prev + 1);
                }
              }}
              disabled={currentPage === 2}
              className={`flex items-center gap-1 transition-colors font-medium rounded-none select-none ${
                currentPage === 2
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white cursor-pointer'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
    </footer>
  );
}
