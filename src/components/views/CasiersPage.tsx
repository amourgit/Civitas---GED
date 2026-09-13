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
import { playXboxSound } from '../../utils/xboxAudio';

export function CasiersPage() {
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
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 py-4 pb-16 min-h-0"
        data-scrollable="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {casiers.map((casier) => (
            <div
              key={casier.id}
              className="group relative rounded-xl p-4 sm:p-5 bg-gradient-to-b from-white/10 via-[#07171d]/85 to-[#02090c]/95 border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.25)] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* HUD Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 text-[10px] font-mono rounded font-bold">
                      {casier.matricule}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/50 font-mono">
                      Conteneurs : {casier.boxCount} boîtes
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  {casier.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/60 mt-1.5 leading-relaxed">
                  {casier.description}
                </p>

                {/* Subtitle properties */}
                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-white/50 flex items-center justify-between">
                  <div>
                    <span className="text-white/35">Type :</span>
                    <span className="text-white font-semibold ml-1">{casier.lockerType}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{casier.folderIds.length} Dossier(s)</span>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  navigate(buildCasierUrl(finalSalleId, rayon.id, casier.id));
                }}
                className="w-full mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Consulter les dossiers ({casier.matricule})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
