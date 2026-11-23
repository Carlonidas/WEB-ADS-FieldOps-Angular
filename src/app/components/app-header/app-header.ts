import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-header',
  styleUrl: './app-header.css',
  templateUrl: './app-header.html',
})
export class AppHeader {
  menuAberto = false;
  cadastrosAberto = false;

  constructor(private router: Router) {}

  get cadastrosAtivo(): boolean {
    return this.router.url.startsWith('/catalog') || this.router.url === '/checklists';
  }

  fecharMenus(): void {
    this.menuAberto = false;
    this.cadastrosAberto = false;
  }
}
