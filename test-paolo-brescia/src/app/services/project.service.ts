import { Injectable, signal, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Project } from '../models/project.model';


@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects = signal<Project[]>([]);

  // Iniettiamo AuthService per verificare il ruolo dell'utente
  private authService = inject(AuthService);

  // Ottiene i progetti di un utente specifico
  getProjects(userId: string) {
    return this.projects().filter(project => project.userId === userId);
  }

  // Ottiene tutti i progetti (solo per l'amministratore)
  getAllProjects() {
    if (this.authService.getRole() === 'Admin') {
      return this.projects();
    } else {
      throw new Error('Access Denied: Only admins can access all projects.');
    }
  }

  // Aggiunge un nuovo progetto
  addProject(project: Project) {
    this.projects.set([...this.projects(), project]);
  }

  // Rimuove un progetto
  removeProject(projectId: string) {
    this.projects.set(this.projects().filter(project => project.id !== projectId));
  }
}
