import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { projectReducer } from './store/reducer/project.reducer';
import { taskReducer } from './store/reducer/task.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync('noop'), provideStore({projects: projectReducer,
    tasks: taskReducer}), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects()]
};
