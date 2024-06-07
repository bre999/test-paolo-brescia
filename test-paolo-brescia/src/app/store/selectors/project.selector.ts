import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProjectState } from '../reducer/project.reducer';
import { Project } from '../../models/project.model';


// Selettore di feature per ottenere lo stato dei task
export const selecProjectState = createFeatureSelector<ProjectState>('projects');

// Selettore per ottenere tutti i task
export const selectAllProject = createSelector(
  selecProjectState,
  (state: ProjectState) => state.projects
);

// Selettore per ottenere i task di un progetto specifico
export const selectProjectsByUserId = (userId: string) => createSelector(
  selectAllProject,
  (project: Project[]) => project.filter(project => project.user.id === userId)
);
