import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// Importamos F1App en lugar de AppComponent
import { F1App } from './app/app';

bootstrapApplication(F1App, appConfig)
  .catch((err) => console.error(err));