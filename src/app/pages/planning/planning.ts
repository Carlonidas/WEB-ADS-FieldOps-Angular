import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CatalogRecord, ChecklistModel, Inspection } from '../../models/fieldops.models';
import { FieldopsData } from '../../services/fieldops-data';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-planning',
  styleUrl: './planning.css',
  templateUrl: './planning.html',
})
export class Planning {
  technicians = ['Marina Costa', 'Rafael Lima', 'Joana Alves'];
  clients: CatalogRecord[];
  sites: CatalogRecord[] = [];
  equipment: CatalogRecord[] = [];
  checklists: ChecklistModel[];
  private locationRecords: CatalogRecord[];
  private equipmentRecords: CatalogRecord[];
  editingId = '';
  errorMessage = '';

  form = {
    client: '',
    site: '',
    equipment: '',
    technician: '',
    date: '',
    priority: 'Normal' as 'Normal' | 'Alta' | 'Urgente',
    checklist: '',
    notes: '',
  };

  constructor(private data: FieldopsData, private router: Router, route: ActivatedRoute) {
    this.clients = this.data.catalog('clients');
    this.locationRecords = this.data.catalog('locations');
    this.equipmentRecords = this.data.catalog('equipment');
    this.checklists = this.data.checklists();
    const code = route.snapshot.paramMap.get('code');
    if (code) {
      const inspection = this.data.inspections().find((item) => item.id === code);
      if (inspection) {
        this.editingId = inspection.id;
        this.form = this.formFromInspection(inspection);
      } else {
        this.errorMessage = `A inspeção "${code}" não foi encontrada.`;
      }
    }
    this.atualizarLocais();
    this.atualizarEquipamentos();
  }

  equipmentLabel(item: CatalogRecord): string {
    return [item.name, item.reference].filter(Boolean).join(' ');
  }

  hasClient(name: string): boolean {
    return this.clients.some((client) => client.name === name);
  }

  hasSite(name: string): boolean {
    return this.sites.some((site) => site.name === name);
  }

  hasEquipment(label: string): boolean {
    return this.equipment.some((item) => this.equipmentLabel(item) === label);
  }

  hasChecklist(name: string): boolean {
    return this.checklists.some((item) => item.name === name);
  }

  onClientChange(): void {
    this.atualizarLocais();
    if (!this.sites.some((site) => site.name === this.form.site)) {
      this.form.site = '';
      this.form.equipment = '';
    }
    this.atualizarEquipamentos();
  }

  onSiteChange(): void {
    this.atualizarEquipamentos();
    if (!this.equipment.some((item) => this.equipmentLabel(item) === this.form.equipment)) {
      this.form.equipment = '';
    }
  }

  salvar(valid: boolean | null): void {
    if (!valid) return;

    this.data.saveInspection(this.form, this.editingId || undefined);
    this.router.navigate(['/inspections']);
  }

  private formFromInspection(inspection: Inspection): typeof this.form {
    return {
      client: inspection.client,
      site: inspection.site,
      equipment: inspection.equipment,
      technician: inspection.technician,
      date: inspection.date,
      priority: inspection.priority,
      checklist: inspection.checklist,
      notes: inspection.notes,
    };
  }

  private atualizarLocais(): void {
    this.sites = this.locationRecords.filter((site) =>
      !this.form.client || site.detail === this.form.client,
    );
  }

  private atualizarEquipamentos(): void {
    this.equipment = this.equipmentRecords.filter((item) =>
      !this.form.site || item.context.includes(this.form.site),
    );
  }
}
