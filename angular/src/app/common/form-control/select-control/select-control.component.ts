import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Control } from '../form-control';
import { SelectSearchPipe } from './select-search.pipe';

@Component({
  selector: 'app-select-control',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    CommonModule,
    SelectSearchPipe,
  ],
  templateUrl: './select-control.component.html',
  styleUrl: './select-control.component.scss',
})
export class SelectControlComponent extends Control implements OnInit {
  @Input() public placeholderLabel: string = '';
  @Input() public sort: boolean = true;
  @Input() public icon = '';
  @Input() public src = '';
  itemsNow = [];
  valuenum = 0;

  _key: string = '';
  @Input()
  set key(key: string) {
    this._key = key || '';
  }

  get key() {
    return this._key;
  }

  _keyname: string = '';
  @Input()
  set keyname(keyname: string) {
    this._keyname = keyname || '';
  }

  get keyname() {
    return this._keyname;
  }

  @Input()
  set items(items: any) {
    this.itemsNow = items || [];
    //console.log(items);
    if (items) {
      if (items.length > 5) {
        this.search = true;
      }
    }
  }
  get items() {
    return this.itemsNow;
  }

  searchItem = '';
  constructor(
    @Self() @Optional() public control: NgControl,
    private cdf: ChangeDetectorRef
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.setValidate(this.control);
    this.cdf.detectChanges();
  }
}
