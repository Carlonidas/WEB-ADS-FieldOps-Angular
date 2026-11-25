import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DemoAuth, DemoUser } from '../../services/demo-auth';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  readonly users: readonly DemoUser[];

  constructor(
    private auth: DemoAuth,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.users = this.auth.users;
    if (this.auth.currentUser()) void this.router.navigateByUrl('/overview');
  }

  entrar(user: DemoUser): void {
    this.auth.login(user.id);
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    const destination = returnUrl?.startsWith('/') && !returnUrl.startsWith('//')
      ? returnUrl
      : '/overview';
    void this.router.navigateByUrl(destination);
  }
}
