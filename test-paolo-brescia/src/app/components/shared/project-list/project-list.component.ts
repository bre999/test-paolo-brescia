import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListComponent } from '../task-list/task-list.component';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [CommonModule, TaskListComponent]
})
export class ProjectListComponent implements OnInit {
  @Input() isAdmin: boolean = false; // Permette di specificare se il componente è usato dall'amministratore
  projects: Project[] = [];
  selectedProjectId: string | null = null;

  constructor(private projectService: ProjectService, private authService: AuthService) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (this.isAdmin) {
      this.projects = this.projectService.getAllProjects();
    } else {
      this.projects = this.projectService.getProjects(userId!);
    }
  }

  addProject() {
    const userId = this.authService.getUserId();
    const newProject: Project = {
      id: (Math.random() * 1000).toString(),
      userId: this.isAdmin ? 'admin' : userId!, // Assegna 'admin' se è un amministratore
      name: 'Nuovo Progetto',
      description: 'Descrizione del nuovo progetto'
    };
    this.projectService.addProject(newProject);
    this.projects = this.isAdmin ? this.projectService.getAllProjects() : this.projectService.getProjects(userId!); // Aggiorna la lista dei progetti
  }

  deleteProject(projectId: string) {
    this.projectService.removeProject(projectId);
    const userId = this.authService.getUserId();
    this.projects = this.isAdmin ? this.projectService.getAllProjects() : this.projectService.getProjects(userId!); // Aggiorna la lista dei progetti
  }

  selectProject(projectId: string) {
    this.selectedProjectId = projectId;
  }

  clearSelection() {
    this.selectedProjectId = null;
  }
}
