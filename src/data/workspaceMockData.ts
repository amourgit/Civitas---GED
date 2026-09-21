import { 
  Globe, Radio, Users, User, ShieldCheck, Lock, FileText, Settings, Zap, 
  Search, FolderOpen, CirclePlus, Star, Bookmark, Compass, SlidersHorizontal, 
  Sparkles, Layers, Briefcase, CalendarCheck, HelpCircle, FileCheck, HardDrive, 
  ShieldAlert, BookOpen, Megaphone, Bell, Calendar, Newspaper, Building2,
  Key, UserCheck, CheckSquare, Grid, Activity, Shield, Info, HelpCircle as HelpIcon,
  Share2, Contact, UserPlus, FileSearch, Library, Archive, CheckCircle2
} from 'lucide-react';
import { Workspace } from '../types/workspace';
import { INTRANET_APPS_MOCK } from './intranetAppsMock';

export const WORKSPACES_MOCK_DATA: Workspace[] = [
  // 1. ESPACE ORGANISATIONNEL / INTRANET (Espace par défaut)
  {
    id: 'intranet',
    name: 'Intranet',
    category: 'organisationnel',
    categoryLabel: 'Espace Organisationnel',
    subtitle: 'Portail interne, communauté et vie d\'organisation',
    badge: 'Organisationnel / Intranet',
    iconName: 'Building2',
    apps: INTRANET_APPS_MOCK, // Applications: GED, Calendrier, IAM, Publication & News
    navItems: [
      {
        id: 1,
        label: "Accueil",
        link: "/",
      },
      {
        id: 2,
        label: "Informations",
        subMenus: [
          {
            title: "News et Publications",
            items: [
              {
                label: "À la Une",
                description: "Les grands titres, reportages et actualités phares",
                icon: Star,
                link: "/actualites"
              },
              {
                label: "Articles & Dossiers",
                description: "Analyses de fond, retours d'expérience et tribunes",
                icon: BookOpen,
                link: "/actualites"
              },
              {
                label: "Toutes les Publications",
                description: "Flux complet des publications internes",
                icon: Newspaper,
                link: "/actualites"
              },
              {
                label: "Revue de Presse",
                description: "Veille médiatique, secteur public et écosystème",
                icon: Globe,
                link: "/actualites"
              }
            ]
          },
          {
            title: "Annonces",
            items: [
              {
                label: "Salle des Annonces",
                description: "Tableau officiel d'affichage et communiqués",
                icon: Megaphone,
                link: "/annonces"
              },
              {
                label: "Communiqués Officiels",
                description: "Notes de la Direction et décrets institutionnels",
                icon: FileCheck,
                link: "/annonces"
              },
              {
                label: "Flash Info Entreprise",
                description: "Alertes prioritaires et alertes météo / sécurité",
                icon: Radio,
                link: "/annonces"
              },
              {
                label: "Directives & Circulaires",
                description: "Instructions de service et règlements internes",
                icon: FileText,
                link: "/annonces"
              }
            ]
          },
          {
            title: "Agenda",
            items: [
              {
                label: "Calendrier d'Équipe",
                description: "Planning partagé et réunions de travail",
                icon: CalendarCheck,
                link: "/calendrier"
              },
              {
                label: "Événements & Séminaires",
                description: "Conférences, salons, webinaires et ateliers",
                icon: Calendar,
                link: "/calendrier"
              },
              {
                label: "Réservation de Salles",
                description: "Salles de conférence, visioconférences et véhicules",
                icon: Compass,
                link: "/calendrier"
              },
              {
                label: "Jalons & Comités",
                description: "Comités de pilotage et échéances réglementaires",
                icon: Zap,
                link: "/calendrier"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "Services",
        subMenus: [
          {
            title: "Membres",
            items: [
              {
                label: "Annuaire des Collaborateurs",
                description: "Recherche de contacts, emails, postes et numéros",
                icon: Users,
                link: "/annonces"
              },
              {
                label: "Organigramme & Équipes",
                description: "Structure hiérarchique, directions et pôles",
                icon: Layers,
                link: "/annonces"
              },
              {
                label: "Nouveaux Arrivants",
                description: "Intégration, trombinoscope et parrainages",
                icon: UserPlus,
                link: "/annonces"
              }
            ]
          },
          {
            title: "Applications",
            items: [
              {
                label: "Catalogue des Applications",
                description: "Accès à toutes les solutions numériques de l'organisation",
                icon: Grid,
                link: "/applications"
              },
              {
                label: "EGEN GED Documents",
                description: "Gestion Électronique des Documents & Archives",
                icon: FolderOpen,
                link: "/ged"
              },
              {
                label: "EGEN IAM Sécurité",
                description: "Gestion des identités, droits et accès",
                icon: ShieldCheck,
                link: "/iam"
              },
              {
                label: "EGEN Calendrier & Événements",
                description: "Planification collaborative et réunions",
                icon: Calendar,
                link: "/calendrier"
              }
            ]
          },
          {
            title: "Ressources",
            items: [
              {
                label: "Base Documentaire & Guides",
                description: "Guides méthodologiques et procédures métiers",
                icon: Library,
                link: "/ged"
              },
              {
                label: "Modèles & Formulaires",
                description: "Modèles de courriers, bordereaux types et fiches",
                icon: FileText,
                link: "/ged"
              },
              {
                label: "Charte Graphique & Logos",
                description: "Kits de communication et éléments de marque",
                icon: Sparkles,
                link: "/actualites"
              }
            ]
          },
          {
            title: "Informations",
            items: [
              {
                label: "Procédures de Service",
                description: "Circuits de validation et démarches administratives",
                icon: Info,
                link: "/annonces"
              },
              {
                label: "FAQ & Assistance Interne",
                description: "Questions fréquentes et tickets de support informatique",
                icon: HelpIcon,
                link: "/annonces"
              },
              {
                label: "Santé, Sécurité & RH",
                description: "Consignes de sécurité au travail et numéros d'urgence",
                icon: ShieldAlert,
                link: "/annonces"
              }
            ]
          }
        ]
      },
      {
        id: 4,
        label: "Recherche",
        link: "/ged/recherche",
        subMenus: [
          {
            title: "Moteurs de Recherche",
            items: [
              {
                label: "Recherche Globale Intranet",
                description: "Index complet actualités, annonces, personnes et documents",
                icon: Search,
                link: "/ged/recherche"
              },
              {
                label: "Recherche GED & Archives",
                description: "Recherche avancée par métadonnées, cotes et séries",
                icon: FileSearch,
                link: "/ged/recherche"
              },
              {
                label: "Recherche de Contacts",
                description: "Trouver un collègue par nom, service ou compétence",
                icon: Contact,
                link: "/ged/recherche"
              }
            ]
          },
          {
            title: "Filtres Rapides",
            items: [
              {
                label: "Documents Récents",
                description: "Derniers fichiers consultés et modifiés",
                icon: FolderOpen,
                link: "/ged"
              },
              {
                label: "Bordereaux en Cours",
                description: "Bordereaux de versement et élimination actifs",
                icon: Zap,
                link: "/suivi"
              },
              {
                label: "Archives Validées",
                description: "Documents officiellement scellés et classés",
                icon: Archive,
                link: "/ged"
              }
            ]
          }
        ]
      },
      {
        id: 5,
        label: "Mon espace",
        subMenus: [
          {
            title: "Droits et Permissions",
            items: [
              {
                label: "Mes Habilitations & Rôles",
                description: "Consulter mes droits d'accès GED et applicatifs",
                icon: Key,
                link: "/iam"
              },
              {
                label: "Certificats & Clés 2FA",
                description: "Gestion des doubles facteurs et signatures électroniques",
                icon: ShieldCheck,
                link: "/iam"
              },
              {
                label: "Journal de mes Accès",
                description: "Historique de mes connexions et actions sécurisées",
                icon: Activity,
                link: "/iam"
              }
            ]
          },
          {
            title: "Mon Espace de Travail",
            items: [
              {
                label: "Dossiers Épinglés",
                description: "Accès immédiat à mes dossiers prioritaires",
                icon: Star,
                link: "/ged"
              },
              {
                label: "Mes Validations en Attente",
                description: "Workflows et bordereaux nécessitant mon approbation",
                icon: CheckSquare,
                link: "/suivi"
              },
              {
                label: "Préférences Personnelles",
                description: "Thème d'affichage, langues et notifications",
                icon: SlidersHorizontal,
                link: "/annonces"
              }
            ]
          }
        ]
      },
      {
        id: 6,
        label: "Administration",
        subMenus: [
          {
            title: "Accès & Identités (IAM)",
            items: [
              {
                label: "Gestion des Utilisateurs",
                description: "Création, modification et désactivation des comptes",
                icon: UserCheck,
                link: "/iam"
              },
              {
                label: "Rôles & Groupes de Sécurité",
                description: "Matrice des permissions et droits granulaires",
                icon: Lock,
                link: "/iam"
              },
              {
                label: "Politiques de Sécurité",
                description: "Règles de mots de passe, sessions et 2FA",
                icon: Shield,
                link: "/iam"
              }
            ]
          },
          {
            title: "Système & Traçabilité",
            items: [
              {
                label: "Journaux d'Audit",
                description: "Traçabilité complète des versements et consultations",
                icon: FileText,
                link: "/ged/administration"
              },
              {
                label: "Configuration Globale",
                description: "Paramètres serveurs, connecteurs et stockage",
                icon: Settings,
                link: "/ged/administration"
              },
              {
                label: "Circuits de Validation",
                description: "Workflows de validation de versements et éliminations",
                icon: Layers,
                link: "/ged/administration"
              }
            ]
          }
        ]
      }
    ]
  },

  // 2. ESPACE ORGANISATIONNEL / EXTRANET
  {
    id: 'extranet',
    name: 'Extranet',
    category: 'organisationnel',
    categoryLabel: 'Espace Organisationnel',
    subtitle: 'Collaboration avec partenaires externes, filiales et prestataires',
    badge: 'Organisationnel / Extranet',
    iconName: 'Globe',
    apps: [],
    navItems: [
      {
        id: 1,
        label: "Accueil",
        link: "/",
      },
      {
        id: 2,
        label: "Projets Partenaires",
        subMenus: [
          {
            title: "Suivi Collaboratif",
            items: [
              {
                label: "Livrables Partagés",
                description: "Consulter les livrables déposés par les partenaires",
                icon: FileCheck,
                link: "/actualites"
              },
              {
                label: "Planning Inter-entreprises",
                description: "Calendrier des jalons et réunions de suivi",
                icon: CalendarCheck,
                link: "/calendrier"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "Dépôts Sécurisés",
        subMenus: [
          {
            title: "Échanges de Fichiers",
            items: [
              {
                label: "Déposer un Document",
                description: "Téléverser des bordereaux et contrats certifiés",
                icon: CirclePlus,
                link: "/ged/scanner"
              },
              {
                label: "Historique des Transferts",
                description: "Journal des réceptions et envois externes",
                icon: HardDrive,
                link: "/ged"
              }
            ]
          }
        ]
      },
      {
        id: 4,
        label: "Support Extranet",
        subMenus: [
          {
            title: "Assistance",
            items: [
              {
                label: "Ouvrir un Ticket",
                description: "Support technique pour les comptes partenaires",
                icon: HelpCircle,
                link: "/annonces"
              },
              {
                label: "Guide de Sécurité & RGPD",
                description: "Consignes de confidentialité et conformité",
                icon: ShieldAlert,
                link: "/annonces"
              }
            ]
          }
        ]
      }
    ]
  },

  // 3. ESPACES PUBLIQUE (ESPACE PUBLIC)
  {
    id: 'public',
    name: 'Espaces Publique',
    category: 'public',
    categoryLabel: 'Espaces Publique',
    subtitle: 'Diffusion d\'informations publiques, décrets et transparence',
    badge: 'Accès Libre',
    iconName: 'Radio',
    apps: [],
    navItems: [
      {
        id: 1,
        label: "Accueil",
        link: "/",
      },
      {
        id: 2,
        label: "Publications & Presse",
        subMenus: [
          {
            title: "Informations Publiques",
            items: [
              {
                label: "Communiqués de Presse",
                description: "Annonces publiques et déclarations officielles",
                icon: FileText,
                link: "/actualites"
              },
              {
                label: "Événements Publics",
                description: "Agenda des réunions et conférences ouvertes",
                icon: CalendarCheck,
                link: "/calendrier"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "Actes & Transparence",
        subMenus: [
          {
            title: "Documents Ouverts",
            items: [
              {
                label: "Registres Publics",
                description: "Consultation libre des délibérations et arrêtés",
                icon: BookOpen,
                link: "/ged"
              },
              {
                label: "Rapports Annuels",
                description: "Bilan d'activité et publications réglementaires",
                icon: FileCheck,
                link: "/ged"
              }
            ]
          }
        ]
      }
    ]
  },

  // 4. ESPACE PERSONNEL
  {
    id: 'personnel',
    name: 'Espace Personnel',
    category: 'personnel',
    categoryLabel: 'Espace Personnel',
    subtitle: 'Coffre-fort numérique individuel, documents privés et réglages',
    badge: 'Espace Privé',
    iconName: 'User',
    apps: [],
    navItems: [
      {
        id: 1,
        label: "Accueil",
        link: "/",
      },
      {
        id: 2,
        label: "Coffre-fort Privé",
        subMenus: [
          {
            title: "Stockage Sécurisé",
            items: [
              {
                label: "Mes Documents Personnels",
                description: "Fichiers confidentiels, attestations et contrats",
                icon: Lock,
                link: "/ged"
              },
              {
                label: "Mes Notes & Pense-bêtes",
                description: "Espace de rédaction individuel et brouillons",
                icon: FileText,
                link: "/annonces"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "Mon Compte & Sécurité",
        subMenus: [
          {
            title: "Paramètres de Profil",
            items: [
              {
                label: "Authentification & 2FA",
                description: "Gérer mes clés de sécurité et mots de passe",
                icon: ShieldCheck,
                link: "/iam"
              },
              {
                label: "Préférences Générales",
                description: "Langues, notifications et préférences de thème",
                icon: Settings,
                link: "/annonces"
              }
            ]
          }
        ]
      }
    ]
  }
];
