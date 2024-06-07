import { Injectable, signal, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';



@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = signal<Task[]>([]);

  // Iniettiamo AuthService per verificare il ruolo dell'utente
  private authService = inject(AuthService);

  // Ottiene le attività di un progetto specifico per un utente specifico
  getTasks(projectId: string) {
    return this.tasks().filter(task => task.projectId === projectId);
  }

  // Aggiunge una nuova attività
  addTask(task: Task) {
    this.tasks.set([...this.tasks(), task]);
  }

  // Completa un'attività
  completeTask(taskId: string) {
    console.log('taskid');
    console.log(taskId);
    console.log(('tasks'));
    console.log((this.tasks()));
    
    const updatedTasks = this.tasks().map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    console.log(updatedTasks);
    

    this.tasks.set(updatedTasks);
  }

  // Rimuove un'attività
  removeTask(taskId: string) {
    this.tasks.set(this.tasks().filter(task => task.id !== taskId));
  }
}
