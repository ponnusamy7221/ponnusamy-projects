import { ListKeyManager, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, merge } from 'rxjs';
import { AutoCompleteService } from './auto-complete.service';
import { AutoListItemComponent } from './auto-list-item/auto-list-item.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ENTER, UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { MatRipple } from '@angular/material/core';
import { FullSpinnerComponent } from '../../full-spinner/full-spinner.component';

@Component({
  selector: 'app-auto-complete',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    AutoListItemComponent,
    MatListModule,
    MatRipple,
    FullSpinnerComponent,
  ],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
})
export class AutoCompleteComponent implements OnInit {
  keyboardEventsManager!: ListKeyManager<any>;
  @ViewChild('searchbox', { static: true }) searchbox!: any;
  searchText = '';
  btnClickedNow = false;
  @Input() public name: string = '';
  @Input() public keyname: string = '';
  @Input() public keyId: string = '';
  @Input() public ledgerType = false;
  @Input() public className = '';
  @Input() public placeholder = '';
  @Input() public isNoAdd = false;

  isLoadingNow = false;
  @Input()
  set isLoading(isLoading: boolean) {
    this.isLoadingNow = isLoading || false;
  }
  get isLoading() {
    return this.isLoadingNow;
  }
  @Input()
  set displayText(displayText: string) {
    this.searchText = displayText || '';
  }
  get displayText() {
    return this.searchText;
  }

  _label: string = '';

  @Input()
  set label(label: string) {
    this._label = label || '';
  }
  get label() {
    return this._label;
  }

  @Input()
  set btnClicked(btnClicked: boolean) {
    this.btnClickedNow = btnClicked || false;
  }
  get btnClicked() {
    return this.btnClickedNow;
  }

  _errorTrue: boolean = false;
  @Input()
  set errorTrue(errorTrue: boolean) {
    this._errorTrue = errorTrue || false;
  }

  get errorTrue() {
    return this._errorTrue;
  }

  itemsNow: any[] = [];
  @Input()
  set items(items: any) {
    this.itemsNow = JSON.parse(JSON.stringify(items)) || [];
    if (this.itemsNow.length !== 0) {
      this.keyManager = new ActiveDescendantKeyManager(this.listItems)
        .withWrap()
        .withTypeAhead();
    }
    // this.doOpenDropDown();
  }
  get items() {
    return this.itemsNow;
  }

  closeOverlay: boolean = false;

  @ViewChildren(AutoListItemComponent)
  listItems!: QueryList<AutoListItemComponent>;

  @ViewChild('autocompleteoption') autocompleteoption!: TemplateRef<any>;
  @Output('onSearch') onSearch: EventEmitter<any> = new EventEmitter();
  @Output('onInput') onInput: EventEmitter<any> = new EventEmitter();
  @Output('onClear') onClear: EventEmitter<any> = new EventEmitter();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  @Output('onBlur') onBlur: EventEmitter<any> = new EventEmitter();
  @Output('onSlide') onSlide: EventEmitter<any> = new EventEmitter();
  @Output('focus') focus: EventEmitter<any> = new EventEmitter();

  private keyManager!: ActiveDescendantKeyManager<AutoListItemComponent>;

  constructor(
    public autoCompleteService: AutoCompleteService,
    public vcr: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {
    // Create observables for the focus, input, touchstart, and touchend events
    const focusEvent = fromEvent(this.searchbox.nativeElement, 'focus');
    const inputEvent = fromEvent(this.searchbox.nativeElement, 'input');

    // Merge the observables into a single stream
    merge(focusEvent, inputEvent).subscribe(() => {
      console.log(focusEvent);
      if (this.autoCompleteService.isOpen) {
        this.autoCompleteService.close();
      }
      this.doOpenDropDown();
    });
  }

  ngOnInit(): void {}

  doOpenDropDown() {
    if (!this.autoCompleteService.isOpen) {
      this.autoCompleteService.openDropdown(
        this.searchbox.nativeElement,
        this.autocompleteoption,
        this.vcr
      );
    }
  }

  doSearch() {
    this.onSearch.next(this.searchText);
  }

  doClear() {
    this.onClear.emit();
    this.searchText = '';
    this.searchbox.nativeElement.focus();
  }

  doSelect(val: any) {
    console.log(val);
    this.searchText = val[this.keyname];
    this.searchbox.nativeElement.focus();
    this.autoCompleteService.close();
    this.onSelect.next(val);
  }
  doChange(event: any) {
    if (
      event.keyCode !== UP_ARROW &&
      event.keyCode !== DOWN_ARROW &&
      event.keyCode !== ENTER
    ) {
      // console.log(event.keyCode);
      this.onInput.next(this.searchText);
    }

    // debugger;
  }

  doBlur() {
    if (this.searchText !== '') {
      this.onBlur.next(this.searchText);
    }
    if (this.searchText === '') {
      this.onClear.emit();
      this.searchText = '';
    }
  }

  // onKeyUp(event: any) {
  //   console.log(event);
  //   if (event.keyCode === ENTER) {
  //     this.doSelect(this.keyManager.activeItem?.item);
  //   } else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
  //     this.keyManager?.onKeydown(event);
  //   }
  // }

  onKeyUp(event: any) {
    console.log(this.itemsNow);
    console.log(event);
    if (this.itemsNow.length === 0) {
      event.preventDefault();
      return;
    }
    if (event.keyCode === ENTER) {
      this.doSelect(this.keyManager.activeItem?.item);
    } else if (event.keyCode === UP_ARROW) {
      this.keyManager.setPreviousItemActive();
    } else if (event.keyCode === DOWN_ARROW) {
      this.keyManager.setNextItemActive();
    }
  }

  slideOpen() {
    this.onSlide.emit(true);
  }

  onFocus(event: any) {
    this.focus.emit(event);
  }
}
