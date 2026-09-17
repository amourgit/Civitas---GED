import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  FolderPlus, 
  Search, 
  Filter, 
  FileText, 
  Archive, 
  ChevronRight, 
  Building, 
  Scroll, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Box, 
  Layers, 
  X, 
  ArrowUpRight, 
  Plus, 
  Eye, 
  Download, 
  ShieldCheck, 
  Calendar, 
  User, 
  MapPin, 
  Tag,
  Share2,
  Check,
  Building2,
  Landmark,
  FileCheck,
  LayoutGrid,
  List
} from 'lucide-react';
import { 
  INSTITUTIONAL_SERVICES, 
  ServiceDossier, 
  ServiceItem, 
  DossierLifecycleStatus,
  ServiceDocument
} from '../../data/servicesStructure';
import { playXboxSound } from '../../utils/xboxAudio';
import { DocumentGrid } from '../collection/DocumentGrid';
import { FolderItem } from '../../types/document';

// Helper to bridge ServiceDossier to FolderItem for FolderCard
function serviceDossierToFolderItem(dossier: ServiceDossier): FolderItem {
  let theme: FolderItem['folderTheme'] = 'emerald';
  if (dossier.archivage.isPhysicallyArchived) theme = 'purple';
  else if (dossier.status === 'En traitement' || dossier.status === 'En cours') theme = 'amber';
  else if (dossier.status === 'Nouveau') theme = 'cyan';
  else if (dossier.status === 'Clôturé') theme = 'emerald';
  else if (dossier.status === 'À archiver') theme = 'teal';

  const numMatricule = dossier.reference.replace(/[^0-9]/g, '') || '2026000000';

  return {
    id: dossier.id,
    matricule: numMatricule,
    name: dossier.title,
    type: 'folder',
    itemCount: dossier.documents.length,
    updatedAt: dossier.dateCreation,
    category: 'documents',
    folderTheme: theme,
    iconType: 'administrative',
    description: dossier.description,
    permissions: { canEdit: true, canShare: true, canDelete: false, canDownload: true },
    filesInside: dossier.documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      type: doc.format.toLowerCase() === 'pdf' ? 'pdf' : doc.format.toLowerCase() === 'xlsx' ? 'sheet' : 'doc',
      size: doc.size,
      updatedAt: doc.date
    }))
  };
}

// Lifecycle filter definitions
type LifecycleFilterKey = 'tous' | 'nouveaux' | 'en-traitement' | 'a-completer' | 'clotures' | 'a-archiver' | 'archives';

interface LifecycleFilterOption {
  key: LifecycleFilterKey;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  badgeClass: string;
  statusMatch?: DossierLifecycleStatus[];
}

const LIFECYCLE_OPTIONS: LifecycleFilterOption[] = [
  {
    key: 'tous',
    label: 'Tous les dossiers',
    shortLabel: 'Tous',
    icon: <Layers className="w-4 h-4 text-white/70" />,
    badgeClass: 'bg-white/10 text-white/90 border-white/20'
  },
  {
    key: 'nouveaux',
    label: 'Nouveaux',
    shortLabel: 'Nouveaux',
    icon: <span className="text-sm">🆕</span>,
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    statusMatch: ['Nouveau']
  },
  {
    key: 'en-traitement',
    label: 'En traitement',
    shortLabel: 'En cours',
    icon: <span className="text-sm">🔄</span>,
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    statusMatch: ['En traitement']
  },
  {
    key: 'a-completer',
    label: 'À compléter',
    shortLabel: 'À compléter',
    icon: <span className="text-sm">⚠️</span>,
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    statusMatch: ['À compléter']
  },
  {
    key: 'clotures',
    label: 'Clôturés',
    shortLabel: 'Clôturés',
    icon: <span className="text-sm">✅</span>,
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    statusMatch: ['Clôturé']
  },
  {
    key: 'a-archiver',
    label: 'À archiver',
    shortLabel: 'À archiver',
    icon: <span className="text-sm">📦</span>,
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    statusMatch: ['À archiver']
  },
  {
    key: 'archives',
    label: 'Archivés',
    shortLabel: 'Archivés',
    icon: <span className="text-sm">🗄️</span>,
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    statusMatch: ['Archivé']
  }
];

export function DossiersMetierPage() {
  const navigate = useNavigate();
  const { serviceId: paramServiceId } = useParams<{ serviceId?: string }>();

  // Context: default to 'etat-civil' or parameter
  const [selectedServiceId, setSelectedServiceId] = useState<string>(paramServiceId || 'etat-civil');
  
  // Active filters
  const [activeLifecycle, setActiveLifecycle] = useState<LifecycleFilterKey>('tous');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationFilter, setLocationFilter] = useState<'all' | 'unassigned' | 'archived'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Dossier selection for detail view
  const [activeDossier, setActiveDossier] = useState<ServiceDossier | null>(null);

  // Modal new dossier
  const [isNewDossierModalOpen, setIsNewDossierModalOpen] = useState<boolean>(false);
  const [newDossierType, setNewDossierType] = useState<string>('');
  const [newDossierPersonne, setNewDossierPersonne] = useState<string>('');
  const [newDossierDeclarant, setNewDossierDeclarant] = useState<string>('');
  const [newDossierObjet, setNewDossierObjet] = useState<string>('');

  // Physical archive assignment modal inside dossier
  const [isAssignArchiveModalOpen, setIsAssignArchiveModalOpen] = useState<boolean>(false);
  const [assignSalle, setAssignSalle] = useState<string>('02');
  const [assignRayon, setAssignRayon] = useState<string>('04');
  const [assignCasier, setAssignCasier] = useState<string>('12');
  const [assignCote, setAssignCote] = useState<string>('');

  // Preview document
  const [previewDoc, setPreviewDoc] = useState<ServiceDocument | null>(null);

  // Find current service
  const currentService = useMemo(() => {
    return INSTITUTIONAL_SERVICES.find(s => s.id === selectedServiceId) || INSTITUTIONAL_SERVICES[0];
  }, [selectedServiceId]);

  // Local state for all dossiers across services so edits (e.g. changing status or assigning archive) persist in-session
  const [dossiersByService, setDossiersByService] = useState<Record<string, ServiceDossier[]>>(() => {
    const initial: Record<string, ServiceDossier[]> = {};
    INSTITUTIONAL_SERVICES.forEach(s => {
      initial[s.id] = [...s.dossiers];
    });
    return initial;
  });

  const currentDossiers = dossiersByService[currentService.id] || [];

  // Filtered dossiers calculation
  const filteredDossiers = useMemo(() => {
    return currentDossiers.filter(dossier => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesRef = dossier.reference.toLowerCase().includes(query);
        const matchesTitle = dossier.title.toLowerCase().includes(query);
        const matchesPersonne = (dossier.personneConcernee || '').toLowerCase().includes(query);
        const matchesDemandeur = (dossier.demandeur || '').toLowerCase().includes(query);
        const matchesDeclarant = (dossier.declarant || '').toLowerCase().includes(query);
        const matchesCote = (dossier.archivage.cote || '').toLowerCase().includes(query);
        if (!matchesRef && !matchesTitle && !matchesPersonne && !matchesDemandeur && !matchesDeclarant && !matchesCote) {
          return false;
        }
      }

      // 2. Lifecycle Filter
      if (activeLifecycle !== 'tous') {
        const opt = LIFECYCLE_OPTIONS.find(o => o.key === activeLifecycle);
        if (opt && opt.statusMatch) {
          const normStatus = dossier.status === 'En cours' ? 'En traitement' : dossier.status;
          if (!opt.statusMatch.includes(normStatus as DossierLifecycleStatus)) {
            return false;
          }
        }
      }

      // 3. Category Filter
      if (activeCategory !== 'all') {
        if (dossier.activityId !== activeCategory) {
          return false;
        }
      }

      // 4. Physical Location Filter
      if (locationFilter === 'unassigned') {
        if (dossier.archivage.isPhysicallyArchived) return false;
      } else if (locationFilter === 'archived') {
        if (!dossier.archivage.isPhysicallyArchived) return false;
      }

      return true;
    });
  }, [currentDossiers, searchQuery, activeLifecycle, activeCategory, locationFilter]);

  // Mapped folders for the real InteractiveFolderGallery DocumentGrid
  const mappedFolders = useMemo(() => {
    return filteredDossiers.map(serviceDossierToFolderItem);
  }, [filteredDossiers]);

  // Counts per lifecycle option for badges
  const lifecycleCounts = useMemo(() => {
    const counts: Record<LifecycleFilterKey, number> = {
      'tous': currentDossiers.length,
      'nouveaux': 0,
      'en-traitement': 0,
      'a-completer': 0,
      'clotures': 0,
      'a-archiver': 0,
      'archives': 0
    };

    currentDossiers.forEach(d => {
      const s = d.status === 'En cours' ? 'En traitement' : d.status;
      if (s === 'Nouveau') counts['nouveaux']++;
      else if (s === 'En traitement') counts['en-traitement']++;
      else if (s === 'À compléter') counts['a-completer']++;
      else if (s === 'Clôturé') counts['clotures']++;
      else if (s === 'À archiver') counts['a-archiver']++;
      else if (s === 'Archivé' || s === 'Versé aux archives') counts['archives']++;
    });

    return counts;
  }, [currentDossiers]);

  // Handler: Update status of active dossier
  const handleUpdateStatus = (newStatus: DossierLifecycleStatus) => {
    if (!activeDossier) return;
    playXboxSound('select');
    
    const updatedDossier: ServiceDossier = {
      ...activeDossier,
      status: newStatus
    };

    setDossiersByService(prev => ({
      ...prev,
      [currentService.id]: prev[currentService.id].map(d => d.id === activeDossier.id ? updatedDossier : d)
    }));

    setActiveDossier(updatedDossier);
  };

  // Handler: Assign physical archive location
  const handleConfirmArchiveLocation = () => {
    if (!activeDossier) return;
    playXboxSound('achievement');

    const generatedCote = assignCote.trim() || `${currentService.code === 'EC' ? '4 E' : currentService.code} ${activeDossier.reference.split('-').pop()} / 2026`;

    const updatedDossier: ServiceDossier = {
      ...activeDossier,
      status: 'Archivé',
      archivage: {
        isPhysicallyArchived: true,
        cote: generatedCote,
        salleNumero: assignSalle,
        salleNom: assignSalle === '02' ? 'Salle des Archives & Haute-Sécurité (S-02)' : 'Salle Centrale Administrative (S-01)',
        salleId: assignSalle === '02' ? 's02' : 's01',
        rayonNumero: assignRayon,
        rayonNom: `Rayon ${currentService.shortName} (RY-${assignRayon})`,
        rayonId: 'ry101',
        casierNumero: assignCasier,
        casierNom: `Casier ${activeDossier.categoryName || 'Conservation'} (CS-${assignCasier})`,
        casierId: 'cs1012',
        statusConservation: 'Conservation permanente',
        dateArchivage: new Date().toLocaleDateString('fr-FR')
      }
    };

    setDossiersByService(prev => ({
      ...prev,
      [currentService.id]: prev[currentService.id].map(d => d.id === activeDossier.id ? updatedDossier : d)
    }));

    setActiveDossier(updatedDossier);
    setIsAssignArchiveModalOpen(false);
  };

  // Handler: Create new dossier
  const handleCreateNewDossier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDossierType) return;
    playXboxSound('achievement');

    const randomNum = Math.floor(100 + Math.random() * 900);
    const refCode = `${currentService.code}-2026-00${randomNum}`;
    const act = currentService.activites.find(a => a.id === newDossierType);
    const categoryName = act ? act.name : 'Dossier';

    const newDoc: ServiceDossier = {
      id: `d-${currentService.code.toLowerCase()}-${Date.now()}`,
      reference: refCode,
      title: `${categoryName} — ${newDossierPersonne || 'Dossier en cours'}`,
      activityId: newDossierType,
      categoryName: categoryName,
      status: 'Nouveau',
      dateCreation: new Date().toLocaleDateString('fr-FR'),
      personneConcernee: newDossierPersonne || undefined,
      declarant: newDossierDeclarant || undefined,
      demandeur: newDossierDeclarant || undefined,
      description: newDossierObjet || `Nouveau dossier ouvert dans le service ${currentService.name}.`,
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          name: `Formulaire_initial_${refCode}.pdf`,
          type: 'Déclaration initiale',
          size: '1.1 Mo',
          date: new Date().toLocaleDateString('fr-FR'),
          status: 'En attente',
          format: 'PDF'
        }
      ],
      archivage: {
        isPhysicallyArchived: false,
        statusConservation: 'En cours d\'instruction'
      }
    };

    setDossiersByService(prev => ({
      ...prev,
      [currentService.id]: [newDoc, ...prev[currentService.id]]
    }));

    setIsNewDossierModalOpen(false);
    setNewDossierPersonne('');
    setNewDossierDeclarant('');
    setNewDossierObjet('');
    setActiveDossier(newDoc);
  };

  return (
    <div id="dossiers-metier-root" className="min-h-screen bg-[#070b12] text-white flex flex-col">
      {/* 1. TOP BREADCRUMB & CONTEXT SWITCHER */}
      <header className="border-b border-white/[0.08] bg-[#0c121e]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Context path: Intranet -> Service -> SGAI -> Dossiers */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
            <span 
              onClick={() => navigate('/')} 
              className="hover:text-white cursor-pointer transition-colors"
            >
              Intranet
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            
            {/* Service selector dropdown */}
            <div className="relative group">
              <select
                aria-label="Sélectionner le service territorial"
                value={selectedServiceId}
                onChange={(e) => {
                  playXboxSound('select');
                  setSelectedServiceId(e.target.value);
                  setActiveCategory('all');
                }}
                className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-xs sm:text-sm font-semibold rounded-lg px-2.5 py-1 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-sky-400"
              >
                {INSTITUTIONAL_SERVICES.map(serv => (
                  <option key={serv.id} value={serv.id} className="bg-[#0f172a] text-white">
                    {serv.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/50">
                <ChevronRight className="w-3 h-3 rotate-90" />
              </div>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="font-mono text-white/80">SGAI</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-sky-400 font-bold tracking-wide">Dossiers</span>
          </div>

          {/* Service badge */}
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-md border font-semibold ${currentService.badgeColor}`}>
              {currentService.name} • {currentDossiers.length} dossiers
            </span>
          </div>
        </div>
      </header>

      {/* 2. MAIN HEADER & ACTION BAR */}
      <div className="border-b border-white/[0.06] bg-gradient-to-b from-[#0c121e] to-[#070b12] px-4 sm:px-6 lg:px-8 pt-6 pb-6">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Header Title & New Dossier CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-mono">
                    DOSSIERS
                  </h1>
                  <p className="text-xs sm:text-sm text-white/60">
                    Cœur du travail documentaire • <span className="text-white/90 font-medium">{currentService.name}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent CTA Button: + Nouveau dossier */}
            <button
              id="btn-create-dossier"
              type="button"
              onClick={() => {
                playXboxSound('modalOpen');
                setNewDossierType(currentService.activites[0]?.id || '');
                setIsNewDossierModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all transform active:scale-95 cursor-pointer border border-sky-300/30"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
              <span>+ Nouveau dossier</span>
            </button>
          </div>

          {/* Search bar [ 🔍 Rechercher dans les dossiers... ] */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="search-dossiers-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Rechercher dans les dossiers... (référence, nom, personne, objet, cote...)"
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] focus:bg-white/[0.09] border border-white/10 focus:border-sky-400 text-white placeholder-white/40 text-sm focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter bars: Type, Statut, Emplacement, Période */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-white/[0.04]">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-white/40 uppercase font-mono tracking-wider flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filtres :
              </span>

              {/* Filter: Physical Location (Non attribué / Archivé) */}
              <div className="inline-flex rounded-lg bg-white/[0.04] p-0.5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setLocationFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    locationFilter === 'all' ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Tous emplacements
                </button>
                <button
                  type="button"
                  onClick={() => setLocationFilter('unassigned')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    locationFilter === 'unassigned' ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>📦 Non attribué (Numérique)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLocationFilter('archived')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    locationFilter === 'archived' ? 'bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <span>🗄️ Archivé physiquement</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs text-white/40 font-mono hidden sm:block">
                {filteredDossiers.length} {filteredDossiers.length > 1 ? 'dossiers trouvés' : 'dossier trouvé'}
              </div>

              {/* View Mode Toggle: Grid 3D Folder Cards vs Table */}
              <div className="inline-flex rounded-lg bg-white/[0.04] p-0.5 border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('toggle');
                    setViewMode('grid');
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-sky-500/25 text-sky-300 font-semibold border border-sky-400/40 shadow-xs' : 'text-white/60 hover:text-white'
                  }`}
                  title="Affichage Dossiers (Composants 3D)"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Dossiers (3D)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playXboxSound('toggle');
                    setViewMode('table');
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'table' ? 'bg-sky-500/25 text-sky-300 font-semibold border border-sky-400/40 shadow-xs' : 'text-white/60 hover:text-white'
                  }`}
                  title="Affichage Tableau administratif"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Tableau</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LIFECYCLE TABS (Cycle de vie : Nouveaux -> En traitement -> Complet -> Clôturés -> À archiver -> Archivés) */}
      <div className="border-b border-white/[0.08] bg-[#090e17] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-2.5 no-scrollbar">
          {LIFECYCLE_OPTIONS.map((opt) => {
            const isSelected = activeLifecycle === opt.key;
            const count = lifecycleCounts[opt.key];

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setActiveLifecycle(opt.key);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? `${opt.badgeClass} shadow-sm ring-1 ring-white/20 font-bold`
                    : 'bg-transparent text-white/60 hover:text-white hover:bg-white/[0.04] border-transparent'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-white/40'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. BUSINESS CATEGORIES CHIPS (Métier du service : ex. Naissances, Mariages, Décès...) */}
      <div className="border-b border-white/[0.04] bg-[#080c14] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/40 font-mono mr-1">Catégories métier :</span>
          
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setActiveCategory('all');
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              activeCategory === 'all'
                ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                : 'bg-white/[0.03] text-white/60 hover:text-white border-white/[0.08]'
            }`}
          >
            Toutes les catégories
          </button>

          {currentService.activites.map((act) => {
            const isSelected = activeCategory === act.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setActiveCategory(act.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 font-semibold'
                    : 'bg-white/[0.03] text-white/60 hover:text-white border-white/[0.08]'
                }`}
              >
                {act.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. DOSSIERS LIST / TABLE */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {filteredDossiers.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center max-w-lg mx-auto mt-8">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/40 mb-3">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Aucun dossier trouvé</h3>
              <p className="text-xs text-white/60 mb-5">
                Aucun dossier ne correspond aux critères de filtre sélectionnés dans {currentService.name}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveLifecycle('tous');
                  setActiveCategory('all');
                  setSearchQuery('');
                  setLocationFilter('all');
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <DocumentGrid
              folders={mappedFolders}
              selectedFolderId={activeDossier?.id || null}
              onSelectFolder={(folder) => {
                playXboxSound('select');
                const orig = filteredDossiers.find(d => d.id === folder.id);
                if (orig) setActiveDossier(orig);
              }}
              onOpenFolder={(folder) => {
                playXboxSound('select');
                const orig = filteredDossiers.find(d => d.id === folder.id);
                if (orig) setActiveDossier(orig);
              }}
              onPreviewSpecial={() => {}}
              onShare={() => {}}
              onToggleFavorite={() => {}}
              onViewProperties={(folder) => {
                playXboxSound('select');
                const orig = filteredDossiers.find(d => d.id === folder.id);
                if (orig) setActiveDossier(orig);
              }}
              onDelete={() => {}}
            />
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#0c121e]/60 backdrop-blur-sm overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-white/60 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3.5 px-4 font-semibold">Référence</th>
                      <th className="py-3.5 px-4 font-semibold">Titre & Catégorie</th>
                      <th className="py-3.5 px-4 font-semibold">Personne / Demandeur</th>
                      <th className="py-3.5 px-4 font-semibold">Date</th>
                      <th className="py-3.5 px-4 font-semibold">Statut</th>
                      <th className="py-3.5 px-4 font-semibold">Pièces</th>
                      <th className="py-3.5 px-4 font-semibold">Emplacement Physique</th>
                      <th className="py-3.5 px-4 text-right font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {filteredDossiers.map((dossier) => {
                      const isArchived = dossier.archivage.isPhysicallyArchived;
                      const normStatus = dossier.status === 'En cours' ? 'En traitement' : dossier.status;

                      // Status badge styling
                      let statusBadge = 'bg-white/10 text-white/80 border-white/20';
                      let statusIcon = '📄';
                      if (normStatus === 'Nouveau') {
                        statusBadge = 'bg-sky-500/20 text-sky-300 border-sky-500/30';
                        statusIcon = '🆕';
                      } else if (normStatus === 'En traitement') {
                        statusBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
                        statusIcon = '🔄';
                      } else if (normStatus === 'À compléter') {
                        statusBadge = 'bg-orange-500/20 text-orange-300 border-orange-500/30';
                        statusIcon = '⚠️';
                      } else if (normStatus === 'Clôturé') {
                        statusBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
                        statusIcon = '✅';
                      } else if (normStatus === 'À archiver') {
                        statusBadge = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
                        statusIcon = '📦';
                      } else if (normStatus === 'Archivé' || normStatus === 'Versé aux archives') {
                        statusBadge = 'bg-purple-500/20 text-purple-300 border-purple-500/30';
                        statusIcon = '🗄️';
                      }

                      return (
                        <tr
                          key={dossier.id}
                          onClick={() => {
                            playXboxSound('select');
                            setActiveDossier(dossier);
                          }}
                          className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                        >
                          {/* 1. Référence */}
                          <td className="py-3.5 px-4 font-mono font-bold text-sky-400 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="group-hover:underline">{dossier.reference}</span>
                            </div>
                          </td>

                          {/* 2. Titre & Catégorie */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white/90 group-hover:text-white line-clamp-1">
                              {dossier.title}
                            </div>
                            <div className="text-[11px] text-white/50 flex items-center gap-1 mt-0.5">
                              <Tag className="w-3 h-3" />
                              <span>{dossier.categoryName || currentService.activites.find(a => a.id === dossier.activityId)?.name || 'Dossier'}</span>
                            </div>
                          </td>

                          {/* 3. Personne / Demandeur */}
                          <td className="py-3.5 px-4 text-white/80 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-white/40 shrink-0" />
                              <span className="font-medium text-white/90">
                                {dossier.personneConcernee || dossier.demandeur || 'Non renseigné'}
                              </span>
                            </div>
                          </td>

                          {/* 4. Date */}
                          <td className="py-3.5 px-4 text-white/60 font-mono text-xs whitespace-nowrap">
                            {dossier.dateCreation}
                          </td>

                          {/* 5. Statut */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadge}`}>
                              <span>{statusIcon}</span>
                              <span>{normStatus}</span>
                            </span>
                          </td>

                          {/* 6. Documents count */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 text-xs text-white/70 bg-white/[0.05] px-2 py-0.5 rounded-md border border-white/10">
                              <FileText className="w-3.5 h-3.5 text-sky-400" />
                              <span>{dossier.documents.length} pièce{dossier.documents.length > 1 ? 's' : ''}</span>
                            </span>
                          </td>

                          {/* 7. Emplacement physique */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {isArchived ? (
                              <div className="text-xs">
                                <span className="inline-flex items-center gap-1 font-mono text-purple-300 font-semibold bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-md">
                                  <span>Salle {dossier.archivage.salleNumero || '02'}</span>
                                  <span className="text-white/40">→</span>
                                  <span>Rayon {dossier.archivage.rayonNumero || '04'}</span>
                                  <span className="text-white/40">→</span>
                                  <span>Casier {dossier.archivage.casierNumero || '12'}</span>
                                </span>
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                <span>Non attribué (Numérique)</span>
                              </span>
                            )}
                          </td>

                          {/* 8. Action */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playXboxSound('select');
                                setActiveDossier(dossier);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-sky-500/20 text-white/80 hover:text-sky-300 border border-white/10 hover:border-sky-400/40 text-xs font-semibold transition-all inline-flex items-center gap-1"
                            >
                              <span>Consulter</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. DETAIL MODAL ("QUAND ON OUVRE UN DOSSIER") */}
      {activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0e1626] border border-white/15 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
                  {currentService.code}
                </div>
                <div>
                  <div className="font-mono text-xs text-sky-400 font-bold tracking-wider">
                    {activeDossier.reference}
                  </div>
                  <h2 className="text-lg font-bold text-white line-clamp-1">
                    {activeDossier.title}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playXboxSound('back');
                  setActiveDossier(null);
                }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* SECTION A: INFORMATIONS */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white/50 font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>INFORMATIONS DU DOSSIER</span>
                  </h3>
                  <span className="text-[11px] font-mono text-white/40">
                    Créé le {activeDossier.dateCreation}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/40 block mb-0.5">Type de dossier</span>
                    <span className="text-white font-medium">
                      {activeDossier.categoryName || activeDossier.title.split('—')[0]?.trim()}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/40 block mb-0.5">Référence unique</span>
                    <span className="text-sky-400 font-mono font-bold">
                      {activeDossier.reference}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/40 block mb-0.5">Personne concernée / Demandeur</span>
                    <span className="text-white font-medium">
                      {activeDossier.personneConcernee || activeDossier.demandeur || 'Non spécifié'}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/40 block mb-0.5">Déclarant / Auteur</span>
                    <span className="text-white/80">
                      {activeDossier.declarant || 'Guichet territorial'}
                    </span>
                  </div>
                </div>

                {/* Lifecycle Switcher in Dossier */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <span className="text-white/40 text-xs block mb-1.5">Cycle de vie & statut d'instruction :</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['Nouveau', 'En traitement', 'À compléter', 'Clôturé', 'À archiver', 'Archivé'] as DossierLifecycleStatus[]).map((st) => {
                      const isActive = (activeDossier.status === 'En cours' ? 'En traitement' : activeDossier.status) === st;
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleUpdateStatus(st)}
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer border ${
                            isActive
                              ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-sm ring-1 ring-sky-400/40'
                              : 'bg-white/[0.03] text-white/50 hover:text-white border-white/10 hover:bg-white/[0.08]'
                          }`}
                        >
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {activeDossier.description && (
                  <div className="pt-2 text-xs text-white/70 italic bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.04]">
                    « {activeDossier.description} »
                  </div>
                )}
              </div>

              {/* SECTION B: DOCUMENTS (Pièces contenues dans le dossier) */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white/50 font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>DOCUMENTS ATTACHÉS ({activeDossier.documents.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      playXboxSound('select');
                      const newDocName = prompt('Nom du document à ajouter :');
                      if (!newDocName) return;
                      const addedDoc: ServiceDocument = {
                        id: `doc-${Date.now()}`,
                        name: newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`,
                        type: 'Pièce justificative',
                        size: '1.2 Mo',
                        date: new Date().toLocaleDateString('fr-FR'),
                        status: 'Validé',
                        format: 'PDF'
                      };
                      const updated = {
                        ...activeDossier,
                        documents: [...activeDossier.documents, addedDoc]
                      };
                      setDossiersByService(prev => ({
                        ...prev,
                        [currentService.id]: prev[currentService.id].map(d => d.id === activeDossier.id ? updated : d)
                      }));
                      setActiveDossier(updated);
                    }}
                    className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ Ajouter un document</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {activeDossier.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base">📄</span>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-white/90 truncate">
                            {doc.name}
                          </div>
                          <div className="text-[10px] text-white/50 flex items-center gap-2 mt-0.5 font-mono">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          doc.status === 'Certifié'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/10 text-white/70'
                        }`}>
                          {doc.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playXboxSound('select');
                            setPreviewDoc(doc);
                          }}
                          className="p-1.5 rounded bg-white/5 hover:bg-sky-500/20 text-white/60 hover:text-sky-300 transition-colors"
                          title="Prévisualiser"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION C: ARCHIVAGE PHYSIQUE (Salle -> Rayon -> Casier) */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white/50 font-bold flex items-center gap-1.5">
                    <Archive className="w-3.5 h-3.5 text-purple-400" />
                    <span>LOCALISATION PHYSIQUE & ARCHIVAGE</span>
                  </h3>
                  {activeDossier.archivage.isPhysicallyArchived ? (
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold font-mono">
                      Classé en magasin
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold font-mono">
                      Non attribué (Numérique)
                    </span>
                  )}
                </div>

                {activeDossier.archivage.isPhysicallyArchived ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
                      <div>
                        <span className="text-[10px] text-white/50 block font-mono">SALLE</span>
                        <span className="text-lg font-mono font-bold text-white">
                          {activeDossier.archivage.salleNumero || '02'}
                        </span>
                        <span className="text-[10px] text-purple-300 block truncate">
                          {activeDossier.archivage.salleNom || 'Salle Haute-Sécurité'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50 block font-mono">RAYON</span>
                        <span className="text-lg font-mono font-bold text-white">
                          {activeDossier.archivage.rayonNumero || '04'}
                        </span>
                        <span className="text-[10px] text-purple-300 block truncate">
                          {activeDossier.archivage.rayonNom || 'Rayon Actes'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50 block font-mono">CASIER</span>
                        <span className="text-lg font-mono font-bold text-white">
                          {activeDossier.archivage.casierNumero || '12'}
                        </span>
                        <span className="text-[10px] text-purple-300 block truncate">
                          {activeDossier.archivage.casierNom || 'Casier Registres'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs gap-2 pt-1">
                      <div className="font-mono text-white/70">
                        Cote légale : <span className="font-bold text-white">{activeDossier.archivage.cote || '4 E 142 / 2026'}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          playXboxSound('select');
                          navigate('/documentation/salles');
                        }}
                        className="text-xs text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 underline cursor-pointer"
                      >
                        <span>Ouvrir l'arborescence des archives</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-amber-200/90">
                      <span className="font-semibold block text-amber-300">Dossier numérique non encore rangé physiquement</span>
                      Ce dossier existe dans le SGAI. Dès que les pièces papier sont scellées et reliées, vous pouvez lui attribuer un casier d'archive.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playXboxSound('modalOpen');
                        setAssignCote(activeDossier.reference);
                        setIsAssignArchiveModalOpen(true);
                      }}
                      className="px-3.5 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
                    >
                      📦 Attribuer un emplacement
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
              <span className="text-xs font-mono text-white/40">
                SGAI Système de Gestion des Archives Institutionnelles
              </span>
              <button
                type="button"
                onClick={() => {
                  playXboxSound('back');
                  setActiveDossier(null);
                }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: ATTRIBUER UN EMPLACEMENT PHYSIQUE */}
      {isAssignArchiveModalOpen && activeDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-white/15 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Archive className="w-4 h-4 text-purple-400" />
                <span>Rangement physique du dossier</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAssignArchiveModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/60">
              Attribuez la position spatiale dans les magasins de conservation pour le dossier <strong className="text-white">{activeDossier.reference}</strong>.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-white/60 block mb-1">Salle d'archive</label>
                <select
                  value={assignSalle}
                  onChange={(e) => setAssignSalle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
                >
                  <option value="02" className="bg-[#0f172a]">Salle 02 — Archives & Haute-Sécurité</option>
                  <option value="01" className="bg-[#0f172a]">Salle 01 — Salle Centrale Administrative</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 block mb-1">Rayon</label>
                  <input
                    type="text"
                    value={assignRayon}
                    onChange={(e) => setAssignRayon(e.target.value)}
                    placeholder="Ex: 04"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Casier</label>
                  <input
                    type="text"
                    value={assignCasier}
                    onChange={(e) => setAssignCasier(e.target.value)}
                    placeholder="Ex: 12"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 block mb-1">Cote d'archivage légale</label>
                <input
                  type="text"
                  value={assignCote}
                  onChange={(e) => setAssignCote(e.target.value)}
                  placeholder="Ex: 4 E 142 / 2026"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsAssignArchiveModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white/80"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmArchiveLocation}
                className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-md"
              >
                Confirmer l'archivage physique
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. MODAL: NOUVEAU DOSSIER */}
      {isNewDossierModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-white/15 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-sky-400" />
                <span>Nouveau dossier — {currentService.name}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsNewDossierModalOpen(false)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewDossier} className="space-y-3.5 text-xs">
              <div>
                <label className="text-white/70 block mb-1 font-semibold">Type de dossier / Catégorie métier *</label>
                <select
                  value={newDossierType}
                  onChange={(e) => setNewDossierType(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium focus:border-sky-400 focus:outline-none"
                >
                  {currentService.activites.map(a => (
                    <option key={a.id} value={a.id} className="bg-[#0f172a]">
                      {a.name} ({a.description})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-semibold">Personne concernée / Titulaire *</label>
                <input
                  type="text"
                  value={newDossierPersonne}
                  onChange={(e) => setNewDossierPersonne(e.target.value)}
                  placeholder="Ex: Jean Dupont ou SCI Avenir"
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Déclarant / Demandeur</label>
                <input
                  type="text"
                  value={newDossierDeclarant}
                  onChange={(e) => setNewDossierDeclarant(e.target.value)}
                  placeholder="Ex: Déclarant à l'État civil ou Mandataire"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Objet / Description du dossier</label>
                <textarea
                  value={newDossierObjet}
                  onChange={(e) => setNewDossierObjet(e.target.value)}
                  rows={2}
                  placeholder="Ex: Déclaration initiale et dépôt des pièces administratives."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 text-[11px] text-white/50">
                ℹ️ Le dossier sera initialement créé avec le statut <strong className="text-sky-300">« Nouveau »</strong> et son emplacement sera <strong className="text-amber-300">« Non attribué (Numérique) »</strong> jusqu'à son classement physique aux archives.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsNewDossierModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-md cursor-pointer"
                >
                  Créer le dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. MODAL: APERÇU DOCUMENT */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0f172a] border border-white/15 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📄</span>
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1">{previewDoc.name}</h3>
                  <span className="text-[10px] text-white/50 font-mono">{previewDoc.type} • {previewDoc.size}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-48 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center p-4">
              <FileText className="w-12 h-12 text-sky-400/60 mb-2" />
              <div className="text-xs font-semibold text-white/90">Aperçu du document d'archive</div>
              <div className="text-[11px] text-white/50 mt-1">
                Document scellé et certifié conforme au registre numérique de la collectivité.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Statut : {previewDoc.status}</span>
              </span>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
