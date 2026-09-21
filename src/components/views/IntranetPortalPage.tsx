"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { GradientWave } from '../ui/GradientWave';
import { PageBackground } from '../shell/PageBackground';
import { XboxMetroDashboard } from '../portal/XboxMetroDashboard';

interface ToastState {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

export function IntranetPortalPage() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = React.useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Arrière-plan WebGL animé (Préservé et intact)
  const backgroundComponent = React.useMemo(() => (
    <div className="fixed inset-0 w-full h-full pointer-events-none">
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
    </div>
  ), []);

  return (
    <div className="relative w-full min-h-full flex flex-col justify-start">
      {/* ── 1. WebGL Dynamic Gradient Wave Background (Intact) ── */}
      <PageBackground customComponent={backgroundComponent} />

      {/* ── 2. Carrousel Xbox 360 Metro Dashboard avec contrôles d'onglets en haut du main ── */}
      <div className="w-full relative z-10 flex flex-col flex-1">
        <XboxMetroDashboard onShowToast={showToast} />
      </div>

      {/* ── 4. Notifications Toast Floating ── */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-none bg-slate-900/98 border border-teal-500/40 text-white shadow-2xl backdrop-blur-xl text-xs font-medium"
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              ) : toast.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
              )}
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-2 p-0.5 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
