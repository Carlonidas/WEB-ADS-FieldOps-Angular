import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChecklistModel, InspectionStatus } from '../../models/fieldops.models';

type StatusLabel = InspectionStatus | ChecklistModel['status'];

@Component({
  imports: [CommonModule],
  selector: 'app-inspection-status',
  template: `
    <span class="status-badge" [ngClass]="statusClass">{{ status }}</span>
  `,
})
export class InspectionStatusBadge {
  @Input({ required: true }) status!: StatusLabel;

  get statusClass(): string {
    switch (this.status) {
      case 'Em andamento':
        return 'status-progress';
      case 'Aguardando revisão':
      case 'Planejada':
      case 'Rascunho':
        return 'status-review';
      case 'Aprovada':
      case 'Publicado':
        return 'status-done';
      case 'Reprovada':
      case 'Cancelada':
        return 'status-rejected';
    }
  }
}
