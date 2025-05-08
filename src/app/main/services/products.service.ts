import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private jsonUrl = '/products.json';
  menuOpen: boolean = false;
  isFiltered: boolean = false;
  firstTime: boolean = true;
  category = 'alle Produkte';

  productsSignal = signal<{ massStandard: any[], products: any[] } | null>(null);
  selectedCategory = signal<{ mainCategory: string; subCategory?: string } | null>(null);
  allProducts = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);

  constructor(private http: HttpClient) {
    this.loadProducts()
  }

  loadProducts() {
      this.firstTime = false;
      this.http.get<{ massStandard: any[], products: any[] }>(this.jsonUrl).subscribe({
        next: (data) => {
          this.productsSignal.set(data);

          const updatedProducts = data.products.map(product => ({
            ...product,
            mass: this.findMass(product, data.massStandard)
          }));

          this.allProducts.set(updatedProducts);
          this.filteredProducts.set(updatedProducts);
        },
        error: (err) => console.error('Fehler beim Laden der Produkte:', err)
      });
    
  }

  findMass(product: Product, massStandard: any) {
    const filteredMass = massStandard.find((obj: any) => obj.hasOwnProperty(product.mass));
    return filteredMass ? filteredMass[product.mass] : product.mass;
  }

  filterProducts(filter: { mainCategory: string; subCategory?: string }) {
    if (filter.mainCategory === 'allProducts') {
      this.filteredProducts.set([...this.allProducts()]); // .set() statt direkter Zuweisung
      this.category = 'alle Produkte';
      this.isFiltered = false;
    } else {
      this.filterToCategorys(filter.mainCategory, filter.subCategory);
    }
  }

  filterToCategorys(mainCategory: string, subCategory?: string) {
    const allProducts = this.allProducts(); // Zugriff auf Signal-Inhalt per ()-Call

    if (!subCategory) {
      this.filteredProducts.set(
        allProducts.filter(product => product.mainCategory.includes(mainCategory))
      );
      this.category = mainCategory;
    } else {
      this.filteredProducts.set(
        allProducts.filter(product =>
          product.mainCategory.includes(mainCategory) &&
          product.subCategories.includes(subCategory)
        )
      );
      this.category = `${mainCategory} (${subCategory})`;
    }

    this.isFiltered = true;
  }

}
