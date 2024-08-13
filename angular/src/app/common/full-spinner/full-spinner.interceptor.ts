import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { FullSpinnerService } from './full-spinner.service';
import { Injectable } from '@angular/core';
import { Observable, Subscription, finalize } from 'rxjs';

@Injectable()
export class FullSpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly fullSpinner: FullSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let spinnerSubscription: Subscription;
    if (req.headers.get('spinner') === 'true') {
      req = req.clone({ headers: req.headers.delete('spinner') });
      spinnerSubscription = this.fullSpinner.emptySpinner.subscribe();
    }
    return next.handle(req).pipe(
      finalize(() => {
        if (spinnerSubscription) {
          spinnerSubscription.unsubscribe();
        }
      })
    );
  }
}
