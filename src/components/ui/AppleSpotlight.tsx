"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  X, 
  CornerDownLeft, 
  Users, 
  FileText, 
  Newspaper, 
  CalendarDays, 
  AppWindow, 
  Building2, 
  Copy, 
  Check, 
  ChevronRight,
  FolderOpen,
  MapPin,
  Sparkles,
  Award,
  Hash,
  Tag,
  Layers,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import { DIRECTORY_EMPLOYEES, DIRECTORY_SITES, DirectoryEmployee, getEmployeeUuid } from '../../data/directoryData';
import { ALL_EVENTS } from '../../data/eventsMockData';
import { SERVICES_LIST, ServiceItem } from '../../data/servicesData';
import { initialFolders } from '../../data/mockFolders';
import { FolderItem } from '../../types/document';
import { EventItem } from '../../types/events';
import { 
  FilterBar, 
  useFilterSchema, 
  matchesFilters, 
  type Filter, 
  type FilterSchema 
} from '../filters/Filterbar';

// Types d'éléments indexables par Spotlight
export type SpotlightCategory = 'all' | 'collaborateurs' | 'documents' | 'actualites' | 'agenda' | 'applications' | 'sites';

export interface SpotlightResultItem {
  id: string;
  category: SpotlightCategory;
  categoryLabel: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  badgeTone?: 'emerald' | 'teal' | 'amber' | 'sky' | 'purple' | 'rose';
  avatar?: string;
  icon?: React.ReactNode;
  route: string;
  date?: string;
  tags?: string[];
  metadata?: {
    uuid?: string;
    site?: string;
    email?: string;
    phone?: string;
    location?: string;
    cote?: string;
    reference?: string;
    author?: string;
    appCount?: number;
    memberCount?: number;
  };
  rawData?: unknown;
}

// Configuration des sections
const SECTIONS_CONFIG: {
  category: SpotlightCategory;
  title: string;
  subtitle: string;
  badgeBg: string;
  badgeText: string;
}[] = [
  {
    category: 'collaborateurs',
    title: 'Collaborateurs & Personnel',
    subtitle: 'Fiches agents, compétences, annuaire et coordonnées directes',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300',
  },
  {
    category: 'documents',
    title: 'Documents & Cotes d’archivage (GED)',
    subtitle: 'Dossiers administratifs, plans de classement et cotes physiques',
    badgeBg: 'bg-teal-500/20',
    badgeText: 'text-teal-300',
  },
  {
    category: 'actualites',
    title: 'News, Publications & Circulaires',
    subtitle: 'Articles d’actualité interne, arrêtés officiels et notes de service',
    badgeBg: 'bg-sky-500/20',
    badgeText: 'text-sky-300',
  },
  {
    category: 'agenda',
    title: 'Agenda & Événements',
    subtitle: 'Réunions, formations, séminaires et planning institutionnel',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300',
  },
  {
    category: 'applications',
    title: 'Applications & Modules Intranet',
    subtitle: 'Outils métiers, modules transverses et consoles de gestion',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-300',
  },
  {
    category: 'sites',
    title: 'Sites & Directions Organisationnelles',
    subtitle: 'Pôles territoriaux, délégations régionales et espaces de travail',
    badgeBg: 'bg-teal-500/20',
    badgeText: 'text-teal-300',
  },
];

// Articles d'actualités indexés pour la recherche
const INDEXED_ARTICLES = [
  {
    id: 'news-1',
    title: 'Modernisation intégrale de la GED et Archivage Électronique',
    summary: 'Déploiement du nouveau protocole de numérisation haute sécurité avec traçabilité blockchain et archivage 3D pour tous les services.',
    category: 'News & Publications',
    date: '21 Septembre 2026',
    route: '/actualites',
    author: 'Secrétariat Général'
  },
  {
    id: 'news-2',
    title: 'Guide méthodologique : Classement et nomenclature des dossiers 2026',
    summary: 'Consultez la synthèse des bonnes pratiques pour l’indexation automatique et le versement des bordereaux dématérialisés.',
    category: 'Articles & Dossiers',
    date: '18 Septembre 2026',
    route: '/actualites',
    author: 'Direction des Archives'
  },
  {
    id: 'news-3',
    title: 'Bilan semestriel de la transformation numérique publique',
    summary: 'Plus de 45 000 dossiers traités en ligne au premier semestre avec un taux de satisfaction usager supérieur à 94%.',
    category: 'Revue de Presse',
    date: '15 Septembre 2026',
    route: '/actualites',
    author: 'DSI Intranet'
  },
  {
    id: 'news-4',
    title: 'Maintenance préventive des serveurs centraux GED ce samedi',
    summary: 'Intervention d’optimisation sur les clusters de bases de données et baies de stockage optique de 22h00 à 02h00.',
    category: 'Flash Info Entreprise',
    date: '26 Septembre 2026',
    route: '/annonces',
    author: 'Direction des Systèmes d’Information'
  },
  {
    id: 'news-5',
    title: 'Circulaire N° 2026/04 : Simplification des visas électroniques interservices',
    summary: 'Nouvelle procédure allégée pour l’instruction dématérialisée et l’apposition des signatures qualifiées eIDAS.',
    category: 'Directives & Circulaires',
    date: '1er Octobre 2026',
    route: '/annonces',
    author: 'Secrétariat Général'
  }
];

// Applications indexées pour Spotlight
const INDEXED_APPS = [
  {
    id: 'app-ged',
    name: 'EGEN GED Documents',
    category: 'Gestion Électronique des Documents',
    description: 'Gestion documentaire transverse, plans de classement, cotes physiques et archivage 3D.',
    route: '/ged',
    badge: 'Core GED'
  },
  {
    id: 'app-annuaire',
    name: 'Annuaire Collaborateurs',
    category: 'Ressources Humaines & Communication',
    description: 'Fiches du personnel, organigramme institutionnel, compétences, coordonnées et contacts.',
    route: '/annuaire',
    badge: 'HR Portal'
  },
  {
    id: 'app-agenda',
    name: 'Agenda & Planning',
    category: 'Organisation & Événements',
    description: 'Agenda institutionnel, réunions inter-services, séminaires et calendrier des astreintes.',
    route: '/informations/agenda',
    badge: 'Planning'
  },
  {
    id: 'app-actualites',
    name: 'Actualités & Communication',
    category: 'Information & Médias',
    description: 'Journal interne, circulaires officielles, notes de service et publications stratégiques.',
    route: '/actualites',
    badge: 'Médias'
  },
  {
    id: 'app-admin',
    name: 'Console Administration & IAM',
    category: 'Sécurité & Gouvernance',
    description: 'Gestion des rôles RBAC, permissions fines, audits d’accès et sécurité de l’intranet.',
    route: '/administration',
    badge: 'Admin'
  },
  {
    id: 'app-sites',
    name: 'Portail des Sites & Pôles',
    category: 'Organisation & Espaces',
    description: 'Navigation par direction, pôles régionaux, ressources partagées et équipes associées.',
    route: '/sites',
    badge: 'Sites'
  }
];

// Schéma complet de la FilterBar de référence pour la recherche globale
const SEARCH_FILTER_SCHEMA: FilterSchema = {
  fields: [
    {
      id: 'category',
      label: 'Domaine / Espace',
      type: 'select',
      icon: <Layers className="w-3.5 h-3.5" />,
      options: [
        { value: 'collaborateurs', label: 'Collaborateurs & Personnel' },
        { value: 'documents', label: 'Documents & Cotes GED' },
        { value: 'actualites', label: 'News & Publications' },
        { value: 'agenda', label: 'Agenda & Événements' },
        { value: 'applications', label: 'Applications Intranet' },
        { value: 'sites', label: 'Sites & Directions' },
      ],
    },
    {
      id: 'site',
      label: 'Site / Localisation',
      type: 'select',
      icon: <MapPin className="w-3.5 h-3.5" />,
      options: DIRECTORY_SITES.map((s) => ({
        value: s.name,
        label: s.name,
      })),
    },
    {
      id: 'status',
      label: 'Statut de présence',
      type: 'select',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      options: [
        { value: 'available', label: 'En ligne (Disponible)' },
        { value: 'busy', label: 'Occupé' },
        { value: 'meeting', label: 'En réunion' },
        { value: 'away', label: 'En déplacement' },
      ],
    },
    {
      id: 'badge',
      label: 'Distinction / Badge',
      type: 'select',
      icon: <Award className="w-3.5 h-3.5" />,
      options: [
        { value: 'MVP', label: 'MVP' },
        { value: 'Business Lead', label: 'Business Lead' },
        { value: 'Admin', label: 'Administrateur' },
        { value: 'Tech Lead', label: 'Tech Lead' },
        { value: 'HR', label: 'Ressources Humaines' },
      ],
    },
    {
      id: 'cote',
      label: 'Cote ou Réf. GED',
      type: 'text',
      icon: <Hash className="w-3.5 h-3.5" />,
    },
    {
      id: 'author',
      label: 'Auteur / Responsable',
      type: 'text',
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      id: 'tags',
      label: 'Compétence / Tag',
      type: 'text',
      icon: <Tag className="w-3.5 h-3.5" />,
    },
  ],
};

function getSpotlightFieldValue(item: SpotlightResultItem, fieldId: string): unknown {
  switch (fieldId) {
    case 'category':
      return item.category;
    case 'site':
      return item.metadata?.site ?? item.metadata?.location ?? '';
    case 'status':
      return (item.rawData as any)?.status ?? '';
    case 'badge':
      return item.badge ?? '';
    case 'cote':
      return item.metadata?.cote ?? item.metadata?.reference ?? '';
    case 'author':
      return item.metadata?.author ?? '';
    case 'tags':
      return item.tags ?? [];
    default:
      return undefined;
  }
}

export interface AppleSpotlightProps {
  initialQuery?: string;
  initialCategory?: SpotlightCategory;
  onSelectResult?: (result: SpotlightResultItem) => void;
  className?: string;
  embedded?: boolean;
}

export function AppleSpotlight({
  initialQuery = '',
  initialCategory = 'all',
  onSelectResult,
  className = '',
  embedded = false,
}: AppleSpotlightProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<SpotlightCategory>(initialCategory);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Filtres avancés via le composant FilterBar de référence
  const [filters, setFilters] = useState<Filter[]>([]);
  const { fields, onChange: onFiltersChange } = useFilterSchema(SEARCH_FILTER_SCHEMA, filters, setFilters);

  // Auto focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Catégories avec compteurs
  const categoryTabs: { id: SpotlightCategory; label: string }[] = [
    { id: 'all', label: 'Toutes les sections' },
    { id: 'collaborateurs', label: 'Collaborateurs' },
    { id: 'documents', label: 'Documents & Cotes' },
    { id: 'actualites', label: 'News & Publications' },
    { id: 'agenda', label: 'Agenda & Événements' },
    { id: 'applications', label: 'Applications' },
    { id: 'sites', label: 'Sites & Pôles' },
  ];

  // Indexation universelle de l'intranet
  const allIndexedResults = useMemo<SpotlightResultItem[]>(() => {
    const list: SpotlightResultItem[] = [];

    // 1. Collaborateurs
    DIRECTORY_EMPLOYEES.forEach((emp: DirectoryEmployee) => {
      const empUuid = emp.uuid || getEmployeeUuid(emp);
      list.push({
        id: `collab-${emp.id}`,
        category: 'collaborateurs',
        categoryLabel: 'Annuaire Collaborateur',
        title: emp.fullName,
        subtitle: `${emp.role} • ${emp.site}`,
        description: `Poste fixe ${emp.extension || 'N/A'} • ${emp.email} • Dépt: ${emp.department}`,
        badge: emp.badge || (emp.status === 'available' ? 'En ligne' : emp.statusLabel),
        badgeTone: emp.badge ? 'purple' : emp.status === 'available' ? 'emerald' : 'amber',
        avatar: emp.avatar,
        route: `/annuaire/${empUuid}/review`,
        tags: emp.skills,
        metadata: {
          uuid: empUuid,
          site: emp.site,
          email: emp.email,
          phone: emp.phone,
          author: emp.fullName
        },
        rawData: emp
      });
    });

    // 2. Documents & Dossiers GED
    initialFolders.forEach((folder: FolderItem) => {
      list.push({
        id: `doc-${folder.id}`,
        category: 'documents',
        categoryLabel: 'Dossier / Document GED',
        title: folder.name,
        subtitle: `Cote : ${folder.matricule || 'EC-2026-DOC'} • ${folder.itemCount || 0} pièces jointes`,
        description: folder.description || 'Dossier administratif indexé avec plan de classement physique et électronique.',
        badge: folder.category || 'Archivé',
        badgeTone: 'teal',
        icon: <FolderOpen className="w-4 h-4 text-teal-400" />,
        route: `/ged/sites`,
        date: folder.updatedAt,
        metadata: {
          cote: folder.matricule,
          reference: folder.matricule,
          author: 'Direction des Archives'
        },
        rawData: folder
      });
    });

    // 3. Actualités & Circulaires
    INDEXED_ARTICLES.forEach((art) => {
      list.push({
        id: art.id,
        category: 'actualites',
        categoryLabel: 'Actualité & Publication',
        title: art.title,
        subtitle: `${art.category} • ${art.date}`,
        description: art.summary,
        badge: art.category.split(' ')[0],
        badgeTone: 'sky',
        icon: <Newspaper className="w-4 h-4 text-sky-400" />,
        route: art.route,
        date: art.date,
        metadata: {
          author: art.author
        },
        rawData: art
      });
    });

    // 4. Agenda & Événements
    ALL_EVENTS.forEach((evt: EventItem) => {
      list.push({
        id: evt.id,
        category: 'agenda',
        categoryLabel: 'Agenda & Événement',
        title: evt.title,
        subtitle: `${evt.dateLabel || `${evt.day} ${evt.month}`} • ${evt.location}`,
        description: evt.description || evt.summary,
        badge: evt.category,
        badgeTone: 'amber',
        icon: <CalendarDays className="w-4 h-4 text-amber-400" />,
        route: '/informations/agenda',
        date: evt.dateLabel,
        tags: evt.tags,
        metadata: {
          location: evt.location,
          author: evt.organizer?.name
        },
        rawData: evt
      });
    });

    // 5. Applications Connectées
    INDEXED_APPS.forEach((app) => {
      list.push({
        id: app.id,
        category: 'applications',
        categoryLabel: 'Application Intranet',
        title: app.name,
        subtitle: app.category,
        description: app.description,
        badge: app.badge,
        badgeTone: 'purple',
        icon: <AppWindow className="w-4 h-4 text-purple-400" />,
        route: app.route,
        rawData: app
      });
    });

    // 6. Sites & Pôles
    SERVICES_LIST.forEach((srv: ServiceItem) => {
      list.push({
        id: `site-${srv.uuid}`,
        category: 'sites',
        categoryLabel: 'Site & Direction',
        title: `${srv.shortName} — ${srv.name}`,
        subtitle: `${srv.category} • UUID : ${srv.uuid}`,
        description: srv.description,
        badge: `${srv.memberCount} membres`,
        badgeTone: 'teal',
        icon: <Building2 className="w-4 h-4 text-teal-400" />,
        route: `/sites/${srv.uuid}/applications`,
        metadata: {
          uuid: srv.uuid,
          memberCount: srv.memberCount,
          appCount: srv.appCount
        },
        rawData: srv
      });
    });

    return list;
  }, []);

  // Filtrage combiné : Recherche textuelle + Filtre Catégorie + FilterBar avancé
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allIndexedResults.filter((item) => {
      // 1. Filtre par onglet de catégorie (si pas 'all')
      if (category !== 'all' && item.category !== category) return false;

      // 2. Évaluation des filtres du FilterBar
      if (filters.length > 0 && !matchesFilters(item, filters, SEARCH_FILTER_SCHEMA, getSpotlightFieldValue)) {
        return false;
      }

      // 3. Recherche textuelle
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const subMatch = item.subtitle?.toLowerCase().includes(q);
      const descMatch = item.description?.toLowerCase().includes(q);
      const tagMatch = item.tags?.some(t => t.toLowerCase().includes(q));
      const uuidMatch = item.metadata?.uuid?.toLowerCase().includes(q);
      const coteMatch = item.metadata?.cote?.toLowerCase().includes(q);
      const emailMatch = item.metadata?.email?.toLowerCase().includes(q);

      return titleMatch || subMatch || descMatch || tagMatch || uuidMatch || coteMatch || emailMatch;
    });
  }, [allIndexedResults, query, category, filters]);

  // Groupement ordonné par sections
  const groupedSections = useMemo(() => {
    return SECTIONS_CONFIG.map(sec => {
      const items = filteredResults.filter(r => r.category === sec.category);
      return {
        ...sec,
        items,
      };
    }).filter(sec => sec.items.length > 0);
  }, [filteredResults]);

  // Index absolu de l'élément sélectionné
  const selectedItem = useMemo(() => {
    if (filteredResults.length === 0) return null;
    const clampedIndex = Math.max(0, Math.min(selectedIndex, filteredResults.length - 1));
    return filteredResults[clampedIndex] || filteredResults[0];
  }, [filteredResults, selectedIndex]);

  // Réinitialisation de l'index quand les critères changent
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, category, filters]);

  // Action d'ouverture d'un résultat
  const handleOpenItem = useCallback((item: SpotlightResultItem) => {
    playXboxSound('select');
    if (onSelectResult) {
      onSelectResult(item);
    } else {
      navigate(item.route);
    }
  }, [navigate, onSelectResult]);

  // Navigation au clavier (Flèches Haut / Bas, Entrée, Échap)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playXboxSound('toggle');
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playXboxSound('toggle');
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter' && selectedItem) {
      e.preventDefault();
      handleOpenItem(selectedItem);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      playXboxSound('back');
      if (query) {
        setQuery('');
      }
    }
  };

  const handleCopyText = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playXboxSound('select');
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetAllFilters = () => {
    playXboxSound('back');
    setQuery('');
    setCategory('all');
    setFilters([]);
  };

  const getToneBadgeClass = (tone?: string) => {
    switch (tone) {
      case 'emerald': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'teal': return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
      case 'amber': return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'sky': return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'purple': return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'rose': return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      default: return 'bg-white/10 text-slate-300 border-white/15';
    }
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      
      {/* ── 1. ZONE DE RECHERCHE & FILTRES DE RÉFÉRENCE (SANS BACKGROUND) ── */}
      <div className="relative z-20 w-full mb-4 sm:mb-5">
        <div className="relative group rounded-2xl bg-transparent border border-white/15 focus-within:border-teal-400/80 focus-within:ring-2 focus-within:ring-teal-400/20 transition-all overflow-hidden">
          
          {/* Ligne 1 : Input de recherche & Outils */}
          <div className="flex items-center px-4 py-3 sm:py-3.5 gap-3 sm:gap-4 bg-transparent">
            
            {/* Spotlight Icon */}
            <div className="w-9 h-9 rounded-xl bg-transparent border border-white/10 flex items-center justify-center text-teal-300 shrink-0">
              <Search className="w-4 h-4" />
            </div>

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Rechercher collaborateurs, cotes GED, articles, événements, applications..."
              className="flex-1 bg-transparent border-none text-white placeholder-slate-400 text-sm sm:text-base md:text-lg font-medium focus:outline-none focus:ring-0 leading-relaxed truncate"
            />

            {/* Clear Query & Bouton Filtres Avancés */}
            <div className="flex items-center gap-2 shrink-0">
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('select');
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1.5 rounded-lg bg-transparent hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
                  title="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Bouton pour afficher/masquer le FilterBar avancé */}
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setShowFilters(v => !v);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  showFilters || filters.length > 0
                    ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-sm'
                    : 'bg-transparent text-slate-300 hover:text-white hover:bg-white/10 border-white/15'
                }`}
                title="Afficher la barre de filtres avancés"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filtres</span>
                {filters.length > 0 && (
                  <span className="min-w-[1.1rem] rounded-full bg-slate-950 px-1 text-center text-[10px] font-black leading-[1.1rem] text-teal-300">
                    {filters.length}
                  </span>
                )}
              </button>

              {(query || filters.length > 0 || category !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="p-1.5 rounded-lg bg-transparent hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer border border-white/10"
                  title="Réinitialiser tous les filtres et la recherche"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-transparent border border-white/10 text-slate-400 text-xs font-mono select-none">
                <span>Ouvrir</span>
                <CornerDownLeft className="w-3.5 h-3.5 text-teal-400" />
              </div>
            </div>
          </div>

          {/* Ligne 2 : Catégories Tabs (Pills transparentes) */}
          <div className="flex items-center gap-1.5 px-4 pb-3 pt-1 border-t border-white/10 overflow-x-auto no-scrollbar select-none bg-transparent">
            {categoryTabs.map((tab) => {
              const isActive = category === tab.id;
              const count = tab.id === 'all' 
                ? allIndexedResults.length 
                : allIndexedResults.filter(i => i.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playXboxSound('select');
                    setCategory(tab.id);
                  }}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                      : 'bg-transparent hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ligne 3 : COMPOSANT DE RÉFÉRENCE FILTERBAR DÉPLOYABLE */}
          <div className={`dark w-full px-4 pb-3.5 pt-2 border-t border-white/10 bg-transparent ${showFilters || filters.length > 0 ? 'block' : 'hidden'}`}>
            <FilterBar
              fields={fields}
              value={filters}
              onChange={onFiltersChange}
              addLabel="Ajouter un filtre"
              emptyLabel="Filtrer par Domaine, Site, Statut, Badge, Cote GED, Auteur..."
              clearLabel="Effacer les filtres"
              aria-label="Filtrer la recherche globale"
              className="bg-transparent"
            />
          </div>

        </div>
      </div>

      {/* ── 2. RÉSULTATS PAR SECTIONS CATÉGORISÉES PLEINE LARGEUR ── */}
      <div className="w-full flex-1 min-h-0">
        
        <div 
          ref={resultsContainerRef}
          className="w-full flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-210px)] pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-teal-500/30 hover:scrollbar-thumb-teal-400/50 select-none pb-8"
        >
          {filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-transparent border border-white/10 text-slate-400">
              <div className="w-14 h-14 rounded-2xl bg-transparent border border-white/10 flex items-center justify-center mb-3 text-slate-500">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Aucun résultat trouvé</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Aucun élément ne correspond aux filtres appliqués. Modifiez vos critères ou réinitialisez les filtres.
              </p>
              {(query || filters.length > 0 || category !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetAllFilters}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser la recherche et les filtres</span>
                </button>
              )}
            </div>
          ) : (
            groupedSections.map((section) => (
              <div key={section.category} className="flex flex-col gap-2.5">
                
                {/* ── EN-TÊTE DE SECTION CATÉGORISÉE (SANS ICÔNE) ── */}
                <div className="flex items-center justify-between px-1 py-1.5 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-tight uppercase">
                        {section.title}
                      </h3>
                      <span className={`px-2 py-0.2 rounded-full text-[10px] font-mono font-bold ${section.badgeBg} ${section.badgeText}`}>
                        {section.items.length}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 hidden sm:block">
                      {section.subtitle}
                    </p>
                  </div>

                  {/* Bouton pour filtrer uniquement sur cette section */}
                  {category === 'all' && (
                    <button
                      type="button"
                      onClick={() => {
                        playXboxSound('select');
                        setCategory(section.category);
                      }}
                      className="text-[11px] text-teal-300/80 hover:text-teal-200 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span>Filtrer</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* ── ITEMS DANS LA SECTION ── */}
                <div className="flex flex-col gap-2">
                  {section.items.map((item) => {
                    const globalItemIndex = filteredResults.findIndex(r => r.id === item.id);
                    const isSelected = selectedItem?.id === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        onClick={() => {
                          setSelectedIndex(globalItemIndex);
                          handleOpenItem(item);
                        }}
                        onMouseEnter={() => setSelectedIndex(globalItemIndex)}
                        className={`group relative p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-slate-800/95 border-teal-400/60 shadow-xl shadow-teal-500/10 ring-1 ring-teal-400/40'
                            : 'bg-slate-900/60 hover:bg-slate-800/60 border-white/10 hover:border-white/20 shadow-md backdrop-blur-md'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          
                          {/* Avatar ou Icône de domaine */}
                          <div className="shrink-0 relative">
                            {item.avatar ? (
                              <img
                                src={item.avatar}
                                alt={item.title}
                                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                {item.icon || <FileText className="w-4 h-4 text-teal-400" />}
                              </div>
                            )}
                          </div>

                          {/* Informations textuelles */}
                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                              {item.badge && (
                                <span className={`px-2 py-0.2 rounded-md text-[10px] font-bold border ${getToneBadgeClass(item.badgeTone)}`}>
                                  {item.badge}
                                </span>
                              )}
                              {item.metadata?.uuid && (
                                <span className="text-[10px] font-mono text-slate-400">
                                  #{item.metadata.uuid}
                                </span>
                              )}
                              {item.metadata?.cote && (
                                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/40 px-1.5 py-0.2 rounded-md border border-purple-500/30">
                                  Cote: {item.metadata.cote}
                                </span>
                              )}
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-teal-200 transition-colors truncate">
                              {item.title}
                            </h4>

                            {item.subtitle && (
                              <p className="text-[11px] text-slate-300/90 truncate mt-0.5">
                                {item.subtitle}
                              </p>
                            )}

                            {item.description && (
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Actions & Chevron */}
                        <div className="flex items-center gap-2 shrink-0">
                          {item.metadata?.uuid && (
                            <button
                              type="button"
                              onClick={(e) => handleCopyText(item.metadata!.uuid!, item.id, e)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/10 text-xs transition-colors"
                              title="Copier l'UUID"
                            >
                              {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          )}

                          <div className={`p-1.5 rounded-xl border transition-all ${
                            isSelected ? 'bg-teal-500 text-slate-950 border-teal-400' : 'bg-white/5 text-slate-400 border-white/10 group-hover:text-white'
                          }`}>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}

export default AppleSpotlight;
