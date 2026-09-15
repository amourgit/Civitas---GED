import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, ArrowLeft, AlertCircle } from 'lucide-react';
import { 
  getRayonById, 
  getSalleById, 
  getCasiersForRayon, 
  buildDocumentationUrl, 
  buildSalleUrl, 
  buildCasierUrl 
} from '../../data/archiveStructure';
import { ArchiveHeaderPipeline } from '../archive/ArchiveHeaderPipeline';
import { PageBackground, cn } from '../shell/PageBackground';
import { playXboxSound } from '../../utils/xboxAudio';

export interface CasiersPageProps {
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

export function CasiersPage({
  customBackground,
  backgroundClassName,
  backgroundImageClassName,
  backgroundOverlayClassName,
}: CasiersPageProps = {}) {
  const { salleId, rayonId } = useParams<{ salleId?: string; rayonId: string }>();
  const navigate = useNavigate();

  const rayon = getRayonById(rayonId);
  const salle = (salleId ? getSalleById(salleId) : undefined) || (rayon ? getSalleById(rayon.salleId) : undefined);
  const casiers = rayon ? getCasiersForRayon(rayon.id) : [];
  const finalSalleId = salle ? salle.id : 's01';

  if (!rayon) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-2">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Rayon introuvable</h2>
        <p className="text-sm text-white/50 max-w-md">
          Le rayon identifié par « {rayonId} » n'existe pas dans la structure documentaire.
        </p>
        <button
          type="button"
          onClick={() => {
            playXboxSound('back');
            navigate(buildDocumentationUrl());
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux salles de documentation</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative select-none min-h-0">
      {/* Système d'arrière-plan modulaire de page avec support de surcharge et injection CSS (lumineux, sans voile sombre imposé) */}
      <PageBackground
        customComponent={customBackground}
        imageSrc="/assets/cover_casier.jpg"
        imageAlt="Casiers métalliques d'archives"
        className={backgroundClassName}
        imageClassName={cn('opacity-100 object-cover', backgroundImageClassName)}
        overlayClassName={backgroundOverlayClassName}
        showAtmosphere={false}
      />

      {/* Dynamic Archive Header Pipeline */}
      <ArchiveHeaderPipeline
        currentLevel="casier"
        salle={salle}
        rayon={rayon}
        title={`Casiers du rayon : ${rayon.name}`}
        subtitle={`Niveau 3 — ${rayon.rowNumber} • Matériau : ${rayon.material}`}
        backTo={buildSalleUrl(finalSalleId)}
        backLabel={salle ? `Retour à la salle (${salle.matricule})` : 'Retour aux salles'}
      />

      {/* Main Viewport Content */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 sm:px-4 md:px-6 py-2 sm:py-3.5 md:py-4 pb-12 sm:pb-16 min-h-0 relative z-10"
        data-scrollable="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 md:gap-4">
          {casiers.map((casier) => (
            <div
              key={casier.id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border border-white/25 hover:border-emerald-400/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.3)] transition-all duration-300 flex flex-col justify-between min-h-[190px] sm:min-h-[220px] md:min-h-[240px] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent"
            >
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* HUD Header */}
                  <div className="flex items-center justify-between mb-2 sm:mb-2.5 md:mb-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-500/25 text-emerald-300 border border-emerald-400/60 text-[10px] sm:text-[11px] font-mono rounded-lg font-bold backdrop-blur-md shadow-sm flex items-center gap-1 sm:gap-1.5">
                        <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {casier.matricule}
                      </span>
                      <span className="text-[10px] sm:text-xs text-white/90 font-mono px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-black/35 border border-white/20 backdrop-blur-md">
                        Conteneurs : {casier.boxCount} boîtes
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mt-1 sm:mt-1.5 md:mt-2">
                    <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                      {casier.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs md:text-sm text-white/85 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none drop-shadow-sm">
                      {casier.description}
                    </p>
                  </div>

                  {/* Subtitle properties with clean glass plate */}
                  <div className="mt-2.5 sm:mt-3.5 md:mt-4 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-black/35 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] md:text-xs font-mono text-white flex items-center justify-between">
                    <div>
                      <span className="text-white/70 text-[9px] sm:text-[10px] md:text-[11px]">Type :</span>
                      <span className="text-white font-semibold ml-1 sm:ml-1.5">{casier.lockerType}</span>
                    </div>
                    <span className="text-emerald-300 font-bold drop-shadow">{casier.folderIds.length} Dossier(s)</span>
                  </div>
                </div>

                {/* Action */}
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('select');
                    navigate(buildCasierUrl(finalSalleId, rayon.id, casier.id));
                  }}
                  className="w-full mt-3 sm:mt-4 md:mt-5 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-500/90 hover:bg-emerald-400 border border-emerald-300/70 text-black text-[11px] sm:text-xs md:text-sm font-extrabold transition-all cursor-pointer shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] active:scale-[0.99] backdrop-blur-md"
                >
                  <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Consulter les dossiers ({casier.matricule})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
