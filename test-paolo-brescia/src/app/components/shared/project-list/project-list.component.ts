import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListComponent } from '../task-list/task-list.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [CommonModule, TaskListComponent,  MatCardModule]
})
export class ProjectListComponent implements OnInit {
  currentUser$: Observable<User | null>;
  projects$: Observable<Project[]>;
  selectedProjectId: string | null = null;

  constructor(private projectService: ProjectService, private authService: AuthService) {
    this.projects$ = this.projectService.getProjects();
    this.currentUser$ = this.authService.getUser();
  }


  ngOnInit(): void {

  }

  addProject() {
    this.projectService.addProject('name', 'desc');
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
}
