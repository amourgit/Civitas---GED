export interface SiteHeaderData {
  title: string;
  subtitle: string;
  avatarUrl?: string;
  isFollowing: boolean;
  memberCount: number;
  draftStatus: string;
}

export interface NavLinkItem {
  id: string;
  label: string;
  route?: string;
  icon?: string;
  hasChildren?: boolean;
  isExpanded?: boolean;
  children?: { id: string; label: string; route?: string }[];
}

export interface HeroMosaicTile {
  id: string;
  title: string;
  category?: string;
  imageUrl: string;
  linkText?: string;
  route: string;
  size: 'large' | 'medium';
  position: 'hero-main' | 'mid-top' | 'mid-bottom' | 'right-top' | 'right-bottom';
}

export interface QuickLinkItem {
  id: string;
  title: string;
  iconName: 'megaphone' | 'graduation-cap' | 'briefcase' | 'files' | 'user' | 'calendar' | 'presentation' | 'receipt' | 'bus';
  route: string;
  color?: string;
}

export interface CalendarEventItem {
  id: string;
  month: string;
  day: string;
  weekday: string;
  title: string;
  time: string;
  location?: string;
  category?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'folder' | 'docx' | 'xlsx' | 'pptx' | 'pdf';
  modifiedDate: string;
  author: string;
  size?: string;
}

export const PORTAL_MOCK_DATA = {
  siteHeader: {
    title: "Espace Organisationnel — Internat",
    subtitle: "Portail collaboratif unifié et gestion des services",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isFollowing: true,
    memberCount: 342,
    draftStatus: "Système opérationnel • v3.2.0",
  },
  
  // Navigation structurée selon la nomenclature exacte demandée
  navigation: [
    { id: 'accueil', label: 'Accueil', route: '/' },
    { 
      id: 'informations', 
      label: 'Informations', 
      hasChildren: true, 
      isExpanded: true,
      children: [
        { id: 'news-pub', label: 'News et Publications', route: '/actualites' },
        { id: 'annonces', label: 'Annonces', route: '/annonces' },
        { id: 'agenda', label: 'Agenda', route: '/calendrier' }
      ]
    },
    { 
      id: 'services', 
      label: 'Services', 
      hasChildren: true, 
      isExpanded: true,
      children: [
        { id: 'membres', label: 'Membres', route: '/annonces' },
        { id: 'applications', label: 'Applications', route: '/applications' },
        { id: 'ressources', label: 'Ressources', route: '/ged' },
        { id: 'info-services', label: 'Informations', route: '/annonces' }
      ]
    },
    { id: 'recherche', label: 'Recherche', route: '/ged/recherche' },
    { 
      id: 'mon-espace', 
      label: 'Mon espace', 
      hasChildren: true, 
      isExpanded: false,
      children: [
        { id: 'droits-permissions', label: 'Droits et Permissions', route: '/iam' }
      ]
    },
    { id: 'administration', label: 'Administration', route: '/iam' }
  ] as NavLinkItem[],

  heroTiles: [
    {
      id: 'hero-main',
      title: 'Modernisation intégrale de la GED et Archivage Électronique',
      category: 'INFORMATIONS • NEWS',
      linkText: 'Consulter le dossier →',
      imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=85',
      route: '/actualites',
      size: 'large',
      position: 'hero-main',
    },
    {
      id: 'mid-top',
      title: 'Communiqué officiel : Déploiement du nouveau protocole 2FA',
      imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=600&auto=format&fit=crop&q=85',
      route: '/annonces',
      size: 'medium',
      position: 'mid-top',
    },
    {
      id: 'mid-bottom',
      title: 'Recherche Globale & Indexation par Métadonnées',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=85',
      route: '/ged/recherche',
      size: 'medium',
      position: 'mid-bottom',
    },
    {
      id: 'right-top',
      title: 'Guide des Services & Catalogue des Applications 2026',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=85',
      route: '/applications',
      size: 'medium',
      position: 'right-top',
    },
    {
      id: 'right-bottom',
      title: 'Gouvernance IAM : Attribution des Droits & Permissions',
      imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=85',
      route: '/iam',
      size: 'medium',
      position: 'right-bottom',
    },
  ] as HeroMosaicTile[],

  quickLinks: [
    { id: 'ql-1', title: 'News & Publications', iconName: 'megaphone', route: '/actualites' },
    { id: 'ql-2', title: 'Salle des Annonces', iconName: 'files', route: '/annonces' },
    { id: 'ql-3', title: 'Agenda & Réunions', iconName: 'calendar', route: '/calendrier' },
    { id: 'ql-4', title: 'Catalogue Applications', iconName: 'presentation', route: '/applications' },
    { id: 'ql-5', title: 'Recherche Globale', iconName: 'briefcase', route: '/ged/recherche' },
    { id: 'ql-6', title: 'Droits & Permissions', iconName: 'user', route: '/iam' },
    { id: 'ql-7', title: 'GED & Ressources', iconName: 'files', route: '/ged' },
    { id: 'ql-8', title: 'Administration Système', iconName: 'graduation-cap', route: '/ged/administration' },
    { id: 'ql-9', title: 'Annuaire Membres', iconName: 'bus', route: '/annonces' },
  ] as QuickLinkItem[],

  calendarEvents: [
    {
      id: 'ev-1',
      month: 'Sep',
      day: '22',
      weekday: 'Lun',
      title: 'Comité de Pilotage DSI & Archivage EGEN',
      time: '09:30 - 11:00',
      location: 'Salle Polyvalente & Visioconférence',
      category: 'Agenda / Réunion'
    },
    {
      id: 'ev-2',
      month: 'Sep',
      day: '24',
      weekday: 'Mer',
      title: 'Atelier de Prise en Main : Droits et Permissions IAM',
      time: '14:00 - 16:30',
      location: 'Centre de Formation Numérique',
      category: 'Services / Formation'
    },
    {
      id: 'ev-3',
      month: 'Sep',
      day: '28',
      weekday: 'Dim',
      title: 'Revue Trimestrielle des Publications et Décrets',
      time: '10:00 - 12:30',
      location: 'Grand Auditorium',
      category: 'Informations / Séminaire'
    }
  ] as CalendarEventItem[],

  documents: [
    {
      id: 'doc-1',
      name: 'Charte_Gouvernance_Informations_2026.pdf',
      type: 'pdf',
      modifiedDate: 'Aujourd\'hui à 11:20',
      author: 'Direction des Systèmes d\'Information',
      size: '2.8 MB'
    },
    {
      id: 'doc-2',
      name: 'Guide_Services_Membres_et_Applications.docx',
      type: 'docx',
      modifiedDate: 'Hier à 16:45',
      author: 'Secrétariat Général',
      size: '1.4 MB'
    },
    {
      id: 'doc-3',
      name: 'Matrice_Droits_et_Permissions_IAM.xlsx',
      type: 'xlsx',
      modifiedDate: '19 Sept. 2026',
      author: 'Pôle Sécurité & IAM',
      size: '890 KB'
    },
    {
      id: 'doc-4',
      name: 'Rapport_Annuel_Administration_Systeme.docx',
      type: 'docx',
      modifiedDate: '15 Sept. 2026',
      author: 'Amour Samuel NZILA NGALA',
      size: '3.2 MB'
    },
    {
      id: 'doc-5',
      name: 'Presentation_Espaces_Publique_et_Organisationnels.pptx',
      type: 'pptx',
      modifiedDate: '12 Sept. 2026',
      author: 'Cellule Communication & Stratégie',
      size: '15.4 MB'
    }
  ] as DocumentItem[],
};
