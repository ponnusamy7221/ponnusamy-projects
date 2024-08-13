import { Injectable } from '@angular/core';
import { ApiService } from '../../api-services/api.service';

@Injectable({
  providedIn: 'root',
})
export class IntialDataService {
  orderInitialData: any = {
    DDlAllWareHouse: [],
  };

  constructor(public api: ApiService) {}

  getOrderInitialData(): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.getInitialDataForOrder().subscribe((success) => {
        success.data.forEach((element: any) => {
          this.orderInitialData[element.key] = element.value;
        });
      });

      resolve(true);
    });
  }
}
