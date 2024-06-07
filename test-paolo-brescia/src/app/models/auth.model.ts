import { User } from "./user.model";

// Stato iniziale dell'autenticazione
export interface AuthState {
    user: User | null;
  }
  
  export const initialState: AuthState = {
    user: null
  };