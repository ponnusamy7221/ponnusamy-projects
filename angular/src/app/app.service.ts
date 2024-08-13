import { Injectable, signal } from '@angular/core';
import { subConfig, user } from './common/api-services/app.classes';
import { ApiService } from './common/api-services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  isDefaultLayout = signal(false);
  isNoMenu = signal(false);
  screens: any[] = [];
  constructor(private api: ApiService) {}
  user = new user();
  backUrl: string = '';
  subConfig = new subConfig();

  // subConfig

  createSubConfig() {
    return new Promise((resolve) => {
      this.api.createSubconfig().subscribe((success) => {
        resolve(this.subConfig);
      });
    });
  }

  saveSubConfig(data: any) {
    return new Promise((resolve) => {
      this.api.saveSubconfig(data).subscribe((success) => {
        this.subConfig = success;
        resolve(true);
      });
    });
  }
}
