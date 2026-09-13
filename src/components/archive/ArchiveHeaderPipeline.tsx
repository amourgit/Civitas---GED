import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Library, 
  ChevronRight, 
  Search, 
  ArrowLeft 
} from 'lucide-react';
import { 
  SalleItem, 
  RayonItem, 
  CasierItem, 
  resolveMatricule, 
  buildDocumentationUrl, 
  buildSalleUrl, 
  buildRayonUrl, 
  buildCasierUrl 
} from '../../data/archiveStructure';
import { playXboxSound } from '../../utils/xboxAudio';

interface ArchiveHeaderPipelineProps {
  currentLevel: 'salle' | 'rayon' | 'casier' | 'dossier';
  salle?: SalleItem;
  rayon?: RayonItem;
  casier?: CasierItem;
  title: string;
  subtitle?: string;
  backTo?: string;
  backLabel?: string;
  rightAction?: React.ReactNode;
}

export function ArchiveHeaderPipeline({
  currentLevel,
  salle,
  rayon,
  casier,
  title,
  subtitle,
  backTo,
  backLabel = 'Niveau supérieur',
  rightAction
}: ArchiveHeaderPipelineProps) {
  const navigate = useNavigate();
  const [expressMatricule, setExpressMatricule] = useState('');
  const [expressError, setExpressError] = useState('');

  const handleExpressJump = (e: React.FormEvent) => {
    e.preventDefault();
    const result = resolveMatricule(expressMatricule);
    if (result) {
      playXboxSound('select');
      navigate(result.url);
      setExpressMatricule('');
      setExpressError('');
    } else {
      playXboxSound('toastWarning');
      setExpressError('Matricule introuvable (ex: S-01, RY-101, CS-1011)');
      setTimeout(() => setExpressError(''), 4000);
    }
  };

  return (
    <div className="shrink-0 border-b border-white/5 bg-[#030a0d]/40 backdrop-blur-xl z-20 select-none">
      {/* 1. Main Header Row */}
      <div className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 sm:gap-2">
          
          {/* Breadcrumb Navigation Pipeline */}
          <div className="min-w-0 flex-1">
            <nav aria-label="Fil d'Ariane" className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] md:text-xs font-semibold text-white/40 tracking-wider uppercase font-mono">
              <Link 
                to={buildDocumentationUrl()}
                onClick={() => playXboxSound('select')}
                className={`hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 ${
                  currentLevel === 'salle' ? 'text-emerald-400 font-bold' : ''
                }`}
              >
                <Library className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden xs:inline">DOCUMENTATION</span>
                <span className="xs:hidden">DOC</span>
              </Link>

              {salle && (
                <>
                  <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/20 shrink-0" />
                  {currentLevel === 'rayon' ? (
                    <div className="text-emerald-400 font-bold flex items-center gap-1 max-w-[140px] sm:max-w-none truncate">
                      <span className="text-white/20 font-normal hidden sm:inline">SALLE :</span>
                      <span className="text-emerald-500">[{salle.matricule}]</span>
                      <span className="truncate ml-0.5">{salle.name.split(' ')[0]}</span>
                    </div>
                  ) : (
                    <Link 
                      to={buildSalleUrl(salle.id)}
                      onClick={() => playXboxSound('select')}
                      className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 max-w-[140px] sm:max-w-none truncate"
                    >
                      <span className="text-white/20 font-normal hidden sm:inline">SALLE :</span>
                      <span className="text-emerald-500 font-bold">[{salle.matricule}]</span>
                      <span className="truncate ml-0.5">{salle.name.split(' ')[0]}</span>
                    </Link>
                  )}
                </>
              )}

              {rayon && salle && (
                <>
                  <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/20 shrink-0" />
                  {currentLevel === 'casier' ? (
                    <div className="text-emerald-400 font-bold flex items-center gap-1 max-w-[140px] sm:max-w-none truncate">
                      <span className="text-white/20 font-normal hidden sm:inline">RAYON :</span>
                      <span className="text-emerald-500">[{rayon.matricule}]</span>
                      <span className="truncate ml-0.5">{rayon.name.replace('Rayon ', '')}</span>
                    </div>
                  ) : (
                    <Link 
                      to={buildRayonUrl(salle.id, rayon.id)}
                      onClick={() => playXboxSound('select')}
                      className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 max-w-[140px] sm:max-w-none truncate"
                    >
                      <span className="text-white/20 font-normal hidden sm:inline">RAYON :</span>
                      <span className="text-emerald-500 font-bold">[{rayon.matricule}]</span>
                      <span className="truncate ml-0.5">{rayon.name.replace('Rayon ', '')}</span>
                    </Link>
                  )}
                </>
              )}

              {casier && rayon && salle && (
                <>
                  <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/20 shrink-0" />
                  <div className="text-emerald-400 font-bold flex items-center gap-1 max-w-[140px] sm:max-w-none truncate">
                    <span className="text-white/20 font-normal hidden sm:inline">CASIER :</span>
                    <span className="text-emerald-500">[{casier.matricule}]</span>
                    <span className="truncate ml-0.5">{casier.name.replace('Casier ', '')}</span>
                  </div>
                </>
              )}
            </nav>

            {/* Level Title - Compact on mobile */}
            <h1 className="text-xs sm:text-base md:text-lg font-bold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-0.5 flex items-center gap-2 truncate">
              <span className="truncate">{title}</span>
            </h1>
            {subtitle && (
              <p className="hidden sm:block text-[10px] sm:text-xs text-white/50 font-mono mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>

          {/* Quick Matricule Finder Form (Hidden on mobile/tablet to save space) */}
          <div className="hidden md:flex flex-col gap-1 shrink-0 mt-1 md:mt-0">
            <form onSubmit={handleExpressJump} className="relative flex items-center">
              <input
                type="text"
                placeholder="Recherche Matricule (ex: RY-101)..."
                value={expressMatricule}
                onChange={(e) => setExpressMatricule(e.target.value)}
                className="w-full md:w-56 lg:w-64 bg-black/40 hover:bg-white/5 focus:bg-black/80 border border-white/10 hover:border-white/20 focus:border-emerald-500/70 text-[11px] font-mono text-white placeholder-white/30 rounded-lg pl-3 pr-8 py-1 outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-1 text-white/50 hover:text-emerald-400 cursor-pointer transition-colors"
                title="Saisir un matricule pour y accéder immédiatement"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
            {expressError ? (
              <span className="text-[9px] text-red-400 font-mono text-right animate-pulse">{expressError}</span>
            ) : (
              <span className="text-[9px] text-white/30 font-mono text-right hidden lg:inline">Indexation d'archivage temps-réel</span>
            )}
          </div>
        </div>

        {/* Live Step HUD map Indicator (Only visible on large screens) */}
        <div className="hidden lg:flex items-center gap-1.5 text-[9px] font-mono text-white/30 mt-1 pb-0.5">
          <span className="text-emerald-400 font-bold">Flux d'archivage :</span>
          <Link 
            to={buildDocumentationUrl()}
            className={`px-1.5 py-0.5 rounded-md transition-colors ${
              currentLevel === 'salle' 
                ? 'bg-emerald-500/25 text-white border border-emerald-400/40 font-bold' 
                : 'bg-transparent text-white/40 hover:text-white/70'
            }`}
          >
            1. SALLE
          </Link>
          <ChevronRight className="w-2.5 h-2.5 text-white/20" />
          {salle ? (
            <Link 
              to={buildSalleUrl(salle.id)}
              className={`px-1.5 py-0.5 rounded-md transition-colors ${
                currentLevel === 'rayon' 
                  ? 'bg-emerald-500/25 text-white border border-emerald-400/40 font-bold' 
                  : 'bg-transparent text-white/40 hover:text-white/70'
              }`}
            >
              2. RAYON
            </Link>
          ) : (
            <span 
              className={`px-1.5 py-0.5 rounded-md ${
                currentLevel === 'rayon' 
                  ? 'bg-emerald-500/25 text-white border border-emerald-400/40 font-bold' 
                  : 'bg-transparent text-white/40'
              }`}
            >
              2. RAYON
            </span>
          )}
          <ChevronRight className="w-2.5 h-2.5 text-white/20" />
          {salle && rayon ? (
            <Link 
              to={buildRayonUrl(salle.id, rayon.id)}
              className={`px-1.5 py-0.5 rounded-md transition-colors ${
                currentLevel === 'casier' 
                  ? 'bg-emerald-500/25 text-white border border-emerald-400/40 font-bold' 
                  : 'bg-transparent text-white/40 hover:text-white/70'
              }`}
            >
              3. CASIER
            </Link>
          ) : (
            <span 
              className={`px-1.5 py-0.5 rounded-md ${
                currentLevel === 'casier' 
                  ? 'bg-emerald-500/25 text-white border border-emerald-400/40 font-bold' 
                  : 'bg-transparent text-white/40'
              }`}
            >
              3. CASIER
            </span>
          )}
          <ChevronRight className="w-2.5 h-2.5 text-white/20" />
          {salle && rayon && casier ? (
            <Link 
              to={buildCasierUrl(salle.id, rayon.id, casier.id)}
              className={`px-1.5 py-0.5 rounded-md transition-colors ${
                currentLevel === 'dossier' 
                  ? 'bg-emerald-500/25 text-white border border-emerald-400/40 font-bold' 
                  : 'bg-transparent text-white/40 hover:text-white/70'
              }`}
            >
              4. DOSSIERS
            </Link>
          ) : (
            <span 
              className={`px-1.5 py-0.5 rounded-md ${
                currentLevel === 'dossier' 
                  ? 'bg-emerald-500/25 text-white border border-emerald-400/40 font-bold' 
                  : 'bg-transparent text-white/40'
              }`}
            >
              4. DOSSIERS
            </span>
          )}
        </div>
      </div>

      {/* 2. Secondary Sub-Bar Actions - Compacted */}
      <div className="px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 bg-[#020709]/20 border-t border-white/5 flex items-center justify-between gap-2">
        {backTo ? (
          <button
            type="button"
            onClick={() => {
              playXboxSound('back');
              navigate(backTo);
            }}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-white/60 hover:text-emerald-400 cursor-pointer font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backLabel}</span>
          </button>
        ) : (
          <div className="text-[10px] sm:text-xs text-white/30 font-mono">
            Sélectionnez une salle pour explorer les archives
          </div>
        )}

        {rightAction && (
          <div className="flex items-center gap-2 shrink-0">
            {rightAction}
          </div>
        )}
      </div>
    </div>
  );
}
