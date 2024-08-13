import {
  Component,
  InjectionToken,
  Input,
  OnInit,
  Optional,
  Self,
  inject,
} from '@angular/core';
import { Control } from '../form-control';
import { FormsModule, NgControl } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { format, isMatch, parse } from 'date-fns';
import { AppSettingsService } from '../../services/app-settings/app-settings.service';
import { Platform } from '@angular/cdk/platform';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { CustomDateAdapter } from './custom-date-adapter';

export const DATE_CONFIG = new InjectionToken('Date Format', {
  factory: () => {
    return {
      viewFormat: inject(AppSettingsService).environment.dateViewFormat,
    };
  },
});

export const MY_FORMATS = {
  parse: {
    dateInput: 'dd-MM-yyyy HH:mm',
  },
  display: {
    dateInput: 'dd MMM yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd MMM yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-date-control',
  standalone: true,
  imports: [FormsModule, NgClass, MatDatepickerModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './date-control.component.html',
  styleUrl: './date-control.component.scss',
})
export class DateControlComponent extends Control implements OnInit {
  @Input() public returnFormat = '';
  @Input() public readonly = false;
  xvalue: any = '';
  minDateNow: any = '';
  maxDateNow: any = '';

  @Input()
  set minDate(minDate: string) {
    if (minDate !== '') {
      this.getDateFormat(minDate).then((parseDateFormat) => {
        this.minDateNow = parse(minDate, parseDateFormat, new Date());
      });
    } else {
      this.minDateNow = '';
    }
  }
  get minDate() {
    return this.minDateNow;
  }

  @Input()
  set maxDate(maxDate: string) {
    if (maxDate !== '') {
      this.getDateFormat(maxDate).then((parseDateFormat) => {
        this.maxDateNow = parse(maxDate, parseDateFormat, new Date());
      });
    } else {
      this.maxDateNow = '';
    }
  }
  get maxDate() {
    return this.maxDateNow;
  }

  constructor(
    @Self() @Optional() public control: NgControl,
    public appSetting: AppSettingsService
  ) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  getDateFormat(date: string): Promise<string> {
    return new Promise((resolve) => {
      let dateFormat = this.appSetting.environment.serverDateFormat;
      let dateFormatWithTime =
        this.appSetting.environment.serverDateFormatWithTime;
      let parseDateFormat =
        this.appSetting.environment.serverDateFormatWithTime;
      if (isMatch(date, dateFormat)) {
        parseDateFormat = dateFormat;
      } else if (isMatch(date, dateFormatWithTime)) {
        parseDateFormat = dateFormatWithTime;
      }
      resolve(parseDateFormat);
    });
  }

  ngOnInit(): void {
    this.setValidate(this.control);
    this.getValue().subscribe(async (xvalue) => {
      if (xvalue) {
        if (
          this.value !== '' &&
          this.value !== null &&
          this.value !== undefined
        ) {
          let parseDateFormat = await this.getDateFormat(this.value);
          this.xvalue = parse(this.value, parseDateFormat, new Date());
        } else {
          this.xvalue = '';
        }
      }
    });
  }

  dateSelected() {
    const returnFormat =
      this.returnFormat === ''
        ? this.appSetting.environment.serverDateFormatWithTime
        : this.returnFormat;
    const xdate = format(this.xvalue, returnFormat);
    if (xdate === 'Invalid date') {
      this.value = '';
    } else {
      this.value = xdate;
    }
    this.change.next(this.value);
  }

  onLocalClear() {
    this.xvalue = '';
    this.onClear();
  }
}
