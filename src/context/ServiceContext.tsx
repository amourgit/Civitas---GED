"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SERVICES_LIST, ServiceItem, getServiceByUuid } from '../data/servicesData';

interface ServiceContextType {
  selectedServiceUuid: string | null;
  selectedService: ServiceItem | null;
  setSelectedServiceUuid: (uuid: string | null) => void;
  availableServices: ServiceItem[];
  clearService: () => void;
  activeServiceSubTab: 'applications' | 'membres' | 'ressources' | 'informations';
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedServiceUuid, setSelectedServiceUuidState] = useState<string | null>(null);

  // Sync service UUID from URL path if present
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    // Path example: ['sites', 'srv-8f92a10b', 'applications'] or ['services', 'srv-8f92a10b']
    if (pathParts[0] === 'sites' || pathParts[0] === 'services') {
      const candidateUuid = pathParts[1];
      if (candidateUuid && (candidateUuid.startsWith('srv-') || candidateUuid.startsWith('site-'))) {
        setSelectedServiceUuidState(candidateUuid);
      }
    }
  }, [location.pathname]);

  const selectedService = useMemo(() => {
    if (!selectedServiceUuid) return null;
    return getServiceByUuid(selectedServiceUuid) || null;
  }, [selectedServiceUuid]);

  const setSelectedServiceUuid = useCallback((uuid: string | null) => {
    setSelectedServiceUuidState(uuid);
  }, []);

  const clearService = useCallback(() => {
    setSelectedServiceUuidState(null);
  }, []);

  // Determine active sub tab from path
  const activeServiceSubTab = useMemo(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if ((pathParts[0] === 'sites' || pathParts[0] === 'services') && pathParts.length >= 3) {
      const sub = pathParts[2].toLowerCase();
      if (sub === 'membres') return 'membres';
      if (sub === 'ressources') return 'ressources';
      if (sub === 'informations' || sub === 'infos') return 'informations';
    }
    return 'applications';
  }, [location.pathname]);

  return (
    <ServiceContext.Provider
      value={{
        selectedServiceUuid,
        selectedService,
        setSelectedServiceUuid,
        availableServices: SERVICES_LIST,
        clearService,
        activeServiceSubTab,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
}
