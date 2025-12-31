import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const redirectIfAuthenticatedGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.loading()) {
    return false;
  }

  // 🔐 connecté → scores
  if (auth.isAuthenticated()) {
    router.navigate(['/scores']);
    return false;
  }

  // 🔓 non connecté → OK
  return true;
};
