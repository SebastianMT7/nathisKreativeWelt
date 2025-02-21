import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ProductsService } from './services/products.service';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { Product } from '../models/product';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SingleProductComponent, SlideshowComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  filterService = inject(ProductsService);
  isFiltered: boolean = false;
  category = 'alle Produkte';

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    //console.log('allprodukte:', this.allProducts);
    this.productService.getProducts().subscribe(data => {
      // this.allProducts = data;
      // this.filteredProducts = data;
      this.allProducts = data.products.map(product => ({
        ...product,
        mass: product.mass = this.findMass(product, data)
      }));
      this.filteredProducts = data.products.map(product => ({
        ...product,
        mass: product.mass = this.findMass(product, data)
      }));
    });
    //console.log('allprodukte:', this.allProducts);
  }

  findMass(product: Product, data: any) {
    if (product.mass === "massDessertbecher") {
      return data.massDessertbecher
    } else if (product.mass === "massGlühweinkerzen") {
      return data.massGlühweinkerzen
    } else {
      return product.mass
    }
  }

  filterProducts(filter: { mainCategory: string; subCategory?: string }) {
    //console.log('mainCategory:', filter.mainCategory);
    if (filter.mainCategory === 'allProducts') {
      this.filteredProducts = [...this.allProducts];
      this.category = 'alle Produkte';
      //console.log('MainProdukte:', this.filteredProducts);
      this.isFiltered = false;
    } else {
      this.filterToCategorys((filter.mainCategory), (filter.subCategory))
    }
  }

  filterToCategorys(mainCategory: string, subCategory?: string) {
    if (!subCategory) {
      this.filteredProducts = this.allProducts.filter(product => product.mainCategory.includes(mainCategory));
      this.category = (mainCategory);
      //console.log('MainProdukte:', this.filteredProducts);
    } else {
      this.filteredProducts = this.allProducts.filter(product =>
        product.mainCategory.includes(mainCategory) && product.subCategories.includes(subCategory)
      );
      this.category = `${mainCategory} (${subCategory})`;
      //console.log('Sub:', subCategory);
      //console.log('SubProdukte:', this.filteredProducts);
    }
    this.isFiltered = true;
  }

}
