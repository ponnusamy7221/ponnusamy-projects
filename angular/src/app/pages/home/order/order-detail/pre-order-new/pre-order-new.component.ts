import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../../../../app.service';
import { ApiService } from '../../../../../common/api-services/api.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { InputControlComponent } from '../../../../../common/form-control/input-control/input-control.component';
import { DateControlComponent } from '../../../../../common/form-control/date-control/date-control.component';
import { CustomerSearchComponent } from '../../../../../common/search-template/customer-search/customer-search.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { preOrder } from '../../../../../common/api-services/app.classes';
import { BehaviorService } from '../../../../../common/services/behavior/behavior.service';
import { TextAreaComponent } from '../../../../../common/form-control/text-area/text-area.component';

@Component({
  selector: 'app-pre-order-new',
  standalone: true,
  imports: [
    RouterModule,
    InputControlComponent,
    DateControlComponent,
    CustomerSearchComponent,
    FormsModule,
    MatRadioModule,
    TextAreaComponent,
  ],
  templateUrl: './pre-order-new.component.html',
  styleUrl: './pre-order-new.component.scss',
})
export class PreOrderNewComponent implements OnInit {
  preOrder = new preOrder();
  id: any = 0;
  type: any = '';
  errorTrue = false;
  @ViewChild('l', { static: false }) lForm!: NgForm;
  isEdit: boolean = false;

  constructor(
    public appService: AppService,
    public router: Router,
    private route: ActivatedRoute,
    public url: UrlService,
    public api: ApiService,
    public data: DataService,
    private behavior: BehaviorService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
    this.appService.isNoMenu.set(true);
    this.appService.screens = [
      {
        name: 'Pre Orders',
      },
      {
        name: 'Add New',
      },
    ];

    this.appService.backUrl = '/home/order/preOrder';
  }

  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    await this.data.checkToken();
    if (this.id === 0) {
      this.type = 'new';
      this.create();
    } else {
      this.type = 'edit';
      this.open();
    }
  }

  create() {
    this.api.createPreOrder().subscribe((success) => {
      this.preOrder = success;
    });
  }

  open() {
    const obj = {
      data: this.id,
    };
    this.api.openPreOrder(obj).subscribe((success) => {
      this.preOrder = success;
    });
  }

  async save() {
    if (this.lForm.valid) {
      this.errorTrue = false;
      let order: any = await this.promiseOrder();
      this.preOrder = order;
      if (this.preOrder.preorderId !== 0) {
        this.router.navigateByUrl('/home/order/preOrder');
      }
    } else {
      this.errorTrue = true;
    }

    // setTimeout(async () => {
    //   if (this.preOrder.preorderId !== 0) {
    //     const obj = {
    //       data: this.preOrder.preorderId,
    //     };
    //     let urlValue = await this.url.encode(obj);
    //     this.router.navigateByUrl('/home/order/PreOrder/new/' + urlValue);
    //   }
    // }, 100);
  }

  promiseOrder() {
    return new Promise((resolve) => {
      if (this.preOrder.preorderId === 0) {
        this.api.savePreOrder(this.preOrder).subscribe((success) => {
          resolve(success);
        });
      } else {
        this.api.updatePreOrder(this.preOrder).subscribe((success) => {
          resolve(success);
        });
      }
    });
  }

  selectCustomer(event: any) {
    this.preOrder.customerId = event.id;
    this.preOrder.iprotoCustomer.customerName = event.name;
  }

  orderReceived() {
    this.preOrder.statusValue = 'COMTE';
    this.api.updatePreOrder(this.preOrder).subscribe((success) => {
      this.preOrder = success;
    });
  }
}
