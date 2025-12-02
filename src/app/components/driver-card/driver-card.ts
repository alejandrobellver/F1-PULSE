import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Driver } from '../../models/f1'; // Importamos la interfaz

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-card.html',
  styleUrls: ['./driver-card.css']
})
export class DriverCard { 
  
  @Input({ required: true }) driver!: Driver;

  @Output() liked = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  onLike() {
    this.liked.emit();
  }

  onDelete() {
    this.deleted.emit();
  }

  // Método auxiliar para colores según equipo (UD3: ngStyle/ngClass)
  getTeamColor(team: string): string {
    // Normalizamos para evitar errores de mayúsculas
    const t = team.toLowerCase();
    if (t.includes('red bull')) return '#0600EF';
    if (t.includes('ferrari')) return '#EF1A2D';
    if (t.includes('mercedes')) return '#00D2BE';
    if (t.includes('mclaren')) return '#FF8000';
    if (t.includes('aston')) return '#006F62';
    return '#ccc'; // Color por defecto
  }
}