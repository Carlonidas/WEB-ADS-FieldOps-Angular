import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ChecklistModel } from '../../models/fieldops.models';
import { FieldopsData } from '../../services/fieldops-data';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-planning',
  styleUrl: './planning.css',
  templateUrl: './planning.html',
})
export class Planning {
  clients = ['Indústria Horizonte', 'Logística Via Norte', 'Alimentos Campo Verde'];
  sites = ['Unidade Centro', 'Planta Norte', 'Armazém Sul'];
  equipment = ['Compressor CP-04', 'Painel elétrico QD-12', 'Empilhadeira EP-08'];
  technicians = ['Marina Costa', 'Rafael Lima', 'Joana Alves'];
  checklists: ChecklistModel[];
  salvo = false;

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

  constructor(private data: FieldopsData, private router: Router) {
    this.checklists = this.data.checklists();
  }

  salvar(valid: boolean | null): void {
    this.salvo = false;
    if (!valid) return;

    this.data.saveInspection(this.form);
    this.salvo = true;
    this.router.navigate(['/inspections']);
  }
}
