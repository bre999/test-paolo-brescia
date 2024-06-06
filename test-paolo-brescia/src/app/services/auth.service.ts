import { Injectable, signal } from '@angular/core';

export interface User {
  role: 'Admin' | 'User';
  id: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);

  loginAsAdmin() {
    this.currentUser.set({ role: 'Admin', id: 'admin' });
  }

  loginAsUser1() {
    this.currentUser.set({ role: 'User', id: 'user1' });
  }

  loginAsUser2() {
    this.currentUser.set({ role: 'User', id: 'user2' });
  }

  getRole() {
    return this.currentUser()?.role;
  }

  getUserId() {
    return this.currentUser()?.id;
  }

  isAuthenticated() {
    return !!this.currentUser();
  }
}
