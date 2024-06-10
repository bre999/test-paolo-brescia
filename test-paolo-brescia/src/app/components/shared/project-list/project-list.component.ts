import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { AuthService } from '../../../services/auth.service';
import { Observable, map } from 'rxjs';
import { User } from '../../../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar'
import { TaskService } from '../../../services/task.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [CommonModule, TaskListComponent, MatCardModule, MatIconModule, MatProgressBar, MatDialogModule,HeaderComponent,]
})
export class ProjectListComponent {
  currentUser$: Observable<User | null>;
  projects$: Observable<Project[]>;
  selectedProjectId: string | null = null;

  constructor(private projectService: ProjectService, private authService: AuthService, private taskService: TaskService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute ) {
    this.projects$ = this.projectService.getProjects();
    this.currentUser$ = this.authService.getUser();
  }

  addProject() {
    this.router.navigate(['../project'], { relativeTo: this.route })
  }

  deleteProject(projectId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Sei sicuro di voler eliminare questo progetto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.removeProject(projectId);
      }
    });
  }

  selectProject(projectId: string) {
    this.selectedProjectId = projectId;
  }

  clearSelection() {
    this.selectedProjectId = null;
  }

  getTaskLength(projectId: string): Observable<number> {
    return this.taskService.getTasks(projectId).pipe(
      map(tasks => {
        return tasks.length ?? 0
      })
    )
  }

  editProject(projectId: string) { 
    this.router.navigate(['../project'], { relativeTo: this.route, queryParams: { 'id': projectId }, });
  }


  getCompletionPercentage(projectId: string): Observable<number> {
    return this.taskService.getTasks(projectId).pipe(
      map(tasks => {
        if (!tasks || tasks.length === 0 || tasks.filter(task => task.completed).length === 0) {
          // Se non ci sono task, ritorna 0
          return 0;
        }
        // Calcola il numero di task completati
        let completedTasks = tasks.filter(task => task.completed).length;
        // Ritorna la percentuale di task completati
        return (completedTasks / tasks.length) * 100;
      })
    );
  }
}

