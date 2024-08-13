import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { ControlAccessor } from './control-accessor';
import { NgControl, Validators } from '@angular/forms';

@Directive()
export class Control extends ControlAccessor {
  xControl: any = NgControl;

  @Input() public label = '';
  @Input() public name = '';
  @Input() public email = false;
  @Input() public placeholder = '';
  @Input() public uppercase = false;
  @Input() public lowercase = false;
  @Input() public search = false;
  @Input() public noMargin = false;
  @Input() public limiter = 0;
  @Input() tabindex = 0;

  @Input() public decimal = 0;
  @Input() public max = -1;
  @Input() public min = -1;
  @Input() public minlength = -1;
  @Input() public maxlength = -1;

  _labelAnimation: boolean = false;
  @Input()
  set labelAnimation(required: boolean) {
    this._labelAnimation = required || false;
  }

  get labelAnimation() {
    return this._labelAnimation;
  }

  _required: boolean = false;
  @Input()
  set required(required: boolean) {
    this._required = required || false;
  }

  get required() {
    return this._required;
  }

  _errorTrue: boolean = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this._errorTrue = errorTrue || false;
  }

  get errorTrue() {
    return this._errorTrue;
  }

  _disabled: boolean = false;
  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled || false;
  }

  get disabled() {
    return this._disabled;
  }

  _valueType = '';

  @Input()
  set valueType(valueType: string) {
    this._valueType = valueType || '';
    this.setValidate(this.xControl);
  }
  get valueType() {
    return this._valueType;
  }

  @Output('clear') clear: EventEmitter<any> = new EventEmitter();

  onClear() {
    this.value = '';
    this.clear.emit();
  }

  @Output('blur') blur: EventEmitter<any> = new EventEmitter();

  doBlur() {
    this.blur.next(this.value);
  }

  @Output('focus') focus: EventEmitter<any> = new EventEmitter();

  doFocus() {
    this.focus.next(this.value);
  }

  @Output('change') change: EventEmitter<any> = new EventEmitter();

  doChange(event: any) {
    // console.log(event);
    this.change.next(event);
  }

  @Output('onEnter') onEnter: EventEmitter<any> = new EventEmitter();

  @Output('onTab') onTab: EventEmitter<any> = new EventEmitter();
  checkEnter(event: any) {
    if (event.key === 'Enter') {
      this.onEnter.next(this.value);
    }
    if (event.key === 'Tab') {
      this.onTab.next(this.value);
    }
  }

  @ViewChild('forminput', { static: false }) forminput!: ElementRef;
  setFocus() {
    this.forminput.nativeElement.focus();
    this.forminput.nativeElement.select();
  }

  setValidate(control: NgControl) {
    let validation = [];
    if (this.required) {
      validation.push(Validators.required);
    }
    if (this.email) {
      validation.push(Validators.email);
    }
    if (this._valueType === 'int' && this.decimal === 0 && this.required) {
      let pattern = /^[1-9][0-9]*$/;
      validation.push(Validators.pattern(pattern));
    }
    if (this._valueType === 'int' && this.decimal > 0 && this.required) {
      let newRegex = new RegExp(
        '^\\s*(?=.*[1-9])\\d*(?:\\.\\d{1,' + this.decimal + '})?\\s*$'
      );
      validation.push(Validators.pattern(newRegex));
    }
    if (this.min > -1) {
      validation.push(Validators.min(this.min));
    }
    if (this.max > -1) {
      validation.push(Validators.max(this.max));
    }
    if (this.minlength > -1) {
      validation.push(Validators.minLength(this.minlength));
    }
    if (this.maxlength > -1) {
      validation.push(Validators.maxLength(this.maxlength));
    }

    control?.control?.setValidators(validation);
    control?.control?.updateValueAndValidity();
    // console.log(control);
  }
}
