import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-product-service',
  imports: [CommonModule],
  templateUrl: './product-service.component.html',
  styleUrl: './product-service.component.css'
})
export class ProductServiceComponent {
  isMenuOpen = false;
  activeSection: string | null = null;
  choosenCategory: string | null = 'service-category';
  // isIconRotated = false;

  rotatedIcons: { [key: string]: boolean } = {
    'dog-product-bar': false,
    'cat-product-bar': false,
  };
  
  toggleIcon(key: string): void {
    this.rotatedIcons[key] = !this.rotatedIcons[key]; // Chuyển đổi trạng thái xoay
    const valueToSend = this.rotatedIcons[key] ? key : 'product-bar';
    this.sendValue(valueToSend);
  }

  toggleCategory(category: string, event: Event): void {
    event.preventDefault(); // Ngăn điều hướng mặc định
    this.choosenCategory = this.choosenCategory === category ? null : category;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; 
  }
  showService(){
      this.choosenCategory='service-category';
  }
  showProduct(){
      this.choosenCategory='product-category';
  }

  // sendValue() {
  //   this.sharedService.setValue('dog-product-bar'); // Gán giá trị tùy ý
  // }

  sendValue(value: string): void {
    this.sharedService.setValue(value); // Gửi giá trị tới SharedService
  }

  constructor(private sharedService: SharedService) {}
}
