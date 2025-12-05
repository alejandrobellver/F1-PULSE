import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1Service } from '../../services/f1';
import { DriverCard } from '../../components/driver-card/driver-card';

@Component({
  selector: 'app-drivers-page',
  standalone: true,
  imports: [CommonModule, DriverCard],
  templateUrl: './drivers-page.html',
  styleUrls: ['./drivers-page.css']
})
export class DriversPage implements OnInit {
  private service = inject(F1Service);

  // Exponemos el Observable de pilotos para usarlo en el HTML con el pipe | async
  drivers$ = this.service.drivers$;
  loading = true;

  ngOnInit() {
    // Pedimos los datos al iniciar la página
    this.service.loadDrivers().subscribe(() => {
      this.loading = false;
    });
  }

  // Métodos que conectan la tarjeta con el servicio
  toggleLike(id: number) {
    this.service.toggleLike(id).subscribe();
  }

  deleteDriver(id: number) {
    if(confirm('¿Estás seguro de que quieres eliminar este piloto de tu lista?')) {
      this.service.removeDriver(id).subscribe();
    }
  }
}
