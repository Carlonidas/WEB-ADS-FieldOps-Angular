import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InspectionStatus } from '../../models/fieldops.models';

@Component({
  imports: [CommonModule],
  selector: 'app-inspection-status-filter',
  template: `
    <label class="visually-hidden" [for]="id">Filtrar por status</label>
    <select [id]="id" class="form-select form-select-sm" [value]="value"
      (change)="atualizarValor($event)">
      <option value="">Status: todos</option>
      <option *ngFor="let status of statuses">{{ status }}</option>
    </select>
  `,
})
export class InspectionStatusFilter {
  @Input({ required: true }) id!: string;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  readonly statuses: InspectionStatus[] = [
    'Planejada',
    'Em andamento',
    'Aguardando revisão',
    'Aprovada',
    'Reprovada',
    'Cancelada',
  ];

  atualizarValor(event: Event): void {
    if (event.target instanceof HTMLSelectElement) {
      this.valueChange.emit(event.target.value);
    }
  }
}
