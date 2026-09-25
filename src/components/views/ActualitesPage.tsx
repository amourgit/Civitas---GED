"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Newspaper, 
  ArrowLeft, 
  Clock, 
  Tag, 
  Share2, 
  ExternalLink,
  Sparkles,
  Bookmark,
  Megaphone,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';
import { PortalBlogSection } from '../portal/PortalBlogSection';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  image: string;
  author: string;
  featured?: boolean;
}

const ARTICLES: NewsArticle[] = [
  {
    id: 'art1',
    title: 'Modernisation intégrale de la GED et Archivage Électronique EGEN',
    category: 'Systèmes d’Information',
    date: '19 Septembre 2026',
    readTime: '3 min',
    summary: 'Déploiement du nouveau portail intranet unifié intégrant la cartographie 3D des salles d’archives, la numérisation certifiée et le suivi en temps réel des dossiers physiques.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    author: 'Direction Générale & DSI',
    featured: true,
  },
  {
    id: 'art2',
    title: 'Adoption de la nouvelle politique RSE et Zéro Papier',
    category: 'Environnement & Entreprise',
    date: '18 Septembre 2026',
    readTime: '4 min',
    summary: 'La direction annonce une réduction de 80% des impressions physiques grâce aux workflows de validation et signatures électroniques intégrées.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    author: 'Comité RSE',
  },
  {
    id: 'art3',
    title: 'Séminaire annuel des cadres et partenaires stratégiques',
    category: 'Événement',
    date: '15 Septembre 2026',
    readTime: '2 min',
    summary: 'Retrouvez le programme détaillé des trois journées de conférences axées sur l’expansion numérique et les partenariats panafricains.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
    author: 'Communication',
  }
];

export function ActualitesPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-y-auto py-4 sm:py-6 lg:py-8 bg-[#070e17] text-white flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playXboxSound('back');
              navigate('/');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Retour à l'accueil Intranet"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400">
              <Newspaper className="w-4 h-4" />
              <span>ACTUALITÉS & PUBLICATIONS • INFORMER & EXPLIQUER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Actualités & Publications
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Information durable et éditorialisée : articles, dossiers de fond, bilans, interviews et reportages.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playXboxSound('select');
            navigate('/annonces');
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-400/30 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
        >
          <Megaphone className="w-4 h-4" />
          <span>Voir les Annonces ciblées</span>
        </button>
      </div>

      {/* ── SECTION PÉDAGOGIQUE DES 3 APPLICATIONS DE DIFFUSION ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
          <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>📰 Actualités & Publications</span>
              <span className="text-[10px] text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded font-normal">Page active</span>
            </div>
            <p className="text-slate-400 text-[11px]">Informer & expliquer • Information durable</p>
          </div>
        </div>

        <button 
          onClick={() => { playXboxSound('select'); navigate('/annonces'); }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 transition-colors text-left group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300 group-hover:bg-teal-500/30">
            <Megaphone className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
              <span>📢 Annonces</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </div>
            <p className="text-slate-400 text-[11px]">Avertir & cibler • Information immédiate et ciblée</p>
          </div>
        </button>

        <button 
          onClick={() => { playXboxSound('select'); navigate('/informations/agenda'); }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 transition-colors text-left group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/30">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
              <span>📅 Agenda</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </div>
            <p className="text-slate-400 text-[11px]">Planifier & synchroniser • Dimension temporelle</p>
          </div>
        </button>
      </div>

      {/* Featured Article */}
      {ARTICLES.filter(a => a.featured).map(art => (
        <motion.div
          key={art.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-black/60 to-black/80 backdrop-blur-xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center"
        >
          <img 
            src={art.image} 
            alt={art.title} 
            className="w-full md:w-80 h-48 md:h-56 rounded-2xl object-cover border border-white/10 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-bold">
                {art.category}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {art.date} • {art.readTime} de lecture
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {art.title}
            </h2>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              {art.summary}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button 
                onClick={() => playXboxSound('select')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Lire la note complète
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.filter(a => !a.featured).map(art => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all flex flex-col"
          >
            <img 
              src={art.image} 
              alt={art.title} 
              className="w-full h-44 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-amber-400 font-bold">{art.category}</span>
                  <span className="text-slate-400">• {art.date}</span>
                </div>
                <h3 className="font-bold text-lg text-white">
                  {art.title}
                </h3>
                <p className="text-slate-300 text-xs font-light leading-relaxed line-clamp-2">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Par {art.author}</span>
                <span className="text-amber-400 font-medium cursor-pointer hover:underline">Consulter</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grille Blog Section Identique à la référence */}
      <div className="w-full pt-6">
        <PortalBlogSection />
      </div>
    </div>
  );
}
