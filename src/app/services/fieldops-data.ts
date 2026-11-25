import { Injectable } from '@angular/core';
import { CatalogKind, CatalogRecord, ChecklistModel, Inspection, InspectionStatus } from '../models/fieldops.models';

const initialInspections: Inspection[] = [
  { id: 'INS-0248', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Compressor CP-04', technician: 'Marina Costa', date: '2026-09-26', priority: 'Alta', status: 'Em andamento', checklist: 'Segurança de máquinas', notes: '' },
  { id: 'INS-0247', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Rafael Lima', date: '2026-09-26', priority: 'Normal', status: 'Aguardando revisão', checklist: 'Inspeção elétrica', notes: 'Recomendado substituir os parafusos da tampa de proteção.' },
  { id: 'INS-0246', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Joana Alves', date: '2026-09-25', priority: 'Normal', status: 'Aprovada', checklist: 'Segurança de máquinas', notes: '' },
  { id: 'INS-0245', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Bomba hidráulica BH-02', technician: 'Marina Costa', date: '2026-09-25', priority: 'Urgente', status: 'Reprovada', checklist: 'Inspeção elétrica', notes: '' },
  { id: 'INS-0244', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Joana Alves', date: '2026-09-24', priority: 'Normal', status: 'Planejada', checklist: 'Segurança de máquinas', notes: '' },
];

const additionalDemoInspections: Inspection[] = [
  { id: 'INS-0250', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Compressor CP-04', technician: 'Carlos Henrique', date: '2026-11-29', priority: 'Normal', status: 'Planejada', checklist: 'Segurança de máquinas', notes: '' },
  { id: 'INS-0251', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Joana Alves', date: '2026-11-30', priority: 'Alta', status: 'Planejada', checklist: 'Segurança de máquinas', notes: '' },
  { id: 'INS-0252', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Marina Costa', date: '2026-12-01', priority: 'Urgente', status: 'Planejada', checklist: 'Inspeção elétrica', notes: '' },
  { id: 'INS-0253', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Bomba hidráulica BH-02', technician: 'Rafael Lima', date: '2026-12-03', priority: 'Normal', status: 'Planejada', checklist: 'Inspeção elétrica', notes: '' },
  { id: 'INS-0254', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Carlos Henrique', date: '2026-11-25', priority: 'Alta', status: 'Em andamento', checklist: 'Segurança de máquinas', notes: '' },
  { id: 'INS-0255', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Compressor CP-04', technician: 'Joana Alves', date: '2026-11-24', priority: 'Normal', status: 'Em andamento', checklist: 'Segurança de máquinas', notes: '' },
  { id: 'INS-0256', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Marina Costa', date: '2026-11-23', priority: 'Urgente', status: 'Em andamento', checklist: 'Inspeção elétrica', notes: '' },
  { id: 'INS-0257', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Bomba hidráulica BH-02', technician: 'Rafael Lima', date: '2026-11-22', priority: 'Alta', status: 'Em andamento', checklist: 'Inspeção elétrica', notes: '' },
  { id: 'INS-0258', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Carlos Henrique', date: '2026-11-25', priority: 'Urgente', status: 'Aguardando revisão', checklist: 'Inspeção elétrica', notes: 'Aguardando conferência dos registros fotográficos.' },
  { id: 'INS-0259', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Joana Alves', date: '2026-11-24', priority: 'Alta', status: 'Aguardando revisão', checklist: 'Segurança de máquinas', notes: 'Checklist concluído e enviado para revisão.' },
  { id: 'INS-0260', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Compressor CP-04', technician: 'Marina Costa', date: '2026-11-23', priority: 'Normal', status: 'Aguardando revisão', checklist: 'Segurança de máquinas', notes: 'Revisar observação sobre vibração do equipamento.' },
  { id: 'INS-0261', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Rafael Lima', date: '2026-11-22', priority: 'Urgente', status: 'Aguardando revisão', checklist: 'Inspeção elétrica', notes: 'Aguardando validação da equipe gestora.' },
  { id: 'INS-0262', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Carlos Henrique', date: '2026-11-21', priority: 'Normal', status: 'Aprovada', checklist: 'Segurança de máquinas', notes: '' },
  { id: 'INS-0263', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Bomba hidráulica BH-02', technician: 'Joana Alves', date: '2026-11-20', priority: 'Alta', status: 'Aprovada', checklist: 'Inspeção elétrica', notes: 'Inspeção concluída sem pendências.' },
  { id: 'INS-0264', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Marina Costa', date: '2026-11-19', priority: 'Normal', status: 'Aprovada', checklist: 'Inspeção elétrica', notes: '' },
  { id: 'INS-0265', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Compressor CP-04', technician: 'Rafael Lima', date: '2026-11-18', priority: 'Alta', status: 'Aprovada', checklist: 'Segurança de máquinas', notes: 'Proteções e sinalização verificadas.' },
  { id: 'INS-0266', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Carlos Henrique', date: '2026-11-17', priority: 'Urgente', status: 'Reprovada', checklist: 'Inspeção elétrica', notes: 'Identificada conexão exposta; necessário reparo antes da liberação.' },
  { id: 'INS-0267', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Joana Alves', date: '2026-11-16', priority: 'Alta', status: 'Reprovada', checklist: 'Segurança de máquinas', notes: 'Alarme de ré sem funcionamento.' },
  { id: 'INS-0268', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Bomba hidráulica BH-02', technician: 'Marina Costa', date: '2026-11-15', priority: 'Urgente', status: 'Reprovada', checklist: 'Inspeção elétrica', notes: 'Vazamento identificado próximo ao conjunto hidráulico.' },
  { id: 'INS-0269', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Rafael Lima', date: '2026-11-14', priority: 'Alta', status: 'Reprovada', checklist: 'Inspeção elétrica', notes: 'Etiqueta de identificação ausente e tampa sem fixação adequada.' },
  { id: 'INS-0270', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Compressor CP-04', technician: 'Carlos Henrique', date: '2026-11-13', priority: 'Normal', status: 'Cancelada', checklist: 'Segurança de máquinas', notes: 'Visita cancelada pelo cliente; reagendamento necessário.' },
  { id: 'INS-0271', client: 'Indústria Horizonte', site: 'Planta Norte', equipment: 'Painel elétrico QD-12', technician: 'Joana Alves', date: '2026-11-12', priority: 'Alta', status: 'Cancelada', checklist: 'Inspeção elétrica', notes: 'Acesso ao local indisponível na data prevista.' },
  { id: 'INS-0272', client: 'Logística Via Norte', site: 'Armazém Sul', equipment: 'Empilhadeira EP-08', technician: 'Marina Costa', date: '2026-11-11', priority: 'Normal', status: 'Cancelada', checklist: 'Segurança de máquinas', notes: 'Equipamento removido temporariamente para manutenção.' },
  { id: 'INS-0273', client: 'Indústria Horizonte', site: 'Unidade Centro', equipment: 'Bomba hidráulica BH-02', technician: 'Rafael Lima', date: '2026-11-10', priority: 'Urgente', status: 'Cancelada', checklist: 'Inspeção elétrica', notes: 'Inspeção cancelada após alteração no cronograma da unidade.' },
];

const demoInspections: Inspection[] = [...initialInspections, ...additionalDemoInspections]
  .sort((left, right) => right.date.localeCompare(left.date) || right.id.localeCompare(left.id));
const inspectionSeedVersionKey = 'fieldops-angular-demo-inspections-v1';

const initialClients: CatalogRecord[] = [
  { id: 'CLI-001', name: 'Indústria Horizonte', detail: 'Manufatura', reference: '3 locais', context: 'Desde março de 2024', status: 'Ativo' },
  { id: 'CLI-002', name: 'Logística Via Norte', detail: 'Logística', reference: '2 locais', context: 'Desde julho de 2025', status: 'Ativo' },
  { id: 'CLI-003', name: 'Alimentos Campo Verde', detail: 'Alimentos', reference: '1 local', context: 'Desde janeiro de 2026', status: 'Em implantação' },
];

const initialLocations: CatalogRecord[] = [
  { id: 'LO-001', name: 'Unidade Centro', detail: 'Indústria Horizonte', reference: 'Campinas, SP', context: '12 equipamentos', status: 'Ativo' },
  { id: 'LO-002', name: 'Planta Norte', detail: 'Indústria Horizonte', reference: 'Jundiaí, SP', context: '8 equipamentos', status: 'Ativo' },
  { id: 'LO-003', name: 'Armazém Sul', detail: 'Logística Via Norte', reference: 'São Paulo, SP', context: '16 equipamentos', status: 'Ativo' },
];

const initialEquipment: CatalogRecord[] = [
  { id: 'EQ-001', name: 'Compressor industrial', detail: 'Atlas Copco GA 30', reference: 'CP-04', context: 'Unidade Centro · última inspeção 12 set 2026', status: 'Operacional' },
  { id: 'EQ-002', name: 'Painel elétrico', detail: 'Quadro de distribuição', reference: 'QD-12', context: 'Planta Norte · inspeção pendente', status: 'Inspeção pendente' },
  { id: 'EQ-003', name: 'Empilhadeira', detail: 'Modelo elétrica E20', reference: 'EP-08', context: 'Armazém Sul · última inspeção 22 set 2026', status: 'Operacional' },
];

const initialChecklists: ChecklistModel[] = [
  { id: 'CHK-001', name: 'Segurança de máquinas', version: '2.1', description: 'Verificação de proteções, comandos e condições gerais de operação.', itemCount: 18, updated: '18 set 2026', status: 'Publicado' },
  { id: 'CHK-002', name: 'Inspeção elétrica', version: '1.0', description: 'Roteiro visual para painéis, sinalização e componentes elétricos.', itemCount: 12, updated: '20 set 2026', status: 'Rascunho' },
];

const storageKeys: Record<CatalogKind | 'inspections' | 'checklists', string> = {
  clients: 'fieldops-angular-clients',
  locations: 'fieldops-angular-locations',
  equipment: 'fieldops-angular-equipment',
  inspections: 'fieldops-angular-inspections',
  checklists: 'fieldops-angular-checklists',
};

@Injectable({ providedIn: 'root' })
export class FieldopsData {
  inspections(): Inspection[] {
    const inspections = this.read(storageKeys.inspections, demoInspections);
    if (localStorage.getItem(inspectionSeedVersionKey) !== null) return inspections;

    const existingIds = new Set(inspections.map((inspection) => inspection.id));
    const missingDemoInspections = additionalDemoInspections.filter((inspection) => !existingIds.has(inspection.id));
    const mergedInspections = [...inspections, ...missingDemoInspections]
      .sort((left, right) => right.date.localeCompare(left.date) || right.id.localeCompare(left.id));
    this.write(storageKeys.inspections, mergedInspections);
    localStorage.setItem(inspectionSeedVersionKey, '1');
    return mergedInspections;
  }

  catalog(kind: CatalogKind): CatalogRecord[] {
    const seed = kind === 'clients' ? initialClients : kind === 'locations' ? initialLocations : initialEquipment;
    return this.read(storageKeys[kind], seed);
  }

  checklists(): ChecklistModel[] {
    return this.read(storageKeys.checklists, initialChecklists);
  }

  saveInspection(inspection: Omit<Inspection, 'id' | 'status'>, id?: string): void {
    const items = this.inspections();
    if (id) {
      const existing = items.find((item) => item.id === id);
      if (!existing) throw new Error(`A inspeção "${id}" não foi encontrada.`);
      this.write(storageKeys.inspections, items.map((item) =>
        item.id === id ? { ...inspection, id, status: existing.status } : item,
      ));
      return;
    }

    const nextNumber = Math.max(248, ...items.map((item) => Number(item.id.slice(4)) || 0)) + 1;
    items.unshift({ ...inspection, id: `INS-${String(nextNumber).padStart(4, '0')}`, status: 'Planejada' });
    this.write(storageKeys.inspections, items);
  }

  deleteInspection(id: string): void {
    this.write(storageKeys.inspections, this.inspections().filter((item) => item.id !== id));
  }

  updateInspectionStatus(id: string, status: InspectionStatus): void {
    this.write(storageKeys.inspections, this.inspections().map((item) => item.id === id ? { ...item, status } : item));
  }

  saveCatalog(kind: CatalogKind, record: Omit<CatalogRecord, 'id'> & { id?: string }): void {
    const items = this.catalog(kind);
    if (record.id) {
      this.write(storageKeys[kind], items.map((item) => item.id === record.id ? { ...record, id: record.id } : item));
      return;
    }

    const nextNumber = Math.max(0, ...items.map((item) => Number(item.id.split('-').at(-1)) || 0)) + 1;
    this.write(storageKeys[kind], [{ ...record, id: `${kind.slice(0, 2).toUpperCase()}-${String(nextNumber).padStart(3, '0')}` }, ...items]);
  }

  deleteCatalog(kind: CatalogKind, id: string): void {
    this.write(storageKeys[kind], this.catalog(kind).filter((item) => item.id !== id));
  }

  saveChecklist(checklist: Omit<ChecklistModel, 'id' | 'updated'> & { id?: string }): void {
    const items = this.checklists();
    const updated = new Date().toLocaleDateString('pt-BR');
    const { id, ...values } = checklist;
    if (id) {
      this.write(storageKeys.checklists, items.map((item) =>
        item.id === id ? { ...item, ...values, id, updated } : item,
      ));
      return;
    }

    const nextNumber = Math.max(0, ...items.map((item) => Number(item.id.slice(4)) || 0)) + 1;
    this.write(storageKeys.checklists, [{ ...values, id: `CHK-${String(nextNumber).padStart(3, '0')}`, updated }, ...items]);
  }

  duplicateChecklist(id: string): void {
    const items = this.checklists();
    const source = items.find((item) => item.id === id);
    if (!source) throw new Error(`O modelo de checklist "${id}" não foi encontrado.`);
    const nextNumber = Math.max(0, ...items.map((item) => Number(item.id.slice(4)) || 0)) + 1;
    this.write(storageKeys.checklists, [{ ...source, id: `CHK-${String(nextNumber).padStart(3, '0')}`, name: `${source.name} (cópia)`, status: 'Rascunho' }, ...items]);
  }

  toggleChecklistStatus(id: string): void {
    this.write(storageKeys.checklists, this.checklists().map((item) =>
      item.id === id ? { ...item, status: item.status === 'Publicado' ? 'Rascunho' : 'Publicado' } : item,
    ));
  }

  deleteChecklist(id: string): void {
    this.write(storageKeys.checklists, this.checklists().filter((item) => item.id !== id));
  }

  private read<T>(key: string, initialValue: T): T {
    const savedValue = localStorage.getItem(key);
    if (savedValue === null) {
      this.write(key, initialValue);
      return structuredClone(initialValue);
    }

    try {
      return JSON.parse(savedValue) as T;
    } catch (error) {
      console.error(`Não foi possível ler os dados locais de "${key}".`, error);
      throw new Error(`Os dados locais de "${key}" estão inválidos. Limpe os dados do site para restaurar o protótipo.`);
    }
  }

  private write<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
