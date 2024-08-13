import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppSettingsService } from './common/services/app-settings/app-settings.service';
import { FullSpinnerInterceptor } from './common/full-spinner/full-spinner.interceptor';
import { FullSpinnerService } from './common/full-spinner/full-spinner.service';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { DecimalPipe } from '@angular/common';

export const appSettingFactory = (configService: AppSettingsService) => {
  return () => configService.loadConfig();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: 'Chennai_exports',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
      })
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingFactory,
      deps: [AppSettingsService],
      multi: true,
    },
    FullSpinnerService,
    DecimalPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FullSpinnerInterceptor,
      multi: true,
    },
  ],
};
