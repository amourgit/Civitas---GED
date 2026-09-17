import React from 'react';
import { 
  FilePlus, 
  Upload, 
  Scan, 
  GitFork, 
  Share2, 
  FolderPlus,
  ShieldCheck,
  Search
} from 'lucide-react';
import { playXboxSound } from '../../utils/xboxAudio';

interface QuickShortcutsBarProps {
  onNavigateToDocuments: () => void;
  onNavigateToIngestion: () => void;
  onQuickAction?: (actionName: string) => void;
}

export function QuickShortcutsBar({
  onNavigateToDocuments,
  onNavigateToIngestion,
  onQuickAction
}: QuickShortcutsBarProps) {
  const SHORTCUTS = [
    { label: 'Nouveau document', icon: <FilePlus className="w-3.5 h-3.5 text-emerald-400" />, action: 'new_doc' },
    { label: 'Créer un dossier', icon: <FolderPlus className="w-3.5 h-3.5 text-amber-400" />, action: 'new_folder' },
    { label: 'Importer des fichiers', icon: <Upload className="w-3.5 h-3.5 text-sky-400" />, action: 'import' },
    { label: 'Numérisation OCR IA', icon: <Scan className="w-3.5 h-3.5 text-amber-300" />, action: 'ocr' },
    { label: 'Créer un workflow', icon: <GitFork className="w-3.5 h-3.5 text-purple-400" />, action: 'create_wf' },
    { label: 'Partage sécurisé', icon: <Share2 className="w-3.5 h-3.5 text-emerald-400" />, action: 'share' },
    { label: 'Vérification coffre-fort', icon: <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />, action: 'vault' }
  ];

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 py-2">
      {SHORTCUTS.map((btn) => (
        <button
          key={btn.label}
          type="button"
          onClick={() => {
            playXboxSound('select');
            if (btn.action === 'new_doc' || btn.action === 'import' || btn.action === 'new_folder') {
              onNavigateToDocuments();
            } else if (btn.action === 'ocr') {
              onNavigateToIngestion();
            } else if (onQuickAction) {
              onQuickAction(btn.action);
            }
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-[#070e17]/80 hover:bg-white/10 border border-white/15 hover:border-emerald-400/60 hover:shadow-[0_0_15px_rgba(74,222,128,0.25)] transition-all duration-150 cursor-pointer text-xs font-medium text-white/90 hover:text-white overflow-visible select-none"
        >
          {btn.icon}
          <span>{btn.label}</span>
        </button>
      ))}
    </div>
  );
}
