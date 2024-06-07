import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

// Definisce l'azione per il login
export const login = createAction(
  '[Auth] Login',
  props<{ user: User }>()
);

// Definisce l'azione per il logout
export const logout = createAction('[Auth] Logout');
