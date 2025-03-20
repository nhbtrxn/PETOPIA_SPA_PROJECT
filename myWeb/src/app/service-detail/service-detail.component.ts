import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css'],
  imports: [CommonModule]
})
export class ServiceDetailComponent implements OnInit { 
  service: any;
  activeSlide = 0; 
  visibleThumbnails: any[] = []; 
  maxVisibleThumbnails = 3; 
  showDescription = false;
  showPricing = false; 
  selectedSize: any = null; 
  selectedPrice: number = 0; 

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    const serviceId = this.route.snapshot.paramMap.get('service_id'); 
    if (serviceId) {
      this.serviceService.getServiceById(serviceId).subscribe({
        next: (data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.service = data[0]; 
          } else {
            this.service = data; 
          }
          this.updateVisibleThumbnails();
          if (this.service.attributes?.length) {
            this.selectSize(this.service.attributes[0]); 
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
    if (this.service && this.service.image && this.activeSlide > 0) {
      this.activeSlide--;
      this.updateVisibleThumbnails();
    }
  }

  nextThumbnail() {
    if (this.service && this.service.image && this.activeSlide < this.service.image.length - 1) {
      this.activeSlide++;
      this.updateVisibleThumbnails();
    }
  }

  updateVisibleThumbnails() {
    if (this.service && this.service.image) {
      const start = Math.max(0, this.activeSlide - Math.floor(this.maxVisibleThumbnails / 2));
      const end = Math.min(this.service.image.length, start + this.maxVisibleThumbnails);
      this.visibleThumbnails = this.service.image.slice(start, end);
    }
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  togglePricing() {
    this.showPricing = !this.showPricing;
  }

  selectSize(attr: any) {
    this.selectedSize = attr;
    this.selectedPrice = attr.min_price;
  }
}
