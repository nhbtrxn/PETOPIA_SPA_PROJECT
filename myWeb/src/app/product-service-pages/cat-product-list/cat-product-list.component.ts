import { Component,Input,SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cat-product-list',
  imports:[CommonModule,RouterModule],
  templateUrl: './catproduct-list.component.html',
  styleUrl: './cat-product-list.component.css'
})
export class CatProductListComponent {
  @Input() title: string = ''; 
  @Input() products: any[] = []; 
  @Input() errorMessage!: string | null;
  @Input() currentIndex: number = 0;
  @Input() itemsPerPage: number = 4; 

  @Input() prevFunction!: () => void;
  @Input() nextFunction!: () => void;
  ngOnChanges(changes: SimpleChanges) {
    console.log('Dữ liệu đầu vào:', this.products);
  }

}
