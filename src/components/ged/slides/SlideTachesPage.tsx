import React from 'react';
import { PageBackground } from '../../shell/PageBackground';
import { DocumentTasksDeadlinesSection } from '../../dashboard/DocumentTasksDeadlinesSection';
import modernLockersImg from '../../../assets/images/modern_closed_lockers_1789485602078.jpg';

interface SlideTachesPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

/**
 * Slide 5 : Page complète Tâches & Échéances (Contrôle DUA & Sort Final)
 * Montée sur la page physique unique (/ged)
 */
export function SlideTachesPage({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction,
}: SlideTachesPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={modernLockersImg}
        imageAlt="Casiers modernes et gestion des échéances DUA"
        accent="#dc2626"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Tâches documentaires et calendrier d'échéances */}
      <div className="w-full h-full flex flex-col justify-center">
        <DocumentTasksDeadlinesSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToDocuments={onNavigateToDocuments}
          onQuickAction={onQuickAction}
        />
      </div>
    </div>
  );
}
