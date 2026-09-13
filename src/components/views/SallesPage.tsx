import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DoorOpen } from 'lucide-react';
import { SALLES, buildSalleUrl } from '../../data/archiveStructure';
import { ArchiveHeaderPipeline } from '../archive/ArchiveHeaderPipeline';
import { playXboxSound } from '../../utils/xboxAudio';

export function SallesPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative select-none min-h-0">
      {/* Dynamic Archive Header Pipeline */}
      <ArchiveHeaderPipeline
        currentLevel="salle"
        title="Parcours de Documentation : Salles d'Archivage"
        subtitle="Niveau 1 — Choisissez une salle pour inspecter ses rayonnages et unités"
      />

      {/* Main Viewport Content */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 py-4 pb-16 min-h-0"
        data-scrollable="true"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SALLES.map((salle) => (
            <div
              key={salle.id}
              className="group relative rounded-xl p-4 sm:p-5 bg-gradient-to-b from-white/10 via-[#07171d]/85 to-[#02090c]/95 border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.25)] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* HUD Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 text-[10px] font-mono rounded font-bold">
                      {salle.matricule}
                    </span>
                    <span className="text-[10px] sm:text-xs text-white/50 font-mono">
                      {salle.location}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    salle.securityLevel === 'Secret' 
                      ? 'bg-red-500/20 border border-red-400/50 text-red-300'
                      : 'bg-amber-500/20 border border-amber-400/50 text-amber-300'
                  }`}>
                    {salle.securityLevel}
                  </span>
                </div>

                {/* Core Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {salle.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/60 mt-1.5 leading-relaxed">
                  {salle.description}
                </p>

                {/* Metrics Footer */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-white/50">
                  <div className="flex flex-col">
                    <span className="text-white/35">Capacité</span>
                    <span className="text-white font-semibold mt-0.5">{salle.storageCapacity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/35">Rayons</span>
                    <span className="text-white font-semibold mt-0.5">{salle.rayonCount} unités</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/35">Fichiers</span>
                    <span className="text-white font-semibold mt-0.5 text-emerald-400">{salle.fileCount} docs</span>
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
                className="w-full mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                <DoorOpen className="w-4 h-4" />
                <span>Ouvrir la salle ({salle.matricule})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
