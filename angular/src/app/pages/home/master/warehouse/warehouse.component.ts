import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { NumberControlComponent } from '../../../../common/form-control/number-control/number-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass } from '@angular/common';
import {
  searchParams,
  wareHouse,
} from '../../../../common/api-services/app.classes';
import { AppService } from '../../../../app.service';
import { ApiService } from '../../../../common/api-services/api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { SlideDialogService } from '../../../../common/templates/slide-dialog/slide-dialog.service';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
    FormsModule,
    NgClass,
  ],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss',
})
export class WarehouseComponent {
  @ViewChild('customerTemplate', { static: true })
  customerTemplate!: TemplateRef<any>;
  warehouse = new wareHouse();
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
    this.searchParams.pageNumber = 1;
    this.searchParams.rowPerPage = this.pageSizeOptions[0];
    this.result(true);
  }

  result(val: any, options?: any) {
    this.api.searchWareHouse(this.searchParams).subscribe((success) => {
      this.searchResult = success.plstprotoWareHouseSearchResultSet;
    });
  }

  save() {
    if (this.type === 'new') {
      this.saveWarehouse();
    } else {
      this.updateWarehouse();
    }
  }

  saveWarehouse() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.saveWarehouse(this.warehouse).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Saved Successfully');
        this.slideClose();
        this.result(true);
      });
    } else {
      this.errorTrue = true;
    }
  }

  updateWarehouse() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.updateWarehouse(this.warehouse).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Updated Successfully');
        this.slideClose();
        this.result(true);
      });
    } else {
      this.errorTrue = true;
    }
  }

  openWarehouse(id: any) {
    this.type = 'edit';
    const obj = {
      data: id,
    };
    this.api.openWarehouse(obj).subscribe((success) => {
      this.warehouse = success;
      this.openDialog();
      this.data.successMessage('User Data Opened Successfully');
    });
  }

  create() {
    this.type = 'new';
    this.api.createVendor().subscribe((success) => {
      this.warehouse = success;
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
