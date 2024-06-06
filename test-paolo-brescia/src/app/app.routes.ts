import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AccessDeniedComponent } from './components/pages/access-denied/access-denied.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';


// Definisce le rotte dell'applicazione e le guardie che le proteggono
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [UserGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: 'login' }
];
