import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  imports:[CommonModule,RouterModule]
})
export class ServiceListComponent {
  @Input() title: string = ''; 
  @Input() services: any[] = [];
  @Input() errorMessage!: string | null;
  @Input() currentIndex: number = 0; 
  @Input() itemsPerPage: number = 4;

  @Input() prevFunction!: () => void;
  @Input() nextFunction!: () => void;
}
