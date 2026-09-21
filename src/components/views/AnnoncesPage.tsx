"use client";

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, 
  ArrowLeft, 
  AlertTriangle, 
  Bell, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  Users, 
  MapPin, 
  Building2, 
  Download, 
  ShieldAlert, 
  Send, 
  CheckCheck, 
  Sparkles, 
  Radio, 
  Info, 
  Calendar, 
  Newspaper, 
  X,
  Share2,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';

export type AnnonceType = 'alerte' | 'note' | 'direction' | 'changement' | 'rappel';
export type AnnoncePriority = 'critique' | 'haute' | 'normale';

export interface AnnonceItem {
  id: string;
  title: string;
  type: AnnonceType;
  priority: AnnoncePriority;
  publishedAt: string;
  timestamp: string;
  emitter: string;
  emitterRole: string;
  summary: string;
  content: string;
  targetServices: string[];
  targetRoles: string[];
  targetLocations: string[];
  requiresAcknowledgement: boolean;
  acknowledgedCount: number;
  totalTargetCount: number;
  userAcknowledged: boolean;
  attachedDocument?: {
    name: string;
    size: string;
    refNumber: string;
  };
}

const INITIAL_ANNONCES: AnnonceItem[] = [
  {
    id: 'ann-1',
    title: '🚨 Maintenance d\'urgence de l\'infrastructure GED & Baies de stockage',
    type: 'alerte',
    priority: 'critique',
    publishedAt: 'Il y a 25 minutes',
    timestamp: '21 Septembre 2026 à 09:15',
    emitter: 'Amour Samuel NZILA',
    emitterRole: 'Chef de Département GED & Archivage Numérique',
    summary: 'Intervention d\'urgence pour optimisation des serveurs d\'archivage 3D et synchronisation des casiers.',
    content: 'Une opération de maintenance technique et de renforcement des clusters de stockage sera effectuée ce soir entre 22h00 et 23h30. Les accès en écriture aux dossiers numériques et au module d\'ingestion seront suspendus pendant cette plage. Les consultations locales restent disponibles.',
    targetServices: ['Tous les services', 'DSI', 'Exploitation'],
    targetRoles: ['Tous collaborateurs'],
    targetLocations: ['Tous les sites (Siège Central & Agences)'],
    requiresAcknowledgement: true,
    acknowledgedCount: 142,
    totalTargetCount: 168,
    userAcknowledged: false,
    attachedDocument: {
      name: 'Note_Technique_Intervention_GED_S42.pdf',
      size: '1.4 Mo',
      refNumber: 'DSI/INFRA/2026-089'
    }
  },
  {
    id: 'ann-2',
    title: 'Directive Direction Générale : Protocole de numérisation et signature certifiée',
    type: 'direction',
    priority: 'haute',
    publishedAt: 'Aujourd\'hui à 08:30',
    timestamp: '21 Septembre 2026 à 08:30',
    emitter: 'Direction Générale',
    emitterRole: 'Secrétariat Général & Affaires Juridiques',
    summary: 'Rappel de la conformité réglementaire concernant la validité légale des bordereaux de versement numérisés.',
    content: 'À compter du 1er octobre 2026, tout bordereau de transfert d\'archives physiques vers les magasins de conservation doit obligatoirement comporter le sceau numérique et la double signature du chef de service émetteur et du conservateur des archives.',
    targetServices: ['Direction Générale', 'Services Métiers', 'Comptabilité', 'RH'],
    targetRoles: ['Directeurs', 'Chefs de service', 'Responsables de site'],
    targetLocations: ['Siège Central Brazzaville'],
    requiresAcknowledgement: true,
    acknowledgedCount: 48,
    totalTargetCount: 52,
    userAcknowledged: true,
    attachedDocument: {
      name: 'Circulaire_DG_Signature_Certifiee_v2.pdf',
      size: '850 Ko',
      refNumber: 'DG/SG/CIR-2026-014'
    }
  },
  {
    id: 'ann-3',
    title: 'Changement de procédure : Déclaration des congés et absences Q4',
    type: 'changement',
    priority: 'normale',
    publishedAt: 'Hier à 16:45',
    timestamp: '20 Septembre 2026 à 16:45',
    emitter: 'Département RH',
    emitterRole: 'Direction des Ressources Humaines',
    summary: 'Déploiement du nouveau portail libre-service RH pour les demandes de congés de fin d\'année.',
    content: 'Le formulaire papier de demande de congés est définitivement supprimé. Toutes les demandes pour la période d\'octobre à décembre 2026 doivent désormais être saisies directement via l\'application RH intégrée de l\'intranet au plus tard le 10 octobre.',
    targetServices: ['Tous les services'],
    targetRoles: ['Tous collaborateurs'],
    targetLocations: ['Tous les sites'],
    requiresAcknowledgement: false,
    acknowledgedCount: 156,
    totalTargetCount: 168,
    userAcknowledged: true,
    attachedDocument: {
      name: 'Guide_Utilisateur_Portail_Conges_2026.pdf',
      size: '2.1 Mo',
      refNumber: 'RH/COM-2026-055'
    }
  },
  {
    id: 'ann-4',
    title: 'Rappel de sécurité : Campagne de renouvellement des clés d\'accès IAM',
    type: 'rappel',
    priority: 'haute',
    publishedAt: 'Il y a 2 jours',
    timestamp: '19 Septembre 2026 à 10:00',
    emitter: 'Sécurité des Systèmes d\'Information',
    emitterRole: 'Pôle Cybersécurité & Conformité',
    summary: 'Échéance fixée à ce vendredi pour la réinitialisation des mots de passe et validation 2FA.',
    content: 'Dans le cadre de l\'application de la politique de sécurité des systèmes d\'information de l\'entreprise, tous les collaborateurs n\'ayant pas encore activé l\'authentification multifacteur (MFA) sur leur compte intranet doivent se conformer avant vendredi 18h sous peine de suspension temporaire des accès distants.',
    targetServices: ['Tous les services'],
    targetRoles: ['Utilisateurs intranet & prestataires'],
    targetLocations: ['Tous les sites'],
    requiresAcknowledgement: true,
    acknowledgedCount: 129,
    totalTargetCount: 168,
    userAcknowledged: false
  },
  {
    id: 'ann-5',
    title: 'Note de service : Horaires d\'ouverture et accès aux Magasins d\'Archives',
    type: 'note',
    priority: 'normale',
    publishedAt: 'Il y a 3 jours',
    timestamp: '18 Septembre 2026 à 14:20',
    emitter: 'Conservation & Documentation',
    emitterRole: 'Service des Archives Physiques',
    summary: 'Nouveaux créneaux de consultation physique en salle de lecture pour les agents autorisés.',
    content: 'Les consultations de documents physiques en salle de lecture S-01 s\'effectueront désormais exclusivement sur rendez-vous réservé via l\'application Agenda de l\'intranet, du lundi au jeudi de 08h30 à 15h30. Les vendredis sont consacrés au traitement matériel et au récolement.',
    targetServices: ['Juridique', 'RH', 'Finances & Comptabilité', 'Audit'],
    targetRoles: ['Chargés d\'études', 'Auditeurs', 'Archivistes'],
    targetLocations: ['Magasin Central S-01 (Sous-sol)'],
    requiresAcknowledgement: false,
    acknowledgedCount: 88,
    totalTargetCount: 95,
    userAcknowledged: true,
    attachedDocument: {
      name: 'Reglement_Interieur_Salles_Archives.pdf',
      size: '620 Ko',
      refNumber: 'ARCH/REG-2026-03'
    }
  }
];

export function AnnoncesPage() {
  const navigate = useNavigate();
  const [annonces, setAnnonces] = useState<AnnonceItem[]>(INITIAL_ANNONCES);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');
  const [activePriorityFilter, setActivePriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for new announcement
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<AnnonceType>('alerte');
  const [newPriority, setNewPriority] = useState<AnnoncePriority>('haute');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newService, setNewService] = useState('Tous les services');
  const [newRole, setNewRole] = useState('Tous collaborateurs');
  const [newLocation, setNewLocation] = useState('Tous les sites');
  const [newRequiresAck, setNewRequiresAck] = useState(true);
  const [newNotifyTransversal, setNewNotifyTransversal] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter logic
  const filteredAnnonces = useMemo(() => {
    return annonces.filter((item) => {
      // Type filter
      if (activeTypeFilter !== 'all' && item.type !== activeTypeFilter) return false;
      // Priority filter
      if (activePriorityFilter !== 'all' && item.priority !== activePriorityFilter) return false;
      // Service filter
      if (selectedService !== 'all' && !item.targetServices.includes(selectedService) && !item.targetServices.includes('Tous les services')) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchSummary = item.summary.toLowerCase().includes(query);
        const matchContent = item.content.toLowerCase().includes(query);
        const matchEmitter = item.emitter.toLowerCase().includes(query);
        if (!matchTitle && !matchSummary && !matchContent && !matchEmitter) return false;
      }
      return true;
    });
  }, [annonces, activeTypeFilter, activePriorityFilter, selectedService, searchQuery]);

  // Handle Acknowledgement toggle
  const handleAcknowledge = (id: string) => {
    playXboxSound('select');
    setAnnonces(prev => prev.map(item => {
      if (item.id === id) {
        const nextState = !item.userAcknowledged;
        showToast(
          nextState 
            ? 'Prise de connaissance enregistrée avec succès.' 
            : 'Prise de connaissance retirée.'
        );
        return {
          ...item,
          userAcknowledged: nextState,
          acknowledgedCount: nextState ? item.acknowledgedCount + 1 : Math.max(0, item.acknowledgedCount - 1)
        };
      }
      return item;
    }));
  };

  // Handle Transversal Notification trigger
  const handleSendReminderNotification = (item: AnnonceItem) => {
    playXboxSound('notification');
    showToast(
      `📢 Notification transversale envoyée avec succès aux destinataires ciblés (${item.targetServices.join(', ')}).`
    );
  };

  // Submit New Annonce
  const handlePublishAnnonce = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Veuillez renseigner le titre et le contenu de l\'annonce.');
      return;
    }

    const newItem: AnnonceItem = {
      id: `ann-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      priority: newPriority,
      publishedAt: 'À l\'instant',
      timestamp: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      emitter: 'Direction & Administration',
      emitterRole: 'Émetteur d\'annonce accrédité',
      summary: newSummary.trim() || newTitle.trim(),
      content: newContent.trim(),
      targetServices: [newService],
      targetRoles: [newRole],
      targetLocations: [newLocation],
      requiresAcknowledgement: newRequiresAck,
      acknowledgedCount: 0,
      totalTargetCount: 168,
      userAcknowledged: false
    };

    setAnnonces(prev => [newItem, ...prev]);
    setIsPublishModalOpen(false);
    playXboxSound('toastSuccess');

    if (newNotifyTransversal) {
      showToast(
        `📢 Annonce publiée ! Mécanisme de notification transverse déclenché pour ${newService}.`
      );
    } else {
      showToast('📢 Annonce publiée dans le flux officiel.');
    }

    // Reset fields
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  // Helper styles
  const getTypeBadge = (type: AnnonceType) => {
    switch (type) {
      case 'alerte':
        return {
          label: 'Alerte Urgente',
          color: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          icon: AlertTriangle
        };
      case 'direction':
        return {
          label: 'Communication Direction',
          color: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
          icon: Building2
        };
      case 'changement':
        return {
          label: 'Changement Opérationnel',
          color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          icon: Radio
        };
      case 'rappel':
        return {
          label: 'Rappel Obligatoire',
          color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: Clock
        };
      case 'note':
      default:
        return {
          label: 'Note Interne',
          color: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          icon: FileText
        };
    }
  };

  const getPriorityBadge = (priority: AnnoncePriority) => {
    switch (priority) {
      case 'critique':
        return {
          label: 'Priorité Critique',
          color: 'bg-red-600 text-white'
        };
      case 'haute':
        return {
          label: 'Haute Priorité',
          color: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
        };
      case 'normale':
      default:
        return {
          label: 'Standard',
          color: 'bg-slate-700/50 text-slate-300 border border-slate-600/40'
        };
    }
  };

  const urgentAlert = annonces.find(a => a.type === 'alerte' && a.priority === 'critique');

  return (
    <div className="w-full h-full overflow-y-auto p-3 sm:p-5 md:p-8 bg-[#070e17] text-white flex flex-col gap-6 font-sans">
      
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 max-w-md bg-slate-900/95 backdrop-blur-xl border border-teal-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm"
          >
            <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300">
              <Megaphone className="w-4 h-4" />
            </div>
            <div className="flex-1 font-medium">{toastMessage}</div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADER DE NAVIGATION & TITRE ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-start sm:items-center gap-3">
          <button
            onClick={() => {
              playXboxSound('back');
              navigate('/');
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 mt-0.5 sm:mt-0"
            title="Retour au portail"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-400/30">
                <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                Annonces & Directives
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                Avertir & Cibler
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Canal de diffusion directe et ciblée : notes de service, alertes urgentes, rappels obligatoires et communications de la Direction.
            </p>
          </div>
        </div>

        {/* Bouton d'action principal */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              playXboxSound('select');
              setIsPublishModalOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/30 border border-teal-400/40 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Diffuser une annonce</span>
          </button>
        </div>
      </div>

      {/* ── BANNIÈRE FLASH INFO / ALERTE CRITIQUE ACTIVE (SI EXISTE) ── */}
      {urgentAlert && (
        <div className="w-full bg-gradient-to-r from-rose-950/80 via-rose-900/50 to-slate-900 border border-rose-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-lg animate-pulse shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-600 text-white">
                    Alerte Prioritaire Active
                  </span>
                  <span className="text-xs text-rose-300 font-medium">
                    {urgentAlert.timestamp}
                  </span>
                  <span className="text-xs text-slate-400">
                    • Émis par {urgentAlert.emitter} ({urgentAlert.emitterRole})
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {urgentAlert.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {urgentAlert.content}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-300 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-rose-400" />
                    Cibles : <strong className="text-white">{urgentAlert.targetServices.join(', ')}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {urgentAlert.targetLocations.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Boutons d'interaction de l'alerte */}
            <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
              <button
                onClick={() => handleAcknowledge(urgentAlert.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  urgentAlert.userAcknowledged
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-white text-slate-950 border-white hover:bg-slate-200'
                }`}
              >
                {urgentAlert.userAcknowledged ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
                    <span>Prise d'acte confirmée</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmer la lecture</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleSendReminderNotification(urgentAlert)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-rose-200 border border-white/10 transition-colors"
                title="Rappel transversal aux destinataires"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION D'ARCHITECTURE PÉDAGOGIQUE DISCRÈTE (ALIGNÉE SUR LE REQUIS UTILISATEUR) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02]">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>📢 Annonces</span>
              <span className="text-[10px] text-teal-400 bg-teal-500/10 px-1.5 py-0.2 rounded font-normal">Page active</span>
            </div>
            <p className="text-slate-400 text-[11px]">Avertir & cibler • Information immédiate et ciblée</p>
          </div>
        </div>

        <button 
          onClick={() => { playXboxSound('select'); navigate('/actualites'); }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 transition-colors text-left group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300 group-hover:bg-sky-500/30">
            <Newspaper className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
              <span>📰 Actualités & Publications</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </div>
            <p className="text-slate-400 text-[11px]">Informer & expliquer • Information durable et éditorialisée</p>
          </div>
        </button>

        <button 
          onClick={() => { playXboxSound('select'); navigate('/calendrier'); }}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/10 transition-colors text-left group cursor-pointer"
        >
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/30">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
              <span>📅 Agenda</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
            </div>
            <p className="text-slate-400 text-[11px]">Planifier & synchroniser • Dimension temporelle et événementielle</p>
          </div>
        </button>
      </div>

      {/* ── BARRE DE CONTRÔLE : RECHERCHE & FILTRES MULTI-CRITÈRES ── */}
      <div className="flex flex-col gap-3.5 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Recherche */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une directive, note, service ou émetteur..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtres déroulants : Service ciblé & Priorité */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5 text-teal-400" />
              <span>Ciblage :</span>
            </div>

            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
            >
              <option value="all" className="bg-slate-900 text-white">Tous les services</option>
              <option value="DSI" className="bg-slate-900 text-white">DSI & Métiers IT</option>
              <option value="Direction Générale" className="bg-slate-900 text-white">Direction Générale</option>
              <option value="RH" className="bg-slate-900 text-white">Ressources Humaines</option>
              <option value="Exploitation" className="bg-slate-900 text-white">Exploitation</option>
              <option value="Juridique" className="bg-slate-900 text-white">Juridique</option>
            </select>

            <select
              value={activePriorityFilter}
              onChange={(e) => setActivePriorityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-teal-400"
            >
              <option value="all" className="bg-slate-900 text-white">Toutes priorités</option>
              <option value="critique" className="bg-slate-900 text-white">Critique</option>
              <option value="haute" className="bg-slate-900 text-white">Haute priorité</option>
              <option value="normale" className="bg-slate-900 text-white">Standard</option>
            </select>
          </div>
        </div>

        {/* Pilules de catégories d'annonces */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {[
            { key: 'all', label: 'Toutes les annonces', count: annonces.length },
            { key: 'alerte', label: 'Alertes & Urgences', count: annonces.filter(a => a.type === 'alerte').length },
            { key: 'direction', label: 'Direction Générale', count: annonces.filter(a => a.type === 'direction').length },
            { key: 'note', label: 'Notes internes', count: annonces.filter(a => a.type === 'note').length },
            { key: 'changement', label: 'Changements opérationnels', count: annonces.filter(a => a.type === 'changement').length },
            { key: 'rappel', label: 'Rappels obligatoires', count: annonces.filter(a => a.type === 'rappel').length }
          ].map((tab) => {
            const isActive = activeTypeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  playXboxSound('toggle');
                  setActiveTypeFilter(tab.key);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                    : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── LISTE PRINCIPALE DES ANNONCES CIBLÉES ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Affichage de <strong>{filteredAnnonces.length}</strong> annonce{filteredAnnonces.length > 1 ? 's' : ''} ciblée{filteredAnnonces.length > 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <CheckCheck className="w-3.5 h-3.5 text-teal-400" />
            Émargement et prise de connaissance horodatés
          </span>
        </div>

        {filteredAnnonces.length === 0 ? (
          <div className="w-full text-center py-16 px-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center">
            <div className="p-4 rounded-2xl bg-white/5 text-slate-500 mb-3">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="text-base font-semibold text-white">Aucune annonce ne correspond à ces critères</h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Modifiez vos filtres de ciblage ou la recherche textuelle pour visualiser d'autres communications.
            </p>
            <button
              onClick={() => {
                setActiveTypeFilter('all');
                setActivePriorityFilter('all');
                setSelectedService('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAnnonces.map((annonce) => {
              const typeBadge = getTypeBadge(annonce.type);
              const priorityBadge = getPriorityBadge(annonce.priority);
              const TypeIcon = typeBadge.icon;
              const ackPercentage = Math.round((annonce.acknowledgedCount / annonce.totalTargetCount) * 100);

              return (
                <div
                  key={annonce.id}
                  className={`rounded-2xl border transition-all overflow-hidden flex flex-col gap-4 p-4 sm:p-5 ${
                    annonce.userAcknowledged 
                      ? 'bg-slate-900/40 border-white/10 hover:border-white/20' 
                      : 'bg-slate-900/80 border-teal-500/30 hover:border-teal-500/50 shadow-lg'
                  }`}
                >
                  {/* Top Bar de l'annonce : Tags, Types, Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Badge Type */}
                      <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${typeBadge.color}`}>
                        <TypeIcon className="w-3 h-3" />
                        <span>{typeBadge.label}</span>
                      </span>

                      {/* Badge Priorité */}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${priorityBadge.color}`}>
                        {priorityBadge.label}
                      </span>

                      {/* Horodatage */}
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {annonce.publishedAt}
                      </span>
                    </div>

                    {/* Émetteur */}
                    <div className="text-xs text-slate-300 flex items-center gap-1.5">
                      <span className="text-slate-500">Émis par :</span>
                      <strong className="text-white">{annonce.emitter}</strong>
                      <span className="text-[11px] text-teal-400">({annonce.emitterRole})</span>
                    </div>
                  </div>

                  {/* Corps de l'annonce */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {annonce.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {annonce.content}
                    </p>
                  </div>

                  {/* Fichier attaché si présent */}
                  {annonce.attachedDocument && (
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10 max-w-xl">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white truncate">
                            {annonce.attachedDocument.name}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2">
                            <span>Réf. {annonce.attachedDocument.refNumber}</span>
                            <span>•</span>
                            <span>{annonce.attachedDocument.size}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          playXboxSound('select');
                          showToast(`Téléchargement de ${annonce.attachedDocument?.name}...`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer shrink-0"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Télécharger</span>
                      </button>
                    </div>
                  )}

                  {/* Ciblage & Émargement */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2 border-t border-white/10">
                    {/* Cibles */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-teal-400" />
                        <span>Services ciblés :</span>
                        <strong className="text-slate-200">{annonce.targetServices.join(', ')}</strong>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>Rôles :</span>
                        <strong className="text-slate-200">{annonce.targetRoles.join(', ')}</strong>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-slate-300">{annonce.targetLocations.join(', ')}</span>
                      </div>
                    </div>

                    {/* Actions & Prise d'acte */}
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Jauge d'accusé de lecture */}
                      {annonce.requiresAcknowledgement && (
                        <div className="hidden sm:flex flex-col items-end text-[11px] text-slate-400">
                          <span className="text-slate-300">
                            Prise d'acte : <strong>{annonce.acknowledgedCount}/{annonce.totalTargetCount}</strong> ({ackPercentage}%)
                          </span>
                          <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
                            <div 
                              className="h-full bg-teal-500 rounded-full transition-all duration-500" 
                              style={{ width: `${ackPercentage}%` }} 
                            />
                          </div>
                        </div>
                      )}

                      {/* Bouton de confirmation de lecture / émargement */}
                      {annonce.requiresAcknowledgement ? (
                        <button
                          onClick={() => handleAcknowledge(annonce.id)}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                            annonce.userAcknowledged
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-teal-600 hover:bg-teal-500 text-white border-teal-400/50 shadow-md'
                          }`}
                        >
                          {annonce.userAcknowledged ? (
                            <>
                              <CheckCheck className="w-4 h-4 text-emerald-400" />
                              <span>Pris acte</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Prendre acte</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 italic">
                          Information pour consultation
                        </span>
                      )}

                      {/* Déclencheur transversal de notification */}
                      <button
                        onClick={() => handleSendReminderNotification(annonce)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
                        title="Envoyer un rappel de notification transversal aux personnes ciblées"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── MODAL : DIFFUSER UNE NOUVELLE ANNONCE CIBLÉE ── */}
      <AnimatePresence>
        {isPublishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl p-4 sm:p-6 text-white max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Émettre une annonce ciblée</h2>
                    <p className="text-xs text-slate-400">Diffusion directe avec ciblage par service, rôle et site</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPublishModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePublishAnnonce} className="space-y-4 text-xs sm:text-sm">
                {/* Titre */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Titre de l'annonce ou de la directive *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex: Note de service - Clôture trimestrielle des bordereaux d'archivage"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 text-xs sm:text-sm"
                  />
                </div>

                {/* Type & Priorité */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Typologie de communication
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as AnnonceType)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white text-xs sm:text-sm"
                    >
                      <option value="alerte">🚨 Alerte & Information urgente</option>
                      <option value="note">📝 Note interne & Circulaire</option>
                      <option value="direction">🏛️ Communication de la Direction</option>
                      <option value="changement">⚙️ Changement opérationnel</option>
                      <option value="rappel">⏰ Rappel obligatoire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Niveau de priorité
                    </label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as AnnoncePriority)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-white text-xs sm:text-sm"
                    >
                      <option value="critique">Critique (Bannière d'alerte flash)</option>
                      <option value="haute">Haute priorité</option>
                      <option value="normale">Standard</option>
                    </select>
                  </div>
                </div>

                {/* Ciblage : Services, Rôles, Localisation */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Ciblage précis des destinataires</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Service ciblé</label>
                      <select
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-xs text-white"
                      >
                        <option value="Tous les services">Tous les services</option>
                        <option value="DSI">DSI & Technique</option>
                        <option value="Direction Générale">Direction Générale</option>
                        <option value="RH">Ressources Humaines</option>
                        <option value="Finance & Comptabilité">Finance & Comptabilité</option>
                        <option value="Exploitation">Exploitation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Rôle ciblé</label>
                      <select
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-xs text-white"
                      >
                        <option value="Tous collaborateurs">Tous collaborateurs</option>
                        <option value="Directeurs & Managers">Directeurs & Managers</option>
                        <option value="Chefs de projet">Chefs de projet</option>
                        <option value="Utilisateurs GED">Utilisateurs GED</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Site / Localisation</label>
                      <select
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-xs text-white"
                      >
                        <option value="Tous les sites">Tous les sites</option>
                        <option value="Siège Central Brazzaville">Siège Central</option>
                        <option value="Direction Régionale Pointe-Noire">Direction Régionale</option>
                        <option value="Magasin Archives S-01">Magasin S-01</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contenu détaillé */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Corps de l'annonce / Directive complète *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Détaillez ici les instructions, échéances, procédures ou mesures à appliquer..."
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-400 text-xs sm:text-sm"
                  />
                </div>

                {/* Options transversales */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={newRequiresAck}
                      onChange={(e) => setNewRequiresAck(e.target.checked)}
                      className="rounded border-white/20 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Exiger un accusé de lecture obligatoire (Prise d'acte / Émargement numérique)</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={newNotifyTransversal}
                      onChange={(e) => setNewNotifyTransversal(e.target.checked)}
                      className="rounded border-white/20 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-teal-400" />
                      <span>Déclencher le mécanisme de notification transversal auprès des collaborateurs ciblés</span>
                    </span>
                  </label>
                </div>

                {/* Boutons d'action */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsPublishModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-900/40 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publier et diffuser</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
export default AnnoncesPage;
