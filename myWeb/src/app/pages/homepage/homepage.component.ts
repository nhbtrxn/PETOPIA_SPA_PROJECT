import { Component, OnInit } from '@angular/core';
import { PetProductListComponent } from '../../product-service-pages/pet-product-list/pet-product-list.component';
import { ProductService } from '../../services/products.service';
import { forkJoin } from 'rxjs';
import { CouponComponent } from '../../coupon/coupon.component';
import { FeedbackComponent } from '../../feedback/feedback.component';
@Component({
  selector: 'app-homepage',
  standalone: true, 
  imports: [ PetProductListComponent,CouponComponent,FeedbackComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  ProductsDog: any[] = []; 
  ProductsCat: any[] = []; 
  discountedProducts: any[] = []; 
  itemsPerPage = 5;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
   
    forkJoin({
      products: this.productService.getProducts(), 
      discountedProducts: this.productService.getProductsWithDiscount()
    }).subscribe({
      next: ({ products, discountedProducts }) => {
        this.ProductsDog = products.filter(p => p.product_id.startsWith('c_'));
        this.ProductsCat = products.filter(p => p.product_id.startsWith('m_'));
        this.discountedProducts = discountedProducts;
      },
      error: (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
        this.errorMessage = 'Lỗi khi tải sản phẩm. Vui lòng thử lại sau!';
      }
    });
  }

  changePage(category: 'Dog' | 'Cat' | 'discount', next: boolean): void {
    let productList: any[] = [];

    if (category === 'Dog') {
      productList = this.ProductsDog;
    } else if (category === 'Cat') {
      productList = this.ProductsCat;
    } else if (category === 'discount') {
      productList = this.discountedProducts;
    }

    let currentIndex = productList.findIndex((p) => p === productList[0]);
    let newIndex = currentIndex + (next ? this.itemsPerPage : -this.itemsPerPage);

    if (newIndex >= 0 && newIndex < productList.length) {
      if (category === 'Dog') {
        this.ProductsDog = productList.slice(newIndex, newIndex + this.itemsPerPage);
      } else if (category === 'Cat') {
        this.ProductsCat = productList.slice(newIndex, newIndex + this.itemsPerPage);
      } else if (category === 'discount') {
        this.discountedProducts = productList.slice(newIndex, newIndex + this.itemsPerPage);
      }
    }
  }
}
