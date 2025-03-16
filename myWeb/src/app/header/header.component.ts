import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  
  showServiceBar(){
    this.displaybar='service-bar'
  }
  
  showBar(){
    this.displaybar=''
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Đảo trạng thái menu
  }

  constructor(private router: Router, private sharedService: SharedService) {}

  goToBooking() {
    this.router.navigate(['/booking']);
  }
  
  ngOnInit() {
    this.sharedService.currentValue.subscribe(displaybar => {
      this.displaybar = displaybar; // Nhận giá trị từ product-service
    });
  }

}
