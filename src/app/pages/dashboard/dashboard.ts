import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyState } from '../../components/empty-state/empty-state';
import { InspectionStatusBadge } from '../../components/inspection-status/inspection-status';
import { MetricCard } from '../../components/metric-card/metric-card';
import { FieldopsData } from '../../services/fieldops-data';

@Component({
  imports: [CommonModule, EmptyState, InspectionStatusBadge, MetricCard, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  constructor(private data: FieldopsData) {}

  get inspections() {
    return this.data.inspections().slice(0, 4);
  }

  get pendingCount(): number {
    return this.data.inspections().filter((item) => item.status === 'Planejada').length;
  }

  get inProgressCount(): number {
    return this.data.inspections().filter((item) => item.status === 'Em andamento').length;
  }

  get completedCount(): number {
    return this.data.inspections().filter((item) => item.status === 'Aprovada').length;
  }

  get reviewCount(): number {
    return this.data.inspections().filter((item) => item.status === 'Aguardando revisão').length;
  }
}
