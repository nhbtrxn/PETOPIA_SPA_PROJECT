import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private valueSource = new BehaviorSubject<string>('');
  currentValue = this.valueSource.asObservable();

  setValue(value: string) {
    this.valueSource.next(value); 
  }
  constructor() { }
  
}
