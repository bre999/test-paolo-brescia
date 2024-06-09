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


@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [CommonModule, TaskListComponent, MatCardModule, MatIconModule, MatProgressBar]
})
export class ProjectListComponent implements OnInit {
  currentUser$: Observable<User | null>;
  projects$: Observable<Project[]>;
  selectedProjectId: string | null = null;

  constructor(private projectService: ProjectService, private authService: AuthService, private taskService: TaskService) {
    this.projects$ = this.projectService.getProjects();
    this.currentUser$ = this.authService.getUser();
  }


  ngOnInit(): void {

  }

  addProject() {
    this.projectService.addProject('name', 'desc');
    console.log('percentage');
    
    this.getCompletionPercentage(this.selectedProjectId!).subscribe(console.log)
    console.log('tasks');

    this.taskService.getTasks(this.selectedProjectId!).subscribe(console.log)
  }

  deleteProject(projectId: string) {
    this.projectService.removeProject(projectId);
  }

  selectProject(projectId: string) {
    this.selectedProjectId = projectId;
  }

  clearSelection() {
    this.selectedProjectId = null;
  }

  editProject(project_id: string) { }
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

