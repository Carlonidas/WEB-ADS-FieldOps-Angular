import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Inspections } from './pages/inspections/inspections';
import { Planning } from './pages/planning/planning';
import { Catalog } from './pages/catalog/catalog';
import { Checklists } from './pages/checklists/checklists';
import { Login } from './pages/login/login';
import { Review } from './pages/review/review';
import { requireLogin } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Acessar FieldOps' },
  { path: 'overview', component: Dashboard, canActivate: [requireLogin], title: 'Projeto Field Ops' },
  { path: 'inspections', component: Inspections, canActivate: [requireLogin], title: 'Projeto Field Ops' },
  { path: 'planning', component: Planning, canActivate: [requireLogin], title: 'Projeto Field Ops' },
  { path: 'planning/:code', component: Planning, canActivate: [requireLogin], title: 'Projeto Field Ops' },
  { path: 'catalog/clients', component: Catalog, canActivate: [requireLogin], data: { kind: 'clients' }, title: 'Projeto Field Ops' },
  { path: 'catalog/locations', component: Catalog, canActivate: [requireLogin], data: { kind: 'locations' }, title: 'Projeto Field Ops' },
  { path: 'catalog/equipment', component: Catalog, canActivate: [requireLogin], data: { kind: 'equipment' }, title: 'Projeto Field Ops' },
  { path: 'checklists', component: Checklists, canActivate: [requireLogin], title: 'Projeto Field Ops' },
  { path: 'review/:code', component: Review, canActivate: [requireLogin], title: 'Projeto Field Ops' },
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: '**', redirectTo: 'overview' },
];
