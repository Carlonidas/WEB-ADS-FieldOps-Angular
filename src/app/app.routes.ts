import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Inspections } from './pages/inspections/inspections';
import { Planning } from './pages/planning/planning';
import { Catalog } from './pages/catalog/catalog';
import { Checklists } from './pages/checklists/checklists';
import { Review } from './pages/review/review';

export const routes: Routes = [
  { path: 'overview', component: Dashboard, title: 'Projeto Field Ops' },
  { path: 'inspections', component: Inspections, title: 'Projeto Field Ops' },
  { path: 'planning', component: Planning, title: 'Projeto Field Ops' },
  { path: 'catalog/clients', component: Catalog, data: { kind: 'clients' }, title: 'Projeto Field Ops' },
  { path: 'catalog/locations', component: Catalog, data: { kind: 'locations' }, title: 'Projeto Field Ops' },
  { path: 'catalog/equipment', component: Catalog, data: { kind: 'equipment' }, title: 'Projeto Field Ops' },
  { path: 'checklists', component: Checklists, title: 'Projeto Field Ops' },
  { path: 'review/:code', component: Review, title: 'Projeto Field Ops' },
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: '**', redirectTo: 'overview' },
];
