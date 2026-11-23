export type InspectionStatus =
  | 'Planejada'
  | 'Em andamento'
  | 'Aguardando revisão'
  | 'Aprovada'
  | 'Reprovada'
  | 'Cancelada';

export interface Inspection {
  id: string;
  client: string;
  site: string;
  equipment: string;
  technician: string;
  date: string;
  priority: 'Normal' | 'Alta' | 'Urgente';
  status: InspectionStatus;
  checklist: string;
  notes: string;
}

export interface CatalogRecord {
  id: string;
  name: string;
  detail: string;
  reference: string;
  context: string;
  status: string;
}

export interface ChecklistModel {
  id: string;
  name: string;
  version: string;
  description: string;
  itemCount: number;
  updated: string;
  status: 'Publicado' | 'Rascunho';
}

export type CatalogKind = 'clients' | 'locations' | 'equipment';
