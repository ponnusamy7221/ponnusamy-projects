import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../../../../app.service';
import { ApiService } from '../../../../common/api-services/api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import {
  repackingDetailResult,
  searchParams,
} from '../../../../common/api-services/app.classes';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [RouterModule, NgClass, FormsModule, InputControlComponent],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss',
})
export class InitialComponent implements OnInit {
  searchParams = new searchParams();
  searchResult = new repackingDetailResult();
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
        name: 'Re Packing',
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
    this.api.getRepackingSearch().subscribe((success: any) => {
      this.searchParams = success;
      this.searchParams.pageNumber = 1;
      this.searchParams.rowPerPage = 100;
      this.result(true);
    });
  }

  result(val: any, options?: any) {
    this.api.searchRepacking(this.searchParams).subscribe((success) => {
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
    this.router.navigateByUrl('/home/repacking/view/' + urlValue);
  }

  searchInput() {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: '',
    };
    this.api
      .searchRepacking(this.searchParams, options)
      .subscribe((success) => {
        this.searchResult = success;
      });
  }
}
