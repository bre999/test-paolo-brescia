import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';
import { selectUser } from '../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';

// Questa guardia protegge le rotte che richiedono l'accesso come amministratore
@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(
    private store: Store, 
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      take(1),
      map(user => {
        if (user?.role === 'Administrator') {
          return true;
        } else {
          this.router.navigate(['/access-denied']);
          return false;
        }
      })
    );
  }
}
