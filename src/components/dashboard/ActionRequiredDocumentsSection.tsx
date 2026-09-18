import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface ActionRequiredDocumentsSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onSelectDocument?: (docId: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

const ACTION_REQUIRED_DOCS = [
  {
    id: 'act-1',
    docId: 'doc-act-01',
    title: 'Convention Partenariat Commercial 2026.pdf',
    type: 'SIGNATURE ÉLECTRONIQUE',
    typeColor: 'text-amber-300 bg-amber-500/20 border-amber-500/40',
    deadline: 'Expire dans 4h',
    urgency: 'high',
    assignedBy: 'Me. Alexandre Vasseur',
    roleRequired: 'Signataire Autorisé',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    actionLabel: 'Signer l\'acte',
    actionIcon: 'pen'
  },
  {
    id: 'act-2',
    docId: 'doc-act-02',
    title: 'Bon de Commande & Engagement DSI #9482.pdf',
    type: 'VISA BUDGÉTAIRE',
    typeColor: 'text-rose-300 bg-rose-500/20 border-rose-500/40',
    deadline: 'Aujourd\'hui 18:00',
    urgency: 'high',
    assignedBy: 'Trésorerie Centrale',
    roleRequired: 'Ordonnateur',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    actionLabel: 'Viser & Valider',
    actionIcon: 'check'
  },
  {
    id: 'act-3',
    docId: 'doc-act-03',
    title: 'Avenant Contrat Cadre Mutuelle Santé.docx',
    type: 'RELECTURE JURIDIQUE',
    typeColor: 'text-sky-300 bg-sky-500/20 border-sky-500/40',
    deadline: 'Demain midi',
    urgency: 'medium',
    assignedBy: 'Service RH & Social',
    roleRequired: 'Juriste Entreprise',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    actionLabel: 'Examiner le projet',
    actionIcon: 'arrow'
  }
];

export function ActionRequiredDocumentsSection({
  activeCardId,
  setActiveCardId,
  onSelectDocument,
  onNavigateToDocuments,
  onQuickAction
}: ActionRequiredDocumentsSectionProps) {
  return (
    <section className="w-full flex flex-col justify-center">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 items-stretch">
        {ACTION_REQUIRED_DOCS.map((doc) => (
          <div
            key={doc.id}
            onClick={() => {
              playXboxSound('select');
              setActiveCardId(doc.id);
              if (onSelectDocument) onSelectDocument(doc.docId);
              else onNavigateToDocuments();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId(doc.id);
            }}
            className={`relative group cursor-pointer h-28 sm:h-36 md:h-44 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === doc.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-amber-500/30 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src={doc.image} 
              alt={doc.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.55]"
            />

            {/* Top Bar with Urgency Tag & Countdown */}
            <div className="absolute top-1.5 left-1.5 right-1.5 sm:top-2 sm:left-2 sm:right-2 z-10 flex items-center justify-between gap-1">
              <span className={`px-1.5 py-0.2 rounded-xs backdrop-blur-md text-[7px] sm:text-[9px] font-mono font-bold border truncate ${doc.typeColor}`}>
                {doc.type}
              </span>
              <span className="text-[7px] sm:text-[9px] text-amber-300 font-mono font-bold bg-black/75 px-1 py-0.2 rounded-xs border border-amber-500/30 flex items-center gap-0.5 shrink-0">
                <Clock className="w-2 h-2 text-amber-400" />
                <span>{doc.deadline}</span>
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#020508]/98 via-[#020508]/80 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2.5 md:p-3 flex flex-col justify-end">
              <span className="text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-tight line-clamp-1 sm:line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {doc.title}
              </span>
              
              <div className="hidden sm:flex items-center justify-between text-white/70 text-[8px] sm:text-[9px] mt-0.5 font-mono gap-1">
                <span className="truncate">Par : {doc.assignedBy}</span>
                <span className="text-white/50 shrink-0 text-right">{doc.roleRequired}</span>
              </div>

              {/* Action Button inside card */}
              <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] md:text-[11px] text-emerald-400 font-semibold group-hover:underline flex items-center gap-0.5 truncate">
                  <span>{doc.actionLabel}</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </span>
                <span className="px-1 py-0.2 rounded bg-white/10 text-white/80 text-[7px] sm:text-[8px] font-mono hidden md:inline-block">
                  URGENT
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
