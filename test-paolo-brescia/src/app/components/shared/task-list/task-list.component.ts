import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { Task } from '../../../models/task.model';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private taskService: TaskService, private authService: AuthService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.currentUser$ = this.authService.getUser();
    this.tasks$ = this.taskService.getTasks(this.projectId!);
  }

  ngOnInit(): void {
    this.tasks$.subscribe(console.log)
  }

  addTask() {
    this.router.navigate(['../task'], { relativeTo: this.route , queryParams: { 'projectId': this._projectId}})
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId);
  }

  deleteTask(taskId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Sei sicuro di voler eliminare questo task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.removeTask(taskId);
      }
    });
  }

  private loadTasks(projectId: string): void {
    this.tasks$ = this.taskService.getTasks(projectId);
  }
  editTask(taskId: string) {
    this.router.navigate(['../task'], { relativeTo: this.route, queryParams: { 'taskId': taskId, 'projectId': this._projectId}});
  }
}
