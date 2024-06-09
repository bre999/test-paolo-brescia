import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from '../../shared/project-list/project-list.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  imports: [CommonModule, ProjectListComponent, HeaderComponent]
})
export class UserDashboardComponent {}
