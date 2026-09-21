import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FolderItem } from '../../types/document';
import { FolderDocuments3DView } from './FolderDocuments3DView';
import { slugify } from '../../utils/slug';
import { 
  getLocationForFolder, 
  buildDocumentationUrl, 
  buildCasierUrl 
} from '../../data/archiveStructure';
import { ArrowLeft, FolderX } from 'lucide-react';

interface Dossier3DRoutePageProps {
  folders: FolderItem[];
}

export function Dossier3DRoutePage({ folders }: Dossier3DRoutePageProps) {
  const { salleId, rayonId, casierId, slug } = useParams<{ 
    salleId?: string; 
    rayonId?: string; 
    casierId?: string; 
    slug: string 
  }>();
  const navigate = useNavigate();

  // Match folder by slug or by id
  const targetFolder = folders.find(
    (f) => slugify(f.name) === slug || f.id === slug
  );

  const handleBack = () => {
    if (targetFolder) {
      const loc = getLocationForFolder(targetFolder.id);
      const sId = salleId || loc.salle.id;
      const rId = rayonId || loc.rayon.id;
      const cId = casierId || loc.casier.id;
      navigate(buildCasierUrl(sId, rId, cId));
    } else {
      navigate(buildDocumentationUrl());
    }
  };

  if (!targetFolder) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center text-center py-8 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-2">
          <FolderX className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Dossier introuvable</h2>
        <p className="text-sm text-white/50 max-w-md">
          Le dossier « {slug} » n'existe pas ou a été déplacé.
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la liste des documents</span>
        </button>
      </div>
    );
  }

  return (
    <FolderDocuments3DView
      folder={targetFolder}
      onBack={handleBack}
    />
  );
}
