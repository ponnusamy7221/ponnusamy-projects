import { Highlightable, ListKeyManagerOption } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-auto-list-item',
  standalone: true,
  imports: [],
  templateUrl: './auto-list-item.component.html',
  styleUrl: './auto-list-item.component.scss',
})
export class AutoListItemComponent
  implements Highlightable, ListKeyManagerOption
{
  @Input() item: any;
  @Input() disabled = false;
  private _isActive = false;
  @ViewChild('viewitem') viewitem!: ElementRef;
  @HostBinding('class.active') get isActive() {
    return this._isActive;
  }

  setActiveStyles() {
    this._isActive = true;
    (this.viewitem.nativeElement as HTMLInputElement).scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    // this.viewitem.nativeElement.focus();
    // console.log(this._isActive);
  }

  setInactiveStyles() {
    this._isActive = false;
  }

  getLabel() {
    console.log(this.item);
    console.log(this.item.name);
    return this.item.name;
  }
}
