export interface IntranetApp {
  id: string;
  name: string;
  description: string;
  icon: 'FolderOpen' | 'Calendar' | 'ShieldCheck' | 'Newspaper';
  category: 'collaboration' | 'ged' | 'securite';
  status: string;
  url: string;
  badgeColor?: string;
}

export const INTRANET_APPS_MOCK: IntranetApp[] = [
  {
    id: 'ged',
    name: 'GED Documents',
    description: 'Gestion électronique et archivage des dossiers EGEN',
    icon: 'FolderOpen',
    category: 'ged',
    status: 'Actif',
    url: '/ged'
  },
  {
    id: 'calendrier',
    name: 'Calendrier & Planning',
    description: 'Planning des événements d\'équipe, réservations et échéances',
    icon: 'Calendar',
    category: 'collaboration',
    status: 'En ligne',
    url: '/calendrier'
  },
  {
    id: 'iam',
    name: 'IAM & Droits d\'Accès',
    description: 'Gestion des identités, rôles, permissions et sécurité globale',
    icon: 'ShieldCheck',
    category: 'securite',
    status: 'Sécurisé',
    url: '/iam'
  },
  {
    id: 'actualites',
    name: 'Publication & News',
    description: 'Journal interne d\'entreprise, communiqués et publications',
    icon: 'Newspaper',
    category: 'collaboration',
    status: 'En direct',
    url: '/actualites'
  }
];
