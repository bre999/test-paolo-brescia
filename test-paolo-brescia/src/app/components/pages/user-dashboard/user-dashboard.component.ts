import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from '../../shared/project-list/project-list.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  imports: [
    CommonModule, 
    ProjectListComponent, 
    RouterModule
  ]
})
export class UserDashboardComponent {}
