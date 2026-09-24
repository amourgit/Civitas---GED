import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { GradientWave } from '../ui/GradientWave';

/**
 * Utilitaire pour concaténer les classes CSS de façon propre
 */
export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Arrière-plan animé par défaut de l'intranet (WebGL GradientWave)
 * Reproduit fidèlement le fond dynamique de la page racine (Home).
 */
export function AnimatedHomeBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none bg-[#030708]',
        className
      )}
    >
      <GradientWave
        colors={["#008080", "#0b192c", "#0ea5e9", "#042f2e", "#0284c7", "#064e3b"]}
        isPlaying={true}
        shadowPower={8}
        darkenTop={false}
        noiseSpeed={0.00001}
        noiseFrequency={[0.0001, 0.0009]}
        deform={{ incline: 0.5, noiseAmp: 250, noiseFlow: 5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
      <div
        className="absolute bottom-[-10%] left-[10%] w-[80%] h-[350px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.3) 0%, rgba(6,78,59,0.12) 50%, transparent 80%)',
        }}
      />
    </div>
  );
}

/**
 * Propriétés acceptées par l'arrière-plan par défaut
 */
export interface DefaultBackgroundProps {
  /**
   * Source de l'image de fond (ex: salle, rayon, casier ou ribbons Xbox)
   */
  imageSrc?: string;

  /**
   * Texte alternatif pour l'accessibilité
   */
  imageAlt?: string;

  /**
   * Mode d'ajustement de l'image (cover, fill, contain)
   * @default 'cover'
   */
  imageFit?: 'cover' | 'fill' | 'contain';

  /**
   * Injection CSS sur le conteneur racine de l'arrière-plan par défaut
   */
  className?: string;

  /**
   * Injection CSS sur la balise image
   */
  imageClassName?: string;

  /**
   * Injection CSS sur la couche de dégradés et superpositions
   */
  overlayClassName?: string;

  /**
   * Injection CSS sur le halo lumineux émeraude Xbox
   */
  glowClassName?: string;

  /**
   * Active ou désactive le voile atmosphérique avec dégradés
   * @default true
   */
  showAtmosphere?: boolean;

  /**
   * Active ou désactive le halo Xbox émeraude au sol
   * @default true
   */
  showGlow?: boolean;

  /**
   * Active ou désactive le voile sombre d'ambiance et de lisibilité
   * @default true
   */
  showDarkWash?: boolean;

  /**
   * Couleur d'accentuation optionnelle pour teinter l'arrière-plan et le halo
   */
  accent?: string;

  /**
   * Éléments enfants optionnels à injecter dans l'arrière-plan par défaut
   */
  children?: React.ReactNode;
}

/**
 * Composant d'arrière-plan par défaut de l'application
 * Fournit l'habillage visuel immersif avec image bien visible, gradients d'ambiance et lueur Xbox.
 * Si aucune imageSrc n'est fournie, il affiche l'arrière-plan animé WebGL de la page d'accueil (Home).
 */
export function DefaultPageBackground({
  imageSrc,
  imageAlt = "Arrière-plan immersif",
  imageFit = "cover",
  className,
  imageClassName,
  overlayClassName,
  glowClassName,
  showAtmosphere = false,
  showGlow = true,
  showDarkWash = true,
  accent,
  children,
}: DefaultBackgroundProps) {
  // Par défaut, si aucune image n'est spécifiée, afficher le background animé de la page racine de l'intranet (Home)
  if (!imageSrc) {
    return <AnimatedHomeBackground className={className} />;
  }

  const fitClass = imageFit === 'fill' ? 'object-fill' : imageFit === 'contain' ? 'object-contain object-center' : 'object-cover object-center';

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none overflow-hidden z-0 select-none',
        !className?.includes('bg-') && 'bg-[#030708]',
        className
      )}
    >
      {/* Image de fond principale */}
      <img
        key={imageSrc}
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          'absolute inset-0 w-full h-full select-none transition-all duration-700 ease-out',
          fitClass,
          imageFit === 'fill' ? 'opacity-100' : 'opacity-95',
          imageClassName
        )}
        referrerPolicy="no-referrer"
      />

      {/* Teinte d'accentuation dynamique si accent est spécifié */}
      {accent && (
        <>
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: accent, mixBlendMode: 'color', opacity: 0.35 }}
          />
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: accent, mixBlendMode: 'multiply', opacity: 0.2 }}
          />
        </>
      )}

      {/* Léger dégradé noir subtil et très transparent de haut en bas pour rehausser la lisibilité de la topbar */}
      {showDarkWash && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/55 via-black/15 via-25% to-transparent transition-opacity duration-700"
        />
      )}

      {/* Voile sombre d'ambiance et de lisibilité directement intégré dans le système d'arrière-plan */}
      {showDarkWash && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none bg-gradient-to-b from-black/45 via-black/20 to-black/70 transition-opacity duration-700',
            overlayClassName
          )}
        />
      )}

      {/* Grain subtil de texture cinématographique au niveau de l'arrière-plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />

      {/* Surcouche personnalisable sans dégradé sombre imposé */}
      {showAtmosphere && overlayClassName && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none transition-all duration-500',
            overlayClassName
          )}
        />
      )}

      {/* Halo lumineux Xbox subtil ou teinté avec la couleur d'accent */}
      {showGlow && (
        <div
          className={cn(
            'absolute bottom-[-10%] left-[10%] w-[80%] h-[350px] rounded-full opacity-35 blur-[120px] pointer-events-none transition-all duration-700',
            glowClassName
          )}
          style={{
            background: accent
              ? `radial-gradient(ellipse at center, ${accent}66 0%, ${accent}22 50%, transparent 80%)`
              : 'radial-gradient(ellipse at center, rgba(16,185,129,0.3) 0%, rgba(6,78,59,0.12) 50%, transparent 80%)',
          }}
        />
      )}

      {children}
    </div>
  );
}

/**
 * Propriétés du composant modulaire PageBackground
 */
export interface PageBackgroundProps extends DefaultBackgroundProps {
  /**
   * Surcharge totale par un composant React custom passé en props.
   * Si ce composant existe, alors il surcharge intégralement celui par défaut.
   * Sinon, on garde celui par défaut.
   */
  customComponent?: React.ReactNode;
}

/**
 * Contexte global de gestion de l'arrière-plan de page
 */
interface PageBackgroundContextValue {
  config: PageBackgroundProps | null;
  setPageBackground: (config: PageBackgroundProps | null) => void;
}

const PageBackgroundContext = createContext<PageBackgroundContextValue>({
  config: null,
  setPageBackground: () => {},
});

/**
 * Fournisseur global du système d'arrière-plan de l'application
 */
export function PageBackgroundProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<PageBackgroundProps | null>(null);

  const value = useMemo(
    () => ({
      config,
      setPageBackground: setConfig,
    }),
    [config]
  );

  return (
    <PageBackgroundContext.Provider value={value}>
      {children}
    </PageBackgroundContext.Provider>
  );
}

/**
 * Hook pour accéder au gestionnaire d'arrière-plan global
 */
export function usePageBackground() {
  return useContext(PageBackgroundContext);
}

/**
 * Rendu de l'arrière-plan global unique de l'application
 * Affiche soit la surcharge customComponent, soit DefaultPageBackground avec les props injectées,
 * soit le background animé par défaut de la page racine (Home) si aucune page n'a défini d'image.
 */
export function GlobalPageBackground() {
  const { config } = usePageBackground();

  // 1. Surcharge totale par un composant React passé en props
  if (config?.customComponent) {
    return (
      <div
        className={cn(
          'fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#030708]',
          config.className
        )}
      >
        {config.customComponent}
      </div>
    );
  }

  // 2. Composant avec image spécifique de la page
  if (config?.imageSrc) {
    return (
      <DefaultPageBackground
        imageSrc={config.imageSrc}
        imageAlt={config.imageAlt}
        imageFit={config.imageFit}
        className={config.className}
        imageClassName={config.imageClassName}
        overlayClassName={config.overlayClassName}
        glowClassName={config.glowClassName}
        showAtmosphere={config.showAtmosphere ?? false}
        showGlow={config.showGlow ?? true}
        showDarkWash={config.showDarkWash ?? true}
        accent={config.accent}
      >
        {config.children}
      </DefaultPageBackground>
    );
  }

  // 3. Par défaut : background animé de la page racine de l'intranet (Home)
  return <AnimatedHomeBackground className={config?.className} />;
}

/**
 * Composant déclaratif d'arrière-plan pour une page :
 * - S'enregistre automatiquement auprès du PageBackgroundProvider global pendant sa durée de vie.
 * - Restaure l'état par défaut (fond animé) lors du démontage de la page.
 * - Supporte la surcharge totale via `customComponent` (composant React).
 * - Supporte l'injection CSS et l'accent sur le composant par défaut (`imageSrc`, `accent`, `className`, etc.).
 */
export function PageBackground({
  customComponent,
  imageSrc,
  imageAlt,
  imageFit,
  className,
  imageClassName,
  overlayClassName,
  glowClassName,
  showAtmosphere,
  showGlow,
  showDarkWash,
  accent,
  children,
}: PageBackgroundProps) {
  const { setPageBackground } = usePageBackground();

  useEffect(() => {
    // Enregistrement de l'arrière-plan surchargé au montage de la page
    setPageBackground({
      customComponent,
      imageSrc,
      imageAlt,
      imageFit,
      className,
      imageClassName,
      overlayClassName,
      glowClassName,
      showAtmosphere,
      showGlow,
      showDarkWash,
      accent,
      children,
    });

    // Nettoyage au démontage pour revenir au fond animé par défaut
    return () => {
      setPageBackground(null);
    };
  }, [
    setPageBackground,
    customComponent,
    imageSrc,
    imageAlt,
    imageFit,
    className,
    imageClassName,
    overlayClassName,
    glowClassName,
    showAtmosphere,
    showGlow,
    showDarkWash,
    accent,
    children,
  ]);

  // Ne rend rien directement dans le flux du document : le rendu s'effectue via GlobalPageBackground
  return null;
}
