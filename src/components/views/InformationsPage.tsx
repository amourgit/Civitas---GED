"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';

import { Newspaper, BellRing, CalendarDays } from 'lucide-react';
import { TabsContent } from '../ui/AnimatedTabs';
import { TabbedViewLayout } from '../layout/TabbedViewLayout';
import { CalendarAgendaView } from './agenda/CalendarAgendaView';

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

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tab: 'news' | 'annonces' | 'agenda', path: string) => {
    playXboxSound('select');
    setActiveTab(tab);
    navigate(path);
  };

  const subOptions = [
    { id: 'news' as const, label: 'News & Publications', path: '/informations/news' },
    { id: 'annonces' as const, label: 'Annonces & Flash Info', path: '/informations/annonces' },
    { id: 'agenda' as const, label: 'Agenda & Calendrier', path: '/informations/agenda' },
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
    <TabbedViewLayout
      activeTab={activeTab}
      onTabChange={(val, option) => {
        if (option?.path) handleTabChange(option.id, option.path);
        else handleTabChange(val, `/informations/${val}`);
      }}
      tabs={subOptions}
    >
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
            <CalendarAgendaView />
          </TabsContent>
    </TabbedViewLayout>
  );
}
