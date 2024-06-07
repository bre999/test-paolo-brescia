import { createReducer, on } from '@ngrx/store';
import { Project } from '../../models/project.model';
import * as ProjectActions from '../actions/project.actions';

export interface ProjectState {
  projects: Project[];
}

export const initialState: ProjectState = {
  projects: []
};

export const projectReducer = createReducer(
  initialState,
  on(ProjectActions.updateProject, (state, { project }) => ({
    ...state,
    projects: state.projects.map(p => p.id === project.id ? project : p)
  })),
  on(ProjectActions.addProject, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project]
  })),
  on(ProjectActions.removeProject, (state, { projectId }) => ({
    ...state,
    projects: state.projects.filter(project => project.id !== projectId)
  }))
);
