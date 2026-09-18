import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useScroll, 
  useTransform, 
  motion 
} from 'motion/react';
import { 
  FilePlus2, 
  Edit3, 
  Trash2, 
  Eye, 
  FileCheck2, 
  Archive, 
  Clock, 
  ShieldCheck, 
  Layers, 
  ChevronRight, 
  Copy, 
  Check, 
  X, 
  FileText, 
  MapPin, 
  Fingerprint, 
  UserCheck, 
  ExternalLink,
  ShieldAlert,
  Send
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export type TimeGroupKey = 'TODAY' | 'YESTERDAY' | 'THIS_WEEK' | 'THIS_MONTH';

export interface RichUserAction {
  id: string;
  timeGroup: TimeGroupKey;
  type: 'CREATION' | 'MODIFICATION' | 'SIGNATURE' | 'CONSULTATION' | 'SUPPRESSION' | 'ARCHIVAGE' | 'COMMUNICATION';
  typeLabel: string;
  badgeClass: string;
  iconName: 'FilePlus2' | 'Edit3' | 'FileCheck2' | 'Eye' | 'Trash2' | 'Archive' | 'Send';
  title: string;
  documentReference: string;
  version?: string;
  fileFormat: string;
  fileSize: string;
  siteName: string;
  siteSlug: string;
  physicalLocation: {
    salle: string;
    rayon: string;
    casier: string;
    cote: string;
  };
  timestamp: string;
  relativeTime: string;
  operator: string;
  operatorRole: string;
  sha256: string;
  auditReason: string;
  securityLevel: 'Public' | 'Interne' | 'Confidentiel' | 'Diffusion Restreinte';
  status: 'Certifié' | 'Enregistré' | 'Horodaté' | 'Archivé';
  certificateDetails?: {
    certAuthority: string;
    standard: string;
    signatureDate: string;
  };
  deletionDetails?: {
    procVerbal: string;
    duaStatus: string;
    visaElimination: string;
  };
}

export interface ActionGroupConfig {
  key: TimeGroupKey;
  label: string;
  subLabel: string;
}

const SAMPLE_USER_ACTIONS: RichUserAction[] = [
  // ── AUJOURD'HUI ──
  {
    id: 'act-001',
    timeGroup: 'TODAY',
    type: 'SIGNATURE',
    typeLabel: 'SIGNATURE ÉLECTRONIQUE',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    iconName: 'FileCheck2',
    title: 'Arrêté Municipal N° 2026-089 — Délégation de signature voirie',
    documentReference: 'ARR-2026-MUN-089',
    version: 'v1.0 (Validé)',
    fileFormat: 'PDF/A-2b',
    fileSize: '3.4 Mo',
    siteName: 'Direction Générale',
    siteSlug: 'dir-gen',
    physicalLocation: {
      salle: 'Salle S01',
      rayon: 'Rayon R-02',
      casier: 'Casier C-04',
      cote: 'COT-DG-2026-A1'
    },
    timestamp: '18/09/2026 à 11:34:12',
    relativeTime: 'Il y a 18 min',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Ordonnateur / Administrateur SGAI',
    sha256: '9f83b2a5c4e109d784ef3381a93b482e9124a87c53d10a26bfe99a01e582c31d',
    auditReason: 'Apposition de visa de conformité et scellement probatoire conforme RGS**',
    securityLevel: 'Confidentiel',
    status: 'Certifié',
    certificateDetails: {
      certAuthority: 'Certigreffe Qualifié eIDAS eID-2026-FR',
      standard: 'PAdES-B-LT / SHA-256 avec horodatage RFC 3161',
      signatureDate: '18/09/2026 11:34:12 UTC+1'
    }
  },
  {
    id: 'act-002',
    timeGroup: 'TODAY',
    type: 'CREATION',
    typeLabel: 'CRÉATION DE DOCUMENT',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    iconName: 'FilePlus2',
    title: 'Acte de Naissance N° 1974-042 — Numérisation Registre Célestin',
    documentReference: 'ACT-EC-1974-042',
    version: 'v1.0',
    fileFormat: 'TIFF / PDF Multi-pages',
    fileSize: '14.8 Mo',
    siteName: 'État Civil & Citoyenneté',
    siteSlug: 'etat-civil',
    physicalLocation: {
      salle: 'Salle S02',
      rayon: 'Rayon R-05',
      casier: 'Casier C-12',
      cote: 'COT-EC-1974-REG'
    },
    timestamp: '18/09/2026 à 10:48:05',
    relativeTime: 'Il y a 1h',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Officier d\'État Civil délégué',
    sha256: 'd41d8cd98f00b204e9800998ecf8427e5e317c8a9234b07f87a8f114c2b99321',
    auditReason: 'Ingestion par scanner haute résolution 600 DPI & OCR sémantique Gemini',
    securityLevel: 'Interne',
    status: 'Enregistré'
  },
  {
    id: 'act-003',
    timeGroup: 'TODAY',
    type: 'MODIFICATION',
    typeLabel: 'MODIFICATION / VERSION 2.1',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    iconName: 'Edit3',
    title: 'Cahier des Clauses Particulières — Marché Rénovation Gymnase',
    documentReference: 'CCP-2026-AO-014',
    version: 'v2.1 (Indexation révisée)',
    fileFormat: 'DOCX / PDF Converti',
    fileSize: '5.6 Mo',
    siteName: 'Finances & Marchés',
    siteSlug: 'finances',
    physicalLocation: {
      salle: 'Salle S01',
      rayon: 'Rayon R-08',
      casier: 'Casier C-02',
      cote: 'COT-FIN-2026-M14'
    },
    timestamp: '18/09/2026 à 09:15:30',
    relativeTime: 'Il y a 2h',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Gestionnaire des marchés',
    sha256: '3a7b9c1d5e6f8a2b4c6e8013579bdf02468ace2468bdf013579ace2468bdf013',
    auditReason: 'Mise à jour des bordereaux de prix unitaires et recalcul automatique des allotissements',
    securityLevel: 'Interne',
    status: 'Horodaté'
  },

  // ── HIER ──
  {
    id: 'act-004',
    timeGroup: 'YESTERDAY',
    type: 'CONSULTATION',
    typeLabel: 'CONSULTATION & EXTRACTION',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    iconName: 'Eye',
    title: 'Plan Cadastral Sectoriel — Parcelle Cadastre B-214 Zone Franche',
    documentReference: 'CAD-2026-PARC-214',
    version: 'v3.0 (SIG)',
    fileFormat: 'AutoCAD DWG / PDF Vectoriel',
    fileSize: '32.1 Mo',
    siteName: 'Urbanisme & Cadastre',
    siteSlug: 'urbanisme',
    physicalLocation: {
      salle: 'Salle S03',
      rayon: 'Rayon R-01',
      casier: 'Casier C-09',
      cote: 'COT-URB-CAD-B214'
    },
    timestamp: '17/09/2026 à 16:42:19',
    relativeTime: 'Hier à 16:42',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Instructeur Droits du Sol',
    sha256: '7c89f0123456789abcdef0123456789abcdef0123456789abcdef0123456789a',
    auditReason: 'Visualisation de l\'emprise foncière et contrôle des servitudes d\'utilité publique',
    securityLevel: 'Public',
    status: 'Enregistré'
  },
  {
    id: 'act-005',
    timeGroup: 'YESTERDAY',
    type: 'ARCHIVAGE',
    typeLabel: 'VERSEMENT DÉFINITIF',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    iconName: 'Archive',
    title: 'Bordereau de Versement BV-042 — Délibérations du Conseil 2018-2020',
    documentReference: 'BV-2026-ARCH-042',
    version: 'v1.0 (Clôturé)',
    fileFormat: 'Archive Métier SIP / SEDA v2.2',
    fileSize: '184 Mo',
    siteName: 'Direction Générale',
    siteSlug: 'dir-gen',
    physicalLocation: {
      salle: 'Salle S04 (Haute Sécurité)',
      rayon: 'Rayon R-11',
      casier: 'Casier C-01',
      cote: 'COT-ARCH-BV042'
    },
    timestamp: '17/09/2026 à 14:10:00',
    relativeTime: 'Hier à 14:10',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Archiviste en chef / Cavaillier',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    auditReason: 'Transfert de conservation intermédiaire vers le magasin d\'archives définitives',
    securityLevel: 'Diffusion Restreinte',
    status: 'Archivé'
  },

  // ── CETTE SEMAINE ──
  {
    id: 'act-006',
    timeGroup: 'THIS_WEEK',
    type: 'SUPPRESSION',
    typeLabel: 'ÉLIMINATION CONTRÔLÉE (DUA)',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    iconName: 'Trash2',
    title: 'Bons de Commande Fournitures 2013 — DUA 10 ans Échue',
    documentReference: 'PURGE-2026-ELIM-018',
    version: 'Détruit avec PV légal',
    fileFormat: 'Journal d\'élimination PDF/A',
    fileSize: '820 Ko',
    siteName: 'Finances & Marchés',
    siteSlug: 'finances',
    physicalLocation: {
      salle: 'Magasin Central',
      rayon: 'Broyeur Certifié',
      casier: 'Bannette B-03',
      cote: 'PV-ELIM-2026-018'
    },
    timestamp: '16/09/2026 à 15:20:44',
    relativeTime: 'Mercredi 16/09',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Ordonnateur / Validateur DUA',
    sha256: '5d41402abc4b2a76b9719d911017c592efc67b070498b89e3a6c20ff6c5bf7e0',
    auditReason: 'Procès-verbal de destruction conforme au Code du Patrimoine art. L. 212-2',
    securityLevel: 'Interne',
    status: 'Enregistré',
    deletionDetails: {
      procVerbal: 'PV-ARCH-ELIM-2026-018 signé par le Directeur des Archives Départementales',
      duaStatus: 'DUA 10 ans expirée le 31/12/2023',
      visaElimination: 'Visa préfectoral accordé réf. PREF-ARC-2026-88'
    }
  },
  {
    id: 'act-007',
    timeGroup: 'THIS_WEEK',
    type: 'COMMUNICATION',
    typeLabel: 'PRÊT PHYSIQUE & COMMUNICATION',
    badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    iconName: 'Send',
    title: 'Dossier Permis de Construire PC-093-2024 — Sortie Salle de Lecture',
    documentReference: 'COM-2026-SORT-093',
    version: 'Sortie temporaire (15j)',
    fileFormat: 'Dossier Physique Papier + Index',
    fileSize: '1 Chemise (48 pièces)',
    siteName: 'Urbanisme & Cadastre',
    siteSlug: 'urbanisme',
    physicalLocation: {
      salle: 'Salle S03',
      rayon: 'Rayon R-04',
      casier: 'Casier C-10',
      cote: 'COT-URB-PC-2024-093'
    },
    timestamp: '15/09/2026 à 10:12:00',
    relativeTime: 'Mardi 15/09',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Agent de Salle de Lecture',
    sha256: 'bc910248aef01923847561029384756102938475610293847561029384756102',
    auditReason: 'Fiche de prêt signée par Me Giraud (Avocat au Barreau) pour consultation sur place',
    securityLevel: 'Interne',
    status: 'Enregistré'
  },

  // ── CE MOIS-CI ──
  {
    id: 'act-008',
    timeGroup: 'THIS_MONTH',
    type: 'CREATION',
    typeLabel: 'INGESTION EN LOT (SIP)',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    iconName: 'FilePlus2',
    title: 'Registres de Délibérations 2025 — Lot Annuel Numérisé',
    documentReference: 'LOT-2026-DELIB-2025',
    version: 'v1.0 (Scellé)',
    fileFormat: 'Package SIP SEDA 2.2 / PDF/A-3',
    fileSize: '412 Mo',
    siteName: 'Direction Générale',
    siteSlug: 'dir-gen',
    physicalLocation: {
      salle: 'Salle S01',
      rayon: 'Rayon R-01',
      casier: 'Casier C-01',
      cote: 'COT-DG-DELIB-2025'
    },
    timestamp: '08/09/2026 à 14:30:10',
    relativeTime: 'Le 08/09/2026',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Administrateur SGAI',
    sha256: 'a1b2c3d4e5f60718293a4b5c6d7e8f901234567890abcdef1234567890abcdef',
    auditReason: 'Ingestion en lot des 48 arrêtés et délibérations avec signatures conformes préfecture',
    securityLevel: 'Public',
    status: 'Archivé'
  },
  {
    id: 'act-009',
    timeGroup: 'THIS_MONTH',
    type: 'SIGNATURE',
    typeLabel: 'VISA D\'AUTORISATION PRÉFECTURALE',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    iconName: 'FileCheck2',
    title: 'Convention de Prêt d\'Archives Historiques au Musée Municipal',
    documentReference: 'CONV-2026-MUSEE-004',
    version: 'v1.0 (Signé)',
    fileFormat: 'PDF/A-2b Signé',
    fileSize: '4.2 Mo',
    siteName: 'Direction Générale',
    siteSlug: 'dir-gen',
    physicalLocation: {
      salle: 'Salle S04',
      rayon: 'Rayon R-12',
      casier: 'Casier C-05',
      cote: 'COT-DG-CONV-2026'
    },
    timestamp: '02/09/2026 à 09:45:00',
    relativeTime: 'Le 02/09/2026',
    operator: 'Vous (NZILA Samuel)',
    operatorRole: 'Conservateur en chef',
    sha256: '99887766554433221100aabbccddeeff00112233445566778899aabbccddeeff',
    auditReason: 'Accord de transfert temporaire pour l\'exposition du Centenaire de la Cité',
    securityLevel: 'Interne',
    status: 'Certifié'
  }
];

const ACTION_GROUPS_CONFIG: ActionGroupConfig[] = [
  { key: 'TODAY', label: "AUJOURD'HUI", subLabel: '18 SEPTEMBRE 2026' },
  { key: 'YESTERDAY', label: 'HIER', subLabel: '17 SEPTEMBRE 2026' },
  { key: 'THIS_WEEK', label: 'CETTE SEMAINE', subLabel: '14 - 16 SEPTEMBRE' },
  { key: 'THIS_MONTH', label: 'CE MOIS-CI', subLabel: 'SEPTEMBRE 2026' },
];

interface MyActionsSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments?: () => void;
  onQuickAction?: (actionName: string) => void;
}

export function MyActionsSection({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction
}: MyActionsSectionProps) {
  const navigate = useNavigate();
  const [inspectedAction, setInspectedAction] = useState<RichUserAction | null>(null);
  const [copiedShaId, setCopiedShaId] = useState<string | null>(null);

  // References for Aceternity-style dynamic timeline calculation
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [timelineHeight, setTimelineHeight] = useState(0);

  // ResizeObserver to calculate real scrollable height of the timeline content
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        setTimelineHeight(rect.height);
      }
    };

    updateHeight();

    if (contentRef.current && typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(contentRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Framer Motion scroll tracker inside the scrollable container
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start 10%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, timelineHeight]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const handleCopySha = (e: React.MouseEvent, sha: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(sha);
    setCopiedShaId(id);
    playXboxSound('toastSuccess');
    setTimeout(() => setCopiedShaId(null), 2000);
  };

  const handleOpenSite = (e: React.MouseEvent, siteSlug: string) => {
    e.stopPropagation();
    playXboxSound('select');
    navigate(`/sites/${siteSlug}`);
  };

  const handleInspect = (item: RichUserAction) => {
    playXboxSound('select');
    setActiveCardId(item.id);
    setInspectedAction(item);
  };

  const renderActionIcon = (iconName: string, className = "w-3.5 h-3.5") => {
    switch (iconName) {
      case 'FilePlus2': return <FilePlus2 className={className} />;
      case 'Edit3': return <Edit3 className={className} />;
      case 'FileCheck2': return <FileCheck2 className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'Trash2': return <Trash2 className={className} />;
      case 'Archive': return <Archive className={className} />;
      case 'Send': return <Send className={className} />;
      default: return <FileText className={className} />;
    }
  };

  return (
    <section className="w-full h-full flex-1 flex flex-col min-h-0 select-none relative bg-transparent font-sans">
      {/* ── Scrollable Timeline Container (Aceternity Pattern) ── */}
      <div 
        ref={containerRef}
        className="w-full flex-1 min-h-0 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar relative"
      >
        <div ref={contentRef} className="relative w-full pb-12 pt-2">
          {ACTION_GROUPS_CONFIG.map((groupConfig, groupIndex) => {
            const groupActions = SAMPLE_USER_ACTIONS.filter(item => item.timeGroup === groupConfig.key);
            if (groupActions.length === 0) return null;

            return (
              <div
                key={groupConfig.key}
                className={`flex flex-col md:flex-row justify-start ${
                  groupIndex === 0 ? 'pt-2 md:pt-4' : 'pt-8 md:pt-12'
                } gap-3 md:gap-8`}
              >
                {/* ── Left Column: Sticky Timeline Marker & Title ── */}
                <div className="sticky flex flex-row md:flex-col items-center md:items-start top-2 self-start z-30 min-w-[140px] md:w-56 shrink-0">
                  {/* Timeline Node Circle */}
                  <div className="h-7 w-7 sm:h-8 sm:w-8 absolute -left-[1px] sm:left-0 rounded-full bg-[#030907]/90 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(52,211,153,0.35)] backdrop-blur-md">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                  </div>

                  {/* Title & Period Label */}
                  <div className="pl-10 sm:pl-11 md:pl-11 flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm md:text-base font-bold font-mono tracking-wider text-emerald-300 uppercase">
                        {groupConfig.label}
                      </h3>
                      <span className="text-[7.5px] sm:text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {groupActions.length}
                      </span>
                    </div>
                    <span className="text-[8.5px] sm:text-[9.5px] font-mono text-white/50 tracking-tight mt-0.5">
                      {groupConfig.subLabel}
                    </span>
                  </div>
                </div>

                {/* ── Right Column: Rich Actions List ── */}
                <div className="relative pl-10 sm:pl-11 md:pl-0 pr-1 w-full min-w-0 flex-1">
                  <div className="divide-y-0">
                    {groupActions.map((item) => {
                      const isSelected = activeCardId === item.id;

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleInspect(item)}
                          onMouseEnter={() => {
                            playXboxSound('hover');
                            setActiveCardId(item.id);
                          }}
                          className={`py-3.5 sm:py-4 px-2 sm:px-3 bg-transparent transition-all duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 border-b border-white/10 group ${
                            isSelected
                              ? 'border-b-emerald-400 bg-emerald-500/[0.06]'
                              : 'hover:border-b-emerald-400/60 hover:bg-white/[0.02]'
                          }`}
                        >
                          {/* Left Col: Action Icon + Badge + Title + Reference */}
                          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xs flex items-center justify-center border shrink-0 ${item.badgeClass}`}>
                              {renderActionIcon(item.iconName, "w-3.5 h-3.5 sm:w-4 sm:h-4")}
                            </div>

                            <div className="min-w-0 flex-1">
                              {/* Badges & Timeline row */}
                              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                                <span className={`text-[7.5px] sm:text-[8.5px] font-mono font-bold px-1.5 sm:px-2 py-0.5 rounded-xs border truncate ${item.badgeClass}`}>
                                  {item.typeLabel}
                                </span>
                                <span className="text-[8px] sm:text-[9px] font-mono text-white/60 bg-white/[0.06] px-1.5 py-0.5 rounded-xs border border-white/10">
                                  {item.documentReference}
                                </span>
                                {item.version && (
                                  <span className="text-[8px] sm:text-[9px] font-mono text-emerald-300/90 font-medium">
                                    {item.version}
                                  </span>
                                )}
                                <span className="text-[8px] sm:text-[9px] font-mono text-white/40 ml-auto sm:ml-0 flex items-center gap-1">
                                  <Clock className="w-2.5 h-2.5 text-white/40" />
                                  <span>{item.relativeTime}</span>
                                </span>
                              </div>

                              {/* Action Title */}
                              <h4 className="text-white font-bold text-[11px] sm:text-[13px] tracking-normal group-hover:text-emerald-200 transition-colors my-1 leading-snug">
                                {item.title}
                              </h4>

                              {/* Rich Meta row: Site + Format + Location + Reason */}
                              <div className="flex items-center gap-2.5 sm:gap-3 mt-1 text-[8px] sm:text-[9px] font-mono text-white/60 overflow-x-auto no-scrollbar">
                                <span className="text-sky-300 flex items-center gap-1 shrink-0">
                                  <Layers className="w-3 h-3 text-sky-400" />
                                  <span>{item.siteName}</span>
                                </span>
                                <span className="text-white/20 shrink-0">•</span>
                                <span className="text-white/80 shrink-0">{item.fileFormat} ({item.fileSize})</span>
                                <span className="text-white/20 shrink-0">•</span>
                                <span className="text-amber-300/90 flex items-center gap-1 shrink-0" title="Localisation de conservation">
                                  <MapPin className="w-3 h-3 text-amber-400" />
                                  <span>{item.physicalLocation.salle} / {item.physicalLocation.casier}</span>
                                </span>
                                <span className="text-white/20 shrink-0">•</span>
                                <span className="text-white/50 truncate max-w-[220px] hidden md:inline">
                                  {item.auditReason}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right Col: SHA Hash snippet + Details Button */}
                          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1 sm:pt-0">
                            {/* Fingerprint snippet with copy */}
                            <button
                              type="button"
                              onClick={(e) => handleCopySha(e, item.sha256, item.id)}
                              className="flex items-center gap-1 text-[7.5px] sm:text-[8.5px] font-mono bg-black/40 hover:bg-black/60 px-2 py-1 rounded-xs border border-white/10 hover:border-emerald-400/50 text-white/50 hover:text-emerald-300 transition-colors cursor-pointer"
                              title={`Empreinte SHA-256 : ${item.sha256} (Cliquez pour copier)`}
                            >
                              <Fingerprint className="w-3 h-3 text-emerald-400" />
                              <span className="truncate max-w-[85px] sm:max-w-[95px]">
                                {copiedShaId === item.id ? 'COPIÉ !' : `sha256:${item.sha256.slice(0, 8)}...`}
                              </span>
                              {copiedShaId === item.id ? (
                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-2.5 h-2.5 text-white/30" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleInspect(item)}
                              className="px-2.5 sm:px-3 py-1 rounded-xs bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold border border-emerald-500/40 hover:border-emerald-400 text-[8.5px] sm:text-[9.5px] font-mono transition-all flex items-center gap-1 cursor-pointer shrink-0 shadow-sm"
                            >
                              <span>Fiche d'audit</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ── Vertical Timeline Beam & Rail Track (Aceternity Line) ── */}
          <div
            style={{
              height: timelineHeight > 0 ? `${timelineHeight}px` : '100%',
            }}
            className="absolute left-[13px] sm:left-[15px] top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-emerald-500/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_95%,transparent_100%)] pointer-events-none"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-emerald-400 via-teal-300 to-transparent from-[0%] via-[15%] rounded-full shadow-[0_0_12px_rgba(52,211,153,0.9)]"
            />
          </div>
        </div>
      </div>

      {/* ── MODAL / TIROIR D'INSPECTION DÉTAILLÉE DE L'ACTION ── */}
      {inspectedAction && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setInspectedAction(null)}
        >
          <div 
            className="w-full max-w-2xl bg-[#091512] border-2 border-emerald-400/80 rounded-[4px] p-3 sm:p-4 shadow-[0_0_30px_rgba(52,211,153,0.3)] text-white select-text"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xs flex items-center justify-center border ${inspectedAction.badgeClass}`}>
                  {renderActionIcon(inspectedAction.iconName, "w-4 h-4")}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-xs border ${inspectedAction.badgeClass}`}>
                      {inspectedAction.typeLabel}
                    </span>
                    <span className="text-[9px] font-mono text-white/60">
                      RÉF. {inspectedAction.documentReference}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      STATUT : {inspectedAction.status}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xs sm:text-sm mt-0.5">
                    {inspectedAction.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectedAction(null)}
                className="p-1 rounded-xs bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 py-3 text-[9px] sm:text-[10px] font-mono">
              {/* Box 1: Données d'exécution */}
              <div className="p-2 rounded-xs bg-black/40 border border-white/10 space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-1 pb-1 border-b border-white/10">
                  <UserCheck className="w-3 h-3" />
                  <span>OPÉRATEUR & CONTEXTE</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Agent exécutant :</span>
                  <span className="text-white font-bold">{inspectedAction.operator}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Habilitation :</span>
                  <span className="text-emerald-300">{inspectedAction.operatorRole}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Date & Heure exacte :</span>
                  <span className="text-white">{inspectedAction.timestamp}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Niveau de sécurité :</span>
                  <span className="text-amber-300">{inspectedAction.securityLevel}</span>
                </div>
              </div>

              {/* Box 2: Localisation Physique de Conservation */}
              <div className="p-2 rounded-xs bg-black/40 border border-white/10 space-y-1">
                <div className="text-amber-400 font-bold flex items-center gap-1 pb-1 border-b border-white/10">
                  <MapPin className="w-3 h-3" />
                  <span>CONSERVATION PHYSIQUE</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Salle d'archives :</span>
                  <span className="text-white font-bold">{inspectedAction.physicalLocation.salle}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Rayon / Travée :</span>
                  <span className="text-white">{inspectedAction.physicalLocation.rayon}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Casier / Boîte :</span>
                  <span className="text-white font-bold text-amber-300">{inspectedAction.physicalLocation.casier}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Cote d'inventaire :</span>
                  <span className="text-sky-300">{inspectedAction.physicalLocation.cote}</span>
                </div>
              </div>

              {/* Box 3: Empreinte numérique & SHA-256 */}
              <div className="col-span-1 sm:col-span-2 p-2 rounded-xs bg-black/50 border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Fingerprint className="w-3 h-3" />
                    <span>EMPREINTE NUMÉRIQUE SHA-256 (VALEUR PROBATOIRE)</span>
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleCopySha(e, inspectedAction.sha256, 'modal')}
                    className="text-[8px] bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-black px-1.5 py-0.2 rounded-xs border border-emerald-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copier l'empreinte</span>
                  </button>
                </div>
                <div className="p-1.5 rounded-xs bg-black border border-white/10 font-mono text-[8px] sm:text-[9px] text-emerald-300 break-all select-all">
                  {inspectedAction.sha256}
                </div>
              </div>

              {/* Box 4: Audit & Certificats additionnels si Signature ou Suppression */}
              {inspectedAction.certificateDetails && (
                <div className="col-span-1 sm:col-span-2 p-2 rounded-xs bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-300 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>SCELLEMENT ÉLECTRONIQUE QUALIFIÉ eIDAS</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[8.5px] text-white/80">
                    <div>• Autorité : <span className="text-emerald-200">{inspectedAction.certificateDetails.certAuthority}</span></div>
                    <div>• Standard : <span className="text-emerald-200">{inspectedAction.certificateDetails.standard}</span></div>
                    <div className="sm:col-span-2">• Horodatage qualifié : <span className="text-emerald-200">{inspectedAction.certificateDetails.signatureDate}</span></div>
                  </div>
                </div>
              )}

              {inspectedAction.deletionDetails && (
                <div className="col-span-1 sm:col-span-2 p-2 rounded-xs bg-rose-950/30 border border-rose-500/30 space-y-1">
                  <span className="text-rose-300 font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>JUSTIFICATIFS LÉGAUX D'ÉLIMINATION</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[8.5px] text-white/80">
                    <div>• PV : <span className="text-rose-200">{inspectedAction.deletionDetails.procVerbal}</span></div>
                    <div>• DUA : <span className="text-rose-200">{inspectedAction.deletionDetails.duaStatus}</span></div>
                    <div className="sm:col-span-2">• Visa : <span className="text-rose-200">{inspectedAction.deletionDetails.visaElimination}</span></div>
                  </div>
                </div>
              )}

              {/* Justification / Note d'audit */}
              <div className="col-span-1 sm:col-span-2 p-1.5 rounded-xs bg-white/[0.04] border border-white/10 text-white/70">
                <span className="text-white/40 font-bold mr-1">MOTIF DU REGISTRE D'AUDIT :</span>
                <span>{inspectedAction.auditReason}</span>
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono">
              <button
                type="button"
                onClick={(e) => handleOpenSite(e, inspectedAction.siteSlug)}
                className="px-2.5 py-1 rounded-xs bg-sky-500/20 text-sky-300 hover:bg-sky-500 hover:text-black font-bold border border-sky-500/40 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3 h-3" />
                <span>Ouvrir dans l'espace {inspectedAction.siteName}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>

              <button
                type="button"
                onClick={() => setInspectedAction(null)}
                className="px-3 py-1 rounded-xs bg-white/10 hover:bg-white/20 text-white font-bold transition-all cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
