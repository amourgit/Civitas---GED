export type AlfrescoNodeType = 
  | 'cm:folder'
  | 'cm:content'
  | 'ec:dossierEtatCivil'
  | 'ec:acteNaissance'
  | 'ec:acteMariage'
  | 'ec:acteDeces'
  | 'ur:permisConstruire'
  | 'ur:declarationTravaux'
  | 'rh:dossierAgent'
  | 'rh:contratTravail'
  | 'fin:factureMarche'
  | 'fin:bonCommande';

export type AlfrescoAspect = 
  | 'cm:versionable'
  | 'cm:auditable'
  | 'cm:dublincore'
  | 'cm:taggable'
  | 'cm:titled'
  | 'cm:lockable'
  | 'dp:archivageLegal'
  | 'dp:valeurProbatoire'
  | 'wf:enValidation';

export type AlfrescoRole = 
  | 'SiteManager'       // Gestionnaire (Tous droits)
  | 'SiteCollaborator'  // Collaborateur (Édition + Création)
  | 'SiteContributor'   // Contributeur (Création seulement)
  | 'SiteConsumer';     // Lecteur (Consultation seule)

export interface NodePermissionEntry {
  id: string;
  principal: string; // User or Group (e.g. "GROUP_OFFICIERS_ETAT_CIVIL", "laura.denvida")
  type: 'user' | 'group';
  displayName: string;
  role: AlfrescoRole;
  isInherited: boolean;
}

export interface NodeVersion {
  version: string; // e.g. "1.0", "1.1", "2.0"
  label: string;
  author: string;
  authorAvatar?: string;
  date: string;
  size: string;
  comment: string;
  downloadUrl?: string;
  isCurrent: boolean;
}

export interface NodeRelation {
  id: string;
  targetNodeId: string;
  targetNodeName: string;
  targetNodeType: AlfrescoNodeType;
  relationType: 
    | 'dossier_contains'       // Dossier contient le document
    | 'justificatif_de'        // Justificatif lié à une demande
    | 'rapport_instruction_de' // Rapport lié au dossier
    | 'decision_relative_a'    // Décision finale pour la demande
    | 'annexe_de'              // Pièce annexe
    | 'remplace_version'       // Remplacement
    | 'reference_a';           // Référence croisée
  description: string;
}

export interface NodeRule {
  id: string;
  title: string;
  description: string;
  triggerEvent: 'on_create' | 'on_update' | 'on_enter_folder';
  criteria: {
    mimeType?: string;
    namePattern?: string;
    hasAspect?: string;
  };
  actions: {
    actionType: 'extract_ai_metadata' | 'apply_content_model' | 'move_to_folder' | 'start_workflow' | 'apply_aspect';
    params: Record<string, string>;
  }[];
  isActive: boolean;
}

export interface NodeWorkflowInfo {
  workflowId: string;
  definitionName: string; // e.g. "Validation & Visa d'Acte d'État Civil"
  status: 'en_cours' | 'valide' | 'rejete' | 'en_attente_visa';
  currentStep: string;
  assigneeName: string;
  assigneeRole: string;
  dueDate: string;
  progressPercent: number;
}

export interface AlfrescoNode {
  id: string; // Node Ref (e.g. "workspace://SpacesStore/node-001")
  name: string; // cm:name
  title?: string; // cm:title
  description?: string; // cm:description
  nodeType: AlfrescoNodeType;
  isFolder: boolean;
  parentId: string | null;
  path: string[]; // e.g. ["Repository", "État civil", "Naissances", "2026", "Dossier EC-2026-00152"]
  mimetype?: string;
  icon?: string;
  sizeFormatted: string;
  sizeBytes: number;
  
  // Versions
  version: string;
  versionsHistory: NodeVersion[];
  
  // Content Model & Specific Metadata
  contentModel: {
    modelName: string; // e.g. "ec:etatCivilModel", "ur:urbanismeModel"
    typeName: string;  // e.g. "ec:acteNaissance"
    properties: Record<string, {
      label: string;
      value: string | number | boolean;
      type: 'string' | 'date' | 'number' | 'boolean' | 'badge';
      isMandatory?: boolean;
    }>;
  };
  
  // Standard Alfresco System Properties
  systemProperties: {
    nodeRef: string;
    creator: string;
    createdDate: string;
    modifier: string;
    modifiedDate: string;
    store: string;
  };
  
  // Aspects & Classification
  aspects: AlfrescoAspect[];
  tags: string[];
  categories: string[];
  
  // Governance, Permissions & Rules
  inheritPermissions: boolean;
  permissions: NodePermissionEntry[];
  rules?: NodeRule[];
  
  // Graph & Relations
  relations: NodeRelation[];
  
  // Workflows
  workflow?: NodeWorkflowInfo;
  
  // Check-out / Lock state
  isLocked?: boolean;
  lockedBy?: string;
  
  // Preview Rendition
  previewThumbnail?: string;
  previewUrl?: string;
  textContentSample?: string;
  
  // Hierarchy children IDs (for folders)
  childrenIds?: string[];
}
