import { Injectable } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ErrorComponent } from './error/error.component';
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private overlayRef!: OverlayRef;
  closing = false;
  isExpanded = false;
  bottomValue = '0px';
  panelClass = 'message-box-expanded';
  backdropClass = 'bg-message';
  hasBackdrop = true;
  message = true;
  errorMessage = true;
  warningMessage = false;
  infoMessage = false;
  messageViewRefContainer: any;

  constructor(private overlay: Overlay) {}

  expandMessageBox(val: number) {
    if (this.overlayRef) {
      if (!this.overlayRef.hasAttached()) {
        this.createOverlay(val);
      } else {
        this.detachOverlay();
      }
    } else {
      this.createOverlay(val);
    }
  }

  closeErrorMessageBox() {
    this.detachOverlay();
  }

  createOverlay(val: number) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()
      .bottom('0.5rem')
      .left('0')
      .right('0.5rem');
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: this.hasBackdrop,
      panelClass: this.panelClass,
      backdropClass: this.backdropClass,
    });
    this.overlayRef.backdropClick().subscribe((_) => this.detachOverlay());
    this.errorMessage = true;
    this.attachOverlay();
  }

  attachOverlay(val?: undefined): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new ComponentPortal(
        ErrorComponent,
        this.messageViewRefContainer
      );
      this.isExpanded = true;
      this.overlayRef.attach(periodSelectorPortal);
    } else {
      this.detachOverlay();
    }
  }

  detachOverlay(): void {
    if (this.overlayRef) {
      // this.isOpen = false;
      if (this.overlayRef.hasAttached()) {
        this.closing = true;
        this.overlayRef.detach();
        this.isExpanded = false;
        this.closing = false;
        setTimeout(() => {
          this.overlayRef.dispose();
        }, 50);
      }
    }
  }

  setErrorMessageView(val: number) {
    this.errorMessage = true;
  }

  allFalse() {
    this.errorMessage = false;
  }

  toggle() {
    this.closing = !this.closing;
  }
}
