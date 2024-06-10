import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/user.model';
import { initialState } from '../../models/auth.model';
import { login, logout } from '../actions/auth.actions';


// Definisce il reducer per gestire le azioni di autenticazione
export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => {
    return { ...state, user };
  }),
  on(logout, state => ({ ...state, user: null }))
);