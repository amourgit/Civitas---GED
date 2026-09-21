"use client";

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, Calendar, ShieldCheck, Newspaper, Megaphone, CheckCircle2, AlertCircle, Info, X, Grid, Layers, ArrowRight
} from 'lucide-react';
import { GradientWave } from '../ui/GradientWave';
import { PageBackground } from '../shell/PageBackground';
import { IntranetApp } from '../../data/intranetAppsMock';
import { playXboxSound } from '../../utils/xboxAudio';
import { useWorkspace } from '../../context/WorkspaceContext';

interface ToastState {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

function renderAppIcon(iconName: string) {
  switch (iconName) {
    case 'FolderOpen':
      return <FolderOpen className="w-7 h-7 text-teal-100" />;
    case 'Calendar':
      return <Calendar className="w-7 h-7 text-teal-100" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-7 h-7 text-teal-100" />;
    case 'Newspaper':
      return <Newspaper className="w-7 h-7 text-teal-100" />;
    case 'Megaphone':
      return <Megaphone className="w-7 h-7 text-teal-100" />;
    default:
      return <Grid className="w-7 h-7 text-teal-100" />;
  }
}

export function ApplicationsGridPage() {
  const navigate = useNavigate();
  const { currentWorkspace, currentApps, setWorkspaceId } = useWorkspace();
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev.slice(-2), { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAppClick = (app: IntranetApp) => {
    playXboxSound('select');
    navigate(app.url);
  };

  // Arrière-plan WebGL animé
  const backgroundComponent = useMemo(() => (
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
    <div className="relative w-full h-full min-h-full overflow-hidden flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      {/* ── 1. WebGL Dynamic Gradient Wave Background ── */}
      <PageBackground customComponent={backgroundComponent} />

      {/* ── 2. Parent Box Transparent ── */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center p-4 sm:p-8 my-auto">
        
        {/* Workspace Title Header */}
        <div className="text-center mb-8">
          <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold tracking-wider uppercase mb-2 inline-block">
            {currentWorkspace.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Applications - {currentWorkspace.name}
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto mt-1">
            {currentWorkspace.subtitle}
          </p>
        </div>

        {/* Applications Grid or Empty State */}
        {currentApps.length > 0 ? (
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-center">
            {currentApps.map((app) => (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/25 hover:border-teal-300/60 backdrop-blur-xl transition-all cursor-pointer group text-center max-w-full overflow-hidden shadow-lg hover:shadow-2xl"
              >
                <div className="relative mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/80 border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-teal-400 transition-all">
                    {renderAppIcon(app.icon)}
                  </div>
                  {app.status && (
                    <span className="absolute -top-1.5 -right-3 text-[10px] font-bold px-2 py-0.5 bg-teal-400 text-slate-900 rounded-full shadow-md">
                      {app.status}
                    </span>
                  )}
                </div>
                <span className="text-base font-bold text-white group-hover:text-teal-100 leading-tight truncate w-full px-1 transition-colors" title={app.name}>
                  {app.name}
                </span>
                <span className="text-xs text-white/80 group-hover:text-white leading-relaxed line-clamp-2 w-full px-1 mt-2 transition-colors" title={app.description}>
                  {app.description}
                </span>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-2xl text-center max-w-md w-full shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/20 flex items-center justify-center text-teal-300 mb-4 shadow-inner">
              <Layers className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">
              Aucune application active
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              L'espace <strong className="text-teal-200">{currentWorkspace.name}</strong> ne comporte pas d'applications configurées pour le moment.
            </p>
            <button
              onClick={() => {
                playXboxSound('select');
                setWorkspaceId('intranet');
                showToast("Retour à l'Espace Intranet Général", "info");
              }}
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-teal-500/20"
            >
              <span>Basculer vers l'Intranet Général</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

      </div>

      {/* ── 3. Notifications Toast Floating ── */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/95 border border-teal-500/40 text-white shadow-2xl backdrop-blur-xl text-xs font-medium"
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
                className="ml-2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

