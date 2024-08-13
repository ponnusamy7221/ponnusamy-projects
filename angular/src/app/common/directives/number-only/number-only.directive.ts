import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngModel][appNumberOnly]',
  standalone: true,
})
export class NumberOnlyDirective implements AfterViewInit {
  @Input('decimal') decimal: any = 0;
  @Input('limit') limit: any = -1;
  @Input('min') min: any = -1;
  @Input('max') max: any = -1;
  @Input('negative') negative = false;
  regex = /[^\d,.]+/g;
  negativeregex = /[^\d,.-]+/g;
  value: any = '';

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.decimal === 0 && !this.negative) {
      this.regex = /[^\d]+/g;
    } else if (this.decimal === 0 && this.negative) {
      this.regex = /[^\d-]+/g;
    } else if (this.decimal > 0 && !this.negative) {
      this.regex = /[^\d,.]+/g;
    } else if (this.decimal > 0 && this.negative) {
      this.regex = /[^\d,.-]+/g;
    }
  }

  @HostListener('input', ['$event']) onInputChange($event: any) {
    // console.log($event);
    let xvalue = $event.target.value.toString();
    let rvalue = xvalue.replace(this.regex, '');

    // On Limit Set
    if (this.limit > 0) {
      rvalue.length > this.limit
        ? (rvalue = rvalue.substring(0, this.limit))
        : '';
    }

    // max number check
    if (this.max > 0) {
      let prValue = parseFloat(rvalue);
      // console.log(rvalue);
      prValue > this.max
        ? (rvalue = prValue
            .toString()
            .substring(0, prValue.toString().length - 1))
        : '';
    }

    // decimal set
    if (this.decimal > 0) {
      console.log(this.decimal);
      const arr = rvalue.split('.');
      let dvalue = '';
      if (arr.length > 1) {
        let afterDecimal = arr[1].substring(0, this.decimal);
        dvalue = dvalue + arr[0] + '.' + afterDecimal;
      }
      if (dvalue !== '') {
        rvalue = dvalue;
      }
    }

    $event.target.value = rvalue;
    this.ngModelChange.emit(rvalue);
  }
}
