import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Composant Loader SVG exact fourni par l'utilisateur
 */
export function CodSvgSpinner({ size = 180 }: { size?: number }) {
  return (
    <div className="cod-loader-wrapper relative flex items-center justify-center pointer-events-none">
      <div>
        <svg className="gegga" aria-hidden="true">
          <defs>
            <filter id="gegga">
              <feGaussianBlur in="SourceGraphic" stdDeviation={7} result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                result="inreGegga"
              />
              <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Ombre floutée skugga */}
        <svg
          className="skugga"
          width={size}
          height={size}
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <path
            className="halvan"
            d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
          />
          <circle className="strecken" cx={100} cy={100} r={64} />
        </svg>

        {/* Spinner principal snurra avec filtre visqueux gegga */}
        <svg
          className="snurra relative z-10"
          width={size}
          height={size}
          viewBox="0 0 200 200"
          role="status"
          aria-label="Chargement en cours"
        >
          <defs>
            <linearGradient id="linjärGradient">
              <stop className="stopp1" offset={0} />
              <stop className="stopp2" offset={1} />
            </linearGradient>
            <linearGradient
              y2={160}
              x2={160}
              y1={40}
              x1={40}
              gradientUnits="userSpaceOnUse"
              id="gradient"
              href="#linjärGradient"
            />
          </defs>
          <path
            className="halvan"
            d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
          />
          <circle className="strecken" cx={100} cy={100} r={64} />
        </svg>
      </div>
    </div>
  );
}

export interface GlobalPageLoaderProps {
  isLoading: boolean;
  statusText?: string;
  subText?: string;
}

/**
 * Écran de chargement immersif :
 * - Arrière-plan 3D "Call of Duty" (Salle d'archivage moderne avec casiers, cartons et documents)
 * - Spinner totalement libre (aucun fond noir, aucune boîte), avec son reflet en bas
 */
export function GlobalPageLoader({
  isLoading,
}: GlobalPageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-x-0 bottom-0 top-[96px] z-30 flex flex-col items-center justify-center overflow-hidden select-none bg-[#020506] pointer-events-auto cursor-wait"
        >
          {/* Arrière-plan 3D Call of Duty - Vue FPS dans la salle d'archivage moderne */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/assets/cod_archive_vault.jpg"
              alt="Salle d'archivage 3D moderne Call of Duty"
              className="w-full h-full object-cover object-center scale-100 filter brightness-100 contrast-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Le Spinner totalement libre avec son reflet miroir en bas */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            {/* Spinner principal libre flottant */}
            <div className="relative z-10 filter drop-shadow-[0_0_20px_rgba(247,0,168,0.7)] drop-shadow-[0_0_40px_rgba(255,128,0,0.5)]">
              <CodSvgSpinner size={190} />
            </div>

            {/* Reflet miroir en bas */}
            <div
              className="relative -mt-8 sm:-mt-10 pointer-events-none select-none filter blur-[1px] opacity-45 transform scale-y-[-1]"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, transparent 80%)',
              }}
              aria-hidden="true"
            >
              <CodSvgSpinner size={190} />
            </div>

            {/* Halo lumineux de projection au sol sous le reflet */}
            <div
              className="w-64 h-8 -mt-6 rounded-full blur-xl opacity-60 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(247,0,168,0.7) 0%, rgba(255,128,0,0.35) 50%, transparent 80%)',
              }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GlobalPageLoader;
