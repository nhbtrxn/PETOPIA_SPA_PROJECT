import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DogProductListComponent } from '../dog-product-list/dog-product-list.component';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-dog-product',
  templateUrl: './dog-product.component.html',
  styleUrls: ['./dog-product.component.css'],
  imports: [CommonModule, RouterModule, DogProductListComponent],
})
export class DogProductComponent implements OnInit {
  allProducts: any[] = [];
  filteredFood: any[] = [];
  filteredMedicine: any[] = [];
  filteredHygiene: any[] = [];
  filteredAccessories: any[] = [];
  filteredClothing: any[] = [];
  filteredSupplies: any[] = [];

  displayedAllProducts: any[] = [];
  displayedFilteredFood: any[] = [];
  displayedFilteredMedicine: any[] = [];
  displayedFilteredHygiene: any[] = [];
  displayedFilteredAccessories: any[] = [];
  displayedFilteredClothing: any[] = [];
  displayedFilteredSupplies: any[] = [];

  currentIndexAll = 0;
  currentIndexFood = 0;
  currentIndexMedicine = 0;
  currentIndexHygiene = 0;
  currentIndexAccessories = 0;
  currentIndexClothing = 0;
  currentIndexSupplies = 0;

  itemsPerPage = 5;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

ngOnInit(): void {
    this.productService.getProducts().pipe(
      tap((data) => {
        this.allProducts = data.filter(
          (product) => product.product_id.startsWith('c_') 
        )
        this.filteredFood = data.filter(
          (product) => product.product_id.startsWith('c_') && product.category === 'Thức ăn '
        );
        this.filteredMedicine = data.filter(
          (product) => product.product_id.startsWith('c_') && product.category === 'Thuốc'
        );
        this.filteredHygiene = data.filter(
          (product) => product.product_id.startsWith('c_') && product.category === 'Dụng cụ vệ sinh'
        );
        this.filteredAccessories = data.filter(
          (product) => product.product_id.startsWith('c_') && product.category === 'Phụ kiện'
        );
        this.filteredClothing = data.filter(
          (product) => product.product_id.startsWith('c_') && product.category === 'Quần áo'
        );
        this.filteredSupplies = data.filter(
          (product) => product.product_id.startsWith('c_') && product.category === 'Đồ dùng'
        );

        this.errorMessage = this.allProducts.length === 0 ? 'Không có sản phẩm nào hiển thị!' : null;
        this.updateDisplayedProducts();
      })
    ).subscribe({
      next: () => console.log('Dữ liệu sản phẩm được tải thành công'),
      error: (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
        this.errorMessage = 'Lỗi khi tải sản phẩm. Vui lòng thử lại sau!';

      }
    });
  }

  updateDisplayedProducts(): void {
    this.displayedAllProducts = this.allProducts.slice(this.currentIndexAll, this.currentIndexAll + this.itemsPerPage);
    this.displayedFilteredFood = this.filteredFood.slice(this.currentIndexFood, this.currentIndexFood + this.itemsPerPage);
    this.displayedFilteredMedicine = this.filteredMedicine.slice(this.currentIndexMedicine, this.currentIndexMedicine + this.itemsPerPage);
    this.displayedFilteredHygiene = this.filteredHygiene.slice(this.currentIndexHygiene, this.currentIndexHygiene + this.itemsPerPage);
    this.displayedFilteredAccessories = this.filteredAccessories.slice(this.currentIndexAccessories, this.currentIndexAccessories + this.itemsPerPage);
    this.displayedFilteredClothing = this.filteredClothing.slice(this.currentIndexClothing, this.currentIndexClothing + this.itemsPerPage);
    this.displayedFilteredSupplies = this.filteredSupplies.slice(this.currentIndexSupplies, this.currentIndexSupplies + this.itemsPerPage);
  }

  prevAll(): void { if (this.currentIndexAll > 0) { this.currentIndexAll -= this.itemsPerPage; this.updateDisplayedProducts(); } }
  nextAll(): void { if (this.currentIndexAll + this.itemsPerPage < this.allProducts.length) { this.currentIndexAll += this.itemsPerPage; this.updateDisplayedProducts(); } }

  prevFood(): void { if (this.currentIndexFood > 0) { this.currentIndexFood -= this.itemsPerPage; this.updateDisplayedProducts(); } }
  nextFood(): void { if (this.currentIndexFood + this.itemsPerPage < this.filteredFood.length) { this.currentIndexFood += this.itemsPerPage; this.updateDisplayedProducts(); } }

  prevMedicine(): void { if (this.currentIndexMedicine > 0) { this.currentIndexMedicine -= this.itemsPerPage; this.updateDisplayedProducts(); } }
  nextMedicine(): void { if (this.currentIndexMedicine + this.itemsPerPage < this.filteredMedicine.length) { this.currentIndexMedicine += this.itemsPerPage; this.updateDisplayedProducts(); } }

  prevHygiene(): void { if (this.currentIndexHygiene > 0) { this.currentIndexHygiene -= this.itemsPerPage; this.updateDisplayedProducts(); } }
  nextHygiene(): void { if (this.currentIndexHygiene + this.itemsPerPage < this.filteredHygiene.length) { this.currentIndexHygiene += this.itemsPerPage; this.updateDisplayedProducts(); } }

  prevAccessories(): void { if (this.currentIndexAccessories > 0) { this.currentIndexAccessories -= this.itemsPerPage; this.updateDisplayedProducts(); } }
  nextAccessories(): void { if (this.currentIndexAccessories + this.itemsPerPage < this.filteredAccessories.length) { this.currentIndexAccessories += this.itemsPerPage; this.updateDisplayedProducts(); } }

  prevClothing(): void { if (this.currentIndexClothing > 0) { this.currentIndexClothing -= this.itemsPerPage; this.updateDisplayedProducts(); } }
  nextClothing(): void { if (this.currentIndexClothing + this.itemsPerPage < this.filteredClothing.length) { this.currentIndexClothing += this.itemsPerPage; this.updateDisplayedProducts(); } }

  prevSupplies(): void { if (this.currentIndexSupplies > 0) { this.currentIndexSupplies -= this.itemsPerPage; this.updateDisplayedProducts(); } }
  nextSupplies(): void { if (this.currentIndexSupplies + this.itemsPerPage < this.filteredSupplies.length) { this.currentIndexSupplies += this.itemsPerPage; this.updateDisplayedProducts(); } }
}
