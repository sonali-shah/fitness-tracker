import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
console.log(authService.isAuth());
  if (authService.isAuth()) {
    return true;
  } else {
    return router.parseUrl('login');
  }
};
