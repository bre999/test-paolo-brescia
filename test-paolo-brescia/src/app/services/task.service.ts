import { Injectable, signal, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { addTask, completeTask, removeTask, updateTask } from '../store/actions/task.actions';
import { selectTasksByProject } from '../store/selectors/task.selector';



@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = signal<Task[]>([]);

  // Iniettiamo AuthService per verificare il ruolo dell'utente
  private authService = inject(AuthService);

  constructor(private store: Store){}

  // Ottiene le attività di un progetto specifico per un utente specifico
  getTasks(projectId: string) {
    return this.store.select(selectTasksByProject(projectId));
  }

  // Aggiunge una nuova attività
  addTask(task: Task) {
    this.store.dispatch(addTask({ task: task }));
  }

  // Completa un'attività
  completeTask(taskId: string) {    
    this.store.dispatch(completeTask({ taskId }));
  }

  // Rimuove un'attività
  removeTask(taskId: string) {
    this.store.dispatch(removeTask({ taskId }));
  }

  editTask(task: Task) {
    this.store.dispatch(updateTask({ task: task }));
  }
}
