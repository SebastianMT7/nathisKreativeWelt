import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private jsonUrl = '/productsTest.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ massDessertbecher: string, products: any[] }> {
    return this.http.get<{ massDessertbecher: string, products: any[] }>(this.jsonUrl);
  }
}
