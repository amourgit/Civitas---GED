"use client";

import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

export function ServicesMembresTab() {
  const [search, setSearch] = useState('');

  const members = [
    {
      id: 1,
      name: 'M. Jean-Luc BIKANGA',
      role: 'Directeur des Systèmes d’Information (DSI)',
      service: 'Direction Générale - DSI',
      email: 'j.bikanga@egen.cd',
      phone: '+243 81 001 2233',
      location: 'Bureau 301 - Siège Kinshasa',
      status: 'En ligne',
      avatar: 'JB'
    },
    {
      id: 2,
      name: 'Mme Marie-Claire MBUYI',
      role: 'Chef de Département GED & Archivage',
      service: 'Gestion Documentaire',
      email: 'mc.mbuyi@egen.cd',
      phone: '+243 82 445 1190',
      location: 'Bureau 104 - Annexe A',
      status: 'En réunion',
      avatar: 'MM'
    },
    {
      id: 3,
      name: 'Ing. Serge KABEYA',
      role: 'Administrateur Réseaux & Sécurité (IAM)',
      service: 'Infrastructures & Sécurité',
      email: 's.kabeya@egen.cd',
      phone: '+243 85 990 3311',
      location: 'Datacenter R-01',
      status: 'En ligne',
      avatar: 'SK'
    },
    {
      id: 4,
      name: 'Mme Patricia TSHILOMBA',
      role: 'Responsable du Support Utilisateurs & Helpdesk',
      service: 'Assistance Informatique',
      email: 'p.tshilomba@egen.cd',
      phone: '+243 89 221 0044',
      location: 'Poste 4400 - Helpdesk',
      status: 'Disponible',
      avatar: 'PT'
    },
    {
      id: 5,
      name: 'M. Patrick LUKUSA',
      role: 'Chef de Projet Numérique & Développeur',
      service: 'Applications Métier',
      email: 'p.lukusa@egen.cd',
      phone: '+243 99 778 5522',
      location: 'Bureau 202 - Lab Tech',
      status: 'Occupé',
      avatar: 'PL'
    }
  ];

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white">
            Membres & Équipes du Service
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Annuaire des collaborateurs et contacts clés des services numériques.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un membre..."
            className="w-full bg-slate-900/80 text-white placeholder-slate-400 text-xs pl-9 pr-3 py-2 rounded-lg border border-white/10 focus:outline-hidden focus:border-teal-400/50"
          />
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMembers.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-4 hover:border-teal-400/40 transition-colors"
          >
            <div className="size-11 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md text-sm">
              {m.avatar}
            </div>

            <div className="flex-1 space-y-1.5 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white truncate">{m.name}</h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    m.status === 'En ligne' || m.status === 'Disponible'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {m.status}
                </span>
              </div>

              <p className="text-xs text-teal-300 font-medium">{m.role}</p>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="truncate">{m.service}</span>
              </p>

              <div className="pt-2 border-t border-white/5 space-y-1 text-xs text-slate-300">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <a href={`mailto:${m.email}`} className="hover:text-teal-300 transition-colors truncate">
                    {m.email}
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{m.phone}</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{m.location}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
