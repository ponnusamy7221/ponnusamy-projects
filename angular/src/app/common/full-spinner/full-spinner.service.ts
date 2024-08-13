import { Injectable } from '@angular/core';
import {
  FullSpinnerComponent,
  EmptySpinnerComponent,
} from './full-spinner.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { defer, NEVER, Subject } from 'rxjs';
import { map, scan, finalize, share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FullSpinnerService {
  private spinnerTopRef = this.cdkSpinnerCreate();
  private spinnerTopRefLight = this.cdkSpinnerCreateLight();
  spin: Subject<boolean> = new Subject();
  empty: Subject<boolean> = new Subject();

  constructor(private overlay: Overlay, public router: Router) {
    this.spin
      .asObservable()
      .pipe(
        map((val) => (val ? 1 : -1)),
        scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
      )
      .subscribe((res) => {
        if (res === 1) {
          this.showSpinner();
        } else if (res === 0) {
          this.spinnerTopRef.hasAttached() ? this.stopSpinner() : null;
        }
      });

    this.empty
      .asObservable()
      .pipe(
        map((val) => (val ? 1 : -1)),
        scan((acc, one) => (acc + one >= 0 ? acc + one : 0), 0)
      )
      .subscribe((res) => {
        if (res === 1) {
          this.showEmptySpinner();
        } else if (res === 0) {
          this.spinnerTopRefLight.hasAttached()
            ? this.stopEmptySpinner()
            : null;
        }
      });
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
  }

  private cdkSpinnerCreateLight() {
    return this.overlay.create({
      width: '100%',
      hasBackdrop: true,
      backdropClass: 'no-backdrop',
      panelClass: this.router.url === '/login' ? 'no-panel-pad' : '',
      positionStrategy: this.overlay.position().global(),
    });
  }

  private showEmptySpinner() {
    if (!this.spinnerTopRefLight.hasAttached()) {
      this.spinnerTopRefLight.attach(
        new ComponentPortal(EmptySpinnerComponent)
      );
    }
  }

  private showSpinner() {
    if (!this.spinnerTopRef.hasAttached()) {
      this.spinnerTopRef.attach(new ComponentPortal(FullSpinnerComponent));
    }
  }

  private stopSpinner() {
    if (this.spinnerTopRef.hasAttached()) {
      this.spinnerTopRef.detach();
    }
  }

  private stopEmptySpinner() {
    if (this.spinnerTopRefLight.hasAttached()) {
      this.spinnerTopRefLight.detach();
    }
  }

  public readonly emptySpinner = defer(() => {
    this.showEmptySpinner();

    return NEVER.pipe(
      finalize(() => {
        if (this.spinnerTopRefLight?.hasAttached()) {
          this.stopEmptySpinner();
        } else {
          console.warn(
            'spinnerTopRefLight is undefined or hasAttached is false'
          );
        }
      })
    );
  }).pipe(share());
}
