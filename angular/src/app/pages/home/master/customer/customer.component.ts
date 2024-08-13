import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../../../common/form-control/number-control/number-control.component';
import {
  customer,
  searchParams,
} from '../../../../common/api-services/app.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { ApiService } from '../../../../common/api-services/api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { SlideDialogService } from '../../../../common/templates/slide-dialog/slide-dialog.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
    FormsModule,
    NgClass,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;
  customer = new customer();
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
    this.api.createNewSearchCustomer().subscribe((success: any) => {
      this.searchParams = success;
      this.searchParams.pageNumber = 1;
      this.searchParams.rowPerPage = this.pageSizeOptions[0];
      this.result(true);
    });
  }

  result(val: any, options?: any) {
    this.api.searchCustomer(this.searchParams).subscribe((success) => {
      this.searchResult = success.plstprotoCustomerSearchResultSet;
    });
  }

  save() {
    if (this.type === 'new') {
      this.saveCustomer();
    } else {
      this.updateCustomer();
    }
  }

  saveCustomer() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.saveCustomer(this.customer).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Saved Successfully');
        this.slideClose();
        this.result(true);
      });
    } else {
      this.errorTrue = true;
    }
  }

  updateCustomer() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.updateCustomer(this.customer).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Updated Successfully');
        this.slideClose();
        this.result(true);
      });
    } else {
      this.errorTrue = true;
    }
  }

  openUser(id: any) {
    this.type = 'edit';
    const obj = {
      data: id,
    };
    this.api.openCustomer(obj).subscribe((success) => {
      this.customer = success;
      this.openDialog();
      this.data.successMessage('User Data Opened Successfully');
    });
  }

  create() {
    this.type = 'new';
    this.api.createCustomer().subscribe((success) => {
      this.customer = success;
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
