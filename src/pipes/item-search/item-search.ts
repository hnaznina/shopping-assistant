import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ItemSearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'itemSearchPipe',
})
export class ItemSearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], itemSearchInput: string): any[] {
    if(!items) return [];
    if(!itemSearchInput) return items;
    itemSearchInput = itemSearchInput.toLowerCase();
    return items.filter( item => {
      return item.itemName.toLowerCase().includes(itemSearchInput); // only filter country name
    });
  }
}
