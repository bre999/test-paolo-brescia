import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Task } from '../../models/task.model';
import { TaskState } from '../reducer/task.reducer';

// Selettore di feature per ottenere lo stato dei task
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Selettore per ottenere tutti i task
export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

// Selettore per ottenere i task di un progetto specifico
export const selectTasksByProject = (projectId: string) => createSelector(
  selectAllTasks,
  (tasks: Task[]) => tasks.filter(task => !!task.projectId && task.projectId === projectId)
);
