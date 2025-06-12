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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.initialized) return;

    const clickedElement = event.target as HTMLElement;

    // Prüfe, ob innerhalb des Elements geklickt wurde
    if (!this.elementRef.nativeElement.contains(clickedElement)) {
      this.clickOutside.emit();
    }
    
  }
}
