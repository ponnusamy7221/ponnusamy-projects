import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

export class ControlAccessor implements ControlValueAccessor {
  public newValue!: any;
  public changed = new Array<(value: any) => void>();
  private touched = new Array<() => void>();
  public routerInfo = new BehaviorSubject<boolean>(false);
  constructor() {}
  //   static value: any;
  get value() {
    return this.newValue;
  }

  set value(value: any) {
    if (this.newValue !== value) {
      this.newValue = value;
      this.changed.forEach((f) => f(value));
    }
  }

  getValue(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }
  setValue(newValue: boolean): void {
    this.routerInfo.next(newValue);
  }
  touch() {
    this.touched.forEach((f) => f());
  }
  writeValue(value: any) {
    // console.log('write: ' + this.value);
    this.newValue = value;
    this.setValue(true);
  }
  registerOnChange(fn: (value: any) => void) {
    // console.log(fn);
    this.changed.push(fn);
  }
  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}
