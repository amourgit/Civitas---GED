import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';
import { PORTAL_MOCK_DATA, HeroMosaicTile } from '../../data/portalMockData';

interface HeroMosaicGridProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
}

export function HeroMosaicGrid({ onShowToast }: HeroMosaicGridProps) {
  const navigate = useNavigate();

  const handleTileClick = (tile: HeroMosaicTile) => {
    playXboxSound('select');
    if (tile.route) {
      navigate(tile.route);
    } else {
      onShowToast?.(`Article ouvert : "${tile.title}"`, 'info');
    }
  };

  const mainTile = PORTAL_MOCK_DATA.heroTiles.find(t => t.position === 'hero-main')!;
  const midTopTile = PORTAL_MOCK_DATA.heroTiles.find(t => t.position === 'mid-top')!;
  const midBottomTile = PORTAL_MOCK_DATA.heroTiles.find(t => t.position === 'mid-bottom')!;
  const rightTopTile = PORTAL_MOCK_DATA.heroTiles.find(t => t.position === 'right-top')!;
  const rightBottomTile = PORTAL_MOCK_DATA.heroTiles.find(t => t.position === 'right-bottom')!;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Section Heading "À la Une" */}
      <div className="w-full pt-2 pb-1 px-1 sm:px-2">
        <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          À la Une
        </h2>
      </div>

      {/* 5-Tile Mosaic Hero Grid with pure CSS grid layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1 sm:gap-1.5 auto-rows-fr">
        
        {/* 1. Main Large Hero Tile (Left 6 Cols, Span 2 Rows) */}
        <motion.div
          whileHover={{ scale: 1.008 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleTileClick(mainTile)}
          className="lg:col-span-6 lg:row-span-2 relative overflow-hidden cursor-pointer group shadow-xl border border-white/10 min-h-[280px] sm:min-h-[340px] bg-slate-900 rounded-none flex flex-col justify-end"
        >
          <img
            src={mainTile.imageUrl}
            alt={mainTile.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          
          <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md group-hover:text-teal-200 transition-colors">
              {mainTile.title}
            </h3>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 group-hover:text-teal-200 transition-colors">
              <span>{mainTile.linkText || 'Learn more →'}</span>
            </div>
          </div>
        </motion.div>

        {/* 2. Middle Top Tile (Col-span 3, Row 1) */}
        <motion.div
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleTileClick(midTopTile)}
          className="lg:col-span-3 lg:row-span-1 relative overflow-hidden cursor-pointer group shadow-lg border border-white/10 min-h-[160px] bg-slate-900 rounded-none flex flex-col justify-end"
        >
          <img
            src={midTopTile.imageUrl}
            alt={midTopTile.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 p-3.5 sm:p-4">
            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-md group-hover:text-teal-200 transition-colors line-clamp-3">
              {midTopTile.title}
            </h4>
          </div>
        </motion.div>

        {/* 3. Right Top Tile (Col-span 3, Row 1) */}
        <motion.div
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleTileClick(rightTopTile)}
          className="lg:col-span-3 lg:row-span-1 relative overflow-hidden cursor-pointer group shadow-lg border border-white/10 min-h-[160px] bg-slate-900 rounded-none flex flex-col justify-end"
        >
          <img
            src={rightTopTile.imageUrl}
            alt={rightTopTile.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 p-3.5 sm:p-4">
            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-md group-hover:text-teal-200 transition-colors line-clamp-3">
              {rightTopTile.title}
            </h4>
          </div>
        </motion.div>

        {/* 4. Middle Bottom Tile (Col-span 3, Row 2) */}
        <motion.div
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleTileClick(midBottomTile)}
          className="lg:col-span-3 lg:row-span-1 relative overflow-hidden cursor-pointer group shadow-lg border border-white/10 min-h-[160px] bg-slate-900 rounded-none flex flex-col justify-end"
        >
          <img
            src={midBottomTile.imageUrl}
            alt={midBottomTile.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 p-3.5 sm:p-4">
            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-md group-hover:text-teal-200 transition-colors line-clamp-3">
              {midBottomTile.title}
            </h4>
          </div>
        </motion.div>

        {/* 5. Right Bottom Tile (Col-span 3, Row 2) */}
        <motion.div
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.2 }}
          onClick={() => handleTileClick(rightBottomTile)}
          className="lg:col-span-3 lg:row-span-1 relative overflow-hidden cursor-pointer group shadow-lg border border-white/10 min-h-[160px] bg-slate-900 rounded-none flex flex-col justify-end"
        >
          <img
            src={rightBottomTile.imageUrl}
            alt={rightBottomTile.title}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 p-3.5 sm:p-4">
            <h4 className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-md group-hover:text-teal-200 transition-colors line-clamp-3">
              {rightBottomTile.title}
            </h4>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
