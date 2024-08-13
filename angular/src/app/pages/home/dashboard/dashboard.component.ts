import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from '../../../app.service';
import { ErrorComponent } from '../../../common/error/error/error.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { SelectControlComponent } from '../../../common/form-control/select-control/select-control.component';
import { FormsModule } from '@angular/forms';
import { CustomerSearchComponent } from '../../../common/search-template/customer-search/customer-search.component';
import { ApiService } from '../../../common/api-services/api.service';
import { DataService } from '../../../common/services/data/data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    ErrorComponent,
    BaseChartDirective,
    SelectControlComponent,
    FormsModule,
    CustomerSearchComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  customerName: string = '';
  customerId: number = 0;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: 'rgba(114,43,226,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.2,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        position: 'left',
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  isBrowser: boolean = false;

  years: any[] = [];
  currentYear: any = new Date().getFullYear();
  dashboardData: any;

  constructor(
    private api: ApiService,
    private data: DataService,
    public appService: AppService,
    @Inject(PLATFORM_ID) private platformId: boolean,
    private cdf: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.appService.isDefaultLayout.set(true);
    this.appService.screens = [
      {
        name: 'Dashboard',
      },
    ];
  }
  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.generateYearList(1900, new Date().getFullYear());
    this.getOrderDetailsForDashboard();
    this.getOrdersDetailsMonthWise();
  }

  generateYearList(startYear: number, endYear: number): void {
    for (let year = startYear; year <= endYear; year++) {
      let data = {
        id: year,
        name: year.toString(),
      };
      this.years.push(data);
    }
  }

  selectCustomer(event: any) {
    if (event) {
      this.customerId = event.id;
      this.customerName = event.name;
      this.getOrderDetailsForDashboard();
    }
  }

  getOrderDetailsForDashboard() {
    const obj = {
      data: this.customerId,
    };
    this.api.getOrdersDetailsForDashBoard(obj).subscribe((success) => {
      this.dashboardData = JSON.parse(success.data);
    });
  }

  selectYear() {
    this.getOrdersDetailsMonthWise();
  }

  getOrdersDetailsMonthWise() {
    const obj = {
      string1: this.currentYear,
      string2: '',
      string3: '',
      long1: 0,
      long2: 0,
      int1: 0,
      int2: 0,
    };
    this.api.getOrdersDetailsMonthWise(obj).subscribe((success) => {
      this.lineChartData.datasets[0].data = success.datasets[0].data;
      this.lineChartData.labels = success.labels;
      this.cdf.detectChanges();
      this.chart?.update();
    });
  }
}
