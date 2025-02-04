import { Component,ElementRef, HostListener, ViewChild, Input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {
  @Input() index: number = 0;
  @Input() currentProduct: Product = new Product();  
  @ViewChild('detailCard', { static: false }) detailCard!: ElementRef;

  showDetailCard = false;

  toggleDetailCard(){
    this.showDetailCard = !this.showDetailCard;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event):void {  

    // if (this.detailCard && !this.detailCard.nativeElement.contains(event.target)) {
    //   this.showDetailCard = false;
    // }
  }

}
