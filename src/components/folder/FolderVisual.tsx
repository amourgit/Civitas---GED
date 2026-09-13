import React from 'react';
import { 
  FileText, 
  Users, 
  GraduationCap, 
  Coins, 
  Megaphone, 
  User, 
  Handshake, 
  Archive, 
  Calendar, 
  Settings, 
  MoreHorizontal
} from 'lucide-react';
import { FolderItem } from '../../types/document';

interface FolderVisualProps {
  folder: FolderItem;
  isHovered?: boolean;
}

export function FolderVisual({ folder }: FolderVisualProps) {
  // If it's a special photo gallery with photo preview
  if (folder.isSpecialGallery && folder.coverImage) {
    return (
      <div className="relative w-full h-28 sm:h-32 flex items-center justify-center pointer-events-none">
        {/* Subtle ground glow */}
        <div className="absolute bottom-1 w-24 h-4 bg-emerald-500/20 blur-lg rounded-full" />
        
        {/* Staged photo preview mimicking the mini fan-out - completely free in space */}
        <div className="relative w-28 h-20 transition-transform duration-300 group-hover:scale-108 group-hover:-translate-y-1">
          {/* Back folder flap */}
          <div className="absolute -top-3 left-1 w-12 h-4 rounded-t-lg bg-gradient-to-t from-[#1a1a1a] to-[#2a2a2a] border-t border-l border-r border-white/20" />
          <div className="absolute -top-1 left-0 right-0 h-16 rounded-lg bg-gradient-to-b from-[#222] to-[#111] border border-white/10 opacity-85 shadow-md" />

          {/* Secondary back photo edge */}
          <div className="absolute -top-1.5 right-1 w-20 h-16 rounded-lg overflow-hidden border border-white/20 shadow-[0_8px_16px_rgba(0,0,0,0.6)] transform rotate-8 opacity-80 pointer-events-none">
            <img 
              src={folder.photos?.[1]?.image || folder.coverImage} 
              alt="Back preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Main front photo card */}
          <div className="absolute top-0 left-0 w-24 h-18 rounded-lg overflow-hidden border border-white/30 shadow-[0_12px_24px_rgba(0,0,0,0.8)] transform -rotate-3 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1">
            <img 
              src={folder.coverImage} 
              alt={folder.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Front folder base edge */}
          <div className="absolute bottom-0 left-0 right-0 h-8 rounded-b-xl bg-gradient-to-b from-[#2a2a2a]/95 to-[#111] border-b border-l border-r border-white/20 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)] flex items-center justify-center">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Define gradients and glow colors based on theme
  const getThemeStyles = () => {
    switch (folder.folderTheme) {
      case 'purple':
        return {
          back: 'from-[#581c87] to-[#3b0764]',
          front: 'from-[#9333ea] via-[#7e22ce] to-[#581c87]',
          glow: 'rgba(147, 51, 234, 0.4)',
          border: 'border-purple-400/40',
          badge: 'bg-purple-950/40 text-purple-200'
        };
      case 'blue':
        return {
          back: 'from-[#1e3a8a] to-[#172554]',
          front: 'from-[#2563eb] via-[#1d4ed8] to-[#1e40af]',
          glow: 'rgba(37, 99, 235, 0.4)',
          border: 'border-blue-400/40',
          badge: 'bg-blue-950/40 text-blue-200'
        };
      case 'emerald':
        return {
          back: 'from-[#064e3b] to-[#022c22]',
          front: 'from-[#10b981] via-[#059669] to-[#047857]',
          glow: 'rgba(16, 185, 129, 0.4)',
          border: 'border-emerald-400/40',
          badge: 'bg-emerald-950/40 text-emerald-200'
        };
      case 'amber':
      case 'gold':
        return {
          back: 'from-[#78350f] to-[#451a03]',
          front: 'from-[#d97706] via-[#b45309] to-[#92400e]',
          glow: 'rgba(217, 119, 6, 0.4)',
          border: 'border-amber-400/40',
          badge: 'bg-amber-950/40 text-amber-200'
        };
      case 'cyan':
        return {
          back: 'from-[#164e63] to-[#083344]',
          front: 'from-[#06b6d4] via-[#0891b2] to-[#0e7490]',
          glow: 'rgba(6, 182, 212, 0.4)',
          border: 'border-cyan-400/40',
          badge: 'bg-cyan-950/40 text-cyan-200'
        };
      case 'magenta':
        return {
          back: 'from-[#831843] to-[#500724]',
          front: 'from-[#db2777] via-[#be185d] to-[#9d174d]',
          glow: 'rgba(219, 39, 119, 0.4)',
          border: 'border-pink-400/40',
          badge: 'bg-pink-950/40 text-pink-200'
        };
      case 'steel':
        return {
          back: 'from-[#334155] to-[#1e293b]',
          front: 'from-[#64748b] via-[#475569] to-[#334155]',
          glow: 'rgba(100, 116, 139, 0.35)',
          border: 'border-slate-400/40',
          badge: 'bg-slate-900/40 text-slate-200'
        };
      case 'violet':
      case 'deep-purple':
        return {
          back: 'from-[#4c1d95] to-[#2e1065]',
          front: 'from-[#7c3aed] via-[#6d28d9] to-[#5b21b6]',
          glow: 'rgba(124, 58, 237, 0.4)',
          border: 'border-violet-400/40',
          badge: 'bg-violet-950/40 text-violet-200'
        };
      case 'azure':
        return {
          back: 'from-[#0369a1] to-[#082f49]',
          front: 'from-[#0284c7] via-[#0369a1] to-[#075985]',
          glow: 'rgba(2, 132, 199, 0.4)',
          border: 'border-sky-400/40',
          badge: 'bg-sky-950/40 text-sky-200'
        };
      case 'dark-box':
        return {
          back: 'from-[#27272a] to-[#18181b]',
          front: 'from-[#52525b] via-[#3f3f46] to-[#27272a]',
          glow: 'rgba(161, 161, 170, 0.3)',
          border: 'border-zinc-400/40',
          badge: 'bg-zinc-900/40 text-zinc-200'
        };
      case 'orange':
        return {
          back: 'from-[#7c2d12] to-[#431407]',
          front: 'from-[#ea580c] via-[#c2410c] to-[#9a3412]',
          glow: 'rgba(234, 88, 12, 0.4)',
          border: 'border-orange-400/40',
          badge: 'bg-orange-950/40 text-orange-200'
        };
      case 'teal':
        return {
          back: 'from-[#134e4a] to-[#042f2e]',
          front: 'from-[#0d9488] via-[#0f766e] to-[#115e59]',
          glow: 'rgba(13, 148, 136, 0.4)',
          border: 'border-teal-400/40',
          badge: 'bg-teal-950/40 text-teal-200'
        };
      default:
        return {
          back: 'from-[#1e293b] to-[#0f172a]',
          front: 'from-[#334155] via-[#1e293b] to-[#0f172a]',
          glow: 'rgba(255, 255, 255, 0.2)',
          border: 'border-white/30',
          badge: 'bg-black/40 text-white'
        };
    }
  };

  const theme = getThemeStyles();

  // Render centered icon
  const renderIcon = () => {
    switch (folder.iconType) {
      case 'document':
      case 'resources':
      case 'administrative':
        return <FileText className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'team':
        return <Users className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'education':
        return <GraduationCap className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'finance':
        return <Coins className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'marketing':
        return <Megaphone className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'personal':
        return <User className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'partners':
        return <Handshake className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'archive':
        return <Archive className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'events':
        return <Calendar className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'system':
        return <Settings className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      case 'misc':
        return <MoreHorizontal className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-28 sm:h-32 flex items-center justify-center pointer-events-none">
      {/* 3D Glossy Folder Representation */}
      <div 
        className="relative w-28 h-20 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1"
        style={{
          filter: `drop-shadow(0 10px 20px ${theme.glow})`
        }}
      >
        {/* Back folder flap (tab at top left) */}
        <div 
          className={`absolute top-0 left-2 w-12 h-4 rounded-t-lg bg-gradient-to-t ${theme.back} border-t border-l border-r border-white/20`} 
        />
        <div 
          className={`absolute top-2 left-0 right-0 h-16 rounded-lg bg-gradient-to-b ${theme.back} border border-white/15 opacity-90`} 
        />

        {/* Front flap with glossy 3D shine and angled top */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-16 rounded-xl bg-gradient-to-b ${theme.front} border ${theme.border} shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center`}
        >
          {/* Top highlight shine line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          
          {/* Diagonal glass reflection */}
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/15 to-transparent rotate-12 pointer-events-none" />

          {/* Centered icon */}
          <div className="relative z-10 flex items-center justify-center">
            {renderIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}
