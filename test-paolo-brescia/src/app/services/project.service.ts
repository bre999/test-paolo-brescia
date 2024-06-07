import { Injectable, signal, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Project } from '../models/project.model';
import { Observable, filter, map, of, switchMap, take } from 'rxjs';
import { UserRole } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects$ = Observable<Project[]>;

  // Iniettiamo AuthService per verificare il ruolo dell'utente
  private authService = inject(AuthService);
  private projects = signal<Project[]>([])
  constructor(private auth_service: AuthService) { }
  
  // Ottiene i progetti in base a gli utenti
  getProjects(): Observable<Project[]> {
    console.log('getUser');
    this.authService.getUser().subscribe(console.log)
    console.log('projects');
    console.log(this.projects());
    
    return this.authService.getUser().pipe(
      switchMap(user => {
        if (user?.role === 'Utente Standard') {
          return of(this.projects().filter(project => project.user.id === user.id));
        } else if (user?.role === 'Administrator' as UserRole) {
          return of(this.projects());
        } else {
          return of([]);
        }
      })
    );
  }


  // Aggiunge un nuovo progetto
  addProject(name: string, description: string) {
    this.authService.getUser().pipe(
      take(1),
      map(user => {
        if (user) {
          const project: Project = {
            id: (Math.random() * 1000).toString(),
            user: user, // Assegna 'admin' se è un amministratore
            name: name,
            description: description
          };
          this.projects.set([...this.projects(), project]);
        } 
      })
    ).subscribe();
  }

  // Rimuove un progetto
  removeProject(projectId: string) {
    this.projects.set(this.projects().filter(project => project.id !== projectId));
  }
}
