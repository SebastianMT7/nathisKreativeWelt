import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private jsonUrl = '/products.json';
  menuOpen: boolean = false;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<{ massStandard: any[], products: any[] }> {
    return this.http.get<{ massStandard: any[], products: any[] }>(this.jsonUrl);
  }
}
