import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmptyState } from '../../components/empty-state/empty-state';
import { InspectionStatusBadge } from '../../components/inspection-status/inspection-status';
import { MetricCard } from '../../components/metric-card/metric-card';
import { Inspection } from '../../models/fieldops.models';
import { DemoAuth, DemoUser } from '../../services/demo-auth';
import { FieldopsData } from '../../services/fieldops-data';

interface AnalystPerformance {
  name: string;
  initials: string;
  total: number;
  approved: number;
  inProgress: number;
  underReview: number;
  pending: number;
  rejected: number;
  cancelled: number;
  completionRate: number;
}

@Component({
  imports: [CommonModule, EmptyState, InspectionStatusBadge, MetricCard, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  readonly today = new Date();

  constructor(private data: FieldopsData, private auth: DemoAuth) {}

  get user(): DemoUser | null {
    return this.auth.currentUser();
  }

  get isManager(): boolean {
    return this.user?.role === 'manager';
  }

  get visibleInspections(): Inspection[] {
    const inspections = this.data.inspections();
    return this.isManager
      ? inspections
      : inspections.filter((inspection) => inspection.technician === this.user?.name);
  }

  get inspections(): Inspection[] {
    return this.visibleInspections.slice(0, 5);
  }

  get totalCount(): number {
    return this.visibleInspections.length;
  }

  get pendingCount(): number {
    return this.visibleInspections.filter((item) => item.status === 'Planejada').length;
  }

  get rejectedCount(): number {
    return this.visibleInspections.filter((item) => item.status === 'Reprovada').length;
  }

  get cancelledCount(): number {
    return this.visibleInspections.filter((item) => item.status === 'Cancelada').length;
  }

  get inProgressCount(): number {
    return this.visibleInspections.filter((item) => item.status === 'Em andamento').length;
  }

  get completedCount(): number {
    return this.visibleInspections.filter((item) => item.status === 'Aprovada').length;
  }

  get reviewCount(): number {
    return this.visibleInspections.filter((item) => item.status === 'Aguardando revisão').length;
  }

  get analystPerformance(): AnalystPerformance[] {
    const grouped = new Map<string, Inspection[]>();
    this.data.inspections().forEach((inspection) => {
      const assignments = grouped.get(inspection.technician) ?? [];
      assignments.push(inspection);
      grouped.set(inspection.technician, assignments);
    });

    return [...grouped.entries()]
      .map(([name, assignments]) => {
        const total = assignments.length;
        const approved = assignments.filter((item) => item.status === 'Aprovada').length;
        return {
          name,
          initials: name.split(' ').map((part) => part[0]).slice(0, 2).join('').toLocaleUpperCase('pt-BR'),
          total,
          approved,
          inProgress: assignments.filter((item) => item.status === 'Em andamento').length,
          underReview: assignments.filter((item) => item.status === 'Aguardando revisão').length,
          pending: assignments.filter((item) => item.status === 'Planejada').length,
          rejected: assignments.filter((item) => item.status === 'Reprovada').length,
          cancelled: assignments.filter((item) => item.status === 'Cancelada').length,
          completionRate: total ? Math.round((approved / total) * 100) : 0,
        };
      })
      .sort((left, right) => right.approved - left.approved || right.total - left.total);
  }
}
