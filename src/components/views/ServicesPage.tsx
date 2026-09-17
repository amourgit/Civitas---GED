import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Landmark, 
  ArrowLeft, 
  FolderPlus, 
  FileText, 
  Archive, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck, 
  BookOpen, 
  Layers, 
  ChevronRight,
  Plus,
  Download,
  Filter,
  Eye,
  FileSpreadsheet,
  Building,
  Scroll,
  Coins,
  Users,
  Briefcase,
  HeartHandshake,
  Vote,
  Church,
  Wrench
} from 'lucide-react';
import { 
  INSTITUTIONAL_SERVICES, 
  ServiceItem, 
  ServiceDossier, 
  ServiceDocument 
} from '../../data/servicesStructure';
import { playXboxSound } from '../../utils/xboxAudio';

export function ServicesPage() {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId?: string }>();

  // If serviceId in URL, select it, otherwise default to first service (Etat civil)
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    serviceId || 'etat-civil'
  );

  const [activeTab, setActiveTab] = useState<'dossiers' | 'activites' | 'registres' | 'activite'>('dossiers');
  const [statusFilter, setStatusFilter] = useState<'Tous' | 'Nouveau' | 'En cours' | 'Clôturé'>('Tous');
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDossier, setSelectedDossier] = useState<ServiceDossier | null>(null);
  const [showNewDossierModal, setShowNewDossierModal] = useState(false);

  // Current service
  const currentService = INSTITUTIONAL_SERVICES.find(s => s.id === selectedServiceId) || INSTITUTIONAL_SERVICES[0];

  // Filtered dossiers
  const filteredDossiers = currentService.dossiers.filter(d => {
    if (statusFilter !== 'Tous' && d.status !== statusFilter) return false;
    if (selectedActivityId && d.activityId !== selectedActivityId) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.reference.toLowerCase().includes(q) ||
        (d.personneConcernee && d.personneConcernee.toLowerCase().includes(q)) ||
        d.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scroll': return <Scroll className="w-5 h-5" />;
      case 'Building': return <Building className="w-5 h-5" />;
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      case 'Coins': return <Coins className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5" />;
      case 'Vote': return <Vote className="w-5 h-5" />;
      case 'Church': return <Church className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Landmark className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#030708] text-white overflow-hidden select-none">
      {/* 1. Header Bar with SGAI breadcrumb & Service Switcher */}
      <div className="w-full bg-[#070d14] border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              playXboxSound('back');
              navigate('/');
            }}
            className="p-1.5 rounded-[2px] bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-xs"
            title="Retour au Tableau de bord"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Accueil</span>
          </button>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs font-mono">SGAI</span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5" />
              SERVICES TERRITORIAUX
            </span>
            <span className="text-white/30 text-xs">/</span>
            <span className="text-white font-bold text-xs">
              {currentService.name}
            </span>
          </div>
        </div>

        {/* Action Button: Créer un dossier métier */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              playXboxSound('select');
              setShowNewDossierModal(true);
            }}
            className="px-3 py-1.5 rounded-[2px] bg-[#22c55e] hover:bg-[#16a34a] text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(34,197,94,0.35)]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Nouveau dossier</span>
          </button>
        </div>
      </div>

      {/* 2. Main Services Workspace Split Layout: Left Rail (Services List) + Right Workspace */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        
        {/* LEFT RAIL: 11 Services List */}
        <aside className="w-64 sm:w-72 bg-[#05090f] border-r border-white/10 flex flex-col shrink-0 min-h-0">
          <div className="p-3 border-b border-white/[0.08] flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider">
              Directions & Services ({INSTITUTIONAL_SERVICES.length})
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 space-y-1 scrollbar-thin">
            {INSTITUTIONAL_SERVICES.map((s) => {
              const isSelected = s.id === currentService.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    playXboxSound('select');
                    setSelectedServiceId(s.id);
                    setSelectedActivityId(null);
                    setSelectedDossier(null);
                  }}
                  onMouseEnter={() => playXboxSound('hover')}
                  className={`w-full text-left p-2.5 rounded-[3px] transition-all flex items-start gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#22c55e]/15 border border-[#22c55e]/60 text-white shadow-[0_0_15px_rgba(34,197,94,0.25)]'
                      : 'border border-transparent hover:bg-white/[0.04] text-white/70 hover:text-white'
                  }`}
                >
                  <div className={`p-1.5 rounded-[2px] shrink-0 ${
                    isSelected ? 'bg-[#22c55e] text-black' : 'bg-white/[0.08] text-white/80'
                  }`}>
                    {getServiceIcon(s.icon)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs truncate">
                        {s.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {s.code}
                      </span>
                    </div>
                    <p className="text-[10px] text-white/50 truncate mt-0.5">
                      {s.activites.length} activités • {s.stats.totalDossiers} dossiers
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick link to Archives at bottom of rail */}
          <div className="p-3 border-t border-white/10 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => {
                playXboxSound('select');
                navigate('/documentation/salles');
              }}
              className="w-full py-2 px-2.5 rounded-[3px] bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Archive className="w-3.5 h-3.5 text-purple-400" />
                <span>Accéder aux Archives (Salles)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>
        </aside>

        {/* RIGHT WORKSPACE: Service View (Dossiers, Activités, Registres, Activité) */}
        <main className="flex-1 flex flex-col min-h-0 bg-[#020508] overflow-hidden">
          
          {/* Service Banner & Meta */}
          <div className="relative p-5 bg-gradient-to-r from-[#07131e] via-[#040b12] to-[#020508] border-b border-white/10 shrink-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-[3px] bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40 shrink-0">
                  {getServiceIcon(currentService.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-extrabold text-white tracking-tight">
                      {currentService.name}
                    </h1>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] border ${currentService.badgeColor}`}>
                      CODE : {currentService.code}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 max-w-2xl">
                    {currentService.description}
                  </p>
                </div>
              </div>

              {/* Service Stats Counters */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-2 rounded-[3px] bg-white/[0.04] border border-white/10 text-center min-w-[70px]">
                  <span className="block text-sm font-extrabold text-white font-mono">{currentService.stats.nouveaux}</span>
                  <span className="block text-[9px] text-amber-400 uppercase font-medium">Nouveaux</span>
                </div>
                <div className="px-3 py-2 rounded-[3px] bg-white/[0.04] border border-white/10 text-center min-w-[70px]">
                  <span className="block text-sm font-extrabold text-white font-mono">{currentService.stats.enCours}</span>
                  <span className="block text-[9px] text-sky-400 uppercase font-medium">En cours</span>
                </div>
                <div className="px-3 py-2 rounded-[3px] bg-white/[0.04] border border-white/10 text-center min-w-[70px]">
                  <span className="block text-sm font-extrabold text-white font-mono">{currentService.stats.clotures}</span>
                  <span className="block text-[9px] text-emerald-400 uppercase font-medium">Clôturés</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs inside Service */}
            <div className="flex items-center gap-1 mt-4 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => { playXboxSound('toggle'); setActiveTab('dossiers'); }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'dossiers'
                    ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Dossiers Métier ({currentService.dossiers.length})</span>
              </button>

              <button
                type="button"
                onClick={() => { playXboxSound('toggle'); setActiveTab('activites'); }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'activites'
                    ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Activités ({currentService.activites.length})</span>
              </button>

              <button
                type="button"
                onClick={() => { playXboxSound('toggle'); setActiveTab('registres'); }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'registres'
                    ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Registres ({currentService.registres.length})</span>
              </button>

              <button
                type="button"
                onClick={() => { playXboxSound('toggle'); setActiveTab('activite'); }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'activite'
                    ? 'bg-[#22c55e] text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Journal d'activité</span>
              </button>
            </div>
          </div>

          {/* TAB 1: DOSSIERS MÉTIER */}
          {activeTab === 'dossiers' && (
            <div className="flex-1 flex flex-col min-h-0 p-4 overflow-hidden">
              
              {/* Controls bar: Search + Status filter + Activities pill filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3 shrink-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher par référence, titre, nom, personne..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-[2px] text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#22c55e]"
                  />
                </div>

                {/* Status Pills */}
                <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-[2px] border border-white/10">
                  {(['Tous', 'Nouveau', 'En cours', 'Clôturé'] as const).map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-[2px] transition-colors ${
                        statusFilter === st
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activities Horizontal Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 shrink-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedActivityId(null)}
                  className={`px-2.5 py-1 rounded-[2px] text-xs font-mono whitespace-nowrap transition-colors border ${
                    selectedActivityId === null
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                      : 'bg-white/[0.03] text-white/60 border-white/10 hover:text-white'
                  }`}
                >
                  Toutes les activités
                </button>

                {currentService.activites.map(act => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => setSelectedActivityId(act.id)}
                    className={`px-2.5 py-1 rounded-[2px] text-xs whitespace-nowrap transition-colors border flex items-center gap-1.5 ${
                      selectedActivityId === act.id
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                        : 'bg-white/[0.03] text-white/60 border-white/10 hover:text-white'
                    }`}
                  >
                    <span>{act.name}</span>
                    <span className="text-[10px] opacity-60 font-mono">({act.count})</span>
                  </button>
                ))}
              </div>

              {/* Dossiers Grid / List */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {filteredDossiers.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-white/10 rounded-[3px] my-4">
                    <FolderPlus className="w-8 h-8 text-white/30 mx-auto mb-2" />
                    <p className="text-sm text-white/70 font-medium">Aucun dossier trouvé pour ces critères.</p>
                    <p className="text-xs text-white/40 mt-1">Vous pouvez créer un nouveau dossier pour ce service.</p>
                    <button
                      type="button"
                      onClick={() => setShowNewDossierModal(true)}
                      className="mt-3 px-3 py-1.5 bg-[#22c55e] text-black font-bold text-xs rounded-[2px] inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Créer le premier dossier
                    </button>
                  </div>
                ) : (
                  filteredDossiers.map(dossier => (
                    <div
                      key={dossier.id}
                      onClick={() => {
                        playXboxSound('select');
                        setSelectedDossier(dossier);
                      }}
                      onMouseEnter={() => playXboxSound('hover')}
                      className={`p-3.5 rounded-[3px] border transition-all cursor-pointer bg-[#050b12] hover:bg-[#09131f] flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        selectedDossier?.id === dossier.id
                          ? 'border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)] ring-1 ring-[#22c55e]/50'
                          : 'border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="p-2 rounded-[2px] bg-white/[0.06] text-emerald-400 border border-white/10 shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-[2px] border border-emerald-500/20">
                              {dossier.reference}
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-[2px] ${
                              dossier.status === 'Clôturé' 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : dossier.status === 'En cours'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {dossier.status}
                            </span>
                            <span className="text-[11px] text-white/40 font-mono">
                              Créé le {dossier.dateCreation}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mt-1 truncate">
                            {dossier.title}
                          </h4>

                          <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                            {dossier.description}
                          </p>

                          {/* Meta: Personne concernée / Déclarant */}
                          {(dossier.personneConcernee || dossier.demandeur) && (
                            <div className="flex items-center gap-2 text-[11px] text-white/50 mt-1">
                              <User className="w-3 h-3 text-white/40" />
                              <span>{dossier.personneConcernee || dossier.demandeur}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Documents count & Physical Archive Badge */}
                      <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1.5 shrink-0 border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
                        <span className="text-xs font-medium text-white/80 flex items-center gap-1">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                          {dossier.documents.length} pièces jointes
                        </span>

                        <div className="flex items-center gap-1 text-[10px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded-[2px] border border-purple-500/30">
                          <Archive className="w-3 h-3 text-purple-400" />
                          <span>Cote : {dossier.archivage.cote}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITÉS MÉTIER DU SERVICE */}
          {activeTab === 'activites' && (
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {currentService.activites.map(act => (
                  <div
                    key={act.id}
                    onClick={() => {
                      setSelectedActivityId(act.id);
                      setActiveTab('dossiers');
                    }}
                    className="p-3.5 rounded-[3px] bg-[#050b12] border border-white/10 hover:border-[#22c55e] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {act.name}
                      </h4>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-[2px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {act.count} dossiers
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-1.5 line-clamp-2">
                      {act.description}
                    </p>
                    <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/50 group-hover:text-white">
                      <span>Voir les dossiers de cette activité</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REGISTRES OFFICIELS DU SERVICE */}
          {activeTab === 'registres' && (
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
              <div className="space-y-2">
                {currentService.registres.map(reg => (
                  <div
                    key={reg.id}
                    className="p-4 rounded-[3px] bg-[#050b12] border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-[2px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {reg.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-white/60">
                          <span>Année : {reg.annee}</span>
                          <span>•</span>
                          <span>{reg.volume}</span>
                          <span>•</span>
                          <span className="font-mono text-purple-300">Cote : {reg.cote}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-[2px] border ${
                        reg.etat === 'Ouvert'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-white/10 text-white/70 border-white/20'
                      }`}>
                        {reg.etat}
                      </span>
                      <button
                        type="button"
                        onClick={() => playXboxSound('select')}
                        className="px-2.5 py-1 rounded-[2px] bg-white/[0.08] hover:bg-white/20 text-white text-xs font-medium transition-colors"
                      >
                        Consulter les feuillets
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: JOURNAL D'ACTIVITÉ */}
          {activeTab === 'activite' && (
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
              <div className="space-y-3">
                <div className="p-3 bg-white/[0.03] rounded-[3px] border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white">
                      Clôture de l'acte de naissance EC-2026-001245
                    </span>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      Versement automatique programmé vers Casier CS-1012 (Salle S-01, Rayon RY-101)
                    </p>
                    <span className="text-[10px] text-white/40 font-mono">14/09/2026 à 16:30 • Par Patrice M.</span>
                  </div>
                </div>

                <div className="p-3 bg-white/[0.03] rounded-[3px] border border-white/10 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-white">
                      Dépôt de pièces justificatives — Mariage Civil EC-2026-001246
                    </span>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      2 pièces certifiées rattachées au dossier. Publication des bans en attente de visa.
                    </p>
                    <span className="text-[10px] text-white/40 font-mono">10/09/2026 à 11:15 • Par Émilie D.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 3. DOSSIER DETAILS DRAWER / MODAL (The requested full institutional hierarchy) */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#070e17] border-l border-white/15 h-full flex flex-col shadow-2xl overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 bg-[#04080e] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-[2px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[2px] border border-emerald-500/20">
                      {selectedDossier.reference}
                    </span>
                    <span className="text-xs font-mono text-white/50">
                      Service {currentService.name}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    {selectedDossier.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDossier(null)}
                className="p-1.5 rounded-[2px] bg-white/[0.05] hover:bg-white/20 text-white/70 hover:text-white transition-colors text-xs"
              >
                Fermer ✕
              </button>
            </div>

            {/* Drawer Body (3 Pillars: 1. Informations, 2. Documents, 3. Archivage) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 scrollbar-thin">
              
              {/* PILLAR 1: INFORMATIONS RÉGLEMENTAIRES DU DOSSIER */}
              <section className="bg-white/[0.03] border border-white/10 rounded-[3px] p-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-3">
                  <User className="w-3.5 h-3.5" />
                  1. Informations Métier du Dossier
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Référence officielle</span>
                    <span className="text-white font-bold font-mono">{selectedDossier.reference}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Statut du dossier</span>
                    <span className="text-emerald-300 font-bold">{selectedDossier.status}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Date de création</span>
                    <span className="text-white font-mono">{selectedDossier.dateCreation}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px] uppercase font-mono">Personne / Déclarant</span>
                    <span className="text-white font-medium">{selectedDossier.personneConcernee || selectedDossier.declarant || selectedDossier.demandeur || 'Non renseigné'}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/[0.06]">
                  <span className="text-white/40 block text-[10px] uppercase font-mono">Objet & Description</span>
                  <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                    {selectedDossier.description}
                  </p>
                </div>
              </section>

              {/* PILLAR 2: DOCUMENTS ET PIÈCES DU DOSSIER */}
              <section className="bg-white/[0.03] border border-white/10 rounded-[3px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5" />
                    2. Documents & Pièces Justificatives ({selectedDossier.documents.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => playXboxSound('select')}
                    className="text-[11px] text-sky-300 hover:text-white font-medium flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Ajouter une pièce
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedDossier.documents.map(doc => (
                    <div
                      key={doc.id}
                      className="p-2.5 rounded-[2px] bg-black/40 border border-white/10 flex items-center justify-between gap-3 hover:border-sky-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] bg-sky-500/20 text-sky-300 border border-sky-500/30">
                          {doc.format}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate">
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-white/50">
                            {doc.type} • {doc.size} • {doc.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-[2px] border border-emerald-500/20">
                          {doc.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => playXboxSound('select')}
                          className="p-1 rounded-[2px] bg-white/[0.05] hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                          title="Visualiser le document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* PILLAR 3: ARCHIVAGE & EMPLACEMENT PHYSIQUE (The crucial transversal link) */}
              <section className="bg-purple-950/20 border border-purple-500/30 rounded-[3px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <Archive className="w-3.5 h-3.5" />
                    3. Archivage Physique & Conservation Légale
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-purple-500/20 text-purple-200 border border-purple-500/30">
                    {selectedDossier.archivage.statusConservation}
                  </span>
                </div>

                <div className="p-3 bg-black/50 rounded-[2px] border border-purple-500/20 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Cote de conservation :</span>
                    <span className="font-mono font-extrabold text-purple-300 text-sm">
                      {selectedDossier.archivage.cote}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Salle d'archivage :</span>
                    <span className="text-white font-medium">{selectedDossier.archivage.salleName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Rayon :</span>
                    <span className="text-white font-medium">{selectedDossier.archivage.rayonName}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Casier de rangement :</span>
                    <span className="text-white font-medium">{selectedDossier.archivage.casierName}</span>
                  </div>
                </div>

                {/* Direct Transversal Access Button */}
                <div className="mt-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      playXboxSound('select');
                      navigate(`/documentation/salles/${selectedDossier.archivage.salleId}/rayons/${selectedDossier.archivage.rayonId}/casiers/${selectedDossier.archivage.casierId}`);
                    }}
                    className="w-full py-2.5 px-3 rounded-[2px] bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                  >
                    <Archive className="w-4 h-4" />
                    <span>Accéder à l'emplacement physique dans les ARCHIVES</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-75" />
                  </button>
                  <p className="text-[10px] text-white/40 text-center mt-1.5">
                    Le même dossier est consultable depuis la hiérarchie physique (Salle → Rayon → Casier).
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      )}

      {/* NEW DOSSIER MODAL */}
      {showNewDossierModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#070e17] border border-white/20 rounded-[4px] p-5 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-emerald-400" />
              Créer un nouveau dossier métier — {currentService.name}
            </h3>
            <p className="text-xs text-white/50 mt-1">
              Les dossiers créés dans ce service seront automatiquement indexés et cotés pour l'archivage.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                playXboxSound('select');
                setShowNewDossierModal(false);
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block text-white/70 mb-1 font-medium">Activité concernée</label>
                <select className="w-full p-2 bg-white/[0.05] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-emerald-500">
                  {currentService.activites.map(act => (
                    <option key={act.id} value={act.id} className="bg-slate-900 text-white">
                      {act.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Intitulé du dossier</label>
                <input 
                  type="text" 
                  placeholder="Ex : Déclaration de naissance — ..." 
                  required
                  className="w-full p-2 bg-white/[0.05] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Personne concernée / Demandeur</label>
                <input 
                  type="text" 
                  placeholder="Nom, Prénom ou Raison sociale" 
                  className="w-full p-2 bg-white/[0.05] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-medium">Description / Objet</label>
                <textarea 
                  rows={3} 
                  placeholder="Précisions sur les pièces déposées et l'instruction..." 
                  className="w-full p-2 bg-white/[0.05] border border-white/10 rounded-[2px] text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewDossierModal(false)}
                  className="px-3 py-1.5 rounded-[2px] bg-white/[0.05] hover:bg-white/10 text-white/70"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-[2px] bg-[#22c55e] text-black font-bold"
                >
                  Enregistrer et coter le dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
