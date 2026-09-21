"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Compass, 
  ArrowLeft, 
  Award, 
  FileText,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-full flex flex-col px-4 sm:px-6 lg:px-8 pt-2 pb-8">
      <div className="max-w-5xl w-full mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4" />
              <span>À Propos de l'Organisation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Portail Intranet & GED EGEN
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Plateforme centralisée de gestion électronique des documents, collaboration et communication institutionnelle.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
        </div>

        {/* Mission & Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white">Sécurité & Traçabilité</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Archivage normé NF Z40-350 et ISO 14641-1 garantissant l'intégrité, la conformité légale et le cycle de vie de chaque dossier d'archive physique et numérique.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white">Cartographie 3D Interactive</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visualisation spatiale en temps réel des dépôts d'archives : Salles, Rayonnages, Casiers et Dossiers avec navigation topologique dynamique.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white">Collaboration Transversale</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Partage unifié des procédures, annuaire interactif, agenda partagé et actualités pour l'ensemble des directions régionales et centrales.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
          <div>
            <div className="text-2xl font-bold text-emerald-400">12 450+</div>
            <div className="text-xs text-slate-400 mt-0.5">Dossiers Physiques Référencés</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">4 Salles</div>
            <div className="text-xs text-slate-400 mt-0.5">Dépôts d'Archives Actifs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">99.98%</div>
            <div className="text-xs text-slate-400 mt-0.5">Disponibilité Système</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-400">ISO 14641</div>
            <div className="text-xs text-slate-400 mt-0.5">Certification Archivage</div>
          </div>
        </div>
      </div>
    </div>
  );
}
