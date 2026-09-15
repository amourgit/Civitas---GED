import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderItem } from '../../types/document';
import { DocumentGrid } from '../collection/DocumentGrid';
import { getFolderSlug } from '../../utils/slug';
import { 
  FolderPlus, 
  Library, 
  Layers, 
  Box, 
  ChevronRight, 
  DoorOpen, 
  ArrowLeft,
  Search
} from 'lucide-react';
import { SALLES, RAYONS, CASIERS } from '../../data/archiveStructure';

interface DocumentsPageProps {
  folders: FolderItem[];
  selectedFolderId: string | null;
  onSelectFolder: (folder: FolderItem) => void;
  onToggleFavorite: (folder: FolderItem) => void;
  onDeleteFolder: (folder: FolderItem) => void;
  onViewProperties: (folder: FolderItem) => void;
  onPreviewSpecial: (folder: FolderItem) => void;
  onShare: (folder: FolderItem) => void;
  onCreateFolder?: () => void;
  searchQuery?: string;
}

export function DocumentsPage({
  folders,
  selectedFolderId,
  onSelectFolder,
  onToggleFavorite,
  onDeleteFolder,
  onViewProperties,
  onPreviewSpecial,
  onShare,
  onCreateFolder,
  searchQuery = ''
}: DocumentsPageProps) {
  const navigate = useNavigate();

  // Navigation states for our custom physical mapping
  const [currentLevel, setCurrentLevel] = useState<'salle' | 'rayon' | 'casier' | 'dossier'>('salle');
  const [selectedSalleId, setSelectedSalleId] = useState<string | null>(null);
  const [selectedRayonId, setSelectedRayonId] = useState<string | null>(null);
  const [selectedCasierId, setSelectedCasierId] = useState<string | null>(null);

  // Search input specifically for express matricule lookup
  const [expressMatricule, setExpressMatricule] = useState('');
  const [expressError, setExpressError] = useState('');

  // Handle Express Matricule Quick Jump
  const handleExpressJump = (e: React.FormEvent) => {
    e.preventDefault();
    const query = expressMatricule.trim().toUpperCase();
    if (!query) return;

    // Check Salles
    const targetSalle = SALLES.find(s => s.matricule === query || s.id === query.toLowerCase());
    if (targetSalle) {
      setSelectedSalleId(targetSalle.id);
      setSelectedRayonId(null);
      setSelectedCasierId(null);
      setCurrentLevel('rayon');
      setExpressMatricule('');
      setExpressError('');
      return;
    }

    // Check Rayons
    const targetRayon = RAYONS.find(r => r.matricule === query || r.id === query.toLowerCase());
    if (targetRayon) {
      const parentSalle = SALLES.find(s => s.id === targetRayon.salleId);
      setSelectedSalleId(parentSalle?.id || 's01');
      setSelectedRayonId(targetRayon.id);
      setSelectedCasierId(null);
      setCurrentLevel('casier');
      setExpressMatricule('');
      setExpressError('');
      return;
    }

    // Check Casiers
    const targetCasier = CASIERS.find(c => c.matricule === query || c.id === query.toLowerCase());
    if (targetCasier) {
      const parentRayon = RAYONS.find(r => r.id === targetCasier.rayonId);
      setSelectedSalleId(parentRayon ? SALLES.find(s => s.id === parentRayon.salleId)?.id || 's01' : 's01');
      setSelectedRayonId(parentRayon?.id || 'ry101');
      setSelectedCasierId(targetCasier.id);
      setCurrentLevel('dossier');
      setExpressMatricule('');
      setExpressError('');
      return;
    }

    setExpressError('Matricule non trouvé (ex: S-01, RY-101, CS-1011)');
    setTimeout(() => setExpressError(''), 4000);
  };

  // Get current active elements for display
  const activeSalle = useMemo(() => SALLES.find(s => s.id === selectedSalleId), [selectedSalleId]);
  const activeRayon = useMemo(() => RAYONS.find(r => r.id === selectedRayonId), [selectedRayonId]);
  const activeCasier = useMemo(() => CASIERS.find(c => c.id === selectedCasierId), [selectedCasierId]);

  // Filters folders corresponding to the selected Casier
  const filteredFolders = useMemo(() => {
    let list = [...folders];

    // Filter by active Casier mapping
    if (selectedCasierId) {
      const casierObj = CASIERS.find(c => c.id === selectedCasierId);
      if (casierObj) {
        // Find folders that belong to this Casier, or newly created folders
        list = list.filter(f => casierObj.folderIds.includes(f.id) || !CASIERS.some(c => c.folderIds.includes(f.id)));
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [folders, selectedCasierId, searchQuery]);

  // Handle Opening a folder -> Trigger onSelectFolder (opens full-screen overlay)
  const handleOpenFolder = (folder: FolderItem) => {
    onSelectFolder(folder);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative select-none min-h-0">
      
      {/* 1. ARCHIVE MAP PIPELINE HEADER (Glass & HUD design) */}
      <div className="shrink-0 px-3 sm:px-6 pt-2 pb-2 sm:pb-3 border-b border-white/5 bg-[#030a0d]/40 backdrop-blur-xl z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
          
          {/* Breadcrumb Navigation Pipeline */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold text-white/40 tracking-wider uppercase font-mono">
              <button 
                onClick={() => {
                  setCurrentLevel('salle');
                  setSelectedSalleId(null);
                  setSelectedRayonId(null);
                  setSelectedCasierId(null);
                }}
                className={`hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 ${currentLevel === 'salle' ? 'text-emerald-400 font-bold' : ''}`}
              >
                <Library className="w-3.5 h-3.5" />
                <span>DOCUMENTATION</span>
              </button>

              {selectedSalleId && (
                <>
                  <ChevronRight className="w-3 h-3 text-white/20" />
                  <button 
                    onClick={() => {
                      setCurrentLevel('rayon');
                      setSelectedRayonId(null);
                      setSelectedCasierId(null);
                    }}
                    className={`hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 max-w-[150px] sm:max-w-none truncate ${currentLevel === 'rayon' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <span className="text-white/20">SALLE :</span>
                    <span className="text-emerald-500 font-bold">[{activeSalle?.matricule}]</span>
                    <span className="truncate ml-1">{activeSalle?.name.split(' ')[0]}</span>
                  </button>
                </>
              )}

              {selectedRayonId && (
                <>
                  <ChevronRight className="w-3 h-3 text-white/20" />
                  <button 
                    onClick={() => {
                      setCurrentLevel('casier');
                      setSelectedCasierId(null);
                    }}
                    className={`hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1 max-w-[150px] sm:max-w-none truncate ${currentLevel === 'casier' ? 'text-emerald-400 font-bold' : ''}`}
                  >
                    <span className="text-white/20">RAYON :</span>
                    <span className="text-emerald-500 font-bold">[{activeRayon?.matricule}]</span>
                    <span className="truncate ml-1">{activeRayon?.name.replace('Rayon ', '')}</span>
                  </button>
                </>
              )}

              {selectedCasierId && (
                <>
                  <ChevronRight className="w-3 h-3 text-white/20" />
                  <div className="text-emerald-400 font-bold flex items-center gap-1 max-w-[150px] sm:max-w-none truncate">
                    <span className="text-white/20 font-normal">CASIER :</span>
                    <span className="text-emerald-500">[{activeCasier?.matricule}]</span>
                    <span className="truncate ml-1">{activeCasier?.name.replace('Casier ', '')}</span>
                  </div>
                </>
              )}
            </div>

            {/* Level Title */}
            <h1 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1 flex items-center gap-2">
              {currentLevel === 'salle' && "Parcours de Documentation : Salles"}
              {currentLevel === 'rayon' && `Rayons de la salle : ${activeSalle?.name}`}
              {currentLevel === 'casier' && `Casiers du rayon : ${activeRayon?.name}`}
              {currentLevel === 'dossier' && `Dossiers du casier : ${activeCasier?.name}`}
            </h1>
          </div>

          {/* Quick Matricule Finder Form */}
          <div className="flex flex-col gap-1 shrink-0">
            <form onSubmit={handleExpressJump} className="relative flex items-center">
              <input
                type="text"
                placeholder="Recherche Matricule (ex: RY-101)..."
                value={expressMatricule}
                onChange={(e) => setExpressMatricule(e.target.value)}
                className="w-full md:w-64 bg-black/40 hover:bg-white/5 focus:bg-black/80 border border-white/10 hover:border-white/20 focus:border-emerald-500/70 text-[11px] font-mono text-white placeholder-white/30 rounded-lg pl-3 pr-8 py-1.5 outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-1 text-white/50 hover:text-emerald-400 cursor-pointer transition-colors"
                title="Saisir un matricule pour y accéder immédiatement"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
            {expressError ? (
              <span className="text-[9px] text-red-400 font-mono text-right animate-pulse">{expressError}</span>
            ) : (
              <span className="text-[9px] text-white/30 font-mono text-right hidden md:inline">Indexation d'archivage temps-réel</span>
            )}
          </div>
        </div>

        {/* Live Step HUD map Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono text-white/30 mt-1 pb-1">
          <span className="text-emerald-400 font-bold">Flux d'archivage :</span>
          <span className={`px-1.5 py-0.5 rounded-md ${currentLevel === 'salle' ? 'bg-emerald-500/25 text-white border border-emerald-400/40' : 'bg-transparent'}`}>1. SALLE</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className={`px-1.5 py-0.5 rounded-md ${currentLevel === 'rayon' ? 'bg-emerald-500/25 text-white border border-emerald-400/40' : 'bg-transparent'}`}>2. RAYON</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className={`px-1.5 py-0.5 rounded-md ${currentLevel === 'casier' ? 'bg-emerald-500/25 text-white border border-emerald-400/40' : 'bg-transparent'}`}>3. CASIER</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className={`px-1.5 py-0.5 rounded-md ${currentLevel === 'dossier' ? 'bg-emerald-500/25 text-white border border-emerald-400/40' : 'bg-transparent'}`}>4. DOSSIERS</span>
        </div>
      </div>

      {/* 2. SUB-BAR ACTIONS & BACK ACTIONS (Compact, no filters, no toolbar!) */}
      <div className="shrink-0 px-3 sm:px-6 py-2 z-20 bg-[#020709]/10">
        <div className="flex items-center justify-between gap-3">
          {currentLevel !== 'salle' ? (
            <button
              onClick={() => {
                if (currentLevel === 'dossier') {
                  setCurrentLevel('casier');
                  setSelectedCasierId(null);
                } else if (currentLevel === 'casier') {
                  setCurrentLevel('rayon');
                  setSelectedRayonId(null);
                } else if (currentLevel === 'rayon') {
                  setCurrentLevel('salle');
                  setSelectedSalleId(null);
                }
              }}
              className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-white/50 hover:text-emerald-400 cursor-pointer font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Niveau supérieur</span>
            </button>
          ) : (
            <div className="text-[10px] sm:text-xs text-white/30 font-mono">
              Sélectionnez une salle pour continuer
            </div>
          )}

          {currentLevel === 'dossier' && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-white bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-400/30">
                {filteredFolders.length} dossier(s) disponible(s)
              </span>
              {onCreateFolder && (
                <button
                  type="button"
                  onClick={onCreateFolder}
                  className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/25 text-emerald-300 hover:text-white border border-emerald-400/50 text-[10px] font-semibold cursor-pointer transition-all"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Créer dossier</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. SCROLLABLE INTERACTIVE VIEWPORT */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 pb-12 min-h-0"
        data-scrollable="true"
      >
        
        {/* --- 3.1. LEVEL SALLES --- */}
        {currentLevel === 'salle' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {SALLES.map((salle) => (
              <div
                key={salle.id}
                className="group relative overflow-hidden rounded-xl p-4 sm:p-5 bg-[#02090c] border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[260px]"
              >
                {/* Cover Image claire et bien visible */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={salle.coverImage || '/assets/cover_salle.jpg'}
                    alt={salle.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* HUD Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-black/70 text-emerald-400 border border-emerald-400/50 text-[10px] font-mono rounded font-bold backdrop-blur-sm shadow">
                          {salle.matricule}
                        </span>
                        <span className="text-[10px] sm:text-xs text-white font-mono px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm shadow">
                          {salle.location}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm shadow ${
                        salle.securityLevel === 'Secret' 
                          ? 'bg-red-950/80 border border-red-400 text-red-200'
                          : 'bg-amber-950/80 border border-amber-400 text-amber-200'
                      }`}>
                        {salle.securityLevel}
                      </span>
                    </div>

                    {/* Core Title */}
                    <div className="inline-block p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 mt-1 max-w-full">
                      <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow">
                        {salle.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/90 mt-1 leading-relaxed drop-shadow">
                        {salle.description}
                      </p>
                    </div>

                    {/* Metrics Footer */}
                    <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-lg bg-black/65 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-white">
                      <div className="flex flex-col">
                        <span className="text-white/70">Capacité</span>
                        <span className="text-white font-semibold mt-0.5">{salle.storageCapacity}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white/70">Rayons</span>
                        <span className="text-white font-semibold mt-0.5">{salle.rayonCount} unités</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white/70">Fichiers</span>
                        <span className="text-emerald-300 font-semibold mt-0.5">{salle.fileCount} docs</span>
                      </div>
                    </div>
                  </div>

                  {/* Call To Action */}
                  <button
                    onClick={() => {
                      setSelectedSalleId(salle.id);
                      setCurrentLevel('rayon');
                    }}
                    className="w-full mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/60 text-white text-xs font-bold transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                  >
                    <DoorOpen className="w-4 h-4" />
                    <span>Ouvrir la salle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 3.2. LEVEL RAYONS --- */}
        {currentLevel === 'rayon' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {RAYONS.filter(r => r.salleId === selectedSalleId).map((rayon) => (
              <div
                key={rayon.id}
                className="group relative overflow-hidden rounded-xl p-4 sm:p-5 bg-[#02090c] border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[260px]"
              >
                {/* Cover Image claire et bien visible */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={rayon.coverImage || '/assets/cover_rayon_lockers.jpg'}
                    alt={rayon.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* HUD Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-black/70 text-emerald-400 border border-emerald-400/50 text-[10px] font-mono rounded font-bold backdrop-blur-sm shadow">
                          {rayon.matricule}
                        </span>
                        <span className="text-[10px] sm:text-xs text-white font-mono px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm shadow">
                          {rayon.rowNumber}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[9px] font-mono text-white backdrop-blur-sm shadow">
                        {rayon.material}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="inline-block p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 mt-1 max-w-full">
                      <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow">
                        {rayon.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/90 mt-1 leading-relaxed drop-shadow">
                        {rayon.description}
                      </p>
                    </div>

                    {/* Metrics with clean dark plate */}
                    <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 rounded-lg bg-black/65 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-white">
                      <div className="flex flex-col">
                        <span className="text-white/70">Casiers</span>
                        <span className="text-white font-semibold mt-0.5">{rayon.casierCount} unités</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white/70">Total documents</span>
                        <span className="text-emerald-300 font-semibold mt-0.5">{rayon.fileCount} fichiers</span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => {
                      setSelectedRayonId(rayon.id);
                      setCurrentLevel('casier');
                    }}
                    className="w-full mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/60 text-white text-xs font-bold transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Inspecter les casiers</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 3.3. LEVEL CASIERS --- */}
        {currentLevel === 'casier' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {CASIERS.filter(c => c.rayonId === selectedRayonId).map((casier) => (
              <div
                key={casier.id}
                className="group relative overflow-hidden rounded-xl p-4 sm:p-5 bg-[#02090c] border border-emerald-500/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(74,222,128,0.1)] hover:shadow-[0_0_25px_rgba(74,222,128,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[260px]"
              >
                {/* Cover Image claire et bien visible */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img
                    src={casier.coverImage || '/assets/cover_single_casier.jpg'}
                    alt={casier.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* HUD Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-black/70 text-emerald-400 border border-emerald-400/50 text-[10px] font-mono rounded font-bold backdrop-blur-sm shadow">
                          {casier.matricule}
                        </span>
                        <span className="text-[10px] sm:text-xs text-white font-mono px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm shadow">
                          Conteneurs : {casier.boxCount} boîtes
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="inline-block p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 mt-1 max-w-full">
                      <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors drop-shadow">
                        {casier.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/90 mt-1 leading-relaxed drop-shadow">
                        {casier.description}
                      </p>
                    </div>

                    {/* Subtitle properties with clean dark plate */}
                    <div className="mt-4 p-2.5 rounded-lg bg-black/65 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-white flex items-center justify-between">
                      <div>
                        <span className="text-white/70">Type :</span>
                        <span className="text-white font-semibold ml-1">{casier.lockerType}</span>
                      </div>
                      <span className="text-emerald-300 font-bold drop-shadow">{casier.folderIds.length} Dossier(s)</span>
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => {
                      setSelectedCasierId(casier.id);
                      setCurrentLevel('dossier');
                    }}
                    className="w-full mt-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/60 text-white text-xs font-bold transition-all cursor-pointer shadow-lg backdrop-blur-sm"
                  >
                    <Box className="w-4 h-4" />
                    <span>Consulter les dossiers</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- 3.4. LEVEL DOSSIERS LIST / GRID --- */}
        {currentLevel === 'dossier' && (
          <div className="pt-2">
            <DocumentGrid
              folders={filteredFolders}
              selectedFolderId={selectedFolderId}
              onSelectFolder={onSelectFolder}
              onOpenFolder={handleOpenFolder}
              onPreviewSpecial={onPreviewSpecial}
              onShare={onShare}
              onToggleFavorite={onToggleFavorite}
              onViewProperties={onViewProperties}
              onDelete={onDeleteFolder}
            />
          </div>
        )}

      </div>
    </div>
  );
}
