import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-input-form-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-form-section.component.html',
  styleUrl: './input-form-section.component.scss',
})
export class InputFormSectionComponent {
  @Output() formSubmit = new EventEmitter<any>();

  form = {
    rank: 1,
    caste: '',
    gender: '',
    seat_type: '',
    special_reservation: '',
  };

  submit() {
    this.formSubmit.emit(this.form);
  }
}
