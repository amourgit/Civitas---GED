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

        {/* Responsive folder container size: compact for 2-col mobile & 3-col tablet */}
        <div className="relative w-[145px] sm:w-[185px] md:w-[215px] lg:w-[280px] xl:w-[320px] h-[125px] sm:h-[155px] md:h-[175px] lg:h-[220px] xl:h-[250px] flex justify-center pointer-events-none z-0 overflow-visible">

          {/* Folder Back (le dos du dossier avec gravure manuscrite sans background) */}
          <motion.div 
            className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 w-[138px] sm:w-[178px] md:w-[205px] lg:w-[270px] xl:w-[305px] h-24 sm:h-32 md:h-36 lg:h-46 xl:h-52 drop-shadow-xl"
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
          >
            {/* Onglet / dos supérieur avec matricule gravé */}
            <div className="absolute top-0 left-0 w-18 sm:w-26 md:w-32 lg:w-40 h-3.5 sm:h-5 md:h-6 lg:h-8 bg-linear-to-t from-[#1e1e1e] to-[#2a2a2a] rounded-t-md sm:rounded-t-lg lg:rounded-t-xl border-t border-l border-r border-white/10 flex items-center px-1.5 sm:px-2 overflow-visible">
              <span className="font-handwriting text-amber-200/95 text-[10px] sm:text-xs md:text-sm lg:text-base font-bold tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] opacity-90 select-none whitespace-nowrap rotate-[-1deg]">
                #{displayMatricule}
              </span>
            </div>
            <div className="absolute top-3 sm:top-4 md:top-5 lg:top-7 left-0 right-0 bottom-0 bg-linear-to-b from-[#1e1e1e] to-[#0a0a0a] rounded-b-md sm:rounded-b-lg lg:rounded-b-xl rounded-tr-md sm:rounded-tr-lg lg:rounded-tr-xl border border-white/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />
            <div className="absolute top-4 sm:top-6 md:top-7 lg:top-9 left-1 sm:left-1.5 md:left-2 right-1 sm:right-1.5 md:right-2 bottom-1 sm:bottom-1.5 md:bottom-2 bg-black rounded-sm sm:rounded-md lg:rounded-lg shadow-inner pointer-events-none" />
          </motion.div>

          {/* Photos Stack */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 z-10 flex justify-center">
            {photos.map((photo, i) => {
              const offset = i - 2;

              // Responsive offsets tuned for 2-col mobile and 3-col tablet
              const stackY = hoverFolder 
                ? (isMobile ? offset * -2.5 - 10 : isTablet ? offset * -4 - 16 : offset * -7 - 28)
                : (isMobile ? offset * -1.5 : isTablet ? offset * -2.5 : offset * -4);

              const stackX = hoverFolder 
                ? (isMobile ? offset * 6 : isTablet ? offset * 12 : offset * 22)
                : (isMobile ? offset * 1 : isTablet ? offset * 1.5 : offset * 2.5);

              const stackRotate = hoverFolder 
                ? (isMobile ? offset * 3 : isTablet ? offset * 5 : offset * 7)
                : (isMobile ? offset * 1 : offset * 2);

              const stackScale = 1 - Math.abs(offset) * 0.03;

              const openY = isMobile ? -36 : isTablet ? -56 : -96;
              const openX = isMobile ? offset * 18 : isTablet ? offset * 32 : offset * 65;
              const openRotate = 0;
              const openScale = isMobile ? 0.88 : isTablet ? 0.95 : 1.05;

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
                  className={`absolute bottom-0 w-20 h-28 sm:w-26 sm:h-36 md:w-30 md:h-42 lg:w-42 lg:h-58 xl:w-46 xl:h-62 rounded-md sm:rounded-lg lg:rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 origin-bottom ${isFolderOpen ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"}`}
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
            className="absolute bottom-0 w-[138px] sm:w-[178px] md:w-[205px] lg:w-[270px] xl:w-[305px] h-18 sm:h-24 md:h-28 lg:h-36 xl:h-40 drop-shadow-[0_-10px_20px_rgba(0,0,0,0.8)] cursor-pointer z-20 pointer-events-auto"
            style={{ transformOrigin: "bottom" }}
            animate={{ 
              opacity: isFolderOpen ? 0 : 1, 
              rotateX: hoverFolder ? -22 : 0, 
              y: hoverFolder ? 5 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto" 
            }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="w-full h-full bg-linear-to-b from-[#2a2a2a] to-[#111] rounded-lg sm:rounded-xl lg:rounded-2xl border border-white/20 shadow-[inset_0_2px_8px_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col items-center justify-between p-1.5 sm:p-2.5 md:p-3 pb-2.5 sm:pb-3.5 md:pb-4 lg:pb-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

              {/* Gravure manuscrite libre du matricule sur la tranche supérieure du volet (texte libre, calligraphie humaine sans fond) */}
              <div className="w-full flex justify-end pr-1 sm:pr-2 pt-0.5 pointer-events-none select-none">
                <span className="font-handwriting text-emerald-300/90 text-[10px] sm:text-xs md:text-sm lg:text-base font-bold tracking-widest drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] opacity-90 rotate-[-1.5deg]">
                  N° {displayMatricule}
                </span>
              </div>

              {/* Titre du dossier libre sans fond noir */}
              <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 flex items-center justify-center max-w-[95%] truncate">
                <span className="text-white/95 text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-medium tracking-wide truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {folderName}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bouton "Voir plus" - Visible quand le dossier est ouvert, juste en dessous des fichiers alignés */}
          <motion.div 
            className="absolute bottom-1 sm:bottom-2 md:bottom-2.5 z-30 flex items-center justify-center pointer-events-none"
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
