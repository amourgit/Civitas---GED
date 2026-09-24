"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ServicesApplicationsTab } from './services/ServicesApplicationsTab';
import { ServicesMembresTab } from './services/ServicesMembresTab';
import { ServicesRessourcesTab } from './services/ServicesRessourcesTab';
import { SERVICES_LIST, getServiceByUuid, ServiceItem } from '../../data/servicesData';
import { playXboxSound } from '../../utils/xboxAudio';
import { 
  Copy, 
  Check, 
  Users, 
  AppWindow, 
  ArrowLeft, 
  Shield, 
  Server, 
  Search, 
  X, 
  SlidersHorizontal, 
  RotateCcw,
  Layers,
  Building2,
  Sparkles
} from 'lucide-react';
import { TabsContent } from '../ui/AnimatedTabs';
import { TabbedViewLayout } from '../layout/TabbedViewLayout';
import { StaggerTestimonials, type TestimonialItem } from '../ui/StaggerTestimonials';
import { 
  FilterBar, 
  useFilterSchema, 
  matchesFilters, 
  type Filter, 
  type FilterSchema 
} from '../filters/Filterbar';

// Schéma de référence FilterBar pour les sites et directions
const SITES_FILTER_SCHEMA: FilterSchema = {
  fields: [
    {
      id: 'category',
      label: 'Catégorie / Pôle',
      type: 'select',
      icon: <Layers className="w-3.5 h-3.5" />,
      options: [
        { value: 'Technologies & Infras', label: 'Technologies & Infras' },
        { value: 'Administration & Personnel', label: 'Administration & Personnel' },
        { value: 'Moyens Généraux', label: 'Moyens Généraux' },
        { value: 'Finances & Budget', label: 'Finances & Budget' },
      ],
    },
    {
      id: 'shortName',
      label: 'Sigle / Code',
      type: 'select',
      icon: <Building2 className="w-3.5 h-3.5" />,
      options: SERVICES_LIST.map((s) => ({
        value: s.shortName,
        label: `${s.shortName} — ${s.name}`,
      })),
    },
    {
      id: 'head',
      label: 'Responsable / Direction',
      type: 'text',
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      id: 'memberCount',
      label: 'Nombre de membres',
      type: 'number',
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      id: 'appCount',
      label: 'Applications associées',
      type: 'number',
      icon: <AppWindow className="w-3.5 h-3.5" />,
    },
    {
      id: 'status',
      label: 'État opérationnel',
      type: 'select',
      icon: <Shield className="w-3.5 h-3.5" />,
      options: [
        { value: 'Opérationnel', label: 'Opérationnel' },
        { value: 'Actif', label: 'Actif' },
      ],
    },
  ],
};

function getSiteFieldValue(site: ServiceItem, fieldId: string): unknown {
  switch (fieldId) {
    case 'category':
      return site.category;
    case 'shortName':
      return site.shortName;
    case 'head':
      return site.head;
    case 'memberCount':
      return site.memberCount;
    case 'appCount':
      return site.appCount;
    case 'status':
      return site.status;
    default:
      return undefined;
  }
}

export function ServicesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ serviceUuid?: string; tab?: string }>();

  // Recherche & Filtres pour la vue des Sites
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilterBar, setShowFilterBar] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const { fields, onChange: onFiltersChange } = useFilterSchema(SITES_FILTER_SCHEMA, filters, setFilters);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Extract service/site UUID from path (e.g. /sites/srv-8f92a10b/applications, /services/srv-8f92a10b/applications or params.serviceUuid)
  const pathParts = location.pathname.split('/').filter(Boolean);
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

  const handleResetFilters = () => {
    playXboxSound('back');
    setSearchTerm('');
    setFilters([]);
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

  // Filtrage combiné : Recherche textuelle + FilterBar
  const filteredSites = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return SERVICES_LIST.filter((srv) => {
      // 1. Filtres avancés du FilterBar
      if (filters.length > 0 && !matchesFilters(srv, filters, SITES_FILTER_SCHEMA, getSiteFieldValue)) {
        return false;
      }

      // 2. Recherche textuelle
      if (!q) return true;

      const nameMatch = srv.name.toLowerCase().includes(q);
      const shortMatch = srv.shortName.toLowerCase().includes(q);
      const descMatch = srv.description.toLowerCase().includes(q);
      const headMatch = srv.head.toLowerCase().includes(q);
      const catMatch = srv.category.toLowerCase().includes(q);
      const uuidMatch = srv.uuid.toLowerCase().includes(q);

      return nameMatch || shortMatch || descMatch || headMatch || catMatch || uuidMatch;
    });
  }, [searchTerm, filters]);

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

    return filteredSites.map((srv, idx) => ({
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
  }, [filteredSites]);

  // VIEW 1: Carrousel Stagger pour la sélection des Sites avec Barre de recherche et FilterBar
  if (!selectedService) {
    return (
      <div className="w-full h-full min-h-[calc(100vh-120px)] flex flex-col text-slate-100 overflow-x-hidden overflow-y-auto px-0 py-3 select-none scrollbar-thin scrollbar-thumb-teal-500/20">
        
        {/* ── BARRE DE RECHERCHE ET SYSTÈME DE FILTRE DE RÉFÉRENCE EN HAUT (AVEC PADDING X) ── */}
        <div className="w-full max-w-5xl mx-auto mb-1 px-4 sm:px-6 lg:px-8 shrink-0 relative z-30">
          <div className="relative rounded-2xl bg-transparent border border-white/15 focus-within:border-teal-400/80 focus-within:ring-2 focus-within:ring-teal-400/20 transition-all overflow-hidden shadow-lg backdrop-blur-sm">
            
            {/* Ligne 1 : Input de recherche & Outils d'action */}
            <div className="flex items-center px-4 py-2.5 sm:py-3 gap-3 bg-transparent">
              <div className="w-8 h-8 rounded-xl bg-transparent border border-white/10 flex items-center justify-center text-teal-300 shrink-0">
                <Search className="w-4 h-4" />
              </div>

              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un site, direction, sigle (DSI, DRH, DFC...), responsable ou mot-clé..."
                className="flex-1 bg-transparent border-none text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-0 leading-relaxed truncate"
              />

              <div className="flex items-center gap-2 shrink-0">
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      playXboxSound('select');
                      setSearchTerm('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1.5 rounded-lg bg-transparent hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
                    title="Effacer la recherche"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Bouton pour afficher/masquer le FilterBar */}
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('select');
                    setShowFilterBar(v => !v);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    showFilterBar || filters.length > 0
                      ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-sm'
                      : 'bg-transparent text-slate-300 hover:text-white hover:bg-white/10 border-white/15'
                  }`}
                  title="Afficher les filtres avancés des sites"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Filtres</span>
                  {filters.length > 0 && (
                    <span className="min-w-[1.1rem] rounded-full bg-slate-950 px-1 text-center text-[10px] font-black leading-[1.1rem] text-teal-300">
                      {filters.length}
                    </span>
                  )}
                </button>

                {(searchTerm || filters.length > 0) && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="p-1.5 rounded-lg bg-transparent hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer border border-white/10"
                    title="Réinitialiser les filtres"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Ligne 2 : COMPOSANT DE RÉFÉRENCE FILTERBAR */}
            <div className={`dark w-full px-4 pb-3 pt-2 border-t border-white/10 bg-transparent ${showFilterBar || filters.length > 0 ? 'block' : 'hidden'}`}>
              <FilterBar
                fields={fields}
                value={filters}
                onChange={onFiltersChange}
                addLabel="Ajouter un filtre de site"
                emptyLabel="Filtrer par Catégorie, Sigle, Responsable, Membres, Apps..."
                clearLabel="Effacer les filtres"
                aria-label="Filtrer les sites organisationnels"
                className="bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* ── CARROUSEL STAGGER PLEINE LARGEUR (SANS PADDING X COUPANT) ── */}
        <div className="w-full flex-1 flex flex-col items-center justify-center relative z-10 px-0">
          {filteredSites.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-transparent border border-white/10 text-slate-400 my-auto mx-4">
              <div className="w-14 h-14 rounded-2xl bg-transparent border border-white/10 flex items-center justify-center mb-3 text-slate-500">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Aucun site ne correspond à ces critères</h3>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Essayez d'ajuster votre recherche ou réinitialisez les filtres actifs.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Réinitialiser les filtres</span>
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center px-0">
              <StaggerTestimonials
                testimonials={siteCarouselItems}
                height={500}
                className="w-full"
                onSelect={(item) => {
                  playXboxSound('select');
                  navigate(`/sites/${item.siteUuid || 'srv-8f92a10b'}/applications`);
                }}
              />
            </div>
          )}
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

export default ServicesPage;
