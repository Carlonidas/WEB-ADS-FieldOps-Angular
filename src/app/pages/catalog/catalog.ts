import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogKind, CatalogRecord } from '../../models/fieldops.models';
import { FieldopsData } from '../../services/fieldops-data';

interface CatalogPage {
  title: string;
  singular: string;
  description: string;
  heading: string;
  nameLabel: string;
  detailLabel: string;
  referenceLabel: string;
  contextLabel: string;
}

const catalogPages: Record<CatalogKind, CatalogPage> = {
  clients: {
    title: 'Clientes',
    singular: 'cliente',
    description: 'Empresas atendidas pela equipe de inspeção.',
    heading: 'Clientes ativos',
    nameLabel: 'Cliente',
    detailLabel: 'Segmento',
    referenceLabel: 'Locais',
    contextLabel: 'Cadastro',
  },
  locations: {
    title: 'Locais de inspeção',
    singular: 'local',
    description: 'Unidades e áreas vinculadas aos clientes.',
    heading: 'Locais cadastrados',
    nameLabel: 'Local',
    detailLabel: 'Cliente',
    referenceLabel: 'Endereço',
    contextLabel: 'Equipamentos',
  },
  equipment: {
    title: 'Equipamentos',
    singular: 'equipamento',
    description: 'Ativos vinculados aos locais de inspeção.',
    heading: 'Equipamentos cadastrados',
    nameLabel: 'Equipamento',
    detailLabel: 'Modelo',
    referenceLabel: 'Identificação',
    contextLabel: 'Local / inspeção',
  },
};

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-catalog',
  styleUrl: './catalog.css',
  templateUrl: './catalog.html',
})
export class Catalog {
  kind: CatalogKind = 'clients';
  page = catalogPages.clients;
  searchTerm = '';
  showForm = false;
  selectedRecord: CatalogRecord | null = null;
  editingId = '';
  form: Omit<CatalogRecord, 'id'> = this.emptyForm();

  constructor(private route: ActivatedRoute, private data: FieldopsData) {
    this.route.data.subscribe((routeData) => {
      const requestedKind: unknown = routeData['kind'];
      if (typeof requestedKind === 'string'
        && (requestedKind === 'clients' || requestedKind === 'locations' || requestedKind === 'equipment')) {
        this.kind = requestedKind;
        this.page = catalogPages[requestedKind];
        this.closeForm();
      }
    });
  }

  get records(): CatalogRecord[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('pt-BR');
    return this.data.catalog(this.kind).filter((record) =>
      [record.id, record.name, record.detail, record.reference, record.context, record.status]
        .some((value) => value.toLocaleLowerCase('pt-BR').includes(query)),
    );
  }

  novo(): void {
    this.editingId = '';
    this.form = this.emptyForm();
    this.showForm = true;
  }

  editar(record: CatalogRecord): void {
    this.editingId = record.id;
    this.form = { name: record.name, detail: record.detail, reference: record.reference, context: record.context, status: record.status };
    this.showForm = true;
  }

  salvar(valid: boolean | null): void {
    if (!valid) return;
    this.data.saveCatalog(this.kind, { ...this.form, id: this.editingId || undefined });
    this.closeForm();
  }

  excluir(record: CatalogRecord): void {
    if (window.confirm(`Excluir "${record.name}" deste navegador?`)) {
      this.data.deleteCatalog(this.kind, record.id);
    }
  }

  visualizar(record: CatalogRecord): void {
    this.selectedRecord = record;
  }

  fecharDetalhes(): void {
    this.selectedRecord = null;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = '';
    this.form = this.emptyForm();
  }

  private emptyForm(): Omit<CatalogRecord, 'id'> {
    return { name: '', detail: '', reference: '', context: '', status: 'Ativo' };
  }
}
