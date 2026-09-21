import React from 'react';
import { PageBackground } from '../../shell/PageBackground';
import { MyActionsSection } from '../../dashboard/MyActionsSection';
import casierOuvertImg from '../../../assets/images/casier_ouvert_zoom_1789489855356.jpg';

interface SlideMesActionsPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

/**
 * Slide 3 : Page complète Mes Actions (Traçabilité & Journal Opérateur)
 * Montée sur la page physique unique (/ged)
 */
export function SlideMesActionsPage({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction,
}: SlideMesActionsPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={casierOuvertImg}
        imageAlt="Zoom casier et traçabilité des actions"
        accent="#10b981"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Actions documentaires de l'utilisateur */}
      <div className="w-full h-full flex flex-col justify-center">
        <MyActionsSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToDocuments={onNavigateToDocuments}
          onQuickAction={onQuickAction}
        />
      </div>
    </div>
  );
}
