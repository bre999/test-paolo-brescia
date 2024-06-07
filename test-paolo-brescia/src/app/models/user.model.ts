export interface User {
    id: string;
    role: UserRole;
  }
  
  export enum UserRole {
    Administrator = 'Administrator',
    StandardUser = 'Utente Standard'
  }