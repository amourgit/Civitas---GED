import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layers, ArrowLeft, AlertCircle } from 'lucide-react';
import { getSalleById, getRayonsForSalle, buildDocumentationUrl, buildRayonUrl } from '../../data/archiveStructure';
import { ArchiveHeaderPipeline } from '../archive/ArchiveHeaderPipeline';
import { playXboxSound } from '../../utils/xboxAudio';

export function RayonsPage() {
  const { salleId } = useParams<{ salleId: string }>();
  const navigate = useNavigate();

  const salle = getSalleById(salleId);
  const rayons = salle ? getRayonsForSalle(salle.id) : [];

  if (!salle) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center p-8 gap-4">
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
      {/* Dynamic Archive Header Pipeline */}
      <ArchiveHeaderPipeline
        currentLevel="rayon"
        salle={salle}
        title={`Rayons de la salle : ${salle.name}`}
        subtitle={`Niveau 2 — Emplacement : ${salle.location} • Statut : ${salle.status}`}
        backTo={buildDocumentationUrl()}
        backLabel="Retour aux salles"
      />

      {/* Main Viewport Content */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 py-4 pb-16 min-h-0"
        data-scrollable="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rayons.map((rayon) => (
            <div
              key={rayon.id}
              className="group relative rounded-xl p-4 sm:p-5 bg-gradient-to-b from-white/10 via-[#07171d]/85 to-[#02090c]/95 border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.25)] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* HUD Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 text-[10px] font-mono rounded font-bold">
                      {rayon.matricule}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/50 font-mono">
                      {rayon.rowNumber}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-white/50">
                    {rayon.material}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {rayon.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/60 mt-1.5 leading-relaxed">
                  {rayon.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-white/50">
                  <div className="flex flex-col">
                    <span className="text-white/35">Casiers</span>
                    <span className="text-white font-semibold mt-0.5">{rayon.casierCount} unités</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/35">Total documents</span>
                    <span className="text-white font-semibold mt-0.5 text-emerald-400">{rayon.fileCount} fichiers</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  navigate(buildRayonUrl(salle.id, rayon.id));
                }}
                className="w-full mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Inspecter les casiers ({rayon.matricule})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
