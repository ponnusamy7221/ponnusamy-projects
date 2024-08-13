import { Component, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { ApiService } from '../../../../../common/api-services/api.service';
import {
  searchParams,
  orderSearchResult,
  preOrderResult,
} from '../../../../../common/api-services/app.classes';
import { DataService } from '../../../../../common/services/data/data.service';
import { UrlService } from '../../../../../common/services/url/url.service';
import { format } from 'date-fns';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../../common/form-control/input-control/input-control.component';

@Component({
  selector: 'app-pre-order',
  standalone: true,
  imports: [RouterModule, MatRipple, FormsModule, InputControlComponent],
  templateUrl: './pre-order.component.html',
  styleUrl: './pre-order.component.scss',
})
export class PreOrderComponent implements OnInit {
  searchParams = new searchParams();
  searchResult = new preOrderResult();
  pageSizeOptions = [100];
  currentDate: string = '';

  constructor(
    public appService: AppService,
    public data: DataService,
    public api: ApiService,
    public router: Router,
    public url: UrlService
  ) {
    this.appService.isNoMenu.set(false);
    this.appService.screens = [
      {
        name: 'Pre Orders',
      },
    ];

    this.appService.backUrl = '/home/order';

    let currentDate = new Date();
    this.currentDate = format(currentDate, 'dd-MM-yyyy hh:mm');
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.search();
  }

  search() {
    // this.searchParams.date = this.currentDate;
    this.searchParams.pageNumber = 1;
    this.searchParams.rowPerPage = this.pageSizeOptions[0];
    this.result(true);
  }

  result(val: any, options?: any) {
    this.api.searchPreOrder(this.searchParams).subscribe((success) => {
      this.searchResult = success;
    });
  }

  async createOrder() {
    const obj = {
      data: 0,
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/order/preOrder/new/' + urlValue);
  }

  async openOrder(id: any) {
    const obj = {
      data: id,
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/order/preOrder/new/' + urlValue);
  }

  searchInput() {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: '',
    };
    this.api.searchPreOrder(this.searchParams, options).subscribe((success) => {
      this.searchResult = success;
    });
  }
}
