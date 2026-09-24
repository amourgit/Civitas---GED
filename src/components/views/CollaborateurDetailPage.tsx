"use client";

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageBackground } from '../shell/PageBackground';
import { PageRightContent } from '../../context/RightContentContext';
import { 
  DIRECTORY_EMPLOYEES, 
  DirectoryEmployee, 
  findEmployeeByParam, 
  getEmployeeCover, 
  getEmployeeUuid 
} from '../../data/directoryData';
import { 
  CollaborateurDetailHeader, 
  CollaborateurTabKey 
} from '../collaborateur/CollaborateurDetailHeader';
import { CollaborateurReviewList } from '../collaborateur/CollaborateurReviewList';
import { CollaborateurOtherTabsView } from '../collaborateur/CollaborateurOtherTabsView';
import { CollaborateurDetailsCard } from '../collaborateur/CollaborateurDetailsCard';
import { CollaborateurShippingAddressCard } from '../collaborateur/CollaborateurShippingAddressCard';
import { CollaborateurContactInfoCard } from '../collaborateur/CollaborateurContactInfoCard';
import { CollaborateurRoleCard } from '../collaborateur/CollaborateurRoleCard';
import { CollaborateurTagsCard } from '../collaborateur/CollaborateurTagsCard';
import { playXboxSound } from '../../utils/xboxAudio';

interface CollaborateurDetailPageProps {
  onShowToast?: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export function CollaborateurDetailPage({ onShowToast }: CollaborateurDetailPageProps) {
  const { collaborateurId, uuid, id } = useParams<{ collaborateurId?: string; uuid?: string; id?: string }>();
  const navigate = useNavigate();

  const targetParam = collaborateurId || uuid || id || '968579';

  // Recherche du collaborateur correspondant par UUID ou ID
  const employee: DirectoryEmployee = useMemo(() => {
    const found = findEmployeeByParam(targetParam);
    if (found) return found;
    // Si non trouvé, repli gracieux sur Brooklyn Simmons ou le premier collaborateur
    return (
      DIRECTORY_EMPLOYEES.find(e => e.id === 'emp-brooklyn') ||
      DIRECTORY_EMPLOYEES[0]
    );
  }, [targetParam]);

  // Index actuel pour la navigation précédente / suivante
  const currentIndex = useMemo(() => {
    return DIRECTORY_EMPLOYEES.findIndex(e => e.id === employee.id);
  }, [employee]);

  const handlePrevEmployee = () => {
    if (currentIndex > 0) {
      const prev = DIRECTORY_EMPLOYEES[currentIndex - 1];
      playXboxSound('toggle');
      navigate(`/annuaire/${getEmployeeUuid(prev)}/details`);
    }
  };

  const handleNextEmployee = () => {
    if (currentIndex < DIRECTORY_EMPLOYEES.length - 1) {
      const next = DIRECTORY_EMPLOYEES[currentIndex + 1];
      playXboxSound('toggle');
      navigate(`/annuaire/${getEmployeeUuid(next)}/details`);
    }
  };

  // Onglet actif : 'review' par défaut comme sur la capture fournie par l'utilisateur
  const [activeTab, setActiveTab] = useState<CollaborateurTabKey>('review');

  // Arrière-plan immersif : utilise la photo de couverture haute résolution du collaborateur
  const coverImage = getEmployeeCover(employee);

  return (
    <div className="w-full min-h-full flex flex-col justify-start relative select-none">
      
      {/* ── 1. Arrière-plan dynamique configuré avec la photo de couverture du collaborateur courant ── */}
      <PageBackground
        imageSrc={coverImage}
        imageAlt={`Photo de couverture de ${employee.fullName}`}
        showDarkWash={true}
        showGlow={true}
        className="opacity-95"
      />

      {/* ── 2. Contenu principal (Main) : Organisé par sections bien modulaires et transparentes ── */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-6">
        
        {/* Section 1 : En-tête avec avatar, nom, statut actif, UUID/ID, actions et onglets horizontaux */}
        <section className="w-full block">
          <CollaborateurDetailHeader
            employee={employee}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onPrevEmployee={currentIndex > 0 ? handlePrevEmployee : undefined}
            onNextEmployee={currentIndex < DIRECTORY_EMPLOYEES.length - 1 ? handleNextEmployee : undefined}
            onSendMessage={() => onShowToast?.(`Messagerie directe ouverte avec ${employee.fullName}`, 'success')}
            onShowToast={onShowToast}
          />
        </section>

        {/* Section 2 : Contenu de l'onglet actif (par défaut Review avec toutes ses sous-sections) */}
        <section className="w-full block">
          {activeTab === 'review' ? (
            <CollaborateurReviewList onShowToast={onShowToast} />
          ) : (
            <CollaborateurOtherTabsView
              activeTab={activeTab}
              employee={employee}
              onShowToast={onShowToast}
            />
          )}
        </section>

      </div>

      {/* ── 3. Volet latéral droit (RightContent) : Cartes transparentes affichées dans l'aside ── */}
      <PageRightContent>
        {/* Carte 1 : Customer Details (source, dernière connexion) */}
        <div className="w-full">
          <CollaborateurDetailsCard employee={employee} />
        </div>

        {/* Carte 2 : Shipping Address (carte interactive, pin, adresse) */}
        <div className="w-full">
          <CollaborateurShippingAddressCard
            employee={employee}
            onShowToast={onShowToast}
          />
        </div>

        {/* Carte 3 : Contact Information (email et téléphone avec copie) */}
        <div className="w-full">
          <CollaborateurContactInfoCard
            employee={employee}
            onShowToast={onShowToast}
          />
        </div>

        {/* Carte 4 : Contact Information / Rôle (Business Owner) */}
        <div className="w-full">
          <CollaborateurRoleCard
            employee={employee}
            onShowToast={onShowToast}
          />
        </div>

        {/* Carte 5 : Tags / Compétences */}
        <div className="w-full">
          <CollaborateurTagsCard
            employee={employee}
            onShowToast={onShowToast}
          />
        </div>
      </PageRightContent>

    </div>
  );
}
