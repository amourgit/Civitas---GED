import { FolderItem } from '../types/document';

export interface SalleItem {
  id: string;
  matricule: string;
  name: string;
  description: string;
  location: string;
  securityLevel: 'Restreint' | 'Secret' | 'Confidentiel' | 'Public';
  status: string;
  storageCapacity: string;
  rayonCount: number;
  fileCount: number;
  coverImage?: string;
}

export interface RayonItem {
  id: string;
  salleId: string;
  matricule: string;
  name: string;
  description: string;
  rowNumber: string;
  material: string;
  casierCount: number;
  fileCount: number;
  coverImage?: string;
}

export interface CasierItem {
  id: string;
  rayonId: string;
  matricule: string;
  name: string;
  description: string;
  boxCount: number;
  lockerType: string;
  folderIds: string[];
  coverImage?: string;
}

export const SALLES: SalleItem[] = [
  {
    id: 's01',
    matricule: 'S-01',
    name: 'Salle Centrale Administrative',
    description: 'Gestion des affaires courantes, des contrats, des projets actifs et ressources humaines.',
    location: 'Aile Est - Niveau 1',
    securityLevel: 'Restreint',
    status: 'Opérationnel',
    storageCapacity: '450 / 1000 Go',
    rayonCount: 2,
    fileCount: 47,
    coverImage: '/assets/cover_salle.jpg'
  },
  {
    id: 's02',
    matricule: 'S-02',
    name: 'Salle des Archives & Haute-Sécurité',
    description: 'Comptabilité certifiée, documents légaux de l’entreprise et archives historiques.',
    location: 'Aile Ouest - Sous-sol 2',
    securityLevel: 'Secret',
    status: 'Opérationnel',
    storageCapacity: '120 / 500 Go',
    rayonCount: 2,
    fileCount: 18,
    coverImage: '/assets/cover_salle.jpg'
  }
];

export const RAYONS: RayonItem[] = [
  {
    id: 'ry101',
    salleId: 's01',
    matricule: 'RY-101',
    name: 'Rayon Administration & RH',
    description: 'Dossiers du personnel, mémos stratégiques et documents administratifs du groupe.',
    rowNumber: 'Rangée 4, Section A',
    material: 'Acier Renforcé',
    casierCount: 2,
    fileCount: 27,
    coverImage: '/assets/cover_rayon_lockers.jpg'
  },
  {
    id: 'ry102',
    salleId: 's01',
    matricule: 'RY-102',
    name: 'Rayon Projets & Médias',
    description: 'Roadmaps de développement, livrables techniques et galeries multimédias.',
    rowNumber: 'Rangée 4, Section B',
    material: 'Acier Renforcé',
    casierCount: 2,
    fileCount: 20,
    coverImage: '/assets/cover_rayon_lockers.jpg'
  },
  {
    id: 'ry201',
    salleId: 's02',
    matricule: 'RY-201',
    name: 'Rayon Finance & Comptes',
    description: 'Bilans de l’exercice fiscal, budgets prévisionnels et déclarations certifiées.',
    rowNumber: 'Rangée 1, Section C',
    material: 'Titane Ignifuge',
    casierCount: 1,
    fileCount: 11,
    coverImage: '/assets/cover_rayon_lockers.jpg'
  },
  {
    id: 'ry202',
    salleId: 's02',
    matricule: 'RY-202',
    name: 'Rayon Réserve Historique',
    description: 'Archives physiques numérisées et documents d’activité clos.',
    rowNumber: 'Rangée 1, Section D',
    material: 'Titane Ignifuge',
    casierCount: 1,
    fileCount: 7,
    coverImage: '/assets/cover_rayon_lockers.jpg'
  }
];

export const CASIERS: CasierItem[] = [
  {
    id: 'cs1011',
    rayonId: 'ry101',
    matricule: 'CS-1011',
    name: 'Casier Personnel & Équipe',
    description: 'Organigrammes, fiches de poste, plannings et dossiers collaborateurs.',
    boxCount: 2,
    lockerType: 'Armoire Blindée Numérique',
    folderIds: ['f4', 'f10'], // Équipe, Personnel
    coverImage: '/assets/cover_casier_ouvert.jpg'
  },
  {
    id: 'cs1012',
    rayonId: 'ry101',
    matricule: 'CS-1012',
    name: 'Casier Administratif & Ressources',
    description: 'Baux commerciaux, règlements, modèles de contrat et stockage principal.',
    boxCount: 3,
    lockerType: 'Armoire Standard',
    folderIds: ['f0', 'f9', 'f7', 'f5'], // Mes fichiers, Administratif, Ressources, Formation
    coverImage: '/assets/cover_casier_ouvert.jpg'
  },
  {
    id: 'cs1021',
    rayonId: 'ry102',
    matricule: 'CS-1021',
    name: 'Casier Projets & Roadmaps',
    description: 'Dossiers projets, spécifications techniques et feuilles de route.',
    boxCount: 2,
    lockerType: 'Coffre Projets Sécurisé',
    folderIds: ['f2', 'f3'], // Projets, Travail
    coverImage: '/assets/cover_casier_ouvert.jpg'
  },
  {
    id: 'cs1022',
    rayonId: 'ry102',
    matricule: 'CS-1022',
    name: 'Casier Marketing & Médias',
    description: 'Campagnes promotionnelles, communiqués et chartes visuelles.',
    boxCount: 2,
    lockerType: 'Serveur de Médias Local',
    folderIds: ['f1', 'f8'], // Photography.gallery, Marketing
    coverImage: '/assets/cover_casier_ouvert.jpg'
  },
  {
    id: 'cs2011',
    rayonId: 'ry201',
    matricule: 'CS-2011',
    name: 'Casier Budgets & Comptes',
    description: 'Feuilles de calcul de trésorerie, factures et audits de paie.',
    boxCount: 1,
    lockerType: 'Coffre Fort Numérique',
    folderIds: ['f6'], // Finance
    coverImage: '/assets/cover_casier_ouvert.jpg'
  },
  {
    id: 'cs2021',
    rayonId: 'ry202',
    matricule: 'CS-2021',
    name: 'Casier Fonds Documentaire',
    description: 'Fonds d’archives clos, fiches de synthèse de l’année passée.',
    boxCount: 1,
    lockerType: 'Archive Ignifuge v2',
    folderIds: ['f7'], // Archives 2024 / Ressources (shared mapped)
    coverImage: '/assets/cover_casier_ouvert.jpg'
  }
];

export function getSalleById(idOrMatricule?: string): SalleItem | undefined {
  if (!idOrMatricule) return undefined;
  const q = idOrMatricule.trim().toLowerCase();
  return SALLES.find(s => s.id.toLowerCase() === q || s.matricule.toLowerCase() === q);
}

export function getRayonById(idOrMatricule?: string): RayonItem | undefined {
  if (!idOrMatricule) return undefined;
  const q = idOrMatricule.trim().toLowerCase();
  return RAYONS.find(r => r.id.toLowerCase() === q || r.matricule.toLowerCase() === q);
}

export function getCasierById(idOrMatricule?: string): CasierItem | undefined {
  if (!idOrMatricule) return undefined;
  const q = idOrMatricule.trim().toLowerCase();
  return CASIERS.find(c => c.id.toLowerCase() === q || c.matricule.toLowerCase() === q);
}

export function getRayonsForSalle(salleId: string): RayonItem[] {
  const targetSalle = getSalleById(salleId);
  const sId = targetSalle ? targetSalle.id : salleId;
  return RAYONS.filter(r => r.salleId === sId);
}

export function getCasiersForRayon(rayonId: string): CasierItem[] {
  const targetRayon = getRayonById(rayonId);
  const rId = targetRayon ? targetRayon.id : rayonId;
  return CASIERS.filter(c => c.rayonId === rId);
}

export function getCasierForFolder(folderId: string): CasierItem {
  const found = CASIERS.find(c => c.folderIds.includes(folderId));
  return found || CASIERS[1]; // fallback to cs1012
}

export function getLocationForFolder(folderId: string): { salle: SalleItem; rayon: RayonItem; casier: CasierItem } {
  const casier = getCasierForFolder(folderId);
  const rayon = RAYONS.find(r => r.id === casier.rayonId) || RAYONS[0];
  const salle = SALLES.find(s => s.id === rayon.salleId) || SALLES[0];
  return { salle, rayon, casier };
}

export function getFoldersForCasier(casierId: string, allFolders: FolderItem[]): FolderItem[] {
  const targetCasier = getCasierById(casierId);
  if (!targetCasier) return allFolders;
  return allFolders.filter(
    f => targetCasier.folderIds.includes(f.id) || !CASIERS.some(c => c.folderIds.includes(f.id))
  );
}

export function buildDocumentationUrl(): string {
  return '/ged/documentation/salles';
}

export function buildSalleUrl(salleId: string): string {
  return `/ged/documentation/salles/${salleId}/rayons`;
}

export function buildRayonUrl(salleId: string, rayonId: string): string {
  return `/ged/documentation/salles/${salleId}/rayons/${rayonId}/casiers`;
}

export function buildCasierUrl(salleId: string, rayonId: string, casierId: string): string {
  return `/ged/documentation/salles/${salleId}/rayons/${rayonId}/casiers/${casierId}/dossiers`;
}

export function buildDossierUrl(salleId: string, rayonId: string, casierId: string, slug: string): string {
  return `/ged/documentation/salles/${salleId}/rayons/${rayonId}/casiers/${casierId}/dossiers/${slug}`;
}

export function resolveMatricule(rawQuery: string): { type: 'salle' | 'rayon' | 'casier'; id: string; url: string } | null {
  const query = rawQuery.trim().toUpperCase();
  if (!query) return null;

  // Check Salle
  const salle = SALLES.find(s => s.matricule === query || s.id.toUpperCase() === query);
  if (salle) {
    return { type: 'salle', id: salle.id, url: buildSalleUrl(salle.id) };
  }

  // Check Rayon
  const rayon = RAYONS.find(r => r.matricule === query || r.id.toUpperCase() === query);
  if (rayon) {
    const sId = rayon.salleId || 's01';
    return { type: 'rayon', id: rayon.id, url: buildRayonUrl(sId, rayon.id) };
  }

  // Check Casier
  const casier = CASIERS.find(c => c.matricule === query || c.id.toUpperCase() === query);
  if (casier) {
    const rayon = RAYONS.find(r => r.id === casier.rayonId);
    const sId = rayon?.salleId || 's01';
    return { type: 'casier', id: casier.id, url: buildCasierUrl(sId, casier.rayonId, casier.id) };
  }

  return null;
}
