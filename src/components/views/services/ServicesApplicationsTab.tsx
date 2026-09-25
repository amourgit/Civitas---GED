"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderOpen, 
  ShieldCheck, 
  Calendar, 
  Newspaper, 
  ExternalLink, 
  Search, 
  Sparkles,
  Server,
  Database,
  Grid
} from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

export function ServicesApplicationsTab() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const applicationsList = [
    {
      id: 'ged',
      name: 'EGEN GED Documents',
      category: 'Ressources & Archives',
      description: 'Système d’archivage légal, classement 3D et gestion du cycle de vie des dossiers.',
      status: 'Opérationnel',
      icon: FolderOpen,
      color: 'from-teal-500 to-emerald-600',
      link: '/ged'
    },
    {
      id: 'iam',
      name: 'EGEN IAM & Sécurité',
      category: 'Identités & Droits',
      description: 'Gestion des rôles, clés de chiffrement 2FA et habilitations applicatives.',
      status: 'Sécurisé',
      icon: ShieldCheck,
      color: 'from-cyan-500 to-blue-600',
      link: '/iam'
    },
    {
      id: 'calendrier',
      name: 'Planning & Salles',
      category: 'Organisation',
      description: 'Réservations de ressources partagées, salles de réunion et visioconférences.',
      status: 'Synchro active',
      icon: Calendar,
      color: 'from-indigo-500 to-purple-600',
      link: '/informations/agenda'
    },
    {
      id: 'news',
      name: 'Portail Actualités & News',
      category: 'Communication',
      description: 'Diffusion de notes officielles, flash infos et publications internes.',
      status: 'Mis à jour',
      icon: Newspaper,
      color: 'from-amber-500 to-orange-600',
      link: '/actualites'
    },
    {
      id: 'rh',
      name: 'Portail Suivi RH',
      category: 'Ressources Humaines',
      description: 'Demande de congés, fiches de paie et formulaires de mobilité interne.',
      status: 'En service',
      icon: Server,
      color: 'from-rose-500 to-pink-600',
      link: '/rh'
    },
    {
      id: 'projets',
      name: 'Espace Projets & Sites',
      category: 'Collaboratif',
      description: 'Tableaux de bord de suivi de projets, Jalons et livrables d’équipe.',
      status: 'Actif',
      icon: Database,
      color: 'from-emerald-500 to-teal-700',
      link: '/projets'
    }
  ];

  const categories = ['Tous', 'Ressources & Archives', 'Identités & Droits', 'Organisation', 'Communication', 'Ressources Humaines'];

  const filteredApps = applicationsList.filter((app) => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Tous' || app.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Applications & Outils Métier</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Séléctionnez une application pour y accéder directement.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un outil..."
            className="w-full bg-slate-900/80 text-white placeholder-slate-400 text-xs pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:outline-hidden focus:border-teal-400/50"
          />
        </div>
      </div>

      {/* Category Pills - Text style */}
      <div className="flex flex-wrap gap-3 text-xs font-medium">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playXboxSound('select');
              setSelectedCategory(cat);
            }}
            className={`transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'text-teal-300 font-bold border-b-2 border-teal-400 pb-0.5'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApps.map((app) => {
          const IconComp = app.icon;
          return (
            <div
              key={app.id}
              onClick={() => {
                playXboxSound('select');
                navigate(app.link);
              }}
              className="group p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-teal-400/40 hover:bg-slate-800/80 transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${app.color} text-white shadow-xs`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {app.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                    <span>{app.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-teal-300" />
                  </h3>
                  <p className="text-[11px] text-teal-400/80 font-medium mt-0.5">{app.category}</p>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {app.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-200">
                <span>Accéder à l'application</span>
                <span className="text-teal-400 font-semibold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
