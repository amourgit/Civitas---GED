import React from 'react';
import { Calendar } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface DocumentTasksDeadlinesSectionProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

const DOCUMENT_TASKS = [
  {
    id: 'task-1',
    title: 'Dossier Marché Rénovation Gymnase Q4 - Pièces manquantes',
    category: 'Marchés Publics',
    deadline: '24 Septembre 2026',
    daysLeft: 'J-6',
    priority: 'URGENT',
    priorityColor: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
    progress: 70,
    assignedTo: 'Claire DUPONT',
    status: 'Attente RC Assurances'
  },
  {
    id: 'task-2',
    title: 'Versement trimestriel des actes d\'État Civil au coffre-fort',
    category: 'Conservation Légale',
    deadline: '30 Septembre 2026',
    daysLeft: 'J-12',
    priority: 'PRIORITAIRE',
    priorityColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    progress: 45,
    assignedTo: 'Service Archives',
    status: 'Contrôle intégrité SHA-256'
  },
  {
    id: 'task-3',
    title: 'Audit de communicabilité des registres fonciers 1995-2005',
    category: 'Plan de Classement',
    deadline: '15 Octobre 2026',
    daysLeft: 'J-27',
    priority: 'EN COURS',
    priorityColor: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
    progress: 85,
    assignedTo: 'Me. Vasseur',
    status: 'Relecture des dérogations'
  },
  {
    id: 'task-4',
    title: 'Signature de la charte télétravail par les représentants',
    category: 'Dialogue Social',
    deadline: '31 Octobre 2026',
    daysLeft: 'J-44',
    priority: 'PLANIFIÉ',
    priorityColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
    progress: 20,
    assignedTo: 'Comité Social',
    status: 'En cours de recueil'
  }
];

export function DocumentTasksDeadlinesSection({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction
}: DocumentTasksDeadlinesSectionProps) {
  return (
    <section className="w-full flex flex-col justify-center select-none">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 items-stretch">
        {DOCUMENT_TASKS.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              playXboxSound('select');
              setActiveCardId(task.id);
            }}
            onMouseEnter={() => {
              playXboxSound('hover');
              setActiveCardId(task.id);
            }}
            className={`p-2 sm:p-2.5 rounded-[3px] bg-[#070e17]/90 backdrop-blur-md transition-all duration-150 cursor-pointer flex flex-col justify-between h-28 sm:h-32 md:h-36 ${
              activeCardId === task.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.35)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]/70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`px-1.5 py-0.2 rounded-xs text-[7px] sm:text-[8px] font-mono font-bold border ${task.priorityColor}`}>
                  {task.priority}
                </span>
                <span className="text-[8px] sm:text-[9px] text-white/80 font-mono flex items-center gap-0.5 bg-black/50 px-1 py-0.2 rounded-xs">
                  <Calendar className="w-2.5 h-2.5 text-teal-400" />
                  <span>{task.daysLeft}</span>
                </span>
              </div>

              <span className="text-white font-bold text-[11px] sm:text-xs line-clamp-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block">
                {task.title}
              </span>

              <p className="text-white/50 text-[8px] sm:text-[9px] font-mono mt-0.5 truncate">
                {task.category}
              </p>
            </div>

            <div className="mt-1 pt-1 border-t border-white/10">
              {/* Progress bar */}
              <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] text-white/60 font-mono mb-0.5">
                <span className="truncate">{task.status}</span>
                <span className="text-teal-300 font-bold ml-1">{task.progress}%</span>
              </div>
              <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[7px] sm:text-[8px] text-white/40 font-mono mt-1 gap-1">
                <span className="truncate">Par : {task.assignedTo}</span>
                <span className="text-white/60 shrink-0">{task.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
