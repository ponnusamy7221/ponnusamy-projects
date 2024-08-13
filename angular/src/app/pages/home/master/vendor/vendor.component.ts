import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  searchParams,
  vendor,
} from '../../../../common/api-services/app.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { ApiService } from '../../../../common/api-services/api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { SlideDialogService } from '../../../../common/templates/slide-dialog/slide-dialog.service';
import { MatRipple } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../../../common/form-control/number-control/number-control.component';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [
    MatRipple,
    NgClass,
    InputControlComponent,
    NumberControlComponent,
    FormsModule,
  ],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
})
export class VendorComponent implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;
  vendor = new vendor();
  searchResult: any[] = [];
  errorTrue: boolean = false;
  @ViewChild('l', { static: false }) lform!: NgForm;
  type: string = '';
  searchParams = new searchParams();
  pageSizeOptions = [100];
  constructor(
    private data: DataService,
    private api: ApiService,
    private appService: AppService,
    private slideDialog: SlideDialogService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.search();
  }

  search() {
    this.api.getSearchVendor().subscribe((success: any) => {
      this.searchParams = success;
      this.searchParams.pageNumber = 1;
      this.searchParams.rowPerPage = this.pageSizeOptions[0];
      this.result(true);
    });
  }

  result(val: any, options?: any) {
    this.api.searchVendor(this.searchParams).subscribe((success) => {
      this.searchResult = success.pstprotoVendorSearchResultSet;
    });
  }

  save() {
    if (this.type === 'new') {
      this.saveVendor();
    } else {
      this.updateVendor();
    }
  }

  saveVendor() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.saveVendor(this.vendor).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Saved Successfully');
        this.slideClose();
        this.result(true);
      });
    } else {
      this.errorTrue = true;
    }
  }

  updateVendor() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.updateVendor(this.vendor).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Updated Successfully');
        this.slideClose();
        this.result(true);
      });
    } else {
      this.errorTrue = true;
    }
  }

  openVendor(id: any) {
    this.type = 'edit';
    const obj = {
      data: id,
    };
    this.api.openVendor(obj).subscribe((success) => {
      this.vendor = success;
      this.openDialog();
      this.data.successMessage('User Data Opened Successfully');
    });
  }

  create() {
    this.type = 'new';
    this.api.createVendor().subscribe((success) => {
      this.vendor = success;
    });
    this.openDialog();
  }

  openDialog() {
    this.data.slideDialogRef = this.slideDialog.open({
      data: {
        template: this.customerTemplate,
      },
    });
  }

  slideClose() {
    this.data.slideDialogRef.close();
  }
}
