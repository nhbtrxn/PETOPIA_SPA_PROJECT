import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { ProductComponent } from '../product/product.component';
import { DogProductComponent } from '../dog-product/dog-product.component';
import { ServiceComponent } from '../service/service.component';
import { CatProductComponent } from '../cat-product/cat-product.component';

@Component({
  selector: 'app-product-service',
  imports: [CommonModule, ServiceComponent, ProductComponent, DogProductComponent, CatProductComponent],
  templateUrl: './product-service.component.html',
  styleUrls: ['./product-service.component.css'] // 
})
export class ProductServiceComponent {
  isMenuOpen = false;
  activeSection: string | null = null;
  choosenCategory: string = 'service-category';

  rotatedIcons: { [key: string]: boolean } = {
    'dog-product-bar': false,
    'cat-product-bar': false,
  };

  visibleSections: { [key: string]: boolean } = {
    'dog-product-bar': false,
    'cat-product-bar': false,
  };

  constructor(private sharedService: SharedService) {}

  toggleIcon(key: string): void {
    if (!(key in this.visibleSections)) {
      console.error(`Key ${key} không tồn tại trong visibleSections`);
      return;
    }

    // Đảo trạng thái ẩn/hiện và xoay icon
    this.visibleSections[key] = !this.visibleSections[key];
    this.rotatedIcons[key] = !this.rotatedIcons[key];

    console.log("visibleSections:", this.visibleSections);
    console.log("rotatedIcons:", this.rotatedIcons);

    // Gửi giá trị tới SharedService
    const valueToSend = this.rotatedIcons[key] ? key : 'product-bar';
    this.sendValue(valueToSend);
  }

  toggleCategory(category: string, event: Event): void {
    event.preventDefault();
    this.choosenCategory = (this.choosenCategory === category) ? 'service-category' : category;
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
