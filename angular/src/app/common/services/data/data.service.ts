import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings/app-settings.service';
import { Observable } from 'rxjs';
import { AppStorageService } from '../app-storage/app-storage.service';
import { SlideDialogOverlayRef } from '../../templates/slide-dialog/slide-dialog-overlay';
import { NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { message } from '../../api-services/app.classes';
import { ErrorService } from '../../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly defaultOptions: any = {
    hideErrorMethod: false,
    hideFullSpinner: false,
    hidejwt: false,
    type: '',
  };
  basePath: string = '';
  token: string = '';
  slideDialogRef!: SlideDialogOverlayRef;
  message = new message();

  constructor(
    private http: HttpClient,
    private appSetting: AppSettingsService,
    public storage: AppStorageService,
    public router: Router,
    private snackBar: MatSnackBar,
    private errorBox: ErrorService
  ) {
    this.basePath = this.appSetting.environment.basePath;
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        this.slideDialogRef?.close();
      }
    });
  }

  async getToken() {
    await this.storage.get('userData').then((val) => {
      if (val) {
        this.token = val.pprotoUser.keyToken;
      }
    });
  }

  checkToken(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.token !== '') {
        resolve(true);
      } else {
        await this.storage.get('userData').then((val) => {
          if (val) {
            this.token = val.pprotoUser.keyToken;
            resolve(true);
          }
        });
      }
    });
  }

  setOptions(options: any) {
    for (const opPath of Object.keys(this.defaultOptions)) {
      options[opPath] === undefined
        ? (options[opPath] = this.defaultOptions[opPath])
        : '';
    }
    return options;
  }

  get(path: any, options?: any): Observable<any> {
    let header = {};
    let basePath = this.basePath;

    header = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      Spinner: options.hideFullSpinner ? '' : 'true',
    });

    return this.http.get(basePath + path, { headers: header });
  }

  post(path: any, body: any, options?: any): Observable<any> {
    let header = {};
    let basePath = this.basePath;

    header = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
      Spinner: options.hideFullSpinner ? '' : 'true',
    });

    return this.http.post(basePath + path, body, { headers: header });
  }

  errorMessageOnly(msg: any) {
    this.constructErrorMsg(msg);
  }

  constructErrorMsg(val: any) {
    this.message.hasError = true;
    this.message.errorMessage = [];
    const obj = {
      msgID: 0,
      msgType: 0,
      msgDescription: val,
    };
    this.message.errorMessage.push(obj);
    setTimeout(() => {
      // this.messageBoxExpandTrue = true;
      this.errorBox.expandMessageBox(0);
    }, 400);
  }

  errorMethod(err: any) {
    switch (err.status) {
      case 400:
        this.message = err.error;
        setTimeout(() => {
          this.errorBox.expandMessageBox(0);
        }, 400);
        break;
    }
  }

  successMessage(msg: any) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['bg-primary'],
      duration: 3000,
    });
  }
}
