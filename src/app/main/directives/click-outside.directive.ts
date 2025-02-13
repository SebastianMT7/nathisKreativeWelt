import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';


@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();
  private initialized = false;

  constructor(private elementRef: ElementRef) {
    setTimeout(() => {
      this.initialized = true;
    }, 0);
  }

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    if (!this.initialized) {
      return;
    }
    
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
