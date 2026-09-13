import React, { useEffect, useRef } from 'react';
import { Search, X, FileText, Folder, User, ExternalLink, Clock } from 'lucide-react';
import { searchSuggestions } from '../../data/mockFolders';
import { playXboxSound } from '../../utils/xboxAudio';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: typeof searchSuggestions[0]) => void;
}

export function GlobalSearchModal({ isOpen, onClose, onSelectItem }: GlobalSearchModalProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      playXboxSound('modalOpen');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleClose = () => {
    playXboxSound('back');
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) handleClose();
      } else if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = searchSuggestions.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.folder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-2xl rounded-3xl bg-[#061417]/95 border border-cyan-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="flex items-center px-6 py-4 border-b border-white/[0.08]">
          <Search className="w-5 h-5 text-emerald-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un document, un dossier, un collaborateur..."
            className="w-full bg-transparent border-none outline-none text-white text-base placeholder-white/40"
          />
          <button 
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Fermer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions & Results */}
        <div className="max-h-[420px] overflow-y-auto p-4 space-y-4">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold text-emerald-400/80 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>Résultats récents & Suggestions GED</span>
            </div>

            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  playXboxSound('select');
                  onSelectItem(item);
                }}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.06] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400/50 transition-colors">
                    {item.type === 'document' ? <FileText className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-white/40 text-xs flex items-center gap-2">
                      <span>{item.folder}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-emerald-400 transition-colors" />
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-10 text-white/40 text-sm">
                Aucun résultat pour « {searchTerm} »
              </div>
            )}
          </div>
        </div>

        {/* Modal footer shortcut info */}
        <div className="px-6 py-3 bg-[#030a0d] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/40">
          <span>Conseil : Utilisez les flèches pour naviguer</span>
          <span className="flex items-center gap-1.5">
            Appuyez sur <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">Échap</kbd> pour fermer
          </span>
        </div>
      </div>
    </div>
  );
}
