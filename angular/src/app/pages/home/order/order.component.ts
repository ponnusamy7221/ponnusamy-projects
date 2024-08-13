import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuButtonComponent } from '../../../common/templates/menu-button/menu-button.component';
import { AppService } from '../../../app.service';
import { MatRipple } from '@angular/material/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterModule, MenuButtonComponent, MatRipple, NgClass],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  constructor(public appService: AppService) {
    this.appService.isDefaultLayout.set(false);
  }
}
