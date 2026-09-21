import React from 'react';
import { PageBackground } from '../../shell/PageBackground';
import { MainMenuSection } from '../../dashboard/MainMenuSection';
import codVaultImg from '../../../assets/images/cod_archive_vault.jpg';

interface SlideModulesPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
  onNavigateToIngestion: () => void;
  onQuickAction?: (actionName: string) => void;
}

/**
 * Slide 0 : Page complète Espace Métier SGAI & Conservation Physique
 * Montée sur la page physique unique (/ged)
 */
export function SlideModulesPage({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
  onNavigateToIngestion,
  onQuickAction,
}: SlideModulesPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={codVaultImg}
        imageAlt="Salle d'archivage moderne SGAI 3D"
        accent="#0284c7"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Bento Grid SGAI & Raccourcis Rapides */}
      <div className="w-full h-full flex flex-col justify-center">
        <MainMenuSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToDocuments={onNavigateToDocuments}
          onNavigateToIngestion={onNavigateToIngestion}
          onQuickAction={onQuickAction}
        />
      </div>
    </div>
  );
}
