'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SplineScene } from '../ui/SplineScene';

interface AssistantPageOverlayProps {
  isActive: boolean;
  onClose?: () => void;
  sceneUrl?: string;
}

export function AssistantPageOverlay({ 
  isActive, 
  sceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
}: AssistantPageOverlayProps) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.96,
        y: isActive ? 0 : 20,
      }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1], // snappy cubic-bezier spring feel
      }}
      className={`fixed inset-0 z-30 bg-[#030708] overflow-hidden flex flex-col ${
        isActive ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
      aria-hidden={!isActive}
    >
      {/* Background Système : Robot 3D Spline Scene (Préchargé et Toujours Prêt) */}
      <div className="absolute inset-0 w-full h-full z-0 select-none">
        <SplineScene
          scene={sceneUrl}
          className="w-full h-full"
        />
      </div>

      {/* Aucun contenu textuel sur la page ("dans le contenu, on doit rien avoir") */}
    </motion.div>
  );
}

export default AssistantPageOverlay;
