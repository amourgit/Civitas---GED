"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ServicesApplicationsTab } from './services/ServicesApplicationsTab';
import { ServicesMembresTab } from './services/ServicesMembresTab';
import { ServicesRessourcesTab } from './services/ServicesRessourcesTab';
import { SERVICES_LIST, getServiceByUuid, ServiceItem } from '../../data/servicesData';
import { playXboxSound } from '../../utils/xboxAudio';
import { Copy, Check, Users, AppWindow, ArrowLeft, Shield, Server } from 'lucide-react';
import { TabsContent } from '../ui/AnimatedTabs';
import { TabbedViewLayout } from '../layout/TabbedViewLayout';
import { StaggerTestimonials, type TestimonialItem } from '../ui/StaggerTestimonials';

export function ServicesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ serviceUuid?: string; tab?: string }>();

  // Extract service/site UUID from path (e.g. /sites/srv-8f92a10b/applications, /services/srv-8f92a10b/applications or params.serviceUuid)
  const pathParts = location.pathname.split('/').filter(Boolean);
  // pathParts: ['sites'] OR ['sites', 'srv-8f92a10b'] OR ['sites', 'srv-8f92a10b', 'applications']
  let rawServiceUuid = params.serviceUuid || (pathParts.length >= 2 ? pathParts[1] : undefined);
  let activeTabFromPath = params.tab || (pathParts.length >= 3 ? pathParts[2] : 'applications');

  // If path is /sites/membres or /sites/applications without UUID, redirect or fallback
  if (rawServiceUuid === 'applications' || rawServiceUuid === 'membres' || rawServiceUuid === 'ressources') {
    activeTabFromPath = rawServiceUuid;
    rawServiceUuid = undefined;
  }

  const selectedService = getServiceByUuid(rawServiceUuid);
  const [copiedUuid, setCopiedUuid] = useState(false);

  // Sync active tab
  const getTab = (): 'applications' | 'membres' | 'ressources' => {
    const t = activeTabFromPath.toLowerCase();
    if (t === 'membres') return 'membres';
    if (t === 'ressources') return 'ressources';
    return 'applications';
  };

  const [activeTab, setActiveTab] = useState<'applications' | 'membres' | 'ressources'>(getTab());

  useEffect(() => {
    setActiveTab(getTab());
  }, [location.pathname, activeTabFromPath]);

  const handleCopyUuid = (uuid: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playXboxSound('select');
    navigator.clipboard.writeText(uuid);
    setCopiedUuid(true);
    setTimeout(() => setCopiedUuid(false), 2000);
  };

  const handleTabChange = (tab: 'applications' | 'membres' | 'ressources') => {
    if (!selectedService) return;
    playXboxSound('select');
    setActiveTab(tab);
    navigate(`/sites/${selectedService.uuid}/${tab}`);
  };

  const subOptions = [
    {
      id: 'applications' as const,
      label: 'Applications & Outils',
    },
    {
      id: 'membres' as const,
      label: 'Membres & Équipes',
    },
    {
      id: 'ressources' as const,
      label: 'Ressources (GED)',
    }
  ];

  // Données des sites passées en props au carrousel Stagger
  const siteCarouselItems = useMemo<TestimonialItem[]>(() => {
    const siteImages = [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    ];

    return SERVICES_LIST.map((srv, idx) => ({
      tempId: idx,
      testimonial: `${srv.name} — ${srv.description}`,
      by: `${srv.shortName} • ${srv.head} (${srv.memberCount} membres, ${srv.appCount} apps)`,
      imgSrc: siteImages[idx % siteImages.length],
      siteUuid: srv.uuid,
      shortName: srv.shortName,
      name: srv.name,
      category: srv.category,
      memberCount: srv.memberCount,
      appCount: srv.appCount,
    }));
  }, []);

  // VIEW 1: Carrousel Stagger pour la sélection des Sites (Quand aucun site n'est sélectionné)
  if (!selectedService) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-120px)] flex flex-col justify-center items-center text-slate-100 overflow-hidden relative select-none py-2 sm:py-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          <StaggerTestimonials
            testimonials={siteCarouselItems}
            onSelect={(item) => {
              playXboxSound('select');
              navigate(`/sites/${item.siteUuid || 'srv-8f92a10b'}/applications`);
            }}
          />
        </div>
      </div>
    );
  }

  // VIEW 2: Contextualized Site View using generic TabbedViewLayout
  return (
    <TabbedViewLayout
      activeTab={activeTab}
      onTabChange={(val) => handleTabChange(val as 'applications' | 'membres' | 'ressources')}
      tabs={subOptions}
      sidebarHeader={
        <button
          onClick={() => {
            playXboxSound('select');
            navigate('/sites');
          }}
          className="self-start text-xs text-slate-400 hover:text-teal-300 transition-colors cursor-pointer flex items-center gap-1.5 pb-2 border-b border-white/10 w-full"
          title="Revenir au choix du site"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Changer de site</span>
        </button>
      }
      mainHeader={
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 mb-4 sm:mb-6 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-bold text-teal-300 uppercase tracking-wider">{selectedService.shortName}</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] sm:text-xs text-slate-400">{selectedService.category}</span>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-white mt-0.5">{selectedService.name}</h1>
          </div>

          <button
            onClick={(e) => handleCopyUuid(selectedService.uuid, e)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-teal-500/30 text-teal-300 text-[11px] sm:text-xs font-mono transition-colors cursor-pointer shrink-0"
            title="Cliquer pour copier l'UUID du site"
          >
            <span>{selectedService.uuid}</span>
            {copiedUuid ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-teal-400" />}
          </button>
        </div>
      }
    >
      <TabsContent value="applications" className="flex-1 min-h-0 flex flex-col">
        <ServicesApplicationsTab />
      </TabsContent>
      <TabsContent value="membres" className="flex-1 min-h-0 flex flex-col">
        <ServicesMembresTab />
      </TabsContent>
      <TabsContent value="ressources" className="flex-1 min-h-0 flex flex-col">
        <ServicesRessourcesTab />
      </TabsContent>
    </TabbedViewLayout>
  );
}

