import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false; // Biến kiểm soát menu mở/đóng
  displaybar='service-bar'
  value: string = ''
  userName: string | null = null;

  showServiceBar(){
    this.displaybar='service-bar'
  }
  
  showBar(){
    this.displaybar=''
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Đảo trạng thái menu
  }

  constructor(private router: Router, private sharedService: SharedService, @Inject(PLATFORM_ID) private platformId: Object) {}

  goToBooking() {
    this.router.navigate(['/booking']);
  }

  logout() {
    localStorage.removeItem('user'); 
    this.userName = null; 
    this.router.navigate(['/login']); 
  }
  
  ngOnInit() {
    this.sharedService.currentValue.subscribe(displaybar => {
      this.displaybar = displaybar; // Nhận giá trị từ product-service
    });

    if (isPlatformBrowser(this.platformId)) { // 🔹 Kiểm tra trước khi dùng localStorage
      const userData = localStorage.getItem("user");
      console.log(userData);

      if (userData) {
        this.userName = JSON.parse(userData).username;
      }
    }
    
    // const user = localStorage.getItem('user');
    // if (user) {
    //   this.userName = JSON.parse(user).username;
    // }
  }

}
