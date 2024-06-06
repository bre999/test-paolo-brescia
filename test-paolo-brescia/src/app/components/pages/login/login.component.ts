import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule]
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // Metodo per simulare il login come amministratore
  loginAsAdmin() {
    this.authService.loginAsAdmin();
    this.router.navigate(['/admin-dashboard']); // Reindirizza alla pagina di gestione dell'amministratore
  }

  // Metodo per simulare il login come utente 1
  loginAsUser1() {
    this.authService.loginAsUser1();
    this.router.navigate(['/user-dashboard']); // Reindirizza alla pagina di gestione dell'utente
  }

  // Metodo per simulare il login come utente 2
  loginAsUser2() {
    this.authService.loginAsUser2();
    this.router.navigate(['/user-dashboard']); // Reindirizza alla pagina di gestione dell'utente
  }
}
