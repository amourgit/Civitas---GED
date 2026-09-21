import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layers, ArrowLeft, AlertCircle, Info, X, Box, FileText, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getSalleById, getRayonsForSalle, buildDocumentationUrl, buildRayonUrl } from '../../data/archiveStructure';
import { ArchiveHeaderPipeline } from '../archive/ArchiveHeaderPipeline';
import { PageBackground, cn } from '../shell/PageBackground';
import { playXboxSound } from '../../utils/xboxAudio';

export interface RayonsPageProps {
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

export function RayonsPage({
  customBackground,
  backgroundClassName,
  backgroundImageClassName,
  backgroundOverlayClassName,
}: RayonsPageProps = {}) {
  const { salleId } = useParams<{ salleId: string }>();
  const navigate = useNavigate();
  const [openInfoId, setOpenInfoId] = useState<string | null>(null);

  const salle = getSalleById(salleId);
  const rayons = salle ? getRayonsForSalle(salle.id) : [];

  if (!salle) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center py-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-2">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Salle d'archivage introuvable</h2>
        <p className="text-sm text-white/50 max-w-md">
          La salle identifiée par « {salleId} » n'existe pas dans le référentiel physique.
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
      {/* Système d'arrière-plan modulaire de page avec support de surcharge et injection CSS */}
      <PageBackground
        customComponent={customBackground}
        imageSrc="/assets/cover_rayon.jpg"
        imageAlt="Rayonnages d'archives"
        className={backgroundClassName}
        imageClassName={cn('opacity-100 object-cover', backgroundImageClassName)}
        overlayClassName={backgroundOverlayClassName}
        showAtmosphere={false}
      />

      {/* Dynamic Archive Header Pipeline */}
      <ArchiveHeaderPipeline
        currentLevel="rayon"
        salle={salle}
        title={`Rayons de la salle : ${salle.name}`}
        subtitle={`Niveau 2 — Cliquez sur un rayon pour inspecter ses casiers • Emplacement : ${salle.location}`}
        backTo={buildDocumentationUrl()}
        backLabel="Retour aux salles"
      />

      {/* Main Viewport Content */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 sm:px-4 md:px-6 py-2 sm:py-3.5 md:py-4 pb-12 sm:pb-16 min-h-0 relative z-10"
        data-scrollable="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {rayons.map((rayon) => {
            const isInfoOpen = openInfoId === rayon.id;

            return (
              <div
                key={rayon.id}
                onClick={() => {
                  playXboxSound('select');
                  navigate(buildRayonUrl(salle.id, rayon.id));
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    playXboxSound('select');
                    navigate(buildRayonUrl(salle.id, rayon.id));
                  }
                }}
                className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 md:p-6 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 hover:border-emerald-400/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.35)] transition-all duration-300 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] md:min-h-[200px] cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
              >
                {/* Lueur supérieure subtile */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Contenu principal de la carte */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Header de la carte : Matricule, Rangée & Bouton Exclamation */}
                    <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 text-xs font-mono rounded-lg font-bold backdrop-blur-md shadow-sm flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5" />
                          {rayon.matricule}
                        </span>
                        <span className="text-[10px] sm:text-xs text-white/90 font-mono px-2 py-0.5 rounded-md bg-black/40 border border-white/20 backdrop-blur-md truncate max-w-[140px] sm:max-w-none">
                          {rayon.rowNumber}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Bouton Exclamation pour afficher les informations supplémentaires */}
                        <button
                          type="button"
                          aria-label={`Informations supplémentaires sur ${rayon.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            playXboxSound('toggle');
                            setOpenInfoId(isInfoOpen ? null : rayon.id);
                          }}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer backdrop-blur-md ${
                            isInfoOpen
                              ? 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.7)]'
                              : 'bg-white/10 hover:bg-emerald-500/20 text-white hover:text-emerald-300 border-white/20 hover:border-emerald-400/60'
                          }`}
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        {/* Indicateur de clic direct */}
                        <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 border border-white/10 group-hover:border-emerald-400/50 flex items-center justify-center text-white/60 group-hover:text-emerald-300 transition-all">
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Titre */}
                    <div className="mt-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow-sm">
                        {rayon.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 mt-1 line-clamp-1">
                        {rayon.material} • {rayon.description}
                      </p>
                    </div>
                  </div>

                  {/* Compteurs minimaux épurés en bas */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-xs font-mono text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5 text-emerald-400" />
                      <strong className="text-white">{rayon.casierCount}</strong> casiers
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <strong className="text-emerald-300">{rayon.fileCount}</strong> fichiers
                    </span>
                    <span className="hidden sm:inline-block text-[11px] text-white/60">
                      {salle.matricule}
                    </span>
                  </div>
                </div>

                {/* Volet d'informations supplémentaires animé (au-dessus du card) */}
                <AnimatePresence>
                  {isInfoOpen && (
                    <motion.div
                      key={`info-${rayon.id}`}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute inset-0 z-30 p-4 sm:p-5 bg-gradient-to-b from-[#0a1518]/95 via-[#03090b]/98 to-[#020506] backdrop-blur-2xl border border-emerald-400/60 rounded-2xl flex flex-col justify-between overflow-y-auto"
                    >
                      <div>
                        {/* En-tête du volet */}
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                              Fiche Rayon • {rayon.matricule}
                            </span>
                          </div>
                          <button
                            type="button"
                            aria-label="Fermer les informations"
                            onClick={(e) => {
                              e.stopPropagation();
                              playXboxSound('back');
                              setOpenInfoId(null);
                            }}
                            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Description complète */}
                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed mt-2.5">
                          {rayon.description}
                        </p>

                        {/* Grille détaillée des caractéristiques */}
                        <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] font-mono">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Salle parente :</span>
                            <span className="text-white font-medium truncate block">{salle.name} ({salle.matricule})</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Rangée / Secteur :</span>
                            <span className="text-emerald-300 font-medium truncate block">{rayon.rowNumber}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Matériau :</span>
                            <span className="text-white font-medium block">{rayon.material}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Casiers intégrés :</span>
                            <span className="text-emerald-400 font-medium block">{rayon.casierCount} unités</span>
                          </div>
                        </div>
                      </div>

                      {/* Action rapide depuis le volet */}
                      <div className="pt-2 mt-2 flex items-center justify-between text-[11px] font-mono text-emerald-300/80">
                        <span>Cliquez sur la carte pour explorer</span>
                        <span className="text-white/50 text-[10px] font-sans">ESC ou ✕ pour fermer</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
