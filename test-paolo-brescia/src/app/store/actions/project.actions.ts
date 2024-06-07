import { createAction, props } from '@ngrx/store';
import { Project } from '../../models/project.model';

// Azione per modificare un progetto
export const updateProject = createAction('[Project] Update Project', props<{ project: Project }>());

// Azione per aggiungere un progetto
export const addProject = createAction('[Project] Add Project', props<{ project: Project }>());

// Azione per rimuovere un progetto
export const removeProject = createAction('[Project] Remove Project', props<{ projectId: string }>());
