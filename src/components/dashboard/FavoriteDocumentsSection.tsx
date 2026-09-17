import React from 'react';
import { Star, ArrowRight, Bookmark, FileText } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface FavoriteDocumentsSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onSelectDocument?: (docId: string) => void;
  onNavigateToDocuments: () => void;
}

const FAVORITE_DOCS = [
  {
    id: 'fav-1',
    docId: 'doc-fav-01',
    title: 'Statuts Juridiques & PV Assemblée Générale 2025.pdf',
    category: 'Gouvernance & Légal',
    format: 'PDF',
    size: '12.4 Mo',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-amber-400',
    starredDate: 'Épinglé permanent'
  },
  {
    id: 'fav-2',
    docId: 'doc-fav-02',
    title: 'Manuel Sécurité SI & Charte Informatique 2026.pdf',
    category: 'DSI & Cybersécurité',
    format: 'PDF',
    size: '3.8 Mo',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-emerald-400',
    starredDate: 'Favori Prioritaire'
  },
  {
    id: 'fav-3',
    docId: 'doc-fav-03',
    title: 'Matrice de Délégation de Pouvoirs & Signatures.xlsx',
    category: 'Direction Générale',
    format: 'XLSX',
    size: '2.1 Mo',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-purple-400',
    starredDate: 'Accès Quotidien'
  },
  {
    id: 'fav-4',
    docId: 'doc-fav-04',
    title: 'Guide d Intégration Nouveaux Collaborateurs.pdf',
    category: 'Ressources Humaines',
    format: 'PDF',
    size: '6.5 Mo',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    tagColor: 'text-sky-400',
    starredDate: 'Épinglé'
  }
];

export function FavoriteDocumentsSection({
  activeCardId,
  setActiveCardId,
  onSelectDocument,
  onNavigateToDocuments
}: FavoriteDocumentsSectionProps) {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Mes contenus favoris
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
            {FAVORITE_DOCS.length} épinglés
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
          <span>Gérer favoris</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-1.5">
        {FAVORITE_DOCS.map((doc) => (
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
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.7]"
            />

            {/* Top Star badge */}
            <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-[2px] bg-amber-500/30 backdrop-blur-md text-amber-300 text-[9px] font-mono font-bold border border-amber-500/40 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-amber-300" />
                {doc.starredDate}
              </span>
              <span className="px-1.5 py-0.5 rounded-[2px] bg-black/70 backdrop-blur-md text-white text-[9px] font-mono font-bold border border-white/20">
                {doc.format}
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
              <div className="flex items-center justify-between text-white/60 text-[10px] mt-1 pt-1 border-t border-white/10 font-mono">
                <span>{doc.size}</span>
                <span className="text-emerald-400">Accès direct</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
