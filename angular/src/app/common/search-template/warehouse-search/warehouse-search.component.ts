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
import { FormsModule, NgControl } from '@angular/forms';
import { ApiService } from '../../api-services/api.service';
import { SlideDialogService } from '../../templates/slide-dialog/slide-dialog.service';
import { Control } from '../../form-control/form-control';
import { NgClass } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../form-control/number-control/number-control.component';
import { AutoCompleteComponent } from '../../templates/auto-complete/auto-complete.component';
import { finalize } from 'rxjs';
import { wareHouse } from '../../api-services/app.classes';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-warehouse-search',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    NgClass,
    FormsModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
  ],
  templateUrl: './warehouse-search.component.html',
  styleUrl: './warehouse-search.component.scss',
})
export class WarehouseSearchComponent extends Control implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;

  warehouse = new wareHouse();

  items: any[] = [];
  @Input() public className = '';

  searchText: string = '';
  options = {
    hideErrorMethod: true,
    hideFullSpinner: true,
    type: '',
  };

  loadingTrue: boolean = false;

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

  autoSearch(event: any) {
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
        data1: 'warh',
        data2: searchString,
        long1: 1,
      };
      this.loadingTrue = true;
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
      this.createWarehouse();
    }
  }

  createWarehouse() {
    this.api.createWarehouse().subscribe((success) => {
      this.warehouse = success;
      this.warehouse.warehouseName = this.searchText;
    });
  }

  saveWarehouse() {
    this.api.saveWarehouse(this.warehouse).subscribe((success) => {
      this.warehouse = success;
      this.slideClose();
    });
  }
}
