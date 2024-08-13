import { Component } from '@angular/core';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent {
  constructor(public appService: AppService) {
    // this.appService.isNoMenu.set(true)
     this.appService.screens = [
       {
         name: 'Order',
       },
       {
         name: 'View',
       },
     ];
  }
}
