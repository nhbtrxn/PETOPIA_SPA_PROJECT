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
  allServices: any[] = [];
  filteredServicesHotel: any[] = [];
  filteredServicesSpa: any[] = [];

  displayedAllServices: any[] = [];
  displayedFilteredHotel: any[] = [];
  displayedFilteredSpa: any[] = [];

  currentIndexAll = 0;
  currentIndexHotel = 0;
  currentIndexSpa = 0;
  itemsPerPage = 4;
  errorMessage: string | null = null;
  errorMessageSpa: string | null = null;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe(
      (data) => {
        console.log('Dữ liệu API trả về:', data);
        this.allServices = Array.isArray(data) ? data : []; 
        this.filteredServicesHotel = this.allServices.filter(
          (service) => service.category?.trim() === 'Dịch vụ khách sạn thú cưng'
        );
        
        this.filteredServicesSpa = this.allServices.filter(
          (service) => service.category?.trim() === 'Dịch vụ spa'
        );
        

        this.errorMessage = this.allServices.length === 0 ? 'Không có dịch vụ nào hiển thị!' : null;
        this.updateDisplayedServices();
      },
      (error) => {
        console.error('Lỗi khi gọi API:', error);
        this.errorMessage = 'Lỗi khi tải dịch vụ. Vui lòng thử lại sau!';
        this.errorMessageSpa = 'Lỗi khi tải dịch vụ spa. Vui lòng thử lại sau!';
      }
    );
  }

  updateDisplayedServices(): void {
    console.log('Cập nhật danh sách dịch vụ...');
    this.displayedAllServices = this.allServices.slice(this.currentIndexAll, this.currentIndexAll + this.itemsPerPage);
    this.displayedFilteredHotel = this.filteredServicesHotel.slice(this.currentIndexHotel, this.currentIndexHotel + this.itemsPerPage);
    this.displayedFilteredSpa = this.filteredServicesSpa.slice(this.currentIndexSpa, this.currentIndexSpa + this.itemsPerPage);
  }

  nextAll(): void {
    if (this.currentIndexAll + this.itemsPerPage < this.allServices.length) {
      this.currentIndexAll += this.itemsPerPage;
      this.updateDisplayedServices();
    }
  }

  prevAll(): void {
    if (this.currentIndexAll > 0) {
      this.currentIndexAll -= this.itemsPerPage;
      this.updateDisplayedServices();
    }
  }

  nextHotel(): void {
    if (this.currentIndexHotel + this.itemsPerPage < this.filteredServicesHotel.length) {
      this.currentIndexHotel += this.itemsPerPage;
      this.updateDisplayedServices();
    }
  }

  prevHotel(): void {
    if (this.currentIndexHotel > 0) {
      this.currentIndexHotel -= this.itemsPerPage;
      this.updateDisplayedServices();
    }
  }

  nextSpa(): void {
    if (this.currentIndexSpa + this.itemsPerPage < this.filteredServicesSpa.length) {
      this.currentIndexSpa += this.itemsPerPage;
      this.updateDisplayedServices();
    }
  }

  prevSpa(): void {
    if (this.currentIndexSpa > 0) {
      this.currentIndexSpa -= this.itemsPerPage;
      this.updateDisplayedServices();
    }
  }
}
