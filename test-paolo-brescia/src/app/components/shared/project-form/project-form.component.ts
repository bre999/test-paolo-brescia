import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../pages/login/login.component';
import { ProjectService } from '../../../services/project.service';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { Project } from '../../../models/project.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HeaderComponent,
    CommonModule,
    MatCardTitle,
    MatCardModule
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent {
  projectForm: FormGroup;
  editing_project: Project | null = null;
  
  @Input()
  set id(projectId: string) {
    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe(project => {
        this.editing_project = project;
        this.projectForm.patchValue(project);
      })
    }
  }

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private location: Location
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const new_project = this.projectForm.value; // Ottiene i valori del form
      if (this.editing_project) {
        // Crea un nuovo oggetto combinando le proprietà di editing_project con quelle di new_project
        const updated_project = {
          ...this.editing_project,
          ...new_project
        };
        this.projectService.editProject(updated_project);
      } else {
        this.projectService.addProject(new_project.name, new_project.description);
      }

      this.location.back();
    }
  }
}
