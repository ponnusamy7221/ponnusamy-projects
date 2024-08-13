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
import { NgClass } from '@angular/common';
import { FormsModule, NgControl } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { ApiService } from '../../api-services/api.service';
import { InputControlComponent } from '../../form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../form-control/number-control/number-control.component';
import { AutoCompleteComponent } from '../../templates/auto-complete/auto-complete.component';
import { SlideDialogService } from '../../templates/slide-dialog/slide-dialog.service';
import { DataService } from '../../services/data/data.service';
import { consignee } from '../../api-services/app.classes';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-consignee-search',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    NgClass,
    FormsModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
  ],
  templateUrl: './consignee-search.component.html',
  styleUrl: './consignee-search.component.scss',
})
export class ConsigneeSearchComponent extends Control implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;

  loadingTrue: boolean = false;

  consignee = new consignee();

  items: any[] = [];
  @Input() public className = '';

  override _labelAnimation: boolean = false;
  @Input()
  override set labelAnimation(required: boolean) {
    this._labelAnimation = required || false;
  }

  override get labelAnimation() {
    return this._labelAnimation;
  }

  searchText: string = '';

  options = {
    hideErrorMethod: true,
    hideFullSpinner: true,
    type: '',
  };

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
        data1: 'cogs',
        data2: searchString,
        long1: 0,
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
      this.createConsignee();
    }
  }

  createConsignee() {
    this.api.createConsignee().subscribe((success) => {
      this.consignee = success;
      this.consignee.consigneeName = this.searchText;
    });
  }

  saveConsignee() {
    this.api.saveConsignee(this.consignee).subscribe((success) => {
      this.consignee = success;
      this.slideClose();
    });
  }
}
