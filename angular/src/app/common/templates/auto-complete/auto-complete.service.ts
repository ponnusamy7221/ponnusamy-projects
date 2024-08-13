import {
  ConnectionPositionPair,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { fromEvent, filter, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoCompleteService {
  private overlayRef!: OverlayRef;
  isOpen = false;

  constructor(private overlay: Overlay) {}

  private getOverlayPosition(origin: any) {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      ),
    ];
    return this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }
  openDropdown(origin: any, xtemplate: any, viewRef: any) {
    this.overlayRef = this.overlay.create({
      width: origin.offsetWidth > 200 ? origin.offsetWidth : 200,
      maxHeight: 40 * 6,
      minHeight: 40 * 4,
      panelClass: 'auto-dropdown',
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition(origin),
    });

    const template = new TemplatePortal(xtemplate, viewRef);
    this.overlayRef.attach(template);
    this.isOpen = true;
    overlayClickOutside(this.overlayRef, origin).subscribe(() => this.close());
  }

  close() {
    this.isOpen = false;
    this.overlayRef.detach();
  }
}
export function overlayClickOutside(
  overlayRef: OverlayRef,
  origin: HTMLElement
) {
  return fromEvent<MouseEvent>(document, 'click').pipe(
    filter((event) => {
      const clickTarget = event.target as HTMLElement;
      const notOrigin = clickTarget !== origin;
      const notOverlay =
        !!overlayRef &&
        overlayRef.overlayElement.contains(clickTarget) === false;
      return notOrigin && notOverlay;
    }),
    takeUntil(overlayRef.detachments())
  );
}
