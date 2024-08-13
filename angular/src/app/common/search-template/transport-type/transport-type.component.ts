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
import { finalize } from 'rxjs';
import { ApiService } from '../../api-services/api.service';
import { customer, subConfig } from '../../api-services/app.classes';
import { InputControlComponent } from '../../form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../form-control/number-control/number-control.component';
import { DataService } from '../../services/data/data.service';
import { AutoCompleteComponent } from '../../templates/auto-complete/auto-complete.component';
import { SlideDialogService } from '../../templates/slide-dialog/slide-dialog.service';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-transport-type',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    NgClass,
    FormsModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
  ],
  templateUrl: './transport-type.component.html',
  styleUrl: './transport-type.component.scss',
})
export class TransportTypeComponent extends Control implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;

  subConfig = new subConfig();

  fieldTrue: boolean = false;

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
    private data: DataService,
    private appService: AppService
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
        data1: 'conf',
        data2: searchString,
        long1: 5,
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

  async slideOpen(event: any) {
    if (event) {
      this.openCustomerSlide();
      await this.appService.createSubConfig();
    }
  }

  async save(form: any) {
    console.log(form);
    if (form.valid) {
      this.fieldTrue = false;
      this.subConfig.mConfigId = 5;
      await this.appService.saveSubConfig(this.subConfig);
    } else {
      this.fieldTrue = true;
    }
  }
}
