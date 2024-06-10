import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from '../../shared/project-list/project-list.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [
    CommonModule, 
    ProjectListComponent, 
    HeaderComponent, 
    RouterModule
  ]
})
export class AdminDashboardComponent {}
