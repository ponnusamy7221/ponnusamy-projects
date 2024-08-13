import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../../app.service';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { OrderNoSearchComponent } from '../../../../common/search-template/order-no-search/order-no-search.component';
import { UrlService } from '../../../../common/services/url/url.service';
import { DateControlComponent } from '../../../../common/form-control/date-control/date-control.component';
import { CustomerSearchComponent } from '../../../../common/search-template/customer-search/customer-search.component';
import { ApiService } from '../../../../common/api-services/api.service';
import { repacking } from '../../../../common/api-services/app.classes';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    RouterModule,
    InputControlComponent,
    FormsModule,
    OrderNoSearchComponent,
    DateControlComponent,
    CustomerSearchComponent,
    NgClass,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent {
  orderRefNo: string = '';
  orderId: any = 0;
  fromDate: string = '';
  toDate: string = '';
  customerId = 0;
  customerName: string = '';
  repacking = new repacking();

  constructor(
    public appService: AppService,
    private url: UrlService,
    public router: Router,
    private api: ApiService
  ) {
    this.appService.isNoMenu.set(true);
    this.appService.screens = [
      {
        name: 'Re Packing',
      },
      {
        name: 'Add New',
      },
    ];
  }

  selectOrder(event: any) {
    this.orderId = event.id;
  }

  async navigateOrder() {
    const obj = {
      data: this.orderId,
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/repacking/order/' + urlValue);
  }

  getRepackingBasedOnValues() {
    const obj = {
      string1: this.fromDate,
      string2: this.toDate,
      long1: this.customerId,
    };
    this.api.getRepackingDetailBasedOnValues(obj).subscribe((success) => {
      this.repacking = success;
    });
  }

  selectCustomer(event: any) {
    this.customerId = event.id;
    this.customerName = event.name;
  }

  openOrderBasedRepacking(id: any) {
    this.orderId = id;
    if (this.orderId) {
      this.navigateOrder();
    }
  }

  checkOrderStatusInRepacking(id: any) {
    const obj = {
      data: id,
    };
    this.api.checkOrderStatusInRepacking(obj).subscribe(
      (success) => {
        this.openOrderBasedRepacking(id);
      },
      (error) => {}
    );
  }
}
