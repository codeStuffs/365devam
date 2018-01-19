import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the VersesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'verses',
})
export class VersesPipe implements PipeTransform {
  /**
   * Takes a value and makes it bold.
   */
  transform(value: string, ...args) {
    let re = new RegExp('[0-9]{1,}\\-[0-9]{1,}|[0-9]{1,}\\:[0-9]{1,}|[0-9]{1,}', 'g');
    return value.replace(re, '<b>$&</b>');//'$2, $1'
  
  }
}
