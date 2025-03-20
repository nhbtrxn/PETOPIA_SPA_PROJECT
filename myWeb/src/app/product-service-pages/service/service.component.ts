
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/services.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceListComponent } from '../service-list/service-list.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  imports: [CommonModule, RouterModule, ServiceListComponent],
})
export class ServiceComponent implements OnInit {
  serviceCategories: any = {
    all: { data: [], displayed: [], currentIndex: 0 },
    hotel: { data: [], displayed: [], currentIndex: 0 },
    spa: { data: [], displayed: [], currentIndex: 0 }
  };

  itemsPerPage = 4;
  errorMessage: string = '';
  isDataLoaded: boolean = false;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(
      (data) => {
        console.log('Dữ liệu API trả về:', data);

        if (!data || !Array.isArray(data)) {
          this.errorMessage = 'Không có dữ liệu dịch vụ!';
          this.isDataLoaded = false;
          return;
        }
        this.serviceCategories.all.data = data;
        this.serviceCategories.hotel.data = data.filter(
          (service) => service.category?.trim() === 'Dịch vụ khách sạn thú cưng'
        );
        this.serviceCategories.spa.data = data.filter(
          (service) => service.category?.trim() === 'Dịch vụ spa'
        );

        this.isDataLoaded = true;
        this.updateDisplayedServices();
      },
      (error) => {
        console.error(' Lỗi khi gọi API:', error);
        this.errorMessage = 'Lỗi khi tải dịch vụ. Vui lòng thử lại sau!';
        this.isDataLoaded = false;
      }
    );
  }

  updateDisplayedServices(): void {
    console.log('Cập nhật danh sách dịch vụ...');
    if (!this.isDataLoaded) return;

    for (let category in this.serviceCategories) {
      let cat = this.serviceCategories[category];
      cat.displayed = cat.data.slice(cat.currentIndex, cat.currentIndex + this.itemsPerPage);
    }
  }

  canNavigate(category: string, next: boolean): boolean {
    let cat = this.serviceCategories[category];
    return this.isDataLoaded && cat.data.length > 0 && 
      ((next && cat.currentIndex + this.itemsPerPage < cat.data.length) || 
      (!next && cat.currentIndex > 0));
  }

  changePage(category: string, next: boolean): void {
    let cat = this.serviceCategories[category];

    if (this.canNavigate(category, next)) {
      cat.currentIndex += next ? this.itemsPerPage : -this.itemsPerPage;
      this.updateDisplayedServices();
    }
  }
}
