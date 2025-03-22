import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-pet-product-list',
  templateUrl: './pet-product-list.component.html',
  styleUrls: ['./pet-product-list.component.css'],
  imports: [CommonModule,RouterModule]
})
export class PetProductListComponent {
  @Input() products: any[] = [];
  @Input() title: string = '';
  @Input() errorMessage: string = '';
  @Input() currentIndex: number = 0;
  @Input() itemsPerPage: number = 0;
  @Input() prevFunction!: () => void;
  @Input() nextFunction!: () => void;

  constructor(private router: Router) {}  

  next() {
    if (this.nextFunction) {
      this.nextFunction();
    }
  }

  prev() {
    if (this.prevFunction) {
      this.prevFunction();
    }
  }

  goToProductService() {
    this.router.navigate(['/product-service']);
  }
}
