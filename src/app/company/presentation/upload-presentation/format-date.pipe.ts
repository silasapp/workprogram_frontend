import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const date = new Date(value as string);
    return date.toString();
  }
}
