import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { F1Service } from '../../services/f1';

@Component({
  selector: 'app-teams-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams-page.html',
  styleUrls: ['./teams-page.css']
})
export class TeamsPage {
  private service = inject(F1Service);
  // Obtenemos la lista estática
  teams = this.service.getTeams();
}
