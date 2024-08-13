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
import { InputControlComponent } from '../../form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../form-control/number-control/number-control.component';
import { AutoCompleteComponent } from '../../templates/auto-complete/auto-complete.component';
import { SlideDialogService } from '../../templates/slide-dialog/slide-dialog.service';
import { exporter } from '../../api-services/app.classes';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-exporter',
  standalone: true,
  imports: [
    AutoCompleteComponent,
    NgClass,
    FormsModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
  ],
  templateUrl: './exporter.component.html',
  styleUrl: './exporter.component.scss',
})
export class ExporterComponent extends Control implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;

  items: any[] = [];
  @Input() public className = '';

  exporter = new exporter();

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
        data1: 'EXPO',
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
      this.createExporter();
    }
  }

  createExporter() {
    this.api.createExporter().subscribe((success) => {
      this.exporter = success;
      this.exporter.exporterName = this.searchText;
    });
  }

  saveExporter() {
    this.api.saveExporter(this.exporter).subscribe((success) => {
      this.exporter = success;
      this.slideClose();
    });
  }
}
