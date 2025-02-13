import { Component, ElementRef, HostListener, ViewChild, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [ClickOutsideDirective],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
  @Input() index: number = 0;
  @Input() currentProduct: Product = new Product();

  showDetailCard = false;

  openDetailCard() {
    this.showDetailCard = true;
    console.log("detailcard",this.showDetailCard)
  }

  closeDetailCard() {
    this.showDetailCard = false;
    console.log("detailcard",this.showDetailCard)
  }

}
