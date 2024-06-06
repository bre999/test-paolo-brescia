import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Questa guardia protegge le rotte che richiedono l'accesso come amministratore
@Injectable({ providedIn: 'root' })
export class AdminGuard {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    // Verifica se l'utente ha il ruolo di amministratore
    if (this.authService.getRole() === 'Admin') {
      return true;
    } else {
      // Se non è un amministratore, reindirizza alla pagina di accesso negato
      return this.router.parseUrl('/access-denied');
    }
  }
}
