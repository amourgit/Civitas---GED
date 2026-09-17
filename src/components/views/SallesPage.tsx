import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Info, X, Shield, HardDrive, Layers, FileText, MapPin, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [openInfoId, setOpenInfoId] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative select-none min-h-0">
      {/* Système d'arrière-plan modulaire de page avec support de surcharge et injection CSS */}
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
        subtitle="Niveau 1 — Cliquez sur une salle pour inspecter ses rayonnages et unités"
      />

      {/* Main Viewport Content */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 sm:px-4 md:px-6 py-2 sm:py-3.5 md:py-4 pb-12 sm:pb-16 min-h-0 relative z-10"
        data-scrollable="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {SALLES.map((salle) => {
            const isInfoOpen = openInfoId === salle.id;

            return (
              <div
                key={salle.id}
                onClick={() => {
                  playXboxSound('select');
                  navigate(buildSalleUrl(salle.id));
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    playXboxSound('select');
                    navigate(buildSalleUrl(salle.id));
                  }
                }}
                className="group relative overflow-hidden rounded-2xl p-4 sm:p-5 md:p-6 bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/20 hover:border-emerald-400/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.35)] transition-all duration-300 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] md:min-h-[200px] cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
              >
                {/* Lueur supérieure subtile */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                {/* Contenu principal de la carte */}
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Header de la carte : Matricule, Sécurité & Bouton Exclamation */}
                    <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 text-xs font-mono rounded-lg font-bold backdrop-blur-md shadow-sm flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          {salle.matricule}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                          salle.securityLevel === 'Secret' 
                            ? 'bg-red-950/70 border-red-400/60 text-red-200'
                            : 'bg-amber-950/70 border-amber-400/60 text-amber-200'
                        }`}>
                          {salle.securityLevel}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* Bouton Exclamation pour afficher les informations supplémentaires */}
                        <button
                          type="button"
                          aria-label={`Informations supplémentaires sur ${salle.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            playXboxSound('toggle');
                            setOpenInfoId(isInfoOpen ? null : salle.id);
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

                    {/* Titre & Localisation */}
                    <div className="mt-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow-sm flex items-center gap-2">
                        {salle.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 mt-1 line-clamp-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{salle.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Compteurs minimaux épurés en bas */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-xs font-mono text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <strong className="text-white">{salle.rayonCount}</strong> rayons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <strong className="text-emerald-300">{salle.fileCount}</strong> documents
                    </span>
                    <span className="hidden sm:inline-block text-[11px] text-white/60">
                      {salle.status}
                    </span>
                  </div>
                </div>

                {/* Volet d'informations supplémentaires animé (au-dessus du card) */}
                <AnimatePresence>
                  {isInfoOpen && (
                    <motion.div
                      key={`info-${salle.id}`}
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
                              Fiche Technique • {salle.matricule}
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
                          {salle.description}
                        </p>

                        {/* Grille détaillée des caractéristiques */}
                        <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] font-mono">
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Emplacement :</span>
                            <span className="text-white font-medium truncate block">{salle.location}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Sécurité :</span>
                            <span className="text-emerald-300 font-medium block">{salle.securityLevel}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Capacité :</span>
                            <span className="text-white font-medium block">{salle.storageCapacity}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-black/40 border border-white/10">
                            <span className="text-white/60 block text-[10px]">Statut système :</span>
                            <span className="text-emerald-400 font-medium block">{salle.status}</span>
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
