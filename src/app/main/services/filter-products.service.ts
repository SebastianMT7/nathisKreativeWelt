import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class FilterProductsService {

  mainCategory = ['Kerzen', 'Epoxidharz', 'Keramik', 'Saison'];
  subCategory = [];
  filteredProducts = [];

  private jsonUrl = '/products.json';

  constructor() { }


  //   getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.jsonUrl);
  // }

  showProducts(categorie: string) {

  }

  showSubProducts(mainCat: string, subCat: string | undefined) {

  }
}
