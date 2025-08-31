import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export function RoleGuard(expectedRole: 'ADMIN' | 'DOCTOR'): CanActivateFn {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const userRole = authService.getUserRole();

    if (userRole === expectedRole) {
      return true;
    }

    // Redirect unauthorized users to a "403 Forbidden" or home page
    router.navigate(['/unauthorized']);
    return false;
  };
}