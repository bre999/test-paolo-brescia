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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../../../models/my-date-formats';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    HeaderComponent, 
    CommonModule, 
    ReactiveFormsModule, 
    MatCardModule, 
    MatInputModule, 
    MatCardTitle, 
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
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
      })
    }
  }
  @Input()
  set projectId(projectId: string) {
    if(projectId){
     this._projectId = projectId
    }
  }
  constructor(
    private taskService: TaskService,
    private location: Location,
    private fb: FormBuilder,
    private authService: AuthService,
    private dateAdapter: DateAdapter<Date>
  ){
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      dueDate: ['', Validators.required]
    });
    this.dateAdapter.setLocale('it-IT'); 
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask = {
        ...this.taskForm.value,
        dueDate: this.taskForm.value.dueDate
      };
      if (this.editing_task) {
        const updatedTask = {
          ...this.editing_task,
          ...newTask
        };
        this.taskService.editTask(updatedTask);
      } else {
     
        this.taskService.addTask(newTask.title, newTask.description, newTask.dueDate, this._projectId!);
      }
      this.location.back();
    }
  }
}


