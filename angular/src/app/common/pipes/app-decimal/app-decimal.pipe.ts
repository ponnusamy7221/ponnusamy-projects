import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDecimal',
  standalone: true,
})
export class AppDecimalPipe implements PipeTransform {
  constructor(private decimal: DecimalPipe) {}

  transform(value: any, decimal: any): any {
    console.log(value);
    if (!value) {
      return 0;
    }
    let stringValue = value.toString();
    let floatValue = parseFloat(stringValue);
    const xValue = this.decimal.transform(floatValue, decimal);
    return xValue;
  }
}
