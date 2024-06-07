import { Injectable, signal, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Project } from '../models/project.model';
import { Observable, filter, map, of, switchMap, take } from 'rxjs';
import { UserRole } from '../models/user.model';
import { Store } from '@ngrx/store';
import { addProject, removeProject } from '../store/actions/project.actions';
import { selectAllProject, selectProjectsByUserId } from '../store/selectors/project.selector';


@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects$ = Observable<Project[]>;
  private authService = inject(AuthService);
  private projects = signal<Project[]>([])

  constructor(private auth_service: AuthService, private store: Store) { }
  
  // Ottiene i progetti in base a gli utenti
  getProjects(): Observable<Project[]> {
    return this.authService.getUser().pipe(
      switchMap(user => {
        if (user?.role === 'Utente Standard') {
          return  this.store.select(selectProjectsByUserId(user.id));
        } else if (user?.role === 'Administrator' as UserRole) {
          return this.store.select(selectAllProject);
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
            user: user,
            name: name,
            description: description
          };
          console.log('project');
          console.log(project);
          
          this.store.dispatch(addProject({ project: project }));
  
        } 
      })
    ).subscribe();
  }

  // Rimuove un progetto
  removeProject(projectId: string) {
    this.store.dispatch(removeProject({ projectId }));
  }
}
