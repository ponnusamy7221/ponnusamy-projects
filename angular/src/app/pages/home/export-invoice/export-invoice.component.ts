import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuButtonComponent } from '../../../common/templates/menu-button/menu-button.component';
import { AppService } from '../../../app.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-export-invoice',
  standalone: true,
  imports: [RouterModule, MenuButtonComponent, NgClass],
  templateUrl: './export-invoice.component.html',
  styleUrl: './export-invoice.component.scss',
})
export class ExportInvoiceComponent {
  constructor(public appService: AppService) {
    this.appService.isDefaultLayout.set(false);
    this.appService.isNoMenu.set(false);
  }
}
