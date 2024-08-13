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
import { FormsModule, NgControl, NgForm } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../form-control/number-control/number-control.component';
import { AutoCompleteComponent } from '../../templates/auto-complete/auto-complete.component';
import { ApiService } from '../../api-services/api.service';
import { SlideDialogService } from '../../templates/slide-dialog/slide-dialog.service';
import { finalize } from 'rxjs';
import { DataService } from '../../services/data/data.service';
import { AppService } from '../../../app.service';
import { subConfig } from '../../api-services/app.classes';

@Component({
  selector: 'app-dispatched-through',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    NgClass,
    FormsModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
  ],
  templateUrl: './dispatched-through.component.html',
  styleUrl: './dispatched-through.component.scss',
})
export class DispatchedThroughComponent extends Control implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;

  fieldTrue: boolean = false;

  subConfig = new subConfig();

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
    let searchString = '';
    if (event.type === 'focus') {
      searchString = '';
    } else {
      searchString = event;
    }
    if (event) {
      const obj = {
        data1: 'conf',
        data2: searchString,
        long1: 9,
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
      this.subConfig.mConfigId = 9;
      await this.appService.saveSubConfig(this.subConfig);
    } else {
      this.fieldTrue = true;
    }
  }
}
