"use client";

import React, { useRef, ReactNode, WheelEvent, UIEvent } from 'react';
import { useRightContent } from '../../context/RightContentContext';
import { cn } from '../../lib/utils';

export interface PortalSplitLayoutProps {
  /** Main left content placed inside `<main>` */
  children: ReactNode;
  /**
   * Optional right content placed inside `<aside>`.
   * If not provided or undefined, falls back automatically to `useRightContent().rightContent`.
   */
  rightContent?: ReactNode;
  /** Optional footer rendered below `#main-rightcontent-parent` inside `#portal-outer-scroll` */
  footer?: ReactNode;
  /** Whether outer scroll chaining to footer is enabled */
  enableOuterScroll?: boolean;
  /** Custom class for outer wrapper `#portal-outer-scroll` */
  outerClassName?: string;
  /** Custom class for parent flex container `#main-rightcontent-parent` */
  parentClassName?: string;
  /** Custom class for main content area `<main id="portal-main-scroll">` */
  mainClassName?: string;
  /** Custom class for right content aside `<aside id="rightcontent">` */
  rightClassName?: string;
  /** Custom class for footer wrapper */
  footerClassName?: string;
  /** Custom ID for outer container */
  outerId?: string;
  /** Custom ID for parent flex container */
  parentId?: string;
  /** Custom ID for main content container */
  mainId?: string;
  /** Custom ID for right content container */
  rightId?: string;
  /** Callback fired when outer container is scrolled */
  onOuterScroll?: (e: UIEvent<HTMLDivElement>) => void;
}

/**
 * PortalSplitLayout
 * 
 * Composant de mise en page générale reproduisant fidèlement l'architecture
 * de la page d'accueil :
 * - Un conteneur défilable externe (`#portal-outer-scroll`)
 * - Un composant parent en flex-row (`#main-rightcontent-parent`)
 * - Une zone principale avec son propre défilement (`<main id="portal-main-scroll">`)
 * - Une barre latérale droite avec son propre défilement (`<aside id="rightcontent">`)
 * - Un footer libre au même niveau que le composant parent, accessible par enchaînement
 *   naturel du scroll de la souris (handleInnerScrollWheel).
 */
export function PortalSplitLayout({
  children,
  rightContent: explicitRightContent,
  footer,
  enableOuterScroll,
  outerClassName,
  parentClassName,
  mainClassName,
  rightClassName,
  footerClassName,
  outerId = "portal-outer-scroll",
  parentId = "main-rightcontent-parent",
  mainId = "portal-main-scroll",
  rightId = "rightcontent",
  onOuterScroll,
}: PortalSplitLayoutProps) {
  const outerScrollRef = useRef<HTMLDivElement>(null);
  const contextRightContent = useRightContent().rightContent;
  
  // Utiliser le rightContent passé explicitement en prop, ou celui injecté via PageRightContent
  const activeRightContent = explicitRightContent !== undefined ? explicitRightContent : contextRightContent;

  // Par défaut, activer le scroll externe vers le bas si un footer est fourni
  const canOuterScroll = enableOuterScroll !== undefined ? enableOuterScroll : Boolean(footer);

  /**
   * Enchaînement fluide du scroll intérieur vers le scroll externe :
   * Lorsque `main` ou `rightcontent` atteint le bas de son contenu, la molette fait
   * automatiquement défiler le conteneur externe pour afficher le footer.
   * Inversement, lorsque le footer est visible et que l'utilisateur scroll vers le haut,
   * le conteneur externe remonte d'abord avant de faire défiler le contenu interne.
   */
  const handleInnerScrollWheel = (e: WheelEvent<HTMLElement>) => {
    if (!outerScrollRef.current || !canOuterScroll) return;
    const target = e.currentTarget;
    if (e.deltaY > 0) {
      const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 4;
      if (isAtBottom) {
        outerScrollRef.current.scrollTop += e.deltaY;
      }
    } else if (e.deltaY < 0) {
      if (outerScrollRef.current.scrollTop > 0) {
        outerScrollRef.current.scrollTop += e.deltaY;
      }
    }
  };

  return (
    <div
      ref={outerScrollRef}
      id={outerId}
      onScroll={onOuterScroll}
      className={cn(
        "w-full flex-1 min-h-0 flex flex-col relative",
        canOuterScroll ? "overflow-y-auto overflow-x-hidden no-scrollbar" : "h-full overflow-hidden",
        outerClassName
      )}
    >
      {/* ── Composant parent de main et rightcontent (prend toute la page en hauteur) ── */}
      <div
        id={parentId}
        className={cn(
          "w-full h-full min-h-full shrink-0 flex flex-col lg:flex-row relative min-w-0 overflow-hidden",
          parentClassName
        )}
      >
        {/* Main: composant distinct avec son propre scroll */}
        <main
          id={mainId}
          onWheel={handleInnerScrollWheel}
          className={cn(
            "flex-1 h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden no-scrollbar relative flex flex-col",
            mainClassName
          )}
        >
          {children}
        </main>

        {/* RightContent: composant distinct avec son propre scroll (masqué sur mobile/tablette) */}
        {activeRightContent && (
          <aside
            id={rightId}
            onWheel={handleInnerScrollWheel}
            className={cn(
              "hidden lg:flex w-full lg:w-[360px] xl:w-[400px] 2xl:w-[440px] shrink-0 h-full min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar relative z-20 flex-col gap-6 p-4 sm:p-6 lg:pt-2 lg:pb-8 lg:pl-3 lg:pr-6",
              rightClassName
            )}
          >
            {activeRightContent}
          </aside>
        )}
      </div>

      {/* ── Footer à la suite du composant parent de main, libre dans sa position ── */}
      {footer && (
        <div className={cn("w-full shrink-0 relative z-10", footerClassName)}>
          {footer}
        </div>
      )}
    </div>
  );
}
