import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { Observable, map, take, tap } from 'rxjs';
import { selectUser } from '../store/selectors/auth.selectors';

// Questa guardia protegge le rotte che richiedono l'accesso come utente standard
@Injectable({ providedIn: 'root' })
export class UserGuard {
  constructor(
    private store: Store,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      take(1),
      map(user => {
        if (user?.role === 'Utente Standard') {
          return true;
        } else {
          this.router.navigate(['/access-denied']);
          return false;
        }
      })
    );
  }
}
