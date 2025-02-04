import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // mainCategory = ['Kerzen', 'Epoxidharz', 'Keramik', 'Saison'];
  // subCategory = [];
  // filteredProducts = [];

  private jsonUrl = '/productsTest.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.jsonUrl);
  }
}
