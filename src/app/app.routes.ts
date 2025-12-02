import { Routes } from '@angular/router';

// Impotamos las rutas de las diferentes paginas que tenemos, en este caso 
// Pilotos, Equipos y Registro
import { DriversPage } from './pages/drivers-page/drivers-page';
import { TeamsPage } from './pages/teams-page/teams-page';
import { ContactPage } from './pages/contact-page/contact-page';

export const routes: Routes = [
  // Ruta por defecto: Redirigir a 'Pilotos'
  { path: '', redirectTo: 'drivers', pathMatch: 'full' },
  
  // Rutas principales
  { path: 'drivers', component: DriversPage, title: 'F1 - Pilotos' },
  { path: 'teams', component: TeamsPage, title: 'F1 - Escuderías' },
  { path: 'contact', component: ContactPage, title: 'F1 - Registro' },
  
  // Ruta comodín (404): Si la URL no existe, volver a Pilotos
  { path: '**', redirectTo: 'drivers' }
];