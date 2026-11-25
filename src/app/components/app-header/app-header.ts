import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DemoAuth } from '../../services/demo-auth';

@Component({
  imports: [CommonModule, RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './app-header.css',
  templateUrl: './app-header.html',
})
export class AppHeader {
  menuAberto = false;
  cadastrosAberto = false;

  constructor(private router: Router, readonly auth: DemoAuth) {}

  get cadastrosAtivo(): boolean {
    return this.router.url.startsWith('/catalog') || this.router.url === '/checklists';
  }

  fecharMenus(): void {
    this.menuAberto = false;
    this.cadastrosAberto = false;
  }

  logout(): void {
    this.auth.logout();
    this.fecharMenus();
    void this.router.navigate(['/login']);
  }
}
