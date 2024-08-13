import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Control } from '../../form-control/form-control';
import { FormsModule, NgControl } from '@angular/forms';
import { AutoCompleteComponent } from '../../templates/auto-complete/auto-complete.component';
import { NgClass } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../form-control/number-control/number-control.component';
import { SlideDialogService } from '../../templates/slide-dialog/slide-dialog.service';
import { ApiService } from '../../api-services/api.service';
import { DataService } from '../../services/data/data.service';
import { customer } from '../../api-services/app.classes';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-customer-search',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    NgClass,
    FormsModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
  ],
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss',
})
export class CustomerSearchComponent extends Control implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;

  customer = new customer();

  options = {
    hideErrorMethod: true,
    hideFullSpinner: true,
    type: '',
  };

  loadingTrue: boolean = false;

  items: any[] = [];
  @Input() public className = '';

  searchText: string = '';

  @Input()
  set displayText(displayText: string) {
    this.searchText = displayText || '';
  }
  get displayText() {
    return this.searchText;
  }

  override _disabled: boolean = false;

  @Input()
  override set disabled(disabled: boolean) {
    this._disabled = disabled || false;
  }
  override get disabled() {
    return this._disabled;
  }

  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  @Output('onSelectBlur') onSelectBlur: EventEmitter<any> = new EventEmitter();

  constructor(
    @Self() @Optional() public control: NgControl,
    public slideDialog: SlideDialogService,
    private api: ApiService,
    private data: DataService
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }

  autoClear() {}

  doSelect(event: any) {
    this.onSelect.next(event);
  }

  doSelectBlur() {
    this.onSelectBlur.next(this.searchText);
  }

  searchCustomer(event: any) {
    console.log(event);
    if (event) {
      let searchString = '';
      if (event.type === 'focus') {
        searchString = this.searchText === '' ? '' : this.searchText;
      } else if (event.type !== 'focus') {
        searchString = event;
        this.searchText = searchString;
      }

      this.loadingTrue = true;
      const obj = {
        data1: 'cust',
        data2: searchString,
        long1: 1,
      };
      this.api
        .autoSearchForCommon(obj, this.options)
        .pipe(
          finalize(() => {
            this.loadingTrue = false;
          })
        )
        .subscribe((success) => {
          this.items = success.lstprotoCommonDDl;
        });
    } else {
      this.searchText = '';
    }
  }

  openCustomerSlide() {
    this.data.slideDialogRef = this.slideDialog.open({
      data: {
        template: this.customerTemplate,
      },
    });
  }

  slideClose() {
    this.data.slideDialogRef.close();
  }

  slideOpen(event: boolean) {
    if (event) {
      this.openCustomerSlide();
      this.createCustomer();
    }
  }

  createCustomer() {
    this.api.createCustomer().subscribe((success) => {
      this.customer = success;
      this.customer.customerName = this.searchText;
    });
  }

  saveCustomer() {
    this.api.saveCustomer(this.customer).subscribe((success) => {
      this.customer = success;
      this.slideClose();
    });
  }
}
