import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
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
