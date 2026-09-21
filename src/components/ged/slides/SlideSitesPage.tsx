import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageBackground } from '../../shell/PageBackground';
import { MySitesSection } from '../../dashboard/MySitesSection';
import { playXboxSound } from '../../../utils/xboxAudio';
import coverCasierImg from '../../../assets/images/cover_casier_ouvert.jpg';

interface SlideSitesPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToSites?: () => void;
}

/**
 * Slide 1 : Page complète Mes Sites (Espaces Collaboratifs Alfresco)
 * Montée sur la page physique unique (/ged)
 */
export function SlideSitesPage({
  activeCardId,
  setActiveCardId,
  onNavigateToSites,
}: SlideSitesPageProps) {
  const navigate = useNavigate();

  const handleNavigateSites = () => {
    playXboxSound('select');
    if (onNavigateToSites) {
      onNavigateToSites();
    } else {
      navigate('/sites');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={coverCasierImg}
        imageAlt="Casier d'archives ouvert et sites collaboratifs"
        accent="#0ea5e9"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Espaces et sites collaboratifs */}
      <div className="w-full h-full flex flex-col justify-center">
        <MySitesSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToSites={handleNavigateSites}
        />
      </div>
    </div>
  );
}
