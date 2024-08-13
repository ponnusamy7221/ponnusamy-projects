import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  public environment: any = {
    basePath: '',
    accountsPath: '',
    baseAppPath: '',
    imagePath: '',
    encrypt: false,
    maxFileSize: 0,
    fileSizeErrorMsg: '',
    fileAccept: '',
    serverDateFormat: '',
    serverDateFormatWithTime: '',
    dateViewFormat: '',
    dateViewFormatWithTime: '',
    monthviewFormatWithTime: '',
  };

  constructor(private http: HttpClient) {}

  async loadConfig() {
    try {
      let d = new Date();
      let n = d.getTime();
      const response = await this.http
        .get(`./app.settings.json?v=${n}`)
        .toPromise();
      this.environment = response;
    } catch (error) {
      console.error('Failed to load configuration:', error);
    }
  }
}
