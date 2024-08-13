import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuButtonComponent } from '../../../../../common/templates/menu-button/menu-button.component';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../../../../common/form-control/input-control/input-control.component';
import { MatRadioModule } from '@angular/material/radio';
import { AppService } from '../../../../../app.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NumberControlComponent } from '../../../../../common/form-control/number-control/number-control.component';
import { SelectControlComponent } from '../../../../../common/form-control/select-control/select-control.component';
import { AppStorageService } from '../../../../../common/services/app-storage/app-storage.service';
import { CustomerSearchComponent } from '../../../../../common/search-template/customer-search/customer-search.component';
import { ApiService } from '../../../../../common/api-services/api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import {
  LRDetail,
  orderDetail,
  sendInvoiceDetail,
} from '../../../../../common/api-services/app.classes';
import { IntialDataService } from '../../../../../common/services/initial-data/intial-data.service';
import { NgClass } from '@angular/common';
import { WarehouseSearchComponent } from '../../../../../common/search-template/warehouse-search/warehouse-search.component';
import { BehaviorService } from '../../../../../common/services/behavior/behavior.service';
import { DateControlComponent } from '../../../../../common/form-control/date-control/date-control.component';
import { VendorSearchComponent } from '../../../../../common/search-template/vendor-search/vendor-search.component';
import { PackageTypeComponent } from '../../../../../common/search-template/package-type/package-type.component';
import { ModeOfPackageComponent } from '../../../../../common/search-template/mode-of-package/mode-of-package.component';
import { ConsigneeSearchComponent } from '../../../../../common/search-template/consignee-search/consignee-search.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { debug } from 'node:console';
import { AttachmentControlComponent } from '../../../../../common/form-control/attachment-control/attachment-control.component';
import { format } from 'date-fns';
import { TransportTypeComponent } from '../../../../../common/search-template/transport-type/transport-type.component';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    MenuButtonComponent,
    RouterModule,
    MatRipple,
    InputControlComponent,
    NumberControlComponent,
    SelectControlComponent,
    CustomerSearchComponent,
    WarehouseSearchComponent,
    VendorSearchComponent,
    PackageTypeComponent,
    ModeOfPackageComponent,
    ConsigneeSearchComponent,
    DateControlComponent,
    MatRadioModule,
    FormsModule,
    NgClass,
    MatExpansionModule,
    AttachmentControlComponent,
    TransportTypeComponent,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent implements OnInit {
  errorTrue = false;
  errorTrueLR: boolean = false;
  order = new orderDetail();
  orderLRDetail = new LRDetail();
  reqInvoice = new sendInvoiceDetail();
  vendorName: string = '';
  expandedOrder = false;
  expandedLR = false;
  isOrderEdit = false;
  isLREdit = false;
  preOrderExpand = false;
  items = [
    {
      id: 1,
      name: 'Godown One',
    },
    {
      id: 2,
      name: 'Godown two',
    },
    {
      id: 3,
      name: 'Godown three',
    },
    {
      id: 4,
      name: 'Godown four',
    },
  ];
  vendorType: string = 'Chennai';
  invoiceType: string = 'received';
  customerName: string = '';
  warehouseName: string = '';
  id: any = 0;
  type: string = '';
  preOrders: any[] = [];
  currentDate: string = '';

  @ViewChild('l', { static: true }) lForm!: NgForm;

  constructor(
    public appService: AppService,
    public storage: AppStorageService,
    public router: Router,
    private route: ActivatedRoute,
    public url: UrlService,
    public api: ApiService,
    public data: DataService,
    public initialData: IntialDataService,
    private behavior: BehaviorService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });

    let currentDate = new Date();
    this.currentDate = format(currentDate, 'dd-MM-yyyy hh:mm');

    this.appService.isNoMenu.set(true);
    this.appService.screens = [
      {
        name: 'Order',
      },
      {
        name: 'Add New',
      },
    ];

    this.appService.backUrl = '/home/order';
  }

  onVendorChange(event: any) {
    console.log(event);
  }

  onInvoiceChange(event: any) {}

  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    await this.data.checkToken();
    if (this.id === 0) {
      this.type = 'new';
      this.appService.screens = [
        {
          name: 'Order',
        },
        {
          name: 'Add New',
        },
      ];
      this.create();
    } else {
      this.type = 'edit';
      this.appService.screens = [
        {
          name: 'Order',
        },
        {
          name: 'View',
        },
      ];
      this.open();
    }

    this.getTodayOrders();
  }

  getTodayOrders() {
    const obj = {
      data: this.currentDate,
    };
    this.api.getTodayOrders(obj).subscribe((success) => {
      this.preOrders = success.latprotoPreorder;
    });
  }

  create() {
    const obj = {
      data: 'SIELK',
    };
    this.api.createOrder(obj).subscribe((success) => {
      this.order = success;
    });
  }

  open() {
    const obj = {
      data: this.id,
    };
    this.api.openOrder(obj).subscribe((success) => {
      this.order = success;
      this.data.successMessage('Success');
      this.orderLRDetail = this.order.iprotoLRDetails;
    });
  }

  async save(navigate: boolean) {
    if (this.lForm.valid) {
      this.errorTrue = false;
      let order: any = await this.promiseOrder();
      this.order = order;
      setTimeout(async () => {
        if (this.order.orderDetailId !== 0 && !navigate) {
          const obj = {
            data: this.order.orderDetailId,
          };
          let urlValue = await this.url.encode(obj);
          this.router.navigateByUrl('/home/order/new/' + urlValue);
        } else {
          this.router.navigateByUrl('/home/order');
        }
      }, 100);
    } else {
      this.errorTrue = true;
    }
  }

  promiseOrder() {
    return new Promise((resolve) => {
      if (this.order.orderDetailId === 0) {
        this.api.saveOrder(this.order).subscribe((success) => {
          resolve(success);
        });
      } else {
        this.api.updateOrder(this.order).subscribe((success) => {
          resolve(success);
        });
      }
    });
  }

  saveLR(r: any) {
    if (r.valid) {
      this.errorTrueLR = false;
      this.order.iprotoLRDetails = this.orderLRDetail;
      this.order.iprotoLRDetails.orderDetailId =
        this.id || this.order.orderDetailId;
      if (this.order.iprotoLRDetails.lrDetailId === 0) {
        this.api
          .saveLRDetail(this.order.iprotoLRDetails)
          .subscribe((success) => {
            this.order.iprotoLRDetails = success;
          });
      } else {
        this.api
          .updateLRDetail(this.order.iprotoLRDetails)
          .subscribe((success) => {
            this.order.iprotoLRDetails = success;
          });
      }
    } else {
      this.errorTrueLR = true;
    }
  }

  selectCustomer(event: any) {
    this.order.customerId = event.id;
    this.customerName = event.name;
  }

  selectWarehouse(event: any) {
    this.order.warehouseId = event.id;
    this.warehouseName = event.name;
  }

  async addInvoice() {
    this.behavior.setOrder(this.order);
    let urlValue = await this.url.encode(
      JSON.parse(JSON.stringify(this.order))
    );
    this.router.navigateByUrl('/home/order/received_invoice/' + urlValue);
  }

  async navigateWithoutInvoice() {
    let urlValue = await this.url.encode(
      JSON.parse(JSON.stringify(this.order))
    );
    this.router.navigateByUrl('/home/order/without_invoice/' + urlValue);
  }

  selectPackageTypeLR(event: any) {
    this.orderLRDetail.packageTypeValue = event.constant;
    this.orderLRDetail.packageTypeDescription = event.description;
  }

  selectPackingLR(event: any) {
    this.orderLRDetail.modeOfPackingValue = event.constant;
    this.orderLRDetail.modeOfPackingDescription = event.description;
  }

  selectConsigneeLR(event: any) {
    this.orderLRDetail.consigneeName = event.name;
  }

  selectVendorLR(event: any) {
    this.orderLRDetail.vendorId = event.id;
  }

  setOrderExpanded() {
    this.expandedOrder = !this.expandedOrder;
  }

  setLRExpanded() {
    this.expandedLR = !this.expandedLR;
  }

  selectedData(event: any) {
    this.orderLRDetail.lrPhotoCopy = event;
  }

  selectTransport(event: any) {
    this.orderLRDetail.transportNameId = event.id;
    this.orderLRDetail.transportNameValue = event.constant;
    this.orderLRDetail.transportNameDescription = event.description;
  }

  async openSlip() {
    if (this.order.isInvoice === 'Y') {
      let urlJson = await this.url.encode(
        JSON.parse(JSON.stringify(this.order))
      );
      this.router.navigateByUrl('/home/order/received_invoice/' + urlJson);
    } else {
      let urlJson = await this.url.encode(
        JSON.parse(JSON.stringify(this.order))
      );
      this.router.navigateByUrl('/home/order/without_invoice/' + urlJson);
    }
  }

  selectPreOrder(item: any) {
    this.order.orderRefNo = item.preorderRefNo;
    this.order.isWithinChennai = item.vendorCogniseeType;
    this.order.preorderId = item.preorderId;
    this.order.customerDetails = item.iprotoCustomer.customerName;
    this.order.customerId = item.iprotoCustomer.customerId;
    this.order.orderDate = item.orderExpectedDate;
  }
}
