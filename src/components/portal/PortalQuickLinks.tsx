import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, 
  GraduationCap, 
  Briefcase, 
  Files, 
  User, 
  Calendar, 
  Presentation, 
  Receipt, 
  Bus 
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { PORTAL_MOCK_DATA, QuickLinkItem } from '../../data/portalMockData';

interface PortalQuickLinksProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export function PortalQuickLinks({ onShowToast }: PortalQuickLinksProps) {
  const navigate = useNavigate();

  const getIcon = (iconName: QuickLinkItem['iconName']) => {
    switch (iconName) {
      case 'megaphone': return Megaphone;
      case 'graduation-cap': return GraduationCap;
      case 'briefcase': return Briefcase;
      case 'files': return Files;
      case 'user': return User;
      case 'calendar': return Calendar;
      case 'presentation': return Presentation;
      case 'receipt': return Receipt;
      case 'bus': return Bus;
      default: return Briefcase;
    }
  };

  const handleClick = (item: QuickLinkItem) => {
    playXboxSound('select');
    if (item.route) {
      navigate(item.route);
    } else {
      onShowToast?.(`Ouverture de ${item.title}`, 'info');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-light text-white tracking-tight">
        Quick links
      </h3>

      {/* 3x3 Grid of Teal Tiles */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {PORTAL_MOCK_DATA.quickLinks.map((item) => {
          const Icon = getIcon(item.iconName);

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className="flex flex-col items-center justify-center text-center p-3 sm:p-3.5 rounded-lg bg-[#008272] hover:bg-[#009b88] active:bg-[#006f65] text-white transition-all duration-200 group cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-teal-400/20 aspect-square min-h-[90px]"
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-2 text-teal-100 transition-transform duration-200 group-hover:scale-110" strokeWidth={1.75} />
              <span className="text-[11px] sm:text-xs font-semibold leading-tight text-teal-50 line-clamp-2">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
