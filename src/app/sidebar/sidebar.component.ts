import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
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
  filterMainCategory: string = '';
  productService = inject(ProductsService)
  @Output() categorySelected = new EventEmitter<{ mainCategory: string; subCategory?: string }>();

  categories = [
    {
      name: 'Kerzen',
      subcategories: [
        {
          name: 'Standkerzen',
          subcategories: [
            { name: 'Figuren' },
            { name: 'Tiere' },
            { name: 'Blumen' },
            { name: 'Schlichte Schönheiten' }
          ],
        },
        {
          name: 'Becherkerzen',
          subcategories: [
            { name: 'Dessertbecher' },
            { name: 'Gefüllte Behältnisse' }
          ],
        },
        {
          name: 'Personalisierungen',
          //subcategories: [],
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
        { name: 'Teelichthalter/Döschen' }
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
    this.filterMainCategory = category.name;
    if (category.subcategories.length > 0) {
      //hier auf "category.subcategories" ändern wenn bei epoxidharz etas dazu kommt!! + HTML anpassen
      this.selectedCategory = category;
      this.currentCategory = category.name;
      this.currentLevel = 1;
    } else this.closeSidebar();
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
      this.filterMainCategory = '';
    }
  }

  closeSidebar() {
    this.filterMainCategory = '';
    this.productService.menuOpen = false;
  }

  filterByCategory(mainCategory: string, subCategory?: string) {
    console.log('mainCat:',mainCategory ,'subCat:', subCategory)
    this.categorySelected.emit({ mainCategory, subCategory }); // Korrektur: Objekt senden
    this.closeSidebar();
  }
}
