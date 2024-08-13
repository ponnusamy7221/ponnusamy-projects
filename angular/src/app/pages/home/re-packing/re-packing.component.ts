import { Component } from '@angular/core';
import { AppService } from '../../../app.service';
import { MatRipple } from '@angular/material/core';
import { MenuButtonComponent } from '../../../common/templates/menu-button/menu-button.component';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-re-packing',
  standalone: true,
  imports: [MatRipple, MenuButtonComponent, RouterModule, NgClass],
  templateUrl: './re-packing.component.html',
  styleUrl: './re-packing.component.scss',
})
export class RePackingComponent {
  constructor(public appService: AppService) {
    this.appService.isDefaultLayout.set(false);
  }
}
