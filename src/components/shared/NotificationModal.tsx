import React, { useEffect } from 'react';
import { Bell, X, Check, FileUp, Share2, UserCheck } from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  useEffect(() => {
    if (isOpen) {
      playXboxSound('modalOpen');
    }
  }, [isOpen]);

  const handleClose = () => {
    playXboxSound('back');
    onClose();
  };

  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Nouveaux clichés importés',
      desc: '5 photos ajoutées à Photography.gallery par Sophie Martin',
      time: 'Il y a 12 min',
      icon: <FileUp className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 2,
      title: 'Validation requise',
      desc: 'Rapport Financier Annuel Q2 en attente de visa direction',
      time: 'Il y a 1h',
      icon: <UserCheck className="w-4 h-4 text-amber-400" />
    },
    {
      id: 3,
      title: 'Partage de dossier',
      desc: 'Marc Lefebvre vous a partagé le dossier "Projet CIVITAS"',
      time: 'Hier, 16:40',
      icon: <Share2 className="w-4 h-4 text-cyan-400" />
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-8 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-sm rounded-3xl bg-[#071619]/95 border border-cyan-400/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="text-white font-semibold text-sm">Notifications GED</h3>
          </div>
          <button 
            type="button"
            onClick={handleClose} 
            className="p-1 rounded-lg text-white/40 hover:text-white cursor-pointer"
            aria-label="Fermer les notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => (
            <div key={n.id} className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/[0.06] shrink-0">
                  {n.icon}
                </div>
                <div>
                  <h4 className="text-white font-medium text-xs">{n.title}</h4>
                  <p className="text-white/45 text-[11px] mt-0.5">{n.desc}</p>
                  <span className="text-emerald-400/70 text-[10px] mt-1 block">{n.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
