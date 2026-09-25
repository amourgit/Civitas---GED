import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useNavigate, 
  useLocation, 
  Navigate 
} from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Layers, 
  CheckSquare, 
  GitFork, 
  Search, 
  Users, 
  Settings, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Scan,
  FolderPlus,
  Star,
  Clock,
  Share2,
  Trash2,
  Download,
  FolderOpen,
  Landmark,
  Archive,
  Repeat,
  BarChart3,
  Inbox
} from 'lucide-react';
import { initialFolders, searchSuggestions } from './data/mockFolders';
import { FolderItem } from './types/document';
import { AmbientBackground } from './components/shell/AmbientBackground';
import { PageBackgroundProvider } from './components/shell/PageBackground';
import { PageLoadingProvider } from './context/PageLoadingContext';
import { RightContentProvider, useRightContent } from './context/RightContentContext';
import { AssistantGlobalVoiceProvider } from './context/AssistantGlobalVoiceContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { ServiceProvider } from './context/ServiceContext';
import { PortalCarouselProvider } from './context/PortalCarouselContext';
import { PortalCarouselNav } from './components/portal/PortalCarouselNav';
import { PortalFooterNewsEvents } from './components/portal/PortalFooterNewsEvents';
import RandomLetterSwapNav from './components/navigation/RandomLetterSwapNav';
import { SupremeIntranetTopBar } from './components/shell/SupremeIntranetTopBar';
import { AssistantPageOverlay } from './components/assistant/AssistantPageOverlay';
import { AssistantMode, ASSISTANT_MODES, getSavedAssistantMode, saveAssistantMode } from './components/assistant/assistantModes';
import { XboxSidebar, XboxSidebarItem, XboxSidebarSection } from './components/shell/XboxSidebar';
import { PortalSplitLayout } from './components/layout/PortalSplitLayout';
import { AccueilPage } from './components/views/AccueilPage';
import { InformationsPage } from './components/views/InformationsPage';
import { ServicesPage } from './components/views/ServicesPage';
import { IntranetPortalPage } from './components/views/IntranetPortalPage';
import { CollaborateurDetailPage } from './components/views/CollaborateurDetailPage';
import { WorkPage } from './components/views/WorkPage';
import { AboutPage } from './components/views/AboutPage';
import { ApplicationsGridPage } from './components/views/ApplicationsGridPage';
import { CalendrierPage } from './components/views/CalendrierPage';
import { AnnuairePage } from './components/views/AnnuairePage';
import { ActualitesPage } from './components/views/ActualitesPage';
import { AnnoncesPage } from './components/views/AnnoncesPage';
import { SuiviDossiersPage } from './components/views/SuiviDossiersPage';
import { CirculationPage } from './components/views/CirculationPage';
import { PilotagePage } from './components/views/PilotagePage';
import { RecherchePage } from './components/views/RecherchePage';
import { AdministrationPage } from './components/views/AdministrationPage';
import { SallesPage } from './components/views/SallesPage';
import { RayonsPage } from './components/views/RayonsPage';
import { CasiersPage } from './components/views/CasiersPage';
import { DossiersPage } from './components/views/DossiersPage';
import { DossiersMetierPage } from './components/views/DossiersMetierPage';
import { SitesPage } from './components/views/SitesPage';
import { DocumentsPage } from './components/views/DocumentsPage';
import { Dossier3DRoutePage } from './components/views/Dossier3DRoutePage';
import { IngestionPage } from './components/views/IngestionPage';
import { RepositoryPage } from './components/views/RepositoryPage';
import { ScannerPage } from './components/views/ScannerPage';
import { IngestionSidebar } from './components/ingestion/IngestionSidebar';
import { NotFoundPage } from './components/views/NotFoundPage';
import { InteractiveFolderModal } from './components/folder/InteractiveFolderModal';
import { FolderPropertiesModal } from './components/folder/FolderPropertiesModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { NotificationModal } from './components/shared/NotificationModal';
import { slugify, getFolderSlug } from './utils/slug';
import { useXboxGlobalSounds } from './utils/useXboxGlobalSounds';
import { playXboxSound } from './utils/xboxAudio';
import { 
  buildDocumentationUrl, 
  buildSalleUrl, 
  buildRayonUrl, 
  buildCasierUrl, 
  buildDossierUrl, 
  getLocationForFolder 
} from './data/archiveStructure';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

interface ToastData {
  message: string;
  type: ToastType;
}

const KNOWN_EXACT_ROUTES = new Set([
  '/',
  '/accueil',
  '/home',
  '/work',
  '/about',
  '/blog',
  '/contact',
  '/applications',
  '/clouds',
  '/calendrier',
  '/annuaire',
  '/actualites',
  '/annonces',
  '/projets',
  '/rh',
  '/informations',
  '/informations/news',
  '/informations/annonces',
  '/informations/agenda',
  '/services',
  '/iam',
  '/ged',
  '/ged/accueil',
  '/ged/sites',
  '/ged/dossiers',
  '/ged/depots',
  '/ged/repository',
  '/ged/ingestion',
  '/ged/scanner',
  '/ged/recherche',
  '/ged/suivi',
  '/ged/circulation',
  '/ged/rapports',
  '/ged/pilotage',
  '/ged/administration',
  '/ged/documentation',
  '/ged/documentation/salles',
  '/ged/salles',
  '/ged/documents',
  '/sites',
  '/dossiers',
  '/depots',
  '/repository',
  '/ingestion',
  '/scanner',
  '/recherche',
  '/suivi',
  '/circulation',
  '/rapports',
  '/pilotage',
  '/administration',
  '/documentation',
  '/documentation/salles',
  '/salles',
  '/documents',
]);

const KNOWN_PREFIX_ROUTES = [
  '/informations/',
  '/services/',
  '/iam/',
  '/calendrier/',
  '/annuaire/',
  '/actualites/',
  '/annonces/',
  '/projets/',
  '/rh/',
  '/ged/sites/',
  '/ged/dossiers/',
  '/ged/documentation/',
  '/ged/salle/',
  '/ged/rayon/',
  '/ged/casier/',
  '/ged/dossier/',
  '/sites/',
  '/dossiers/',
  '/documentation/',
  '/salle/',
  '/rayon/',
  '/casier/',
  '/dossier/',
];

function isKnownRoute(pathname: string): boolean {
  if (pathname === '/404') return false;
  if (KNOWN_EXACT_ROUTES.has(pathname)) return true;
  for (const prefix of KNOWN_PREFIX_ROUTES) {
    if (pathname.startsWith(prefix)) return true;
  }
  return false;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Route 404 dédiée: Affichage plein écran pur sans topbar ni shell
  if (!isKnownRoute(location.pathname)) {
    return <NotFoundPage />;
  }

  const { rightContent } = useRightContent();
  const isHomePage = location.pathname === '/' || location.pathname === '/accueil';
  const isCollaborateurDetailPage = 
    location.pathname.startsWith('/annuaire/') && 
    !['/annuaire/contacts', '/annuaire/organigramme', '/annuaire/structures'].includes(location.pathname);
  const hasFooter = isHomePage || isCollaborateurDetailPage;
  const isNavPage = 
    isHomePage || 
    location.pathname === '/work' || 
    location.pathname === '/about' || 
    location.pathname === '/blog' || 
    location.pathname === '/contact' ||
    location.pathname === '/home';

  // Initialize global Xbox audio listeners (click, hover, scroll, keyboard)
  useXboxGlobalSounds();

  // App State
  const [folders, setFolders] = useState<FolderItem[]>(initialFolders);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  // Modals & Navigation state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [specialGalleryFolder, setSpecialGalleryFolder] = useState<FolderItem | null>(null);
  const [propertiesFolder, setPropertiesFolder] = useState<FolderItem | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAssistantActive, setIsAssistantActive] = useState(false);
  const [assistantMode, setAssistantMode] = useState<AssistantMode>(() => getSavedAssistantMode());

  // Auto-close mobile sidebar when navigating
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);
  
  // Toast notifications with dynamic sound and visuals
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = useCallback((msg: string, explicitType?: ToastType) => {
    let type: ToastType = explicitType || 'info';

    // Auto-detect intent if not explicitly provided
    if (!explicitType) {
      const lower = msg.toLowerCase();
      if (
        lower.includes('créé') || 
        lower.includes('ajouté') || 
        lower.includes('copié') || 
        lower.includes('validé') || 
        lower.includes('terminée') || 
        lower.includes('succès') ||
        lower.includes('archivé')
      ) {
        type = 'success';
      } else if (
        lower.includes('supprimé') || 
        lower.includes('retiré') || 
        lower.includes('erreur') ||
        lower.includes('échec')
      ) {
        type = 'error';
      } else if (
        lower.includes('attention') || 
        lower.includes('requis') || 
        lower.includes('accessible') ||
        lower.includes('restreint')
      ) {
        type = 'warning';
      }
    }

    // Trigger corresponding Xbox sound preset for each alert type
    if (type === 'success') {
      playXboxSound('toastSuccess');
    } else if (type === 'warning') {
      playXboxSound('toastWarning');
    } else if (type === 'error') {
      playXboxSound('toastError');
    } else {
      playXboxSound('toastInfo');
    }

    setToast({ message: msg, type });
    setTimeout(() => {
      setToast(curr => (curr?.message === msg ? null : curr));
    }, 3500);
  }, []);

  const handleSelectAssistantMode = useCallback((mode: AssistantMode) => {
    setAssistantMode(mode);
    saveAssistantMode(mode);
    showToast(`Mode activé : ${ASSISTANT_MODES[mode].name}`, 'info');
  }, [showToast]);

  // Modal Open / Close handlers with corresponding Xbox audio
  const openSearchModal = () => {
    playXboxSound('modalOpen');
    setIsSearchModalOpen(true);
  };
  const closeSearchModal = () => {
    playXboxSound('back');
    setIsSearchModalOpen(false);
  };

  const openNotificationModal = () => {
    playXboxSound('modalOpen');
    setIsNotificationModalOpen(true);
  };
  const closeNotificationModal = () => {
    playXboxSound('back');
    setIsNotificationModalOpen(false);
  };

  const openSpecialGallery = (folder: FolderItem) => {
    playXboxSound('modalOpen');
    setSpecialGalleryFolder(folder);
  };
  const closeSpecialGallery = () => {
    playXboxSound('back');
    setSpecialGalleryFolder(null);
  };

  const openProperties = (folder: FolderItem) => {
    playXboxSound('modalOpen');
    setPropertiesFolder(folder);
  };
  const closeProperties = () => {
    playXboxSound('back');
    setPropertiesFolder(null);
  };

  // Determine active navigation ID from pathname
  const activeNavId = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return 'portal';
    if (path === '/ged' || path === '/ged/accueil' || path === '/accueil') return 'accueil';
    if (path.startsWith('/ged/dossiers') || path.startsWith('/ged/sites') || path.startsWith('/dossiers') || path.startsWith('/sites')) return 'dossiers';
    if (
      path.startsWith('/ged/documentation') ||
      path.startsWith('/ged/salles') || 
      path.startsWith('/ged/documents') || 
      path.startsWith('/ged/salle') || 
      path.startsWith('/ged/rayon') || 
      path.startsWith('/ged/casier') || 
      path.startsWith('/ged/dossier') ||
      path.startsWith('/documentation') ||
      path === '/salles' || 
      path === '/documents' || 
      path.startsWith('/salle') || 
      path.startsWith('/rayon') || 
      path.startsWith('/casier') || 
      path.startsWith('/dossier')
    ) return 'documents';
    if (path.startsWith('/ged/depots') || path.startsWith('/ged/ingestion') || path.startsWith('/ged/scanner') || path === '/depots' || path === '/ingestion') return 'entrees';
    if (path.startsWith('/ged/suivi') || path.startsWith('/ged/circulation') || path === '/suivi' || path === '/circulation') return 'suivi';
    if (path.startsWith('/ged/recherche') || path === '/recherche') return 'recherche';
    if (path.startsWith('/ged/pilotage') || path.startsWith('/ged/rapports') || path === '/pilotage' || path === '/rapports') return 'pilotage';
    if (path.startsWith('/ged/administration') || path === '/administration') return 'administration';
    if (path.startsWith('/calendrier')) return 'calendrier';
    if (path.startsWith('/annuaire')) return 'annuaire';
    if (path.startsWith('/actualites')) return 'actualites';
    return 'accueil';
  }, [location.pathname]);

  const currentAppName = useMemo(() => {
    const path = location.pathname;
    if (path === '/') return 'Portail Intranet Global';
    if (path.startsWith('/informations')) return 'Informations & Actualités';
    if (path.startsWith('/sites') || path.startsWith('/services')) return 'Sites & Pôles Organisationnels';
    if (path.startsWith('/applications') || path.startsWith('/clouds')) return 'Applications & Services Connectés';
    if (path.startsWith('/ged')) return 'EGEN GED Documents';
    if (path.startsWith('/calendrier')) return 'Calendrier & Planning';
    if (path.startsWith('/annuaire')) return 'Annuaire Collaborateurs';
    if (path.startsWith('/actualites')) return 'Actualités & Communication';
    if (path.startsWith('/projets')) return 'Espaces & Projets';
    if (path.startsWith('/rh')) return 'Services RH';
    return 'EGEN GED Documents';
  }, [location.pathname]);

  const isDossierView = location.pathname.startsWith('/dossier') || location.pathname.includes('/dossiers/');
  const isIngestionView = location.pathname === '/ingestion';
  const [activeIngestionSource, setActiveIngestionSource] = useState('scan');

  // Folder management actions
  const handleToggleFavorite = useCallback((folder: FolderItem) => {
    setFolders(prev => prev.map(f => f.id === folder.id ? { ...f, isFavorite: !f.isFavorite } : f));
    showToast(folder.isFavorite ? 'Retiré des favoris' : 'Ajouté aux favoris', folder.isFavorite ? 'warning' : 'success');
  }, [showToast]);

  const handleDeleteFolder = useCallback((folder: FolderItem) => {
    setFolders(prev => prev.filter(f => f.id !== folder.id));
    showToast(`Dossier « ${folder.name} » supprimé`, 'error');
  }, [showToast]);

  const handleShareFolder = useCallback((folder: FolderItem) => {
    const loc = getLocationForFolder(folder.id);
    const url = window.location.origin + buildCasierUrl(loc.salle.id, loc.rayon.id, loc.casier.id);
    navigator.clipboard?.writeText(url);
    showToast(`Lien d'accès copié pour le casier de « ${folder.name} »`, 'success');
  }, [showToast]);

  const handleCreateFolder = useCallback(() => {
    const newName = prompt('Nom du nouveau dossier :');
    if (!newName || !newName.trim()) return;
    const newFolder: FolderItem = {
      id: `f_${Date.now()}`,
      name: newName.trim(),
      type: 'folder',
      itemCount: 0,
      updatedAt: "À l'instant",
      category: 'documents',
      folderTheme: 'emerald',
      iconType: 'folder-glow',
      size: '0 Ko',
      description: 'Dossier créé récemment.',
      permissions: { canEdit: true, canShare: true, canDelete: true, canDownload: true },
      filesInside: []
    };
    setFolders(prev => [newFolder, ...prev]);
    playXboxSound('achievement');
    showToast(`Dossier « ${newName.trim()} » créé`, 'success');
    const loc = getLocationForFolder(newFolder.id);
    navigate(buildCasierUrl(loc.salle.id, loc.rayon.id, loc.casier.id));
  }, [navigate, showToast]);

  // Reusable Sidebar configuration: options change based on route context
  const sidebarSections = useMemo<XboxSidebarSection[]>(() => {
    if (isDossierView) {
      // Find current folder for title if available
      const pathSlug = location.pathname.split('/').filter(Boolean).pop() || '';
      const currentFolder = folders.find(f => getFolderSlug(f) === pathSlug || f.id === pathSlug);

      return [
        {
          title: currentFolder ? currentFolder.name : 'Dossier Actif',
          items: [
            {
              id: 'retour',
              label: 'Retour au casier',
              icon: <ArrowLeft className="w-5 h-5" strokeWidth={2} />,
              onClick: () => {
                playXboxSound('back');
                if (currentFolder) {
                  const loc = getLocationForFolder(currentFolder.id);
                  navigate(buildCasierUrl(loc.salle.id, loc.rayon.id, loc.casier.id));
                } else {
                  navigate(buildDocumentationUrl());
                }
              }
            },
            {
              id: 'properties',
              label: 'Propriétés du dossier',
              icon: <Info className="w-5 h-5" strokeWidth={2} />,
              onClick: () => {
                if (currentFolder) setPropertiesFolder(currentFolder);
                else showToast('Détails et métadonnées du dossier.', 'info');
              }
            },
            {
              id: 'share',
              label: 'Partager ce dossier',
              icon: <Share2 className="w-5 h-5" strokeWidth={2} />,
              onClick: () => {
                if (currentFolder) handleShareFolder(currentFolder);
                else showToast('Lien de partage copié.', 'success');
              }
            },
            {
              id: 'download',
              label: "Télécharger l'archive ZIP",
              icon: <Download className="w-5 h-5" strokeWidth={2} />,
              onClick: () => showToast('Téléchargement du dossier en cours...', 'success')
            }
          ]
        },
        {
          title: 'Navigation GED',
          items: [
            {
              id: 'documents',
              label: 'Documentation (Salles)',
              icon: <FileText className="w-5 h-5" strokeWidth={2} />,
              onClick: () => navigate(buildDocumentationUrl())
            },
            {
              id: 'accueil',
              label: 'Accueil',
              icon: <Home className="w-5 h-5" strokeWidth={2} />,
              onClick: () => navigate('/')
            },
            {
              id: 'ingestion',
              label: 'Numérisation & Ingestion',
              icon: <Scan className="w-5 h-5" strokeWidth={2} />,
              onClick: () => navigate('/ingestion')
            },
            {
              id: 'administration',
              label: 'Administration',
              icon: <Settings className="w-5 h-5" strokeWidth={2} />,
              onClick: () => showToast('Section Administration accessible aux administrateurs.', 'warning')
            }
          ]
        }
      ];
    }

    if (
      location.pathname.startsWith('/documentation') ||
      location.pathname === '/salles' || 
      location.pathname === '/documents' || 
      location.pathname.startsWith('/salle') || 
      location.pathname.startsWith('/rayon') || 
      location.pathname.startsWith('/casier')
    ) {
      return [
        {
          title: 'Navigation',
          items: [
            {
              id: 'accueil',
              label: 'Accueil',
              icon: <Home className="w-5 h-5" strokeWidth={2} />,
              onClick: () => navigate('/')
            },
            {
              id: 'documents',
              label: 'Documentation (Salles)',
              icon: <FileText className="w-5 h-5" strokeWidth={2} />,
              badge: folders.length,
              onClick: () => navigate(buildDocumentationUrl())
            },
            {
              id: 'ingestion',
              label: 'Numérisation & OCR',
              icon: <Scan className="w-5 h-5" strokeWidth={2} />,
              badge: 'IA',
              onClick: () => navigate('/ingestion')
            },
            {
              id: 'espaces',
              label: 'Espaces Partagés',
              icon: <Layers className="w-5 h-5" strokeWidth={2} />,
              onClick: () => showToast('Module Espaces de travail partagés disponible.', 'info')
            },
            {
              id: 'taches',
              label: 'Tâches & Validation',
              icon: <CheckSquare className="w-5 h-5" strokeWidth={2} />,
              badge: 4,
              onClick: () => showToast('Module Tâches & Assignations GED ouvert.', 'info')
            },
            {
              id: 'workflows',
              label: 'Circuits & Workflows',
              icon: <GitFork className="w-5 h-5" strokeWidth={2} />,
              onClick: () => showToast('Circuits de validation & Workflows configurés.', 'info')
            }
          ]
        },
        {
          title: 'Collections & Vues',
          items: [
            {
              id: 'all_folders',
              label: 'Toutes les salles',
              icon: <FolderOpen className="w-5 h-5" strokeWidth={2} />,
              badge: 'S-01, S-02',
              onClick: () => navigate(buildDocumentationUrl())
            },
            {
              id: 'favorites',
              label: 'Favoris',
              icon: <Star className="w-5 h-5" strokeWidth={2} />,
              badge: folders.filter(f => f.isFavorite).length,
              onClick: () => showToast(`Affichage des ${folders.filter(f => f.isFavorite).length} dossiers favoris.`, 'info')
            },
            {
              id: 'shared',
              label: 'Partagés avec moi',
              icon: <Share2 className="w-5 h-5" strokeWidth={2} />,
              onClick: () => showToast('Dossiers partagés avec votre compte.', 'info')
            },
            {
              id: 'recent',
              label: 'Récents',
              icon: <Clock className="w-5 h-5" strokeWidth={2} />,
              onClick: () => showToast('Dossiers récemment consultés.', 'info')
            },
            {
              id: 'trash',
              label: 'Corbeille',
              icon: <Trash2 className="w-5 h-5" strokeWidth={2} />,
              onClick: () => showToast('Corbeille GED vide.', 'info')
            }
          ]
        },
        {
          title: 'Actions Rapides',
          items: [
            {
              id: 'new_folder',
              label: '+ Nouveau Dossier',
              icon: <FolderPlus className="w-5 h-5" strokeWidth={2} />,
              accent: true,
              onClick: handleCreateFolder
            },
            {
              id: 'scan_doc',
              label: 'Scanner un document',
              icon: <Scan className="w-5 h-5" strokeWidth={2} />,
              onClick: () => navigate('/ingestion')
            },
            {
              id: 'search',
              label: 'Recherche avancée',
              icon: <Search className="w-5 h-5" strokeWidth={2} />,
              onClick: openSearchModal
            }
          ]
        }
      ];
    }

    // SGAI Institutional Navigation Sections
    return [
      {
        title: 'Modules SGAI',
        items: [
          {
            id: 'accueil',
            label: 'Tableau de bord',
            icon: <Home className="w-5 h-5" strokeWidth={2} />,
            onClick: () => navigate('/')
          },
          {
            id: 'sites',
            label: 'Sites (Alfresco)',
            icon: <Layers className="w-5 h-5 text-sky-400" strokeWidth={2} />,
            badge: 'Alfresco',
            onClick: () => navigate('/sites')
          },
          {
            id: 'entrees',
            label: 'Entrées & Dépôts',
            icon: <Inbox className="w-5 h-5 text-amber-400" strokeWidth={2} />,
            badge: 'OCR',
            onClick: () => navigate('/depots')
          },
          {
            id: 'archives',
            label: 'Archives & Magasins',
            icon: <Archive className="w-5 h-5 text-purple-400" strokeWidth={2} />,
            badge: 'S-01/02',
            onClick: () => navigate(buildDocumentationUrl())
          },
          {
            id: 'recherche',
            label: 'Recherche unifiée',
            icon: <Search className="w-5 h-5 text-teal-400" strokeWidth={2} />,
            onClick: () => navigate('/recherche')
          },
          {
            id: 'suivi',
            label: 'Suivi des dossiers',
            icon: <Repeat className="w-5 h-5 text-rose-400" strokeWidth={2} />,
            badge: 3,
            onClick: () => navigate('/suivi')
          },
          {
            id: 'pilotage',
            label: 'Pilotage & Statistiques',
            icon: <BarChart3 className="w-5 h-5 text-emerald-400" strokeWidth={2} />,
            onClick: () => navigate('/pilotage')
          },
          {
            id: 'administration',
            label: 'Administration & Plan',
            icon: <Settings className="w-5 h-5 text-white/70" strokeWidth={2} />,
            onClick: () => navigate('/administration')
          }
        ]
      },
      {
        title: 'Actions Rapides Métier',
        items: [
          {
            id: 'new_folder',
            label: '+ Nouveau dossier métier',
            icon: <FolderPlus className="w-5 h-5" strokeWidth={2} />,
            accent: true,
            onClick: () => navigate('/dossiers')
          },
          {
            id: 'scan_ocr',
            label: 'Numérisation & Dépôt',
            icon: <Scan className="w-5 h-5" strokeWidth={2} />,
            onClick: () => navigate('/ingestion')
          },
          {
            id: 'search',
            label: 'Rechercher une cote',
            icon: <Search className="w-5 h-5" strokeWidth={2} />,
            onClick: openSearchModal
          }
        ]
      }
    ];
  }, [isDossierView, location.pathname, folders, navigate, showToast]);

  // Handle Search item selection
  const handleSearchItemSelect = (item: typeof searchSuggestions[0]) => {
    closeSearchModal();
    const targetFolder = folders.find(f => f.name.toLowerCase().includes(item.folder.toLowerCase()));
    if (targetFolder) {
      const loc = getLocationForFolder(targetFolder.id);
      navigate(buildCasierUrl(loc.salle.id, loc.rayon.id, loc.casier.id));
    } else {
      navigate(buildDocumentationUrl());
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-[#030708] text-white overflow-hidden select-none">
      {/* Dynamic Ambient Background */}
      <AmbientBackground />

      {/* 0. SUPREME TOPBAR DE L'INTRANET AVEC 2ÈME NIVEAU EXTENSIBLE DE L'APPLICATION ACTIVE */}
      <header className="relative z-50 shrink-0 w-full bg-transparent">
        <SupremeIntranetTopBar
          onOpenGlobalSearch={openSearchModal}
          onOpenGED={() => navigate('/ged')}
          currentAppName={currentAppName}
          onShowNotification={showToast}
          onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
          isSidebarOpen={isMobileSidebarOpen}
          onSearchClick={openSearchModal}
          onNotificationClick={openNotificationModal}
          isAssistantActive={isAssistantActive}
          onToggleAssistant={() => {
            setIsAssistantActive(prev => !prev);
            playXboxSound('toggle');
          }}
          assistantMode={assistantMode}
          onSelectAssistantMode={handleSelectAssistantMode}
          onQuickAction={(action) => {
            if (action === 'espaces') showToast('Espaces de travail partagés ouverts.', 'info');
            else if (action === 'taches') showToast('Tâches & validations GED.', 'info');
            else if (action === 'workflows') showToast('Circuits de validation opérationnels.', 'info');
            else if (action === 'profile') showToast('Profil Amour Samuel NZILA NGALA (Administrateur)', 'info');
            else showToast(`Action ${action} déclenchée.`, 'info');
          }}
        />
      </header>

      {/* Page Assistant Overlay (3D Robot Background + Interactive Conversation Interface) */}
      <AssistantPageOverlay
        isActive={isAssistantActive}
        mode={assistantMode}
        onSelectMode={handleSelectAssistantMode}
        onClose={() => setIsAssistantActive(false)}
      />

      {/* Xbox Guide Modal (Always modal overlay, exactly matching Xbox Guide OS design) */}
      <XboxSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeId={isDossierView ? 'documents' : activeNavId}
        onSelect={(id) => {
          const allItems = sidebarSections.flatMap(s => s.items);
          const item = allItems.find(i => i.id === id);
          if (item && item.onClick) item.onClick();
          setIsMobileSidebarOpen(false);
        }}
        onNavigateHome={() => navigate('/ged')}
        onNavigateDossiers={() => navigate('/ged/sites')}
        onNavigateDocuments={() => navigate(buildDocumentationUrl())}
        onNavigateSuivi={() => navigate('/ged/suivi')}
        onNavigateIngestion={() => navigate('/ged/depots')}
        onOpenSearch={openSearchModal}
        onOpenNotifications={openNotificationModal}
        onCreateFolder={handleCreateFolder}
      />

      {/* ── Conteneur global défilable basé sur le layout modulaire PortalSplitLayout ── */}
      <PortalSplitLayout
        rightContent={rightContent}
        footer={hasFooter ? <PortalFooterNewsEvents onShowToast={showToast} /> : undefined}
        enableOuterScroll={hasFooter}
      >
        <Routes>
            {/* 1. PORTAIL PRINCIPAL INTRANET (Épuré, WebGL Waves 3D & Applications) */}
            <Route 
              path="/" 
              element={<IntranetPortalPage />} 
            />
            <Route 
              path="/accueil" 
              element={<Navigate to="/" replace />} 
            />
            <Route 
              path="/home" 
              element={<Navigate to="/" replace />} 
            />

            {/* ── Pages dédiées pour les options de navigation Espace Organisationnel / Intranet ── */}
            <Route path="/informations" element={<InformationsPage initialTab="news" />} />
            <Route path="/informations/news" element={<InformationsPage initialTab="news" />} />
            <Route path="/informations/annonces" element={<InformationsPage initialTab="annonces" />} />
            <Route path="/informations/agenda" element={<InformationsPage initialTab="agenda" />} />
            <Route path="/informations/*" element={<InformationsPage />} />

            <Route path="/sites" element={<ServicesPage />} />
            <Route path="/sites/:serviceUuid" element={<ServicesPage />} />
            <Route path="/sites/:serviceUuid/:tab" element={<ServicesPage />} />
            <Route path="/sites/*" element={<ServicesPage />} />

            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceUuid" element={<ServicesPage />} />
            <Route path="/services/:serviceUuid/:tab" element={<ServicesPage />} />
            <Route path="/services/*" element={<ServicesPage />} />

            <Route path="/recherche" element={<RecherchePage />} />
            <Route path="/recherche/*" element={<RecherchePage />} />

            <Route path="/administration" element={<AdministrationPage />} />
            <Route path="/administration/*" element={<AdministrationPage />} />
            <Route path="/iam" element={<AdministrationPage />} />

            <Route path="/work" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<ActualitesPage />} />
            <Route path="/contact" element={<AnnuairePage onShowNotification={showToast} />} />

            {/* 2. APPLICATIONS INTRANET (Routes racine pour chaque application) */}
            <Route path="/applications" element={<ApplicationsGridPage />} />
            <Route path="/clouds" element={<ApplicationsGridPage />} />
            <Route path="/calendrier" element={<CalendrierPage />} />
            <Route path="/calendrier/*" element={<CalendrierPage />} />
            <Route path="/annuaire" element={<AnnuairePage onShowNotification={showToast} />} />
            <Route path="/annuaire/contacts" element={<AnnuairePage onShowNotification={showToast} />} />
            <Route path="/annuaire/organigramme" element={<AnnuairePage onShowNotification={showToast} />} />
            <Route path="/annuaire/structures" element={<AnnuairePage onShowNotification={showToast} />} />
            <Route path="/annuaire/:collaborateurId/details/:tab" element={<CollaborateurDetailPage onShowToast={showToast} />} />
            <Route path="/annuaire/:collaborateurId/details" element={<CollaborateurDetailPage onShowToast={showToast} />} />
            <Route path="/annuaire/:collaborateurId/details/*" element={<CollaborateurDetailPage onShowToast={showToast} />} />
            <Route path="/annuaire/:collaborateurId/:tab" element={<CollaborateurDetailPage onShowToast={showToast} />} />
            <Route path="/annuaire/:collaborateurId" element={<CollaborateurDetailPage onShowToast={showToast} />} />
            <Route path="/annuaire/:collaborateurId/*" element={<CollaborateurDetailPage onShowToast={showToast} />} />
            <Route path="/annuaire/*" element={<AnnuairePage onShowNotification={showToast} />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/actualites/*" element={<ActualitesPage />} />
            <Route path="/annonces" element={<AnnoncesPage />} />
            <Route path="/annonces/*" element={<AnnoncesPage />} />
            <Route path="/projets" element={<SitesPage />} />
            <Route path="/rh" element={<SuiviDossiersPage />} />

            {/* 3. APPLICATION GED (EGEN DOCUMENTS) — Routes sous /ged/... */}
            {/* Accueil / Dashboard GED */}
            <Route 
              path="/ged" 
              element={
                <AccueilPage
                  onNavigateToDocuments={() => navigate(buildDocumentationUrl())}
                  onQuickAction={(action) => {
                    if (action === 'valider') showToast('8 documents en attente de validation.', 'info');
                    else if (action === 'taches') showToast('12 tâches assignées.', 'info');
                    else if (action === 'workflows') showToast('5 workflows opérationnels.', 'info');
                    else if (action === 'signatures') showToast('3 contrats en attente de signature.', 'warning');
                    else showToast(`Action ${action} déclenchée.`, 'info');
                  }}
                />
              } 
            />
            <Route path="/ged/accueil" element={<Navigate to="/ged" replace />} />

            {/* GED: Alfresco Sites Architecture & Dossiers */}
            <Route path="/ged/sites" element={<SitesPage />} />
            <Route path="/ged/sites/:siteId" element={<SitesPage />} />
            <Route path="/ged/sites/:siteId/:siteTab" element={<SitesPage />} />
            <Route path="/ged/dossiers" element={<SitesPage />} />
            <Route path="/ged/dossiers/*" element={<SitesPage />} />

            {/* GED: SGAI Module 03 Dépôts & Repository */}
            <Route path="/ged/depots" element={<RepositoryPage onShowNotification={showToast} />} />
            <Route path="/ged/repository" element={<RepositoryPage onShowNotification={showToast} />} />
            <Route path="/ged/ingestion" element={<IngestionPage onShowToast={showToast} />} />
            <Route path="/ged/scanner" element={<ScannerPage onShowToast={showToast} />} />

            {/* GED: SGAI Module 05 Recherche Unifiée */}
            <Route path="/ged/recherche" element={<RecherchePage />} />

            {/* GED: SGAI Module 06 Suivi & Traçabilité */}
            <Route path="/ged/suivi" element={<SuiviDossiersPage />} />
            <Route path="/ged/circulation" element={<SuiviDossiersPage />} />

            {/* GED: SGAI Module 07 Rapports & Statistiques */}
            <Route path="/ged/rapports" element={<PilotagePage />} />
            <Route path="/ged/pilotage" element={<PilotagePage />} />

            {/* GED: SGAI Module 08 Administration */}
            <Route path="/ged/administration" element={<AdministrationPage />} />

            {/* GED: Plan de classement & Archives Physiques (Salles / Rayons / Casiers) */}
            <Route path="/ged/documentation" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/ged/documentation/salles" element={<SallesPage />} />
            <Route path="/ged/salles" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/ged/documents" element={<Navigate to="/ged/documentation/salles" replace />} />

            <Route path="/ged/documentation/salles/:salleId" element={<RayonsPage />} />
            <Route path="/ged/documentation/salles/:salleId/rayons" element={<RayonsPage />} />
            <Route path="/ged/salle/:salleId" element={<RayonsPage />} />
            <Route path="/ged/salle/:salleId/rayons" element={<RayonsPage />} />

            <Route path="/ged/documentation/salles/:salleId/rayons/:rayonId" element={<CasiersPage />} />
            <Route path="/ged/documentation/salles/:salleId/rayons/:rayonId/casiers" element={<CasiersPage />} />
            <Route path="/ged/rayon/:rayonId" element={<CasiersPage />} />
            <Route path="/ged/rayon/:rayonId/casiers" element={<CasiersPage />} />

            <Route 
              path="/ged/documentation/salles/:salleId/rayons/:rayonId/casiers/:casierId" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => setSelectedFolderId(f.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteFolder={handleDeleteFolder}
                  onViewProperties={openProperties}
                  onPreviewSpecial={openSpecialGallery}
                  onShare={handleShareFolder}
                  onCreateFolder={handleCreateFolder}
                />
              } 
            />
            <Route 
              path="/ged/documentation/salles/:salleId/rayons/:rayonId/casiers/:casierId/dossiers" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => setSelectedFolderId(f.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteFolder={handleDeleteFolder}
                  onViewProperties={openProperties}
                  onPreviewSpecial={openSpecialGallery}
                  onShare={handleShareFolder}
                  onCreateFolder={handleCreateFolder}
                />
              } 
            />
            <Route 
              path="/ged/casier/:casierId" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => setSelectedFolderId(f.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteFolder={handleDeleteFolder}
                  onViewProperties={openProperties}
                  onPreviewSpecial={openSpecialGallery}
                  onShare={handleShareFolder}
                  onCreateFolder={handleCreateFolder}
                />
              } 
            />
            <Route 
              path="/ged/casier/:casierId/dossiers" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => setSelectedFolderId(f.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteFolder={handleDeleteFolder}
                  onViewProperties={openProperties}
                  onPreviewSpecial={openSpecialGallery}
                  onShare={handleShareFolder}
                  onCreateFolder={handleCreateFolder}
                />
              } 
            />

            <Route 
              path="/ged/documentation/salles/:salleId/rayons/:rayonId/casiers/:casierId/dossiers/:slug" 
              element={<Navigate to="/ged/documentation/salles" replace />} 
            />
            <Route 
              path="/ged/dossier/:dossierId/galerie" 
              element={<Dossier3DRoutePage folders={folders} />} 
            />
            <Route 
              path="/ged/dossier/:slug" 
              element={<Navigate to="/ged/documentation/salles" replace />} 
            />

            {/* 4. REDIRECTIONS RÉTROCOMPATIBLES VERS /ged/... */}
            <Route path="/sites" element={<Navigate to="/ged/sites" replace />} />
            <Route path="/sites/:siteId" element={<Navigate to="/ged/sites" replace />} />
            <Route path="/sites/:siteId/:siteTab" element={<Navigate to="/ged/sites" replace />} />
            <Route path="/dossiers" element={<Navigate to="/ged/dossiers" replace />} />
            <Route path="/dossiers/*" element={<Navigate to="/ged/dossiers" replace />} />
            <Route path="/depots" element={<Navigate to="/ged/depots" replace />} />
            <Route path="/repository" element={<Navigate to="/ged/repository" replace />} />
            <Route path="/ingestion" element={<Navigate to="/ged/ingestion" replace />} />
            <Route path="/scanner" element={<Navigate to="/ged/scanner" replace />} />
            <Route path="/recherche" element={<Navigate to="/ged/recherche" replace />} />
            <Route path="/suivi" element={<Navigate to="/ged/suivi" replace />} />
            <Route path="/circulation" element={<Navigate to="/ged/circulation" replace />} />
            <Route path="/rapports" element={<Navigate to="/ged/rapports" replace />} />
            <Route path="/pilotage" element={<Navigate to="/ged/pilotage" replace />} />
            <Route path="/administration" element={<Navigate to="/ged/administration" replace />} />
            <Route path="/documentation" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/documentation/salles" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/salles" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/documents" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/documentation/*" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/salle/:salleId" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/rayon/:rayonId" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/casier/:casierId" element={<Navigate to="/ged/documentation/salles" replace />} />
            <Route path="/dossier/:slug" element={<Navigate to="/ged/documentation/salles" replace />} />

            {/* Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </PortalSplitLayout>

      {/* Floating Action Feedback Toast with dedicated Xbox Alert Colors & Icons */}
      {toast && (
        <div 
          role="status"
          className={`fixed bottom-6 right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border text-xs font-medium text-white shadow-[0_15px_35px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-3 duration-200 transition-all ${
            toast.type === 'success'
              ? 'bg-[#051710]/95 border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.35)]'
              : toast.type === 'warning'
              ? 'bg-[#1a1204]/95 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.35)]'
              : toast.type === 'error'
              ? 'bg-[#1a0707]/95 border-rose-400/50 shadow-[0_0_30px_rgba(244,63,94,0.35)]'
              : 'bg-[#05141c]/95 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.35)]'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}
          <span className="leading-snug">{toast.message}</span>
        </div>
      )}

      {/* Interactive Photo Modal */}
      {specialGalleryFolder && (
        <InteractiveFolderModal
          isOpen={Boolean(specialGalleryFolder)}
          onClose={closeSpecialGallery}
          folder={specialGalleryFolder}
        />
      )}

      {/* Properties Modal */}
      {propertiesFolder && (
        <FolderPropertiesModal
          folder={propertiesFolder}
          isOpen={Boolean(propertiesFolder)}
          onClose={closeProperties}
        />
      )}

      {/* Global Search Modal */}
      {isSearchModalOpen && (
        <GlobalSearchModal
          isOpen={isSearchModalOpen}
          onClose={closeSearchModal}
          onSelectItem={handleSearchItemSelect}
        />
      )}

      {/* Notification Modal */}
      {isNotificationModalOpen && (
        <NotificationModal
          isOpen={isNotificationModalOpen}
          onClose={closeNotificationModal}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PageLoadingProvider>
        <PageBackgroundProvider>
          <WorkspaceProvider>
            <ServiceProvider>
              <PortalCarouselProvider>
                <RightContentProvider>
                  <AssistantGlobalVoiceProvider>
                    <AppContent />
                  </AssistantGlobalVoiceProvider>
                </RightContentProvider>
              </PortalCarouselProvider>
            </ServiceProvider>
          </WorkspaceProvider>
        </PageBackgroundProvider>
      </PageLoadingProvider>
    </BrowserRouter>
  );
}
