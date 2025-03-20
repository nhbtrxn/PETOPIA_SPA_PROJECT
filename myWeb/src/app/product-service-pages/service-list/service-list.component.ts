// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// @Component({
//   selector: 'app-service-list',
//   templateUrl: './service-list.component.html',
//   styleUrls: ['./service-list.component.css'],
//   imports:[CommonModule,RouterModule]
// })
// export class ServiceListComponent {
//   @Input() title: string = ''; 
//   @Input() services: any[] = [];
//   @Input() errorMessage!: string | null;
//   @Input() currentIndex: number = 0; 
//   @Input() itemsPerPage: number = 4;

//   @Input() prevFunction!: () => void;
//   @Input() nextFunction!: () => void;
// }

import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  imports:[CommonModule,RouterModule]

})
export class ServiceListComponent {
  @Input() services: any[] = [];
  @Input() title: string = '';
  @Input() errorMessage: string = '';
  @Input() currentIndex: number = 0;
  @Input() itemsPerPage: number = 0;
  @Input() prevFunction!: () => void;
  @Input() nextFunction!: () => void;

  constructor() {}

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
}
