import React from 'react';
import { PageBackground } from '../../shell/PageBackground';
import { ActionRequiredDocumentsSection } from '../../dashboard/ActionRequiredDocumentsSection';
import singleLockersImg from '../../../assets/images/single_lockers_1789486166819.jpg';

interface SlideActionsRequisesPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

/**
 * Slide 2 : Page complète Actions Requises (Visas & Signatures en attente)
 * Montée sur la page physique unique (/ged)
 */
export function SlideActionsRequisesPage({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction,
}: SlideActionsRequisesPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={singleLockersImg}
        imageAlt="Casiers de conservation et actions requises"
        accent="#d97706"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Documents nécessitant une action prioritaire */}
      <div className="w-full h-full flex flex-col justify-center">
        <ActionRequiredDocumentsSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToDocuments={onNavigateToDocuments}
          onQuickAction={onQuickAction}
        />
      </div>
    </div>
  );
}
