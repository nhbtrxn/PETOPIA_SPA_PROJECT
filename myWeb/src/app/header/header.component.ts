import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false; // Biến kiểm soát menu mở/đóng

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Đảo trạng thái menu
  }
}
