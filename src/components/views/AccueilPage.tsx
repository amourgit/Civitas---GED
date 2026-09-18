import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { playXboxSound } from '../../utils/xboxAudio';

// Hero Carousel & Item types
import { HeroCarousel, HeroCarouselItem } from '../carousel/HeroCarousel';

// Editorial Slide Imagery
import codVaultImg from '../../assets/images/cod_archive_vault.jpg';
import coverCasierImg from '../../assets/images/cover_casier_ouvert.jpg';
import singleLockersImg from '../../assets/images/single_lockers_1789486166819.jpg';
import casierOuvertImg from '../../assets/images/casier_ouvert_zoom_1789489855356.jpg';
import libraryShelvesImg from '../../assets/images/library_archive_shelves_1789485573800.jpg';
import modernLockersImg from '../../assets/images/modern_closed_lockers_1789485602078.jpg';
import energyBgImg from '../../assets/images/gofast_energy_bg_1789114133846.jpg';
import roomDoorImg from '../../assets/images/room_door_ajar_1789485559176.jpg';

// Modular Sections
import { MainMenuSection } from '../dashboard/MainMenuSection';
import { MySitesSection } from '../dashboard/MySitesSection';
import { ActionRequiredDocumentsSection } from '../dashboard/ActionRequiredDocumentsSection';
import { MyActionsSection } from '../dashboard/MyActionsSection';
import { FavoriteFoldersSection } from '../dashboard/FavoriteFoldersSection';
import { DocumentTasksDeadlinesSection } from '../dashboard/DocumentTasksDeadlinesSection';
import { IngestionSessionsSection } from '../dashboard/IngestionSessionsSection';
import { RecentActivityAuditSection } from '../dashboard/RecentActivityAuditSection';

interface AccueilPageProps {
  onNavigateToDocuments: () => void;
  onQuickAction?: (actionName: string) => void;
}

export function AccueilPage({
  onNavigateToDocuments,
  onQuickAction
}: AccueilPageProps) {
  const navigate = useNavigate();
  const [activeCardId, setActiveCardId] = useState<string>('hero-dg');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const handleGoToDocuments = () => {
    playXboxSound('select');
    onNavigateToDocuments();
    navigate('/documentation/salles');
  };

  const handleGoToIngestion = () => {
    playXboxSound('select');
    navigate('/depots');
  };

  // 8 Distinct Slides corresponding to the 8 sections of the Home Page
  const carouselItems: HeroCarouselItem[] = [
    {
      id: 'menu-principal',
      sectionName: 'MODULES SGAI',
      title: "MODULES SGAI\nCONSERVATION & ESPACE MÉTIER",
      image: codVaultImg,
      credit: "SYSTÈME INTÉGRÉ D'ARCHIVAGE",
      meta: ["07 MODULES", "MAGASINS & SALLES", "INSTRUCTION"],
      accent: "#0284c7"
    },
    {
      id: 'mes-sites',
      sectionName: 'MES SITES',
      title: "MES SITES\nESPACES COLLABORATIFS",
      image: coverCasierImg,
      credit: "PORTAIL COLLABORATIF ALFRESCO",
      meta: ["08 SITES", "RBAC & MEMBRES", "ESPACES DOCS"],
      accent: "#0ea5e9"
    },
    {
      id: 'actions-requises',
      sectionName: 'ACTIONS REQUISES',
      title: "ACTIONS REQUISES\nVISAS & SIGNATURES",
      image: singleLockersImg,
      credit: "WORKFLOWS EN COURS DE VALIDATION",
      meta: ["8 DOCUMENTS", "3 SIGNATURES", "URGENCE ÉLEVÉE"],
      accent: "#d97706"
    },
    {
      id: 'mes-actions',
      sectionName: 'MES ACTIONS',
      title: "MES ACTIONS\nJOURNAL & TRAÇABILITÉ OPÉRATEUR",
      image: casierOuvertImg,
      credit: "ACTIONS DE L'UTILISATEUR • CYCLE DOCUMENTAIRE",
      meta: ["CRÉATIONS & MODIFS", "SIGNATURES & DUA", "VALEUR PROBATOIRE"],
      accent: "#10b981"
    },
    {
      id: 'dossiers-favoris',
      sectionName: 'DOSSIERS FAVORIS',
      title: "DOSSIERS FAVORIS\nARBORESCENCE MÉTIER",
      image: libraryShelvesImg,
      credit: "ESPACES DOCUMENTAIRES ÉPINGLÉS",
      meta: ["5 DOSSIERS", "ÉTAT CIVIL", "URBANISME"],
      accent: "#7c3aed"
    },
    {
      id: 'taches-echeances',
      sectionName: 'TÂCHES & ÉCHÉANCES',
      title: "TÂCHES & ÉCHÉANCES\nRÉGLEMENTAIRES",
      image: modernLockersImg,
      credit: "CONTRÔLE DUA & SORT FINAL",
      meta: ["12 TÂCHES", "SORT FINAL", "3 ÉCHÉANCES"],
      accent: "#dc2626"
    },
    {
      id: 'ingestion-ia',
      sectionName: 'ENTRÉES & DÉPÔTS',
      title: "ENTRÉES & DÉPÔTS\nNUMÉRISATION & IA",
      image: energyBgImg,
      credit: "CHAÎNE D'ACQUISITION OPTIQUE",
      meta: ["OCR MULTI-PAGE", "ANALYSE IA", "99.4% FIABILITÉ"],
      accent: "#0891b2"
    },
    {
      id: 'audit-tracabilite',
      sectionName: 'JOURNAL D\'AUDIT',
      title: "JOURNAL D'AUDIT\nINTÉGRITÉ & TRAÇABILITÉ",
      image: roomDoorImg,
      credit: "HISTORIQUE CERTIFIÉ SÉCURISÉ",
      meta: ["HASH SHA-256", "CONFORME RGPD", "LOGS SÉCURISÉS"],
      accent: "#4f46e5"
    }
  ];

  return (
    <div className="w-full h-full flex-1 flex flex-col relative overflow-hidden bg-black select-none">
      <HeroCarousel
        items={carouselItems}
        index={activeSlideIndex}
        onIndexChange={(newIndex) => {
          playXboxSound('scroll');
          setActiveSlideIndex(newIndex);
        }}
        brand={
          <span className="font-mono tracking-widest text-[11px] sm:text-xs uppercase text-white/90 font-bold">
            EGEN DOCUMENTS <span className="text-[#22c55e] font-bold">•</span> PORTAIL SGAI
          </span>
        }
        autoplay={false}
        className="w-full h-full flex-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlideIndex}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full h-full flex flex-col justify-center min-h-0"
          >
            {/* Slide 0: Menu Principal SGAI (Modules & Conservation Physique) */}
            {activeSlideIndex === 0 && (
              <MainMenuSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToDocuments={handleGoToDocuments}
                onNavigateToIngestion={handleGoToIngestion}
                onQuickAction={onQuickAction}
              />
            )}

            {/* Slide 1: Mes Sites (Espaces Collaboratifs Alfresco) */}
            {activeSlideIndex === 1 && (
              <MySitesSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToSites={() => {
                  playXboxSound('select');
                  navigate('/sites');
                }}
              />
            )}

            {/* Slide 2: Documents nécessitant une action (Signatures, Visas, Approbations) */}
            {activeSlideIndex === 2 && (
              <ActionRequiredDocumentsSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToDocuments={handleGoToDocuments}
                onQuickAction={onQuickAction}
              />
            )}

            {/* Slide 3: Mes actions (Workflow & Interventions personnelles) */}
            {activeSlideIndex === 3 && (
              <MyActionsSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToDocuments={handleGoToDocuments}
                onQuickAction={onQuickAction}
              />
            )}

            {/* Slide 4: Mes dossiers favoris & Arborescence */}
            {activeSlideIndex === 4 && (
              <FavoriteFoldersSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToDocuments={handleGoToDocuments}
              />
            )}

            {/* Slide 5: Tâches documentaires & Échéances */}
            {activeSlideIndex === 5 && (
              <DocumentTasksDeadlinesSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToDocuments={handleGoToDocuments}
                onQuickAction={onQuickAction}
              />
            )}

            {/* Slide 6: Sessions d’ingestion en cours & Numérisation IA */}
            {activeSlideIndex === 6 && (
              <IngestionSessionsSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToIngestion={handleGoToIngestion}
              />
            )}

            {/* Slide 7: Activité récente & Journal d'audit */}
            {activeSlideIndex === 7 && (
              <RecentActivityAuditSection
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                onNavigateToDocuments={handleGoToDocuments}
                onQuickAction={onQuickAction}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </HeroCarousel>
    </div>
  );
}
