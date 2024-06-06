export interface User {
    id: number;
    username: string;
    role: UserRole;
  }
  
  export enum UserRole {
    Administrator = 'Administrator',
    StandardUser = 'Utente Standard'
  }