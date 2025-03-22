import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrlProducts = 'http://localhost:3000/products'; 
  private apiUrlProductAttributes = "http://localhost:3000/productattributes"
  private  apiUrlDiscounts ="http://localhost:3000/discount"
  constructor(private http: HttpClient) {}

  
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProducts);
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProducts}/${productId}`);
  }
  getProductAttributes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProductAttributes);
  }
  getDiscounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlDiscounts);
  }

  getProductsWithDiscount(): Observable<any[]> {
    return forkJoin({
      products: this.getProducts(),
      productAttributes: this.getProductAttributes(),
      discounts: this.getDiscounts()
    }).pipe(
      map(({ products, productAttributes, discounts }) => {
        return productAttributes
          .map(attr => {
            const product = products.find(p => p.product_id === attr.product_id);
            const discount = discounts.find(d => d.discount_id === attr.discount_id);
            
            return product && discount
              ? {
                  product_id: attr.product_id,
                  name: product.product_name,
                  image: product.image,
                  originalPrice: attr.price,
                  discount: discount.percentage,
                  discountPrice: attr.price - (attr.price * discount.percentage / 100),
                  discount_description: discount.description
                }
              : null;
          })
          .filter(item => item !== null); 
      })
    );
  }
  
  
  
}
