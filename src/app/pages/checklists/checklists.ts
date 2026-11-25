import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmptyState } from '../../components/empty-state/empty-state';
import { InspectionStatusBadge } from '../../components/inspection-status/inspection-status';
import { ChecklistModel } from '../../models/fieldops.models';
import { FieldopsData } from '../../services/fieldops-data';

@Component({
  imports: [CommonModule, EmptyState, FormsModule, InspectionStatusBadge, RouterLink],
  selector: 'app-checklists',
  styleUrl: './checklists.css',
  templateUrl: './checklists.html',
})
export class Checklists {
  showForm = false;
  editingId = '';
  searchTerm = '';
  selectedModel: ChecklistModel | null = null;
  pendingDeletion: ChecklistModel | null = null;
  form = { name: '', version: '1.0', description: '', itemCount: 1, status: 'Rascunho' as ChecklistModel['status'] };

  constructor(private data: FieldopsData) {}

  get models(): ChecklistModel[] {
    const query = this.searchTerm.trim().toLocaleLowerCase('pt-BR');
    return this.allModels.filter((model) =>
      [model.id, model.name, model.version, model.description, model.status]
        .some((value) => value.toLocaleLowerCase('pt-BR').includes(query)),
    );
  }

  get allModels(): ChecklistModel[] {
    return this.data.checklists();
  }

  novo(): void {
    this.editingId = '';
    this.form = { name: '', version: '1.0', description: '', itemCount: 1, status: 'Rascunho' };
    this.showForm = true;
  }

  editar(model: ChecklistModel): void {
    this.editingId = model.id;
    this.form = {
      name: model.name,
      version: model.version,
      description: model.description,
      itemCount: model.itemCount,
      status: model.status,
    };
    this.showForm = true;
  }

  salvar(valid: boolean | null): void {
    if (!valid) return;
    this.data.saveChecklist({ ...this.form, id: this.editingId || undefined, itemCount: Number(this.form.itemCount) });
    this.cancelar();
  }

  cancelar(): void {
    this.showForm = false;
    this.editingId = '';
    this.form = { name: '', version: '1.0', description: '', itemCount: 1, status: 'Rascunho' };
  }

  duplicar(id: string): void {
    this.data.duplicateChecklist(id);
  }

  alternarStatus(id: string): void {
    this.data.toggleChecklistStatus(id);
  }

  visualizar(model: ChecklistModel): void {
    this.selectedModel = model;
  }

  fecharDetalhes(): void {
    this.selectedModel = null;
  }

  excluir(model: ChecklistModel): void {
    this.pendingDeletion = model;
  }

  confirmarExclusao(): void {
    if (!this.pendingDeletion) return;
    this.data.deleteChecklist(this.pendingDeletion.id);
    this.pendingDeletion = null;
  }

  cancelarExclusao(): void {
    this.pendingDeletion = null;
  }
}
