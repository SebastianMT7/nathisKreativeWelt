import { Component,inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { FilterProductsService } from './services/filter-products.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SingleProductComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  filterService = inject(FilterProductsService);
}
