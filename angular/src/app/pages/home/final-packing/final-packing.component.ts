import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { MenuButtonComponent } from '../../../common/templates/menu-button/menu-button.component';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../common/api-services/api.service';
import {
  finalPackingSearchResult,
  searchParams,
} from '../../../common/api-services/app.classes';
import { DataService } from '../../../common/services/data/data.service';
import { FormsModule } from '@angular/forms';
import { InputControlComponent } from '../../../common/form-control/input-control/input-control.component';

@Component({
  selector: 'app-final-packing',
  standalone: true,
  imports: [
    MenuButtonComponent,
    RouterModule,
    FormsModule,
    InputControlComponent,
  ],
  templateUrl: './final-packing.component.html',
  styleUrl: './final-packing.component.scss',
})
export class FinalPackingComponent implements OnInit {
  searchParams = new searchParams();
  searchResult = new finalPackingSearchResult();

  constructor(
    public appService: AppService,
    public api: ApiService,
    public data: DataService
  ) {
    this.appService.isNoMenu.set(false);
    this.appService.isDefaultLayout.set(false);
    this.appService.screens = [
      {
        name: 'Final Packing',
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
    this.api.searchFinalPacking(this.searchParams).subscribe((success) => {
      this.searchResult = success;
    });
  }

  searchInput() {
    const options = {
      hideErrorMethod: true,
      hideFullSpinner: true,
      type: '',
    };
    this.api
      .searchFinalPacking(this.searchParams, options)
      .subscribe((success) => {
        this.searchResult = success;
      });
  }
}
