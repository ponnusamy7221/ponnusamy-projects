import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputControlComponent } from '../../../../../common/form-control/input-control/input-control.component';
import { AppService } from '../../../../../app.service';
import { AttachmentControlComponent } from '../../../../../common/form-control/attachment-control/attachment-control.component';
import {
  orderDeliverySlipDetail,
  orderDeliveryWithoutInvoice,
  orderDetail,
} from '../../../../../common/api-services/app.classes';
import { ApiService } from '../../../../../common/api-services/api.service';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { CalculationService } from '../../../../../common/services/calculation/calculation.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { DateControlComponent } from '../../../../../common/form-control/date-control/date-control.component';
import { ProductSearchComponent } from '../../../../../common/search-template/product-search/product-search.component';
import { VendorSearchComponent } from '../../../../../common/search-template/vendor-search/vendor-search.component';
import { FormsModule } from '@angular/forms';
import { ConsigneeSearchComponent } from '../../../../../common/search-template/consignee-search/consignee-search.component';
import { NumberControlComponent } from '../../../../../common/form-control/number-control/number-control.component';
import { UnitSearchComponent } from '../../../../../common/search-template/unit-search/unit-search.component';
import { AlertService } from '../../../../../common/alert/alert.service';

@Component({
  selector: 'app-without-invoice',
  standalone: true,
  imports: [
    RouterModule,
    InputControlComponent,
    AttachmentControlComponent,
    DateControlComponent,
    ProductSearchComponent,
    VendorSearchComponent,
    FormsModule,
    ConsigneeSearchComponent,
    NumberControlComponent,
    UnitSearchComponent,
  ],
  templateUrl: './without-invoice.component.html',
  styleUrl: './without-invoice.component.scss',
})
export class WithoutInvoiceComponent implements OnInit {
  order = new orderDetail();
  slipDetail = new orderDeliverySlipDetail();
  slipDetailWithoutInvoice = new orderDeliveryWithoutInvoice();
  type: any = '';
  constructor(
    public appService: AppService,
    public storage: AppStorageService,
    public data: DataService,
    private route: ActivatedRoute,
    public url: UrlService,
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });

    this.appService.isNoMenu.set(true);
    this.appService.screens = [
      {
        name: 'Order',
      },
      {
        name: 'Without Invoice',
      },
    ];
  }

  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.order = params;
    console.log(this.order);
    await this.data.checkToken();
    if (
      this.order.iprotoOrderDeliverySlipDetailWithoutInvoice
        .orderDeliverySlipWithoutId === 0
    ) {
      this.type = 'new';
      this.create();
    } else {
      this.type = 'edit';
      this.open();
    }
    const obj = {
      data: this.order.orderDetailId,
    };
    let urlJson = await this.url.encode(obj);
    this.appService.backUrl = '/home/order/new/' + urlJson;
  }

  create() {
    this.api.createDeliverySlipDetail().subscribe((success) => {
      this.slipDetail = success;
      this.slipDetail.orderDetailId = this.order.orderDetailId;
      this.addItems();
    });
  }

  addItems() {
    this.order.lstprotoOrderDeliverySlipDetail.push(
      JSON.parse(JSON.stringify(this.slipDetail))
    );
  }

  open() {
    const obj = {
      data: this.order.iprotoOrderDeliverySlipDetailWithoutInvoice
        .orderDeliverySlipWithoutId,
    };
    this.api.openDeliverySlipDetail(obj).subscribe((success) => {
      this.slipDetail = success;
      this.slipDetailWithoutInvoice =
        this.order.iprotoOrderDeliverySlipDetailWithoutInvoice;
    });
  }

  selectProduct(event: any, item: any) {
    item.productId = event.id;
    item.productDetails = event.name;
  }

  selectUnit(event: any, item: any) {
    item.unitTypeValue = event.constant;
    item.unitDescription = event.description;
  }

  selectVendor(event: any) {
    this.slipDetailWithoutInvoice.vendorId = event.id;
    this.slipDetailWithoutInvoice.vendorDetails = event.name;
  }

  save() {
    this.slipDetail.orderDetailId = this.order.orderDetailId;
    this.slipDetailWithoutInvoice.orderDetailId = this.order.orderDetailId;
    this.order.iprotoOrderDeliverySlipDetailWithoutInvoice =
      this.slipDetailWithoutInvoice;
    this.api
      .saveInvoiceAndDeliverySlip(this.order)
      .subscribe(async (success) => {
        this.slipDetail = success;
        const obj = {
          data: this.slipDetail.orderDetailId,
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl('/home/order/new/' + urlJson);
      });
  }

  update() {
    this.slipDetail.orderDetailId = this.order.orderDetailId;
    this.slipDetailWithoutInvoice.orderDetailId = this.order.orderDetailId;
    this.order.iprotoOrderDeliverySlipDetailWithoutInvoice =
      this.slipDetailWithoutInvoice;
    this.api.updateOrder(this.order).subscribe(async (success) => {
      this.slipDetail = success;
      const obj = {
        data: this.slipDetail.orderDetailId,
      };
      let urlJson = await this.url.encode(obj);
      this.router.navigateByUrl('/home/order/new/' + urlJson);
    });
  }

  calculate() {
    this.slipDetailWithoutInvoice.totalAmount = '0';
    this.order.lstprotoOrderDeliverySlipDetail.forEach((item) => {
      item.amount = parseInt(item.quantity || 0) * parseFloat(item.rate || 0);

      let amount: any =
        parseInt(this.slipDetailWithoutInvoice.totalAmount) +
        parseInt(item.amount || 0);

      this.slipDetailWithoutInvoice.totalAmount = amount.toString();
    });
  }

  deleteItem(item: any, i: any) {
    if (item.orderDeliverySlipDetailId === 0) {
      this.order.lstprotoOrderDeliverySlipDetail.splice(i, 1);
    } else {
      this.api.deleteDeliverySlipDetailItem(item).subscribe((success) => {
        this.order.lstprotoOrderDeliverySlipDetail =
          success.lstprotoOrderDeliverySlipDetail;
      });
    }

    this.calculate();
  }

  selectConsignee(event: any) {
    if (event) {
      this.slipDetailWithoutInvoice.consigneeId = event.id;
      this.slipDetailWithoutInvoice.consigneeDetails = event.name;
    }
  }

  async deleteItemAlert(item: any, index: any) {
    let result: boolean = await this.alert.deleteAlert(
      'Are you sure, You want to delete this item'
    );
    if (result) {
      this.deleteItem(item, index);
    }
  }

  selectFile(event: any) {
    this.slipDetail.deliverySlipPhotoCopy = event;
  }
}
