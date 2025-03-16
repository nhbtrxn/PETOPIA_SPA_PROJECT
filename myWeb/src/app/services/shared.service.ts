import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private valueSource = new BehaviorSubject<string>(''); // Giá trị mặc định
  currentValue = this.valueSource.asObservable();

  setValue(value: string) {
    this.valueSource.next(value); // Gán giá trị mới
  }
  constructor() { }
  
}
