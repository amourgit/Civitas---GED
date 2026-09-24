import { INSTITUTIONAL_SERVICES, ServiceItem, ServiceDossier, ServiceDocument } from './servicesStructure';

export type AlfrescoSiteRole = 
  | 'SiteManager'       // Gestionnaire de site (droits complets, invitation, administration)
  | 'SiteCollaborator'  // Collaborateur (création, modification, suppression de documents)
  | 'SiteContributor'   // Contributeur (ajout de documents, modification de ses propres documents)
  | 'SiteConsumer';     // Consommateur (lecture seule)

export type AlfrescoSiteVisibility = 'PUBLIC' | 'MODERATED' | 'PRIVATE';

export interface AlfrescoMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: AlfrescoSiteRole;
  roleLabel: string;
  department: string;
  joinedDate: string;
  status: 'En ligne' | 'Absent' | 'Hors ligne';
}

export interface AlfrescoActivity {
  id: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  action: 'upload' | 'edit' | 'validate' | 'archive' | 'member_join' | 'delete' | 'comment';
  actionLabel: string;
  targetTitle: string;
  targetType: 'document' | 'dossier' | 'membre' | 'workflow';
  timestamp: string;
  timeAgo: string;
}

export interface AlfrescoSiteItem {
  id: string;
  shortName: string;
  title: string;
  description: string;
  visibility: AlfrescoSiteVisibility;
  visibilityLabel: string;
  currentUserRole: AlfrescoSiteRole;
  currentUserRoleLabel: string;
  isFavorite: boolean;
  isJoined: boolean;
  memberCount: number;
  badgeColor: string;
  accentColor: string;
  bannerImage: string;
  icon: string;
  createdAt: string;
  lastActivity: string;
  members: AlfrescoMember[];
  activities: AlfrescoActivity[];
  serviceData: ServiceItem;
}

export const ALFRESCO_ROLES_META: Record<AlfrescoSiteRole, { label: string; badgeClass: string; description: string }> = {
  SiteManager: {
    label: 'Gestionnaire de site',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Contrôle total du site, gestion des membres et des paramètres'
  },
  SiteCollaborator: {
    label: 'Collaborateur',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    description: 'Peut créer, modifier, organiser et supprimer tout contenu'
  },
  SiteContributor: {
    label: 'Contributeur',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Peut ajouter du contenu et modifier ses propres documents'
  },
  SiteConsumer: {
    label: 'Consommateur',
    badgeClass: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
    description: 'Accès en consultation et téléchargement uniquement'
  }
};

export const INITIAL_ALFRESCO_MEMBERS: AlfrescoMember[] = [
  {
    id: 'm-1',
    name: 'Amour Samuel NZILA NGALA',
    email: 'samuel.nzila@civitas-gabon.com',
    avatar: '/assets/moi-assis.jpg',
    role: 'SiteManager',
    roleLabel: 'Directeur Général (Gestionnaire de site)',
    department: 'Direction Générale • CIVITAS Gabon',
    joinedDate: '01/01/2026',
    status: 'En ligne'
  },
  {
    id: 'm-2',
    name: 'Claire BERNARD',
    email: 'c.bernard@ville-archivage.gouv.fr',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'SiteManager',
    roleLabel: 'Gestionnaire de site',
    department: 'Pôle Juridique & Conservation',
    joinedDate: '05/01/2026',
    status: 'En ligne'
  },
  {
    id: 'm-3',
    name: 'Marc DUPONT',
    email: 'm.dupont@ville-archivage.gouv.fr',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'SiteCollaborator',
    roleLabel: 'Collaborateur',
    department: 'Officier d\'État Civil Central',
    joinedDate: '10/01/2026',
    status: 'En ligne'
  },
  {
    id: 'm-4',
    name: 'Sophie LEFEBVRE',
    email: 's.lefebvre@ville-archivage.gouv.fr',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    role: 'SiteCollaborator',
    roleLabel: 'Collaborateur',
    department: 'Aménagement Urbain & Cadastre',
    joinedDate: '12/01/2026',
    status: 'Absent'
  },
  {
    id: 'm-5',
    name: 'Thomas MOREAU',
    email: 't.moreau@ville-archivage.gouv.fr',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'SiteContributor',
    roleLabel: 'Contributeur',
    department: 'Comptabilité & Marchés Publics',
    joinedDate: '15/01/2026',
    status: 'Hors ligne'
  },
  {
    id: 'm-6',
    name: 'Élise BLANCHARD',
    email: 'e.blanchard@ville-archivage.gouv.fr',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'SiteConsumer',
    roleLabel: 'Consommateur',
    department: 'Service Accueil & Citoyens',
    joinedDate: '18/01/2026',
    status: 'En ligne'
  }
];

export const INITIAL_ALFRESCO_SITES: AlfrescoSiteItem[] = [
  {
    id: 'dir-gen',
    shortName: 'dir-gen',
    title: 'Direction Générale & Arbitrages',
    description: 'Espace décisionnel et stratégique : arrêtés municipaux, délibérations du conseil, notes de cadrage et conventions.',
    visibility: 'PRIVATE',
    visibilityLabel: 'Privé',
    currentUserRole: 'SiteManager',
    currentUserRoleLabel: 'Gestionnaire de site',
    isFavorite: true,
    isJoined: true,
    memberCount: 8,
    badgeColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    accentColor: '#f59e0b',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    icon: 'Building2',
    createdAt: '01/01/2026',
    lastActivity: 'Il y a 35 min',
    members: INITIAL_ALFRESCO_MEMBERS.slice(0, 4),
    activities: [
      {
        id: 'act-dg-1',
        userName: 'Amour Samuel NZILA NGALA',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[0].avatar,
        userRole: 'Gestionnaire de site',
        action: 'validate',
        actionLabel: 'a validé l\'arrêté municipal',
        targetTitle: 'Arrêté_2026_042_Securite_Publique.pdf',
        targetType: 'document',
        timestamp: '18/09/2026 14:15',
        timeAgo: 'Il y a 35 min'
      },
      {
        id: 'act-dg-2',
        userName: 'Claire BERNARD',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[1].avatar,
        userRole: 'Gestionnaire de site',
        action: 'upload',
        actionLabel: 'a déposé le compte-rendu',
        targetTitle: 'CR_Bureau_Municipal_Septembre.docx',
        targetType: 'document',
        timestamp: '18/09/2026 11:30',
        timeAgo: 'Il y a 3 h'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[0]
  },
  {
    id: 'etat-civil',
    shortName: 'etat-civil',
    title: 'État Civil & Population',
    description: 'Actes authentiques, naissances, mariages, décès, reconnaissances et registres annuels de la collectivité.',
    visibility: 'MODERATED',
    visibilityLabel: 'Modéré',
    currentUserRole: 'SiteManager',
    currentUserRoleLabel: 'Gestionnaire de site',
    isFavorite: true,
    isJoined: true,
    memberCount: 16,
    badgeColor: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
    accentColor: '#0284c7',
    bannerImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80',
    icon: 'Scroll',
    createdAt: '01/01/2026',
    lastActivity: 'Il y a 12 min',
    members: INITIAL_ALFRESCO_MEMBERS,
    activities: [
      {
        id: 'act-ec-1',
        userName: 'Marc DUPONT',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[2].avatar,
        userRole: 'Collaborateur',
        action: 'archive',
        actionLabel: 'a versé aux archives physiques',
        targetTitle: 'Acte de naissance — Jean Dupont (Cote 4 E 142 / 2026)',
        targetType: 'dossier',
        timestamp: '18/09/2026 14:40',
        timeAgo: 'Il y a 12 min'
      },
      {
        id: 'act-ec-2',
        userName: 'Amour Samuel NZILA NGALA',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[0].avatar,
        userRole: 'Gestionnaire de site',
        action: 'upload',
        actionLabel: 'a numérisé 3 pièces justificatives',
        targetTitle: 'Dossier_Mariage_Civil_2026_089.pdf',
        targetType: 'document',
        timestamp: '18/09/2026 13:20',
        timeAgo: 'Il y a 1 h'
      },
      {
        id: 'act-ec-3',
        userName: 'Élise BLANCHARD',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[5].avatar,
        userRole: 'Consommateur',
        action: 'member_join',
        actionLabel: 'a rejoint le site',
        targetTitle: 'État Civil & Population',
        targetType: 'membre',
        timestamp: '18/09/2026 09:10',
        timeAgo: 'Ce matin'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[0]
  },
  {
    id: 'urbanisme',
    shortName: 'urbanisme',
    title: 'Urbanisme & Aménagement Foncier',
    description: 'Permis de construire, déclarations préalables, autorisations de travaux, plans de zonage PLU et cadastre.',
    visibility: 'PUBLIC',
    visibilityLabel: 'Public',
    currentUserRole: 'SiteCollaborator',
    currentUserRoleLabel: 'Collaborateur',
    isFavorite: true,
    isJoined: true,
    memberCount: 22,
    badgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    accentColor: '#10b981',
    bannerImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop&q=80',
    icon: 'Building',
    createdAt: '02/01/2026',
    lastActivity: 'Il y a 1 h',
    members: [INITIAL_ALFRESCO_MEMBERS[0], INITIAL_ALFRESCO_MEMBERS[1], INITIAL_ALFRESCO_MEMBERS[3], INITIAL_ALFRESCO_MEMBERS[4]],
    activities: [
      {
        id: 'act-urb-1',
        userName: 'Sophie LEFEBVRE',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[3].avatar,
        userRole: 'Collaborateur',
        action: 'upload',
        actionLabel: 'a déposé le plan de masse',
        targetTitle: 'Plan_Masse_Architecte_PC_2026_0045.dwg',
        targetType: 'document',
        timestamp: '18/09/2026 13:45',
        timeAgo: 'Il y a 1 h'
      },
      {
        id: 'act-urb-2',
        userName: 'Amour Samuel NZILA NGALA',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[0].avatar,
        userRole: 'Gestionnaire de site',
        action: 'edit',
        actionLabel: 'a mis à jour les métadonnées',
        targetTitle: 'Permis de construire PC-2026-0045 — Résidence Les Oliviers',
        targetType: 'dossier',
        timestamp: '18/09/2026 10:20',
        timeAgo: 'Il y a 4 h'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[1]
  },
  {
    id: 'finances',
    shortName: 'finances',
    title: 'Finances, Budget & Marchés Publics',
    description: 'Mandats administratifs, titres de recettes, bordereaux de mandatement, comptes de gestion et marchés formalisés.',
    visibility: 'PRIVATE',
    visibilityLabel: 'Privé',
    currentUserRole: 'SiteContributor',
    currentUserRoleLabel: 'Contributeur',
    isFavorite: false,
    isJoined: true,
    memberCount: 11,
    badgeColor: 'text-violet-400 bg-violet-500/20 border-violet-500/30',
    accentColor: '#8b5cf6',
    bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    icon: 'Landmark',
    createdAt: '03/01/2026',
    lastActivity: 'Il y a 2 h',
    members: [INITIAL_ALFRESCO_MEMBERS[0], INITIAL_ALFRESCO_MEMBERS[4], INITIAL_ALFRESCO_MEMBERS[1]],
    activities: [
      {
        id: 'act-fin-1',
        userName: 'Thomas MOREAU',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[4].avatar,
        userRole: 'Contributeur',
        action: 'upload',
        actionLabel: 'a téléversé le bordereau certifié',
        targetTitle: 'Bordereau_Mandatement_BM_2026_0112.pdf',
        targetType: 'document',
        timestamp: '18/09/2026 12:40',
        timeAgo: 'Il y a 2 h'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[2]
  },
  {
    id: 'rh',
    shortName: 'rh',
    title: 'Ressources Humaines & Carrières',
    description: 'Dossiers individuels des agents territoriaux, arrêtés de nomination, paie, avancements d\'échelon et médailles.',
    visibility: 'PRIVATE',
    visibilityLabel: 'Privé',
    currentUserRole: 'SiteManager',
    currentUserRoleLabel: 'Gestionnaire de site',
    isFavorite: false,
    isJoined: true,
    memberCount: 7,
    badgeColor: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
    accentColor: '#f43f5e',
    bannerImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    icon: 'Users',
    createdAt: '04/01/2026',
    lastActivity: 'Il y a 5 h',
    members: [INITIAL_ALFRESCO_MEMBERS[0], INITIAL_ALFRESCO_MEMBERS[1], INITIAL_ALFRESCO_MEMBERS[5]],
    activities: [
      {
        id: 'act-rh-1',
        userName: 'Claire BERNARD',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[1].avatar,
        userRole: 'Gestionnaire de site',
        action: 'validate',
        actionLabel: 'a validé l\'avancement d\'échelon',
        targetTitle: 'Arrete_Nomination_Echelon_Agent_3421.pdf',
        targetType: 'document',
        timestamp: '18/09/2026 09:50',
        timeAgo: 'Il y a 5 h'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[3]
  },
  {
    id: 'affaires-juridiques',
    shortName: 'juridique',
    title: 'Affaires Juridiques & Contentieux',
    description: 'Contentieux administratifs, baux commerciaux, polices d\'assurance, protocoles transactionnels et veille juridique.',
    visibility: 'MODERATED',
    visibilityLabel: 'Modéré',
    currentUserRole: 'SiteCollaborator',
    currentUserRoleLabel: 'Collaborateur',
    isFavorite: true,
    isJoined: true,
    memberCount: 9,
    badgeColor: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
    accentColor: '#6366f1',
    bannerImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    icon: 'ShieldCheck',
    createdAt: '05/01/2026',
    lastActivity: 'Hier',
    members: [INITIAL_ALFRESCO_MEMBERS[0], INITIAL_ALFRESCO_MEMBERS[1], INITIAL_ALFRESCO_MEMBERS[2]],
    activities: [
      {
        id: 'act-jur-1',
        userName: 'Claire BERNARD',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[1].avatar,
        userRole: 'Gestionnaire de site',
        action: 'upload',
        actionLabel: 'a déposé le mémoire en défense',
        targetTitle: 'Memoire_Defense_Tribunal_Admin_2026.pdf',
        targetType: 'document',
        timestamp: '17/09/2026 16:30',
        timeAgo: 'Hier à 16:30'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[4]
  },
  {
    id: 'services-techniques',
    shortName: 'services-tech',
    title: 'Services Techniques & Patrimoine',
    description: 'Voirie communale, autorisations d\'occupation du domaine public, maintenance des bâtiments et diagnostics amiante.',
    visibility: 'PUBLIC',
    visibilityLabel: 'Public',
    currentUserRole: 'SiteConsumer',
    currentUserRoleLabel: 'Consommateur',
    isFavorite: false,
    isJoined: true,
    memberCount: 14,
    badgeColor: 'text-teal-400 bg-teal-500/20 border-teal-500/30',
    accentColor: '#14b8a6',
    bannerImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=80',
    icon: 'Wrench',
    createdAt: '06/01/2026',
    lastActivity: 'Hier',
    members: [INITIAL_ALFRESCO_MEMBERS[0], INITIAL_ALFRESCO_MEMBERS[3]],
    activities: [
      {
        id: 'act-tech-1',
        userName: 'Sophie LEFEBVRE',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[3].avatar,
        userRole: 'Collaborateur',
        action: 'validate',
        actionLabel: 'a signé la permission de voirie',
        targetTitle: 'Arrete_Voirie_Rue_Republique_2026_09.pdf',
        targetType: 'document',
        timestamp: '17/09/2026 14:10',
        timeAgo: 'Hier à 14:10'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[5]
  },
  {
    id: 'archives-municipales',
    shortName: 'archives-mun',
    title: 'Archives Municipales & Mémoire',
    description: 'Espace transversal de conservation : fonds historiques, éliminations réglementaires et valorisation du patrimoine.',
    visibility: 'PUBLIC',
    visibilityLabel: 'Public',
    currentUserRole: 'SiteManager',
    currentUserRoleLabel: 'Gestionnaire de site',
    isFavorite: true,
    isJoined: true,
    memberCount: 18,
    badgeColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    accentColor: '#a855f7',
    bannerImage: 'https://images.unsplash.com/photo-1507842229452-7729f170f1a4?w=1200&auto=format&fit=crop&q=80',
    icon: 'Archive',
    createdAt: '01/01/2026',
    lastActivity: 'Il y a 40 min',
    members: INITIAL_ALFRESCO_MEMBERS,
    activities: [
      {
        id: 'act-arch-1',
        userName: 'Amour Samuel NZILA NGALA',
        userAvatar: INITIAL_ALFRESCO_MEMBERS[0].avatar,
        userRole: 'Gestionnaire de site',
        action: 'archive',
        actionLabel: 'a homologué le versement de 18 cotes',
        targetTitle: 'Versement_Annuel_2026_Magasin_S02.pdf',
        targetType: 'workflow',
        timestamp: '18/09/2026 14:10',
        timeAgo: 'Il y a 40 min'
      }
    ],
    serviceData: INSTITUTIONAL_SERVICES[0]
  }
];
