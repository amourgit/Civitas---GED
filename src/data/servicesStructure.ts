export type DossierLifecycleStatus = 
  | 'Nouveau' 
  | 'En traitement' 
  | 'À compléter' 
  | 'Clôturé' 
  | 'À archiver' 
  | 'Archivé';

export interface ServiceDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: 'Certifié' | 'En attente' | 'Projet' | 'Validé';
  format: 'PDF' | 'DOCX' | 'SCAN' | 'XLSX' | 'DWG';
}

export interface ServiceDossier {
  id: string;
  reference: string;
  title: string;
  activityId: string;
  categoryName?: string;
  status: DossierLifecycleStatus | 'En cours' | 'Versé aux archives';
  dateCreation: string;
  personneConcernee?: string;
  declarant?: string;
  demandeur?: string;
  objet?: string;
  description: string;
  documents: ServiceDocument[];
  archivage: {
    isPhysicallyArchived?: boolean;
    cote?: string;
    salleNumero?: string;
    salleNom?: string;
    salleId?: string;
    salleName?: string;
    rayonNumero?: string;
    rayonNom?: string;
    rayonId?: string;
    rayonName?: string;
    casierNumero?: string;
    casierNom?: string;
    casierId?: string;
    casierName?: string;
    statusConservation?: string;
    dateArchivage?: string;
  };
}

export interface ServiceActivite {
  id: string;
  name: string;
  icon?: string;
  description: string;
  count: number;
}

export interface ServiceRegistre {
  id: string;
  title: string;
  annee: string;
  volume: string;
  etat: 'Ouvert' | 'Clôturé' | 'Relié' | 'Archivé';
  cote: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  badgeColor: string;
  bannerImage: string;
  activites: ServiceActivite[];
  dossiers: ServiceDossier[];
  registres: ServiceRegistre[];
  stats: {
    totalDossiers: number;
    nouveaux: number;
    enCours: number;
    clotures: number;
  };
}

export const INSTITUTIONAL_SERVICES: ServiceItem[] = [
  {
    id: 'etat-civil',
    code: 'EC',
    name: 'État civil',
    shortName: 'État civil',
    description: 'Actes de naissances, mariages, décès, reconnaissances, transcriptions et mentions marginales.',
    icon: 'Scroll',
    badgeColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'naissances', name: 'Naissances', description: 'Déclarations et actes de naissance de la commune', count: 184 },
      { id: 'mariages', name: 'Mariages', description: 'Dossiers de mariage civil et publications de bans', count: 62 },
      { id: 'deces', name: 'Décès', description: 'Constats de décès et autorisations de fermeture de cercueil', count: 142 },
      { id: 'reconnaissances', name: 'Reconnaissances', description: 'Reconnaissances anticipées et conjointes', count: 35 },
      { id: 'transcriptions', name: 'Transcriptions', description: 'Transcriptions consulaires et jugements d\'adoption', count: 19 },
      { id: 'mentions', name: 'Mentions', description: 'Mentions marginales (divorces, pacs, décès)', count: 88 },
      { id: 'changements-rectifications', name: 'Changements / rectifications', description: 'Changements de nom, de prénom et rectifications matérielles', count: 27 },
      { id: 'autres-dossiers', name: 'Autres dossiers', description: 'Certificats de vie, livrets de famille et attestations diverses', count: 38 }
    ],
    dossiers: [
      {
        id: 'd-ec-142',
        reference: 'EC-2026-00142',
        title: 'Acte de naissance — Jean Dupont',
        activityId: 'naissances',
        categoryName: 'Naissances',
        status: 'Archivé',
        dateCreation: '12/01/2026',
        personneConcernee: 'Jean Dupont',
        declarant: 'Marc Dupont (Père)',
        description: 'Dossier complet de déclaration de naissance au service central de l\'État civil.',
        documents: [
          { id: 'doc-ec-142-1', name: 'Declaration_de_naissance_signee.pdf', type: 'Déclaration de naissance', size: '1.4 Mo', date: '12/01/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-ec-142-2', name: 'Piece_justificative_medicale_CHU.pdf', type: 'Pièce justificative', size: '2.1 Mo', date: '12/01/2026', status: 'Certifié', format: 'SCAN' },
          { id: 'doc-ec-142-3', name: 'Acte_de_naissance_officiel_142.pdf', type: 'Acte de naissance', size: '1.8 Mo', date: '12/01/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-ec-142-4', name: 'Document_complementaire_livret.pdf', type: 'Document complémentaire', size: '920 Ko', date: '13/01/2026', status: 'Validé', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: true,
          cote: '4 E 142 / 2026',
          salleNumero: '02',
          salleNom: 'Salle des Archives & Haute-Sécurité (S-02)',
          salleId: 's02',
          rayonNumero: '04',
          rayonNom: 'Rayon État Civil & Actes Authentiques (RY-04)',
          rayonId: 'ry101',
          casierNumero: '12',
          casierNom: 'Casier Naissances & Registres (CS-12)',
          casierId: 'cs1012',
          statusConservation: 'Conservation permanente',
          dateArchivage: '14/01/2026'
        }
      },
      {
        id: 'd-ec-143',
        reference: 'EC-2026-00143',
        title: 'Acte de naissance — Marie Martin',
        activityId: 'naissances',
        categoryName: 'Naissances',
        status: 'En traitement',
        dateCreation: '12/01/2026',
        personneConcernee: 'Marie Martin',
        declarant: 'Sophie Martin (Mère)',
        description: 'Instruction en cours : vérification de l\'orthographe patronymique et attente de validation de l\'officier.',
        documents: [
          { id: 'doc-ec-143-1', name: 'Declaration_de_naissance_Martin.pdf', type: 'Déclaration de naissance', size: '1.1 Mo', date: '12/01/2026', status: 'Validé', format: 'PDF' },
          { id: 'doc-ec-143-2', name: 'Piece_justificative_identite_parents.pdf', type: 'Pièce justificative', size: '1.6 Mo', date: '12/01/2026', status: 'En attente', format: 'SCAN' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'En cours d\'instruction'
        }
      },
      {
        id: 'd-ec-144',
        reference: 'EC-2026-00144',
        title: 'Acte de naissance — Paul Nzambe',
        activityId: 'naissances',
        categoryName: 'Naissances',
        status: 'Archivé',
        dateCreation: '13/01/2026',
        personneConcernee: 'Paul Nzambe',
        declarant: 'Étienne Nzambe (Père)',
        description: 'Dossier régularisé et classé dans les magasins de conservation physique réglementaire.',
        documents: [
          { id: 'doc-ec-144-1', name: 'Declaration_naissance_Nzambe.pdf', type: 'Déclaration de naissance', size: '1.3 Mo', date: '13/01/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-ec-144-2', name: 'Piece_justificative_maternite.pdf', type: 'Pièce justificative', size: '1.9 Mo', date: '13/01/2026', status: 'Certifié', format: 'SCAN' },
          { id: 'doc-ec-144-3', name: 'Acte_naissance_delivre_Nzambe.pdf', type: 'Acte de naissance', size: '1.7 Mo', date: '13/01/2026', status: 'Certifié', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: true,
          cote: '4 E 144 / 2026',
          salleNumero: '02',
          salleNom: 'Salle des Archives & Haute-Sécurité (S-02)',
          salleId: 's02',
          rayonNumero: '04',
          rayonNom: 'Rayon État Civil & Actes Authentiques (RY-04)',
          rayonId: 'ry101',
          casierNumero: '12',
          casierNom: 'Casier Naissances & Registres (CS-12)',
          casierId: 'cs1012',
          statusConservation: 'Conservation permanente',
          dateArchivage: '15/01/2026'
        }
      },
      {
        id: 'd-ec-150',
        reference: 'EC-2026-00150',
        title: 'Déclaration de naissance — Sophie Leroy',
        activityId: 'naissances',
        categoryName: 'Naissances',
        status: 'Nouveau',
        dateCreation: '15/01/2026',
        personneConcernee: 'Sophie Leroy',
        declarant: 'Julien Leroy',
        description: 'Dossier numérique récemment déposé au guichet, assigné à l\'agent pour enregistrement initial.',
        documents: [
          { id: 'doc-ec-150-1', name: 'Formulaire_depot_naissance_Leroy.pdf', type: 'Déclaration de naissance', size: '980 Ko', date: '15/01/2026', status: 'En attente', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'En cours d\'instruction'
        }
      },
      {
        id: 'd-ec-139',
        reference: 'EC-2026-00139',
        title: 'Dossier de mariage civil — Thomas & Julie',
        activityId: 'mariages',
        categoryName: 'Mariages',
        status: 'À compléter',
        dateCreation: '08/01/2026',
        personneConcernee: 'Thomas DUPUIS & Julie BERTRAND',
        declarant: 'Futurs époux',
        description: 'Dossier incomplet : manque l\'extrait d\'acte de naissance de moins de 3 mois pour le conjoint.',
        documents: [
          { id: 'doc-ec-139-1', name: 'Dossier_Constitution_Mariage_Civil.pdf', type: 'Formulaire', size: '2.9 Mo', date: '08/01/2026', status: 'En attente', format: 'PDF' },
          { id: 'doc-ec-139-2', name: 'Justificatif_domicile_quittance.pdf', type: 'Pièce justificative', size: '850 Ko', date: '08/01/2026', status: 'Validé', format: 'SCAN' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'En cours d\'instruction'
        }
      },
      {
        id: 'd-ec-135',
        reference: 'EC-2026-00135',
        title: 'Acte de décès — Robert Garnier',
        activityId: 'deces',
        categoryName: 'Décès',
        status: 'Clôturé',
        dateCreation: '05/01/2026',
        personneConcernee: 'Robert Garnier (Décédé le 04/01/2026)',
        declarant: 'Société Municipale de Pompes Funèbres',
        description: 'Instruction finalisée et acte délivré aux ayants droit. Prêt pour transmission au service d\'archivage.',
        documents: [
          { id: 'doc-ec-135-1', name: 'Certificat_medical_deces_signe.pdf', type: 'Certificat médical', size: '1.4 Mo', date: '04/01/2026', status: 'Certifié', format: 'SCAN' },
          { id: 'doc-ec-135-2', name: 'Declaration_pompes_funebres.pdf', type: 'Déclaration', size: '890 Ko', date: '05/01/2026', status: 'Validé', format: 'PDF' },
          { id: 'doc-ec-135-3', name: 'Acte_officiel_deces_135.pdf', type: 'Acte officiel', size: '1.6 Mo', date: '05/01/2026', status: 'Certifié', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'Conservation permanente'
        }
      },
      {
        id: 'd-ec-130',
        reference: 'EC-2026-00130',
        title: 'Reconnaissance conjointe d\'enfant — Lucas Bertin',
        activityId: 'reconnaissances',
        categoryName: 'Reconnaissances',
        status: 'À archiver',
        dateCreation: '02/01/2026',
        personneConcernee: 'Lucas Bertin (Père & Mère)',
        declarant: 'Parents déclarants',
        description: 'Acte authentique scellé et signé. En attente de conditionnement en boîte et rangement physique dans le casier.',
        documents: [
          { id: 'doc-ec-130-1', name: 'Acte_reconnaissance_conjointe.pdf', type: 'Acte authentique', size: '1.8 Mo', date: '02/01/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-ec-130-2', name: 'Pieces_identite_passeports.pdf', type: 'Pièce justificative', size: '2.5 Mo', date: '02/01/2026', status: 'Certifié', format: 'SCAN' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'Conservation permanente'
        }
      },
      {
        id: 'd-ec-128',
        reference: 'EC-2026-00128',
        title: 'Transcription de mariage consulaire — Karim & Leïla',
        activityId: 'transcriptions',
        categoryName: 'Transcriptions',
        status: 'Archivé',
        dateCreation: '02/01/2026',
        personneConcernee: 'Karim BELKACEM & Leïla TAHIRI',
        declarant: 'Ministère des Affaires Étrangères / Consulat',
        description: 'Transcription légalisée d\'acte consulaire enregistrée sur les registres municipaux et rangée en magasin.',
        documents: [
          { id: 'doc-ec-128-1', name: 'Bordereau_transcription_consulaire.pdf', type: 'Transcription', size: '2.1 Mo', date: '02/01/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-ec-128-2', name: 'Apostille_et_legalisation_MAE.pdf', type: 'Apostille', size: '1.5 Mo', date: '02/01/2026', status: 'Certifié', format: 'SCAN' }
        ],
        archivage: {
          isPhysicallyArchived: true,
          cote: '4 E 128 / 2026',
          salleNumero: '01',
          salleNom: 'Salle Centrale Administrative (S-01)',
          salleId: 's01',
          rayonNumero: '02',
          rayonNom: 'Rayon État Civil & Actes Anciens',
          rayonId: 'ry101',
          casierNumero: '05',
          casierNom: 'Casier Transcriptions & Actes Consulaires',
          casierId: 'cs1012',
          statusConservation: 'Conservation permanente',
          dateArchivage: '04/01/2026'
        }
      }
    ],
    registres: [
      { id: 'reg-ec-1', title: 'Registre des Naissances — Année 2026', annee: '2026', volume: 'Vol. 1/2', etat: 'Ouvert', cote: '1 E 2026-N' },
      { id: 'reg-ec-2', title: 'Registre des Mariages — Année 2026', annee: '2026', volume: 'Vol. Unique', etat: 'Ouvert', cote: '2 E 2026-M' },
      { id: 'reg-ec-3', title: 'Registre des Décès — Année 2025', annee: '2025', volume: 'Vol. 1/1', etat: 'Relié', cote: '3 E 2025-D' }
    ],
    stats: { totalDossiers: 577, nouveaux: 12, enCours: 24, clotures: 541 }
  },

  {
    id: 'urbanisme-foncier',
    code: 'URB',
    name: 'Urbanisme & foncier',
    shortName: 'Urbanisme',
    description: 'Permis de construire, permis de démolir, déclarations préalables, certificats d\'urbanisme et dossiers fonciers.',
    icon: 'Building',
    badgeColor: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'permis-construire', name: 'Permis de construire', description: 'Instructions des demandes de PC individuels et collectifs', count: 76 },
      { id: 'permis-demolir', name: 'Permis de démolir', description: 'Autorisations de démolition totale ou partielle', count: 18 },
      { id: 'permis-amenager', name: 'Permis d\'aménager', description: 'Lotissements, zones d\'activités et campings', count: 12 },
      { id: 'declarations', name: 'Déclarations', description: 'Déclarations préalables de travaux, ravalements, clôtures', count: 140 },
      { id: 'certificats', name: 'Certificats', description: 'Certificats d\'urbanisme d\'information et opérationnels', count: 95 },
      { id: 'dossiers-fonciers', name: 'Dossiers fonciers', description: 'Alignements, cessions foncières, droits de préemption', count: 34 },
      { id: 'autres-dossiers', name: 'Autres dossiers', description: 'Enquêtes publiques, servitudes et contentieux d\'urbanisme', count: 21 }
    ],
    dossiers: [
      {
        id: 'd-urb-001',
        reference: 'URB-2026-00421',
        title: 'Permis de construire — Complexe Médical Quartier Nord',
        activityId: 'permis-construire',
        categoryName: 'Permis de construire',
        status: 'En traitement',
        dateCreation: '04/09/2026',
        demandeur: 'Société Civile Immobilière Avenir Santé',
        objet: 'Construction d\'un pôle pluridisciplinaire R+2 avec parking sous-terrain',
        description: 'Dossier complet comprenant plans d\'architecte, étude d\'impact thermique et avis des services de voirie.',
        documents: [
          { id: 'doc-urb-1', name: 'Cerfa_Demande_PC_13409.pdf', type: 'Formulaire Cerfa', size: '2.8 Mo', date: '04/09/2026', status: 'Validé', format: 'PDF' },
          { id: 'doc-urb-2', name: 'Plan_Masse_Et_Coupes_RDC.dwg', type: 'Plan architecte', size: '14.2 Mo', date: '04/09/2026', status: 'Validé', format: 'DWG' },
          { id: 'doc-urb-3', name: 'Certificat_Cadastral_Parcelle_B14.pdf', type: 'Certificat foncier', size: '1.1 Mo', date: '02/09/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-urb-4', name: 'Avis_Favorable_SDIS_Securite.pdf', type: 'Avis technique', size: '920 Ko', date: '11/09/2026', status: 'Validé', format: 'PDF' },
          { id: 'doc-urb-5', name: 'Rapport_Synthese_Instruction.pdf', type: 'Rapport d\'instruction', size: '1.4 Mo', date: '15/09/2026', status: 'En attente', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'DUA 10 ans'
        }
      },
      {
        id: 'd-urb-002',
        reference: 'URB-2026-00102',
        title: 'Permis de démolir — Hangar Industriel Quai Sud',
        activityId: 'permis-demolir',
        categoryName: 'Permis de démolir',
        status: 'À archiver',
        dateCreation: '18/08/2026',
        demandeur: 'Direction Port Autonome',
        objet: 'Démolition de structures métalliques désaffectées pour réaménagement berges',
        description: 'Dossier purgé des recours des tiers, certificat de non-opposition délivré, prêt pour versement aux archives.',
        documents: [
          { id: 'doc-urb-dem-1', name: 'Cerfa_Permis_Demolir_Signe.pdf', type: 'Formulaire Cerfa', size: '1.9 Mo', date: '18/08/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-urb-dem-2', name: 'Diagnostic_Amiante_Plomb.pdf', type: 'Diagnostic technique', size: '3.4 Mo', date: '12/08/2026', status: 'Certifié', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'DUA 10 ans'
        }
      },
      {
        id: 'd-urb-003',
        reference: 'URB-2026-00892',
        title: 'Déclaration préalable — Ravalement de façade Place Mairie',
        activityId: 'declarations',
        categoryName: 'Déclarations',
        status: 'Archivé',
        dateCreation: '10/06/2026',
        demandeur: 'Syndic Résidence Bel-Air',
        objet: 'Ravalement pierre de taille et réfection menuiseries extérieures',
        description: 'Travaux terminés avec conformité délivrée par l\'architecte des Bâtiments de France, dossier classé en casier.',
        documents: [
          { id: 'doc-urb-dec-1', name: 'Recepisse_Declaration_Prealable.pdf', type: 'Récépissé', size: '890 Ko', date: '10/06/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-urb-dec-2', name: 'Avis_ABF_Architecte_Batiments_France.pdf', type: 'Avis ABF', size: '1.2 Mo', date: '25/06/2026', status: 'Certifié', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: true,
          cote: 'DP 2026 / 00892',
          salleNumero: '01',
          salleNom: 'Salle Centrale Administrative (S-01)',
          salleId: 's01',
          rayonNumero: '03',
          rayonNom: 'Rayon Urbanisme & Aménagement',
          rayonId: 'ry101',
          casierNumero: '09',
          casierNom: 'Casier Déclarations Préalables Centre Ancien',
          casierId: 'cs1012',
          statusConservation: 'DUA 10 ans',
          dateArchivage: '15/07/2026'
        }
      },
      {
        id: 'd-urb-004',
        reference: 'URB-2026-00055',
        title: 'Permis d\'aménager — Éco-quartier des Pins',
        activityId: 'permis-amenager',
        categoryName: 'Permis d\'aménager',
        status: 'Nouveau',
        dateCreation: '16/09/2026',
        demandeur: 'Société Grand Sud Aménagement',
        objet: 'Aménagement de 45 lots à bâtir avec noues paysagères',
        description: 'Nouveau dépôt électronique par la plateforme RIEU, en attente de recevabilité administrative.',
        documents: [
          { id: 'doc-urb-am-1', name: 'Notice_Environnementale_EcoPins.pdf', type: 'Étude d\'impact', size: '8.4 Mo', date: '16/09/2026', status: 'En attente', format: 'PDF' }
        ],
        archivage: {
          isPhysicallyArchived: false,
          statusConservation: 'En cours d\'instruction'
        }
      }
    ],
    registres: [
      { id: 'reg-urb-1', title: 'Registre Chronologique des Permis de Construire 2026', annee: '2026', volume: 'Tome 1', etat: 'Ouvert', cote: 'REG-PC-2026' },
      { id: 'reg-urb-2', title: 'Registre des Déclarations Préalables', annee: '2026', volume: 'Tome 1', etat: 'Ouvert', cote: 'REG-DP-2026' }
    ],
    stats: { totalDossiers: 375, nouveaux: 8, enCours: 31, clotures: 336 }
  },

  {
    id: 'conseil-municipal',
    code: 'CM',
    name: 'Conseil municipal',
    shortName: 'Conseil municipal',
    description: 'Sessions, ordres du jour, convocations, dossiers de séance, délibérations, procès-verbaux et arrêtés.',
    icon: 'Landmark',
    badgeColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'sessions', name: 'Sessions & Séances', description: 'Ordres du jour et convocations des élus', count: 14 },
      { id: 'deliberations', name: 'Délibérations', description: 'Votes exécutoires et contrôles de légalité préfectorale', count: 182 },
      { id: 'proces-verbaux', name: 'Procès-verbaux', description: 'PV intégraux des séances du Conseil', count: 14 },
      { id: 'arretes', name: 'Arrêtés & Décisions', description: 'Arrêtés municipaux permanents et temporaires', count: 96 },
      { id: 'registres', name: 'Registres officiels', description: 'Registres des délibérations côtés et paraphés', count: 6 }
    ],
    dossiers: [
      {
        id: 'd-cm-001',
        reference: 'CM-2026-09-15',
        title: 'Session Ordinaire du Conseil Municipal — 15 Septembre 2026',
        activityId: 'sessions',
        status: 'Clôturé',
        dateCreation: '01/09/2026',
        personneConcernee: 'Monsieur le Maire et le Conseil Municipal',
        description: 'Ordre du jour comportant 18 délibérations budgétaires, aménagements et conventions partenariales.',
        documents: [
          { id: 'doc-cm-1', name: 'Convocation_Officielle_Elus.pdf', type: 'Convocation', size: '640 Ko', date: '01/09/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-cm-2', name: 'Ordre_Du_Jour_Complet_15_09.pdf', type: 'Ordre du jour', size: '820 Ko', date: '01/09/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-cm-3', name: 'Recueil_Des_Deliberations_Visees.pdf', type: 'Délibérations', size: '5.4 Mo', date: '16/09/2026', status: 'Certifié', format: 'PDF' },
          { id: 'doc-cm-4', name: 'Proces_Verbal_Signe_Seance.pdf', type: 'Procès-verbal', size: '3.2 Mo', date: '17/09/2026', status: 'Validé', format: 'PDF' }
        ],
        archivage: {
          cote: '1 D 2026 / 04',
          salleId: 's01',
          salleName: 'Salle Centrale Administrative (S-01)',
          rayonId: 'ry101',
          rayonName: 'Rayon Administration & RH (RY-101)',
          casierId: 'cs1012',
          casierName: 'Casier Administratif & Ressources (CS-1012)',
          statusConservation: 'Conservation permanente'
        }
      }
    ],
    registres: [
      { id: 'reg-cm-1', title: 'Registre des Délibérations du Conseil — 2026', annee: '2026', volume: 'Tome 1', etat: 'Ouvert', cote: '1 D 2026' },
      { id: 'reg-cm-2', title: 'Registre des Arrêtés Municipaux — 2026', annee: '2026', volume: 'Tome 1', etat: 'Ouvert', cote: '2 D 2026' }
    ],
    stats: { totalDossiers: 120, nouveaux: 2, enCours: 5, clotures: 113 }
  },

  {
    id: 'finances',
    code: 'FIN',
    name: 'Finances',
    shortName: 'Finances',
    description: 'Budgets primitifs, décisions modificatives, dépenses, recettes, factures, subventions et marchés financiers.',
    icon: 'Coins',
    badgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'budgets', name: 'Budgets & Comptes', description: 'Budget primitif (BP), Compte administratif (CA)', count: 18 },
      { id: 'depenses', name: 'Engagements de dépenses', description: 'Bons de commande et visas d\'engagement', count: 420 },
      { id: 'factures', name: 'Factures & Titres', description: 'Mandatement Chorus Pro et titres de recettes', count: 1240 },
      { id: 'subventions', name: 'Subventions', description: 'Aides aux associations et subventions d\'équipement', count: 65 },
      { id: 'comptabilite', name: 'Comptabilité M57', description: 'Pièces justificatives de mandats et journaux', count: 850 }
    ],
    dossiers: [
      {
        id: 'd-fin-001',
        reference: 'FIN-2026-BP-01',
        title: 'Budget Primitif 2026 & Décision Modificative DM1',
        activityId: 'budgets',
        status: 'Clôturé',
        dateCreation: '15/01/2026',
        description: 'Maquette budgétaire M57 équilibrée votée en séance, ratios financiers et prévisions pluriannuelles.',
        documents: [
          { id: 'doc-fin-1', name: 'Maquette_M57_Budget_Primitif_2026.xlsx', type: 'Budget M57', size: '8.4 Mo', date: '15/01/2026', status: 'Certifié', format: 'XLSX' },
          { id: 'doc-fin-2', name: 'Rapport_Orientation_Budgetaire.pdf', type: 'Rapport', size: '3.1 Mo', date: '10/01/2026', status: 'Validé', format: 'PDF' }
        ],
        archivage: {
          cote: 'M 2026 / 01',
          salleId: 's02',
          salleName: 'Salle des Archives & Haute-Sécurité (S-02)',
          rayonId: 'ry201',
          rayonName: 'Rayon Finance & Comptes (RY-201)',
          casierId: 'cs1021',
          casierName: 'Casier Projets & Roadmaps (CS-1021)',
          statusConservation: 'DUA 10 ans'
        }
      }
    ],
    registres: [
      { id: 'reg-fin-1', title: 'Grand Livre Comptable — Exercice 2025', annee: '2025', volume: 'Unique', etat: 'Clôturé', cote: 'GL-2025' }
    ],
    stats: { totalDossiers: 1840, nouveaux: 45, enCours: 120, clotures: 1675 }
  },

  {
    id: 'ressources-humaines',
    code: 'RH',
    name: 'Ressources humaines',
    shortName: 'Ressources humaines',
    description: 'Recrutements, dossiers individuels des agents, contrats, carrières, congés, formations et départs.',
    icon: 'Users',
    badgeColor: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'dossiers-agents', name: 'Dossiers agents', description: 'Dossiers administratifs uniques des agents titulaires et contractuels', count: 320 },
      { id: 'recrutements', name: 'Recrutements', description: 'Appels à candidature, jurys et procès-verbaux de sélection', count: 28 },
      { id: 'contrats', name: 'Contrats & Avenants', description: 'Contrats de travail et renouvellements', count: 85 },
      { id: 'carrieres', name: 'Carrières & Avancements', description: 'Arrêtés d\'échelon, titularisations et CAP', count: 110 },
      { id: 'formations', name: 'Formations & CNFPT', description: 'Inscriptions et attestations de formation', count: 75 }
    ],
    dossiers: [
      {
        id: 'd-rh-001',
        reference: 'RH-2026-AG-0142',
        title: 'Dossier individuel — M. François TCHIKAYA (Ingénieur Territorial)',
        activityId: 'dossiers-agents',
        status: 'En cours',
        dateCreation: '01/02/2020',
        personneConcernee: 'François TCHIKAYA (Matricule 0142)',
        description: 'Dossier administratif réglementaire complet : arrêté de nomination, contrat, diplômes, fiches d\'évaluation annuelle.',
        documents: [
          { id: 'doc-rh-1', name: 'Arrete_Nomination_Titularisation.pdf', type: 'Arrêté', size: '1.1 Mo', date: '01/02/2021', status: 'Certifié', format: 'PDF' },
          { id: 'doc-rh-2', name: 'Contrat_Initial_Engagement.pdf', type: 'Contrat', size: '2.2 Mo', date: '01/02/2020', status: 'Certifié', format: 'PDF' },
          { id: 'doc-rh-3', name: 'Evaluation_Professionnelle_2025.pdf', type: 'Évaluation', size: '950 Ko', date: '14/12/2025', status: 'Validé', format: 'PDF' }
        ],
        archivage: {
          cote: 'RH AG-0142',
          salleId: 's01',
          salleName: 'Salle Centrale Administrative (S-01)',
          rayonId: 'ry101',
          rayonName: 'Rayon Administration & RH (RY-101)',
          casierId: 'cs1011',
          casierName: 'Casier Personnel & Équipe (CS-1011)',
          statusConservation: 'DUA 10 ans'
        }
      }
    ],
    registres: [
      { id: 'reg-rh-1', title: 'Registre Unique du Personnel (RUP)', annee: '2026', volume: 'Permanent', etat: 'Ouvert', cote: 'RUP-2026' }
    ],
    stats: { totalDossiers: 512, nouveaux: 14, enCours: 42, clotures: 456 }
  },

  {
    id: 'administration-generale',
    code: 'AG',
    name: 'Administration générale',
    shortName: 'Admin. générale',
    description: 'Courriers d\'arrivée/départ, archives centrales, arrêtés de police générale, délégations de signatures.',
    icon: 'Briefcase',
    badgeColor: 'text-teal-400 bg-teal-500/20 border-teal-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'courriers', name: 'Courriers & Enregistrement', description: 'Registre chrono arrivée/départ', count: 1650 },
      { id: 'delegations', name: 'Délégations de signature', description: 'Arrêtés de délégation aux directeurs et élus', count: 32 },
      { id: 'assurances', name: 'Assurances & Sinistres', description: 'Contrats de police d\'assurance et déclarations de sinistres', count: 48 }
    ],
    dossiers: [],
    registres: [
      { id: 'reg-ag-1', title: 'Registre d\'Enregistrement du Courrier 2026', annee: '2026', volume: 'Chrono', etat: 'Ouvert', cote: 'REG-COUR-26' }
    ],
    stats: { totalDossiers: 1730, nouveaux: 34, enCours: 80, clotures: 1616 }
  },

  {
    id: 'marches-contrats',
    code: 'MP',
    name: 'Marchés & contrats',
    shortName: 'Marchés publics',
    description: 'Appels d\'offres, cahiers des charges (CCTP/CCAP), consultations, offres des candidats et avenants.',
    icon: 'FileSpreadsheet',
    badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'appels-offres', name: 'Appels d\'offres ouverts', description: 'DCE, avis d\'appel public à la concurrence (AAPC)', count: 24 },
      { id: 'marches-passes', name: 'Marchés notifiés', description: 'Actes d\'engagement, CCTP, ordres de service (OS)', count: 95 },
      { id: 'avenants', name: 'Avenants & Révisions', description: 'Avenants financiers et prorogations de délais', count: 38 }
    ],
    dossiers: [],
    registres: [
      { id: 'reg-mp-1', title: 'Registre des Marchés Publics Notifiés', annee: '2026', volume: 'Chrono', etat: 'Ouvert', cote: 'REG-MP-2026' }
    ],
    stats: { totalDossiers: 157, nouveaux: 6, enCours: 22, clotures: 129 }
  },

  {
    id: 'affaires-sociales',
    code: 'AS',
    name: 'Affaires sociales (CCAS)',
    shortName: 'Affaires sociales',
    description: 'Aide sociale légale et facultative, domiciliations, maintien à domicile, logements d\'urgence.',
    icon: 'HeartHandshake',
    badgeColor: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'aide-sociale', name: 'Aide sociale légale', description: 'Dossiers APA, MDPH et obligations alimentaires', count: 112 },
      { id: 'domiciliations', name: 'Domiciliations', description: 'Attestations d\'élection de domicile', count: 85 },
      { id: 'logements', name: 'Logement social', description: 'Demandes de logement social enregistrées (SNE)', count: 240 }
    ],
    dossiers: [],
    registres: [
      { id: 'reg-as-1', title: 'Registre des Délibérations du CCAS', annee: '2026', volume: 'Vol. 1', etat: 'Ouvert', cote: 'CCAS-2026' }
    ],
    stats: { totalDossiers: 437, nouveaux: 18, enCours: 54, clotures: 365 }
  },

  {
    id: 'elections',
    code: 'ELEC',
    name: 'Élections',
    shortName: 'Élections',
    description: 'Listes électorales, inscriptions et radiations (REU), découpage des bureaux de vote et procès-verbaux de scrutins.',
    icon: 'Vote',
    badgeColor: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'listes-electorales', name: 'Listes électorales (REU)', description: 'Tableau des mouvements et commissions de contrôle', count: 42 },
      { id: 'scrutins', name: 'Procès-verbaux de scrutins', description: 'Résultats par bureau, feuilles d\'émargement', count: 18 }
    ],
    dossiers: [],
    registres: [
      { id: 'reg-elec-1', title: 'Registre des Décisions de la Commission de Contrôle', annee: '2026', volume: 'Chrono', etat: 'Ouvert', cote: 'REG-ELEC-26' }
    ],
    stats: { totalDossiers: 60, nouveaux: 2, enCours: 4, clotures: 54 }
  },

  {
    id: 'affaires-funeraires',
    code: 'FUN',
    name: 'Affaires funéraires & cimetières',
    shortName: 'Affaires funéraires',
    description: 'Concessions funéraires, actes de sépulture, autorisations de crémation et d\'inhumation, registre des concessions.',
    icon: 'Church',
    badgeColor: 'text-slate-300 bg-slate-500/20 border-slate-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'concessions', name: 'Concessions de sépulture', description: 'Titres de concession décennales, trentenaires, perpétuelles', count: 310 },
      { id: 'autorisations-funeraires', name: 'Autorisations', description: 'Inhumations, exhumations et transports de corps', count: 125 }
    ],
    dossiers: [],
    registres: [
      { id: 'reg-fun-1', title: 'Registre Général des Inhumations du Cimetière', annee: 'Permanent', volume: 'Grand Livre', etat: 'Ouvert', cote: 'CIM-01' }
    ],
    stats: { totalDossiers: 435, nouveaux: 5, enCours: 14, clotures: 416 }
  },

  {
    id: 'services-techniques',
    code: 'ST',
    name: 'Services techniques & patrimoine',
    shortName: 'Services techniques',
    description: 'Voirie, arrêtés de circulation, DICT, occupation du domaine public, maintenance des bâtiments communaux.',
    icon: 'Wrench',
    badgeColor: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
    bannerImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    activites: [
      { id: 'arretes-circulation', name: 'Arrêtés de circulation & voirie', description: 'Réglementation temporaire de voirie et stationnement', count: 240 },
      { id: 'patrimoine-bati', name: 'Dossiers bâtiments & ERP', description: 'Plans de sécurité incendie, commissions de sécurité', count: 85 }
    ],
    dossiers: [],
    registres: [
      { id: 'reg-st-1', title: 'Registre des Permissions de Voirie & Arrêtés', annee: '2026', volume: 'Annuel', etat: 'Ouvert', cote: 'REG-ST-2026' }
    ],
    stats: { totalDossiers: 325, nouveaux: 12, enCours: 28, clotures: 285 }
  }
];

export const SGAI_MODULES = [
  {
    id: 'tableau-de-bord',
    name: 'Tableau de bord',
    shortName: 'Accueil',
    code: '01',
    icon: 'Home',
    description: 'Vision consolidée des flux, alertes prioritaires, échéances et raccourcis d\'accès.',
    path: '/',
    badge: 'ACTIF',
    badgeColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30'
  },
  {
    id: 'sites',
    name: 'Sites collaboratifs (Alfresco)',
    shortName: 'Sites',
    code: '02',
    icon: 'Layers',
    description: 'Espaces collaboratifs Alfresco : tableaux de bord, membres et bibliothèques documentaires.',
    path: '/sites',
    badge: 'ALFRESCO',
    badgeColor: 'text-sky-300 bg-sky-500/20 border-sky-500/40'
  },
  {
    id: 'entrees',
    name: 'Dépôts & Ingestion',
    shortName: 'Dépôts',
    code: '03',
    icon: 'Inbox',
    description: 'Dépôts de pièces, numérisation, reconnaissance OCR intelligente et bordereaux de versement.',
    path: '/depots',
    badge: 'OCR IA',
    badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/30'
  },
  {
    id: 'archives',
    name: 'Archives physiques & conservation',
    shortName: 'Archives',
    code: '04',
    icon: 'Archive',
    description: 'Organisation spatiale : Salle → Rayon → Casier → Dossier et cotes de conservation légale.',
    path: '/documentation/salles',
    badge: 'CONSERVATION',
    badgeColor: 'text-purple-300 bg-purple-500/20 border-purple-500/30'
  },
  {
    id: 'recherche',
    name: 'Recherche unifiée',
    shortName: 'Recherche',
    code: '05',
    icon: 'Search',
    description: 'Moteur transversal par cotes, personnes concernées, dates, plein texte et métadonnées métier.',
    path: '/recherche',
    badge: 'INDEXÉ',
    badgeColor: 'text-teal-300 bg-teal-500/20 border-teal-500/30'
  },
  {
    id: 'suivi',
    name: 'Suivi des dossiers',
    shortName: 'Suivi dossiers',
    code: '06',
    icon: 'ClipboardList',
    description: 'Dossiers en cours, clôturés, archivés, sorties d\'archives, retours au casier et traçabilité.',
    path: '/suivi',
    badge: 'TRAÇABILITÉ',
    badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/30'
  },
  {
    id: 'rapports',
    name: 'Rapports & Statistiques',
    shortName: 'Rapports',
    code: '07',
    icon: 'BarChart3',
    description: 'Indicateurs d\'archivage, volumes versés, taux d\'indexation OCR et échéances de DUA.',
    path: '/rapports',
    badge: 'MÉTRIQUES',
    badgeColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30'
  },
  {
    id: 'administration',
    name: 'Administration & Référentiel',
    shortName: 'Administration',
    code: '08',
    icon: 'Settings',
    description: 'Plan de classement territorial, règles de communicabilité, tableaux de gestion et utilisateurs.',
    path: '/administration',
    badge: 'GOUVERNANCE',
    badgeColor: 'text-white/80 bg-white/10 border-white/20'
  }
];
