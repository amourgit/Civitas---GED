import { IngestionSession } from '../types/ingestion';

export const initialIngestionSession: IngestionSession = {
  id: '#S-2025-09-06-001',
  name: "Session d'ingestion",
  status: 'ACTIVE',
  createdAt: 'Sam. 6 Sept. 2025 • 15:20',
  createdBy: 'Amour Samuel NZILA NGALA',
  type: 'Mixte (Scan + Fichiers + Cloud)',
  storageUsed: '24,8 Go',
  storageTotal: '100 Go',
  documents: [
    {
      id: 'ing-1',
      filename: 'Contrat_partenaire.pdf',
      size: '2,4 Mo',
      format: 'pdf',
      formatBadge: 'PDF',
      thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: 'Contrat de partenariat',
        date: '2025-08-12',
        auteur: 'Service Juridique',
        pages: 12,
        departement: 'Juridique'
      },
      status: 'pending',
      extractedData: {
        rawText: `CONTRAT DE PARTENARIAT STRATÉGIQUE ET D'EXPANSION DIGITALE\n\nEntre les soussignés :\n1. La société EGEN SOLUTIONS SA, immatriculée au registre du commerce...\n2. La société CIVITAS TECHNOLOGIES, représentée par M. le Directeur Général...\n\nArticle 1 - Objet de l'accord :\nLe présent contrat a pour objet d'encadrer la coopération technique et le déploiement de la solution logicielle GoFAST GED...`,
        structured: {
          'Type d’acte': 'Contrat commercial bilatéral',
          'Partie A': 'EGEN SOLUTIONS SA',
          'Partie B': 'CIVITAS TECHNOLOGIES',
          'Date d’effet': '01 Septembre 2025',
          'Durée contractuelle': '24 mois renouvelable',
          'Montant estimé': '4 500 000 FCFA',
          'Lieu de juridiction': 'Tribunal de Commerce'
        },
        entities: [
          { label: 'Organisation', value: 'CIVITAS TECHNOLOGIES', confidence: 99 },
          { label: 'Date', value: '12 août 2025', confidence: 98 },
          { label: 'Devise/Montant', value: '4 500 000 FCFA', confidence: 96 },
          { label: 'Loi applicable', value: 'Droit commercial OHADA', confidence: 94 }
        ],
        tags: ['Contrat', 'Partenariat', 'Juridique', 'Confidentiel'],
        classification: 'Contrat commercial / Légal',
        ocrConfidence: 98.4
      }
    },
    {
      id: 'ing-2',
      filename: 'IMG_4587.jpg',
      size: '1,8 Mo',
      format: 'jpg',
      formatBadge: 'JPG',
      thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: "Photo de l'équipe",
        date: '2025-08-11',
        auteur: 'Amour NZILA NGALA',
        pages: 1,
        departement: 'Ressources Humaines'
      },
      status: 'pending',
      extractedData: {
        rawText: `METADONNÉES IMAGE & EXIF :\nAppareil : Sony Alpha 7 IV\nObjectif : FE 24-70mm F2.8 GM\nRésolution : 4000x2667 (10.7 MP)\nEspace colorimétrique : sRGB\nLieu : Siège Social EGEN / CIVITAS, Plateau`,
        structured: {
          'Type d’image': 'Photographie Corporate',
          'Résolution': '4000 x 2667 px',
          'Personnes détectées': '8 collaborateurs',
          'Événement': 'Lancement Q3 Direction',
          'Droit à l’image': 'Conforme & signé'
        },
        entities: [
          { label: 'Personne', value: 'Amour NZILA NGALA', confidence: 97 },
          { label: 'Lieu', value: 'Plateau, Brazzaville', confidence: 92 }
        ],
        tags: ['Équipe', 'Communication', 'Photo', 'Q3'],
        classification: 'Média / Photographie Corporate',
        ocrConfidence: 94.2
      }
    },
    {
      id: 'ing-3',
      filename: 'Facture_2025-08-10.pdf',
      size: '1,2 Mo',
      format: 'pdf',
      formatBadge: 'PDF',
      thumbnailUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: 'Facture Fournisseur',
        date: '2025-08-10',
        auteur: 'Comptabilité',
        pages: 2,
        departement: 'Finance'
      },
      status: 'pending',
      extractedData: {
        rawText: `FACTURE N° FAC-2025-0810-99\nÉmetteur : INFRA CLOUD SOLUTIONS SAS\nClient : CIVITAS / EGEN DOCUMENTS\nDate d'émission : 10 Août 2025\nDate d'échéance : 31 Août 2025\n\nDésignation : Hébergement serveurs dédiés Cloud Run haute disponibilité\nMontant HT : 1 250 000 FCFA\nTVA (18%) : 225 000 FCFA\nTotal TTC : 1 475 000 FCFA\nStatut : À payer`,
        structured: {
          'Numéro Facture': 'FAC-2025-0810-99',
          'Fournisseur': 'INFRA CLOUD SOLUTIONS SAS',
          'Total HT': '1 250 000 FCFA',
          'Taux TVA': '18 %',
          'Total TTC': '1 475 000 FCFA',
          'Modalité': 'Virement bancaire 30 jours'
        },
        entities: [
          { label: 'Numéro Facture', value: 'FAC-2025-0810-99', confidence: 99 },
          { label: 'Montant TTC', value: '1 475 000 FCFA', confidence: 99 },
          { label: 'Fournisseur', value: 'INFRA CLOUD SOLUTIONS', confidence: 97 }
        ],
        tags: ['Facture', 'Fournisseur', 'Finance', 'Comptabilité'],
        classification: 'Comptabilité / Facture d’achat',
        ocrConfidence: 99.1
      }
    },
    {
      id: 'ing-4',
      filename: 'Logo_Civitas.png',
      size: '540 Ko',
      format: 'png',
      formatBadge: 'PNG',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: 'Logo CIVITAS',
        date: '2025-08-09',
        auteur: 'Communication',
        pages: 1,
        departement: 'Marketing'
      },
      status: 'pending',
      extractedData: {
        rawText: `ACTIF GRAPHIQUE OFFICIEL - LOGO MARQUE CIVITAS\nVersion vectorielle et raster transparente.\nAccompagné du monogramme néon vert #4ADE80 et de la police de titrage officielle.`,
        structured: {
          'Nom de marque': 'CIVITAS',
          'Variante': 'Fond transparent dark mode',
          'Format': 'PNG-24 avec canal Alpha',
          'Couleur clé': '#4ADE80 (Emerald Glow)',
          'Utilisation': 'Papeterie, web, enseigne'
        },
        entities: [
          { label: 'Marque', value: 'CIVITAS', confidence: 99 },
          { label: 'Couleur primaire', value: '#4ade80', confidence: 95 }
        ],
        tags: ['Branding', 'Logo', 'Design', 'Communication'],
        classification: 'Charte Graphique / Logo',
        ocrConfidence: 97.0
      }
    },
    {
      id: 'ing-5',
      filename: 'Rapport_activite.docx',
      size: '3,1 Mo',
      format: 'docx',
      formatBadge: 'DOCX',
      thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: "Rapport d'activité",
        date: '2025-08-08',
        auteur: 'Direction',
        pages: 34,
        departement: 'Direction Générale'
      },
      status: 'pending',
      extractedData: {
        rawText: `RAPPORT D'ACTIVITÉ SEMESTRIEL - S1 2025\nDirection Générale - EGEN DOCUMENTS / CIVITAS\n\n1. Faits marquants du semestre :\n- Croissance de 32% des utilisateurs actifs sur la plateforme GoFAST\n- Taux de satisfaction client de 96,4%\n- Déploiement de 4 nouveaux connecteurs cloud et intégration de l'OCR IA hybride...`,
        structured: {
          'Période': 'Semestre 1 2025',
          'Auteur principal': 'Direction Générale',
          'Indicateur Clé 1': '32% de croissance',
          'Taux Satisfaction': '96,4 %',
          'Nombre d’annexes': '4 documents'
        },
        entities: [
          { label: 'Période', value: 'S1 2025', confidence: 98 },
          { label: 'Département', value: 'Direction Générale', confidence: 97 }
        ],
        tags: ['Rapport', 'Gouvernance', 'KPI', 'Direction'],
        classification: 'Gouvernance / Rapport semestriel',
        ocrConfidence: 96.8
      }
    },
    {
      id: 'ing-6',
      filename: 'Planning_projet.xlsx',
      size: '980 Ko',
      format: 'xlsx',
      formatBadge: 'XLSX',
      thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: 'Planning projet',
        date: '2025-08-07',
        auteur: 'Chef de projet',
        pages: 5,
        departement: 'Projets'
      },
      status: 'pending',
      extractedData: {
        rawText: `FEUILLE DE CALCUL : PLANNING GANTT PROJET DÉPLOIEMENT GED 2025\nFeuilles détectées :\n1. Diagramme_Gantt\n2. Ressources_Humaines\n3. Jalons_Validation\n4. Suivi_Budgets\n\nJalon critique : Mise en production officielle le 15 Octobre 2025.`,
        structured: {
          'Type de tableur': 'Gantt / Gestion de projet',
          'Jalons identifiés': '8 jalons majeurs',
          'Date de mise en prod': '15 Octobre 2025',
          'Ressources allouées': '14 personnes',
          'Taux d’avancement global': '68 %'
        },
        entities: [
          { label: 'Date jalon', value: '15 Octobre 2025', confidence: 99 },
          { label: 'Responsable', value: 'Chef de projet senior', confidence: 94 }
        ],
        tags: ['Planning', 'Projets', 'Gantt', 'Opérations'],
        classification: 'Gestion de projet / Feuille de route',
        ocrConfidence: 98.9
      }
    },
    {
      id: 'ing-7',
      filename: 'Presentation.pptx',
      size: '5,6 Mo',
      format: 'pptx',
      formatBadge: 'PPTX',
      thumbnailUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: 'Présentation stratégique',
        date: '2025-08-06',
        auteur: 'Direction',
        pages: 28,
        departement: 'Stratégie'
      },
      status: 'pending',
      extractedData: {
        rawText: `SLIDES STRATÉGIE DE TRANSFORMATION NUMÉRIQUE 2026-2030\nPlan d'action pour la souveraineté des données, l'accélération des processus GED et la conformité aux normes ISO 27001.\nDiapositive 4 : Architecture de sécurité zéro trust et cryptage bout en bout.`,
        structured: {
          'Audience': 'Comité de Direction & Partenaires',
          'Nombre de slides': '28 diapositives',
          'Thématique': 'Transformation Numérique',
          'Norme ciblée': 'ISO 27001 & RGPD',
          'Confidentialité': 'Niveau 3 - Interne Strict'
        },
        entities: [
          { label: 'Norme', value: 'ISO 27001', confidence: 98 },
          { label: 'Horizon temporel', value: '2026-2030', confidence: 95 }
        ],
        tags: ['Présentation', 'Stratégie', 'ISO27001', 'Vision'],
        classification: 'Stratégie / Présentation Conseil',
        ocrConfidence: 95.7
      }
    },
    {
      id: 'ing-8',
      filename: 'Attestation.pdf',
      size: '1,1 Mo',
      format: 'pdf',
      formatBadge: 'PDF',
      thumbnailUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&auto=format&fit=crop&q=75',
      metadata: {
        nom: 'Attestation de formation',
        date: '2025-08-05',
        auteur: 'RH',
        pages: 1,
        departement: 'Ressources Humaines'
      },
      status: 'pending',
      extractedData: {
        rawText: `RÉPUBLIQUE DU CONGO - MINISTÈRE DE L'ENSEIGNEMENT\nATTESTATION OFFICIELLE DE FORMATION CONTINUE EN CYBERSÉCURITÉ ET GED AVANCÉE\n\nNous certifions que M. NZILA NGALA Amour Samuel a suivi avec succès le cycle de formation de 40 heures sur la Sécurité des Systèmes d'Information et l'Administration de Plateforme GED...`,
        structured: {
          'Bénéficiaire': 'Amour Samuel NZILA NGALA',
          'Intitulé formation': 'Cybersécurité & Administration GED',
          'Organisme certificateur': 'Institut National de Formation',
          'Heures validées': '40 heures',
          'Date d’obtention': '05 Août 2025'
        },
        entities: [
          { label: 'Bénéficiaire', value: 'Amour Samuel NZILA NGALA', confidence: 100 },
          { label: 'Mention', value: 'Très Honorable avec Félicitations', confidence: 96 }
        ],
        tags: ['RH', 'Formation', 'Certificat', 'Sécurité'],
        classification: 'RH / Attestation & Diplôme',
        ocrConfidence: 99.5
      }
    }
  ]
};
