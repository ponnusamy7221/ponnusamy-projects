import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FullSpinnerService } from './full-spinner.service';

@Component({
  selector: 'app-full-spinner',
  standalone: true,
  imports: [CommonModule, OverlayModule, MatProgressBarModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './full-spinner.component.html',
  styleUrl: './full-spinner.component.scss',
})
export class FullSpinnerComponent {}

@Component({
  selector: 'app-empty-spinner',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule, OverlayModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<div class="p-box pt68">
    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  </div>`,
  styleUrls: ['./full-spinner.component.scss'],
})
export class EmptySpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
