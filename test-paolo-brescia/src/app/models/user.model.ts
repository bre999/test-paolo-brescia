export interface User {
    id: string;
    role: UserRole;
    name: string
  }
  
  export enum UserRole {
    Administrator = 'Administrator',
    StandardUser = 'Utente Standard'
  }