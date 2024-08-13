import { Injectable } from '@angular/core';

export class invoice {
  items: any[] = [];
  cGst = 0;
  sGst = 0;
  sGstAmount = 0;
  cGstAmount = 0;
  totalAmount: number = 0;
  totalTaxAmount = 0;
  invoiceTotal = 0;
  finalTotal = 0;
  totalPCS = 0;
  taxableValue = 0;
  netWeight: any = 0;
  grossWeight: any = 0;
  roundOff: any = 0;
}

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  invoice = new invoice();

  constructor() {}

  // invoice calculation

  calculateInvoice(items: any, cGst: any, sGst: any) {
    return new Promise((resolve) => {
      if (items.length !== 0) {
        console.log(items);
        this.invoice = JSON.parse(JSON.stringify(new invoice()));
        items.map((item: any) => {
          this.invoice.totalPCS =
            parseInt(item.quantity || 0) + this.invoice.totalPCS;

          item.amount =
            parseFloat(item.rate || 0) * parseInt(item.quantity || 0);

          this.invoice.taxableValue =
            parseFloat(item.amount || 0) + this.invoice.taxableValue;

          if (item?.netWeight) {
            this.invoice.netWeight =
              parseFloat(this.invoice.netWeight) +
              parseFloat(item.netWeight || 0);
          }

          if (item?.grossWeight) {
            this.invoice.grossWeight =
              parseFloat(this.invoice.grossWeight) +
              parseFloat(item.grossWeight || 0);
          }
        });

        let _cGst: any = parseFloat(cGst || 0) * 100;
        let _sGst: any = parseFloat(sGst || 0) * 100;

        if (_cGst !== 0) {
          let amount: any = this.invoice.taxableValue / parseInt(_cGst);
          this.invoice.cGstAmount = parseFloat(amount.toFixed(2));
        }

        if (_sGst !== 0) {
          let amount: any = this.invoice.taxableValue / parseInt(_sGst);
          this.invoice.sGstAmount = parseFloat(amount.toFixed(2));
        }

        let totalTaxAmount: any =
          this.invoice.sGstAmount + this.invoice.cGstAmount;
        this.invoice.totalTaxAmount = parseFloat(totalTaxAmount.toFixed(2));

        let invoiceTotal: any =
          this.invoice.taxableValue + this.invoice.totalTaxAmount;
        this.invoice.invoiceTotal = parseFloat(invoiceTotal.toFixed(2));

        // Rounding logic
        let decimalPart = this.invoice.invoiceTotal % 1;
        let roundOffAmount = 0;
        if (decimalPart < 0.5) {
          roundOffAmount = -decimalPart;
          this.invoice.invoiceTotal = Math.floor(this.invoice.invoiceTotal);
        } else {
          roundOffAmount = 1 - decimalPart;
          this.invoice.invoiceTotal = Math.ceil(this.invoice.invoiceTotal);
        }

        // Add round off amount to the invoice
        let formattedRoundOffAmount =
          (roundOffAmount > 0 ? '+' : '') + roundOffAmount.toFixed(2);
        this.invoice.roundOff = formattedRoundOffAmount;
        this.invoice.finalTotal =
          this.invoice.invoiceTotal + this.invoice.roundOff;

        this.invoice.items = JSON.parse(JSON.stringify(items));
      }

      resolve(this.invoice);
    });
  }
}
