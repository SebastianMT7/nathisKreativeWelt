import { Component, inject, OnInit,signal,computed } from '@angular/core';
import { SingleProductComponent } from './single-product/single-product.component';
import { ProductsService } from './services/products.service';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SingleProductComponent, SlideshowComponent, SortByNamePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit {
  productService = inject(ProductsService)
  //visibleCount = signal(20); // Start mit 20 Produkten

  constructor() { }

  ngOnInit() {
    const data = this.productService.productsSignal();

    if (data) {
      this.productService.allProducts.set(
        data.products.map(product => ({
          ...product,
          mass: this.productService.findMass(product, data.massStandard)
        }))
      );

      // Beim Init: zuletzt gewählten Filter anwenden, wenn vorhanden
      const lastFilter = this.productService.selectedCategory();
      if (lastFilter) {
        this.productService.filterProducts(lastFilter); // oder filterProducts()
      } else {
        this.productService.filteredProducts.set(this.productService.allProducts());
      }
    }
  }  

  // Produkte auf die Anzahl beschränken
  // visibleProducts = computed(() =>
  //   this.productService.filteredProducts().slice(0, this.visibleCount())
  // );

  // loadMoreProducts() {
  //   this.visibleCount.update(count => count + 20);
  // }

}
