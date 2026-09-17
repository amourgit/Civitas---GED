import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { SupremeIntranetTopBar } from './components/shell/SupremeIntranetTopBar';
import { XboxSidebar, XboxSidebarItem, XboxSidebarSection } from './components/shell/XboxSidebar';
import { AccueilPage } from './components/views/AccueilPage';
import { ServicesPage } from './components/views/ServicesPage';
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
import { DocumentsPage } from './components/views/DocumentsPage';
import { Dossier3DRoutePage } from './components/views/Dossier3DRoutePage';
import { IngestionPage } from './components/views/IngestionPage';
import { ScannerPage } from './components/views/ScannerPage';
import { IngestionSidebar } from './components/ingestion/IngestionSidebar';
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

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

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
    if (path === '/' || path === '/accueil') return 'accueil';
    if (path.startsWith('/dossiers')) return 'dossiers';
    if (
      path.startsWith('/documentation') ||
      path === '/salles' || 
      path === '/documents' || 
      path.startsWith('/salle') || 
      path.startsWith('/rayon') || 
      path.startsWith('/casier') || 
      path.startsWith('/dossier')
    ) return 'documents';
    if (path === '/services' || path.startsWith('/services/')) return 'services';
    if (path === '/depots' || path === '/ingestion') return 'entrees';
    if (path === '/suivi' || path === '/circulation') return 'suivi';
    if (path === '/recherche') return 'recherche';
    if (path === '/pilotage' || path === '/rapports') return 'pilotage';
    if (path === '/administration') return 'administration';
    return 'accueil';
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
            id: 'dossiers',
            label: 'Dossiers métier',
            icon: <FileText className="w-5 h-5 text-sky-400" strokeWidth={2} />,
            badge: 'Actif',
            onClick: () => navigate('/dossiers')
          },
          {
            id: 'services',
            label: 'Services territoriaux',
            icon: <Landmark className="w-5 h-5 text-indigo-400" strokeWidth={2} />,
            badge: '11',
            onClick: () => navigate('/services')
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
      <SupremeIntranetTopBar
        onOpenGlobalSearch={openSearchModal}
        onOpenGED={() => navigate(buildDocumentationUrl())}
        currentAppName="EGEN GED Documents"
        onShowNotification={showToast}
        onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        isSidebarOpen={isMobileSidebarOpen}
        onSearchClick={openSearchModal}
        onNotificationClick={openNotificationModal}
        onQuickAction={(action) => {
          if (action === 'espaces') showToast('Espaces de travail partagés ouverts.', 'info');
          else if (action === 'taches') showToast('Tâches & validations GED.', 'info');
          else if (action === 'workflows') showToast('Circuits de validation opérationnels.', 'info');
          else if (action === 'profile') showToast('Profil Amour Samuel NZILA NGALA (Administrateur)', 'info');
          else showToast(`Action ${action} déclenchée.`, 'info');
        }}
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
        onNavigateHome={() => navigate('/')}
        onNavigateServices={() => navigate('/services')}
        onNavigateDocuments={() => navigate(buildDocumentationUrl())}
        onNavigateSuivi={() => navigate('/suivi')}
        onNavigateIngestion={() => navigate('/depots')}
        onOpenSearch={openSearchModal}
        onOpenNotifications={openNotificationModal}
        onCreateFolder={handleCreateFolder}
      />

      {/* Main Body Layout - overflow-visible allows 3D carousel cards to extend naturally */}
      <div className="flex-1 flex overflow-visible relative min-h-0">
        {/* Dynamic Route View Content - min-h-0 ensures inner scroll areas (like document grids) scroll properly */}
        <main className="flex-1 flex flex-col overflow-visible relative min-w-0 min-h-0">
          <Routes>
            {/* Route 1: Accueil Dashboard Page */}
            <Route 
              path="/" 
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
            <Route 
              path="/accueil" 
              element={<Navigate to="/" replace />} 
            />

            {/* SGAI Module: Dossiers Métier — Cœur documentaire du service */}
            <Route path="/dossiers" element={<DossiersMetierPage />} />
            <Route path="/dossiers/:serviceId" element={<DossiersMetierPage />} />

            {/* SGAI Module 02: Services Territoriaux & Activités Métier */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServicesPage />} />

            {/* SGAI Module 03: Dépôts & Ingestion */}
            <Route path="/depots" element={<IngestionPage onShowToast={showToast} />} />

            {/* SGAI Module 05: Recherche Unifiée Transversale */}
            <Route path="/recherche" element={<RecherchePage />} />

            {/* SGAI Module 06: Suivi des Dossiers & Mouvements des Archives */}
            <Route path="/suivi" element={<SuiviDossiersPage />} />
            <Route path="/circulation" element={<SuiviDossiersPage />} />

            {/* SGAI Module 07: Rapports & Statistiques */}
            <Route path="/rapports" element={<PilotagePage />} />
            <Route path="/pilotage" element={<PilotagePage />} />

            {/* SGAI Module 08: Administration & Plan de Classement */}
            <Route path="/administration" element={<AdministrationPage />} />

            {/* Level 1: Documentation / Salles */}
            <Route path="/documentation" element={<Navigate to="/documentation/salles" replace />} />
            <Route path="/documentation/salles" element={<SallesPage />} />
            <Route path="/salles" element={<Navigate to="/documentation/salles" replace />} />
            <Route path="/documents" element={<Navigate to="/documentation/salles" replace />} />

            {/* Level 2: Rayons d'une salle */}
            <Route path="/documentation/salles/:salleId" element={<RayonsPage />} />
            <Route path="/documentation/salles/:salleId/rayons" element={<RayonsPage />} />
            <Route path="/salle/:salleId" element={<RayonsPage />} />
            <Route path="/salle/:salleId/rayons" element={<RayonsPage />} />

            {/* Level 3: Casiers d'un rayon */}
            <Route path="/documentation/salles/:salleId/rayons/:rayonId" element={<CasiersPage />} />
            <Route path="/documentation/salles/:salleId/rayons/:rayonId/casiers" element={<CasiersPage />} />
            <Route path="/rayon/:rayonId" element={<CasiersPage />} />
            <Route path="/rayon/:rayonId/casiers" element={<CasiersPage />} />

            {/* Level 4: Dossiers d'un casier (Nested full hierarchy) */}
            <Route 
              path="/documentation/salles/:salleId/rayons/:rayonId/casiers/:casierId" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => {
                    setSelectedFolderId(f.id);
                  }}
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
              path="/documentation/salles/:salleId/rayons/:rayonId/casiers/:casierId/dossiers" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => {
                    setSelectedFolderId(f.id);
                  }}
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
              path="/casier/:casierId" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => {
                    setSelectedFolderId(f.id);
                  }}
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
              path="/casier/:casierId/dossiers" 
              element={
                <DossiersPage
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={(f) => {
                    setSelectedFolderId(f.id);
                  }}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteFolder={handleDeleteFolder}
                  onViewProperties={openProperties}
                  onPreviewSpecial={openSpecialGallery}
                  onShare={handleShareFolder}
                  onCreateFolder={handleCreateFolder}
                />
              } 
            />

            {/* Level 5 débranché : redirection vers la documentation */}
            <Route 
              path="/documentation/salles/:salleId/rayons/:rayonId/casiers/:casierId/dossiers/:slug" 
              element={<Navigate to="/documentation/salles" replace />} 
            />
            <Route 
              path="/documentation/salles/:salleId/rayons/:rayonId/casiers/:casierId/dossier/:slug" 
              element={<Navigate to="/documentation/salles" replace />} 
            />
            <Route 
              path="/dossier/:slug" 
              element={<Navigate to="/documentation/salles" replace />} 
            />

            {/* Route 4: Ingestion dedicated URL Route (/ingestion) */}
            <Route 
              path="/ingestion" 
              element={
                <IngestionPage 
                  onShowToast={showToast}
                />
              } 
            />

            {/* Route 5: Dedicated Live Scanner Page (/scanner) */}
            <Route 
              path="/scanner" 
              element={
                <ScannerPage 
                  onShowToast={showToast}
                />
              } 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

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
          <AppContent />
        </PageBackgroundProvider>
      </PageLoadingProvider>
    </BrowserRouter>
  );
}
