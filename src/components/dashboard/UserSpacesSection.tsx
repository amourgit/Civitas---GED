import React from 'react';
import { Layers, ArrowRight, Users, Shield, HardDrive } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface UserSpacesSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

const USER_SPACES = [
  {
    id: 'space-1',
    name: 'Direction Générale & Exécutive',
    code: 'DG-SPACE',
    role: 'Administrateur',
    members: 14,
    docCount: '12 480 docs',
    security: 'SECRET DÉFENSE',
    securityColor: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'space-2',
    name: 'Pôle Juridique, Contrats & Marchés',
    code: 'JUR-SPACE',
    role: 'Contributeur Clé',
    members: 28,
    docCount: '8 640 docs',
    security: 'RESTREINT',
    securityColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'space-3',
    name: 'Ressources Humaines & Talents',
    code: 'RH-SPACE',
    role: 'Gestionnaire RH',
    members: 42,
    docCount: '5 920 docs',
    security: 'CONFIDENTIEL RH',
    securityColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'space-4',
    name: 'Finance, Comptabilité & Fiscalité',
    code: 'FIN-SPACE',
    role: 'Auditeur & Visa',
    members: 19,
    docCount: '15 320 docs',
    security: 'AUDITÉ ISO',
    securityColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'space-5',
    name: 'Infrastructures Cloud & Sécurité IT',
    code: 'IT-SPACE',
    role: 'Responsable SI',
    members: 31,
    docCount: '4 110 docs',
    security: 'RESTREINT DSI',
    securityColor: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'space-6',
    name: 'Espace R&D & Propriété Intellectuelle',
    code: 'RD-SPACE',
    role: 'Consultant',
    members: 16,
    docCount: '2 870 docs',
    security: 'CONFIDENTIEL',
    securityColor: 'text-teal-400 bg-teal-500/20 border-teal-500/30',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80'
  }
];

export function UserSpacesSection({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction
}: UserSpacesSectionProps) {
  return (
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Mes espaces de travail
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
            {USER_SPACES.length} organisations
          </span>
        </div>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            if (onQuickAction) onQuickAction('espaces');
            else onNavigateToDocuments();
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Tous les espaces</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-1 sm:gap-1.5">
        {USER_SPACES.map((space) => (
          <div
            key={space.id}
            onClick={() => {
              playXboxSound('select');
              setActiveCardId(space.id);
              onNavigateToDocuments();
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId(space.id);
            }}
            className={`relative group cursor-pointer h-32 sm:h-36 rounded-[3px] overflow-hidden transition-all duration-150 ${
              activeCardId === space.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]'
            }`}
          >
            <img 
              src={space.image} 
              alt={space.name}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 brightness-[0.6]"
            />

            {/* Top Security & Code Tag */}
            <div className="absolute top-2 left-2 right-2 z-10 flex items-center justify-between">
              <span className={`px-1.5 py-0.5 rounded-[2px] backdrop-blur-md text-[8px] font-mono font-bold border ${space.securityColor}`}>
                {space.security}
              </span>
              <span className="text-[9px] text-white/75 font-mono bg-black/60 px-1 py-0.5 rounded-[2px] border border-white/10">
                {space.code}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#020508]/98 via-[#020508]/75 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-2.5 flex flex-col justify-end">
              <span className="text-white font-bold text-xs tracking-tight line-clamp-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {space.name}
              </span>
              <div className="flex items-center justify-between text-white/60 text-[10px] mt-1 pt-1 border-t border-white/10 font-mono">
                <span className="flex items-center gap-1">
                  <Users className="w-2.5 h-2.5 text-white/40" />
                  {space.members}
                </span>
                <span>{space.docCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
