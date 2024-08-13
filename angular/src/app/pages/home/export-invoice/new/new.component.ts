import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { SelectControlComponent } from '../../../../common/form-control/select-control/select-control.component';
import { NumberControlComponent } from '../../../../common/form-control/number-control/number-control.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { AppService } from '../../../../app.service';
import { AttachmentControlComponent } from '../../../../common/form-control/attachment-control/attachment-control.component';
import { DateControlComponent } from '../../../../common/form-control/date-control/date-control.component';
import { TextAreaComponent } from '../../../../common/form-control/text-area/text-area.component';
import {
  exportInvoice,
  exportInvoiceDetail,
} from '../../../../common/api-services/app.classes';
import { ApiService } from '../../../../common/api-services/api.service';
import { DataService } from '../../../../common/services/data/data.service';
import { UrlService } from '../../../../common/services/url/url.service';
import { PackagenoDescriptionComponent } from '../../../../common/search-template/packageno-description/packageno-description.component';
import { CalculationService } from '../../../../common/services/calculation/calculation.service';
import { ExporterComponent } from '../../../../common/search-template/exporter/exporter.component';
import { ExporterConsigneeComponent } from '../../../../common/search-template/exporter-consignee/exporter-consignee.component';
import { SearchPartyComponent } from '../../../../common/search-template/search-party/search-party.component';
import numbertoword from 'number-to-words';
import { AlertService } from '../../../../common/alert/alert.service';

export class Item {
  description = '';
  quantity = '';
  unit = '';
  rate = '';
  amount = '29,899';
}

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    RouterModule,
    InputControlComponent,
    SelectControlComponent,
    NumberControlComponent,
    AttachmentControlComponent,
    DateControlComponent,
    TextAreaComponent,
    FormsModule,
    MatRipple,
    PackagenoDescriptionComponent,
    ExporterComponent,
    ExporterConsigneeComponent,
    SearchPartyComponent,
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
})
export class NewComponent implements OnInit {
  item = new Item();
  items: any[] = [];
  id: any = 0;
  type: string = 'new';
  errorTrue = false;
  errorTrueLR: boolean = false;
  exportInvoice = new exportInvoice();
  exportInvoiceDetail = new exportInvoiceDetail();
  invoiceTotalText: any = '';
  navigationType: string = '';
  consigneeAddress: string = '';
  exporterAddress: string = '';
  partyAddress: string = '';

  constructor(
    public appService: AppService,
    public router: Router,
    private route: ActivatedRoute,
    public url: UrlService,
    public api: ApiService,
    public data: DataService,
    private calculate: CalculationService,
    private alert: AlertService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.init();
    });
    this.appService.isNoMenu.set(true);
  }

  @ViewChild('l', { static: true }) lForm!: NgForm;
  ngOnInit(): void {}

  async init() {
    let id = this.route.snapshot.paramMap.get('id');
    let params: any = await this.url.decode(id);
    this.id = params.data;
    this.navigationType = params.navigationType;
    await this.data.checkToken();
    if (this.id === 0) {
      this.type = 'new';
      this.appService.screens = [
        {
          name: 'Export Invoice',
        },
        {
          name: 'Add Invoice Details',
        },
      ];
      this.create();
    } else {
      this.type = 'edit';
      this.appService.screens = [
        {
          name: 'Export Invoice',
        },
        {
          name: 'Edit Invoice Details',
        },
      ];
      this.open();
    }
  }

  create() {
    this.api.createNewExportInvoice().subscribe((success) => {
      this.exportInvoice = success;
      this.createItem();
    });
  }

  open() {
    const obj = {
      data: this.id,
    };
    this.api.openExportInvoice(obj).subscribe((success) => {
      this.exportInvoice = success;
    });
  }

  async save() {
    console.log(this.lForm);
    if (this.lForm.valid) {
      this.errorTrue = false;
      let exportInvoice: any = await this.promiseOrder();
      this.exportInvoice = exportInvoice;
      setTimeout(async () => {
        if (this.exportInvoice.exportInvoiceId !== 0) {
          if (this.navigationType === 'form') {
            const obj = {
              data: this.exportInvoice.exportInvoiceId,
            };
            let urlValue = await this.url.encode(obj);
            this.router.navigateByUrl('/home/export_invoice');
          } else {
            const obj = {
              data: this.exportInvoice.exportInvoiceId,
            };
            let urlValue = await this.url.encode(obj);
            this.router.navigateByUrl(
              '/home/export_invoice/invoice/' + urlValue
            );
          }
        }
      }, 100);
    } else {
      this.errorTrue = true;
    }
  }

  promiseOrder() {
    return new Promise((resolve) => {
      if (this.exportInvoice.exportInvoiceId === 0) {
        this.api.saveExportInvoice(this.exportInvoice).subscribe((success) => {
          resolve(success);
        });
      } else {
        this.api
          .updateExportInvoice(this.exportInvoice)
          .subscribe((success) => {
            resolve(success);
          });
      }
    });
  }

  createItem() {
    this.api.createNewExportInvoiceDetail().subscribe((success) => {
      this.exportInvoiceDetail = success;
      this.addItems();
    });
  }

  addItems() {
    this.exportInvoice.lstprotoExportInvoiceDetail.push(
      JSON.parse(JSON.stringify(this.exportInvoiceDetail))
    );
  }

  async deleteItem(item: any, index: any) {
    if (item.exportInvoiceDetailId === 0) {
      this.exportInvoice.lstprotoExportInvoiceDetail.splice(index, 1);
    } else {
      this.api.deleteExportInvoiceList(item).subscribe((success) => {
        this.exportInvoice.lstprotoExportInvoiceDetail =
          success.lstprotoExportInvoiceDetail;
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

  selectPackage(event: any, item: any) {
    if (event) {
      item.packageNo = event.packageNo;
      item.quantity = event.quantity;
      item.unitTypeDescription = event.unitTypeDescription;
      item.unitTypeValue = event.unitTypeValue;
      item.invoiceRate = event.invoiceRate;
      item.netWeight = event.netWeight;
      item.grossWeight = event.grossWeight;
      item.finalPackingDetailId = event.finalPackingDetailId;
      this.onCalculate();
    }
  }

  async onCalculate() {
    console.log(this.exportInvoice.lstprotoExportInvoiceDetail);
    let data: any = await this.calculate.calculateInvoice(
      this.exportInvoice.lstprotoExportInvoiceDetail,
      this.exportInvoice.cgstTaxPercentage,
      this.exportInvoice.sgstTaxPercentage
    );
    this.exportInvoice.overAllTotal = data.totalPCS;
    this.exportInvoice.taxableValue = data.taxableValue;
    this.exportInvoice.totalTaxAmount = data.totalTaxAmount;
    this.exportInvoice.sgstValue = data.sGstAmount;
    this.exportInvoice.cgstValue = data.cGstAmount;
    this.exportInvoice.invoiceTotal = data.invoiceTotal;
    this.exportInvoice.roundOff = data.roundOff;
    this.invoiceTotalText = numbertoword
      .toWords(this.exportInvoice.invoiceTotal)
      .toLocaleUpperCase();

    console.log(data);
    this.exportInvoice.netWeight = data.netWeight.toFixed(2).toString();
    this.exportInvoice.grossWeight = data.grossWeight.toFixed(2).toString();
  }

  consigneeSelect(event: any) {
    this.consigneeAddress =
      event.name +
      event.fullDetails +
      '/n' +
      'GSTIN / UIN :' +
      event.gstNo +
      ' ' +
      'Email ID : ' +
      ' ' +
      event.email;
    this.exportInvoice.exportConsigneeId = event.id;
    this.exportInvoice.iprotoExportConsignee.exportConsigneeName = event.name;
  }

  selectExporter(event: any) {
    this.exporterAddress =
      event.name +
      event.fullDetails +
      '/n' +
      'GSTIN / UIN :' +
      event.gstNo +
      ' ' +
      'Email ID : ' +
      ' ' +
      event.email;
    this.exportInvoice.exporterId = event.id;
    this.exportInvoice.iprotoExporter.exporterName = event.name;
  }

  selectParty(event: any) {
    this.partyAddress =
      event.name +
      event.fullDetails +
      '/n' +
      'GSTIN / UIN :' +
      event.gstNo +
      ' ' +
      'Email ID : ' +
      ' ' +
      event.email;
    this.exportInvoice.partyId = event.id;
    this.exportInvoice.iprotoParty.partyName = event.name;
  }

  selectFile(event: any) {
    this.exportInvoice.signatureCopy = event;
  }
}
