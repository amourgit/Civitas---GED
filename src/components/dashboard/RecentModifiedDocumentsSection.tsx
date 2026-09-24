import React from 'react';
import { Edit3, ArrowRight, GitCommit, User } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface RecentModifiedDocumentsSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onSelectDocument?: (docId: string) => void;
  onNavigateToDocuments: () => void;
}

const RECENT_MODIFIED = [
  {
    id: 'mod-1',
    docId: 'doc-mod-01',
    title: 'Avenant Contrat Cadre Prestataires v3.2.docx',
    category: 'Achats & Logistique',
    version: 'v3.2',
    author: 'Marc Dubois',
    modifiedAt: 'Il y a 22 min',
    changes: '+3 clauses révisées',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-emerald-400'
  },
  {
    id: 'mod-2',
    docId: 'doc-mod-02',
    title: 'Grille Salariale & Primes 2026.xlsx',
    category: 'Ressources Humaines',
    version: 'v4.0',
    author: 'Amour Samuel NZILA NGALA',
    modifiedAt: 'Il y a 1h 10',
    changes: 'Indexation annuelle validée',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-purple-400'
  },
  {
    id: 'mod-3',
    docId: 'doc-mod-03',
    title: 'Manuel Procédures Qualité ISO 9001.pdf',
    category: 'Audit & Process',
    version: 'v1.8',
    author: 'Amour Samuel NZILA NGALA',
    modifiedAt: 'Il y a 3h',
    changes: 'Mise à jour cartographie risques',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-amber-400'
  },
  {
    id: 'mod-4',
    docId: 'doc-mod-04',
    title: 'Dossier Technique Appel d Offres Telecom.pdf',
    category: 'Projets Spéciaux',
    version: 'v2.1',
    author: 'Amour Samuel NZILA',
    modifiedAt: 'Hier à 18:40',
    changes: 'Spécifications serveurs & fibre',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-sky-400'
  }
];

export function RecentModifiedDocumentsSection({
  activeCardId,
  setActiveCardId,
  onSelectDocument,
  onNavigateToDocuments
}: RecentModifiedDocumentsSectionProps) {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit3 className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Documents récemment modifiés
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-white/10 text-white/75 text-[10px] font-mono">
            {RECENT_MODIFIED.length}
          </span>
        </div>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            onNavigateToDocuments();
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Historique versions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-1.5">
        {RECENT_MODIFIED.map((doc) => (
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
            className={`relative group cursor-pointer h-36 sm:h-40 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === doc.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src={doc.image} 
              alt={doc.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.65]"
            />

            {/* Version & Changes Badge */}
            <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-[2px] bg-emerald-500/30 backdrop-blur-md text-emerald-300 text-[9px] font-mono font-bold border border-emerald-500/40 flex items-center gap-1">
                <GitCommit className="w-2.5 h-2.5" />
                {doc.version}
              </span>
              <span className="text-[10px] text-white/80 font-mono bg-black/60 px-1.5 py-0.5 rounded-[2px] border border-white/10">
                {doc.modifiedAt}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#020508]/98 via-[#020508]/75 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end">
              <span className={`text-[9px] uppercase font-mono tracking-wider font-bold mb-0.5 ${doc.tagColor}`}>
                {doc.category}
              </span>
              <span className="text-white font-bold text-xs sm:text-sm tracking-tight truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {doc.title}
              </span>
              <p className="text-white/70 text-[11px] truncate mt-0.5">
                {doc.changes}
              </p>
              <div className="flex items-center gap-1.5 text-white/50 text-[10px] mt-1 pt-1 border-t border-white/10 font-mono">
                <User className="w-3 h-3 text-white/40" />
                <span className="truncate">Modifié par {doc.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
