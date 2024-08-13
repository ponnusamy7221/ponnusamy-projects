import { NgClass } from '@angular/common';
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
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../form-control/number-control/number-control.component';
import { AutoCompleteComponent } from '../../templates/auto-complete/auto-complete.component';
import { Control } from '../../form-control/form-control';
import { ApiService } from '../../api-services/api.service';
import { SlideDialogService } from '../../templates/slide-dialog/slide-dialog.service';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-order-no-search',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    NgClass,
    FormsModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
  ],
  templateUrl: './order-no-search.component.html',
  styleUrl: './order-no-search.component.scss',
})
export class OrderNoSearchComponent extends Control implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;

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

  options = {
    hideErrorMethod: true,
    hideFullSpinner: true,
    type: '',
  };

  loadingTrue: boolean = false;

  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
  @Output('onSelectBlur') onSelectBlur: EventEmitter<any> = new EventEmitter();

  constructor(
    @Self() @Optional() public control: NgControl,
    public slideDialog: SlideDialogService,
    private api: ApiService
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
        searchString = '';
      } else {
        searchString = event;
      }
      this.loadingTrue = true;
      const obj = {
        data1: 'ordr',
        data2: searchString,
        long1: 0,
      };
      this.api.autoSearchForCommon(obj, this.options)
      .pipe(finalize(() => {
        this.loadingTrue = false;
      }))
      .subscribe((success) => {
        this.items = success.lstprotoCommonDDl;
      });
    }
  }

  openCustomerSlide() {
    this.slideDialog.open({
      data: {
        template: this.customerTemplate,
      },
    });
  }
}
