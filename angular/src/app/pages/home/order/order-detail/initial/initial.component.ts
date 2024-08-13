import { Component, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { DataService } from '../../../../../common/services/data/data.service';
import { ApiService } from '../../../../../common/api-services/api.service';
import {
  orderSearch,
  orderSearchResult,
  searchParams,
} from '../../../../../common/api-services/app.classes';
import { UrlService } from '../../../../../common/services/url/url.service';
import { format } from 'date-fns';
import { InputControlComponent } from '../../../../../common/form-control/input-control/input-control.component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [
    RouterModule,
    MatRipple,
    InputControlComponent,
    FormsModule,
    NgClass,
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss',
})
export class InitialComponent implements OnInit {
  searchParams = new searchParams();
  searchResult = new orderSearchResult();
  pageSizeOptions = [100];

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
        name: 'Orders',
      },
    ];

    this.appService.backUrl = '/home/dashboard';
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.search();
  }

  search() {
    this.api.getOrderSearch().subscribe((success: any) => {
      this.searchParams = success;
      this.searchParams.pageNumber = 1;
      this.searchParams.rowPerPage = this.pageSizeOptions[0];
      this.result(true);
    });
  }

  result(val: any, options?: any) {
    this.api.searchOrder(this.searchParams).subscribe((success) => {
      this.searchResult = success;
    });
  }

  async createOrder() {
    const obj = {
      data: 0,
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/order/new/' + urlValue);
  }

  async openOrder(id: any) {
    const obj = {
      data: id,
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/order/new/' + urlValue);
  }

  searchInput() {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: '',
    };
    this.api.searchOrder(this.searchParams, options).subscribe((success) => {
      this.searchResult = success;
    });
  }
}
