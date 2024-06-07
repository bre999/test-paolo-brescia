import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';


// Selector per ottenere lo stato dell'autenticazione
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector per ottenere l'utente autenticato
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);