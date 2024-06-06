import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from '../../shared/project-list/project-list.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule, ProjectListComponent]
})
export class AdminDashboardComponent {}
