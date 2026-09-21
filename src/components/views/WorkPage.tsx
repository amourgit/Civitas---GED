"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  FolderKanban, 
  Layers, 
  ArrowLeft, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { ApplicationsGridPage } from './ApplicationsGridPage';

export function WorkPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-full flex flex-col px-4 sm:px-6 lg:px-8 pt-2 pb-8">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Espace Travail & Projets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Work & Applications Métier
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Accédez directement aux chantiers en cours, outils de production et applications de l'entreprise.
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

        {/* Embedded Applications & Projets */}
        <div className="w-full">
          <ApplicationsGridPage />
        </div>
      </div>
    </div>
  );
}
