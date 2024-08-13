import { Component, OnInit, Optional, Self } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { Control } from '../form-control';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
})
export class TextAreaComponent extends Control implements OnInit {
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }
}
