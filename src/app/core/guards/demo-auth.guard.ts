import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DemoSessionService } from '../services/demo-session.service';

export const demoAuthGuard: CanActivateFn = () => {
  const session = inject(DemoSessionService);
  const router = inject(Router);
  return session.isAuthenticated() || router.createUrlTree(['/login']);
};