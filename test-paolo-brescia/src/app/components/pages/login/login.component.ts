import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Store } from '@ngrx/store';
import { User, UserRole } from '../../../models/user.model';
import { login, logout } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule]
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private store: Store) { }

  // Funzione generica di login che accetta il ruolo e l'ID dell'utente
  login(role: string, id: string) {
    const user: User = { 'id':id, 'role':role as UserRole};
    this.authService.login(user);
    if (role === 'Administrator') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }
  
  logout() {
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
