import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, PenTool, ShieldAlert, Clock, ArrowUpRight } from 'lucide-react';
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
    roleRequired: 'Signataire Autorisé (Direction)',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    actionLabel: 'Signer l\'acte',
    actionIcon: 'pen'
  },
  {
    id: 'act-2',
    docId: 'doc-act-02',
    title: 'Bon de Commande & Engagement DSI #9482.pdf',
    type: 'VISA & VALIDATION BUDGÉTAIRE',
    typeColor: 'text-rose-300 bg-rose-500/20 border-rose-500/40',
    deadline: 'Aujourd\'hui 18:00',
    urgency: 'high',
    assignedBy: 'Trésorerie Centrale',
    roleRequired: 'Ordonnateur des Dépenses',
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
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Documents nécessitant une action
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-amber-500/25 text-amber-300 text-[10px] font-mono border border-amber-500/40 animate-pulse">
            {ACTION_REQUIRED_DOCS.length} en attente de visa
          </span>
        </div>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            if (onQuickAction) onQuickAction('actions_requises');
            else onNavigateToDocuments();
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Tout traiter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 sm:gap-1.5 items-stretch">
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
            className={`relative group cursor-pointer h-44 sm:h-48 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === doc.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-amber-500/30 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src={doc.image} 
              alt={doc.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.55]"
            />

            {/* Top Bar with Urgency Tag & Countdown */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded-[2px] backdrop-blur-md text-[9px] font-mono font-bold border ${doc.typeColor}`}>
                {doc.type}
              </span>
              <span className="text-[10px] text-amber-300 font-mono font-bold bg-black/75 px-2 py-0.5 rounded-[2px] border border-amber-500/30 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-amber-400" />
                {doc.deadline}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#020508]/98 via-[#020508]/80 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col justify-end">
              <span className="text-white font-bold text-xs sm:text-sm tracking-tight line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {doc.title}
              </span>
              
              <div className="flex items-center justify-between text-white/70 text-[10px] mt-1 font-mono">
                <span className="truncate">Par : {doc.assignedBy}</span>
                <span className="text-white/50">{doc.roleRequired}</span>
              </div>

              {/* Action Button inside card */}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                  {doc.actionLabel}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="px-1.5 py-0.2 rounded bg-white/10 text-white/80 text-[9px] font-mono">
                  ACTION REQUISE
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
