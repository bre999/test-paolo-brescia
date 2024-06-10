import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AccessDeniedComponent } from './components/pages/access-denied/access-denied.component';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { ProjectListComponent } from './components/shared/project-list/project-list.component';
import { ProjectFormComponent } from './components/shared/project-form/project-form.component';
import { TaskFormComponent } from './components/shared/task-form/task-form.component';


// Definisce le rotte dell'applicazione e le guardie che le proteggono
export const routes: Routes= [
  { path: 'login', component: LoginComponent },
  { path: 'user-dashboard', 
    component: UserDashboardComponent, 
    canActivate: [UserGuard],
    children: [
      { path: 'dashboard', component: ProjectListComponent },
      { path: 'task', component: TaskFormComponent },
      { path: 'project', component: ProjectFormComponent }
    ]
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: ProjectListComponent },
      { path: 'task', component: TaskFormComponent },
      { path: 'project', component: ProjectFormComponent },

    ]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: 'login' }
];