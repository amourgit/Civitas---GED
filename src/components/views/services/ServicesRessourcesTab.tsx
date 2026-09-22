"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, FileText, Download, ExternalLink, ShieldCheck, Database, HardDrive } from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

export function ServicesRessourcesTab() {
  const navigate = useNavigate();

  const resources = [
    {
      title: 'Guide d’Utilisation du Portail Intranet GED',
      type: 'PDF Document',
      size: '2.4 MB',
      updated: '18 Sept. 2026',
      category: 'Procédures'
    },
    {
      title: 'Charte de Sécurité Informatique & IAM 2026',
      type: 'PDF Document',
      size: '1.8 MB',
      updated: '05 Sept. 2026',
      category: 'Sécurité'
    },
    {
      title: 'Formulaire de Demande d’Accès Réseau & VPN',
      type: 'DOCX Formulaire',
      size: '450 KB',
      updated: '12 Août 2026',
      category: 'Formulaires'
    },
    {
      title: 'Guide des Bonnes Pratiques de Classement Archivistique 3D',
      type: 'PDF Manuel',
      size: '5.1 MB',
      updated: '01 Juil. 2026',
      category: 'Archives'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white">
            Ressources Documentaires & GED
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Guides, formulaires administratifs et accès direct à la Gestion Électronique des Documents.
          </p>
        </div>

        <button
          onClick={() => {
            playXboxSound('select');
            navigate('/ged');
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md"
        >
          <FolderOpen className="w-4 h-4" />
          <span>Ouvrir l'Espace GED 3D</span>
        </button>
      </div>

      {/* Quick Access Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => {
            playXboxSound('select');
            navigate('/ged');
          }}
          className="p-4 rounded-xl bg-gradient-to-r from-teal-900/50 to-slate-900 border border-teal-500/30 hover:border-teal-400 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">Accès Direct</span>
            <h3 className="text-sm font-bold text-white">Base Archivistique GED</h3>
            <p className="text-xs text-slate-300">Explorateur 3D de casiers, rayons et dossiers numérisés.</p>
          </div>
          <HardDrive className="w-8 h-8 text-teal-400 shrink-0 ml-2" />
        </div>

        <div 
          onClick={() => {
            playXboxSound('select');
            navigate('/ged/recherche');
          }}
          className="p-4 rounded-xl bg-gradient-to-r from-cyan-900/50 to-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">Moteur de recherche</span>
            <h3 className="text-sm font-bold text-white">Recherche Globale GED</h3>
            <p className="text-xs text-slate-300">Indexation OCR et recherche multicritères de documents.</p>
          </div>
          <Database className="w-8 h-8 text-cyan-400 shrink-0 ml-2" />
        </div>
      </div>

      {/* Files List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Documents Récents & Procédures Officielles
        </h3>

        <div className="space-y-2">
          {resources.map((res, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-slate-900/60 border border-white/10 hover:border-teal-400/40 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-white/5 text-teal-300 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{res.title}</h4>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-[10px] text-slate-400 mt-0.5">
                    <span className="text-teal-400 font-semibold">{res.category}</span>
                    <span>•</span>
                    <span>{res.type}</span>
                    <span>•</span>
                    <span>{res.size}</span>
                    <span>•</span>
                    <span>Mis à jour le {res.updated}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => playXboxSound('select')}
                className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                title="Télécharger"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
