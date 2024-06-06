import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Questa guardia protegge le rotte che richiedono l'accesso come utente standard
@Injectable({ providedIn: 'root' })
export class UserGuard {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
    // Verifica se l'utente ha il ruolo di utente standard o amministratore
    const role = this.authService.getRole();
    if (role === 'User' || role === 'Admin') {
      return true;
    } else {
      // Se non è un utente standard o amministratore, reindirizza alla pagina di accesso negato
      return this.router.parseUrl('/access-denied');
    }
  }
}
