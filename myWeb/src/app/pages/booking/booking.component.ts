import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-booking',
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  services: string[] = ['Tắm cắt lông - chó', 'Cạo vôi răng', 'Chải lông', 'Vệ sinh tai'];
  selectedServices: string[] = [];
  isDropdownOpen: boolean = false;

  constructor(private eRef: ElementRef) {}

  // Toggle mở/đóng dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Chọn dịch vụ
  selectService(service: string) {
    if (!this.selectedServices.includes(service)) {
      this.selectedServices.push(service);
    }
    this.isDropdownOpen = false; // Đóng dropdown sau khi chọn
  }

  // Xóa dịch vụ đã chọn
  removeService(service: string) {
    this.selectedServices = this.selectedServices.filter(s => s !== service);
  }

  // Khi bấm bên ngoài dropdown -> tự động đóng dropdown
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
