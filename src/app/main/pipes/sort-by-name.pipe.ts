import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByName',
  standalone: true
})
export class SortByNamePipe implements PipeTransform {
  transform(products: any[]): any[] {
    return products.slice().sort((a, b) => (a.title).localeCompare(b.title));
  }

}
