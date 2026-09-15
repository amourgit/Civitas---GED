import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalPageLoader } from '../components/common/GlobalPageLoader';

interface PageLoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  triggerLoading: (customDurationMs?: number) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
  triggerLoading: () => {},
});

export function usePageLoading() {
  return useContext(PageLoadingContext);
}

// Liste de tous les médias d'arrière-plan et d'ambiance à précharger
const CRITICAL_MEDIA = [
  '/assets/cod_archive_vault.jpg',
  '/assets/cover_salle.jpg',
  '/assets/cover_rayon.jpg',
  '/assets/cover_casier.jpg',
  '/assets/cover_casier_ouvert.jpg',
];

function preloadMedia(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.complete) {
      resolve();
    } else {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Ne bloque jamais en cas d'erreur
    }
  });
}

export function PageLoadingProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingText, setLoadingText] = useState<string>('CHARGEMENT DES ARCHIVES 3D');
  const [loadingSubText, setLoadingSubText] = useState<string>('Scan de la salle de documentation et vérification des médias...');

  // Déterminer le sous-titre contextualisé selon la route
  const getContextualText = useCallback((pathname: string) => {
    if (pathname.includes('/casiers/') || pathname.includes('/casier/')) {
      return {
        title: 'CHARGEMENT DES DOSSIERS DU CASIER',
        sub: 'Alignement du tiroir d\'archives et indexation des dossiers suspendus...',
      };
    }
    if (pathname.includes('/rayons/')) {
      return {
        title: 'SCAN DU RAYONNAGE D\'ARCHIVES',
        sub: 'Inspection des casiers métalliques et des modules de stockage...',
      };
    }
    if (pathname.includes('/salles/')) {
      return {
        title: 'ACCÈS À LA SALLE D\'ARCHIVAGE',
        sub: 'Vérification biométrique du périmètre et des rayonnages sécurisés...',
      };
    }
    if (pathname.includes('/ingestion')) {
      return {
        title: 'INITIALISATION DU MODULE D\'INGESTION',
        sub: 'Synchronisation des flux OCR et classification documentaire...',
      };
    }
    if (pathname.includes('/scanner')) {
      return {
        title: 'CALIBRAGE DU SCANNER HAUTE DÉFINITION',
        sub: 'Mise au point de l\'optique et balance des blancs...',
      };
    }
    return {
      title: 'SYNCHRONISATION DES ARCHIVES // VAULT 3D',
      sub: 'Initialisation de l\'environnement et mise en cache des médias...',
    };
  }, []);

  const triggerLoading = useCallback((customDurationMs = 250) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, customDurationMs);
  }, []);

  // Déclencheur automatique à chaque changement de page / URL : disparaît dès que les médias et composants sont prêts
  useEffect(() => {
    const { title, sub } = getContextualText(location.pathname);
    setLoadingText(title);
    setLoadingSubText(sub);
    setIsLoading(true);

    let isMounted = true;

    // Déterminer le média prioritaire pour la route active
    const targetMedia: string[] = ['/assets/cod_archive_vault.jpg'];
    if (location.pathname.includes('/casiers/') || location.pathname.includes('/casier/')) {
      targetMedia.push('/assets/cover_casier_ouvert.jpg');
    } else if (location.pathname.includes('/rayons/')) {
      targetMedia.push('/assets/cover_casier.jpg');
    } else if (location.pathname.includes('/salles/')) {
      targetMedia.push('/assets/cover_rayon.jpg');
    } else {
      targetMedia.push('/assets/cover_salle.jpg');
    }

    // Préchargement des médias : dès que c'est prêt, le spinner s'estompe immédiatement
    Promise.all([...targetMedia, ...CRITICAL_MEDIA].map(preloadMedia)).finally(() => {
      if (isMounted) {
        // Disparition automatique instantanée dès que la page et ses médias sont prêts
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [location.pathname, getContextualText]);

  return (
    <PageLoadingContext.Provider value={{ isLoading, setIsLoading, triggerLoading }}>
      {/* Écran de chargement plein écran avec spinner néon et fond 3D FPS */}
      <GlobalPageLoader
        isLoading={isLoading}
        statusText={loadingText}
        subText={loadingSubText}
      />
      {children}
    </PageLoadingContext.Provider>
  );
}
