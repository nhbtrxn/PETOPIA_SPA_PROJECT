import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { PetProductListComponent } from '../pet-product-list/pet-product-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pet-product',
  templateUrl: './pet-product.component.html',
  styleUrls: ['./pet-product.component.css'],
  imports: [CommonModule, RouterModule, PetProductListComponent],
})
export class PetProductComponent implements OnInit {
  @Input() petType: 'dog' | 'cat' = 'dog';
  productCategories: any = {
    all: { data: [], displayed: [], currentIndex: 0 },
    food: { data: [], displayed: [], currentIndex: 0 },
    medicine: { data: [], displayed: [], currentIndex: 0 },
    hygiene: { data: [], displayed: [], currentIndex: 0 },
    accessories: { data: [], displayed: [], currentIndex: 0 },
    clothing: { data: [], displayed: [], currentIndex: 0 },
    supplies: { data: [], displayed: [], currentIndex: 0 },
  };
  totalProducts: number = 0;
  itemsPerPage = 4;
  errorMessage: string = '';
  isDataLoaded: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().pipe(
      tap((data) => {
        if (!data || !Array.isArray(data)) {
          this.errorMessage = 'Không có sản phẩm nào hiển thị!';
          this.isDataLoaded = false;
          return;
        }

        const prefix = this.petType === 'dog' ? 'c_' : 'm_';
        this.productCategories.all.data = data.filter((product: any) => product.product_id.startsWith(prefix));

        this.productCategories.food.data = this.productCategories.all.data.filter((product: any) => product.category.trim() === 'Thức ăn');
        this.productCategories.medicine.data = this.productCategories.all.data.filter((product: any) => product.category.trim() === 'Thuốc');
        this.productCategories.hygiene.data = this.productCategories.all.data.filter((product: any) => product.category.trim() === 'Dụng cụ vệ sinh');
        this.productCategories.accessories.data = this.productCategories.all.data.filter((product: any) => product.category.trim() === 'Phụ kiện');
        this.productCategories.clothing.data = this.productCategories.all.data.filter((product: any) => product.category.trim() === 'Quần áo');
        this.productCategories.supplies.data = this.productCategories.all.data.filter((product: any) => product.category.trim() === 'Đồ dùng');
        this.productCategories.discount = { data: [], displayed: [], currentIndex: 0 };
        this.productCategories.discount.data = this.productCategories.all.data.filter((product: any) => product.discount > 0);
           // Kiểm tra số lượng sản phẩm trong mỗi danh mục
        for (let category in this.productCategories) {
          console.log(`Danh mục: ${category} - Tổng sản phẩm: ${this.productCategories[category].data.length}`);
        }
        this.errorMessage = this.productCategories.all.data.length === 0 ? 'Không có sản phẩm nào hiển thị!' : '';
        this.isDataLoaded = true;
        this.updateDisplayedProducts();
      })
    ).subscribe({
      next: () => console.log('Dữ liệu sản phẩm được tải thành công'),
      error: (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
        this.errorMessage = 'Lỗi khi tải sản phẩm. Vui lòng thử lại sau!';
        this.isDataLoaded = false;
      }
    });
  }

  updateDisplayedProducts(): void {
    if (!this.isDataLoaded) return;

    for (let category in this.productCategories) {
      let cat = this.productCategories[category];
      cat.displayed = cat.data.slice(cat.currentIndex, cat.currentIndex + this.itemsPerPage);
    }
  }

  canNavigate(category: string, next: boolean): boolean {
    let cat = this.productCategories[category];
    return this.isDataLoaded && cat.data.length > 0 && 
      ((next && cat.currentIndex + this.itemsPerPage < cat.data.length) || 
      (!next && cat.currentIndex > 0));
  }

  changePage(category: string, next: boolean): void {
    console.log(`Chuyển trang - Danh mục: ${category}, Next: ${next}`);
    let cat = this.productCategories[category];
  
    if (this.canNavigate(category, next)) {
      cat.currentIndex += next ? this.itemsPerPage : -this.itemsPerPage;
      this.updateDisplayedProducts();
      console.log(`Chỉ số mới: ${cat.currentIndex}`);
    } else {
      console.log("Không thể chuyển trang");
    }
  }
  
}
