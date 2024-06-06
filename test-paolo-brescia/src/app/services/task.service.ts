import { Injectable, signal, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Task } from '../models/task.model';



@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = signal<Task[]>([]);

  // Iniettiamo AuthService per verificare il ruolo dell'utente
  private authService = inject(AuthService);

  // Ottiene le attività di un progetto specifico per un utente specifico
  getTasks(projectId: string, userId: string) {
    return this.tasks().filter(task => task.projectId === projectId && task.userId === userId);
  }

  // Ottiene tutte le attività di un progetto specifico (solo per l'amministratore)
  getAllTasks(projectId: string) {
    if (this.authService.getRole() === 'Admin') {
      return this.tasks().filter(task => task.projectId === projectId);
    } else {
      throw new Error('Access Denied: Only admins can access all tasks.');
    }
  }

  // Aggiunge una nuova attività
  addTask(task: Task) {
    this.tasks.set([...this.tasks(), task]);
  }

  // Completa un'attività
  completeTask(taskId: string) {
    const updatedTasks = this.tasks().map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    this.tasks.set(updatedTasks);
  }

  // Rimuove un'attività
  removeTask(taskId: string) {
    this.tasks.set(this.tasks().filter(task => task.id !== taskId));
  }
}
