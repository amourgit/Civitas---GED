import { FolderItem } from '../types/document';

export const initialFolders: FolderItem[] = [
  {
    id: 'f0',
    name: 'Mes fichiers',
    type: 'folder',
    itemCount: 16,
    updatedAt: "Aujourd'hui, 15:40",
    category: 'documents',
    folderTheme: 'emerald',
    iconType: 'folder-glow',
    size: '2.4 Go',
    description: 'Espace de stockage principal et documents professionnels récents.',
    permissions: { canEdit: true, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'mf1', name: 'Rapport_Financier_2026.pdf', type: 'pdf', size: '4.8 Mo', updatedAt: "Aujourd'hui, 14:10" },
      { id: 'mf2', name: 'Synthese_Strategique_Q4.docx', type: 'doc', size: '2.1 Mo', updatedAt: "Aujourd'hui, 11:30" },
      { id: 'mf3', name: 'Budget_Previsionnel_2026.sheet', type: 'sheet', size: '1.4 Mo', updatedAt: 'Hier, 17:45' },
      { id: 'mf4', name: 'Architecture_Systeme_GoFAST.pdf', type: 'pdf', size: '18.2 Mo', updatedAt: '05 Sept. 2025' },
      { id: 'mf5', name: 'Capture_Studio_Light.jpg', type: 'image', size: '8.4 Mo', updatedAt: '04 Sept. 2025', url: "https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg" },
      { id: 'mf6', name: 'Kit_Deploiement_Production.zip', type: 'zip', size: '45.0 Mo', updatedAt: '02 Sept. 2025' },
      { id: 'mf7', name: 'Video_Presentation_Projet.mp4', type: 'video', size: '120 Mo', updatedAt: '29 Août 2025' }
    ]
  },
  {
    id: 'f1',
    name: 'Photography.gallery',
    type: 'folder',
    itemCount: 24,
    updatedAt: "Aujourd'hui, 14:32",
    category: 'images',
    folderTheme: 'gallery',
    iconType: 'photo',
    isSpecialGallery: true,
    coverImage: 'https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg',
    size: '1.4 Go',
    description: 'Collection de clichés haute résolution, packshots produit et shootings studio 2025.',
    permissions: { canEdit: true, canShare: true, canDelete: true, canDownload: true },
    photos: [
      { id: 1, image: "https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg", title: "Studio Light Reflection", dimensions: "3840x2160", size: "8.2 Mo" },
      { id: 2, image: "https://cdn.21st.dev/assets/mirror/e7/e7138a367854517395ba458c0c7c6481cf28afdc227b7d0045973e03e5b1d1c0.jpg", title: "Editorial Architecture", dimensions: "4000x2667", size: "6.4 Mo" },
      { id: 3, image: "https://cdn.21st.dev/assets/mirror/96/9626c87f656eaa15e08486db4e7ecc217c0243440a21d301a3af6c8092b22a9b.jpg", title: "Neon Cyber Contrast", dimensions: "3200x2133", size: "5.1 Mo" },
      { id: 4, image: "https://cdn.21st.dev/assets/mirror/da/dacbcb481226af6c6e6bf6426da535ce260db87270fb641953617ffe4a1145bf.jpg", title: "Urban Sunset Shadow", dimensions: "3840x2400", size: "7.9 Mo" },
      { id: 5, image: "https://cdn.21st.dev/assets/mirror/6e/6e5ed03abf45ab11ad4c94b60bb3cb60326807a1777b2a6e8888d3179f237cd9.jpg", title: "Chromatic Wave Concept", dimensions: "4500x3000", size: "9.3 Mo" },
    ],
    filesInside: [
      { id: 'p1', name: 'Studio Light Reflection.raw', type: 'image', size: '28.2 Mo', updatedAt: "Aujourd'hui, 14:30", url: "https://cdn.21st.dev/assets/mirror/6c/6cb3aeada3fd347bf4641131fdb05a482044f0233b1b6da0ffb5e83593001e3f.jpg" },
      { id: 'p2', name: 'Editorial Architecture.tiff', type: 'image', size: '42.0 Mo', updatedAt: "Aujourd'hui, 13:15", url: "https://cdn.21st.dev/assets/mirror/e7/e7138a367854517395ba458c0c7c6481cf28afdc227b7d0045973e03e5b1d1c0.jpg" },
      { id: 'p3', name: 'Neon Cyber Contrast.png', type: 'image', size: '15.4 Mo', updatedAt: "Hier, 19:40", url: "https://cdn.21st.dev/assets/mirror/96/9626c87f656eaa15e08486db4e7ecc217c0243440a21d301a3af6c8092b22a9b.jpg" },
      { id: 'p4', name: 'Urban Sunset Shadow.jpg', type: 'image', size: '8.2 Mo', updatedAt: "Hier, 18:22", url: "https://cdn.21st.dev/assets/mirror/da/dacbcb481226af6c6e6bf6426da535ce260db87270fb641953617ffe4a1145bf.jpg" },
      { id: 'p5', name: 'Charte Photographique 2025.pdf', type: 'pdf', size: '4.8 Mo', updatedAt: '03 Sept. 2025' }
    ]
  },
  {
    id: 'f2',
    name: 'Projets',
    type: 'folder',
    itemCount: 12,
    updatedAt: 'Hier, 10:24',
    category: 'documents',
    folderTheme: 'purple',
    iconType: 'folder-glow',
    size: '840 Mo',
    description: 'Feuilles de route Q3-Q4, spécifications techniques et livrables stratégiques.',
    permissions: { canEdit: true, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'prj1', name: 'Projet CIVITAS - Architecture.pdf', type: 'pdf', size: '18.4 Mo', updatedAt: 'Hier, 10:24' },
      { id: 'prj2', name: 'Sprint Roadmap 2025.sheet', type: 'sheet', size: '2.1 Mo', updatedAt: 'Hier, 09:12' },
      { id: 'prj3', name: 'Charte Graphique GoFAST v3.pdf', type: 'pdf', size: '34.0 Mo', updatedAt: '04 Sept. 2025' }
    ]
  },
  {
    id: 'f3',
    name: 'Travail',
    type: 'folder',
    itemCount: 8,
    updatedAt: 'Hier, 09:15',
    category: 'documents',
    folderTheme: 'blue',
    iconType: 'document',
    size: '310 Mo',
    description: 'Dossiers opérationnels quotidiens, mémos de synthèse et comptes-rendus.',
    permissions: { canEdit: true, canShare: true, canDelete: true, canDownload: true },
    filesInside: [
      { id: 'trv1', name: 'Compte Rendu Direction.docx', type: 'doc', size: '1.2 Mo', updatedAt: 'Hier, 09:15' },
      { id: 'trv2', name: 'Planning Hebdomadaire.sheet', type: 'sheet', size: '850 Ko', updatedAt: '04 Sept. 2025' }
    ]
  },
  {
    id: 'f4',
    name: 'Équipe',
    type: 'folder',
    itemCount: 15,
    updatedAt: 'Ven. 5 Sept. 2025',
    category: 'documents',
    folderTheme: 'emerald',
    iconType: 'team',
    size: '520 Mo',
    description: 'Organigrammes, fiches de poste, plannings d’intégration et contacts clés.',
    permissions: { canEdit: true, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'eq1', name: 'Organigramme Groupe 2025.pdf', type: 'pdf', size: '3.4 Mo', updatedAt: 'Ven. 5 Sept. 2025' },
      { id: 'eq2', name: 'Trombinoscope Collaborateurs.pdf', type: 'pdf', size: '12.8 Mo', updatedAt: '01 Sept. 2025' }
    ]
  },
  {
    id: 'f5',
    name: 'Formation',
    type: 'folder',
    itemCount: 32,
    updatedAt: 'Jeu. 4 Sept. 2025',
    category: 'documents',
    folderTheme: 'amber',
    iconType: 'education',
    size: '2.8 Go',
    description: 'Modules e-learning, certifications GED, guides de conformité et tutoriels vidéo.',
    permissions: { canEdit: true, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'for1', name: 'Certification GoFAST Niveau 2.pdf', type: 'pdf', size: '15.2 Mo', updatedAt: 'Jeu. 4 Sept. 2025' },
      { id: 'for2', name: 'Module Sécurité Documentaire.mp4', type: 'video', size: '420 Mo', updatedAt: '28 Août 2025' }
    ]
  },
  {
    id: 'f6',
    name: 'Finance',
    type: 'folder',
    itemCount: 18,
    updatedAt: 'Mer. 3 Sept. 2025',
    category: 'documents',
    folderTheme: 'gold',
    iconType: 'finance',
    size: '640 Mo',
    description: 'Budgets prévisionnels, audits comptables, états financiers et facturations.',
    permissions: { canEdit: false, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'fin1', name: 'Rapport Financier Annuel Q2.xlsx', type: 'sheet', size: '8.4 Mo', updatedAt: 'Mer. 3 Sept. 2025' },
      { id: 'fin2', name: 'Clôture Fiscale 2024.pdf', type: 'pdf', size: '24.1 Mo', updatedAt: '15 Juil. 2025' }
    ]
  },
  {
    id: 'f7',
    name: 'Ressources',
    type: 'folder',
    itemCount: 27,
    updatedAt: 'Mar. 2 Sept. 2025',
    category: 'documents',
    folderTheme: 'cyan',
    iconType: 'resources',
    size: '1.1 Go',
    description: 'Modèles de documents certifiés, templates de contrats et polices typographiques.',
    permissions: { canEdit: true, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'res1', name: 'Modèle Contrat Partenariat.docx', type: 'doc', size: '890 Ko', updatedAt: 'Mar. 2 Sept. 2025' },
      { id: 'res2', name: 'Kit Médias & Logotypes.zip', type: 'zip', size: '140 Mo', updatedAt: '20 Août 2025' }
    ]
  },
  {
    id: 'f8',
    name: 'Marketing',
    type: 'folder',
    itemCount: 11,
    updatedAt: 'Lun. 1 Sept. 2025',
    category: 'documents',
    folderTheme: 'magenta',
    iconType: 'marketing',
    size: '1.9 Go',
    description: 'Campagnes digitales, assets réseaux sociaux, pitch decks et communiqués de presse.',
    permissions: { canEdit: true, canShare: true, canDelete: true, canDownload: true },
    filesInside: [
      { id: 'mkt1', name: 'Pitch Deck Q4 Investisseurs.pdf', type: 'pdf', size: '28.5 Mo', updatedAt: 'Lun. 1 Sept. 2025' },
      { id: 'mkt2', name: 'Teaser Lancement GoFAST v4.mp4', type: 'video', size: '380 Mo', updatedAt: '25 Août 2025' }
    ]
  },
  {
    id: 'f9',
    name: 'Administratif',
    type: 'folder',
    itemCount: 20,
    updatedAt: 'Sam. 30 Août 2025',
    category: 'documents',
    folderTheme: 'steel',
    iconType: 'administrative',
    size: '480 Mo',
    description: 'Règlements intérieurs, baux commerciaux, polices d’assurance et PV d’assemblée.',
    permissions: { canEdit: false, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'adm1', name: 'Bail Commercial Siege Social.pdf', type: 'pdf', size: '6.2 Mo', updatedAt: 'Sam. 30 Août 2025' },
      { id: 'adm2', name: 'Attestation Assurance Civile.pdf', type: 'pdf', size: '1.4 Mo', updatedAt: '12 Août 2025' }
    ]
  },
  {
    id: 'f10',
    name: 'Personnel',
    type: 'folder',
    itemCount: 14,
    updatedAt: 'Ven. 29 Août 2025',
    category: 'documents',
    folderTheme: 'violet',
    iconType: 'personal',
    size: '220 Mo',
    description: 'Documents privés, attestations individuelles, bulletins de paie chiffrés.',
    permissions: { canEdit: true, canShare: false, canDelete: true, canDownload: true },
    filesInside: [
      { id: 'pers1', name: 'Dossier Personnel Sécurisé.pdf', type: 'pdf', size: '3.1 Mo', updatedAt: 'Ven. 29 Août 2025' }
    ]
  },
  {
    id: 'f11',
    name: 'Partenaires',
    type: 'folder',
    itemCount: 9,
    updatedAt: 'Jeu. 28 Août 2025',
    category: 'documents',
    folderTheme: 'azure',
    iconType: 'partners',
    size: '590 Mo',
    description: 'Accords NDA, contrats fournisseurs, conventions inter-entreprises et accords cadres.',
    permissions: { canEdit: true, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'part1', name: 'Accord Cadre Partenaire Tech.pdf', type: 'pdf', size: '4.7 Mo', updatedAt: 'Jeu. 28 Août 2025' },
      { id: 'part2', name: 'Convention Fournisseur Cloud.pdf', type: 'pdf', size: '2.8 Mo', updatedAt: '10 Août 2025' }
    ]
  },
  {
    id: 'f12',
    name: 'Archives',
    type: 'folder',
    itemCount: 43,
    updatedAt: 'Lun. 25 Août 2025',
    category: 'archives',
    folderTheme: 'dark-box',
    iconType: 'archive',
    size: '14.2 Go',
    description: 'Fonds d’archives sécurisées à valeur probante, clôtures 2018-2024.',
    permissions: { canEdit: false, canShare: true, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'arc1', name: 'Grand Livre Comptable 2023.zip', type: 'zip', size: '1.2 Go', updatedAt: 'Lun. 25 Août 2025' },
      { id: 'arc2', name: 'Archives Numériques 2022.tar.gz', type: 'zip', size: '3.5 Go', updatedAt: '14 Janv. 2024' }
    ]
  },
  {
    id: 'f13',
    name: 'Événements',
    type: 'folder',
    itemCount: 6,
    updatedAt: 'Sam. 23 Août 2025',
    category: 'documents',
    folderTheme: 'orange',
    iconType: 'events',
    size: '950 Mo',
    description: 'Séminaires annuels, salons professionnels, plannings logistiques et badges.',
    permissions: { canEdit: true, canShare: true, canDelete: true, canDownload: true },
    filesInside: [
      { id: 'ev1', name: 'Programme Séminaire 2025.pdf', type: 'pdf', size: '4.1 Mo', updatedAt: 'Sam. 23 Août 2025' },
      { id: 'ev2', name: 'Captation Keynote Ouverture.mp4', type: 'video', size: '680 Mo', updatedAt: '19 Août 2025' }
    ]
  },
  {
    id: 'f14',
    name: 'Système',
    type: 'folder',
    itemCount: 5,
    updatedAt: 'Ven. 22 Août 2025',
    category: 'documents',
    folderTheme: 'teal',
    iconType: 'system',
    size: '180 Mo',
    description: 'Paramétrage des droits d’accès, journaux d’audit GED et politiques de rétention.',
    permissions: { canEdit: true, canShare: false, canDelete: false, canDownload: true },
    filesInside: [
      { id: 'sys1', name: 'Journal Audit Sécurité.log', type: 'doc', size: '12.4 Mo', updatedAt: 'Ven. 22 Août 2025' },
      { id: 'sys2', name: 'Configuration Passerelle LDAP.json', type: 'doc', size: '45 Ko', updatedAt: '02 Août 2025' }
    ]
  },
  {
    id: 'f15',
    name: 'Divers',
    type: 'folder',
    itemCount: 19,
    updatedAt: 'Mar. 19 Août 2025',
    category: 'documents',
    folderTheme: 'deep-purple',
    iconType: 'misc',
    size: '760 Mo',
    description: 'Documents temporaires, brouillons de travail et notes diverses.',
    permissions: { canEdit: true, canShare: true, canDelete: true, canDownload: true },
    filesInside: [
      { id: 'div1', name: 'Notes Réunion de Cadrage.docx', type: 'doc', size: '420 Ko', updatedAt: 'Mar. 19 Août 2025' },
      { id: 'div2', name: 'Capture Ecran Maquette v2.png', type: 'image', size: '3.2 Mo', updatedAt: '12 Août 2025' }
    ]
  }
];

export const searchSuggestions = [
  { id: 's1', title: 'Contrat partenariat.pdf', type: 'pdf', category: 'Documents', folder: 'Ressources' },
  { id: 's2', title: 'Projet CIVITAS - Architecture.pdf', type: 'pdf', category: 'Projets', folder: 'Projets' },
  { id: 's3', title: 'Jean Dupont (Consultant GED)', type: 'user', category: 'Collaborateurs', folder: 'Équipe' },
  { id: 's4', title: 'Rapport financier Annuel Q2.xlsx', type: 'sheet', category: 'Finance', folder: 'Finance' },
  { id: 's5', title: 'Photography.gallery', type: 'gallery', category: 'Dossiers', folder: 'Images' },
  { id: 's6', title: 'Studio Light Reflection.raw', type: 'image', category: 'Photos', folder: 'Photography.gallery' },
];
