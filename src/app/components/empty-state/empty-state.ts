import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `<span class="text-secondary">{{ message }}</span>`,
})
export class EmptyState {
  @Input({ required: true }) message!: string;
}
