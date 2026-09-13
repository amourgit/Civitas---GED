export type IngestionDocumentStatus = 'pending' | 'processing' | 'validated' | 'error';

export interface ExtractedDocumentData {
  rawText: string;
  structured: Record<string, string | number>;
  entities: Array<{ label: string; value: string; confidence?: number }>;
  tags: string[];
  classification: string;
  ocrConfidence: number;
}

export interface IngestionDocument {
  id: string;
  filename: string;
  size: string;
  format: 'pdf' | 'jpg' | 'png' | 'docx' | 'xlsx' | 'pptx' | 'doc';
  formatBadge: string;
  thumbnailUrl?: string;
  metadata: {
    nom: string;
    date: string;
    auteur: string;
    pages?: number;
    departement?: string;
  };
  status: IngestionDocumentStatus;
  progress?: number;
  extractedData: ExtractedDocumentData;
}

export interface IngestionSession {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PROCESSING' | 'WAITING_VALIDATION' | 'COMPLETED';
  createdAt: string;
  createdBy: string;
  type: string;
  storageUsed: string;
  storageTotal: string;
  documents: IngestionDocument[];
}
