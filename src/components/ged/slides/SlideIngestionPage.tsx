import React from 'react';
import { PageBackground } from '../../shell/PageBackground';
import { IngestionSessionsSection } from '../../dashboard/IngestionSessionsSection';
import energyBgImg from '../../../assets/images/gofast_energy_bg_1789114133846.jpg';

interface SlideIngestionPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToIngestion: () => void;
}

/**
 * Slide 6 : Page complète Entrées & Dépôts (Numérisation, OCR & Analyse IA)
 * Montée sur la page physique unique (/ged)
 */
export function SlideIngestionPage({
  activeCardId,
  setActiveCardId,
  onNavigateToIngestion,
}: SlideIngestionPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={energyBgImg}
        imageAlt="Acquisition optique et flux de numérisation IA"
        accent="#0891b2"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Sessions d'ingestion et OCR */}
      <div className="w-full h-full flex flex-col justify-center">
        <IngestionSessionsSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToIngestion={onNavigateToIngestion}
        />
      </div>
    </div>
  );
}
