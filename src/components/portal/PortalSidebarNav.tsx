import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Edit, 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  Receipt, 
  BookOpen, 
  Calendar, 
  FolderLock, 
  Book, 
  Trash2 
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { PORTAL_MOCK_DATA, NavLinkItem } from '../../data/portalMockData';

interface PortalSidebarNavProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export function PortalSidebarNav({ onShowToast }: PortalSidebarNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'customer-scripts': true,
  });

  const toggleGroup = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedGroups(prev => ({ ...prev, [id]: !prev[id] }));
    playXboxSound('toggle');
  };

  const handleNavClick = (item: NavLinkItem) => {
    playXboxSound('select');
    if (item.route) {
      navigate(item.route);
    } else if (item.hasChildren) {
      setExpandedGroups(prev => ({ ...prev, [item.id]: !prev[item.id] }));
    } else {
      onShowToast?.(`Navigation vers ${item.label}`, 'info');
    }
  };

  const getIconForId = (id: string) => {
    switch (id) {
      case 'home': return Home;
      case 'meet-team': return Users;
      case 'support-tracker': return Briefcase;
      case 'customer-scripts': return FileText;
      case 'expense-reporting': return Receipt;
      case 'work-guides': return BookOpen;
      case 'calendar': return Calendar;
      case 'documents': return FolderLock;
      case 'notebook': return Book;
      case 'recycle-bin': return Trash2;
      default: return FileText;
    }
  };

  return (
    <aside className="w-full lg:w-56 shrink-0 flex flex-col gap-3 p-3 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 select-none">
      {/* 1. Search this site */}
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-300/60 pointer-events-none" />
        <input
          type="text"
          placeholder="Search this site"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 bg-white/5 hover:bg-white/10 focus:bg-slate-900/90 text-white placeholder-slate-400 text-xs rounded-xl border border-white/10 focus:border-teal-400 focus:outline-hidden transition-all"
        />
      </div>

      {/* 2. Navigation Items */}
      <nav className="flex flex-col gap-0.5 mt-1">
        {PORTAL_MOCK_DATA.navigation.map((item) => {
          const isHome = item.id === 'home';
          const isCurrentRoute = isHome 
            ? location.pathname === '/' 
            : (item.route && location.pathname.startsWith(item.route));
          
          const isExpanded = !!expandedGroups[item.id];
          const Icon = getIconForId(item.id);

          return (
            <div key={item.id} className="flex flex-col">
              <button
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left group cursor-pointer ${
                  isCurrentRoute
                    ? 'bg-teal-500/20 text-teal-300 font-semibold border-l-3 border-teal-400 pl-2.5 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110 ${
                    isCurrentRoute ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.hasChildren && (
                  <div
                    onClick={(e) => toggleGroup(item.id, e)}
                    className="p-1 hover:bg-white/10 rounded-md"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                )}
              </button>

              {/* Sub-children */}
              {item.hasChildren && isExpanded && item.children && (
                <div className="pl-6 pr-2 py-1 flex flex-col gap-0.5 border-l border-white/10 ml-4 my-0.5 animate-in fade-in duration-150">
                  {item.children.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        playXboxSound('select');
                        if (sub.route) navigate(sub.route);
                        else onShowToast?.(`Ouverture de ${sub.label}`, 'info');
                      }}
                      className="text-left text-[11px] text-slate-400 hover:text-teal-300 py-1 px-2 rounded-lg hover:bg-white/5 transition-all truncate cursor-pointer"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Edit Navigation button at bottom */}
        <button
          onClick={() => {
            playXboxSound('select');
            onShowToast?.("Édition de la structure de navigation du site.", "info");
          }}
          className="flex items-center gap-2 px-3 py-2 mt-2 rounded-xl text-xs font-semibold text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 transition-all text-left cursor-pointer border border-transparent hover:border-teal-500/20"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
      </nav>
    </aside>
  );
}
