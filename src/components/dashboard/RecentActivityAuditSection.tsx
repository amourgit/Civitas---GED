import React from 'react';
import { CheckCircle2, Share2, FileCheck, Scan } from 'lucide-react';
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
    user: 'Amour Samuel NZILA NGALA (CIVITAS Gabon)',
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
    <section className="w-full flex flex-col justify-center select-none">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 items-stretch">
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
            className={`p-2 sm:p-2.5 rounded-[3px] bg-[#070e17]/90 backdrop-blur-md transition-all duration-150 cursor-pointer flex flex-col justify-between h-28 sm:h-32 md:h-36 ${
              activeCardId === activity.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.35)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]/70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`px-1.5 py-0.2 rounded-xs text-[7px] sm:text-[8px] font-mono font-bold border truncate ${activity.badgeColor}`}>
                  {activity.badge}
                </span>
                <span className="text-[7px] sm:text-[8px] text-white/50 font-mono shrink-0">
                  {activity.time}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                  {activity.icon}
                </div>
                <span className="text-white font-bold text-[11px] sm:text-xs truncate">
                  {activity.user}
                </span>
              </div>

              <p className="text-emerald-300 font-medium text-[9px] sm:text-[10px] truncate">
                {activity.target}
              </p>
            </div>

            <div className="mt-1 pt-1 border-t border-white/10 text-[8px] sm:text-[9px] text-white/50 font-mono">
              <span className="truncate block">{activity.details}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
