import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-registered-successfully',
  imports: [],
  templateUrl: './registered-successfully.component.html',
  styleUrl: './registered-successfully.component.css'
})
export class RegisteredSuccessfullyComponent {
  @Output() closePopup = new EventEmitter<void>();

  onClose() {
    this.closePopup.emit();
  }
}
