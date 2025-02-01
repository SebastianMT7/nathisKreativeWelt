import { CommonModule } from '@angular/common';
import { Component,inject} from '@angular/core';
import { FilterProductsService } from '../main/services/filter-products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   filterService = inject(FilterProductsService)

   
  dropdownOpen: { [key: number]: boolean } = {};

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
}
