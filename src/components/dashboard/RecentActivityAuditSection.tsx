import React from 'react';
import { History, ArrowRight, CheckCircle2, Share2, Upload, FileCheck, Scan, User } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface RecentActivityAuditSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

const AUDIT_ACTIVITIES = [
  {
    id: 'act-feed-1',
    user: 'Amour Samuel NZILA',
    action: 'a validé et apposé sa signature électronique',
    target: 'Contrat Partenaire Stratégique 2026.pdf',
    time: 'Il y a 6 min',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
    badge: 'VISA CERTIFIÉ',
    badgeColor: 'text-emerald-300 bg-emerald-500/20 border-emerald-500/30',
    details: 'Hash SHA-256 eIDAS vérifié'
  },
  {
    id: 'act-feed-2',
    user: 'Moteur OCR IA Civitas',
    action: 'a achevé l\'indexation intelligente et l\'extraction entités',
    target: 'Facture_Groupement_BTP_Septembre.pdf',
    time: 'Il y a 18 min',
    icon: <Scan className="w-3.5 h-3.5 text-amber-400" />,
    badge: 'OCR 99.2%',
    badgeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/30',
    details: '4 entités nommées détectées'
  },
  {
    id: 'act-feed-3',
    user: 'Laura Denvida (RH)',
    action: 'a créé un lien de partage sécurisé temporaire',
    target: 'Dossier_Candidature_Cadre_Dirigeant',
    time: 'Il y a 42 min',
    icon: <Share2 className="w-3.5 h-3.5 text-sky-400" />,
    badge: 'PARTAGE SÉCURISÉ',
    badgeColor: 'text-sky-300 bg-sky-500/20 border-sky-500/30',
    details: 'Expiration dans 7 jours • Mot de passe actif'
  },
  {
    id: 'act-feed-4',
    user: 'Système d\'Archivage Légal',
    action: 'a scellé le versement au coffre-fort numérique',
    target: 'Registre_Conseil_Administration_Q3_2025.pdf',
    time: 'Il y a 1h 15',
    icon: <FileCheck className="w-3.5 h-3.5 text-purple-400" />,
    badge: 'ARCHIVAGE PROUVÉ',
    badgeColor: 'text-purple-300 bg-purple-500/20 border-purple-500/30',
    details: 'Conservation 10 ans certifiée Z42-013'
  }
];

export function RecentActivityAuditSection({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction
}: RecentActivityAuditSectionProps) {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Activité récente & Journal d'audit
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
            Flux temps réel
          </span>
        </div>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            if (onQuickAction) onQuickAction('journal_audit');
            else onNavigateToDocuments();
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Journal complet</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5">
        {AUDIT_ACTIVITIES.map((activity) => (
          <div
            key={activity.id}
            onClick={() => {
              playXboxSound('select');
              setActiveCardId(activity.id);
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId(activity.id);
            }}
            className={`p-3 rounded-[3px] bg-[#070e17]/85 backdrop-blur-md transition-all duration-150 cursor-pointer flex flex-col justify-between ${
              activeCardId === activity.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.35)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]/70'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                  {activity.icon}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-white font-bold text-xs">
                      {activity.user}
                    </span>
                    <span className="text-white/60 text-[11px]">
                      {activity.action}
                    </span>
                  </div>
                  <p className="text-emerald-400 font-medium text-xs truncate mt-0.5">
                    {activity.target}
                  </p>
                </div>
              </div>

              <span className={`px-1.5 py-0.5 rounded-[2px] text-[8px] font-mono font-bold border shrink-0 ${activity.badgeColor}`}>
                {activity.badge}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[10px] text-white/50 font-mono">
              <span>{activity.details}</span>
              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
