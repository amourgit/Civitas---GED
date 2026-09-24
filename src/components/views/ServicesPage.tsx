"use client";

import React, { useState, useEffect } from 'react';
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

  // VIEW 1: Site Selection Grid (When no site UUID is specified)
  if (!selectedService) {
    return (
      <div className="w-full h-[calc(100vh-120px)] my-2 sm:my-3 text-slate-100 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 scrollbar-thin scrollbar-thumb-teal-500/20">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Sélection du Site
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Choisissez un site ci-dessous pour accéder à ses applications, membres et ressources.
              </p>
            </div>
            <div className="text-xs text-teal-300 font-semibold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 self-start sm:self-auto">
              {SERVICES_LIST.length} Sites disponibles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES_LIST.map((srv) => (
              <motion.div
                key={srv.uuid}
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  playXboxSound('select');
                  navigate(`/sites/${srv.uuid}/applications`);
                }}
                className="group p-6 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-teal-400/50 hover:bg-slate-800/80 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-400/30">
                      {srv.shortName}
                    </span>

                    {/* Copiable UUID Badge */}
                    <button
                      type="button"
                      onClick={(e) => handleCopyUuid(srv.uuid, e)}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Cliquer pour copier l'UUID du site"
                    >
                      <span>UUID: {srv.uuid}</span>
                      {copiedUuid ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                    </button>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                      {srv.name}
                    </h2>
                    <p className="text-xs text-teal-400/80 font-medium mt-0.5">{srv.category}</p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-500" /> {srv.memberCount} membres</span>
                    <span className="flex items-center gap-1"><AppWindow className="w-3.5 h-3.5 text-slate-500" /> {srv.appCount} apps</span>
                  </div>
                  <span className="text-teal-300 font-semibold group-hover:translate-x-1 transition-transform">
                    Accéder au site →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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

