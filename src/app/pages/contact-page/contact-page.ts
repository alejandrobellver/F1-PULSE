import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { F1Service } from '../../services/f1';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.html',
  styleUrls: ['./contact-page.css']
})
export class ContactPage {
  private fb = inject(FormBuilder);
  private service = inject(F1Service);

  teams = this.service.getTeams();
  submitted = false;

  // Definición del formulario con validaciones
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    team: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  // Helper para saber si un campo es inválido visualmente
  isInvalid(field: string) {
    const ctrl = this.form.get(field);
    return ctrl?.invalid && ctrl?.touched;
  }

  send() {
    if (this.form.valid) {
      const val = this.form.value;
      // Añadir piloto
      this.service.addDriver({
        name: val.name,
        team: val.team,
        country: 'Unknown',
        number: 99,
        points: 0,
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${val.name}`,
        liked: false
      }).subscribe(() => {
        this.submitted = true;
        this.form.reset();
        // Ocultamos mensaje de éxito tras 3 segundos
        setTimeout(() => this.submitted = false, 3000);
      });
    } else {
      // Marcar todos como tocados para que salgan los errores
      this.form.markAllAsTouched();
    }
  }
}
