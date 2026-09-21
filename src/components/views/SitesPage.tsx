import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Building2, 
  Scroll, 
  Building, 
  Landmark, 
  Users, 
  ShieldCheck, 
  Wrench, 
  Archive,
  Search,
  Star,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
  Clock,
  Globe,
  Lock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Download,
  Share2,
  UserPlus,
  Activity,
  Settings,
  Filter,
  X,
  ExternalLink,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';
import { 
  INITIAL_ALFRESCO_SITES, 
  INITIAL_ALFRESCO_MEMBERS,
  ALFRESCO_ROLES_META, 
  AlfrescoSiteItem, 
  AlfrescoSiteRole, 
  AlfrescoMember,
  AlfrescoActivity 
} from '../../data/alfrescoSitesData';
import { playXboxSound } from '../../utils/xboxAudio';
import { ServiceDossier, ServiceDocument } from '../../data/servicesStructure';
import { InteractiveFolderGallery, GalleryPhoto } from '../folder/InteractiveFolderGallery';
import { FolderFilesOverlay } from '../folder/FolderFilesOverlay';
import { FolderItem } from '../../types/document';

const thematicPhotos: Record<string, string[]> = {
  emerald: [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
  ],
  blue: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
  ],
  amber: [
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
  ],
  purple: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
  ],
  gallery: [
    "https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg",
    "https://cdn.21st.dev/assets/mirror/e7/e7138a367854517395ba458c0c7c6481cf28afdc227b7d0045973e03e5b1d1c0.jpg",
    "https://cdn.21st.dev/assets/mirror/96/9626c87f656eaa15e08486db4e7ecc217c0243440a21d301a3af6c8092b22a9b.jpg",
    "https://cdn.21st.dev/assets/mirror/da/dacbcb481226af6c6e6bf6426da535ce260db87270fb641953617ffe4a1145bf.jpg",
    "https://cdn.21st.dev/assets/mirror/6e/6e5ed03abf45ab11ad4c94b60bb3cb60326807a1777b2a6e8888d3179f237cd9.jpg",
  ]
};

function serviceDossierToFolderItem(dossier: ServiceDossier): FolderItem {
  let theme: FolderItem['folderTheme'] = 'gallery';
  const ref = dossier.reference.toUpperCase();
  if (ref.startsWith('EC-') || dossier.activityId.includes('naissance') || dossier.activityId.includes('mariage') || dossier.activityId.includes('deces')) {
    theme = 'emerald';
  } else if (ref.startsWith('UR-') || dossier.activityId.includes('permis') || dossier.activityId.includes('cadastre') || dossier.activityId.includes('urbanisme')) {
    theme = 'blue';
  } else if (ref.startsWith('RH-') || dossier.activityId.includes('recrutement') || dossier.activityId.includes('personnel') || dossier.activityId.includes('formation')) {
    theme = 'amber';
  } else if (ref.startsWith('FIN-') || dossier.activityId.includes('budget') || dossier.activityId.includes('facture') || dossier.activityId.includes('marche')) {
    theme = 'purple';
  } else if (ref.startsWith('ST-') || dossier.activityId.includes('voirie') || dossier.activityId.includes('travaux') || dossier.activityId.includes('batiment')) {
    theme = 'orange';
  }

  const themeList = thematicPhotos[theme] || thematicPhotos.gallery;
  const photos: GalleryPhoto[] = themeList.map((img, i) => ({
    id: `${dossier.id}-${i}`,
    image: img,
    title: dossier.documents[i]?.name || `Pièce_${i + 1}.pdf`
  }));

  return {
    id: dossier.id,
    name: dossier.title,
    matricule: dossier.reference,
    type: 'folder',
    itemCount: dossier.documents.length,
    updatedAt: dossier.dateCreation,
    category: 'documents',
    folderTheme: theme,
    iconType: 'administrative',
    description: dossier.description,
    photos,
    permissions: {
      canEdit: true,
      canShare: true,
      canDelete: false,
      canDownload: true
    },
    filesInside: dossier.documents.map(doc => ({
      id: doc.id,
      name: doc.name,
      type: doc.type.toLowerCase().includes('pdf') ? 'pdf' : doc.type.toLowerCase().includes('xls') ? 'sheet' : 'doc',
      size: doc.size,
      updatedAt: doc.date
    }))
  };
}

export function SitesPage() {
  const navigate = useNavigate();
  const params = useParams();

  // All sites in local state so favorites, new sites, and joins persist in-session
  const [sites, setSites] = useState<AlfrescoSiteItem[]>(INITIAL_ALFRESCO_SITES);

  // Selected site: either from URL params or local state
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(params.siteId || null);

  // Active site sub-tab: 'dashboard' | 'documentLibrary' | 'members' | 'activities' | 'settings'
  const [activeSiteTab, setActiveSiteTab] = useState<'dashboard' | 'documentLibrary' | 'members' | 'activities' | 'settings'>('dashboard');

  // Sites Home view filters
  const [siteFilterMode, setSiteFilterMode] = useState<'joined' | 'favorites' | 'all'>('joined');
  const [siteSearchQuery, setSiteSearchQuery] = useState<string>('');

  // Modals
  const [isCreateSiteModalOpen, setIsCreateSiteModalOpen] = useState(false);
  const [newSiteTitle, setNewSiteTitle] = useState('');
  const [newSiteShortName, setNewSiteShortName] = useState('');
  const [newSiteDescription, setNewSiteDescription] = useState('');
  const [newSiteVisibility, setNewSiteVisibility] = useState<'PUBLIC' | 'MODERATED' | 'PRIVATE'>('PUBLIC');

  // Member invitation modal
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<AlfrescoSiteRole>('SiteCollaborator');

  // Document Library search & filters within active site
  const [docLibCategory, setDocLibCategory] = useState<string>('all');
  const [docLibSearchQuery, setDocLibSearchQuery] = useState<string>('');
  const [docLibStatus, setDocLibStatus] = useState<string>('all');

  // Document preview modal
  const [previewDoc, setPreviewDoc] = useState<ServiceDocument | null>(null);
  const [docLibViewMode, setDocLibViewMode] = useState<'grid' | 'list'>('grid');
  const [overlayFolder, setOverlayFolder] = useState<FolderItem | null>(null);
  const [selectedDossierInLib, setSelectedDossierInLib] = useState<ServiceDossier | null>(null);

  // Active selected site object
  const currentSite = useMemo(() => {
    if (!selectedSiteId) return null;
    return sites.find(s => s.id === selectedSiteId) || sites[0];
  }, [selectedSiteId, sites]);

  // Toggle favorite site
  const handleToggleFavorite = (siteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playXboxSound('select');
    setSites(prev => prev.map(s => {
      if (s.id === siteId) {
        return { ...s, isFavorite: !s.isFavorite };
      }
      return s;
    }));
  };

  // Toggle join/leave site
  const handleToggleJoin = (siteId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playXboxSound('select');
    setSites(prev => prev.map(s => {
      if (s.id === siteId) {
        const nextJoined = !s.isJoined;
        return { 
          ...s, 
          isJoined: nextJoined,
          memberCount: nextJoined ? s.memberCount + 1 : Math.max(1, s.memberCount - 1)
        };
      }
      return s;
    }));
  };

  // Filtered sites for Sites Home Grid
  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      // Filter by tab
      if (siteFilterMode === 'joined' && !site.isJoined) return false;
      if (siteFilterMode === 'favorites' && !site.isFavorite) return false;

      // Filter by search query
      if (siteSearchQuery.trim()) {
        const q = siteSearchQuery.toLowerCase().trim();
        const matchesTitle = site.title.toLowerCase().includes(q);
        const matchesDesc = site.description.toLowerCase().includes(q);
        const matchesShort = site.shortName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesShort) return false;
      }

      return true;
    });
  }, [sites, siteFilterMode, siteSearchQuery]);

  // Handle site selection
  const handleEnterSite = (siteId: string, tab: 'dashboard' | 'documentLibrary' | 'members' = 'dashboard') => {
    playXboxSound('select');
    setSelectedSiteId(siteId);
    setActiveSiteTab(tab);
  };

  // Create new Alfresco site
  const handleCreateSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteTitle.trim()) return;

    playXboxSound('toastSuccess');
    const slug = newSiteShortName.trim() || newSiteTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newSite: AlfrescoSiteItem = {
      id: slug,
      shortName: slug,
      title: newSiteTitle,
      description: newSiteDescription || 'Nouvel espace collaboratif créé sur le portail Alfresco.',
      visibility: newSiteVisibility,
      visibilityLabel: newSiteVisibility === 'PUBLIC' ? 'Public' : newSiteVisibility === 'MODERATED' ? 'Modéré' : 'Privé',
      currentUserRole: 'SiteManager',
      currentUserRoleLabel: 'Gestionnaire de site',
      isFavorite: true,
      isJoined: true,
      memberCount: 1,
      badgeColor: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
      accentColor: '#0284c7',
      bannerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
      icon: 'Building2',
      createdAt: new Date().toLocaleDateString('fr-FR'),
      lastActivity: 'À l\'instant',
      members: [INITIAL_ALFRESCO_MEMBERS[0]],
      activities: [
        {
          id: `act-${Date.now()}`,
          userName: 'Amour Samuel NZILA NGALA',
          userAvatar: INITIAL_ALFRESCO_MEMBERS[0].avatar,
          userRole: 'Gestionnaire de site',
          action: 'member_join',
          actionLabel: 'a créé le site',
          targetTitle: newSiteTitle,
          targetType: 'dossier',
          timestamp: 'Aujourd\'hui',
          timeAgo: 'À l\'instant'
        }
      ],
      serviceData: {
        id: slug,
        code: 'SITE',
        name: newSiteTitle,
        shortName: slug,
        description: newSiteDescription,
        icon: 'Folder',
        badgeColor: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
        bannerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
        activites: [
          { id: 'general', name: 'Documents généraux', description: 'Fonds documentaire initial', count: 0 }
        ],
        dossiers: [],
        registres: [],
        stats: { totalDossiers: 0, nouveaux: 0, enCours: 0, clotures: 0 }
      }
    };

    setSites(prev => [newSite, ...prev]);
    setIsCreateSiteModalOpen(false);
    setNewSiteTitle('');
    setNewSiteShortName('');
    setNewSiteDescription('');
    setSelectedSiteId(newSite.id);
    setActiveSiteTab('dashboard');
  };

  // Invite member into current site
  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !currentSite) return;

    playXboxSound('toastSuccess');
    const newMember: AlfrescoMember = {
      id: `m-${Date.now()}`,
      name: inviteName,
      email: inviteEmail || `${inviteName.toLowerCase().replace(/\s+/g, '.')}@ville-archivage.gouv.fr`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: inviteRole,
      roleLabel: ALFRESCO_ROLES_META[inviteRole].label,
      department: currentSite.title,
      joinedDate: new Date().toLocaleDateString('fr-FR'),
      status: 'En ligne'
    };

    const newActivity: AlfrescoActivity = {
      id: `act-${Date.now()}`,
      userName: 'Amour Samuel NZILA NGALA',
      userAvatar: INITIAL_ALFRESCO_MEMBERS[0].avatar,
      userRole: 'Gestionnaire de site',
      action: 'member_join',
      actionLabel: `a invité ${inviteName} en tant que ${ALFRESCO_ROLES_META[inviteRole].label}`,
      targetTitle: currentSite.title,
      targetType: 'membre',
      timestamp: 'Aujourd\'hui',
      timeAgo: 'À l\'instant'
    };

    setSites(prev => prev.map(s => {
      if (s.id === currentSite.id) {
        return {
          ...s,
          memberCount: s.memberCount + 1,
          members: [newMember, ...s.members],
          activities: [newActivity, ...s.activities]
        };
      }
      return s;
    }));

    setIsInviteMemberModalOpen(false);
    setInviteName('');
    setInviteEmail('');
  };

  // Helper icon renderer
  const renderSiteIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'Scroll': return <Scroll className={className} />;
      case 'Building': return <Building className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      case 'Users': return <Users className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Wrench': return <Wrench className={className} />;
      case 'Archive': return <Archive className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  // =========================================================================
  // VIEW 1: SITES HOME (Accueil des sites Alfresco avec grille)
  // =========================================================================
  if (!currentSite) {
    return (
      <div className="w-full h-full flex flex-col bg-[#030708] text-white overflow-y-auto no-scrollbar select-none py-2 sm:py-4 md:py-6">
        
        {/* TOP BAR / BANNER: SITES ALFRESCO */}
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/[0.08] pb-3 sm:pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-5 bg-sky-500 rounded-xs shadow-[0_0_10px_rgba(56,189,248,0.7)]" />
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Sites</span>
                  <span className="text-xs font-mono font-normal text-sky-400 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
                    ALFRESCO SHARE
                  </span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
                Espaces collaboratifs de travail : tableaux de bord d'équipe, bibliothèques documentaires partagées, membres et gestion des rôles.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setIsCreateSiteModalOpen(true);
                }}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xs bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Créer un site</span>
              </button>
            </div>
          </div>

          {/* FILTERS & SEARCH BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#0b1420]/80 border border-white/[0.08] p-2 sm:p-2.5 rounded-sm">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setSiteFilterMode('joined');
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  siteFilterMode === 'joined'
                    ? 'bg-sky-500/25 text-sky-300 border border-sky-500/40 shadow-[0_0_10px_rgba(56,189,248,0.25)] font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Mes sites</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] font-mono">
                  {sites.filter(s => s.isJoined).length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setSiteFilterMode('favorites');
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  siteFilterMode === 'favorites'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.25)] font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Sites favoris</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] font-mono">
                  {sites.filter(s => s.isFavorite).length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playXboxSound('select');
                  setSiteFilterMode('all');
                }}
                className={`px-3 py-1.5 rounded-xs text-xs font-medium transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  siteFilterMode === 'all'
                    ? 'bg-white/20 text-white border border-white/30 font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tous les sites</span>
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] font-mono">
                  {sites.length}
                </span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={siteSearchQuery}
                onChange={(e) => setSiteSearchQuery(e.target.value)}
                placeholder="Rechercher un site..."
                className="w-full pl-8 pr-3 py-1.5 bg-black/40 border border-white/10 rounded-xs text-xs text-white placeholder:text-white/40 focus:outline-hidden focus:border-sky-400"
              />
              {siteSearchQuery && (
                <button
                  type="button"
                  onClick={() => setSiteSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SITES GRID: ALFRESCO BENTO CARDS */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filteredSites.map((site) => {
            const roleMeta = ALFRESCO_ROLES_META[site.currentUserRole];

            return (
              <div
                key={site.id}
                onClick={() => handleEnterSite(site.id, 'dashboard')}
                className="group relative flex flex-col justify-between rounded-sm border border-white/10 hover:border-sky-400/80 bg-gradient-to-b from-[#0e1b2b] via-[#09121d] to-[#04080e] p-3.5 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(56,189,248,0.2)] cursor-pointer overflow-hidden"
              >
                {/* Top Row: Icon + Visibilité + Star Favorite */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-xs flex items-center justify-center border ${site.badgeColor} shrink-0`}>
                        {renderSiteIcon(site.icon, "w-4 h-4")}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono text-white/50 block truncate">
                          /{site.shortName}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-xs border ${
                            site.visibility === 'PUBLIC'
                              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                              : site.visibility === 'MODERATED'
                              ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                              : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          }`}>
                            {site.visibilityLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(site.id, e)}
                      title={site.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                      className="p-1 text-white/40 hover:text-amber-400 transition-colors shrink-0"
                    >
                      <Star className={`w-4 h-4 ${site.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors tracking-tight line-clamp-1">
                    {site.title}
                  </h3>
                  <p className="text-[11px] text-white/60 mt-1 line-clamp-2 leading-relaxed">
                    {site.description}
                  </p>
                </div>

                {/* Middle Info: User Role Badge */}
                <div className="my-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px]">
                  <span className="text-white/40">Mon rôle :</span>
                  <span className={`px-2 py-0.5 rounded-xs border font-medium ${roleMeta.badgeClass}`}>
                    {roleMeta.label}
                  </span>
                </div>

                {/* Bottom Footer: Stats & Navigation Shortcut */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-white/50 font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="flex items-center gap-1 hover:text-white" title="Membres du site">
                      <Users className="w-3 h-3 text-sky-400" />
                      <span>{site.memberCount}</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-white" title="Documents & dossiers">
                      <FileText className="w-3 h-3 text-emerald-400" />
                      <span>{site.serviceData.dossiers.length}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sky-400 group-hover:translate-x-0.5 transition-transform font-medium">
                    <span>Ouvrir</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Hover Action Bar for Direct Access */}
                <div className="mt-2.5 pt-2 border-t border-white/[0.08] flex items-center justify-between gap-1 text-[10px] font-sans">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterSite(site.id, 'documentLibrary');
                    }}
                    className="flex-1 py-1 text-center bg-white/[0.05] hover:bg-white/10 hover:text-white rounded-xs text-white/70 transition-colors"
                  >
                    Bibliothèque
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterSite(site.id, 'members');
                    }}
                    className="flex-1 py-1 text-center bg-white/[0.05] hover:bg-white/10 hover:text-white rounded-xs text-white/70 transition-colors"
                  >
                    Membres
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleToggleJoin(site.id, e)}
                    className={`px-2 py-1 rounded-xs transition-colors font-mono text-[9px] ${
                      site.isJoined 
                        ? 'bg-emerald-500/20 text-emerald-300 hover:bg-rose-500/20 hover:text-rose-300' 
                        : 'bg-sky-500 text-black font-semibold hover:bg-sky-400'
                    }`}
                  >
                    {site.isJoined ? 'Rejoint' : '+ Rejoindre'}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredSites.length === 0 && (
            <div className="col-span-full text-center py-16 bg-[#08111b] border border-white/[0.08] rounded-sm p-6">
              <Building2 className="w-12 h-12 text-white/20 mx-auto mb-3" />
              <p className="text-white/80 font-medium">Aucun site ne correspond aux critères.</p>
              <p className="text-white/40 text-xs mt-1">Modifiez vos filtres ou créez un nouveau site.</p>
              <button
                type="button"
                onClick={() => {
                  setSiteFilterMode('all');
                  setSiteSearchQuery('');
                }}
                className="mt-4 px-3 py-1.5 rounded-xs bg-sky-500/20 text-sky-300 text-xs border border-sky-500/30 hover:bg-sky-500/30"
              >
                Afficher tous les sites
              </button>
            </div>
          )}
        </div>

        {/* MODAL: CRÉER UN SITE ALFRESCO */}
        {isCreateSiteModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="w-full max-w-lg bg-[#0c1827] border border-white/15 rounded-md shadow-2xl p-4 sm:p-6 text-white animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-4 bg-sky-500 rounded-xs" />
                  <h2 className="text-base sm:text-lg font-bold">Créer un nouveau site Alfresco</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateSiteModalOpen(false)}
                  className="p-1 text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateSite} className="mt-4 flex flex-col gap-3.5 text-xs">
                <div>
                  <label className="block text-white/70 mb-1 font-medium">Nom du site *</label>
                  <input
                    type="text"
                    required
                    value={newSiteTitle}
                    onChange={(e) => {
                      setNewSiteTitle(e.target.value);
                      if (!newSiteShortName) {
                        setNewSiteShortName(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                      }
                    }}
                    placeholder="Ex: Pôle Aménagement & Transition Écologique"
                    className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white focus:outline-hidden focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-medium">Nom court (URL / Identifiant)</label>
                  <input
                    type="text"
                    value={newSiteShortName}
                    onChange={(e) => setNewSiteShortName(e.target.value)}
                    placeholder="pole-amenagement"
                    className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white font-mono text-[11px] focus:outline-hidden focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-medium">Description</label>
                  <textarea
                    rows={2}
                    value={newSiteDescription}
                    onChange={(e) => setNewSiteDescription(e.target.value)}
                    placeholder="Objectif du site, membres concernés, documents gérés..."
                    className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white focus:outline-hidden focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-medium">Visibilité du site</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewSiteVisibility('PUBLIC')}
                      className={`p-2 rounded-xs border text-left flex flex-col gap-1 transition-all ${
                        newSiteVisibility === 'PUBLIC'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" /> Public
                      </span>
                      <span className="text-[10px] opacity-70">Tout le monde peut rejoindre</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewSiteVisibility('MODERATED')}
                      className={`p-2 rounded-xs border text-left flex flex-col gap-1 transition-all ${
                        newSiteVisibility === 'MODERATED'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Modéré
                      </span>
                      <span className="text-[10px] opacity-70">Adhésion soumise à validation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewSiteVisibility('PRIVATE')}
                      className={`p-2 rounded-xs border text-left flex flex-col gap-1 transition-all ${
                        newSiteVisibility === 'PRIVATE'
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                          : 'bg-black/30 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Privé
                      </span>
                      <span className="text-[10px] opacity-70">Uniquement sur invitation</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateSiteModalOpen(false)}
                    className="px-3 py-1.5 text-white/60 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xs bg-sky-500 hover:bg-sky-400 text-black font-bold"
                  >
                    Créer le site
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE SITE ENVIRONMENT (Alfresco Site Navigation & Dashboards)
  // =========================================================================
  const siteRoleMeta = ALFRESCO_ROLES_META[currentSite.currentUserRole];
  const dossiers = currentSite.serviceData.dossiers;

  // Filter dossiers in document library
  const filteredDocLibDossiers = dossiers.filter(d => {
    if (docLibCategory !== 'all' && d.activityId !== docLibCategory) return false;
    if (docLibStatus !== 'all' && d.status !== docLibStatus) return false;
    if (docLibSearchQuery.trim()) {
      const q = docLibSearchQuery.toLowerCase();
      if (!d.title.toLowerCase().includes(q) && !d.reference.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col bg-[#030708] text-white overflow-hidden select-none">
      
      {/* ── SITE TOP HEADER & ALFRESCO NAVIGATION BAR ── */}
      <div className="w-full bg-[#091422] border-b border-white/10 shrink-0">
        
        {/* Upper Breadcrumb & Site Title Bar */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Back to all sites */}
            <button
              type="button"
              onClick={() => {
                playXboxSound('select');
                setSelectedSiteId(null);
              }}
              className="p-1.5 rounded-xs bg-white/[0.06] hover:bg-white/15 text-white/70 hover:text-white transition-colors flex items-center gap-1 text-xs shrink-0 cursor-pointer"
              title="Retourner à la liste de tous les sites"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tous les sites</span>
            </button>

            <span className="text-white/30 hidden sm:inline">/</span>

            {/* Site Icon & Title */}
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xs flex items-center justify-center border ${currentSite.badgeColor} shrink-0`}>
                {renderSiteIcon(currentSite.icon, "w-4 h-4")}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight truncate">
                    {currentSite.title}
                  </h1>
                  <span className={`hidden md:inline-block text-[9px] font-mono px-1.5 py-0.2 rounded-xs border ${
                    currentSite.visibility === 'PUBLIC'
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : currentSite.visibility === 'MODERATED'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  }`}>
                    {currentSite.visibilityLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/50 font-mono">
                  <span>/{currentSite.shortName}</span>
                  <span>•</span>
                  <span>{currentSite.memberCount} membres</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Controls: My Role & Site Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`hidden lg:inline-block px-2 py-0.5 rounded-xs border text-[10px] font-medium ${siteRoleMeta.badgeClass}`}>
              {siteRoleMeta.label}
            </span>

            {/* Quick Site Switcher dropdown */}
            <select
              value={currentSite.id}
              onChange={(e) => {
                playXboxSound('select');
                setSelectedSiteId(e.target.value);
              }}
              className="bg-black/50 border border-white/15 rounded-xs text-[11px] text-white px-2 py-1 focus:outline-hidden focus:border-sky-400 max-w-[130px] sm:max-w-[180px] truncate cursor-pointer"
            >
              {sites.map(s => (
                <option key={s.id} value={s.id} className="bg-[#0c1827] text-white">
                  {s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ALFRESCO SITE TABS (Tableau de bord, Espace documentaire, Membres, Activités, Paramètres) */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-white/[0.06]">
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setActiveSiteTab('dashboard');
            }}
            className={`px-3 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeSiteTab === 'dashboard'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Tableau de bord</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setActiveSiteTab('documentLibrary');
            }}
            className={`px-3 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeSiteTab === 'documentLibrary'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Espace documentaire</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[9px] font-mono">
              {dossiers.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setActiveSiteTab('members');
            }}
            className={`px-3 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeSiteTab === 'members'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Membres du site</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[9px] font-mono">
              {currentSite.members.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setActiveSiteTab('activities');
            }}
            className={`px-3 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeSiteTab === 'activities'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Flux d'activités</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setActiveSiteTab('settings');
            }}
            className={`px-3 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeSiteTab === 'settings'
                ? 'border-sky-400 text-sky-300 bg-sky-500/10'
                : 'border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Paramètres du site</span>
          </button>
        </div>

      </div>

      {/* ── SITE TAB CONTENT ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col">

          {/* TAB 1: TABLEAU DE BORD DU SITE (ALFRESCO DASHLETS) */}
          {activeSiteTab === 'dashboard' && (
            <div className="grid grid-cols-12 gap-3 sm:gap-4">
              
              {/* DASHLET 1: ACTIVITÉS DU SITE (col-span-12 lg:col-span-7) */}
              <div className="col-span-12 lg:col-span-7 bg-[#0b1624] border border-white/10 rounded-sm p-3.5 sm:p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-sky-400" />
                      <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Activités récentes du site
                      </h3>
                    </div>
                    <span className="text-[10px] text-white/50 font-mono">Temps réel</span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {currentSite.activities.map((act) => (
                      <div
                        key={act.id}
                        className="flex items-start gap-2.5 p-2 rounded-xs bg-black/30 border border-white/[0.04] hover:border-white/15 transition-all text-xs"
                      >
                        <img
                          src={act.userAvatar}
                          alt={act.userName}
                          className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0 mt-0.5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white/90 leading-snug">
                            <span className="font-semibold text-sky-300">{act.userName}</span>{' '}
                            <span className="text-white/70">{act.actionLabel}</span>{' '}
                            <span className="font-medium text-amber-300 underline underline-offset-2 decoration-amber-500/40">
                              {act.targetTitle}
                            </span>
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-white/40 font-mono">
                            <span>{act.timeAgo}</span>
                            <span>•</span>
                            <span className="text-white/60">{act.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-white/40 text-[11px]">Toutes les actions sont auditées selon la norme Alfresco</span>
                  <button
                    type="button"
                    onClick={() => setActiveSiteTab('activities')}
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <span>Voir tout l'historique</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* DASHLET 2: MEMBRES DU SITE (col-span-12 lg:col-span-5) */}
              <div className="col-span-12 lg:col-span-5 bg-[#0b1624] border border-white/10 rounded-sm p-3.5 sm:p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                        Membres du site ({currentSite.members.length})
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsInviteMemberModalOpen(true)}
                      className="px-2 py-0.5 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono hover:bg-emerald-500/30 cursor-pointer"
                    >
                      + Inviter
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentSite.members.slice(0, 5).map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-xs bg-black/30 border border-white/[0.04]"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{member.name}</p>
                            <p className="text-[10px] text-white/50 truncate font-mono">{member.roleLabel}</p>
                          </div>
                        </div>

                        <span className={`text-[9px] px-1.5 py-0.2 rounded-xs font-mono shrink-0 ${
                          member.status === 'En ligne'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-white/10 text-white/50'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-white/40 text-[11px]">Rôles Alfresco RBAC</span>
                  <button
                    type="button"
                    onClick={() => setActiveSiteTab('members')}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <span>Gérer les membres</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* DASHLET 3: DOCUMENTS & STATS (col-span-12) */}
              <div className="col-span-12 bg-[#0b1624] border border-white/10 rounded-sm p-3.5 sm:p-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Bibliothèque documentaire & Raccourcis
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSiteTab('documentLibrary')}
                    className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
                  >
                    <span>Accéder à l'espace documentaire complet</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  <div className="p-3 bg-black/40 border border-white/10 rounded-xs">
                    <p className="text-[10px] text-white/50 font-mono uppercase">Total Dossiers</p>
                    <p className="text-lg sm:text-2xl font-bold text-white mt-0.5">{dossiers.length}</p>
                    <p className="text-[10px] text-sky-400 mt-1">Espace documentaire actif</p>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-xs">
                    <p className="text-[10px] text-white/50 font-mono uppercase">En Traitement</p>
                    <p className="text-lg sm:text-2xl font-bold text-amber-400 mt-0.5">
                      {dossiers.filter(d => d.status === 'En traitement' || d.status === 'En cours').length}
                    </p>
                    <p className="text-[10px] text-white/40 mt-1">Instruction en cours</p>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-xs">
                    <p className="text-[10px] text-white/50 font-mono uppercase">Archivés physiques</p>
                    <p className="text-lg sm:text-2xl font-bold text-purple-400 mt-0.5">
                      {dossiers.filter(d => d.archivage.isPhysicallyArchived).length}
                    </p>
                    <p className="text-[10px] text-purple-300 mt-1">Cotes de magasin attribuées</p>
                  </div>
                  <div className="p-3 bg-black/40 border border-white/10 rounded-xs">
                    <p className="text-[10px] text-white/50 font-mono uppercase">Clôturés</p>
                    <p className="text-lg sm:text-2xl font-bold text-emerald-400 mt-0.5">
                      {dossiers.filter(d => d.status === 'Clôturé' || d.status === 'Archivé').length}
                    </p>
                    <p className="text-[10px] text-emerald-400 mt-1">Prêts pour versement</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ESPACE DOCUMENTAIRE (ALFRESCO DOCUMENT LIBRARY) */}
          {activeSiteTab === 'documentLibrary' && (
            <div className="flex flex-col gap-4">
              
              {/* If a dossier is actively opened in the document library, display its contents in-situ */}
              {selectedDossierInLib ? (
                <div className="bg-[#0b1624] border border-white/10 rounded-xl p-4 sm:p-6 flex flex-col gap-5 animate-in fade-in duration-200">
                  {/* Header with back button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          playXboxSound('back');
                          setSelectedDossierInLib(null);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-sky-500/20 text-white/80 hover:text-sky-300 border border-white/10 hover:border-sky-500/30 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <ArrowLeft className="w-4 h-4 text-sky-400" />
                        <span>Tous les dossiers</span>
                      </button>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                            {selectedDossierInLib.reference}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            selectedDossierInLib.status === 'Archivé'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                              : selectedDossierInLib.status === 'Clôturé'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}>
                            {selectedDossierInLib.status}
                          </span>
                          <span className="text-xs text-white/40 font-mono">
                            Créé le {selectedDossierInLib.dateCreation}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                          {selectedDossierInLib.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          playXboxSound('modalOpen');
                          setOverlayFolder(serviceDossierToFolderItem(selectedDossierInLib));
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-sky-400" />
                        <span>Aperçu 3D</span>
                      </button>
                    </div>
                  </div>

                  {/* Description & Metadata summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-lg bg-black/30 border border-white/[0.06] text-xs">
                    <div className="md:col-span-2">
                      <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">Description</span>
                      <p className="text-white/80 leading-relaxed">{selectedDossierInLib.description || 'Dossier archivistique Alfresco officiel'}</p>
                    </div>
                    <div className="flex flex-col gap-1 border-t md:border-t-0 md:border-l border-white/10 pt-2 md:pt-0 md:pl-3">
                      <span className="text-[10px] font-mono uppercase text-white/40 block">Statut d'Archivage</span>
                      {selectedDossierInLib.archivage.isPhysicallyArchived ? (
                        <div className="text-purple-300 font-mono text-[11px] flex items-center gap-1.5">
                          <Archive className="w-3.5 h-3.5" />
                          <span>Cote: {selectedDossierInLib.archivage.cote}</span>
                        </div>
                      ) : (
                        <span className="text-amber-400/90 font-mono text-[11px]">En cours d'instruction locale</span>
                      )}
                    </div>
                  </div>

                  {/* Documents list */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-sky-400" />
                        <span>Pièces & Documents du dossier ({selectedDossierInLib.documents.length})</span>
                      </h4>
                      <span className="text-[11px] font-mono text-white/40">
                        Cliquez sur un document pour afficher le visualiseur
                      </span>
                    </div>

                    <div className="divide-y divide-white/[0.06] border border-white/10 rounded-xl bg-black/20 overflow-hidden">
                      {selectedDossierInLib.documents.map((doc, docIdx) => (
                        <div
                          key={doc.id || docIdx}
                          onClick={() => {
                            playXboxSound('select');
                            setPreviewDoc(doc);
                          }}
                          className="p-3 sm:p-4 hover:bg-white/[0.04] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:border-sky-400/50">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors truncate">
                                {doc.name}
                              </p>
                              <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 mt-0.5">
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>Modifié le {doc.dateUpload || selectedDossierInLib.dateCreation}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                playXboxSound('select');
                                setPreviewDoc(doc);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30 text-xs font-mono flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Consulter</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Filter & Toolbar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-[#0b1624] border border-white/10 p-2.5 rounded-sm">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                      <span className="text-xs text-white/50 font-mono mr-1">Catégories :</span>
                      <button
                        type="button"
                        onClick={() => setDocLibCategory('all')}
                        className={`px-2.5 py-1 rounded-xs text-xs font-medium cursor-pointer shrink-0 ${
                          docLibCategory === 'all'
                            ? 'bg-sky-500 text-black font-bold'
                            : 'bg-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        Toutes ({dossiers.length})
                      </button>
                      {currentSite.serviceData.activites.map(act => (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => setDocLibCategory(act.id)}
                          className={`px-2.5 py-1 rounded-xs text-xs font-medium cursor-pointer shrink-0 ${
                            docLibCategory === act.id
                              ? 'bg-sky-500 text-black font-bold'
                              : 'bg-white/10 text-white/70 hover:text-white'
                          }`}
                        >
                          {act.name} ({act.count || 0})
                        </button>
                      ))}
                    </div>

                    {/* Filter and View mode bar */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                        <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={docLibSearchQuery}
                          onChange={(e) => setDocLibSearchQuery(e.target.value)}
                          placeholder="Filtrer les dossiers & pièces..."
                          className="w-full pl-8 pr-3 py-1 bg-black/40 border border-white/10 rounded-xs text-xs text-white focus:outline-hidden focus:border-sky-400 font-mono"
                        />
                      </div>

                      {/* View Mode Switcher */}
                      <div className="flex items-center bg-black/40 border border-white/10 rounded-sm p-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            playXboxSound('toggle');
                            setDocLibViewMode('grid');
                          }}
                          className={`p-1.5 rounded-xs transition-colors ${
                            docLibViewMode === 'grid' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white'
                          }`}
                          title="Vue Dossiers 3D interactifs"
                        >
                          <Folder className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            playXboxSound('toggle');
                            setDocLibViewMode('list');
                          }}
                          className={`p-1.5 rounded-xs transition-colors ${
                            docLibViewMode === 'list' ? 'bg-white/15 text-white' : 'text-white/40 hover:text-white'
                          }`}
                          title="Vue Cartes détaillées"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dossiers & Documents List */}
                  {filteredDocLibDossiers.length === 0 ? (
                    <div className="p-8 text-center bg-[#071118]/60 border border-dashed border-white/10 rounded-sm">
                      <Folder className="w-8 h-8 text-white/30 mx-auto mb-2" />
                      <p className="text-white/70 text-xs">Aucun dossier métier trouvé correspondant aux critères.</p>
                    </div>
                  ) : docLibViewMode === 'grid' ? (
                    /* Signature 3D Interactive Folders - Clean & Well Spaced */
                    <div className="grid grid-cols-1 min-[340px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-4 sm:gap-y-6 md:gap-y-8 gap-x-3 sm:gap-x-5 justify-items-center overflow-visible pt-1 pb-4">
                      {filteredDocLibDossiers.map(dossier => {
                        const folderItem = serviceDossierToFolderItem(dossier);
                        return (
                          <div
                            key={dossier.id}
                            className="w-full flex justify-center overflow-visible"
                            onClick={() => {
                              playXboxSound('select');
                            }}
                          >
                            <InteractiveFolderGallery
                              folderName={folderItem.name}
                              matricule={folderItem.matricule}
                              photos={folderItem.photos}
                              dragHintText="Glissez vers le bas pour fermer"
                              onViewMore={() => {
                                playXboxSound('select');
                                setSelectedDossierInLib(dossier);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Detailed Cards View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredDocLibDossiers.map(dossier => {
                        const folderItem = serviceDossierToFolderItem(dossier);
                        return (
                          <div
                            key={dossier.id}
                            className="bg-[#0b1624] border border-white/10 hover:border-sky-400/80 rounded-xl p-4 transition-all flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-2">
                                <span className="text-[10px] font-mono font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
                                  {dossier.reference}
                                </span>
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                                  dossier.status === 'Archivé'
                                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                                    : dossier.status === 'Clôturé'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                }`}>
                                  {dossier.status}
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-white group-hover:text-sky-200 transition-colors line-clamp-1">
                                {dossier.title}
                              </h4>
                              <p className="text-[11px] text-white/60 mt-1 line-clamp-2">
                                {dossier.description}
                              </p>

                              {/* Documents inside this folder */}
                              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-mono text-white/40 uppercase">
                                    Pièces justificatives ({dossier.documents.length})
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      playXboxSound('select');
                                      setSelectedDossierInLib(dossier);
                                    }}
                                    className="text-[10px] text-sky-400 hover:text-sky-300 font-mono flex items-center gap-1"
                                  >
                                    <FolderOpen className="w-3 h-3" />
                                    <span>Explorer</span>
                                  </button>
                                </div>
                                {dossier.documents.slice(0, 2).map(doc => (
                                  <div
                                    key={doc.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playXboxSound('select');
                                      setPreviewDoc(doc);
                                    }}
                                    className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/[0.04] hover:border-sky-400/50 cursor-pointer text-xs group/doc"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                                      <span className="text-[11px] text-white/80 group-hover/doc:text-sky-300 truncate">
                                        {doc.name}
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-white/40 font-mono shrink-0 ml-1">
                                      {doc.size}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Archive status */}
                            <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                              {dossier.archivage.isPhysicallyArchived ? (
                                <span className="text-purple-300 flex items-center gap-1">
                                  <Archive className="w-3 h-3" />
                                  <span>{dossier.archivage.cote}</span>
                                </span>
                              ) : (
                                <span className="text-amber-400/80">Instruction locale</span>
                              )}
                              <span className="text-white/40">{dossier.dateCreation}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

            </div>
          )}

          {/* TAB 3: MEMBRES DU SITE (ALFRESCO MEMBERSHIP) */}
          {activeSiteTab === 'members' && (
            <div className="bg-[#0b1624] border border-white/10 rounded-sm p-4 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Membres & Rôles Alfresco</span>
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Gestion des habilitations de l'espace collaboratif {currentSite.title}.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsInviteMemberModalOpen(true)}
                  className="px-3 py-1.5 rounded-xs bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Inviter des personnes</span>
                </button>
              </div>

              {/* Members Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 font-mono uppercase text-[10px]">
                      <th className="pb-2">Utilisateur</th>
                      <th className="pb-2">Courriel</th>
                      <th className="pb-2">Service / Département</th>
                      <th className="pb-2">Rôle Alfresco</th>
                      <th className="pb-2">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {currentSite.members.map(member => (
                      <tr key={member.id} className="hover:bg-white/[0.02]">
                        <td className="py-2.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              className="w-7 h-7 rounded-full object-cover border border-white/20"
                            />
                            <span className="font-semibold text-white">{member.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-white/60 font-mono text-[11px]">{member.email}</td>
                        <td className="py-2.5 text-white/70">{member.department}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-xs border text-[10px] font-mono ${ALFRESCO_ROLES_META[member.role].badgeClass}`}>
                            {member.roleLabel}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <span className={`text-[10px] font-mono ${
                            member.status === 'En ligne' ? 'text-emerald-400' : 'text-white/40'
                          }`}>
                            ● {member.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: FLUX D'ACTIVITÉS DU SITE */}
          {activeSiteTab === 'activities' && (
            <div className="bg-[#0b1624] border border-white/10 rounded-sm p-4 flex flex-col gap-3">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span>Journal des événements & Audit du site</span>
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Traçabilité complète des versements, modifications et mouvements de l'espace documentaire.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {currentSite.activities.map(act => (
                  <div
                    key={act.id}
                    className="p-3 bg-black/40 border border-white/[0.06] rounded-xs flex items-start gap-3 text-xs"
                  >
                    <img
                      src={act.userAvatar}
                      alt={act.userName}
                      className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white leading-relaxed">
                        <span className="font-bold text-sky-300">{act.userName}</span>{' '}
                        <span className="text-white/70">{act.actionLabel}</span>{' '}
                        <span className="font-semibold text-amber-300">{act.targetTitle}</span>
                      </p>
                      <p className="text-[10px] text-white/40 font-mono mt-1">
                        {act.timestamp} • {act.timeAgo} • Certifié conformité Alfresco
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PARAMÈTRES DU SITE */}
          {activeSiteTab === 'settings' && (
            <div className="bg-[#0b1624] border border-white/10 rounded-sm p-4 sm:p-6 max-w-2xl flex flex-col gap-4 text-xs">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-white/70" />
                  <span>Paramètres & Propriétés du site</span>
                </h3>
                <p className="text-white/60 mt-0.5">
                  Configuration générale et métadonnées de l'espace collaboratif.
                </p>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Titre du site</label>
                <input
                  type="text"
                  value={currentSite.title}
                  readOnly
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Nom court (URL)</label>
                <input
                  type="text"
                  value={currentSite.shortName}
                  readOnly
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white/60 font-mono"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Description</label>
                <textarea
                  rows={3}
                  value={currentSite.description}
                  readOnly
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white/80"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Visibilité actuelle</label>
                <span className={`inline-block px-2 py-0.5 rounded-xs border font-mono text-[10px] ${
                  currentSite.visibility === 'PUBLIC'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : currentSite.visibility === 'MODERATED'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {currentSite.visibilityLabel}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL: INVITER UN MEMBRE */}
      {isInviteMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-md bg-[#0c1827] border border-white/15 rounded-md shadow-2xl p-4 sm:p-5 text-white animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-sm">Inviter un nouveau membre dans {currentSite.title}</h3>
              <button
                type="button"
                onClick={() => setIsInviteMemberModalOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="mt-3.5 flex flex-col gap-3">
              <div>
                <label className="block text-white/70 mb-1 font-medium">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="Ex: Jean Martin"
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white focus:outline-hidden focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Adresse email</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="j.martin@ville-archivage.gouv.fr"
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white focus:outline-hidden focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Rôle Alfresco assigné</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as AlfrescoSiteRole)}
                  className="w-full p-2 bg-black/40 border border-white/10 rounded-xs text-white focus:outline-hidden focus:border-sky-400"
                >
                  <option value="SiteCollaborator">Collaborateur (peut créer, modifier et supprimer)</option>
                  <option value="SiteContributor">Contributeur (peut ajouter du contenu)</option>
                  <option value="SiteConsumer">Consommateur (lecture seule)</option>
                  <option value="SiteManager">Gestionnaire de site (droits complets)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteMemberModalOpen(false)}
                  className="px-3 py-1.5 text-white/60 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xs bg-emerald-500 hover:bg-emerald-400 text-black font-bold"
                >
                  Envoyer l'invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DOCUMENT PREVIEW */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-xl bg-[#0c1827] border border-white/15 rounded-md shadow-2xl p-4 sm:p-5 text-white animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-sm truncate">{previewDoc.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 p-4 rounded-xs bg-black/50 border border-white/10 flex flex-col items-center justify-center min-h-[160px] text-center">
              <FileText className="w-12 h-12 text-sky-400/60 mb-2" />
              <p className="font-semibold text-white text-xs">{previewDoc.name}</p>
              <p className="text-[10px] text-white/50 font-mono mt-1">
                Format: {previewDoc.format} • Taille: {previewDoc.size} • Date: {previewDoc.date}
              </p>
              <span className="mt-2 px-2 py-0.5 rounded-xs bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                Statut : {previewDoc.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <span className="text-white/40 text-[11px]">Intégré dans le référentiel Alfresco</span>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-1.5 rounded-xs bg-sky-500 text-black font-semibold hover:bg-sky-400"
              >
                Fermer l'aperçu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FOLDER 3D FILES OVERLAY ("VOIR PLUS") */}
      {overlayFolder && (
        <FolderFilesOverlay
          folder={overlayFolder}
          isOpen={!!overlayFolder}
          onClose={() => setOverlayFolder(null)}
        />
      )}

    </div>
  );
}
