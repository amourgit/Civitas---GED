import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  ArrowLeft, 
  ShieldCheck, 
  FolderTree, 
  Database, 
  FileLock, 
  Users, 
  Sliders
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export function AdministrationPage() {
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
          <span className="text-white/90 font-bold text-xs flex items-center gap-1">
            <Settings className="w-3.5 h-3.5" />
            ADMINISTRATION & RÉFÉRENTIEL DU PLAN DE CLASSEMENT
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 sm:space-y-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-4 rounded-[3px] bg-[#050b12] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <FolderTree className="w-4 h-4" />
              <span>Plan de classement territorial</span>
            </div>
            <p className="text-xs text-white/60">
              Nomenclature réglementaire des séries modernes et contemporaines (Séries D, E, M, K, W).
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-white/50">Version active : V-2026.2 (Homologuée)</span>
            </div>
          </div>

          <div className="p-4 rounded-[3px] bg-[#050b12] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Tableaux de gestion & DUA</span>
            </div>
            <p className="text-xs text-white/60">
              Durées d'Utilité Administrative (DUA) et sort final (Conservation permanente ou Élimination après visa).
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-white/50">142 règles de communicabilité configurées</span>
            </div>
          </div>

          <div className="p-4 rounded-[3px] bg-[#050b12] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              <span>Habilitations & Rôles des agents</span>
            </div>
            <p className="text-xs text-white/60">
              Contrôle d'accès par service, confidentialité et habilitation au versement d'archives.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-white/50">Amour Samuel NZILA NGALA (Super-Admin)</span>
            </div>
          </div>

          <div className="p-4 rounded-[3px] bg-[#050b12] border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Database className="w-4 h-4" />
              <span>Journal d'audit & Empreintes SHA-256</span>
            </div>
            <p className="text-xs text-white/60">
              Journal probant inviolable, horodatage certifié et intégrité cryptographique des documents déposés.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-white/50">Chaîne de confiance active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
