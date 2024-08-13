import { NgClass } from '@angular/common';
import { Component, OnInit, Optional, Self } from '@angular/core';
import { Control } from '../form-control';
import { FormsModule, NgControl } from '@angular/forms';
import { NumberOnlyDirective } from '../../directives/number-only/number-only.directive';


@Component({
  selector: 'app-number-control',
  standalone: true,
  imports: [NgClass,FormsModule, NumberOnlyDirective, FormsModule],
  templateUrl: './number-control.component.html',
  styleUrl: './number-control.component.scss',
})
export class NumberControlComponent extends Control implements OnInit {
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.setValidate(this.control)
  }
}
