import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DoorOpen, Building2 } from 'lucide-react';
import { SALLES, buildSalleUrl } from '../../data/archiveStructure';
import { ArchiveHeaderPipeline } from '../archive/ArchiveHeaderPipeline';
import { PageBackground, cn } from '../shell/PageBackground';
import { playXboxSound } from '../../utils/xboxAudio';

export interface SallesPageProps {
  /**
   * Surcharge par un composant React custom passé en props.
   * Si ce composant existe, il surcharge l'arrière-plan par défaut.
   */
  customBackground?: React.ReactNode;
  /**
   * Injection CSS sur le composant par défaut (conteneur racine)
   */
  backgroundClassName?: string;
  /**
   * Injection CSS sur l'image par défaut
   */
  backgroundImageClassName?: string;
  /**
   * Injection CSS sur la couche de superposition par défaut
   */
  backgroundOverlayClassName?: string;
}

export function SallesPage({
  customBackground,
  backgroundClassName,
  backgroundImageClassName,
  backgroundOverlayClassName,
}: SallesPageProps = {}) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative select-none min-h-0">
      {/* Système d'arrière-plan modulaire de page avec support de surcharge et injection CSS (lumineux, sans voile sombre imposé) */}
      <PageBackground
        customComponent={customBackground}
        imageSrc="/assets/cover_salle.jpg"
        imageAlt="Salle d'archivage physique"
        className={backgroundClassName}
        imageClassName={cn('opacity-100 object-cover', backgroundImageClassName)}
        overlayClassName={backgroundOverlayClassName}
        showAtmosphere={false}
      />

      {/* Dynamic Archive Header Pipeline */}
      <ArchiveHeaderPipeline
        currentLevel="salle"
        title="Parcours de Documentation : Salles d'Archivage"
        subtitle="Niveau 1 — Choisissez une salle pour inspecter ses rayonnages et unités"
      />

      {/* Main Viewport Content */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 sm:px-4 md:px-6 py-2 sm:py-3.5 md:py-4 pb-12 sm:pb-16 min-h-0 relative z-10"
        data-scrollable="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 md:gap-4">
          {SALLES.map((salle) => (
            <div
              key={salle.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border border-white/25 hover:border-emerald-400/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between min-h-[190px] sm:min-h-[220px] md:min-h-[240px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* HUD Header */}
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5 md:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-500/25 text-emerald-300 border border-emerald-400/60 text-[10px] sm:text-[11px] font-mono rounded-lg font-bold backdrop-blur-md shadow-sm flex items-center gap-1 sm:gap-1.5">
                        <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {salle.matricule}
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/90 font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-black/35 border border-white/20 backdrop-blur-md">
                        {salle.location}
                      </span>
                    </div>
                    <span className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow ${
                      salle.securityLevel === 'Secret' 
                        ? 'bg-red-950/70 border border-red-400/60 text-red-200'
                        : 'bg-amber-950/70 border border-amber-400/60 text-amber-200'
                    }`}>
                      {salle.securityLevel}
                    </span>
                  </div>

                  {/* Core Title */}
                  <div className="mt-1 sm:mt-1.5 md:mt-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                      {salle.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-white/85 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none drop-shadow-sm">
                      {salle.description}
                    </p>
                  </div>

                  {/* Metrics Footer */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-2.5 mt-2.5 sm:mt-3.5 md:mt-4 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-black/35 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] md:text-xs font-mono text-white">
                    <div className="flex flex-col">
                      <span className="text-white/70 text-[9px] sm:text-[10px] md:text-[11px]">Capacité</span>
                      <span className="text-white font-semibold mt-0.5 truncate">{salle.storageCapacity}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/70 text-[9px] sm:text-[10px] md:text-[11px]">Rayons</span>
                      <span className="text-white font-semibold mt-0.5">{salle.rayonCount} unités</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/70 text-[9px] sm:text-[10px] md:text-[11px]">Fichiers</span>
                      <span className="text-emerald-300 font-semibold mt-0.5">{salle.fileCount} docs</span>
                    </div>
                  </div>
                </div>

                {/* Call To Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('select');
                    navigate(buildSalleUrl(salle.id));
                  }}
                  className="w-full mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-500/90 hover:bg-emerald-400 border border-emerald-300/70 text-black text-[11px] sm:text-xs md:text-sm font-extrabold transition-all cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] active:scale-[0.99] backdrop-blur-md"
                >
                  <DoorOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Ouvrir la salle ({salle.matricule})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
