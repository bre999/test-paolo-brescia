import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { Task } from '../../../models/task.model';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class TaskListComponent implements OnInit {

  private _projectId: string | undefined;
  @Input() currentUser: User | null = null; // Permette di specificare se il componente è usato dall'amministratore
  @Input()
  set projectId(value: string | undefined) {
    this._projectId = value;
    if (this._projectId) {
      this.loadTasks(this._projectId);
    }
  }

  tasks$: Observable<Task[]>;
  error: string | null = null;
  currentUser$: Observable<User | null>;
  constructor(private taskService: TaskService, private authService: AuthService) {
    this.currentUser$ = this.authService.getUser();
    this.tasks$ = this.taskService.getTasks(this.projectId!);
  }

  ngOnInit(): void {
    this.tasks$.subscribe(console.log)
  }

  addTask() {
    const newTask: Task = {
      id: (Math.random() * 1000).toString(),
      userId: this.currentUser?.id!,
      projectId: this._projectId!,
      title: 'Nuova Attività',
      description: 'Descrizione della nuova attività',
      dueDate: new Date().toISOString(),
      completed: false
    };
    console.log('newTask');
    console.log(newTask);

    this.taskService.addTask(newTask);
    console.log('tsk ng');

    this.tasks$.subscribe(console.log);

  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId);
  }

  deleteTask(taskId: string) {
    this.taskService.removeTask(taskId);
  }

  private loadTasks(projectId: string): void {
    this.tasks$ = this.taskService.getTasks(projectId);
  }
  editProject(taskId: string) {

  }
}
