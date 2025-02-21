import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private jsonUrl = '/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ massDessertbecher: string, products: any[] }> {
    return this.http.get<{ massDessertbecher: string, products: any[] }>(this.jsonUrl);
  }
}
