import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../main/services/products.service';
import { MainComponent } from '../main/main.component';
import { ClickOutsideDirective } from '../main/directives/click-outside.directive';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, SidebarComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  productService = inject(ProductsService)
  dropdownOpen: { [key: number]: boolean } = {};
  @Output() categorySelected = new EventEmitter<{ mainCategory: string; subCategory?: string }>();

  constructor(private router: Router) {}

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
    this.productService.selectedCategory.set({ mainCategory, subCategory });
    this.navigateToMain()
    
    this.closeDropdowns();
  }

  navigateToMain() {
    this.router.navigate(['']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  toggleSidebar() {
    this.productService.menuOpen = !this.productService.menuOpen;
  }
}
