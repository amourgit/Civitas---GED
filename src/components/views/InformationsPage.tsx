"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';

import AnimatedTabs, { TabsList, TabsTrigger, TabsContent } from '../ui/AnimatedTabs';

interface Props {
  initialTab?: 'news' | 'annonces' | 'agenda';
}

export function InformationsPage({ initialTab = 'news' }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = (): 'news' | 'annonces' | 'agenda' => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/informations/annonces') || path.includes('/annonces')) return 'annonces';
    if (path.includes('/informations/agenda') || path.includes('/calendrier')) return 'agenda';
    return 'news';
  };

  const [activeTab, setActiveTab] = useState<'news' | 'annonces' | 'agenda'>(getTabFromPath());
  const [isVertical, setIsVertical] = useState<boolean>(true);

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tab: 'news' | 'annonces' | 'agenda', path: string) => {
    playXboxSound('select');
    setActiveTab(tab);
    navigate(path);
  };

  const subOptions = [
    { id: 'news' as const, label: 'News & Publications', shortLabel: 'News', path: '/informations/news' },
    { id: 'annonces' as const, label: 'Annonces & Flash Info', shortLabel: 'Annonces', path: '/informations/annonces' },
    { id: 'agenda' as const, label: 'Agenda & Calendrier', shortLabel: 'Agenda', path: '/informations/agenda' },
  ];

  const articles = [
    {
      id: 'art-1',
      title: 'Modernisation intégrale de la GED et Archivage Électronique',
      category: 'News & Publications',
      date: '21 Septembre 2026',
      readTime: '4 min',
      summary: 'Déploiement du nouveau protocole de numérisation haute sécurité avec traçabilité blockchain et archivage 3D pour tous les services.',
    },
    {
      id: 'art-2',
      title: 'Guide méthodologique : Classement et nomenclature des dossiers 2026',
      category: 'Articles & Dossiers',
      date: '18 Septembre 2026',
      readTime: '6 min',
      summary: 'Consultez la synthèse des bonnes pratiques pour l’indexation automatique et le versement des bordereaux dématérialisés.',
    },
    {
      id: 'art-3',
      title: 'Bilan semestriel de la transformation numérique publique',
      category: 'Revue de Presse',
      date: '15 Septembre 2026',
      readTime: '5 min',
      summary: 'Plus de 45 000 dossiers traités en ligne au premier semestre avec un taux de satisfaction usager supérieur à 94%.',
    }
  ];

  const annonces = [
    {
      id: 'ann-1',
      title: 'Maintenance préventive des serveurs centraux GED ce samedi',
      category: 'Flash Info Entreprise',
      level: 'Alerte',
      date: 'Samedi 26 Septembre • 22h00 - 02h00',
      author: 'Direction des Systèmes d’Information',
    },
    {
      id: 'ann-2',
      title: 'Circulaire N° 2026/04 : Simplification des visas électroniques interservices',
      category: 'Directives & Circulaires',
      level: 'Officiel',
      date: 'Applicable dès le 1er Octobre 2026',
      author: 'Secrétariat Général',
    },
    {
      id: 'ann-3',
      title: 'Ouverture de la campagne de formation continue aux outils numériques',
      category: 'Salle des Annonces',
      level: 'Info',
      date: 'Inscriptions ouvertes jusqu’au 15 Octobre',
      author: 'Ressources Humaines',
    }
  ];

  const events = [
    {
      id: 'ev-1',
      title: 'Comité de Pilotage Gouvernance des Données & GED',
      date: 'Jeudi 24 Septembre • 10:00 - 12:00',
      location: 'Salle plénière & Visioconférence Teams',
      participants: 24,
    },
    {
      id: 'ev-2',
      title: 'Atelier de Prise en Main : Recherche Sémantique Avancée',
      date: 'Vendredi 25 Septembre • 14:30 - 16:00',
      location: 'Pôle Formation Digital • Salle 204',
      participants: 18,
    },
    {
      id: 'ev-3',
      title: 'Séminaire Interministériel de Clôture T3',
      date: 'Mardi 29 Septembre • 09:00 - 17:30',
      location: 'Centre de Conférences International',
      participants: 120,
    }
  ];

  return (
    <div className="w-full h-[calc(100vh-120px)] my-2 sm:my-3 text-slate-100 overflow-hidden px-3 sm:px-6 lg:px-8 flex flex-col">
      <AnimatedTabs
        value={activeTab}
        onValueChange={(val) => {
          const opt = subOptions.find(o => o.id === val);
          if (opt) handleTabChange(opt.id, opt.path);
        }}
        orientation={isVertical ? "vertical" : "horizontal"}
        className="max-w-7xl w-full mx-auto flex-1 min-h-0 h-full flex flex-col md:flex-row items-stretch gap-4 md:gap-8 overflow-hidden"
      >
        {/* LEFT SIDEBAR: Navigation des Sous-Options */}
        <aside className="w-full md:w-[20%] shrink-0 flex flex-col justify-start md:justify-center space-y-2 md:space-y-4 sticky top-0 z-10 bg-transparent">
          <TabsList className="w-full bg-transparent border-0 p-0 shadow-none flex md:flex-col items-center md:items-stretch gap-2 overflow-x-auto touch-pan-x scroll-smooth no-scrollbar select-none py-1">
            {subOptions.map((opt) => (
              <TabsTrigger
                key={opt.id}
                value={opt.id}
                className="shrink-0 flex-none text-left justify-start px-3.5 py-2 text-xs sm:text-sm md:text-base font-medium bg-transparent border-0 shadow-none hover:bg-transparent cursor-pointer transition-all whitespace-nowrap"
              >
                <span>{opt.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </aside>

        {/* RIGHT MAIN AREA: Always fills maximum height */}
        <main className="w-full md:w-[80%] flex-1 min-h-0 h-full flex flex-col overflow-y-auto bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 shadow-xl scrollbar-thin scrollbar-thumb-teal-500/20">
          <TabsContent value="news" className="flex-1 min-h-0 flex flex-col">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">News & Publications</h2>
                <p className="text-xs text-slate-300 mt-1">Articles récents et actualités de l'organisation.</p>
              </div>

              <div className="space-y-4">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/actualites');
                    }}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-teal-400/40 transition-colors cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-teal-400 font-medium">
                      <span>{art.category}</span>
                      <span className="text-slate-400 text-[11px]">{art.date} • {art.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-white hover:text-teal-300 transition-colors">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="annonces" className="flex-1 min-h-0 flex flex-col">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Annonces & Flash Info</h2>
                <p className="text-xs text-slate-300 mt-1">Communiqués officiels et alertes de service.</p>
              </div>

              <div className="space-y-4">
                {annonces.map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/annonces');
                    }}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-teal-400/40 transition-colors cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">{ann.level} • {ann.category}</span>
                      <span className="text-[11px] text-slate-400">{ann.author}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{ann.title}</h3>
                    <p className="text-xs text-teal-300 font-medium">{ann.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agenda" className="flex-1 min-h-0 flex flex-col">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Agenda & Événements</h2>
                <p className="text-xs text-slate-300 mt-1">Planning des réunions, conférences et comités.</p>
              </div>

              <div className="space-y-4">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/calendrier');
                    }}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-teal-400/40 transition-colors cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-cyan-300 font-medium">
                      <span>{ev.date}</span>
                      <span className="text-slate-400 text-[11px]">{ev.participants} participants</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{ev.title}</h3>
                    <p className="text-xs text-slate-300">{ev.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </main>
      </AnimatedTabs>
    </div>
  );
  }
