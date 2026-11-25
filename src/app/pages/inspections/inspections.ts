import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmptyState } from '../../components/empty-state/empty-state';
import { InspectionStatusBadge } from '../../components/inspection-status/inspection-status';
import { InspectionStatusFilter } from '../../components/inspection-status-filter/inspection-status-filter';
import { Inspection } from '../../models/fieldops.models';
import { FieldopsData } from '../../services/fieldops-data';

@Component({
  imports: [CommonModule, EmptyState, FormsModule, InspectionStatusBadge, InspectionStatusFilter, RouterLink],
  selector: 'app-inspections',
  styleUrl: './inspections.css',
  templateUrl: './inspections.html',
})
export class Inspections {
  statusFilter = '';
  clientFilter = '';
  technicianFilter = '';
  monthFilter = '';
  searchTerm = '';
  pendingDeletion: Inspection | null = null;

  constructor(private data: FieldopsData) {}

  get inspections(): Inspection[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('pt-BR');
    return this.data.inspections().filter((inspection) => {
      const matchesStatus = !this.statusFilter || inspection.status === this.statusFilter;
      const matchesClient = !this.clientFilter || inspection.client === this.clientFilter;
      const matchesTechnician = !this.technicianFilter || inspection.technician === this.technicianFilter;
      const matchesMonth = !this.monthFilter || inspection.date.startsWith(this.monthFilter);
      const matchesSearch = !query || [
        inspection.id, inspection.client, inspection.site, inspection.equipment, inspection.technician,
      ].some((value) => value.toLocaleLowerCase('pt-BR').includes(query));
      return matchesStatus && matchesClient && matchesTechnician && matchesMonth && matchesSearch;
    });
  }

  get clients(): string[] {
    return [...new Set(this.data.inspections().map((item) => item.client))];
  }

  get technicians(): string[] {
    return [...new Set(this.data.inspections().map((item) => item.technician))];
  }

  excluir(inspection: Inspection): void {
    this.pendingDeletion = inspection;
  }

  confirmarExclusao(): void {
    if (!this.pendingDeletion) return;
    this.data.deleteInspection(this.pendingDeletion.id);
    this.pendingDeletion = null;
  }

  cancelarExclusao(): void {
    this.pendingDeletion = null;
  }
}
