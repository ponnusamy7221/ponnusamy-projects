import { Component } from '@angular/core';
import { AppService } from '../../../app.service';
import { InputControlComponent } from '../../../common/form-control/input-control/input-control.component';
import { RouterModule } from '@angular/router';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [InputControlComponent, RouterModule, MatRipple],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
})
export class MasterComponent {
  constructor(public appService: AppService) {
    this.appService.isDefaultLayout.set(true);
    this.appService.screens = [
      {
        name: 'Master',
      },
    ];
  }
}
