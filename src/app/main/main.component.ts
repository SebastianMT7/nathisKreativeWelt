import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ProductsService } from './services/products.service';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { Product } from '../models/product';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SingleProductComponent, SlideshowComponent, SidebarComponent, SortByNamePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  isFiltered: boolean = false;
  category = 'alle Produkte';
  prodService = inject(ProductsService)

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    //console.log('allprodukte:', this.allProducts);
    this.productService.getProducts().subscribe(data => {
      // this.allProducts = data;
      // this.filteredProducts = data;
      this.allProducts = data.products.map(product => ({
        ...product,
        mass: product.mass = this.findMass(product, data.massStandard)
      }));
      this.filteredProducts = data.products.map(product => ({
        ...product,
        mass: product.mass = this.findMass(product, data.massStandard)
      }));
    });
    //console.log('allprodukte:', this.allProducts);
  }

  findMass(product: Product, massStandard: any) {
   const filteredMass = massStandard.find((obj:any) => obj.hasOwnProperty(product.mass));
   return filteredMass ? filteredMass[product.mass] : product.mass;
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
