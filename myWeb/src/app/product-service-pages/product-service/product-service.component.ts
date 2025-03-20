import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { PetProductComponent } from '../pet-product/pet-product.component';
import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-product-service',
  imports: [CommonModule, ServiceComponent, PetProductComponent],
  templateUrl: './product-service.component.html',
  styleUrls: ['./product-service.component.css'],
})
export class ProductServiceComponent {
  isMenuOpen = false;
  activeSection: string | null = null;
  choosenCategory: string = 'product-category'; 

  rotatedIcons: { [key: string]: boolean } = {
    'dog-product-bar': true,
    'cat-product-bar': false,
  };

  visibleSections: { [key: string]: boolean } = {
    'dog-product-bar': true,
    'cat-product-bar': false,
  };

  constructor(private sharedService: SharedService) {}

  toggleIcon(key: string): void {
    console.log('Key nhận được:', key);
    console.log('Trạng thái trước:', this.visibleSections[key]);

    if (!(key in this.visibleSections)) {
      console.error(`Key ${key} không tồn tại trong visibleSections`);
      return;
    }

    this.visibleSections[key] = !this.visibleSections[key];
    this.rotatedIcons[key] = !this.rotatedIcons[key];

    console.log('Trạng thái sau:', this.visibleSections[key]);
    console.log('Giá trị gửi đi:', this.rotatedIcons[key] ? key : 'product-bar');

    this.sendValue(this.rotatedIcons[key] ? key : 'product-bar');
  }

  toggleCategory(category: string, event: Event): void {
    event.preventDefault();
    this.choosenCategory = category;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  showService() {
    this.choosenCategory = 'service-category';
  }

  showProduct() {
    this.choosenCategory = 'product-category';
  }

  sendValue(value: string): void {
    this.sharedService.setValue(value);
  }
}
