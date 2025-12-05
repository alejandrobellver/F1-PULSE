import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { F1App } from './app/app';

bootstrapApplication(F1App, appConfig)
  .catch((err) => console.error(err));
