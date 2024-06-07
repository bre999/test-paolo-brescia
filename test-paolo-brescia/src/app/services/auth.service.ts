import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../models/user.model';
import { Store } from '@ngrx/store';
import { login, logout } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';
import { selectUser } from '../store/selectors/auth.selectors';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUser = new Observable<User | null>;

  constructor(private store: Store, ){
    this.currentUser = this.store.select(selectUser)
  }

  logout(){
    this.store.dispatch(logout());
  }

  login(user: User) {
    this.store.dispatch(login({ user }));
  }

  getUser(): Observable<User | null> {
    return this.currentUser
  }

}
