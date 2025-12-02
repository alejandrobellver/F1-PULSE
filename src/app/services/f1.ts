import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, tap } from 'rxjs';
import { Driver, Team } from '../models/f1';

@Injectable({
  providedIn: 'root'
})
export class F1Service {
  private http = inject(HttpClient);
  
  // URL de OpenF1. Usamos 'session_key=9158' (Abu Dhabi 2023) para obtener una parrilla completa.
  // Si no pones session_key, ¡te devolvería miles de pilotos de la historia!
  private apiUrl = 'https://api.openf1.org/v1/drivers?session_key=9158';

  // ESTADO REACTIVO
  private driversSubject = new BehaviorSubject<Driver[]>([]);
  public drivers$ = this.driversSubject.asObservable();

  // 1. GET: Cargar pilotos REALES de OpenF1
  loadDrivers(): Observable<Driver[]> {
    if (this.driversSubject.value.length > 0) {
      return this.drivers$;
    }

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(apiResponse => {
        // OpenF1 nos devuelve un array de objetos. Los transformamos a nuestra interfaz 'Driver'.
        return apiResponse.map(d => ({
          id: d.driver_number, // Usamos su número como ID
          name: d.full_name,   // OpenF1 usa 'full_name'
          team: d.team_name,   // OpenF1 usa 'team_name'
          number: d.driver_number,
          country: d.country_code,
          // La API de drivers no da puntos, así que los simulamos para que la tarjeta no quede vacía
          points: Math.floor(Math.random() * 300), 
          // OpenF1 tiene fotos reales en 'headshot_url'. Si viene vacía, usamos el avatar por defecto.
          image: d.headshot_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${d.name_acronym}`,
          liked: false
        }));
      }),
      tap(drivers => {
        this.driversSubject.next(drivers);
      })
    );
  }

  // 2. POST: Añadir piloto (Simulado localmente, ya que OpenF1 es solo lectura)
  addDriver(driver: Omit<Driver, 'id'>): Observable<Driver> {
    // Simulamos una petición vacía para cumplir con el Observable
    return new Observable<Driver>(observer => {
      const newDriver = { ...driver, id: Date.now() };
      
      const currentList = this.driversSubject.value;
      this.driversSubject.next([...currentList, newDriver]);
      
      observer.next(newDriver);
      observer.complete();
    });
  }

  // 3. DELETE: Eliminar piloto (Simulado localmente)
  removeDriver(id: number): Observable<void> {
    return new Observable<void>(observer => {
      const currentList = this.driversSubject.value;
      this.driversSubject.next(currentList.filter(d => d.id !== id));
      
      observer.next();
      observer.complete();
    });
  }

  // 4. PATCH: Dar Like (Simulado localmente)
  toggleLike(id: number): Observable<void> {
    return new Observable<void>(observer => {
      const currentList = this.driversSubject.value;
      const updatedList = currentList.map(d => {
        if (d.id === id) return { ...d, liked: !d.liked };
        return d;
      });
      this.driversSubject.next(updatedList);
      
      observer.next();
      observer.complete();
    });
  }

  // Datos de escuderías (estáticos para el ejercicio)
  getTeams(): Team[] {
    return [
      { name: 'Red Bull Racing', base: 'Milton Keynes, UK', principal: 'Christian Horner', color: '#0600EF' },
      { name: 'Ferrari', base: 'Maranello, IT', principal: 'Frédéric Vasseur', color: '#EF1A2D' },
      { name: 'Mercedes', base: 'Brackley, UK', principal: 'Toto Wolff', color: '#00D2BE' },
      { name: 'McLaren', base: 'Woking, UK', principal: 'Andrea Stella', color: '#FF8000' },
      { name: 'Aston Martin', base: 'Silverstone, UK', principal: 'Mike Krack', color: '#006F62' }
    ];
  }
}