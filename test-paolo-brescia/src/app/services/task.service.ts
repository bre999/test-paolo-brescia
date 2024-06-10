import { Injectable, signal, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { addTask, completeTask, removeTask, updateTask } from '../store/actions/task.actions';
import { selectAllTasks, selectTasksById, selectTasksByProject } from '../store/selectors/task.selector';
import { Observable, map, take } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = signal<Task[]>([]);

  // Iniettiamo AuthService per verificare il ruolo dell'utente
  private authService = inject(AuthService);

  constructor(private store: Store){}

  // Ottiene le attività di un progetto specifico per un utente specifico
  getTasks(projectId: string): Observable<Task[]> {
    return this.store.select(selectTasksByProject(projectId));
  }
  // Ottiene le attività di un progetto specifico per un utente specifico
  getTaskById(taskId: string): Observable<Task | undefined> {
    return this.store.select(selectTasksById(taskId));
  }


  


  addTask(title: string, description: string, date: string, projectId: string) {
    this.authService.getUser().pipe(
      take(1),
      map(user => {
        if (user) {
          const task: Task = {
            id: (Math.random() * 1000).toString(),
            userId: user.id,
            title: title,
            description: description,
            dueDate: date,
            completed: false,
            projectId: projectId
          };
          console.log('task');
          console.log(task);
          
         

          this.store.dispatch(addTask({ task: task }));

        }
      })
    ).subscribe();
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
