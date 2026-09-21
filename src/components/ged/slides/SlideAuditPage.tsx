import React from 'react';
import { PageBackground } from '../../shell/PageBackground';
import { RecentActivityAuditSection } from '../../dashboard/RecentActivityAuditSection';
import roomDoorImg from '../../../assets/images/room_door_ajar_1789485559176.jpg';

interface SlideAuditPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

/**
 * Slide 7 : Page complète Journal d'Audit (Intégrité & Traçabilité SHA-256)
 * Montée sur la page physique unique (/ged)
 */
export function SlideAuditPage({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onQuickAction,
}: SlideAuditPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={roomDoorImg}
        imageAlt="Porte sécurisée et traçabilité certifiée"
        accent="#4f46e5"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Journal d'audit et logs sécurisés */}
      <div className="w-full h-full flex flex-col justify-center">
        <RecentActivityAuditSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToDocuments={onNavigateToDocuments}
          onQuickAction={onQuickAction}
        />
      </div>
    </div>
  );
}
