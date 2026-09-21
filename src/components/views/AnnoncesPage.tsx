import React from 'react';
import { PageBackground } from '../shell/PageBackground';

export const AnnoncesPage: React.FC = () => {
  return (
    <div className="w-full h-full min-h-full flex-1 flex flex-col bg-transparent relative overflow-hidden">
      {/* Intégration dans le système de background global */}
      <PageBackground
        imageSrc="/assets/salle-officiel-inchangé.png"
        imageAlt="Salle des Annonces Officielle"
        imageFit="fill"
        showAtmosphere={false}
        showDarkWash={false}
        showGlow={false}
      />

      {/* Section unique prenant toute la page avec background transparent */}
      <section 
        id="section-annonces-pleine-page"
        className="w-full flex-1 h-full min-h-full bg-transparent"
      />
    </div>
  );
};

export default AnnoncesPage;
