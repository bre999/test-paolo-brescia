import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatCardTitle],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  private _projectId: string | undefined;
  taskForm: FormGroup;
  editing_task: Task | undefined = undefined;

  @Input()
  set taskId(taskId: string) {
    if(taskId){
      this.taskService.getTaskById(taskId).subscribe(task=>{
       this.editing_task = task;
       this.taskForm.patchValue(task!);
       console.log(this.editing_task);
       
      })
    }
  }
  @Input()
  set projectId(projectId: string) {
    if(projectId){
      console.log('projectId');
      console.log(projectId);
      
     this._projectId = projectId
    }
  }
  constructor(
    private taskService: TaskService,
    private location: Location,
    private fb: FormBuilder,
    authService: AuthService
  ){
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
     
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value; 
      if (this.editing_task) {
        const updatedTask = {
          ...this.editing_task,
          ...newTask
        };
        this.taskService.editTask(updatedTask);
      } else {
     
        this.taskService.addTask(newTask.title, newTask.description, '', this._projectId!);
      }
      this.location.back();
    }
  }
}
