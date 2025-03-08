import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false; // Biến kiểm soát menu mở/đóng

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Đảo trạng thái menu
  }

  constructor(private router: Router) {}

  goToBooking() {
    this.router.navigate(['/booking']);
  }

}
