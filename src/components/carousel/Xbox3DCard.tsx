import React from 'react';
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Archive, 
  Code, 
  FileSpreadsheet, 
  File,
  Sparkles
} from 'lucide-react';

export interface CardThemeColors {
  border: string;
  glow: string;
  waveGradient: string;
  iconColor: string;
}

export interface XboxCardItem {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  type?: 'folder' | 'document' | 'image' | 'video' | 'music' | 'archive' | 'code' | 'sheet' | 'pdf';
  coverImage?: string;
  themeColor?: 'green' | 'blue' | 'purple' | 'cyan' | 'teal' | 'orange' | 'violet' | 'amber' | 'red';
  customIcon?: React.ReactNode;
  metadata?: Record<string, any>;
}

const themeColorMap: Record<string, CardThemeColors> = {
  green: {
    border: 'border-[#4ade80]',
    glow: 'shadow-[0_0_35px_rgba(74,222,128,0.55)]',
    waveGradient: 'from-[#4ade80]/60 via-[#22c55e]/30 to-transparent',
    iconColor: 'text-[#4ade80]'
  },
  blue: {
    border: 'border-[#38bdf8]',
    glow: 'shadow-[0_0_35px_rgba(56,189,248,0.5)]',
    waveGradient: 'from-[#38bdf8]/60 via-[#0284c7]/30 to-transparent',
    iconColor: 'text-[#38bdf8]'
  },
  purple: {
    border: 'border-[#a855f7]',
    glow: 'shadow-[0_0_35px_rgba(168,85,247,0.5)]',
    waveGradient: 'from-[#a855f7]/60 via-[#7e22ce]/30 to-transparent',
    iconColor: 'text-[#a855f7]'
  },
  cyan: {
    border: 'border-[#22d3ee]',
    glow: 'shadow-[0_0_35px_rgba(34,211,238,0.5)]',
    waveGradient: 'from-[#22d3ee]/60 via-[#0891b2]/30 to-transparent',
    iconColor: 'text-[#22d3ee]'
  },
  teal: {
    border: 'border-[#2dd4bf]',
    glow: 'shadow-[0_0_35px_rgba(45,212,191,0.5)]',
    waveGradient: 'from-[#2dd4bf]/60 via-[#0d9488]/30 to-transparent',
    iconColor: 'text-[#2dd4bf]'
  },
  orange: {
    border: 'border-[#fb923c]',
    glow: 'shadow-[0_0_35px_rgba(251,146,60,0.5)]',
    waveGradient: 'from-[#fb923c]/60 via-[#ea580c]/30 to-transparent',
    iconColor: 'text-[#fb923c]'
  },
  violet: {
    border: 'border-[#c084fc]',
    glow: 'shadow-[0_0_35px_rgba(192,132,252,0.5)]',
    waveGradient: 'from-[#c084fc]/60 via-[#9333ea]/30 to-transparent',
    iconColor: 'text-[#c084fc]'
  },
  amber: {
    border: 'border-[#f59e0b]',
    glow: 'shadow-[0_0_35px_rgba(245,158,11,0.5)]',
    waveGradient: 'from-[#f59e0b]/60 via-[#b45309]/30 to-transparent',
    iconColor: 'text-[#f59e0b]'
  },
  red: {
    border: 'border-[#f43f5e]',
    glow: 'shadow-[0_0_35px_rgba(244,63,94,0.5)]',
    waveGradient: 'from-[#f43f5e]/60 via-[#be123c]/30 to-transparent',
    iconColor: 'text-[#f43f5e]'
  }
};

export interface Xbox3DCardProps {
  item: XboxCardItem;
  isActive: boolean;
  index: number;
  activeIndex: number;
  onClick: () => void;
  onDoubleClick?: () => void;
}

export function Xbox3DCard({
  item,
  isActive,
  index,
  activeIndex,
  onClick,
  onDoubleClick
}: Xbox3DCardProps) {
  const theme = themeColorMap[item.themeColor || 'green'] || themeColorMap.green;
  const isRightOfActive = index > activeIndex;
  const isLeftOfActive = index < activeIndex;

  // 3D Angle Calculation
  // Active card: straight or subtle angle.
  // Cards to the right: tilted slightly in perspective, exactly like the Xbox carousel screenshot!
  let rotationY = 0;
  let scale = 1;
  let zIndex = 10;
  let opacity = 1;

  if (isActive) {
    rotationY = 0;
    scale = 1.08;
    zIndex = 30;
    opacity = 1;
  } else if (isRightOfActive) {
    const diff = index - activeIndex;
    rotationY = -12;
    scale = Math.max(0.85, 1 - diff * 0.04);
    zIndex = 20 - diff;
    opacity = Math.max(0.55, 1 - diff * 0.1);
  } else if (isLeftOfActive) {
    const diff = activeIndex - index;
    rotationY = 12;
    scale = Math.max(0.85, 1 - diff * 0.04);
    zIndex = 20 - diff;
    opacity = Math.max(0.55, 1 - diff * 0.1);
  }

  // Determine icon
  const renderIcon = () => {
    if (item.customIcon) return item.customIcon;
    if (item.coverImage) {
      return (
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg border border-white/20">
          <img 
            src={item.coverImage} 
            alt={item.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }
    switch (item.type) {
      case 'image':
        return <ImageIcon className="w-14 h-14" />;
      case 'video':
        return <Video className="w-14 h-14" />;
      case 'music':
        return <Music className="w-14 h-14" />;
      case 'archive':
        return <Archive className="w-14 h-14" />;
      case 'code':
        return <Code className="w-14 h-14" />;
      case 'sheet':
        return <FileSpreadsheet className="w-14 h-14" />;
      case 'pdf':
        return <FileText className="w-14 h-14" />;
      case 'document':
        return <File className="w-14 h-14" />;
      case 'folder':
      default:
        return <Folder className="w-16 h-16" strokeWidth={1.5} />;
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center shrink-0 cursor-pointer select-none transition-transform duration-300 ease-out"
      style={{
        transform: `scale(${scale}) rotateY(${rotationY}deg)`,
        transformStyle: 'preserve-3d',
        zIndex,
        opacity
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {/* 1. Main 3D Glossy Card */}
      <div 
        className={`relative w-[210px] h-[230px] sm:w-[230px] sm:h-[250px] rounded-2xl flex flex-col items-center justify-center p-5 overflow-hidden transition-all duration-300 ${
          isActive 
            ? `bg-gradient-to-b from-white/15 via-[#061417]/85 to-[#020708]/95 border-2 ${theme.border} ${theme.glow}`
            : 'bg-gradient-to-b from-white/[0.08] via-[#040e11]/80 to-[#020708]/90 border border-white/15 hover:border-white/35 hover:scale-[1.02]'
        }`}
      >
        {/* Top glossy diagonal reflection highlight */}
        <div 
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-2xl opacity-35"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)'
          }}
        />

        {/* Xbox Style Bottom Energy Ribbon Wave (Matches photo curve!) */}
        <div className="absolute inset-x-0 bottom-0 h-[80px] pointer-events-none overflow-hidden rounded-b-2xl">
          <svg 
            className="absolute bottom-[-10px] left-[-20%] w-[140%] h-[90px]" 
            viewBox="0 0 300 100" 
            fill="none" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0 80 Q 75 10 150 50 T 300 30 L 300 100 L 0 100 Z" 
              fill={`url(#wave-grad-${item.id})`}
              className="opacity-80"
            />
            <path 
              d="M0 90 Q 90 30 180 65 T 300 50" 
              stroke="white" 
              strokeWidth="1.2" 
              className="opacity-40"
            />
            <defs>
              <linearGradient id={`wave-grad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isActive ? '#4ade80' : (theme.iconColor.includes('sky') ? '#38bdf8' : '#34d399')} stopOpacity="0.8" />
                <stop offset="60%" stopColor="#052e16" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Center Icon */}
        <div 
          className={`relative z-10 mb-3 transition-all duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] ${
            isActive ? `${theme.iconColor} drop-shadow-[0_0_16px_rgba(74,222,128,0.8)]` : 'text-white/80'
          }`}
        >
          {renderIcon()}
        </div>

        {/* Card Title */}
        <h3 className="relative z-10 text-center text-sm font-semibold text-white tracking-tight line-clamp-2 px-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {item.title}
        </h3>

        {/* Subtitle / Details */}
        {item.subtitle && (
          <p className="relative z-10 text-[11px] text-white/50 text-center mt-1 truncate max-w-full px-2">
            {item.subtitle}
          </p>
        )}

        {/* Badge (e.g. number of items or file size) */}
        {item.badge && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-[10px] text-white/75 font-medium backdrop-blur-sm">
            {item.badge}
          </div>
        )}
      </div>

      {/* 2. Authentic Xbox 360 Mirror Floor Reflection */}
      <div 
        className="relative w-[210px] h-[100px] sm:w-[230px] sm:h-[115px] rounded-b-2xl overflow-hidden pointer-events-none mt-1.5"
        style={{
          transform: 'scaleY(-1)',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, transparent 85%)',
          filter: 'blur(0.5px)'
        }}
      >
        <div 
          className={`w-full h-full rounded-2xl flex flex-col items-center justify-center p-5 opacity-40 ${
            isActive 
              ? `bg-gradient-to-b from-white/15 via-[#061417] to-[#020708] border-2 ${theme.border}`
              : 'bg-gradient-to-b from-white/[0.08] via-[#040e11] to-[#020708] border border-white/15'
          }`}
        >
          {/* Faded reflected icon */}
          <div className={`mb-3 ${isActive ? theme.iconColor : 'text-white/60'}`}>
            {renderIcon()}
          </div>
          <h3 className="text-center text-sm font-semibold text-white/70 tracking-tight line-clamp-1 px-2">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
