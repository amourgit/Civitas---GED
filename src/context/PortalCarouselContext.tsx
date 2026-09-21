import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useWorkspace } from './WorkspaceContext';
import { playXboxSound } from '../utils/xboxAudio';

export interface CarouselTab {
  id: string;
  label: string;
  navItem?: any;
}

interface PortalCarouselContextType {
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  slideDirection: number;
  tabs: CarouselTab[];
  switchTab: (newIndex: number) => void;
  handleNextTab: () => void;
  handlePrevTab: () => void;
  activeIndex: number;
}

const PortalCarouselContext = createContext<PortalCarouselContextType | null>(null);

export function PortalCarouselProvider({ children }: { children: React.ReactNode }) {
  const { currentWorkspace } = useWorkspace();
  const [activeTabId, setActiveTabId] = useState<string>('home');
  const [slideDirection, setSlideDirection] = useState<number>(1);

  // Tabs: 'home' always comes first, followed by current workspace nav items
  const tabs: CarouselTab[] = useMemo(() => {
    const list: CarouselTab[] = [
      { id: 'home', label: 'home' }
    ];
    if (currentWorkspace && currentWorkspace.navItems) {
      currentWorkspace.navItems.forEach(item => {
        const id = item.label.toLowerCase().trim().replace(/\s+/g, '-');
        list.push({
          id,
          label: item.label.toLowerCase(),
          navItem: item,
        });
      });
    }
    return list;
  }, [currentWorkspace]);

  const activeIndex = useMemo(() => {
    const idx = tabs.findIndex(t => t.id === activeTabId);
    return idx !== -1 ? idx : 0;
  }, [tabs, activeTabId]);

  const switchTab = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= tabs.length) return;
    setSlideDirection(newIndex > activeIndex ? 1 : -1);
    playXboxSound('scroll');
    setActiveTabId(tabs[newIndex].id);
  }, [tabs, activeIndex]);

  const handleNextTab = useCallback(() => {
    if (activeIndex < tabs.length - 1) {
      switchTab(activeIndex + 1);
    }
  }, [activeIndex, tabs.length, switchTab]);

  const handlePrevTab = useCallback(() => {
    if (activeIndex > 0) {
      switchTab(activeIndex - 1);
    }
  }, [activeIndex, switchTab]);

  // Keyboard navigation (ArrowLeft / ArrowRight) when not typing in input/textarea
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        (activeEl as HTMLElement).isContentEditable
      );
      if (isInput) return;

      if (e.key === 'ArrowRight') {
        handleNextTab();
      } else if (e.key === 'ArrowLeft') {
        handlePrevTab();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextTab, handlePrevTab]);

  return (
    <PortalCarouselContext.Provider
      value={{
        activeTabId,
        setActiveTabId,
        slideDirection,
        tabs,
        switchTab,
        handleNextTab,
        handlePrevTab,
        activeIndex,
      }}
    >
      {children}
    </PortalCarouselContext.Provider>
  );
}

export function usePortalCarousel() {
  const context = useContext(PortalCarouselContext);
  if (!context) {
    throw new Error('usePortalCarousel must be used within a PortalCarouselProvider');
  }
  return context;
}
