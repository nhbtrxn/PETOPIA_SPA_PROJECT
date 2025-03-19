import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrlProducts = 'http://localhost:3000/products'; 

  constructor(private http: HttpClient) {}

  
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProducts);
  }

  // Lấy chi tiết sản phẩm theo ID
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProducts}/${productId}`);
  }
}
