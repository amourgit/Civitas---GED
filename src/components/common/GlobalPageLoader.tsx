import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Composant Loader SVG exact
 */
export function CodSvgSpinner({ size = 160 }: { size?: number }) {
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

        {/* Spinner principal snurra */}
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
 * Écran de chargement transparent & flouté :
 * - Aucune image de fond
 * - Aucun fond noir (100% transparent avec backdrop-blur)
 * - Pleine hauteur d'écran, sous la topbar qui reste z-50
 */
export function GlobalPageLoader({
  isLoading,
}: GlobalPageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="global-page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
          className="fixed inset-0 w-screen h-screen z-40 flex flex-col items-center justify-center overflow-hidden select-none bg-transparent backdrop-blur-md pointer-events-auto cursor-wait"
        >
          {/* Spinner principal libre flottant */}
          <div className="relative z-10 filter drop-shadow-[0_0_25px_rgba(0,128,128,0.6)]">
            <CodSvgSpinner size={160} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GlobalPageLoader;
