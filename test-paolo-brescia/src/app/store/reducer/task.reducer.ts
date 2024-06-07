import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TaskActions from '../actions/task.actions';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(TaskActions.removeTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== taskId)
  })),
  on(TaskActions.completeTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
  }))
);
