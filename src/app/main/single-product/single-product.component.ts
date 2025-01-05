import { Component,ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {

  showDetailCard = false;
  @ViewChild('detailCard', { static: false }) detailCard!: ElementRef;


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
