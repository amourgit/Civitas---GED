"use client";

import React from 'react';
import { Info, Phone, Mail, Clock, HelpCircle, ShieldAlert, Wrench, Headphones } from 'lucide-react';
import { playXboxSound } from '../../../utils/xboxAudio';

export function ServicesInfosTab() {
  const supportUnits = [
    {
      title: 'Assistance Informatique & Support Technique (DSI)',
      email: 'support.dsi@egen.cd',
      phone: '+243 81 000 4400',
      hours: 'Lundi - Vendredi : 07h30 - 18h00 | Samedi : 08h30 - 12h30',
      description: 'Support technique pour postes de travail, réinitialisation de mots de passe, accès réseau et pannes applicatives.',
      badge: 'Helpdesk 24/7'
    },
    {
      title: 'Guichet Ressources Humaines & Mobilité Interne',
      email: 'rh.intranet@egen.cd',
      phone: '+243 82 111 2200',
      hours: 'Lundi - Vendredi : 08h30 - 16h30',
      description: 'Assistance pour fiches de paie, demandes de congés, attestation de service et dossier individuel.',
      badge: 'Permanence RH'
    },
    {
      title: 'Moyens Généraux, Logistique & Bâtiments',
      email: 'logistique@egen.cd',
      phone: '+243 85 333 9900',
      hours: 'Lundi - Vendredi : 08h00 - 17h00',
      description: 'Demande de fournitures de bureau, entretien des locaux, aménagement des salles et badges physiques d’accès.',
      badge: 'Logistique'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">
          Informations, Support & Contacts d'Assistance
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Coordonnées des guichets d’assistance, horaires d’ouverture et permanences de service.
        </p>
      </div>

      {/* Support Cards */}
      <div className="space-y-4">
        {supportUnits.map((unit, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-slate-900/60 border border-white/10 space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                  {unit.badge}
                </span>
                <h3 className="text-base font-bold text-white">{unit.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {unit.description}
            </p>

            <div className="pt-3 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${unit.email}`} className="hover:text-teal-300 transition-colors font-medium truncate">
                  {unit.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-medium">{unit.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="text-[11px] truncate">{unit.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
