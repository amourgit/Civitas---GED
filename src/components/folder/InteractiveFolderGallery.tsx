"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, ChevronRight } from "lucide-react";
import { playXboxSound } from "../../utils/xboxAudio";

export interface GalleryPhoto {
  id: string | number;
  image: string;
}

const defaultPhotos: GalleryPhoto[] = [
  { id: 1, image: "https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg" },
  { id: 2, image: "https://cdn.21st.dev/assets/mirror/e7/e7138a367854517395ba458c0c7c6481cf28afdc227b7d0045973e03e5b1d1c0.jpg" },
  { id: 3, image: "https://cdn.21st.dev/assets/mirror/96/9626c87f656eaa15e08486db4e7ecc217c0243440a21d301a3af6c8092b22a9b.jpg" },
  { id: 4, image: "https://cdn.21st.dev/assets/mirror/da/dacbcb481226af6c6e6bf6426da535ce260db87270fb641953617ffe4a1145bf.jpg" },
  { id: 5, image: "https://cdn.21st.dev/assets/mirror/6e/6e5ed03abf45ab11ad4c94b60bb3cb60326807a1777b2a6e8888d3179f237cd9.jpg" },
];

export interface InteractiveFolderGalleryProps {
  photos?: GalleryPhoto[];
  folderName?: string;
  matricule?: string;
  dragHintText?: string;
  className?: string;
  onViewMore?: () => void;
}

export function InteractiveFolderGallery({
  photos = defaultPhotos,
  folderName = "Photography.gallery",
  matricule = "3920184715",
  dragHintText = "Drag any photo down to close",
  className,
  onViewMore
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(() => 
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const displayMatricule = matricule || "3920184715";

  React.useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;

  return (
    <div className={`w-full relative overflow-visible pt-1 sm:pt-2 md:pt-3 lg:pt-5 xl:pt-8 ${className || ""}`}>
      <div className="relative w-full flex flex-col items-center justify-center overflow-visible">

        {/* Responsive folder container size: calibrated so open/hover states never collide in grid layouts */}
        <div className="relative w-[140px] sm:w-[170px] md:w-[195px] lg:w-[220px] xl:w-[240px] h-[120px] sm:h-[145px] md:h-[160px] lg:h-[185px] xl:h-[200px] flex justify-center pointer-events-none z-0 overflow-visible">

          {/* Folder Back (le dos du dossier avec gravure manuscrite sans background) */}
          <motion.div 
            className="absolute bottom-2 sm:bottom-3 md:bottom-3.5 lg:bottom-4 w-[134px] sm:w-[164px] md:w-[188px] lg:w-[212px] xl:w-[232px] h-22 sm:h-28 md:h-32 lg:h-38 xl:h-42 drop-shadow-xl"
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.92 : 1 }}
          >
            {/* Onglet / dos supérieur avec matricule gravé */}
            <div className="absolute top-0 left-0 w-16 sm:w-22 md:w-26 lg:w-32 h-3.5 sm:h-4.5 md:h-5 lg:h-6 bg-linear-to-t from-[#1e1e1e] to-[#2a2a2a] rounded-t-md sm:rounded-t-lg lg:rounded-t-xl border-t border-l border-r border-white/10 flex items-center px-1.5 sm:px-2 overflow-visible">
              <span className="font-handwriting text-amber-200/95 text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-bold tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] opacity-90 select-none whitespace-nowrap rotate-[-1deg]">
                #{displayMatricule}
              </span>
            </div>
            <div className="absolute top-3 sm:top-3.5 md:top-4 lg:top-5 left-0 right-0 bottom-0 bg-linear-to-b from-[#1e1e1e] to-[#0a0a0a] rounded-b-md sm:rounded-b-lg lg:rounded-b-xl rounded-tr-md sm:rounded-tr-lg lg:rounded-tr-xl border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
            <div className="absolute top-4 sm:top-5 md:top-6 lg:top-7 left-1 sm:left-1.5 md:left-2 right-1 sm:right-1.5 md:right-2 bottom-1 sm:bottom-1.5 md:bottom-2 bg-black rounded-sm sm:rounded-md lg:rounded-lg shadow-inner pointer-events-none" />
          </motion.div>

          {/* Photos Stack */}
          <div className="absolute bottom-2.5 sm:bottom-3 md:bottom-4 lg:bottom-5 z-10 flex justify-center">
            {photos.map((photo, i) => {
              const offset = i - 2;

              // Controlled offsets tuned so adjacent cards in grid never overlap
              const stackY = hoverFolder 
                ? (isMobile ? offset * -2 - 6 : isTablet ? offset * -3 - 10 : offset * -4 - 14)
                : (isMobile ? offset * -1.2 : isTablet ? offset * -1.8 : offset * -2.5);

              const stackX = hoverFolder 
                ? (isMobile ? offset * 3.5 : isTablet ? offset * 5.5 : offset * 7)
                : (isMobile ? offset * 0.8 : isTablet ? offset * 1.2 : offset * 1.6);

              const stackRotate = hoverFolder 
                ? (isMobile ? offset * 2 : isTablet ? offset * 3 : offset * 4)
                : (isMobile ? offset * 0.8 : offset * 1.5);

              const stackScale = 1 - Math.abs(offset) * 0.025;

              const openY = isMobile ? -26 : isTablet ? -38 : -50;
              const openX = isMobile ? offset * 11 : isTablet ? offset * 16 : offset * 22;
              const openRotate = offset * 1.5;
              const openScale = isMobile ? 0.9 : isTablet ? 0.94 : 0.98;

              return (
                <motion.div
                  key={photo.id}
                  drag={isFolderOpen ? true : false}
                  dragSnapToOrigin={true}
                  onDragEnd={(e, info) => {
                    if (info.offset.y > 45 && isFolderOpen) {
                      setIsFolderOpen(false);
                      setHoverFolder(false);
                    }
                  }}
                  className={`absolute bottom-0 w-16 h-24 sm:w-20 sm:h-30 md:w-24 md:h-34 lg:w-28 lg:h-40 xl:w-30 xl:h-42 rounded-md sm:rounded-lg lg:rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 origin-bottom ${isFolderOpen ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"}`}
                  animate={!isFolderOpen ? {
                    y: stackY,
                    x: stackX,
                    rotate: stackRotate,
                    scale: stackScale,
                    zIndex: i + 10
                  } : {
                    y: openY,
                    x: openX,
                    rotate: openRotate,
                    scale: openScale,
                    zIndex: 50
                  }}
                  whileHover={isFolderOpen ? { scale: openScale + 0.05, zIndex: 100 } : {}}
                  whileDrag={isFolderOpen ? { scale: openScale + 0.1, rotate: 5, zIndex: 150 } : {}}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <img src={photo.image} alt="Gallery item" className="w-full h-full object-cover pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          {/* Front Flap */}
          <motion.div 
            className="absolute bottom-0 w-[134px] sm:w-[164px] md:w-[188px] lg:w-[212px] xl:w-[232px] h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 drop-shadow-[0_-8px_16px_rgba(0,0,0,0.8)] cursor-pointer z-20 pointer-events-auto"
            style={{ transformOrigin: "bottom" }}
            animate={{ 
              opacity: isFolderOpen ? 0 : 1, 
              rotateX: hoverFolder ? -18 : 0, 
              y: hoverFolder ? 3 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto" 
            }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="w-full h-full bg-linear-to-b from-[#2a2a2a] to-[#111] rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/20 shadow-[inset_0_2px_8px_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col items-center justify-between p-1.5 sm:p-2 md:p-2.5 pb-2 sm:pb-3 md:pb-3.5 lg:pb-4">
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

              {/* Gravure manuscrite libre du matricule sur la tranche supérieure du volet */}
              <div className="w-full flex justify-end pr-1 sm:pr-1.5 pt-0.5 pointer-events-none select-none">
                <span className="font-handwriting text-emerald-300/90 text-[9px] sm:text-[11px] md:text-xs lg:text-sm font-bold tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] opacity-90 rotate-[-1.5deg]">
                  N° {displayMatricule}
                </span>
              </div>

              {/* Titre du dossier libre */}
              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center justify-center max-w-[95%] truncate">
                <span className="text-white/95 text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs font-medium tracking-wide truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {folderName}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bouton "Voir plus" - Visible quand le dossier est ouvert */}
          <motion.div 
            className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 z-30 flex items-center justify-center pointer-events-none"
            animate={{ 
              opacity: isFolderOpen ? 1 : 0, 
              y: isFolderOpen ? 0 : 8,
              scale: isFolderOpen ? 1 : 0.85
            }}
            transition={{ duration: 0.22, delay: isFolderOpen ? 0.08 : 0 }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playXboxSound('select');
                if (onViewMore) {
                  onViewMore();
                }
              }}
              className={`pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-black font-semibold text-[10px] sm:text-xs shadow-[0_4px_16px_rgba(16,185,129,0.55)] hover:shadow-[0_4px_22px_rgba(16,185,129,0.75)] border border-emerald-300/60 cursor-pointer transition-all ${
                isFolderOpen ? '' : 'pointer-events-none'
              }`}
            >
              <FolderOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Voir plus</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-70" />
            </button>
          </motion.div>
        </div>

        {/* Drag to close hint */}
        <motion.div 
          animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 8 }}
          className="absolute -bottom-5 sm:-bottom-6 md:-bottom-7 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md text-black/50 dark:text-white/50 text-[8px] sm:text-[9px] md:text-[10px] font-medium uppercase tracking-widest pointer-events-none z-30"
        >
          {dragHintText}
        </motion.div>

      </div>
    </div>
  );
}

export { InteractiveFolderGallery as Component };
