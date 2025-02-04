import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ProductsService } from './services/products.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SingleProductComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  filterService = inject(ProductsService);

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.allProducts = data;
      this.filteredProducts = data;
    });
    // console.log('gef.produkte:',this.filteredProducts);    
  }

  filterProducts(filter: { mainCategory: string; subCategory?: string }) {
    console.log('mainCategory:', filter.mainCategory);
    if (filter.mainCategory === 'allProducts') {
      this.filteredProducts = [...this.allProducts];
      console.log('MainProdukte:', this.filteredProducts);
    } else {

      if (!filter.subCategory) {
        this.filteredProducts = this.allProducts.filter(product => product.mainCategory.includes(filter.mainCategory));
        console.log('MainProdukte:', this.filteredProducts);
      } else {
        this.filteredProducts = this.allProducts.filter(product =>
          product.mainCategory.includes(filter.mainCategory) && product.subCategories.includes(filter.subCategory)
        );
        console.log('Sub:', filter.subCategory);
        console.log('SubProdukte:', this.filteredProducts);
      }
    }
  }
}
