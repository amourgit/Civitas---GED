import { AlfrescoNode, NodeRule } from '../types/repository';

export const INITIAL_REPOSITORY_NODES: AlfrescoNode[] = [
  // 1. ROOT REPOSITORY
  {
    id: 'root-repo',
    name: 'Repository',
    title: 'Alfresco Content Services • Entrepôt Central',
    description: 'Entrepôt racine de gouvernance et de gestion documentaire SGAI/Alfresco.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: null,
    path: ['Repository'],
    sizeFormatted: '48.6 Go',
    sizeBytes: 52187320000,
    version: '1.0',
    versionsHistory: [
      {
        version: '1.0',
        label: 'Initialisation Entrepôt',
        author: 'Administrateur Système',
        date: '2024-01-01 08:00',
        size: '0 Ko',
        comment: 'Création du store Company Home',
        isCurrent: true
      }
    ],
    contentModel: {
      modelName: 'sys:systemModel',
      typeName: 'cm:folder',
      properties: {
        'sys:store-protocol': { label: 'Protocole Store', value: 'workspace://SpacesStore', type: 'string' },
        'sys:node-uuid': { label: 'UUID Root', value: '4a91cf28-e713-4001-9626-da535ce260db', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/root-repo',
      creator: 'admin.system',
      createdDate: '15/01/2024 08:00',
      modifier: 'admin.system',
      modifiedDate: '18/09/2026 14:15',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable'],
    tags: ['alfresco', 'root', 'repository', 'sgai'],
    categories: ['/Système/Gouvernance Centrale'],
    inheritPermissions: false,
    permissions: [
      { id: 'p1', principal: 'GROUP_ADMINISTRATORS', type: 'group', displayName: 'Administrateurs SGAI', role: 'SiteManager', isInherited: false },
      { id: 'p2', principal: 'GROUP_EVERYONE', type: 'group', displayName: 'Tous les collaborateurs', role: 'SiteConsumer', isInherited: false }
    ],
    relations: [],
    childrenIds: ['dir-etat-civil', 'dir-urbanisme', 'dir-rh', 'dir-finances', 'dir-archives-legales']
  },

  // 2. DIRECTION ÉTAT CIVIL (cm:folder)
  {
    id: 'dir-etat-civil',
    name: 'État civil',
    title: 'Direction de l’État Civil & Citoyenneté',
    description: 'Espace de conservation et de production des actes civils authentiques et registres d’état civil.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: 'root-repo',
    path: ['Repository', 'État civil'],
    sizeFormatted: '18.4 Go',
    sizeBytes: 19756849152,
    version: '1.2',
    versionsHistory: [
      {
        version: '1.2',
        label: 'Mise à jour plan de classement',
        author: 'Marie OBONE (Chef de service)',
        date: '10/01/2026 09:30',
        size: '18.4 Go',
        comment: 'Ajout de la série 2026 et règles DUA 100 ans',
        isCurrent: true
      }
    ],
    contentModel: {
      modelName: 'ec:etatCivilModel',
      typeName: 'cm:folder',
      properties: {
        'ec:directionCode': { label: 'Code Direction', value: 'DEC-CIT-01', type: 'string' },
        'ec:juridiction': { label: 'Juridiction de Rattachement', value: 'Tribunal de Première Instance de Libreville', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dir-etat-civil',
      creator: 'marie.obone',
      createdDate: '12/01/2024 10:14',
      modifier: 'marie.obone',
      modifiedDate: '15/09/2026 11:20',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable', 'dp:archivageLegal'],
    tags: ['etat-civil', 'citoyennete', 'registres', 'actes'],
    categories: ['/État Civil/Registres Municipaux'],
    inheritPermissions: true,
    permissions: [
      { id: 'p3', principal: 'GROUP_OFFICIERS_ETAT_CIVIL', type: 'group', displayName: 'Officiers d’État Civil', role: 'SiteManager', isInherited: false },
      { id: 'p4', principal: 'GROUP_AGENTS_GUICHET', type: 'group', displayName: 'Agents de Guichet & Saisie', role: 'SiteContributor', isInherited: false }
    ],
    rules: [
      {
        id: 'rule-ec-auto-model',
        title: 'Classement & Typage Automatique IA',
        description: 'À l’ajout de tout document scanné, applique le Content Model "Acte de Naissance" et extrait les métadonnées officielles.',
        triggerEvent: 'on_create',
        criteria: { mimeType: 'application/pdf' },
        actions: [
          { actionType: 'extract_ai_metadata', params: { engine: 'Gemini OCR SGAI' } },
          { actionType: 'apply_content_model', params: { model: 'ec:etatCivilModel' } },
          { actionType: 'start_workflow', params: { workflow: 'wf-visa-officier' } }
        ],
        isActive: true
      }
    ],
    relations: [],
    childrenIds: ['dir-naissances', 'dir-mariages', 'dir-deces']
  },

  // 3. SÉRIE NAISSANCES
  {
    id: 'dir-naissances',
    name: 'Naissances',
    title: 'Série Naissances & Déclarations de Naissance',
    description: 'Registres et dossiers individuels de déclarations de naissance.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: 'dir-etat-civil',
    path: ['Repository', 'État civil', 'Naissances'],
    sizeFormatted: '9.8 Go',
    sizeBytes: 10522669056,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'ec:etatCivilModel',
      typeName: 'cm:folder',
      properties: {
        'ec:serieType': { label: 'Type de Série', value: 'NAISSANCES_REGISTRE_PRINCIPAL', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dir-naissances',
      creator: 'marie.obone',
      createdDate: '12/01/2024 10:30',
      modifier: 'jean.nzila',
      modifiedDate: '18/09/2026 09:00',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable'],
    tags: ['naissances', 'registres'],
    categories: ['/État Civil/Naissances'],
    inheritPermissions: true,
    permissions: [],
    relations: [],
    childrenIds: ['dir-naissances-2026', 'dir-naissances-2025']
  },

  // 4. SOUS-DOSSIER ANNEE 2026
  {
    id: 'dir-naissances-2026',
    name: '2026',
    title: 'Exercice 2026 — Actes & Déclarations',
    description: 'Dossiers de naissances déclarées au cours de l’exercice 2026.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: 'dir-naissances',
    path: ['Repository', 'État civil', 'Naissances', '2026'],
    sizeFormatted: '2.4 Go',
    sizeBytes: 2576980377,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'ec:etatCivilModel',
      typeName: 'cm:folder',
      properties: {
        'ec:anneeExercice': { label: 'Année Exercice', value: 2026, type: 'number' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dir-naissances-2026',
      creator: 'jean.nzila',
      createdDate: '01/01/2026 00:00',
      modifier: 'jean.nzila',
      modifiedDate: '18/09/2026 11:45',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled'],
    tags: ['2026', 'naissances', 'en-cours'],
    categories: ['/État Civil/Naissances/2026'],
    inheritPermissions: true,
    permissions: [],
    relations: [],
    childrenIds: ['dossier-ec-2026-00152', 'dossier-ec-2026-00153']
  },

  // 5. DOSSIER METIER : Dossier EC-2026-00152 (ec:dossierEtatCivil)
  {
    id: 'dossier-ec-2026-00152',
    name: 'Dossier EC-2026-00152',
    title: 'Dossier de Naissance • NZILA Aaron Michel',
    description: 'Dossier complet de déclaration, pièces justificatives et acte de naissance n° 00152/2026.',
    nodeType: 'ec:dossierEtatCivil',
    isFolder: true,
    parentId: 'dir-naissances-2026',
    path: ['Repository', 'État civil', 'Naissances', '2026', 'Dossier EC-2026-00152'],
    sizeFormatted: '14.8 Mo',
    sizeBytes: 15518924,
    version: '2.1',
    versionsHistory: [
      {
        version: '2.1',
        label: 'Signature numérique apposée',
        author: 'Jean-Marc NZILA (Officier)',
        date: '16/03/2026 14:10',
        size: '14.8 Mo',
        comment: 'Visa officiel et scellement d’intégrité SHA-256',
        isCurrent: true
      },
      {
        version: '2.0',
        label: 'Génération de l’acte provisoire',
        author: 'Clémence NTOUTOUME (Agent)',
        date: '15/03/2026 11:20',
        size: '12.3 Mo',
        comment: 'Transcription intégrale des pièces justificatives',
        isCurrent: false
      },
      {
        version: '1.0',
        label: 'Dépôt initial & OCR',
        author: 'Portail Usager SGAI',
        date: '14/03/2026 09:15',
        size: '8.4 Mo',
        comment: 'Dépôt par le déclarant via la borne citoyenne',
        isCurrent: false
      }
    ],
    contentModel: {
      modelName: 'ec:etatCivilModel',
      typeName: 'ec:dossierEtatCivil',
      properties: {
        'ec:numDossier': { label: 'Numéro de Dossier', value: 'EC-2026-00152', type: 'string', isMandatory: true },
        'ec:annee': { label: 'Année de Registre', value: 2026, type: 'number', isMandatory: true },
        'ec:commune': { label: 'Commune', value: 'Libreville', type: 'string', isMandatory: true },
        'ec:arrondissement': { label: 'Arrondissement', value: '3ème Arrondissement (Mont-Bouët)', type: 'string' },
        'ec:nomEnfant': { label: 'Nom de l’Enfant', value: 'NZILA', type: 'string' },
        'ec:prenomEnfant': { label: 'Prénoms de l’Enfant', value: 'Aaron Michel', type: 'string' },
        'ec:dateNaissance': { label: 'Date de Naissance', value: '14/03/2026', type: 'date' },
        'ec:lieuNaissance': { label: 'Lieu de Naissance', value: 'CHU Mère-Enfant Jeanne Ebori', type: 'string' },
        'ec:officierEtatCivil': { label: 'Officier d’État Civil', value: 'Jean-Marc NZILA', type: 'string' },
        'ec:statutProbatoire': { label: 'Statut Probatoire', value: 'ACTE_SCELLE_ET_AUTHENTIFIE', type: 'badge' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dossier-ec-2026-00152',
      creator: 'clemence.ntoutoume',
      createdDate: '14/03/2026 09:15',
      modifier: 'jean.nzila',
      modifiedDate: '16/03/2026 14:10',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:versionable', 'cm:auditable', 'dp:archivageLegal', 'dp:valeurProbatoire'],
    tags: ['naissance', 'nzila', '2026', 'valide', 'chu-ebori', 'authentique'],
    categories: ['/État Civil/Naissances/Actes Validés', '/Conservation Légale/DUA 100 ans'],
    inheritPermissions: true,
    permissions: [
      { id: 'p5', principal: 'GROUP_OFFICIERS_ETAT_CIVIL', type: 'group', displayName: 'Officiers d’État Civil', role: 'SiteManager', isInherited: true },
      { id: 'p6', principal: 'user:laura.denvida', type: 'user', displayName: 'Laura Denvida (Superviseur)', role: 'SiteCollaborator', isInherited: false }
    ],
    rules: [
      {
        id: 'rule-dossier-seal',
        title: 'Verrouillage automatique après visa',
        description: 'Dès que le statut passe à "ACTE_SCELLE", verrouille le dossier en écriture et applique l’aspect DUA 100 ans.',
        triggerEvent: 'on_update',
        criteria: { hasAspect: 'dp:valeurProbatoire' },
        actions: [
          { actionType: 'apply_aspect', params: { aspect: 'dp:archivageLegal' } }
        ],
        isActive: true
      }
    ],
    relations: [
      {
        id: 'rel-1',
        targetNodeId: 'doc-declaration-pdf',
        targetNodeName: 'Déclaration.pdf',
        targetNodeType: 'cm:content',
        relationType: 'dossier_contains',
        description: 'Déclaration initiale souscrite par le père en présence des témoins.'
      },
      {
        id: 'rel-2',
        targetNodeId: 'doc-justificatif-pdf',
        targetNodeName: 'Justificatif.pdf',
        targetNodeType: 'cm:content',
        relationType: 'justificatif_de',
        description: 'Certificat médical d’accouchement délivré par le CHU Jeanne Ebori.'
      },
      {
        id: 'rel-3',
        targetNodeId: 'doc-acte-pdf',
        targetNodeName: 'Acte.pdf',
        targetNodeType: 'ec:acteNaissance',
        relationType: 'decision_relative_a',
        description: 'Acte authentique délivré et signé par l’officier d’état civil.'
      }
    ],
    workflow: {
      workflowId: 'wf-ec-00152',
      definitionName: 'Visa & Délivrance d’Acte Authentique',
      status: 'valide',
      currentStep: 'Acte scellé et archivé',
      assigneeName: 'Jean-Marc NZILA',
      assigneeRole: 'Officier d’État Civil Titulaire',
      dueDate: '16/03/2026',
      progressPercent: 100
    },
    childrenIds: ['doc-declaration-pdf', 'doc-justificatif-pdf', 'doc-acte-pdf']
  },

  // 6. DOCUMENT DEDANS : Déclaration.pdf
  {
    id: 'doc-declaration-pdf',
    name: 'Déclaration.pdf',
    title: 'Déclaration de Naissance Cerfa n° EC-01',
    description: 'Formulaire de déclaration de naissance rempli et signé par le déclarant le 14/03/2026.',
    nodeType: 'cm:content',
    isFolder: false,
    parentId: 'dossier-ec-2026-00152',
    path: ['Repository', 'État civil', 'Naissances', '2026', 'Dossier EC-2026-00152', 'Déclaration.pdf'],
    mimetype: 'application/pdf',
    sizeFormatted: '3.4 Mo',
    sizeBytes: 3565158,
    version: '1.1',
    versionsHistory: [
      {
        version: '1.1',
        label: 'Validation OCR et correction prénom',
        author: 'Clémence NTOUTOUME',
        date: '14/03/2026 14:05',
        size: '3.4 Mo',
        comment: 'Correction orthographique du second prénom "Michel"',
        isCurrent: true
      },
      {
        version: '1.0',
        label: 'Numérisation haute résolution',
        author: 'Scanner Guichet 02',
        date: '14/03/2026 09:18',
        size: '3.2 Mo',
        comment: 'Acquisition optique 300 DPI multi-page',
        isCurrent: false
      }
    ],
    contentModel: {
      modelName: 'ec:etatCivilModel',
      typeName: 'ec:declarationNaissance',
      properties: {
        'ec:numDeclaration': { label: 'N° Déclaration', value: 'DEC-2026-9812', type: 'string', isMandatory: true },
        'ec:declarantQualite': { label: 'Qualité Déclarant', value: 'Père de l’enfant', type: 'string' },
        'ec:declarantNom': { label: 'Nom Déclarant', value: 'NZILA Samuel', type: 'string' },
        'ec:dateDeclaration': { label: 'Date Déclaration', value: '14/03/2026 09:15', type: 'date' },
        'ec:temoin1': { label: 'Témoin 1', value: 'MENGUE Paul (Fonctionnaire)', type: 'string' },
        'ec:temoin2': { label: 'Témoin 2', value: 'NDONG Célestin (Commerçant)', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/doc-declaration-pdf',
      creator: 'scanner.guichet',
      createdDate: '14/03/2026 09:18',
      modifier: 'clemence.ntoutoume',
      modifiedDate: '14/03/2026 14:05',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:versionable', 'cm:auditable', 'cm:dublincore'],
    tags: ['declaration', 'cerfa', 'naissance', 'scan-officiel'],
    categories: ['/État Civil/Pièces Justificatives'],
    inheritPermissions: true,
    permissions: [],
    relations: [
      {
        id: 'rel-dec-1',
        targetNodeId: 'dossier-ec-2026-00152',
        targetNodeName: 'Dossier EC-2026-00152',
        targetNodeType: 'ec:dossierEtatCivil',
        relationType: 'annexe_de',
        description: 'Document constitutif du dossier parent.'
      },
      {
        id: 'rel-dec-2',
        targetNodeId: 'doc-acte-pdf',
        targetNodeName: 'Acte.pdf',
        targetNodeType: 'ec:acteNaissance',
        relationType: 'justificatif_de',
        description: 'Base légale ayant servi à la rédaction de l’acte.'
      }
    ],
    previewThumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    textContentSample: 'RÉPUBLIQUE GABONAISE • UNION - TRAVAIL - JUSTICE\nMAIRIE DE LIBREVILLE • 3ème ARRONDISSEMENT\nDÉCLARATION DE NAISSANCE N° DEC-2026-9812\nLe quatorze mars deux mille vingt-six, à neuf heures quinze minutes, par-devant nous, Officier d’État Civil, s’est présenté monsieur NZILA Samuel, déclarant la naissance survenue au CHU Mère-Enfant Jeanne Ebori...'
  },

  // 7. DOCUMENT DEDANS : Justificatif.pdf
  {
    id: 'doc-justificatif-pdf',
    name: 'Justificatif.pdf',
    title: 'Certificat Médical d’Accouchement & CNI Parents',
    description: 'Volet 1 du certificat médical délivré par la maternité Jeanne Ebori et copies certifiées conformes des CNI.',
    nodeType: 'cm:content',
    isFolder: false,
    parentId: 'dossier-ec-2026-00152',
    path: ['Repository', 'État civil', 'Naissances', '2026', 'Dossier EC-2026-00152', 'Justificatif.pdf'],
    mimetype: 'application/pdf',
    sizeFormatted: '4.2 Mo',
    sizeBytes: 4404019,
    version: '1.0',
    versionsHistory: [
      {
        version: '1.0',
        label: 'Numérisation originale certifiée',
        author: 'Dr. Suzanne MBA (Médecin accoucheur)',
        date: '14/03/2026 07:30',
        size: '4.2 Mo',
        comment: 'Délivrance de la souche hospitalière scellée',
        isCurrent: true
      }
    ],
    contentModel: {
      modelName: 'ec:etatCivilModel',
      typeName: 'cm:content',
      properties: {
        'ec:numCertificatMedical': { label: 'N° Souche Médicale', value: 'CHU-JE-2026-7781', type: 'string', isMandatory: true },
        'ec:etablissementSante': { label: 'Établissement de Santé', value: 'CHU Mère-Enfant Jeanne Ebori', type: 'string' },
        'ec:nomPraticien': { label: 'Praticien Accoucheur', value: 'Dr. Suzanne MBA', type: 'string' },
        'ec:heureAccouchement': { label: 'Heure Précise', value: '06:42 UTC+1', type: 'string' },
        'ec:sexeEnfant': { label: 'Sexe de l’Enfant', value: 'Masculin (M)', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/doc-justificatif-pdf',
      creator: 'dr.suzanne.mba',
      createdDate: '14/03/2026 07:30',
      modifier: 'dr.suzanne.mba',
      modifiedDate: '14/03/2026 07:30',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable', 'dp:valeurProbatoire'],
    tags: ['certificat-medical', 'hopital', 'chu-ebori', 'justificatif-authentique'],
    categories: ['/État Civil/Pièces Médicales'],
    inheritPermissions: true,
    permissions: [],
    relations: [
      {
        id: 'rel-just-1',
        targetNodeId: 'doc-acte-pdf',
        targetNodeName: 'Acte.pdf',
        targetNodeType: 'ec:acteNaissance',
        relationType: 'justificatif_de',
        description: 'Certificat médical original justifiant la rédaction de l’acte.'
      }
    ],
    previewThumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    textContentSample: 'CENTRE HOSPITALIER UNIVERSITAIRE MÈRE-ENFANT JEANNE EBORI\nCERTIFICAT MÉDICAL DE NAISSANCE\nJe soussignée, Dr. Suzanne MBA, certifie avoir assisté à la naissance de l’enfant de sexe masculin, né le 14/03/2026 à 06h42...'
  },

  // 8. DOCUMENT DEDANS : Acte.pdf (ec:acteNaissance)
  {
    id: 'doc-acte-pdf',
    name: 'Acte.pdf',
    title: 'Acte de Naissance Authentique N° 00152/2026',
    description: 'Copie intégrale de l’acte de naissance enregistré sur le registre officiel de l’état civil.',
    nodeType: 'ec:acteNaissance',
    isFolder: false,
    parentId: 'dossier-ec-2026-00152',
    path: ['Repository', 'État civil', 'Naissances', '2026', 'Dossier EC-2026-00152', 'Acte.pdf'],
    mimetype: 'application/pdf',
    sizeFormatted: '7.2 Mo',
    sizeBytes: 7549747,
    version: '2.0',
    versionsHistory: [
      {
        version: '2.0',
        label: 'Acte définitif revêtu du sceau et de la signature de l’Officier',
        author: 'Jean-Marc NZILA (Officier)',
        date: '16/03/2026 14:10',
        size: '7.2 Mo',
        comment: 'Signature électronique qualifiée conforme eIDAS / RGS***',
        isCurrent: true
      },
      {
        version: '1.0',
        label: 'Minute provisoire pour relecture des mentions',
        author: 'Clémence NTOUTOUME',
        date: '15/03/2026 11:20',
        size: '6.8 Mo',
        comment: 'Établissement du projet de minute d’acte',
        isCurrent: false
      }
    ],
    contentModel: {
      modelName: 'ec:etatCivilModel',
      typeName: 'ec:acteNaissance',
      properties: {
        'ec:numActe': { label: 'Numéro d’Acte', value: 'ACTE-2026-00152', type: 'string', isMandatory: true },
        'ec:annee': { label: 'Année', value: 2026, type: 'number', isMandatory: true },
        'ec:date': { label: 'Date d’Enregistrement', value: '16/03/2026', type: 'date', isMandatory: true },
        'ec:commune': { label: 'Commune', value: 'Libreville', type: 'string', isMandatory: true },
        'ec:arrondissement': { label: 'Arrondissement', value: '3ème Arrondissement', type: 'string' },
        'ec:nomEnfant': { label: 'Nom de l’Enfant', value: 'NZILA', type: 'string', isMandatory: true },
        'ec:prenomEnfant': { label: 'Prénoms de l’Enfant', value: 'Aaron Michel', type: 'string', isMandatory: true },
        'ec:officierSignataire': { label: 'Officier Signataire', value: 'Jean-Marc NZILA', type: 'string' },
        'ec:statutSignature': { label: 'Signature Numérique', value: 'VALIDE_CERTIFIEE_SHA256', type: 'badge' },
        'ec:duaConservation': { label: 'Durée Utile (DUA)', value: '100 ans (Versement Archives Nationales)', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/doc-acte-pdf',
      creator: 'clemence.ntoutoume',
      createdDate: '15/03/2026 11:20',
      modifier: 'jean.nzila',
      modifiedDate: '16/03/2026 14:10',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:versionable', 'cm:auditable', 'dp:archivageLegal', 'dp:valeurProbatoire'],
    tags: ['acte-authentique', 'naissance', 'nzila-aaron', 'signe', 'scelle-officiel'],
    categories: ['/État Civil/Actes Authentiques/Naissances', '/Archives Pérennes/DUA 100 ans'],
    inheritPermissions: true,
    permissions: [],
    relations: [
      {
        id: 'rel-acte-1',
        targetNodeId: 'dossier-ec-2026-00152',
        targetNodeName: 'Dossier EC-2026-00152',
        targetNodeType: 'ec:dossierEtatCivil',
        relationType: 'decision_relative_a',
        description: 'Acte principal issu du dossier d’état civil.'
      },
      {
        id: 'rel-acte-2',
        targetNodeId: 'doc-declaration-pdf',
        targetNodeName: 'Déclaration.pdf',
        targetNodeType: 'cm:content',
        relationType: 'reference_a',
        description: 'Référence à la déclaration de naissance originale.'
      },
      {
        id: 'rel-acte-3',
        targetNodeId: 'doc-justificatif-pdf',
        targetNodeName: 'Justificatif.pdf',
        targetNodeType: 'cm:content',
        relationType: 'reference_a',
        description: 'Référence au certificat médical de naissance.'
      }
    ],
    workflow: {
      workflowId: 'wf-acte-00152',
      definitionName: 'Scellement & Enregistrement au Registre Légal',
      status: 'valide',
      currentStep: 'Scellé au registre d’état civil',
      assigneeName: 'Jean-Marc NZILA',
      assigneeRole: 'Officier d’État Civil',
      dueDate: '16/03/2026',
      progressPercent: 100
    },
    previewThumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    textContentSample: 'RÉPUBLIQUE GABONAISE • UNION - TRAVAIL - JUSTICE\nREGISTRE DES ACTES DE NAISSANCE DE LA COMMUNE DE LIBREVILLE\nACTE N° 00152/2026\nLe 14 mars 2026 est né au CHU Mère-Enfant Jeanne Ebori : Aaron Michel NZILA, du sexe masculin, de Samuel NZILA et de Sarah ONDO...\nDressé par nous, Jean-Marc NZILA, Officier d’État Civil.'
  },

  // 9. URBANISME & TRAVAUX (ur:permisConstruire)
  {
    id: 'dir-urbanisme',
    name: 'Urbanisme & Travaux',
    title: 'Direction de l’Urbanisme, du Cadastre & du Foncier',
    description: 'Instruction des demandes de permis de construire, déclarations préalables et plans cadastraux.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: 'root-repo',
    path: ['Repository', 'Urbanisme & Travaux'],
    sizeFormatted: '22.8 Go',
    sizeBytes: 24482381824,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'ur:urbanismeModel',
      typeName: 'cm:folder',
      properties: {
        'ur:direction': { label: 'Direction Métier', value: 'DIR_URB_CADASTRE_LIBREVILLE', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dir-urbanisme',
      creator: 'alain.mbadinga',
      createdDate: '15/01/2024 14:00',
      modifier: 'alain.mbadinga',
      modifiedDate: '17/09/2026 16:30',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable'],
    tags: ['urbanisme', 'permis-construire', 'cadastre', 'foncier'],
    categories: ['/Urbanisme/Permis de Construire'],
    inheritPermissions: true,
    permissions: [
      { id: 'p7', principal: 'GROUP_INSTRUCTEURS_URBANISME', type: 'group', displayName: 'Instructeurs Urbanisme', role: 'SiteManager', isInherited: false },
      { id: 'p8', principal: 'GROUP_ARCHITECTES_CONSEIL', type: 'group', displayName: 'Architectes Conseil', role: 'SiteCollaborator', isInherited: false }
    ],
    relations: [],
    childrenIds: ['dossier-pc-2026-0891']
  },

  // 10. DOSSIER PERMIS DE CONSTRUIRE PC-2026-0891
  {
    id: 'dossier-pc-2026-0891',
    name: 'Dossier PC-2026-0891',
    title: 'Permis de Construire • Résidence Les Palmiers',
    description: 'Demande de permis de construire pour un complexe R+4 de 24 logements standing à Angondjé.',
    nodeType: 'ur:permisConstruire',
    isFolder: true,
    parentId: 'dir-urbanisme',
    path: ['Repository', 'Urbanisme & Travaux', 'Dossier PC-2026-0891'],
    sizeFormatted: '38.5 Mo',
    sizeBytes: 40370176,
    version: '1.3',
    versionsHistory: [
      {
        version: '1.3',
        label: 'Avis favorable commission de sécurité',
        author: 'Cdt. Paul BEKALE (Sapeurs-Pompiers)',
        date: '12/09/2026 15:20',
        size: '38.5 Mo',
        comment: 'Validation des voies d’accès engins et colonnes sèches',
        isCurrent: true
      },
      {
        version: '1.2',
        label: 'Rapport d’instruction technique foncière',
        author: 'Alain MBADINGA (Instructeur en chef)',
        date: '05/09/2026 10:45',
        size: '32.1 Mo',
        comment: 'Conformité PLU et emprise au sol 45%',
        isCurrent: false
      }
    ],
    contentModel: {
      modelName: 'ur:urbanismeModel',
      typeName: 'ur:permisConstruire',
      properties: {
        'ur:reference': { label: 'Référence Permis', value: 'PC-048-2026-0891', type: 'string', isMandatory: true },
        'ur:demandeur': { label: 'Demandeur / Pétitionnaire', value: 'SCI Les Palmiers du Cap (M. Christian ONDO)', type: 'string', isMandatory: true },
        'ur:parcelle': { label: 'Parcelle Cadastrale', value: 'Section AK - Parcelle N° 142 / Angondjé', type: 'string', isMandatory: true },
        'ur:surfacePlancher': { label: 'Surface de Plancher', value: '2 850 m²', type: 'string' },
        'ur:hauteurBatiment': { label: 'Hauteur Bâtiment', value: 'R+4 (16.50 mètres)', type: 'string' },
        'ur:dateDepot': { label: 'Date de Dépôt', value: '18/08/2026', type: 'date', isMandatory: true },
        'ur:statut': { label: 'Statut d’Instruction', value: 'AVIS_FAVORABLE_EN_ATTENTE_ARRETE', type: 'badge', isMandatory: true }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dossier-pc-2026-0891',
      creator: 'alain.mbadinga',
      createdDate: '18/08/2026 11:30',
      modifier: 'alain.mbadinga',
      modifiedDate: '17/09/2026 16:30',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:versionable', 'cm:auditable', 'dp:archivageLegal'],
    tags: ['permis-construire', 'angondje', 'sci-palmiers', 'instruction', 'r+4'],
    categories: ['/Urbanisme/Permis de Construire/En cours'],
    inheritPermissions: true,
    permissions: [],
    relations: [
      {
        id: 'rel-pc-1',
        targetNodeId: 'doc-demande-pc-pdf',
        targetNodeName: 'Demande.pdf',
        targetNodeType: 'cm:content',
        relationType: 'dossier_contains',
        description: 'Formulaire de demande de permis de construire Cerfa officiel.'
      },
      {
        id: 'rel-pc-2',
        targetNodeId: 'doc-rapport-urb-pdf',
        targetNodeName: 'Rapport_Instruction.pdf',
        targetNodeType: 'cm:content',
        relationType: 'rapport_instruction_de',
        description: 'Rapport d’instruction technique et de conformité aux règles d’urbanisme.'
      },
      {
        id: 'rel-pc-3',
        targetNodeId: 'doc-decision-arrete-pdf',
        targetNodeName: 'Arrete_Maire.pdf',
        targetNodeType: 'cm:content',
        relationType: 'decision_relative_a',
        description: 'Arrêté municipal portant accord de permis de construire.'
      }
    ],
    workflow: {
      workflowId: 'wf-pc-0891',
      definitionName: 'Circuit d’Instruction Permis de Construire',
      status: 'en_cours',
      currentStep: 'Signature de l’Arrêté Municipal par le Maire',
      assigneeName: 'Monsieur le Délégué Spécial',
      assigneeRole: 'Exécutif Municipal',
      dueDate: '25/09/2026',
      progressPercent: 85
    },
    childrenIds: ['doc-demande-pc-pdf', 'doc-rapport-urb-pdf', 'doc-decision-arrete-pdf']
  },

  // 11. DOCUMENTS URBANISME
  {
    id: 'doc-demande-pc-pdf',
    name: 'Demande.pdf',
    title: 'Demande de Permis de Construire Cerfa n° 13409*08',
    description: 'Dossier de demande déposé par l’architecte mandaté avec notice explicative.',
    nodeType: 'cm:content',
    isFolder: false,
    parentId: 'dossier-pc-2026-0891',
    path: ['Repository', 'Urbanisme & Travaux', 'Dossier PC-2026-0891', 'Demande.pdf'],
    mimetype: 'application/pdf',
    sizeFormatted: '8.4 Mo',
    sizeBytes: 8808038,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'ur:urbanismeModel',
      typeName: 'cm:content',
      properties: {
        'ur:refCerfa': { label: 'Réf Cerfa', value: 'CERFA-PC-2026-0891', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/doc-demande-pc-pdf',
      creator: 'sci.palmiers',
      createdDate: '18/08/2026 11:30',
      modifier: 'alain.mbadinga',
      modifiedDate: '18/08/2026 11:30',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable'],
    tags: ['demande', 'urbanisme', 'cerfa'],
    categories: ['/Urbanisme/Demandes Initiales'],
    inheritPermissions: true,
    permissions: [],
    relations: [],
    previewThumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-rapport-urb-pdf',
    name: 'Rapport_Instruction.pdf',
    title: 'Rapport d’Instruction Technique & Cadastrale',
    description: 'Synthèse technique des avis favorables émis par les services techniques et les réseaux concessionnaires (SEEG, voirie).',
    nodeType: 'cm:content',
    isFolder: false,
    parentId: 'dossier-pc-2026-0891',
    path: ['Repository', 'Urbanisme & Travaux', 'Dossier PC-2026-0891', 'Rapport_Instruction.pdf'],
    mimetype: 'application/pdf',
    sizeFormatted: '12.6 Mo',
    sizeBytes: 13212057,
    version: '1.2',
    versionsHistory: [],
    contentModel: {
      modelName: 'ur:urbanismeModel',
      typeName: 'cm:content',
      properties: {
        'ur:avisGeneral': { label: 'Avis Technique Global', value: 'FAVORABLE_SANS_RESERVE', type: 'badge' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/doc-rapport-urb-pdf',
      creator: 'alain.mbadinga',
      createdDate: '05/09/2026 10:45',
      modifier: 'alain.mbadinga',
      modifiedDate: '12/09/2026 15:20',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:versionable', 'cm:auditable'],
    tags: ['rapport', 'instruction', 'conforme', 'urbanisme'],
    categories: ['/Urbanisme/Rapports d’Instruction'],
    inheritPermissions: true,
    permissions: [],
    relations: [],
    previewThumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'doc-decision-arrete-pdf',
    name: 'Arrete_Maire.pdf',
    title: 'Arrêté Municipal N° 048/Mairie/2026 Accordant Permis',
    description: 'Projet d’arrêté d’autorisation de construire prêt pour signature électronique exécutoire.',
    nodeType: 'cm:content',
    isFolder: false,
    parentId: 'dossier-pc-2026-0891',
    path: ['Repository', 'Urbanisme & Travaux', 'Dossier PC-2026-0891', 'Arrete_Maire.pdf'],
    mimetype: 'application/pdf',
    sizeFormatted: '4.8 Mo',
    sizeBytes: 5033164,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'ur:urbanismeModel',
      typeName: 'cm:content',
      properties: {
        'ur:numArrete': { label: 'N° Arrêté Municipal', value: 'ARR-2026-048-URB', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/doc-decision-arrete-pdf',
      creator: 'alain.mbadinga',
      createdDate: '16/09/2026 14:00',
      modifier: 'alain.mbadinga',
      modifiedDate: '17/09/2026 16:30',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable', 'dp:archivageLegal'],
    tags: ['arrete', 'decision', 'permis', 'maire'],
    categories: ['/Urbanisme/Décisions & Arrêtés'],
    inheritPermissions: true,
    permissions: [],
    relations: [],
    previewThumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80'
  },

  // 12. DIRECTION RESSOURCES HUMAINES
  {
    id: 'dir-rh',
    name: 'Ressources Humaines',
    title: 'Direction des Ressources Humaines & Carrières',
    description: 'Gestion des dossiers administratifs des agents, contrats de travail, avancements et paie.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: 'root-repo',
    path: ['Repository', 'Ressources Humaines'],
    sizeFormatted: '4.2 Go',
    sizeBytes: 4509715660,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'rh:rhModel',
      typeName: 'cm:folder',
      properties: {
        'rh:codeDirection': { label: 'Code Direction', value: 'DRH-AGENTS-MUNICIPAUX', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dir-rh',
      creator: 'laura.denvida',
      createdDate: '15/01/2024 09:00',
      modifier: 'laura.denvida',
      modifiedDate: '18/09/2026 10:15',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable'],
    tags: ['rh', 'personnel', 'agents', 'carrieres'],
    categories: ['/Ressources Humaines/Dossiers Agents'],
    inheritPermissions: false,
    permissions: [
      { id: 'p9', principal: 'GROUP_RH_MANAGERS', type: 'group', displayName: 'Gestionnaires RH', role: 'SiteManager', isInherited: false },
      { id: 'p10', principal: 'user:laura.denvida', type: 'user', displayName: 'Laura Denvida (DRH)', role: 'SiteManager', isInherited: false }
    ],
    relations: [],
    childrenIds: []
  },

  // 13. FINANCES & MARCHÉS PUBLICS
  {
    id: 'dir-finances',
    name: 'Finances & Marchés',
    title: 'Direction des Affaires Financières & Marchés Publics',
    description: 'Bons de commande, factures visées par le Trésor, bordereaux de mandatement et marchés publics.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: 'root-repo',
    path: ['Repository', 'Finances & Marchés'],
    sizeFormatted: '3.6 Go',
    sizeBytes: 3865470566,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'fin:financesModel',
      typeName: 'cm:folder',
      properties: {
        'fin:codeBudget': { label: 'Code Budgétaire', value: 'BUD-MUNICIPAL-2026', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dir-finances',
      creator: 'tresorerie.admin',
      createdDate: '15/01/2024 09:00',
      modifier: 'tresorerie.admin',
      modifiedDate: '18/09/2026 08:30',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable'],
    tags: ['finances', 'marches', 'factures', 'tresor'],
    categories: ['/Finances/Marchés Publics'],
    inheritPermissions: true,
    permissions: [],
    relations: [],
    childrenIds: []
  },

  // 14. ARCHIVES PÉRENNES & DUA
  {
    id: 'dir-archives-legales',
    name: 'Archives Pérennes',
    title: 'Espace de Conservation à Valeur Probatoire (DUA)',
    description: 'Entrepôt scellé pour les archives historiques et versements réglementaires à conservation centennale.',
    nodeType: 'cm:folder',
    isFolder: true,
    parentId: 'root-repo',
    path: ['Repository', 'Archives Pérennes'],
    sizeFormatted: '10.2 Go',
    sizeBytes: 10952166604,
    version: '1.0',
    versionsHistory: [],
    contentModel: {
      modelName: 'dp:archiveModel',
      typeName: 'cm:folder',
      properties: {
        'dp:normeSecurite': { label: 'Norme d’Archivage', value: 'ISO 14641-1 / NF Z 42-013', type: 'string' }
      }
    },
    systemProperties: {
      nodeRef: 'workspace://SpacesStore/dir-archives-legales',
      creator: 'archiviste.chef',
      createdDate: '15/01/2024 09:00',
      modifier: 'archiviste.chef',
      modifiedDate: '18/09/2026 09:00',
      store: 'workspace://SpacesStore'
    },
    aspects: ['cm:titled', 'cm:auditable', 'dp:archivageLegal', 'dp:valeurProbatoire'],
    tags: ['archives', 'dua', 'valeur-probatoire', 'centennal'],
    categories: ['/Conservation Légale/DUA 100 ans'],
    inheritPermissions: false,
    permissions: [
      { id: 'p11', principal: 'GROUP_ARCHIVISTES_NATIONAUX', type: 'group', displayName: 'Archivistes Nationaux', role: 'SiteManager', isInherited: false }
    ],
    relations: [],
    childrenIds: []
  }
];

export const CONTENT_MODEL_DEFINITIONS = [
  {
    id: 'ec:acteNaissance',
    label: 'Acte de Naissance',
    prefix: 'ec',
    namespace: 'http://www.alfresco.org/model/etatcivil/1.0',
    description: 'Modèle documentaire pour les actes authentiques de naissance.',
    fields: [
      { name: 'numActe', label: 'Numéro d’Acte', type: 'string', required: true, example: 'ACTE-2026-00152' },
      { name: 'annee', label: 'Année', type: 'number', required: true, example: '2026' },
      { name: 'date', label: 'Date d’Établissement', type: 'date', required: true, example: '16/03/2026' },
      { name: 'commune', label: 'Commune', type: 'string', required: true, example: 'Libreville' },
      { name: 'nomEnfant', label: 'Nom de l’Enfant', type: 'string', required: true, example: 'NZILA' },
      { name: 'prenomEnfant', label: 'Prénoms', type: 'string', required: true, example: 'Aaron Michel' },
      { name: 'officierSignataire', label: 'Officier d’État Civil', type: 'string', required: false, example: 'Jean-Marc NZILA' }
    ]
  },
  {
    id: 'ur:permisConstruire',
    label: 'Permis de Construire',
    prefix: 'ur',
    namespace: 'http://www.alfresco.org/model/urbanisme/1.0',
    description: 'Modèle pour les dossiers et arrêtés d’instruction de permis de construire.',
    fields: [
      { name: 'reference', label: 'Référence Permis', type: 'string', required: true, example: 'PC-048-2026-0891' },
      { name: 'demandeur', label: 'Demandeur / Pétitionnaire', type: 'string', required: true, example: 'SCI Les Palmiers' },
      { name: 'parcelle', label: 'Parcelle Cadastrale', type: 'string', required: true, example: 'Section AK N° 142' },
      { name: 'dateDepot', label: 'Date de Dépôt', type: 'date', required: true, example: '18/08/2026' },
      { name: 'statut', label: 'Statut d’Instruction', type: 'string', required: true, example: 'En cours d’instruction' }
    ]
  },
  {
    id: 'rh:dossierAgent',
    label: 'Dossier Agent / Salarié',
    prefix: 'rh',
    namespace: 'http://www.alfresco.org/model/rh/1.0',
    description: 'Modèle pour la gestion administrative du personnel municipal.',
    fields: [
      { name: 'matriculeAgent', label: 'Matricule Agent', type: 'string', required: true, example: 'AG-2026-8910' },
      { name: 'nomAgent', label: 'Nom & Prénom', type: 'string', required: true, example: 'NZILA Samuel' },
      { name: 'serviceAffectation', label: 'Service d’Affectation', type: 'string', required: true, example: 'Direction des Systèmes d’Information' },
      { name: 'statutContrat', label: 'Statut Contrat', type: 'string', required: true, example: 'CDI Titulaire' }
    ]
  },
  {
    id: 'fin:factureMarche',
    label: 'Facture de Marché Public',
    prefix: 'fin',
    namespace: 'http://www.alfresco.org/model/finances/1.0',
    description: 'Modèle pour les pièces comptables et factures fournisseurs certifiées.',
    fields: [
      { name: 'numFacture', label: 'Numéro de Facture', type: 'string', required: true, example: 'FAC-2026-0412' },
      { name: 'fournisseur', label: 'Fournisseur Titulaire', type: 'string', required: true, example: 'EGEN Technologies SAS' },
      { name: 'montantTTC', label: 'Montant Total TTC (FCFA)', type: 'string', required: true, example: '45 000 000 FCFA' },
      { name: 'refMarche', label: 'Réf. Marché Public', type: 'string', required: true, example: 'MP-2026-04-GED' }
    ]
  }
];

export const ALFRESCO_ASPECTS_LIST = [
  { id: 'cm:versionable', label: 'Versionable (Historique des versions)', description: 'Active la conservation des numéros de version majeure/mineure et les commentaires de révision.' },
  { id: 'cm:auditable', label: 'Auditable (Traçabilité des accès)', description: 'Conserve créateur, modificateur, dates et empreintes d’intégrité SHA-256.' },
  { id: 'cm:dublincore', label: 'Dublin Core (Métadonnées standard)', description: 'Ajoute sujet, éditeur, contributeurs, droits et couverture temporelle/spatiale.' },
  { id: 'cm:taggable', label: 'Taggable (Étiquettes libres)', description: 'Permet d’assigner des mots-clés et tags transversaux.' },
  { id: 'cm:titled', label: 'Titled (Titre & Description)', description: 'Ajoute titre public et description d’usage aux documents et dossiers.' },
  { id: 'cm:lockable', label: 'Verrouillable (Check-in / Check-out)', description: 'Permet la réservation exclusive d’un fichier pour modification hors ligne.' },
  { id: 'dp:archivageLegal', label: 'Archivage Légal (DUA & Sort Final)', description: 'Garantit l’application des durées d’utilité administrative (DUA) et du sort final réglementaire.' },
  { id: 'dp:valeurProbatoire', label: 'Valeur Probatoire (Scellement Numérique)', description: 'Horodatage qualifié et scellement d’intégrité conformes aux normes d’archivage légal.' }
];
