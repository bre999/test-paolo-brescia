import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { Task } from '../../../models/task.model';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule]
})
export class TaskListComponent implements OnInit {
  @Input() currentUser: User | null = null; // Permette di specificare se il componente è usato dall'amministratore
  @Input() projectId: string | undefined = undefined; // ID del progetto selezionato
  tasks: Task[] = [];
  error: string | null = null;
  currentUser$: Observable<User | null>;
  constructor(private taskService: TaskService, private authService: AuthService) {
    this.currentUser$ = this.authService.getUser();
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks(this.projectId!)
  }

  addTask() {
    const newTask: Task = {
      id: (Math.random() * 1000).toString(),
      userId: this.currentUser?.id!,
      projectId: this.projectId!,
      title: 'Nuova Attività',
      description: 'Descrizione della nuova attività',
      dueDate: new Date().toISOString(),
      completed: false
    };
    this.taskService.addTask(newTask);
    this.tasks = this.taskService.getTasks(this.projectId!) // Aggiorna la lista delle attività
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId);
    this.tasks = this.taskService.getTasks(this.projectId!) 
  }

  deleteTask(taskId: string) {
    this.taskService.removeTask(taskId);
    this.tasks = this.taskService.getTasks(this.projectId!) 
  }
}
