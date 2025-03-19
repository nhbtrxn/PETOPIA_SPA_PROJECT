import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/products.service';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  imports: [CommonModule]
})
export class ProductDetailComponent implements OnInit {
  product: any;
  activeSlide = 0; // Slide hiện tại
  visibleThumbnails: any[] = []; // Danh sách ảnh hiển thị
  maxVisibleThumbnails = 3; // Số lượng ảnh hiển thị cùng lúc
  showDescription = false;
  selectedSize: any = null; // Kích thước được chọn
  selectedPrice: number = 0; // Giá hiển thị
  quantity: number = 1; // Giá trị mặc định

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('product_id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.product = data[0]; // Nếu API trả về mảng
          } else {
            this.product = data; // Nếu API trả về một object
          }
          this.updateVisibleThumbnails();
          if (this.product.attributes?.length) {
            this.selectSize(this.product.attributes[0]); // Chọn size đầu tiên mặc định
          }
        },
        error: (err) => {
          console.error('Lỗi khi lấy dữ liệu:', err);
        }
      });
    }
  }

  goToSlide(index: number) {
    this.activeSlide = index;
    this.updateVisibleThumbnails();
  }

  prevThumbnail() {
    if (this.product && this.product.image && this.activeSlide > 0) {
      this.activeSlide--;
      this.updateVisibleThumbnails();
    }
  }

  nextThumbnail() {
    if (this.product && this.product.image && this.activeSlide < this.product.image.length - 1) {
      this.activeSlide++;
      this.updateVisibleThumbnails();
    }
  }

  updateVisibleThumbnails() {
    if (this.product && this.product.image) {
      const start = Math.max(0, this.activeSlide - Math.floor(this.maxVisibleThumbnails / 2));
      const end = Math.min(this.product.image.length, start + this.maxVisibleThumbnails);
      this.visibleThumbnails = this.product.image.slice(start, end);
    }
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  selectSize(attr: any) {
    this.selectedSize = attr;
    this.selectedPrice = attr.price;
  }
  checkValidAttributes() {
    return Array.isArray(this.product?.attributes) && 
           this.product.attributes.some((attr: { size: any; unit: any; }) => attr.size && attr.unit);
  }
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  increaseQuantity() {
    this.quantity++;
  }
  
  onQuantityChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
  
    if (value > 0) {
      this.quantity = value;
    } else {
      this.quantity = 1; // Không cho phép số lượng nhỏ hơn 1
      input.value = '1';
    }
  }
}
