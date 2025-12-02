import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
// 1. Importamos el proveedor HTTP
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    
    // 2. Activamos el cliente HTTP para toda la app
    provideHttpClient(
      // (Opcional) Aquí podríamos añadir el interceptor de la UD7 más adelante
      // withInterceptors([...]) 
    )
  ]
};