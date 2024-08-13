import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { AppService } from '../../../../app.service';
import { ApiService } from '../../../../common/api-services/api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import {
  repacking,
  repackingListDetail,
} from '../../../../common/api-services/app.classes';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductSearchComponent } from '../../../../common/search-template/product-search/product-search.component';
import { PackageTypeComponent } from '../../../../common/search-template/package-type/package-type.component';
import { NumberControlComponent } from '../../../../common/form-control/number-control/number-control.component';
import { UnitSearchComponent } from '../../../../common/search-template/unit-search/unit-search.component';
import { SelectControlComponent } from '../../../../common/form-control/select-control/select-control.component';
import { AlertService } from '../../../../common/alert/alert.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    RouterModule,
    InputControlComponent,
    FormsModule,
    ProductSearchComponent,
    PackageTypeComponent,
    NumberControlComponent,
    UnitSearchComponent,
    SelectControlComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  id: any = 0;
  repacking = new repacking();
  repackingItem = new repackingListDetail();
  packageType = '';
  productItem = '';
  isExpanded: boolean = false;
  errorTrue: boolean = false;
  @ViewChild('l', { static: false }) lform!: NgForm;
  constructor(
    public appService: AppService,
    private route: ActivatedRoute,
    public router: Router,
    public api: ApiService,
    public data: DataService,
    private url: UrlService,
    private alert: AlertService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
    this.appService.isNoMenu.set(true);
    this.appService.screens = [
      {
        name: 'Re Packing',
      },
      {
        name: 'Order',
      },
    ];
  }
  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    await this.data.checkToken();
    if (this.id !== 0) {
      this.open();
    }
  }

  open() {
    const obj = {
      data: this.id,
    };
    this.api.getRepackingForOrderDetail(obj).subscribe((success) => {
      this.repacking = success;
      this.createItem();
    });
  }

  createItem() {
    const obj = {
      data: this.repacking.iprotoOrderDetails.orderDetailId,
    };
    this.api.createNewRepackingItem(obj).subscribe((success) => {
      this.repackingItem = success;
      this.addItem();
    });
  }

  addItem() {
    this.repacking.lstprotoRepackingListDetail.push(
      JSON.parse(JSON.stringify(this.repackingItem))
    );
  }

  deleteItem(item: any, index: any) {
    if (item.repackingListDetailId === 0) {
      this.repacking.lstprotoRepackingListDetail.splice(index, 1);
    } else {
      this.api.deleteRepackingList(item).subscribe((success) => {
        this.repacking.lstprotoRepackingListDetail =
          success.lstprotoInvoiceDetailsItems;
      });
    }
  }

  selectPackage(event: any, item: any) {
    item.packageTypeId = event.id;
    item.packageTypeValue = event.constant;
    item.packageTypeDescription = event.description;
  }

  save() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.saveRepackingDetail(this.repacking).subscribe((success) => {
        this.repacking = success;
        this.repacking.lstprotoRepackingListDetail.map((data: any) => {
          if (data.isVerifird !== 'Y') {
            this.errorTrue = true;
          }
        });
      });
    } else {
      this.errorTrue = true;
    }
  }

  selectUnit(event: any, item: any) {
    item.unitTypeId = event.id;
    item.unitTypeValue = event.constant;
    item.unitTypeDescription = event.description;
  }

  productSelect(event: any, item: any) {
    item.productId = event.id;
    item.iprotoProduct.productName = event.name;
  }

  approvedItem(item: any) {
    item.statusValue = 'APPRD';
    this.api.approveRepackingDetail(this.repacking).subscribe((success) => {
      this.repacking = success;
    });
  }

  async approveAlert(item: any) {
    let result = await this.alert.approveAlert(
      'Are you sure you want to approve the selected package'
    );

    if (result) {
      this.approvedItem(item);
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
}
