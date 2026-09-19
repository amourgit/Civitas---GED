"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Check, 
  Edit3, 
  X, 
  Save
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';
import sophiePortraitImg from '../../assets/images/sophie_bennett_portrait_1789844011539.jpg';

interface SophieProfileCardProps {
  onShowToast?: (msg: string, type: 'info' | 'success' | 'warning') => void;
  className?: string;
}

export function SophieProfileCard({ onShowToast, className = '' }: SophieProfileCardProps) {
  // Profil état éditable
  const [profile, setProfile] = useState({
    name: "Sophie Bennett",
    title: "Product Designer who focuses on simplicity & usability.",
    followers: 312,
    following: 48,
    verified: true,
    avatarUrl: sophiePortraitImg || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    department: "Design & Expérience Utilisateur",
    location: "Siège • Paris",
    email: "sophie.bennett@egen-archives.fr"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [imageError, setImageError] = useState(false);

  const handleOpenEdit = () => {
    playXboxSound('select');
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    playXboxSound('back');
    setIsEditing(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    playXboxSound('toastSuccess');
    setProfile(editForm);
    setIsEditing(false);
    onShowToast?.("Profil mis à jour avec succès.", "success");
  };

  const handleStatClick = (type: 'followers' | 'following') => {
    playXboxSound('select');
    if (type === 'followers') {
      onShowToast?.(`${profile.followers} abonnés suivent l'activité de ${profile.name}`, 'info');
    } else {
      onShowToast?.(`${profile.name} suit ${profile.following} collaborateurs`, 'info');
    }
  };

  return (
    <>
      {/* ── CARTE PROFIL EXACTE DU MODÈLE (Pixel Perfect) ── */}
      <div 
        id="card-profil-sophie"
        className={`w-full bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-xl border border-slate-100 flex flex-col relative transition-all duration-300 hover:shadow-2xl ${className}`}
      >
        {/* Partie supérieure : Photo portrait avec fondu dégradé vers le blanc */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[1.15/1] overflow-hidden bg-slate-100 select-none">
          <img
            src={imageError ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" : profile.avatarUrl}
            alt={profile.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
          />

          {/* Dégradé doux et progressif qui fond l'image dans le fond blanc de la carte */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* Partie textuelle et stats positionnée exactement comme sur la maquette */}
        <div className="relative px-6 pb-6 pt-1 flex flex-col">
          {/* Nom avec badge de vérification vert */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              {profile.name}
            </h3>

            {profile.verified && (
              <span 
                title="Profil vérifié"
                className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00c950] text-white shadow-xs shrink-0"
              >
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Sous-titre / Bio */}
          <p className="text-slate-600 text-sm font-normal leading-relaxed mt-1.5">
            {profile.title}
          </p>

          {/* Ligne des statistiques : Followers & Following */}
          <div className="flex items-center gap-5 sm:gap-6 mt-4 text-sm select-none">
            {/* Followers */}
            <button
              type="button"
              onClick={() => handleStatClick('followers')}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              <Users className="w-4 h-4 text-slate-400 stroke-[1.8]" />
              <span className="font-bold text-slate-900 text-base">{profile.followers}</span>
              <span className="text-slate-500 font-normal">followers</span>
            </button>

            {/* Following */}
            <button
              type="button"
              onClick={() => handleStatClick('following')}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              <UserCheck className="w-4 h-4 text-slate-400 stroke-[1.8]" />
              <span className="font-bold text-slate-900 text-base">{profile.following}</span>
              <span className="text-slate-500 font-normal">following</span>
            </button>
          </div>

          {/* Bouton principal : Éditer (remplace Follow + comme demandé) */}
          <button
            type="button"
            onClick={handleOpenEdit}
            className="w-full mt-5 py-3.5 px-6 rounded-2xl sm:rounded-full bg-[#0d0d0e] hover:bg-black active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            <span>Éditer</span>
          </button>
        </div>
      </div>

      {/* ── MODAL D'ÉDITION DU PROFIL INTERACTIF ── */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
            >
              {/* En-tête du modal */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/60">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-900 text-white">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">Éditer le profil</h4>
                    <p className="text-xs text-slate-500">Mettre à jour les informations visibles</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulaire de modification */}
              <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-sm text-slate-800">
                {/* Aperçu photo & nom */}
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <img
                    src={editForm.avatarUrl}
                    alt={editForm.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <label className="text-xs font-semibold text-slate-500 block mb-1">URL de la photo</label>
                    <input
                      type="text"
                      value={editForm.avatarUrl}
                      onChange={(e) => setEditForm(prev => ({ ...prev, avatarUrl: e.target.value }))}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 truncate"
                    />
                  </div>
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Bio / Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bio & Titre</label>
                  <textarea
                    rows={3}
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 leading-relaxed text-xs sm:text-sm resize-none"
                  />
                </div>

                {/* Followers & Following */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Followers</label>
                    <input
                      type="number"
                      min={0}
                      value={editForm.followers}
                      onChange={(e) => setEditForm(prev => ({ ...prev, followers: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Following</label>
                    <input
                      type="number"
                      min={0}
                      value={editForm.following}
                      onChange={(e) => setEditForm(prev => ({ ...prev, following: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleCloseEdit}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
