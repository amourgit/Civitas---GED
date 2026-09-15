import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

/**
 * Utilitaire pour concaténer les classes CSS de façon propre
 */
export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
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
   * Éléments enfants optionnels à injecter dans l'arrière-plan par défaut
   */
  children?: React.ReactNode;
}

/**
 * Composant d'arrière-plan par défaut de l'application
 * Fournit l'habillage visuel immersif avec image bien visible, gradients d'ambiance et lueur Xbox.
 * Toutes ses couches acceptent des injections CSS directes via les props.
 */
export function DefaultPageBackground({
  imageSrc = '/assets/cod_archive_vault.jpg',
  imageAlt = "Arrière-plan Salle d'archivage moderne 3D",
  className,
  imageClassName,
  overlayClassName,
  glowClassName,
  showAtmosphere = false,
  showGlow = true,
  children,
}: DefaultBackgroundProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#030708] select-none',
        className
      )}
    >
      {/* Image de fond principale - Pleine luminosité, clarté et netteté (aucun assombrissement imposé) */}
      {imageSrc && (
        <img
          key={imageSrc}
          src={imageSrc}
          alt={imageAlt}
          className={cn(
            'absolute inset-0 w-full h-full object-cover object-center select-none opacity-100 transition-all duration-700 ease-out',
            imageClassName
          )}
          referrerPolicy="no-referrer"
        />
      )}

      {/* Surcouche personnalisable sans dégradé sombre imposé */}
      {showAtmosphere && overlayClassName && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none transition-all duration-500',
            overlayClassName
          )}
        />
      )}

      {/* Halo lumineux émeraude Xbox subtil */}
      {showGlow && (
        <div
          className={cn(
            'absolute bottom-[-10%] left-[10%] w-[80%] h-[350px] rounded-full opacity-30 blur-[120px] pointer-events-none',
            glowClassName
          )}
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16,185,129,0.3) 0%, rgba(6,78,59,0.12) 50%, transparent 80%)',
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
 * soit le fond par défaut Xbox /background.jpg si aucune page n'a défini d'arrière-plan.
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

  // 2. Composant par défaut avec injection CSS et image spécifique de la page
  return (
    <DefaultPageBackground
      imageSrc={config?.imageSrc || '/assets/cod_archive_vault.jpg'}
      imageAlt={config?.imageAlt || "Arrière-plan Salle d'archivage moderne 3D"}
      className={config?.className}
      imageClassName={config?.imageClassName}
      overlayClassName={config?.overlayClassName}
      glowClassName={config?.glowClassName}
      showAtmosphere={config?.showAtmosphere ?? false}
      showGlow={config?.showGlow ?? true}
    >
      {config?.children}
    </DefaultPageBackground>
  );
}

/**
 * Composant déclaratif d'arrière-plan pour une page :
 * - S'enregistre automatiquement auprès du PageBackgroundProvider global pendant sa durée de vie.
 * - Restaure l'état par défaut lors du démontage de la page.
 * - Supporte la surcharge totale via `customComponent` (composant React).
 * - Supporte l'injection CSS sur le composant par défaut (`className`, `imageClassName`, `overlayClassName`, `glowClassName`).
 */
export function PageBackground({
  customComponent,
  imageSrc,
  imageAlt,
  className,
  imageClassName,
  overlayClassName,
  glowClassName,
  showAtmosphere,
  showGlow,
  children,
}: PageBackgroundProps) {
  const { setPageBackground } = usePageBackground();

  useEffect(() => {
    // Enregistrement de l'arrière-plan surchargé au montage de la page
    setPageBackground({
      customComponent,
      imageSrc,
      imageAlt,
      className,
      imageClassName,
      overlayClassName,
      glowClassName,
      showAtmosphere,
      showGlow,
      children,
    });

    // Nettoyage au démontage pour revenir au fond par défaut
    return () => {
      setPageBackground(null);
    };
  }, [
    setPageBackground,
    customComponent,
    imageSrc,
    imageAlt,
    className,
    imageClassName,
    overlayClassName,
    glowClassName,
    showAtmosphere,
    showGlow,
    children,
  ]);

  // Ne rend rien directement dans le flux du document : le rendu s'effectue via GlobalPageBackground
  return null;
}
