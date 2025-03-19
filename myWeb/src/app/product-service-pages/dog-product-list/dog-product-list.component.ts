import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dog-product-list',
  imports:[CommonModule,RouterModule],
  templateUrl: './dog-product-list.component.html',
  styleUrl: './dog-product-list.component.css'
})
export class DogProductListComponent {
  @Input() title: string = ''; 
  @Input() products: any[] = []; 
  @Input() errorMessage!: string | null;
  @Input() currentIndex: number = 0;
  @Input() itemsPerPage: number = 4; 

  @Input() prevFunction!: () => void;
  @Input() nextFunction!: () => void;
}
