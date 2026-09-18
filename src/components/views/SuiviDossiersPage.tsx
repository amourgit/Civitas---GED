import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardList, 
  ArrowLeft, 
  Search, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  FileText, 
  Archive,
  ArrowRight,
  RotateCcw,
  Building,
  Check,
  Calendar,
  AlertTriangle,
  History,
  FolderCheck,
  FolderOpen,
  MapPin,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export type SuiviTabType = 'en_cours' | 'clotures' | 'archives' | 'sortis' | 'a_retourner' | 'historique';

interface MouvementSortie {
  id: string;
  referenceDossier: string;
  titreDossier: string;
  serviceDemandeur: string;
  agentEmprunteur: string;
  dateSortie: string;
  motif: string;
  emplacementTemporaire: string;
  dateRetourPrevue: string;
  dateRetourEffective?: string;
  status: 'Sorti' | 'Retourné' | 'En retard';
  spatialOrigin: {
    salle: string;
    rayon: string;
    casier: string;
    cote: string;
  };
}

interface DossierSuivi {
  id: string;
  reference: string;
  titre: string;
  service: string;
  serviceCode: string;
  agentResponsable: string;
  status: 'En cours' | 'Clôturé' | 'Archivé';
  dateCreation: string;
  dateCloture?: string;
  dateVersement?: string;
  spatialArchivage?: {
    salle: string;
    rayon: string;
    casier: string;
    cote: string;
  };
}

const INITIAL_DOSSIERS: DossierSuivi[] = [
  {
    id: 'd-01',
    reference: 'URB-2026-00421',
    titre: 'Permis de construire — Complexe Médical Quartier Nord',
    service: 'Urbanisme & foncier',
    serviceCode: 'URB',
    agentResponsable: 'Jérôme BERNARD (Instructeur)',
    status: 'Archivé',
    dateCreation: '15/04/2026',
    dateCloture: '28/06/2026',
    dateVersement: '15/07/2026',
    spatialArchivage: {
      salle: 'Salle 02 (Technique & Travaux)',
      rayon: 'Rayon 04',
      casier: 'Casier 12',
      cote: 'PC 2026 / 00421'
    }
  },
  {
    id: 'd-02',
    reference: 'EC-2026-001246',
    titre: 'Dossier de mariage civil — Laurent & Céline',
    service: 'État civil',
    serviceCode: 'EC',
    agentResponsable: 'Chantal LELONG (Officier)',
    status: 'En cours',
    dateCreation: '10/09/2026'
  },
  {
    id: 'd-03',
    reference: 'RH-2026-AG-0142',
    titre: 'Dossier individuel de carrière — M. François TCHIKAYA',
    service: 'Ressources humaines',
    serviceCode: 'RH',
    agentResponsable: 'Sophie MARTIN (DRH)',
    status: 'Archivé',
    dateCreation: '02/01/2018',
    dateCloture: '01/08/2026',
    dateVersement: '10/08/2026',
    spatialArchivage: {
      salle: 'Salle 01 (Centrale Administrative)',
      rayon: 'Rayon 01',
      casier: 'Casier 1012',
      cote: 'RH AG-0142'
    }
  },
  {
    id: 'd-04',
    reference: 'FIN-2026-MAR-089',
    titre: 'Marché Public #2026-089 — Rénovation Éclairage Public LED',
    service: 'Finances & Marchés',
    serviceCode: 'FIN',
    agentResponsable: 'Karim BENALOUANE (Chef de service)',
    status: 'En cours',
    dateCreation: '22/08/2026'
  },
  {
    id: 'd-05',
    reference: 'CM-2026-09-15',
    titre: 'Session Ordinaire du Conseil Municipal — 15 Septembre 2026',
    service: 'Conseil municipal',
    serviceCode: 'CM',
    agentResponsable: 'Secrétariat Général',
    status: 'Clôturé',
    dateCreation: '01/09/2026',
    dateCloture: '16/09/2026'
  },
  {
    id: 'd-06',
    reference: 'EC-2026-001245',
    titre: 'Acte de naissance — Alexandre MAVOUNGOU',
    service: 'État civil',
    serviceCode: 'EC',
    agentResponsable: 'Patrice MAVOUNGOU',
    status: 'Archivé',
    dateCreation: '12/09/2026',
    dateCloture: '14/09/2026',
    dateVersement: '15/09/2026',
    spatialArchivage: {
      salle: 'Salle 01 (Centrale Administrative)',
      rayon: 'Rayon 01',
      casier: 'Casier 1012',
      cote: '4 E 1245 / 2026'
    }
  },
  {
    id: 'd-07',
    reference: 'URB-2026-DP-0112',
    titre: 'Déclaration préalable de travaux — Ravalement Façade Hôtel de Ville',
    service: 'Urbanisme & foncier',
    serviceCode: 'URB',
    agentResponsable: 'Gilles MONGIN (Technicien)',
    status: 'Clôturé',
    dateCreation: '12/07/2026',
    dateCloture: '30/08/2026'
  }
];

const INITIAL_MOUVEMENTS: MouvementSortie[] = [
  {
    id: 'm-01',
    referenceDossier: 'URB-2026-00421',
    titreDossier: 'Permis de construire — Complexe Médical Quartier Nord',
    serviceDemandeur: 'Urbanisme & foncier',
    agentEmprunteur: 'M. Jérôme BERNARD (Instructeur)',
    dateSortie: '12/09/2026',
    motif: 'Instruction de recours gracieux des riverains',
    emplacementTemporaire: 'Bureau 204 — Bâtiment B (Urbanisme)',
    dateRetourPrevue: '26/09/2026',
    status: 'Sorti',
    spatialOrigin: {
      salle: 'Salle 02',
      rayon: 'Rayon 04',
      casier: 'Casier 12',
      cote: 'PC 2026 / 00421'
    }
  },
  {
    id: 'm-02',
    referenceDossier: 'RH-2026-AG-0142',
    titreDossier: 'Dossier individuel — M. François TCHIKAYA',
    serviceDemandeur: 'Ressources humaines',
    agentEmprunteur: 'Mme Sophie MARTIN (DRH)',
    dateSortie: '05/09/2026',
    motif: 'Préparation du dossier de départ en retraite',
    emplacementTemporaire: 'Pôle Carrières & Paie (Bureau 12)',
    dateRetourPrevue: '15/09/2026',
    status: 'En retard',
    spatialOrigin: {
      salle: 'Salle 01',
      rayon: 'Rayon 01',
      casier: 'Casier 1012',
      cote: 'RH AG-0142'
    }
  },
  {
    id: 'm-03',
    referenceDossier: 'CM-2025-12-08',
    titreDossier: 'Procès-verbal du Conseil Municipal du 08/12/2025',
    serviceDemandeur: 'Direction Générale',
    agentEmprunteur: 'Secrétariat du Maire',
    dateSortie: '01/09/2026',
    motif: 'Vérification de délibération subventions associatives',
    emplacementTemporaire: 'Hôtel de Ville — Cabinet du Maire',
    dateRetourPrevue: '08/09/2026',
    dateRetourEffective: '07/09/2026',
    status: 'Retourné',
    spatialOrigin: {
      salle: 'Salle 01',
      rayon: 'Rayon 02',
      casier: 'Casier 08',
      cote: 'DELIB-2025-12'
    }
  }
];

export function SuiviDossiersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SuiviTabType>('sortis');
  const [searchQuery, setSearchQuery] = useState('');
  const [mouvements, setMouvements] = useState<MouvementSortie[]>(INITIAL_MOUVEMENTS);
  const [dossiers] = useState<DossierSuivi[]>(INITIAL_DOSSIERS);
  
  const [showSortieModal, setShowSortieModal] = useState(false);
  const [selectedDossierRef, setSelectedDossierRef] = useState('URB-2026-00421');
  const [newAgent, setNewAgent] = useState('');
  const [newService, setNewService] = useState('Urbanisme & foncier');
  const [newMotif, setNewMotif] = useState('');
  const [newEmplacement, setNewEmplacement] = useState('');
  const [newDateRetour, setNewDateRetour] = useState('01/10/2026');

  // Counts for tabs
  const dossiersEnCours = dossiers.filter(d => d.status === 'En cours');
  const dossiersClotures = dossiers.filter(d => d.status === 'Clôturé');
  const dossiersArchives = dossiers.filter(d => d.status === 'Archivé');
  const dossiersSortis = mouvements.filter(m => m.status === 'Sorti' || m.status === 'En retard');
  const dossiersARetourner = mouvements.filter(m => m.status === 'En retard');
  const historique = mouvements;

  // Handle return to shelf action (Retour au casier)
  const handleRetourAuCasier = (mouvementId: string) => {
    playXboxSound('toastSuccess');
    setMouvements(prev => prev.map(m => {
      if (m.id === mouvementId) {
        return {
          ...m,
          status: 'Retourné',
          dateRetourEffective: new Date().toLocaleDateString('fr-FR')
        };
      }
      return m;
    }));
  };

  // Handle new checkout (Sortie de dossier)
  const handleCreateSortie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgent || !newMotif || !newEmplacement) return;

    playXboxSound('select');
    const dossierRef = dossiers.find(d => d.reference === selectedDossierRef);

    const newMouvement: MouvementSortie = {
      id: `m-${Date.now()}`,
      referenceDossier: selectedDossierRef,
      titreDossier: dossierRef?.titre || 'Dossier sélectionné',
      serviceDemandeur: newService,
      agentEmprunteur: newAgent,
      dateSortie: new Date().toLocaleDateString('fr-FR'),
      motif: newMotif,
      emplacementTemporaire: newEmplacement,
      dateRetourPrevue: newDateRetour,
      status: 'Sorti',
      spatialOrigin: dossierRef?.spatialArchivage || {
        salle: 'Salle 01',
        rayon: 'Rayon 02',
        casier: 'Casier 05',
        cote: dossierRef?.reference || 'SGAI-ARCH'
      }
    };

    setMouvements([newMouvement, ...mouvements]);
    setShowSortieModal(false);
    setNewAgent('');
    setNewMotif('');
    setNewEmplacement('');
    setActiveTab('sortis');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#030708] text-white overflow-hidden select-none">
      
      {/* 1. Header Bar */}
      <div className="w-full bg-[#070d14] border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playXboxSound('back');
              navigate('/');
            }}
            className="p-1.5 rounded-[2px] bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Accueil</span>
          </button>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs font-mono">SGAI</span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-amber-400 font-bold text-xs flex items-center gap-1">
              <ClipboardList className="w-3.5 h-3.5" />
              SUIVI DES DOSSIERS
            </span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-white/80 text-xs font-mono capitalize">
              {activeTab === 'sortis' && 'Dossiers sortis des archives'}
              {activeTab === 'en_cours' && 'Dossiers en cours'}
              {activeTab === 'clotures' && 'Dossiers clôturés'}
              {activeTab === 'archives' && 'Dossiers archivés'}
              {activeTab === 'a_retourner' && 'Dossiers à retourner'}
              {activeTab === 'historique' && 'Historique des mouvements'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playXboxSound('select');
            setShowSortieModal(true);
          }}
          className="px-3 py-1.5 rounded-[2px] bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.35)] transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Enregistrer une sortie physique</span>
        </button>
      </div>

      {/* 2. Top Banner with KPIs */}
      <div className="bg-[#050b12] border-b border-white/10 px-6 py-4 shrink-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-amber-400" />
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Suivi des Dossiers & Mouvements des Archives
              </h1>
            </div>
            <p className="text-xs text-white/60 mt-1">
              Traçabilité complète du cycle de vie : de l'instruction en service à la conservation en casier et aux sorties physiques.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-[3px] bg-white/[0.04] border border-white/10 flex items-center gap-2">
              <span className="text-xs text-white/60">Sortis d'archives :</span>
              <span className="text-sm font-bold font-mono text-amber-400">{dossiersSortis.length}</span>
            </div>
            <div className="px-3 py-1.5 rounded-[3px] bg-rose-500/15 border border-rose-500/30 flex items-center gap-2">
              <span className="text-xs text-rose-300">À retourner (retard) :</span>
              <span className="text-sm font-bold font-mono text-rose-400">{dossiersARetourner.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs (Exact 6 tabs requested by user) */}
      <div className="w-full bg-[#08121e] border-b border-white/10 px-6 shrink-0 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-1 py-2">
          
          <button
            type="button"
            onClick={() => { playXboxSound('toggle'); setActiveTab('en_cours'); }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'en_cours'
                ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)] font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Dossiers en cours</span>
            <span className="px-1.5 py-0.2 rounded-xs text-[10px] font-mono bg-black/20">
              {dossiersEnCours.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { playXboxSound('toggle'); setActiveTab('clotures'); }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'clotures'
                ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)] font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            <span>Dossiers clôturés</span>
            <span className="px-1.5 py-0.2 rounded-xs text-[10px] font-mono bg-black/20">
              {dossiersClotures.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { playXboxSound('toggle'); setActiveTab('archives'); }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'archives'
                ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)] font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Dossiers archivés</span>
            <span className="px-1.5 py-0.2 rounded-xs text-[10px] font-mono bg-black/20">
              {dossiersArchives.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { playXboxSound('toggle'); setActiveTab('sortis'); }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'sortis'
                ? 'bg-amber-400 text-black shadow-[0_0_10px_rgba(245,158,11,0.4)] font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Dossiers sortis des archives</span>
            <span className="px-1.5 py-0.2 rounded-xs text-[10px] font-mono bg-black/20 font-bold">
              {dossiersSortis.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => { playXboxSound('toggle'); setActiveTab('a_retourner'); }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'a_retourner'
                ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)] font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Dossiers à retourner</span>
            {dossiersARetourner.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-xs text-[10px] font-mono bg-rose-600 text-white font-bold animate-pulse">
                {dossiersARetourner.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => { playXboxSound('toggle'); setActiveTab('historique'); }}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'historique'
                ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)] font-bold'
                : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historique des mouvements</span>
            <span className="px-1.5 py-0.2 rounded-xs text-[10px] font-mono bg-black/20">
              {historique.length}
            </span>
          </button>

        </div>
      </div>

      {/* 4. Main Tab Content Container with Spacious Layout */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-6xl mx-auto w-full space-y-8">
        
        {/* Search & Filter Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par référence, titre, cote ou agent..."
              className="w-full bg-[#050b12] border border-white/10 rounded-[3px] pl-9 pr-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="text-xs text-white/50 font-mono hidden sm:block">
            Système de traçabilité spatiale SGAI
          </div>
        </div>

        {/* TAB 1: DOSSIERS SORTIS DES ARCHIVES (Coeur de la demande utilisateur) */}
        {activeTab === 'sortis' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                Dossiers actuellement sortis de leur casier
              </h2>
              <span className="text-xs text-white/50">
                {dossiersSortis.length} dossier(s) en consultation physique
              </span>
            </div>

            {dossiersSortis.length === 0 ? (
              <div className="p-8 text-center border border-white/10 rounded-[3px] bg-[#050b12] text-white/60">
                Aucun dossier physique n'est actuellement sorti. Tous les dossiers sont dans leur casier respectif.
              </div>
            ) : (
              <div className="space-y-4">
                {dossiersSortis.map(m => (
                  <div 
                    key={m.id}
                    className={`p-5 rounded-[3px] border transition-all ${
                      m.status === 'En retard'
                        ? 'bg-[#180a0e] border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : 'bg-[#09111c] border-white/10 hover:border-amber-400/50'
                    }`}
                  >
                    {/* Header: Title + Status + Cote */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">
                            {m.referenceDossier}
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="text-xs text-white/70 font-mono px-1.5 py-0.2 rounded bg-white/[0.06]">
                            COTE : {m.spatialOrigin.cote}
                          </span>
                          {m.status === 'En retard' && (
                            <span className="px-2 py-0.5 rounded-[2px] bg-rose-500/25 text-rose-300 text-[10px] font-mono font-bold border border-rose-500/40 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              RETOUR DÉPASSÉ
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1">
                          {m.titreDossier}
                        </h3>
                      </div>

                      {/* ACTION: RETOUR AU CASIER */}
                      <button
                        type="button"
                        onClick={() => handleRetourAuCasier(m.id)}
                        className="px-3.5 py-2 rounded-[2px] bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(34,197,94,0.35)] transition-all shrink-0 self-start sm:self-center"
                      >
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                        <span>Retour au casier</span>
                      </button>
                    </div>

                    {/* Physical Tracking Workflow Flow (As requested by user) */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
                      
                      {/* 1. Emplacement physique d'origine (Salle -> Rayon -> Casier) */}
                      <div className="p-2.5 rounded-[2px] bg-purple-950/20 border border-purple-500/20 text-xs">
                        <span className="text-[10px] font-mono text-purple-300 block uppercase font-bold">
                          Origine spatiale
                        </span>
                        <div className="mt-1 font-mono text-[11px] text-white flex items-center gap-1">
                          <span>{m.spatialOrigin.salle}</span>
                          <span className="text-white/40">→</span>
                          <span>{m.spatialOrigin.casier}</span>
                        </div>
                      </div>

                      {/* 2. Agent / Service */}
                      <div className="p-2.5 rounded-[2px] bg-white/[0.02] border border-white/[0.06] text-xs">
                        <span className="text-[10px] font-mono text-white/50 block uppercase">
                          Agent / Service
                        </span>
                        <span className="mt-1 font-semibold text-white block truncate">
                          {m.agentEmprunteur}
                        </span>
                        <span className="text-[10px] text-white/60 block">
                          {m.serviceDemandeur}
                        </span>
                      </div>

                      {/* 3. Date de sortie */}
                      <div className="p-2.5 rounded-[2px] bg-white/[0.02] border border-white/[0.06] text-xs">
                        <span className="text-[10px] font-mono text-white/50 block uppercase">
                          Date de sortie
                        </span>
                        <span className="mt-1 font-mono text-white font-bold block">
                          {m.dateSortie}
                        </span>
                        <span className="text-[10px] text-white/40 block">
                          Enregistré par archiviste
                        </span>
                      </div>

                      {/* 4. Emplacement temporaire */}
                      <div className="p-2.5 rounded-[2px] bg-white/[0.02] border border-white/[0.06] text-xs">
                        <span className="text-[10px] font-mono text-sky-400 block uppercase font-bold">
                          Emplacement temporaire
                        </span>
                        <span className="mt-1 text-white block truncate font-medium">
                          {m.emplacementTemporaire}
                        </span>
                        <span className="text-[10px] text-white/50 block truncate">
                          Motif : {m.motif}
                        </span>
                      </div>

                      {/* 5. Date de retour */}
                      <div className={`p-2.5 rounded-[2px] border text-xs ${
                        m.status === 'En retard'
                          ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                          : 'bg-white/[0.02] border-white/[0.06] text-white'
                      }`}>
                        <span className="text-[10px] font-mono block uppercase font-bold opacity-80">
                          Date de retour prévue
                        </span>
                        <span className="mt-1 font-mono font-bold block text-sm">
                          {m.dateRetourPrevue}
                        </span>
                        <span className="text-[10px] opacity-70 block">
                          {m.status === 'En retard' ? 'Délai dépassé !' : 'Délai respecté'}
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DOSSIERS EN COURS */}
        {activeTab === 'en_cours' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-emerald-400" />
                Dossiers en cours d'instruction
              </h2>
              <span className="text-xs text-white/50">
                {dossiersEnCours.length} dossier(s) actif(s)
              </span>
            </div>

            <div className="border border-white/10 rounded-[3px] bg-[#050b12] overflow-hidden">
              <div className="divide-y divide-white/[0.06]">
                {dossiersEnCours.map(d => (
                  <div key={d.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#22c55e]">
                          {d.reference}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/70">{d.service}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{d.titre}</h4>
                      <p className="text-xs text-white/50">
                        Responsable : <span className="text-white/70">{d.agentResponsable}</span> • Créé le {d.dateCreation}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-[2px] bg-sky-500/20 text-sky-300 text-[10px] font-mono border border-sky-500/30">
                        INSTRUCTION ACTIVE
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          playXboxSound('select');
                          navigate('/dossiers');
                        }}
                        className="px-2.5 py-1 rounded-[2px] bg-white/[0.06] hover:bg-white/15 text-xs text-white flex items-center gap-1 cursor-pointer"
                      >
                        <span>Consulter le dossier métier</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOSSIERS CLÔTURÉS */}
        {activeTab === 'clotures' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <FolderCheck className="w-4 h-4 text-sky-400" />
                Dossiers clôturés en attente de versement aux archives
              </h2>
              <span className="text-xs text-white/50">
                {dossiersClotures.length} dossier(s) clôturé(s)
              </span>
            </div>

            <div className="border border-white/10 rounded-[3px] bg-[#050b12] overflow-hidden">
              <div className="divide-y divide-white/[0.06]">
                {dossiersClotures.map(d => (
                  <div key={d.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-sky-400">
                          {d.reference}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/70">{d.service}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/50">Clôturé le {d.dateCloture}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{d.titre}</h4>
                      <p className="text-xs text-white/50">
                        Responsable : <span className="text-white/70">{d.agentResponsable}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-[2px] bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                        À VERSER AUX ARCHIVES
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          playXboxSound('select');
                          navigate('/depots');
                        }}
                        className="px-2.5 py-1 rounded-[2px] bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Préparer bordereau</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DOSSIERS ARCHIVÉS */}
        {activeTab === 'archives' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Archive className="w-4 h-4 text-purple-400" />
                Dossiers versés aux archives et cotés
              </h2>
              <span className="text-xs text-white/50">
                {dossiersArchives.length} dossier(s) archivé(s)
              </span>
            </div>

            <div className="border border-white/10 rounded-[3px] bg-[#050b12] overflow-hidden">
              <div className="divide-y divide-white/[0.06]">
                {dossiersArchives.map(d => (
                  <div key={d.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-purple-300">
                          {d.reference}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/70">{d.service}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs font-mono text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                          COTE : {d.spatialArchivage?.cote}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{d.titre}</h4>
                      
                      {/* Spatial breadcrumb */}
                      <div className="flex items-center gap-1.5 text-xs text-white/60 font-mono">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        <span>{d.spatialArchivage?.salle}</span>
                        <span className="text-white/30">→</span>
                        <span>{d.spatialArchivage?.rayon}</span>
                        <span className="text-white/30">→</span>
                        <span className="text-purple-300 font-bold">{d.spatialArchivage?.casier}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        playXboxSound('select');
                        navigate('/documentation/salles');
                      }}
                      className="px-3 py-1.5 rounded-[2px] bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Archive className="w-3.5 h-3.5 text-purple-400" />
                      <span>Localiser dans les archives</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DOSSIERS À RETOURNER (ALERTES & RETARDS) */}
        {activeTab === 'a_retourner' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
              <h2 className="text-sm font-bold text-rose-300 uppercase font-mono tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Alertes de retards & Dossiers à réintégrer d'urgence
              </h2>
              <span className="text-xs text-rose-400 font-mono">
                {dossiersARetourner.length} retard(s) constaté(s)
              </span>
            </div>

            {dossiersARetourner.length === 0 ? (
              <div className="p-8 text-center border border-white/10 rounded-[3px] bg-[#050b12] text-white/60">
                Aucun retard à signaler. Tous les dossiers sortis sont dans les délais autorisés.
              </div>
            ) : (
              <div className="space-y-3">
                {dossiersARetourner.map(m => (
                  <div key={m.id} className="p-5 rounded-[3px] bg-gradient-to-r from-rose-950/30 via-[#10070b] to-[#070b12] border border-rose-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-[2px] bg-rose-500/30 text-rose-300 text-[10px] font-mono font-bold">
                          DÉLAI EXPIRÉ LE {m.dateRetourPrevue}
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
                          {m.referenceDossier}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{m.titreDossier}</h4>
                      <p className="text-xs text-rose-200/80">
                        Détenu par : <strong className="text-white">{m.agentEmprunteur}</strong> ({m.serviceDemandeur})
                      </p>
                      <p className="text-xs text-white/60 font-mono">
                        Emplacement actuel : {m.emplacementTemporaire}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          playXboxSound('select');
                          alert(`Relance envoyée à l'agent : ${m.agentEmprunteur}`);
                        }}
                        className="px-3 py-1.5 rounded-[2px] bg-white/[0.08] hover:bg-white/15 text-xs text-white border border-white/10 cursor-pointer"
                      >
                        Envoyer relance
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRetourAuCasier(m.id)}
                        className="px-3 py-1.5 rounded-[2px] bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Confirmer retour au casier</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 6: HISTORIQUE DES MOUVEMENTS */}
        {activeTab === 'historique' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <History className="w-4 h-4 text-teal-400" />
                Journal chronologique des mouvements et sorties
              </h2>
              <span className="text-xs text-white/50 font-mono">
                Audit trail officiel SGAI
              </span>
            </div>

            <div className="border border-white/10 rounded-[3px] bg-[#050b12] overflow-hidden">
              <div className="divide-y divide-white/[0.06]">
                {historique.map(h => (
                  <div key={h.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">{h.referenceDossier}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/60 font-mono">Cote : {h.spatialOrigin.cote}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/70">{h.serviceDemandeur}</span>
                      </div>
                      <p className="font-medium text-white">{h.titreDossier}</p>
                      <p className="text-white/50 text-[11px]">
                        Sorti par : {h.agentEmprunteur} • Emplacement temp. : {h.emplacementTemporaire}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold ${
                        h.status === 'Retourné' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : h.status === 'En retard'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {h.status === 'Retourné' ? `RÉINTÉGRÉ LE ${h.dateRetourEffective}` : h.status.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-white/40 block mt-1 font-mono">
                        Sortie le {h.dateSortie}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: Enregistrer une sortie physique */}
      {showSortieModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#07111c] border-2 border-amber-400/80 rounded-[4px] p-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <RotateCcw className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  Sortie physique de dossier d'archive
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSortieModal(false)}
                className="text-white/50 hover:text-white text-xs cursor-pointer font-mono"
              >
                [ESC]
              </button>
            </div>

            <form onSubmit={handleCreateSortie} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-white/70 mb-1 font-semibold">
                  Sélectionner le dossier physique archivé :
                </label>
                <select
                  value={selectedDossierRef}
                  onChange={(e) => setSelectedDossierRef(e.target.value)}
                  className="w-full bg-[#04080e] border border-white/15 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  {dossiers.map(d => (
                    <option key={d.id} value={d.reference}>
                      {d.reference} — {d.titre} ({d.spatialArchivage?.cote || 'Sans cote'})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">
                    Agent demandeur :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: M. Bernard (Instructeur)"
                    value={newAgent}
                    onChange={(e) => setNewAgent(e.target.value)}
                    className="w-full bg-[#04080e] border border-white/15 rounded-[2px] px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">
                    Service demandeur :
                  </label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full bg-[#04080e] border border-white/15 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Urbanisme & foncier">Urbanisme & foncier</option>
                    <option value="État civil">État civil</option>
                    <option value="Ressources humaines">Ressources humaines</option>
                    <option value="Finances & Marchés">Finances & Marchés</option>
                    <option value="Conseil municipal">Conseil municipal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold">
                  Motif de la sortie :
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Consultation sur place, recours gracieux, audit..."
                  value={newMotif}
                  onChange={(e) => setNewMotif(e.target.value)}
                  className="w-full bg-[#04080e] border border-white/15 rounded-[2px] px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">
                    Emplacement temporaire :
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Bureau 204 — Bâtiment B"
                    value={newEmplacement}
                    onChange={(e) => setNewEmplacement(e.target.value)}
                    className="w-full bg-[#04080e] border border-white/15 rounded-[2px] px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1 font-semibold">
                    Date de retour prévue :
                  </label>
                  <input
                    type="text"
                    required
                    value={newDateRetour}
                    onChange={(e) => setNewDateRetour(e.target.value)}
                    className="w-full bg-[#04080e] border border-white/15 rounded-[2px] px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowSortieModal(false)}
                  className="px-3 py-1.5 rounded-[2px] bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-[2px] bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Valider la sortie</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
