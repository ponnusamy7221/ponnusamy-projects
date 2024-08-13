import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../app.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../../../common/services/data/data.service';
import { ApiService } from '../../../../common/api-services/api.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { exportInvoice } from '../../../../common/api-services/app.classes';
import numbertoword from 'number-to-words';
import { AlertService } from '../../../../common/alert/alert.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent implements OnInit {
  exportInvoice = new exportInvoice();
  id: any = 0;
  invoiceTotalinWords: string = '';
  constructor(
    public appService: AppService,
    private data: DataService,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private url: UrlService,
    private alert: AlertService
  ) {
    this.appService.isNoMenu.set(true);
    this.appService.screens = [
      {
        name: 'Export Invoice',
      },
      {
        name: 'View Invoice Details',
      },
    ];
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
  }

  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    await this.data.checkToken();
    this.open();
  }

  open() {
    const obj = {
      data: this.id,
    };
    this.api.openExportInvoice(obj).subscribe((success) => {
      this.exportInvoice = success;
      this.invoiceTotalinWords = numbertoword
        .toWords(this.exportInvoice.invoiceTotal)
        .toLocaleUpperCase();
    });
  }

  async navigateInvoice() {
    const obj = {
      data: this.id,
      navigationType: 'invoice',
    };
    let urlValue = await this.url.encode(obj);
    this.router.navigateByUrl('/home/export_invoice/new/' + urlValue);
  }

  approve() {
    this.exportInvoice.statusValue = 'APPRD';
    this.api.updateExportInvoice(this.exportInvoice).subscribe((success) => {
      this.exportInvoice = success;
    });
  }

  async approveAlert() {
    let result = await this.alert.approveAlert(
      'Are you sure you want to approve this invoice'
    );

    if (result) {
      this.approve();
    }
  }

  download() {}
}
