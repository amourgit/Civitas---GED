import React from 'react';
import { PageBackground } from '../../shell/PageBackground';
import { FavoriteFoldersSection } from '../../dashboard/FavoriteFoldersSection';
import libraryShelvesImg from '../../../assets/images/library_archive_shelves_1789485573800.jpg';

interface SlideFavorisPageProps {
  activeCardId: string;
  setActiveCardId: (id: string) => void;
  onNavigateToDocuments: () => void;
}

/**
 * Slide 4 : Page complète Dossiers Favoris (Arborescence Métier Épinglée)
 * Montée sur la page physique unique (/ged)
 */
export function SlideFavorisPage({
  activeCardId,
  setActiveCardId,
  onNavigateToDocuments,
}: SlideFavorisPageProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center relative select-none min-h-0">
      {/* Arrière-plan spécifique de la slide via le système de background global */}
      <PageBackground
        imageSrc={libraryShelvesImg}
        imageAlt="Rayonnages d'archives et dossiers favoris"
        accent="#7c3aed"
        showAtmosphere={true}
        showGlow={true}
      />

      {/* Contenu de la page : Dossiers et arborescence favoris */}
      <div className="w-full h-full flex flex-col justify-center">
        <FavoriteFoldersSection
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          onNavigateToDocuments={onNavigateToDocuments}
        />
      </div>
    </div>
  );
}
