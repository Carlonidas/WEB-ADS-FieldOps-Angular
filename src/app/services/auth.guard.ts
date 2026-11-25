import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoAuth } from './demo-auth';

export const requireLogin: CanActivateFn = (_route, state) => {
  const auth = inject(DemoAuth);
  const router = inject(Router);

  return auth.currentUser()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
