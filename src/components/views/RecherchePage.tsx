import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowLeft, 
  Filter, 
  FileText, 
  Archive, 
  Calendar, 
  User, 
  Landmark,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

export function RecherchePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('Tous');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#030708] text-white overflow-hidden select-none">
      {/* Header */}
      <div className="w-full bg-[#070d14] border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => { playXboxSound('back'); navigate('/'); }}
            className="p-1.5 rounded-[2px] bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Accueil</span>
          </button>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-white/40 text-xs font-mono">SGAI</span>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-teal-400 font-bold text-xs flex items-center gap-1">
            <Search className="w-3.5 h-3.5" />
            RECHERCHE TRANSVERSALE PLEIN TEXTE & COTES
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 sm:space-y-10 max-w-4xl mx-auto w-full">
        {/* Search Box */}
        <div className="p-4 rounded-[3px] bg-[#050b12] border border-white/10 space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par cote (ex: 4 E 1245), référence, mot-clé, nom d'administré..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-[2px] text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-teal-400 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-white/40">Filtre Service :</span>
            {['Tous', 'État civil', 'Urbanisme', 'Conseil municipal', 'Finances', 'RH'].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedService(s)}
                className={`px-2 py-1 rounded-[2px] border text-xs ${
                  selectedService === s
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                    : 'bg-white/[0.03] text-white/60 border-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results Example */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase text-white/50 tracking-wider">
            Exemples de dossiers et documents indexés
          </h4>

          <div 
            onClick={() => navigate('/services')}
            className="p-3.5 rounded-[3px] bg-[#050b12] border border-white/10 hover:border-teal-400 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-[2px]">
                  EC-2026-001245
                </span>
                <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-1.5 py-0.2 rounded-[2px] border border-purple-500/30">
                  Cote : 4 E 1245 / 2026
                </span>
                <span className="text-xs text-white/50">Service État civil</span>
              </div>
              <h5 className="text-sm font-bold text-white">
                Acte de naissance — Alexandre MAVOUNGOU
              </h5>
              <p className="text-xs text-white/60">
                Déclaration de naissance, certificat médical accouchement CHU, livret de famille.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40" />
          </div>

          <div 
            onClick={() => navigate('/services')}
            className="p-3.5 rounded-[3px] bg-[#050b12] border border-white/10 hover:border-teal-400 transition-colors cursor-pointer flex items-center justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-[2px]">
                  URB-2026-00421
                </span>
                <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-1.5 py-0.2 rounded-[2px] border border-purple-500/30">
                  Cote : PC 2026 / 00421
                </span>
                <span className="text-xs text-white/50">Service Urbanisme</span>
              </div>
              <h5 className="text-sm font-bold text-white">
                Permis de construire — Complexe Médical Quartier Nord
              </h5>
              <p className="text-xs text-white/60">
                Plans masse architecte DWG, étude d'impact, arrêté accordé par le Maire.
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
