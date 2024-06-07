import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

// Azione per modificare un task
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());

// Azione per aggiungere un task
export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

// Azione per rimuovere un task
export const removeTask = createAction('[Task] Remove Task', props<{ taskId: string }>());

// Azione per completare un task
export const completeTask = createAction('[Task] Complete Task', props<{ taskId: string }>());
