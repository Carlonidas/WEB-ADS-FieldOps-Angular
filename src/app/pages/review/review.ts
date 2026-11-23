import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Inspection, InspectionStatus } from '../../models/fieldops.models';
import { FieldopsData } from '../../services/fieldops-data';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-review',
  styleUrl: './review.css',
  templateUrl: './review.html',
})
export class Review {
  inspection?: Inspection;
  imagemSelecionada = '';
  imagemTitulo = '';
  mensagem = '';

  readonly evidences = [
    { source: '/img/evidencia-quadro-forca.svg', title: 'Evidência — quadro de força' },
    { source: '/img/evidencia-painel.svg', title: 'Evidência — painel de controle' },
    { source: '/img/evidencia-cabeamento.svg', title: 'Evidência — cabeamento' },
  ];

  constructor(private route: ActivatedRoute, private data: FieldopsData) {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('code');
      this.inspection = this.data.inspections().find((item) => item.id === code);
    });
  }

  analisar(status: Extract<InspectionStatus, 'Aprovada' | 'Reprovada'>): void {
    if (!this.inspection) return;
    this.data.updateInspectionStatus(this.inspection.id, status);
    this.inspection = this.data.inspections().find((item) => item.id === this.inspection?.id);
    this.mensagem = `Inspeção ${status.toLocaleLowerCase('pt-BR')}.`;
  }

  abrirEvidencia(source: string, title: string): void {
    this.imagemSelecionada = source;
    this.imagemTitulo = title;
  }
}
