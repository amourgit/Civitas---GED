"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { playXboxSound } from '../../utils/xboxAudio';

const SQRT_5000 = Math.sqrt(5000);

export interface TestimonialItem {
  tempId: number | string;
  testimonial: string;
  by: string;
  imgSrc: string;
  siteUuid?: string;
  [key: string]: unknown;
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    tempId: 0,
    testimonial: "Direction des Systèmes d'Information — Infrastructure cloud, réseaux, sécurité IAM et gouvernance GED.",
    by: "DSI • M. Jean-Luc BIKANGA (18 membres, 6 apps)",
    imgSrc: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    siteUuid: "srv-8f92a10b"
  },
  {
    tempId: 1,
    testimonial: "Direction des Ressources Humaines — Gestion des talents, carrières, mobilités et formations professionnelles.",
    by: "DRH • Mme Marie-Claire MBUYI (12 membres, 4 apps)",
    imgSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    siteUuid: "srv-3c71e92d"
  },
  {
    tempId: 2,
    testimonial: "Direction de la Logistique & Bâtiments — Gestion du parc, approvisionnements, maintenance et accès physiques.",
    by: "DLB • M. Serge KABEYA (25 membres, 3 apps)",
    imgSrc: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
    siteUuid: "srv-6a10f44e"
  },
  {
    tempId: 3,
    testimonial: "Direction Financière & Comptabilité — Engagements budgétaires, trésorerie, facturation et contrôle de gestion.",
    by: "DFC • Mme Patricia TSHILOMBA (15 membres, 5 apps)",
    imgSrc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80",
    siteUuid: "srv-9d82b51c"
  },
  {
    tempId: 4,
    testimonial: "Direction des Archives & GED — Numérisation certifiée, archivage probant et plans de classement 3D.",
    by: "DAGED • M. Christian LUKUSA (14 membres, 5 apps)",
    imgSrc: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&auto=format&fit=crop&q=80",
    siteUuid: "srv-8f92a10b"
  },
  {
    tempId: 5,
    testimonial: "Secrétariat Général & Affaires Juridiques — Coordination interservices, contentieux, veille réglementaire et actes.",
    by: "SGAJ • Me Thomas KANKU (8 membres, 3 apps)",
    imgSrc: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80",
    siteUuid: "srv-3c71e92d"
  },
  {
    tempId: 6,
    testimonial: "Pôle Numérique & Datacenter Limete — Hébergement haute disponibilité, réplication inter-sites et stockage optique.",
    by: "Datacenter Limete • M. Alain BOKETSU (11 membres, 4 apps)",
    imgSrc: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    siteUuid: "srv-8f92a10b"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
  onSelect?: (item: TestimonialItem) => void;
  isDraggingRef: React.MutableRefObject<boolean>;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize,
  onSelect,
  isDraggingRef
}) => {
  const isCenter = position === 0;

  const handleClick = () => {
    // Ne pas déclencher le clic si un glissement (drag) vient d'être effectué
    if (isDraggingRef.current) return;
    
    if (isCenter) {
      // Si la carte est déjà sélectionnée au centre, on y accède
      playXboxSound('select');
      onSelect?.(testimonial);
    } else {
      // Sinon, on amène la carte au centre pour la sélectionner d'abord
      playXboxSound('toggle');
      handleMove(position);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-7 sm:p-8 transition-all duration-500 ease-in-out select-none",
        isCenter 
          ? "z-10 bg-primary text-primary-foreground border-primary" 
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 20 : -10}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-3 sm:mb-4 h-12 w-10 sm:h-14 sm:w-12 bg-muted object-cover object-top rounded-xs shadow-sm"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))"
        }}
      />
      <h3 className={cn(
        "text-sm sm:text-base md:text-lg font-medium leading-snug line-clamp-4",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-6 sm:bottom-8 left-7 sm:left-8 right-7 sm:right-8 mt-2 text-xs sm:text-sm italic truncate",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export interface StaggerTestimonialsProps {
  testimonials?: TestimonialItem[];
  onSelect?: (item: TestimonialItem) => void;
  onItemClick?: (item: TestimonialItem) => void;
  height?: number | string;
  className?: string;
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  testimonials = defaultTestimonials,
  onSelect,
  onItemClick,
  height = 500,
  className
}) => {
  const [cardSize, setCardSize] = useState(350);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  // Gestion du drag / swipe avec la main (souris et tactile)
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);

  const handleSelectCallback = onSelect || onItemClick;

  useEffect(() => {
    setTestimonialsList(testimonials);
  }, [testimonials]);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  // Gestion des événements de glissement (Drag / Swipe)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    currentXRef.current = e.clientX;
    const distance = Math.abs(currentXRef.current - startXRef.current);
    if (distance > 10) {
      isDraggingRef.current = true;
    }
  };

  const handlePointerUp = () => {
    const diff = currentXRef.current - startXRef.current;
    if (Math.abs(diff) >= 45) {
      if (diff < 0) {
        // Glissement vers la gauche -> élément suivant
        playXboxSound('toggle');
        handleMove(1);
      } else {
        // Glissement vers la droite -> élément précédent
        playXboxSound('toggle');
        handleMove(-1);
      }
    }

    // Réinitialiser le flag de drag après un court délai pour éviter les faux clics
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 350 : 280);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "relative w-full overflow-hidden bg-muted/30 cursor-grab active:cursor-grabbing touch-pan-y select-none",
        className
      )}
      style={{ height }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            onSelect={handleSelectCallback}
            isDraggingRef={isDraggingRef}
          />
        );
      })}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        <button
          type="button"
          onClick={() => {
            playXboxSound('toggle');
            handleMove(-1);
          }}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-xl sm:text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => {
            playXboxSound('toggle');
            handleMove(1);
          }}
          className={cn(
            "flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-xl sm:text-2xl transition-colors",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default StaggerTestimonials;
