import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  ArrowLeft, 
  CheckCircle, 
  FileCheck, 
  Archive, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Download
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export function PilotagePage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col h-full bg-[#030708] text-white overflow-hidden select-none">
      {/* Header */}
      <div className="w-full bg-[#070d14] border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { playXboxSound('back'); navigate('/'); }}
            className="p-1.5 rounded-[2px] bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Accueil</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-white/40 text-xs font-mono">SGAI</span>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" />
            RAPPORTS & STATISTIQUES D'ARCHIVAGE
          </span>
        </div>

        <button
          type="button"
          onClick={() => playXboxSound('select')}
          className="px-3 py-1.5 rounded-[2px] bg-white/[0.08] hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exporter le rapport annuel</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 sm:space-y-10 max-w-6xl mx-auto w-full">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-[3px] bg-[#07131e] border border-white/10">
            <span className="text-xs text-white/50 block font-mono">Volume total archivé</span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">570 Go / 1.5 To</span>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#22c55e] h-full w-[38%]" />
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">38% de la capacité physique</span>
          </div>

          <div className="p-4 rounded-[3px] bg-[#07131e] border border-white/10">
            <span className="text-xs text-white/50 block font-mono">Taux de numérisation OCR</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">94.2 %</span>
            <span className="text-[10px] text-white/60 mt-1 block">Indexation plein texte certifiée</span>
          </div>

          <div className="p-4 rounded-[3px] bg-[#07131e] border border-white/10">
            <span className="text-xs text-white/50 block font-mono">Dossiers versés en 2026</span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">1 842</span>
            <span className="text-[10px] text-sky-400 mt-1 block">+18% par rapport à 2025</span>
          </div>

          <div className="p-4 rounded-[3px] bg-[#07131e] border border-white/10">
            <span className="text-xs text-white/50 block font-mono">Dossiers arrivés à DUA</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">64</span>
            <span className="text-[10px] text-amber-300 mt-1 block">En attente de visa d'élimination</span>
          </div>
        </div>

        {/* Versements par direction */}
        <div className="p-5 rounded-[3px] bg-[#050b12] border border-white/10 space-y-3">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Répartition des versements par service territorial
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>État civil</span>
              <span className="font-mono text-white/80">577 dossiers (31%)</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[31%]" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span>Urbanisme & foncier</span>
              <span className="font-mono text-white/80">375 dossiers (20%)</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full w-[20%]" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span>Ressources humaines</span>
              <span className="font-mono text-white/80">512 dossiers (28%)</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[28%]" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span>Finances & Marchés</span>
              <span className="font-mono text-white/80">376 dossiers (21%)</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[21%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
