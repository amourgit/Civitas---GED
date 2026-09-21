import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, FileText, Settings, Zap, Search, 
  FolderOpen, CirclePlus, Star, HardDrive, ShieldAlert, 
  BarChart3, Volume2, VolumeX, Sparkles, CheckCircle2, 
  ChevronLeft, ChevronRight, User, Calendar, ExternalLink,
  ArrowRight, Clock, Award, Bell, Layers, Laptop
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { usePortalCarousel } from '../../context/PortalCarouselContext';
import { playXboxSound, xboxAudio } from '../../utils/xboxAudio';
import { HeroMosaicGrid } from './HeroMosaicGrid';
import { PortalBlogSection } from './PortalBlogSection';
import { ClipPathLinks } from './ClipPathLinks';
import { SophieProfileCard } from './SophieProfileCard';
import { PortalQuickLinks } from './PortalQuickLinks';
import { PortalTeamCalendar } from './PortalTeamCalendar';
import { PortalDocuments } from './PortalDocuments';
import { PageRightContent } from '../../context/RightContentContext';

interface XboxMetroDashboardProps {
  onShowToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
}

export function XboxMetroDashboard({ onShowToast }: XboxMetroDashboardProps) {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const { activeTabId, slideDirection, tabs, switchTab } = usePortalCarousel();
  const [isAudioMuted, setIsAudioMuted] = React.useState<boolean>(() => xboxAudio.getIsMuted());

  const toggleSound = () => {
    const nextMuted = xboxAudio.toggleMute();
    setIsAudioMuted(nextMuted);
    onShowToast(nextMuted ? 'Effets sonores Xbox coupés' : 'Effets sonores Xbox activés', 'info');
  };

  return (
    <div className="w-full relative flex flex-col flex-1 min-w-0">
      {/* ── CAROUSEL PANES CONTAINER (Contenu du slide actif) ── */}
      <div className="w-full flex-1 relative min-h-0 overflow-visible">
        <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
          <motion.div
            key={activeTabId}
            custom={slideDirection}
            initial={{ opacity: 0, x: slideDirection * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -slideDirection * 60 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="w-full flex flex-col"
          >

            {/* ═════════════════════════════════════════════════════════
                PANE 1: 'home'
                Conserve l'intégralité du contenu Accueil (HeroMosaicGrid,
                PortalBlogSection, RightContent) ET intègre le footer
                directement comme section à la fin du home!
               ═════════════════════════════════════════════════════════ */}
            {activeTabId === 'home' && (
              <div className="w-full flex flex-col gap-10">
                
                {/* Main Home Content Grid */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 flex flex-col gap-10">
                  {/* Section 1 : News (Hero Mosaic Grid) */}
                  <section className="w-full block">
                    <HeroMosaicGrid onShowToast={onShowToast} />
                  </section>

                  {/* Section 2 : L'Actualité (Grille Blog Section) */}
                  <section className="w-full block">
                    <PortalBlogSection onShowToast={onShowToast} />
                  </section>

                  {/* Section 3 : Liens & Réseaux Sociaux (ClipPathLinks) */}
                  <section className="w-full block">
                    <ClipPathLinks />
                  </section>
                </div>

                {/* Right Content Mounted for Home */}
                <PageRightContent>
                  <div className="w-full">
                    <SophieProfileCard onShowToast={onShowToast} />
                  </div>
                  <div className="w-full p-4 sm:p-5 rounded-none bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
                    <PortalQuickLinks onShowToast={onShowToast} />
                  </div>
                  <div className="w-full p-4 sm:p-5 rounded-none bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
                    <PortalTeamCalendar onShowToast={onShowToast} />
                  </div>
                  <div className="w-full p-4 sm:p-5 rounded-none bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col justify-between">
                    <PortalDocuments onShowToast={onShowToast} />
                  </div>
                </PageRightContent>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                PANE 2: 'administration'
                Tuiles authentiques Xbox Metro (Vert Xbox, Sombre, Hero)
               ═════════════════════════════════════════════════════════ */}
            {activeTabId === 'administration' && (
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8">
                
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                      <ShieldCheck className="w-7 h-7 text-[#107c10]" />
                      Centre d'Administration & Gouvernance
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      Gestion des habilitations, annuaire des identités et traçabilité globale du système EGEN
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1 rounded-full bg-[#107c10]/20 border border-[#107c10]/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#107c10] animate-pulse"></span>
                      Système Opérationnel 100%
                    </span>
                  </div>
                </div>

                {/* Xbox Metro Tiles Grid for Administration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[160px] sm:auto-rows-[180px]">
                  
                  {/* Hero Featured Tile: IAM & Accès (Spans 2 cols, 2 rows) */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/iam');
                    }}
                    className="sm:col-span-2 sm:row-span-2 rounded-2xl relative overflow-hidden bg-gradient-to-br from-[#0c1f38] via-[#081524] to-[#040a12] border border-sky-400/30 p-6 sm:p-8 flex flex-col justify-between cursor-pointer group shadow-2xl hover:border-sky-400 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/20 transition-all"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30 uppercase tracking-wider">
                          Sécurité IAM
                        </span>
                        <ArrowRight className="w-5 h-5 text-sky-400 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-4 tracking-tight leading-tight">
                        Gestion des Utilisateurs, Rôles & Accès
                      </h3>
                      <p className="text-sm text-white/70 mt-2 max-w-md leading-relaxed">
                        Contrôlez les privilèges d'accès, attribuez des habilitations ministérielles et administrez le répertoire des agents habilités.
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 border border-sky-400/20">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">142 Comptes Actifs</div>
                          <div className="text-white/50 text-xs">Politique Zero-Trust conforme</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-sky-400 group-hover:underline">
                        Ouvrir le module IAM →
                      </span>
                    </div>
                  </div>

                  {/* Tile 1: Xbox Vibrant Green Tile - Sécurité & Permissions */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/iam');
                    }}
                    className="rounded-2xl bg-[#107c10] text-white p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <Lock className="w-6 h-6 text-white/90" />
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-black/20 text-white/90">
                        RBAC
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-snug">Droits & Sécurité</h4>
                      <p className="text-xs text-white/80 mt-1">Audit des habilitations & clés d'API</p>
                    </div>
                  </div>

                  {/* Tile 2: Journaux d'Audit & Traçabilité */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged/administration');
                    }}
                    className="rounded-2xl bg-[#0d1b2a] border border-white/15 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-emerald-400/60 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <FileText className="w-6 h-6 text-emerald-400" />
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        SHA-256
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white leading-snug">Journaux d'Audit</h4>
                      <p className="text-xs text-white/60 mt-1">Traçabilité légale et horodatage certifié</p>
                    </div>
                  </div>

                  {/* Tile 3: Configuration Système & Paramètres généraux */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged/administration');
                    }}
                    className="rounded-2xl bg-[#131b26] border border-white/15 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-amber-400/60 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <Settings className="w-6 h-6 text-amber-400" />
                      <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Config
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white leading-snug">Configuration Système</h4>
                      <p className="text-xs text-white/60 mt-1">Paramètres de numérisation & OCR</p>
                    </div>
                  </div>

                  {/* Tile 4: Sauvegardes & Archivage Légal (Xbox Green Accent) */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      onShowToast("Sauvegarde Cloud EGEN vérifiée : 100% intègre", "success");
                    }}
                    className="rounded-2xl bg-gradient-to-br from-[#0a2318] to-[#04120c] border border-emerald-500/30 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-emerald-400 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <HardDrive className="w-6 h-6 text-emerald-400" />
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white leading-snug">Sauvegardes Cloud</h4>
                      <p className="text-xs text-white/60 mt-1">Dernière réplication : Aujourd'hui 03:00</p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                PANE 3: 'raccourcis'
                Tuiles d'accès rapide & lanceurs d'actions
               ═════════════════════════════════════════════════════════ */}
            {activeTabId === 'raccourcis' && (
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                      <Zap className="w-7 h-7 text-amber-400" />
                      Raccourcis & Dépôts Express
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      Lanceurs instantanés pour les flux de travail récurrents et les opérations prioritaires
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[160px] sm:auto-rows-[180px]">
                  
                  {/* Hero Featured Tile: GED Documents */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged');
                    }}
                    className="sm:col-span-2 rounded-2xl relative overflow-hidden bg-gradient-to-r from-[#107c10] to-[#0b5e0b] p-6 sm:p-7 flex flex-col justify-between cursor-pointer group shadow-2xl hover:brightness-110 transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between text-white">
                      <span className="px-2.5 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-wider">
                        Espace Principal
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        EGEN GED Documents
                      </h3>
                      <p className="text-sm text-white/90 mt-1 max-w-md">
                        Accédez au fonds documentaire national : plans de classement, salles, rayons et archives numérisées.
                      </p>
                    </div>
                  </div>

                  {/* Tile 1: Bordereaux en cours */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/suivi');
                    }}
                    className="rounded-2xl bg-[#0e1e2d] border border-sky-400/30 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-sky-400 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <Zap className="w-6 h-6 text-sky-400" />
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                        5 Actifs
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white leading-snug">Bordereaux en cours</h4>
                      <p className="text-xs text-white/60 mt-1">Suivi des versements ministériels</p>
                    </div>
                  </div>

                  {/* Tile 2: Recherche Express */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged/recherche');
                    }}
                    className="rounded-2xl bg-[#1a1528] border border-purple-400/30 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-purple-400 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <Search className="w-6 h-6 text-purple-400" />
                      <span className="text-xs font-mono text-purple-300">OCR</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white leading-snug">Recherche Express</h4>
                      <p className="text-xs text-white/60 mt-1">Moteur d'indexation sémantique</p>
                    </div>
                  </div>

                  {/* Tile 3: Scanner & Import */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged/scanner');
                    }}
                    className="rounded-2xl bg-[#107c10] text-white p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:brightness-110 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <CirclePlus className="w-6 h-6 text-white" />
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-black/20 text-white">
                        Direct
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-snug">Scanner & Import</h4>
                      <p className="text-xs text-white/80 mt-1">Numérisation et versement immédiat</p>
                    </div>
                  </div>

                  {/* Tile 4: Tableaux de Pilotage */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged/pilotage');
                    }}
                    className="rounded-2xl bg-[#0d2222] border border-teal-400/30 p-5 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-teal-400 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <BarChart3 className="w-6 h-6 text-teal-400" />
                      <span className="text-xs text-teal-300 font-mono">KPI</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white leading-snug">Pilotage & Statistiques</h4>
                      <p className="text-xs text-white/60 mt-1">Volumétrie, délais et conformité</p>
                    </div>
                  </div>

                  {/* Tile 5: Documents Récents */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged');
                    }}
                    className="sm:col-span-2 rounded-2xl bg-gradient-to-r from-[#141d26] to-[#0c131a] border border-white/15 p-5 sm:p-6 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-white/30 transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white font-bold text-base">
                        <FolderOpen className="w-5 h-5 text-amber-400" />
                        Documents & Dossiers Récents
                      </div>
                      <span className="text-xs text-white/50 group-hover:text-white">Voir tout →</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-white text-xs font-semibold truncate">Arrêté ministériel N°2026-04</div>
                        <div className="text-white/40 text-[10px]">Consulté il y a 2h</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-white text-xs font-semibold truncate">Plan Cadastral Numérique</div>
                        <div className="text-white/40 text-[10px]">Consulté hier</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                PANE 4: 'favoris'
                Tuiles de favoris & éléments épinglés
               ═════════════════════════════════════════════════════════ */}
            {activeTabId === 'favoris' && (
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                      <Star className="w-7 h-7 text-amber-400 fill-amber-400" />
                      Documents & Espaces Favoris
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      Vos archives prioritaires, dossiers épinglés et modules fréquemment utilisés
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Favori 1 */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged');
                    }}
                    className="rounded-2xl bg-gradient-to-br from-[#1c1808] via-[#120f04] to-[#0a0802] border border-amber-500/30 p-6 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-amber-400 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                        Dossier Épinglé
                      </span>
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="mt-5">
                      <h4 className="font-bold text-xl text-white">Arrêtés Ministériels 2026</h4>
                      <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                        Textes réglementaires, décrets d'application et circulaires de l'Économie Numérique.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span>42 documents classés</span>
                      <span>Ouvrir →</span>
                    </div>
                  </div>

                  {/* Favori 2 */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged');
                    }}
                    className="rounded-2xl bg-gradient-to-br from-[#0c1a24] via-[#071118] to-[#04080c] border border-sky-400/30 p-6 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-sky-400 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-500/30">
                        Plan Directeur
                      </span>
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="mt-5">
                      <h4 className="font-bold text-xl text-white">Schéma Directeur SI 2025-2030</h4>
                      <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                        Feuille de route stratégique pour la transformation numérique et l'interopérabilité des services.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-sky-400 font-semibold">
                      <span>18 annexes techniques</span>
                      <span>Ouvrir →</span>
                    </div>
                  </div>

                  {/* Favori 3 */}
                  <div 
                    onClick={() => {
                      playXboxSound('select');
                      navigate('/ged');
                    }}
                    className="rounded-2xl bg-gradient-to-br from-[#0b1f14] via-[#06140d] to-[#020a06] border border-emerald-500/30 p-6 flex flex-col justify-between cursor-pointer group shadow-xl hover:border-emerald-400 hover:scale-[1.02] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                        Cadre Normatif
                      </span>
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="mt-5">
                      <h4 className="font-bold text-xl text-white">Protocole de Versement Numérique</h4>
                      <p className="text-xs text-white/60 mt-1.5 leading-relaxed">
                        Spécifications SEDA v2.2 pour les versements automatisés et la signature électronique.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                      <span>Référentiel certifié</span>
                      <span>Ouvrir →</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ═════════════════════════════════════════════════════════
                PANE 5: 'paramètres'
                Paramètres système, audio Xbox, thème et profil
               ═════════════════════════════════════════════════════════ */}
            {activeTabId === 'paramètres' && (
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-8">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                      <Settings className="w-7 h-7 text-white/80" />
                      Paramètres & Préférences du Portail
                    </h2>
                    <p className="text-sm text-white/60 mt-1">
                      Personnalisez l'ambiance sonore, les notifications et vos options d'affichage
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Tuile Audio Xbox */}
                  <div className="rounded-2xl bg-[#0c141d] border border-white/15 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                          {isAudioMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          isAudioMuted ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {isAudioMuted ? 'Désactivé' : 'Actif'}
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-white mt-4">Effets Sonores Xbox</h4>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">
                        Retour audio authentique au clic, au survol et lors de la navigation entre les onglets.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={toggleSound}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer border border-white/15"
                      >
                        {isAudioMuted ? 'Activer le son' : 'Couper le son'}
                      </button>
                      <button
                        type="button"
                        onClick={() => playXboxSound('achievement')}
                        className="px-3 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-xs font-semibold transition-colors cursor-pointer border border-emerald-500/30"
                      >
                        Tester l'audio
                      </button>
                    </div>
                  </div>

                  {/* Tuile Ambiance & Affichage */}
                  <div className="rounded-2xl bg-[#0c141d] border border-white/15 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300">
                          WebGL 3D
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-white mt-4">Arrière-Plan Dynamique</h4>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">
                        Vagues WebGL interactives fluides aux couleurs du drapeau national et de la souveraineté numérique.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                      <span>Rendu : Shader GPU 60 FPS</span>
                      <span className="text-emerald-400 font-semibold">Actif</span>
                    </div>
                  </div>

                  {/* Tuile À Propos & Système */}
                  <div className="rounded-2xl bg-[#0c141d] border border-white/15 p-6 flex flex-col justify-between shadow-xl">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                          <Laptop className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                          v4.2.0
                        </span>
                      </div>
                      <h4 className="font-bold text-lg text-white mt-4">EGEN Intranet Système</h4>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">
                        Écosystème Gouvernemental de l'Économie Numérique. Plateforme unifiée de collaboration et d'archivage.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                      <span>Certification SecNum</span>
                      <span className="text-sky-400 font-semibold">2026-2029</span>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
