import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pet-product-list',
  imports:[CommonModule,RouterModule],
  templateUrl: './pet-product-list.component.html',
  styleUrl: './pet-product-list.component.css'
})
export class PetProductListComponent {
  @Input() title: string = ''; 
  @Input() products: any[] = []; 
  @Input() errorMessage!: string | null;
  @Input() currentIndex: number = 0;
  @Input() itemsPerPage: number = 4; 

  @Input() prevFunction!: () => void;
  @Input() nextFunction!: () => void;
}
