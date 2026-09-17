import React from 'react';
import { CheckSquare, Calendar, ArrowRight, Clock, AlertTriangle, CheckCircle, UserCheck } from 'lucide-react';
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
    title: 'Validation du rapport d\'audit interne Q3 2025',
    category: 'Audit & Conformité',
    deadline: '22 Septembre 2026',
    daysLeft: 'J-5',
    priority: 'URGENTE',
    priorityColor: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
    progress: 75,
    assignedTo: 'Amour Samuel NZILA',
    status: 'En révision finale'
  },
  {
    id: 'task-2',
    title: 'Renouvellement des baux commerciaux & annexes',
    category: 'Patrimoine & Logistique',
    deadline: '30 Septembre 2026',
    daysLeft: 'J-13',
    priority: 'NORMALE',
    priorityColor: 'text-sky-400 bg-sky-500/20 border-sky-500/30',
    progress: 40,
    assignedTo: 'Service Juridique',
    status: 'Attente pièces'
  },
  {
    id: 'task-3',
    title: 'Archivage légal & purge des dossiers RH 2015-2016',
    category: 'Ressources Humaines',
    deadline: '15 Octobre 2026',
    daysLeft: 'J-28',
    priority: 'CONFORMITÉ',
    priorityColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
    progress: 90,
    assignedTo: 'Laura Denvida',
    status: 'Certificats prêts'
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
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-teal-400" />
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Tâches documentaires & Échéances
          </h3>
          <span className="px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 text-[10px] font-mono border border-teal-500/30">
            4 tâches en cours
          </span>
        </div>
        <button 
          type="button"
          onClick={() => {
            playXboxSound('select');
            if (onQuickAction) onQuickAction('taches');
            else onNavigateToDocuments();
          }}
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Planning complet</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-1.5">
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
            className={`p-3 rounded-[3px] bg-[#070e17]/85 backdrop-blur-md transition-all duration-150 cursor-pointer flex flex-col justify-between ${
              activeCardId === task.id
                ? 'border-2 border-[#22c55e] shadow-[0_0_18px_rgba(34,197,94,0.35)] ring-1 ring-[#22c55e]/50'
                : 'border border-white/10 hover:border-[#22c55e]/70'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className={`px-1.5 py-0.5 rounded-[2px] text-[8px] font-mono font-bold border ${task.priorityColor}`}>
                  {task.priority}
                </span>
                <span className="text-[10px] text-white/80 font-mono flex items-center gap-1 bg-black/50 px-1.5 py-0.5 rounded-[2px]">
                  <Calendar className="w-2.5 h-2.5 text-teal-400" />
                  {task.daysLeft}
                </span>
              </div>

              <span className="text-white font-bold text-xs line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {task.title}
              </span>

              <p className="text-white/50 text-[10px] font-mono mt-1">
                {task.category}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/10">
              {/* Progress bar */}
              <div className="w-full flex items-center justify-between text-[9px] text-white/60 font-mono mb-1">
                <span>{task.status}</span>
                <span className="text-teal-300 font-bold">{task.progress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-white/40 font-mono mt-1.5">
                <span className="truncate">Assigné : {task.assignedTo}</span>
                <span className="text-white/60">{task.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
