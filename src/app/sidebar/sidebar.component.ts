import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { ProductsService } from '../main/services/products.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  currentLevel: number = 0;
  selectedCategory: any = null;
  selectedSubCategory: any = null;
  currentCategory: string = 'Kategorien';
  productService = inject(ProductsService)

  categories = [
    {
      name: 'Kerzen',
      subcategories: [
        {
          name: 'Standkerzen',
          subcategories: [
            { name: 'Figuren'},
            { name: 'Tiere'},
            { name: 'Blumen'},
            { name: 'Schlichte Schönheiten'}
          ],
        },
        {
          name: 'Becherkerzen',
          subcategories: [
            { name: 'Dessertbecher'},
            { name: 'Gefüllte Behältnisse'}
          ],
        },
        {
          name: 'Personalisierungen',
          subcategories: [],
        },
      ],
    },
    {
      name: 'Epoxidharz',
      subcategories: [],
    },
    {
      name: 'Keramik',
      subcategories: [
        { name: 'Teelichthalter/ Döschen'}
      ],
    },
    {
      name: 'Saison',
      subcategories: [
        { name: 'Valentinstag' },
        { name: 'Ostern' },
        { name: 'Herbst/Halloween' },
        { name: 'Winter/Weihnachten' },
      ],
    },
  ];

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.currentCategory = category.name;
    this.currentLevel = 1;
  }

  selectSubCategory(sub: any) {
    console.log('Geklickte Unterkategorie:', sub);
    console.log('Hat es subcategories?', sub.subcategories);
    
    if (sub.subcategories) {
      this.selectedSubCategory = sub?.subcategories ? sub : null;
      this.currentLevel = this.selectedSubCategory ? 2 : 1;
      this.currentCategory = sub.name;
    } else {
      console.warn('Keine Unterkategorien gefunden!');
      this.closeSidebar();
    }
  }
  
  

  selectSubSubCategory(subSub: any) {
    console.log('Ausgewählte Unter-Unterkategorie:', subSub);
    this.currentCategory = subSub.name;
    this.closeSidebar();
    // Hier könntest du z. B. ein Event auslösen, um die Produkte zu filtern
  }

  goBack() {
    if (this.currentLevel === 2) {
      this.currentCategory = this.selectedCategory.name;
      this.currentLevel = 1;
      this.selectedSubCategory = null;
    } else if (this.currentLevel === 1) {
      this.currentCategory = 'Kategorien';
      this.currentLevel = 0;
      this.selectedCategory = null;
    }
  }

  closeSidebar() {
    this.productService.menuOpen = false;
  }
}
