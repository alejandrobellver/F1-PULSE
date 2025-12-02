import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { F1App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(F1App, config, context);

export default bootstrap;
