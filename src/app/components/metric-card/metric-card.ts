import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type MetricTone = 'amber' | 'blue' | 'green' | 'coral';

@Component({
  imports: [CommonModule],
  selector: 'app-metric-card',
  template: `
    <article class="card metric-card" [ngClass]="'metric-' + tone">
      <div class="metric-top"><span>{{ title }}</span><i [class]="'bi ' + icon" aria-hidden="true"></i></div>
      <strong>{{ value | number:'2.0' }}</strong>
      <small>{{ description }}</small>
    </article>
  `,
})
export class MetricCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: number;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) tone!: MetricTone;
}
