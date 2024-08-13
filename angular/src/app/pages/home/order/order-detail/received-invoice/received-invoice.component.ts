import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputControlComponent } from '../../../../../common/form-control/input-control/input-control.component';
import { AppService } from '../../../../../app.service';
import { AttachmentControlComponent } from '../../../../../common/form-control/attachment-control/attachment-control.component';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../../common/services/data/data.service';
import { IntialDataService } from '../../../../../common/services/initial-data/intial-data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import {
  invoiceDetail,
  message,
  orderDeliverySlipDetail,
  orderDetail,
  sendInvoiceDetail,
} from '../../../../../common/api-services/app.classes';
import { ApiService } from '../../../../../common/api-services/api.service';
import { ModeOfPaymentComponent } from '../../../../../common/search-template/mode-of-payment/mode-of-payment.component';
import { DispatchedThroughComponent } from '../../../../../common/search-template/dispatched-through/dispatched-through.component';
import { DesitinationSearchComponent } from '../../../../../common/search-template/desitination-search/desitination-search.component';
import { NumberControlComponent } from '../../../../../common/form-control/number-control/number-control.component';
import { ProductSearchComponent } from '../../../../../common/search-template/product-search/product-search.component';
import { CalculationService } from '../../../../../common/services/calculation/calculation.service';
import { DateControlComponent } from '../../../../../common/form-control/date-control/date-control.component';
import { VendorSearchComponent } from '../../../../../common/search-template/vendor-search/vendor-search.component';
import { BuyerSearchComponent } from '../../../../../common/search-template/buyer-search/buyer-search.component';
import { ConsigneeSearchComponent } from '../../../../../common/search-template/consignee-search/consignee-search.component';
import { UnitSearchComponent } from '../../../../../common/search-template/unit-search/unit-search.component';
import { AlertService } from '../../../../../common/alert/alert.service';
import { AppDecimalPipe } from '../../../../../common/pipes/app-decimal/app-decimal.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-received-invoice',
  standalone: true,
  imports: [
    RouterModule,
    MatRipple,
    InputControlComponent,
    AttachmentControlComponent,
    ModeOfPaymentComponent,
    DispatchedThroughComponent,
    DesitinationSearchComponent,
    VendorSearchComponent,
    NumberControlComponent,
    ProductSearchComponent,
    ConsigneeSearchComponent,
    BuyerSearchComponent,
    FormsModule,
    DateControlComponent,
    UnitSearchComponent,
    AppDecimalPipe,
  ],
  templateUrl: './received-invoice.component.html',
  styleUrl: './received-invoice.component.scss',
})
export class ReceivedInvoiceComponent implements OnInit {
  id: any = 0;
  type: any = '';
  modeofPayment: string = '';
  reqInvoiceDetail = new sendInvoiceDetail();
  invoice = new invoiceDetail();
  invoiceItem = new orderDeliverySlipDetail();
  order = new orderDetail();
  productName: string = '';
  errorTrue = false;
  vendorAddress: string = '';
  consigneeAddress: string = '';
  buyerAddress: string = '';
  message = new message();
  _itemRAW: any[] = [];

  @ViewChild('l', { static: true }) lForm!: NgForm;
  constructor(
    public appService: AppService,
    public storage: AppStorageService,
    public data: DataService,
    public initialData: IntialDataService,
    private route: ActivatedRoute,
    public url: UrlService,
    private api: ApiService,
    private router: Router,
    private calculate: CalculationService,
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
        name: 'Add New',
      },
      {
        name: 'Received Invoice',
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
    if (this.order.iprotoInvoiceDetails.invoiceDetailId === 0) {
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
    // console.log(this.order);
  }

  create() {
    this.api.createInvoiceDetail().subscribe((success) => {
      this.invoice = success;
      this.addItem();
    });
  }

  addItem() {
    this.invoiceItem.orderDetailId = this.order.orderDetailId;
    this.order.lstprotoOrderDeliverySlipDetail.push(
      JSON.parse(JSON.stringify(this.invoiceItem))
    );
  }

  open() {
    const obj = {
      data: this.order.iprotoInvoiceDetails.invoiceDetailId,
    };
    this.api.openInvoiceDetail(obj).subscribe((success) => {
      this.invoice = success;
    });
  }

  save() {
    if (this.lForm.valid) {
      this.errorTrue = false;
      this.invoice.orderDetailId = this.order.orderDetailId;
      this.order.iprotoInvoiceDetails = this.invoice;
      this.api
        .saveInvoiceAndDeliverySlip(this.order)
        .subscribe(async (success) => {
          this.invoice = success.iprotoInvoiceDetails;
          if (this.invoice.invoiceDetailId !== 0) {
            const obj = {
              data: this.invoice.orderDetailId,
            };
            let urlJson = await this.url.encode(obj);
            this.router.navigateByUrl('/home/order/new/' + urlJson);
          }
        });
    } else {
      this.errorTrue = true;
    }
  }

  update() {
    if (this.lForm.valid) {
      this.errorTrue = false;
      this.invoice.orderDetailId = this.order.orderDetailId;
      this.order.iprotoInvoiceDetails = this.invoice;
      this.api.updateOrder(this.order).subscribe(async (success) => {
        this.invoice = success;
        const obj = {
          data: this.invoice.orderDetailId,
        };
        let urlJson = await this.url.encode(obj);
        this.router.navigateByUrl('/home/order/new/' + urlJson);
      });
    } else {
      this.errorTrue = true;
    }
  }

  selectPayment(event: any) {
    this.invoice.modeOfPaymentValue = event.constant;
    this.invoice.modeOfPackingDescription = event.description;
  }

  selectDispatchedThrough(event: any) {
    this.invoice.dispatchedThroughValue = event.constant;
    this.invoice.dispatchedThroughDescription = event.description;
  }

  selectDestination(event: any) {
    this.invoice.destinationValue = event.constant;
    this.invoice.destinationDecscription = event.description;
  }

  vendorSearch(event: any) {
    console.log(event);
    this.vendorAddress =
      event.name +
      event.fullDetails +
      ' ' +
      'GSTIN / UIN :' +
      event.gstNo +
      ' ' +
      'Email ID : ' +
      ' ' +
      event.email;
    this.invoice.vendorId = event.id;
    this.invoice.vendorDetails = event.name;
  }

  selectConsignee(event: any) {
    this.consigneeAddress =
      event.name +
      event.fullDetails +
      ' ' +
      'GSTIN / UIN :' +
      event.gstNo +
      ' ' +
      'Email ID : ' +
      ' ' +
      event.email;
    this.invoice.consigneeId = event.id;
    this.invoice.consigneeDetails = event.name;
  }

  selectBuyer(event: any) {
    this.buyerAddress =
      event.name +
      event.fullDetails +
      '/n' +
      'GSTIN / UIN :' +
      event.gstNo +
      ' ' +
      'Email ID : ' +
      ' ' +
      event.email;
    this.invoice.buyerId = event.id;
    this.invoice.buyerDetails = event.name;
  }

  selectFile(event: any) {
    this.invoice.invoicePhotoCopy = event;
  }

  async onCalculate() {
    let data: any = await this.calculate.calculateInvoice(
      this.order.lstprotoOrderDeliverySlipDetail,
      this.invoice.cgsTaxPercentage,
      this.invoice.sgsTaxPercentage
    );
    this.invoice.totalQuantity = data.totalPCS;
    this.invoice.taxableValue = data.taxableValue;
    this.invoice.totalTaxAmount = data.totalTaxAmount;
    this.invoice.sgsTaxValue = data.sGstAmount;
    this.invoice.cgsTaxValue = data.cGstAmount;
    this.invoice.invoiceTotal = data.invoiceTotal;
    this.invoice.roundOff = data.roundOff;
  }

  async selectProduct(event: any, item: any) {
    let isProduct = await this.checkProduct(event);
    console.log(isProduct);
    if (isProduct) {
      item.productId = event.id;
      item.productDetails = event.name;
    } else {
      debugger;
      item.productId = 0;
      item.productDetails = '';
    }
    console.log(item);
  }

  selectUnit(event: any, item: any) {
    item.unitTypeId = event.id;
    item.unitTypeValue = event.constant;
    item.unitDescription = event.description;
  }

  async deleteItem(item: any, index: any) {
    if (item.orderDeliverySlipDetailId === 0) {
      this.order.lstprotoOrderDeliverySlipDetail.splice(index, 1);
    } else {
      this.api.deleteRepackingList(item).subscribe((success) => {
        this.order.lstprotoOrderDeliverySlipDetail =
          success.lstprotoRepackingListDetail;
      });
    }

    await this.onCalculate();
  }

  async deleteItemAlert(item: any, index: any) {
    let result: boolean = await this.alert.deleteAlert(
      'Are you sure, You want to delete this item'
    );
    if (result) {
      this.deleteItem(item, index);
    }
  }

  checkProduct(item: any) {
    // Keep track of previously added product IDs in a set
    return new Promise((resolve) => {
      debugger;
      // Check if lstprotoOrderDeliverySlipDetail exists and has elements
      if (this._itemRAW.find((i) => i.id === item.id)) {
        // If found, display error message and prevent further actions
        this.data.errorMessageOnly('Item Already Exists');
        resolve(false); // Early return to stop function execution
      } else {
        this._itemRAW.push(item);
        resolve(true);
      }
    });
    // If no duplicates found or lstprotoOrderDeliverySlipDetail is empty, proceed with adding the product
    // (Your existing logic for adding the product to lstprotoOrderDeliverySlipDetail goes here)
  }
}
