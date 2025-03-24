import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../main/services/products.service';
import { MainComponent } from '../main/main.component';
import { ClickOutsideDirective } from '../main/directives/click-outside.directive';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  productService = inject(ProductsService)
  dropdownOpen: { [key: number]: boolean } = {};
  @Output() categorySelected = new EventEmitter<{ mainCategory: string; subCategory?: string }>();

  openDropdown(index: number) {
    if (this.dropdownOpen[index]) {
      this.dropdownOpen[index] = false;
    } else {
      this.closeDropdowns();
      this.dropdownOpen[index] = true;
    }
  }

  closeDropdowns() {
    for (let key in this.dropdownOpen) {
      this.dropdownOpen[key] = false;
    }
  }

  filterByCategory(mainCategory: string, subCategory?: string) {
    this.categorySelected.emit({ mainCategory, subCategory }); // Korrektur: Objekt senden
    this.closeDropdowns();
  }

  toggleSidebar() {
    this.productService.menuOpen = !this.productService.menuOpen;
  }
}
