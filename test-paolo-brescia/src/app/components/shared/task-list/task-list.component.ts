import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule]
})
export class TaskListComponent implements OnInit {
  @Input() isAdmin: boolean = false; // Permette di specificare se il componente è usato dall'amministratore
  @Input() projectId: string | undefined = undefined; // ID del progetto selezionato
  tasks: Task[] = [];
  error: string | null = null;

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit() {
    try {
      if (this.isAdmin) {
        this.tasks = this.taskService.getAllTasks(this.projectId!);
      } else {
        const userId = this.authService.getUserId();
        this.tasks = this.taskService.getTasks(this.projectId!, userId!);
      }
    } catch (err: any) {
      this.error = err.message;
    }
  }

  addTask() {
    const userId = this.authService.getUserId();
    const newTask: Task = {
      id: (Math.random() * 1000).toString(),
      userId: userId!,
      projectId: this.projectId!,
      title: 'Nuova Attività',
      description: 'Descrizione della nuova attività',
      dueDate: new Date().toISOString(),
      completed: false
    };
    this.taskService.addTask(newTask);
    this.tasks = this.isAdmin ? this.taskService.getAllTasks(this.projectId!) : this.taskService.getTasks(this.projectId!, userId!); // Aggiorna la lista delle attività
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId);
    const userId = this.authService.getUserId();
    this.tasks = this.isAdmin ? this.taskService.getAllTasks(this.projectId!) : this.taskService.getTasks(this.projectId!, userId!); // Aggiorna la lista delle attività
  }

  deleteTask(taskId: string) {
    this.taskService.removeTask(taskId);
    const userId = this.authService.getUserId();
    this.tasks = this.isAdmin ? this.taskService.getAllTasks(this.projectId!) : this.taskService.getTasks(this.projectId!, userId!); // Aggiorna la lista delle attività
  }
}
