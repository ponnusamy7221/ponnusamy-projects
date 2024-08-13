import { Component, OnInit, Optional, Self } from '@angular/core';
import { Control } from '../form-control';
import { FormsModule, NgControl } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AppFormErrorPipe } from '../form-error-message';

@Component({
  selector: 'app-input-control',
  standalone: true,
  imports: [NgClass, FormsModule, AppFormErrorPipe],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.scss',
})
export class InputControlComponent extends Control implements OnInit {
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }
}
