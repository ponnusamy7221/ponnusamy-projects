import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../common/api-services/api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import {
  exportInvoiceResult,
  searchParams,
} from '../../../../common/api-services/app.classes';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [RouterLink, MatRipple, InputControlComponent, FormsModule],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss',
})
export class InitialComponent implements OnInit {
  searchParams = new searchParams();
  searchResult = new exportInvoiceResult();

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
        name: 'Export Invoice',
      },
    ];
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.search();
  }

  search() {
    this.searchParams.pageNumber = 1;
    this.searchParams.rowPerPage = 100;
    this.result(true);
  }

  result(val: any, options?: any) {
    this.api.searchExportInvoice(this.searchParams).subscribe((success) => {
      this.searchResult = success;
    });
  }

  async createInvoice() {
    const obj = {
      data: 0,
      navigationType: 'form',
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/export_invoice/new/' + urlValue);
  }

  async openOrder(id: any) {
    const obj = {
      data: id,
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/export_invoice/invoice/' + urlValue);
  }

  searchInput() {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: '',
    };
    this.api
      .searchExportInvoice(this.searchParams, options)
      .subscribe((success) => {
        this.searchResult = success;
      });
  }
}
