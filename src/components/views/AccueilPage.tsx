import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playXboxSound } from '../../utils/xboxAudio';

// Modular Sections
import { MainMenuSection } from '../dashboard/MainMenuSection';
import { ActionRequiredDocumentsSection } from '../dashboard/ActionRequiredDocumentsSection';
import { RecentViewedDocumentsSection } from '../dashboard/RecentViewedDocumentsSection';
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

  const handleGoToDocuments = () => {
    playXboxSound('select');
    onNavigateToDocuments();
    navigate('/documentation/salles');
  };

  const handleGoToIngestion = () => {
    playXboxSound('select');
    navigate('/depots');
  };

  return (
    <div 
      className="w-full flex-1 flex flex-col overflow-y-auto overflow-x-hidden px-4 sm:px-8 py-4 sm:py-6 gap-10 sm:gap-14 lg:gap-16 select-none min-h-0 scrollbar-thin scrollbar-thumb-white/10 pb-24 sm:pb-32"
      data-scrollable="true"
    >
      {/* 1. Menu Principal SGAI (Modules & Conservation Physique) */}
      <MainMenuSection
        activeCardId={activeCardId}
        setActiveCardId={setActiveCardId}
        onNavigateToDocuments={handleGoToDocuments}
        onNavigateToIngestion={handleGoToIngestion}
        onQuickAction={onQuickAction}
      />

      {/* 3. Documents nécessitant une action (Signatures, Visas, Approbations) */}
      <ActionRequiredDocumentsSection
        activeCardId={activeCardId}
        setActiveCardId={setActiveCardId}
        onNavigateToDocuments={handleGoToDocuments}
        onQuickAction={onQuickAction}
      />

      {/* 4. Documents récemment consultés */}
      <RecentViewedDocumentsSection
        activeCardId={activeCardId}
        setActiveCardId={setActiveCardId}
        onNavigateToDocuments={handleGoToDocuments}
      />

      {/* 5. Mes dossiers favoris & Arborescence */}
      <FavoriteFoldersSection
        activeCardId={activeCardId}
        setActiveCardId={setActiveCardId}
        onNavigateToDocuments={handleGoToDocuments}
      />

      {/* 6. Tâches documentaires & Échéances */}
      <DocumentTasksDeadlinesSection
        activeCardId={activeCardId}
        setActiveCardId={setActiveCardId}
        onNavigateToDocuments={handleGoToDocuments}
        onQuickAction={onQuickAction}
      />

      {/* 7. Sessions d’ingestion en cours & Numérisation IA */}
      <IngestionSessionsSection
        activeCardId={activeCardId}
        setActiveCardId={setActiveCardId}
        onNavigateToIngestion={handleGoToIngestion}
      />

      {/* 8. Activité récente & Journal d'audit */}
      <RecentActivityAuditSection
        activeCardId={activeCardId}
        setActiveCardId={setActiveCardId}
        onNavigateToDocuments={handleGoToDocuments}
        onQuickAction={onQuickAction}
      />
    </div>
  );
}
