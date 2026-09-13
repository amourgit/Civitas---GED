import { useEffect, useRef } from 'react';
import { playXboxSound } from './xboxAudio';

/**
 * Global Hook to wire Xbox dashboard sounds to interactive DOM events
 * Automatically enlivens clicks, hovers, scroll/wheel and keyboard/history navigation across the entire app.
 */
export function useXboxGlobalSounds() {
  const lastHoverTarget = useRef<Element | null>(null);
  const lastWheelTime = useRef<number>(0);

  useEffect(() => {
    // 1. Global Click Handler
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if clicked element or its parent is interactive
      const interactiveEl = target.closest(
        'button, a, input[type="button"], input[type="submit"], [role="button"], [role="tab"], .cursor-pointer'
      );

      if (interactiveEl) {
        // Special sound types from data attributes or heuristics
        const customSound = interactiveEl.getAttribute('data-sound');
        
        if (customSound === 'back') {
          playXboxSound('back');
          return;
        }
        if (customSound === 'modal' || customSound === 'modalOpen') {
          playXboxSound('modalOpen');
          return;
        }
        if (customSound === 'open' || customSound === 'folderOpen') {
          playXboxSound('folderOpen');
          return;
        }
        if (customSound === 'achievement') {
          playXboxSound('achievement');
          return;
        }

        // Contextual back detection: if label is "Retour", "Fermer", "Annuler", or has aria-label/title "Retour"/"Fermer"
        const text = (interactiveEl.textContent || '').trim().toLowerCase();
        const ariaLabel = (interactiveEl.getAttribute('aria-label') || '').toLowerCase();
        const title = (interactiveEl.getAttribute('title') || '').toLowerCase();
        
        const isBackAction = 
          text === 'retour' ||
          text.startsWith('retour ') ||
          text === 'fermer' ||
          text === 'annuler' ||
          ariaLabel.includes('retour') ||
          ariaLabel.includes('fermer') ||
          ariaLabel.includes('close') ||
          title.includes('retour') ||
          title.includes('fermer') ||
          title.includes('close');

        if (isBackAction) {
          playXboxSound('back');
        } else {
          playXboxSound('select');
        }
      }
    };

    // 2. Global Hover Handler (throttled & deduped)
    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, [role="button"], [role="tab"], .cursor-pointer, input, select, textarea'
      );

      if (interactiveEl && interactiveEl !== lastHoverTarget.current) {
        lastHoverTarget.current = interactiveEl;
        playXboxSound('hover');
      } else if (!interactiveEl) {
        lastHoverTarget.current = null;
      }
    };

    // 3. Global Wheel Scroll & Boundary Collision Handler
    const handleGlobalWheel = (e: WheelEvent) => {
      const now = performance.now();
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (Math.abs(delta) > 15) {
        // Check if target container is at boundary
        const target = e.target as HTMLElement | null;
        const scrollable = target ? target.closest<HTMLElement>(
          '.overflow-y-auto, .overflow-x-auto, .overflow-auto, [data-scrollable="true"]'
        ) : null;

        let isAtBoundary = false;

        if (scrollable) {
          if (e.deltaY > 0) {
            // Trying to scroll down
            const isBottom = scrollable.scrollHeight - scrollable.scrollTop - scrollable.clientHeight <= 4;
            if (isBottom) isAtBoundary = true;
          } else if (e.deltaY < 0) {
            // Trying to scroll up
            const isTop = scrollable.scrollTop <= 2;
            if (isTop) isAtBoundary = true;
          }
        } else {
          // Check window/document boundary
          const docEl = document.documentElement;
          if (e.deltaY > 0) {
            const isBottom = window.innerHeight + window.scrollY >= docEl.scrollHeight - 4;
            if (isBottom) isAtBoundary = true;
          } else if (e.deltaY < 0) {
            const isTop = window.scrollY <= 2;
            if (isTop) isAtBoundary = true;
          }
        }

        if (isAtBoundary) {
          if (now - lastWheelTime.current > 180) {
            lastWheelTime.current = now;
            playXboxSound('boundary');
          }
        } else {
          if (now - lastWheelTime.current > 90) {
            lastWheelTime.current = now;
            playXboxSound('scroll');
          }
        }
      }
    };

    // 4. Global Keydown Handler (Arrow navigation, Escape for back)
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        playXboxSound('scroll');
      } else if (e.key === 'Escape') {
        playXboxSound('back');
      } else if (e.key === 'Enter') {
        playXboxSound('select');
      } else if (e.key === 'Tab') {
        playXboxSound('hover');
      }
    };

    // 5. Browser History Back / Forward navigation sound
    const handlePopState = () => {
      playXboxSound('back');
    };

    document.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    document.addEventListener('mouseover', handleGlobalMouseOver, { passive: true });
    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    window.addEventListener('keydown', handleGlobalKeyDown, { passive: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
      document.removeEventListener('mouseover', handleGlobalMouseOver);
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}
