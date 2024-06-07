import { createAction, props } from '@ngrx/store';
import { Project } from '../../models/project.model';

// Definisce l'azione per aggiungere un progetto
export const addProject = createAction('[Project] Add Project', props<{ project: Project }>());

// Definisce l'azione per rimuovere un progetto
export const removeProject = createAction('[Project] Remove Project', props<{ projectId: string }>());
