import { 
  Globe, Radio, Users, User, ShieldCheck, Lock, FileText, Settings, Zap, 
  Search, FolderOpen, CirclePlus, Star, Bookmark, Compass, SlidersHorizontal, 
  Sparkles, Layers, Briefcase, CalendarCheck, HelpCircle, FileCheck, HardDrive, 
  ShieldAlert, BookOpen, Megaphone, Bell, Calendar, Newspaper
} from 'lucide-react';
import { Workspace } from '../types/workspace';
import { INTRANET_APPS_MOCK } from './intranetAppsMock';

export const WORKSPACES_MOCK_DATA: Workspace[] = [
  {
    id: 'intranet',
    name: 'Intranet Général',
    subtitle: 'Espace d\'équipe et communauté d\'entreprise',
    badge: 'Portail Intranet',
    iconName: 'Users',
    apps: INTRANET_APPS_MOCK, // 4 apps: GED, Calendrier, IAM, Publication & News
    navItems: [
      {
        id: 10,
        label: "News & Actualités",
        link: "/actualites",
        subMenus: [
          {
            title: "Actualités & Dossiers",
            items: [
              {
                label: "À la Une",
                description: "Les grands titres et reportages récents",
                icon: Star,
                link: "/actualites"
              },
              {
                label: "Articles & Analyses",
                description: "Analyses, tendances et retours d'expérience",
                icon: BookOpen,
                link: "/actualites"
              }
            ]
          },
          {
            title: "Publications",
            items: [
              {
                label: "Toutes les publications",
                description: "Flux complet des parutions internes",
                icon: Newspaper,
                link: "/actualites"
              },
              {
                label: "Revue de presse",
                description: "Écosystème numérique et actualités secteur",
                icon: Globe,
                link: "/actualites"
              }
            ]
          }
        ]
      },
      {
        id: 11,
        label: "Annonces",
        link: "/annonces",
        subMenus: [
          {
            title: "Notes & Circulaires",
            items: [
              {
                label: "Communiqués Officiels",
                description: "Notes de service et communications de la Direction",
                icon: Megaphone,
                link: "/annonces"
              },
              {
                label: "Flash Info Entreprise",
                description: "Alertes et informations prioritaires du personnel",
                icon: Radio,
                link: "/annonces"
              }
            ]
          },
          {
            title: "Affichages & Vie Interne",
            items: [
              {
                label: "Notes administratives",
                description: "Directives, règlements et notes internes",
                icon: FileText,
                link: "/annonces"
              },
              {
                label: "Directives & Procédures",
                description: "Protocoles, changements et consignes d'équipe",
                icon: Sparkles,
                link: "/annonces"
              }
            ]
          }
        ]
      },
      {
        id: 12,
        label: "Agenda",
        link: "/calendrier",
        subMenus: [
          {
            title: "Planning & Rendez-vous",
            items: [
              {
                label: "Calendrier d'équipe",
                description: "Vue d'ensemble et réunions planifiées",
                icon: CalendarCheck,
                link: "/calendrier"
              },
              {
                label: "Événements à venir",
                description: "Séminaires, formations et ateliers",
                icon: Calendar,
                link: "/calendrier"
              }
            ]
          },
          {
            title: "Ressources & Disponibilités",
            items: [
              {
                label: "Réservation de salles",
                description: "Salles de réunion et équipements partagés",
                icon: Compass,
                link: "/calendrier"
              },
              {
                label: "Jalons & Échéances",
                description: "Calendrier des livrables et comités",
                icon: Zap,
                link: "/calendrier"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "Administration",
        subMenus: [
          {
            title: "Accès & Identités",
            items: [
              {
                label: "Utilisateurs & Rôles",
                description: "Gestion des utilisateurs et rôles",
                icon: ShieldCheck,
                link: "/iam"
              },
              {
                label: "Droits & Sécurité",
                description: "Droits d'accès et sécurité globale",
                icon: Lock,
                link: "/iam"
              }
            ]
          },
          {
            title: "Système & Traçabilité",
            items: [
              {
                label: "Journaux d'audit",
                description: "Journaux d'audit et flux d'archivage",
                icon: FileText,
                link: "/ged/administration"
              },
              {
                label: "Configuration Système",
                description: "Configuration globale du système",
                icon: Settings,
                link: "/ged/administration"
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "Raccourcis",
        subMenus: [
          {
            title: "Bordereaux & Recherche",
            items: [
              {
                label: "Bordereaux en cours",
                description: "Suivi des bordereaux en cours de traitement",
                icon: Zap,
                link: "/suivi"
              },
              {
                label: "Recherche Express",
                description: "Recherche d'archives instantanée",
                icon: Search,
                link: "/ged/recherche"
              }
            ]
          },
          {
            title: "Fichiers & Numérisation",
            items: [
              {
                label: "Documents récents",
                description: "Derniers documents consultés",
                icon: FolderOpen,
                link: "/ged"
              },
              {
                label: "Scanner & Import",
                description: "Numérisation et import express",
                icon: CirclePlus,
                link: "/ged/scanner"
              }
            ]
          }
        ]
      },
      {
        id: 4,
        label: "Favoris",
        subMenus: [
          {
            title: "Mes Éléments",
            items: [
              {
                label: "Dossiers épinglés",
                description: "Dossiers et séries épinglés prioritaires",
                icon: Star
              },
              {
                label: "Bordereaux suivis",
                description: "Suivi des bordereaux en favoris",
                icon: Bookmark
              }
            ]
          },
          {
            title: "Ressources Clés",
            items: [
              {
                label: "Modèles types",
                description: "Modèles types et fiches d'archivage",
                icon: FileText
              },
              {
                label: "Espaces favoris",
                description: "Accès direct à vos hubs favoris",
                icon: Compass
              }
            ]
          }
        ]
      },
      {
        id: 5,
        label: "Paramètres",
        subMenus: [
          {
            title: "Interface & Alertes",
            items: [
              {
                label: "Affichage & Thème",
                description: "Préférences d'affichage et thèmes",
                icon: SlidersHorizontal
              },
              {
                label: "Alertes & Notifications",
                description: "Notifications et alertes de suivi",
                icon: Sparkles
              }
            ]
          },
          {
            title: "Organisation",
            items: [
              {
                label: "Langue & Formats",
                description: "Langue et formats régionaux",
                icon: Globe
              },
              {
                label: "Workflows de validation",
                description: "Workflows et circuits de validation",
                icon: Layers
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'extranet',
    name: 'Extranet Partenaires',
    subtitle: 'Espace de collaboration externe et filiales',
    badge: 'Partenaires Externe',
    iconName: 'Globe',
    apps: [], // Aucune application pour le moment
    navItems: [
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
                icon: FileCheck
              },
              {
                label: "Planning Inter-entreprises",
                description: "Calendrier des jalons et réunions de suivi",
                icon: CalendarCheck
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
            title: "Echanges de Fichiers",
            items: [
              {
                label: "Déposer un document",
                description: "Téléverser des bordereaux et contrats certifiés",
                icon: CirclePlus
              },
              {
                label: "Historique des transferts",
                description: "Journal des réceptions et envois externes",
                icon: HardDrive
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
                label: "Ouvrir un ticket",
                description: "Support technique pour les comptes partenaires",
                icon: HelpCircle
              },
              {
                label: "Guide de Sécurité",
                description: "Consignes de confidentialité et conformité RGPD",
                icon: ShieldAlert
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'public',
    name: 'Espace Public',
    subtitle: 'Diffusion d\'informations publiques et communiqués',
    badge: 'Accès Libre',
    iconName: 'Radio',
    apps: [],
    navItems: [
      {
        id: 2,
        label: "Actualités & Pressec",
        subMenus: [
          {
            title: "Publications",
            items: [
              {
                label: "Communiqués Officiels",
                description: "Annonces publiques et déclarations de presse",
                icon: FileText
              },
              {
                label: "Événements à venir",
                description: "Agenda des réunions et conférences publiques",
                icon: CalendarCheck
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
                icon: BookOpen
              },
              {
                label: "Rapports Annuels",
                description: "Bilan d'activité et publications réglementaires",
                icon: FileCheck
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'personnel',
    name: 'Espace Personnel',
    subtitle: 'Coffre-fort numérique individuel et préférences',
    badge: 'Espace Privé',
    iconName: 'User',
    apps: [],
    navItems: [
      {
        id: 2,
        label: "Coffre-fort Privé",
        subMenus: [
          {
            title: "Stockage Sécurisé",
            items: [
              {
                label: "Mes Documents Personnels",
                description: "Fichiers confidentiels et diplômes",
                icon: Lock
              },
              {
                label: "Mes Notes & Pense-bêtes",
                description: "Espace de rédaction individuel",
                icon: FileText
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "Compte & Sécurité",
        subMenus: [
          {
            title: "Paramètres du Compte",
            items: [
              {
                label: "Authentification 2FA",
                description: "Gérer mes clés de sécurité et mots de passe",
                icon: ShieldCheck
              },
              {
                label: "Préférences Générales",
                description: "Langues, notifications et préférences de thème",
                icon: Settings
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'rh',
    name: 'Espace Ressources Humaines',
    subtitle: 'Gestion du personnel, congés et développement',
    badge: 'Services RH',
    iconName: 'Briefcase',
    apps: [],
    navItems: [
      {
        id: 2,
        label: "Mon Dossier RH",
        subMenus: [
          {
            title: "Documents du Personnel",
            items: [
              {
                label: "Bulletins de Paie",
                description: "Consulter et télécharger mes fiches de paie",
                icon: FileText
              },
              {
                label: "Contrat & Avenants",
                description: "Suivi administratif du contrat de travail",
                icon: FileCheck
              }
            ]
          }
        ]
      },
      {
        id: 3,
        label: "Congés & Absences",
        subMenus: [
          {
            title: "Planning RH",
            items: [
              {
                label: "Demander un congé",
                description: "Poser un congé payé, RTT ou autorisation",
                icon: CalendarCheck
              },
              {
                label: "Solde de congés",
                description: "Consulter mon compteur de RTT et CP",
                icon: Zap
              }
            ]
          }
        ]
      }
    ]
  }
];
