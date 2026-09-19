import React, { useState } from 'react';
import { 
  Star, 
  Users, 
  Bot
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { PORTAL_MOCK_DATA } from '../../data/portalMockData';

interface SiteBannerHeaderProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export function SiteBannerHeader({ onShowToast }: SiteBannerHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(PORTAL_MOCK_DATA.siteHeader.isFollowing);

  const handleToggleFollow = () => {
    playXboxSound('toggle');
    setIsFollowing(prev => !prev);
    if (onShowToast) {
      onShowToast(
        !isFollowing ? "Vous suivez désormais cet espace." : "Vous ne suivez plus cet espace.",
        'info'
      );
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Main Teal Top Banner Header (Totalement plat, sans arrondi, épuré) */}
      <div className="w-full bg-[#008272] border-b border-teal-500/30 text-white px-3 sm:px-6 py-2 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Avatar carré + Titres */}
          <div className="flex items-center gap-2">
            {/* Avatar 100% sans arrondi */}
            <div className="w-8 h-8 rounded-none bg-slate-900/50 border border-teal-300/40 overflow-hidden flex items-center justify-center shrink-0">
              <div className="w-6 h-6 rounded-none bg-teal-700/80 flex items-center justify-center text-white font-bold border border-white/20">
                <Bot className="w-3.5 h-3.5 text-teal-200" />
              </div>
            </div>

            <div className="flex flex-col -space-y-0.5">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                {PORTAL_MOCK_DATA.siteHeader.title}
              </h1>
              <p className="text-teal-100/80 text-[10px] sm:text-[11px] font-normal leading-none">
                {PORTAL_MOCK_DATA.siteHeader.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Star Follow + Member Count */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleToggleFollow}
              className={`px-2.5 py-1 rounded-none text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer border ${
                isFollowing
                  ? 'bg-white/15 hover:bg-white/25 text-white border-white/30'
                  : 'bg-teal-500/30 hover:bg-teal-500/50 text-teal-100 border-teal-400/40'
              }`}
            >
              <Star className={`w-3 h-3 ${isFollowing ? 'text-amber-300 fill-amber-300' : 'text-teal-200'}`} />
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </button>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-none bg-black/25 border border-white/10 text-teal-100 text-[11px] font-medium">
              <Users className="w-3 h-3 text-teal-200" />
              <span>{PORTAL_MOCK_DATA.siteHeader.memberCount} members</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
