import { NgClass } from '@angular/common';
import { Component, OnInit, Optional, Self } from '@angular/core';
import { Control } from '../form-control';
import { FormsModule, NgControl } from '@angular/forms';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-password-control',
  standalone: true,
  imports: [NgClass, MatRipple, FormsModule],
  templateUrl: './password-control.component.html',
  styleUrl: './password-control.component.scss',
})
export class PasswordControlComponent extends Control implements OnInit {
  hide: boolean = true;
  type: string = 'password';
  constructor(@Self() @Optional() public control: NgControl) {
    super();
    this.control && (this.control.valueAccessor = this);
    this.xControl = this.control;
  }

  ngOnInit(): void {
    this.setValidate(this.control);
  }

  toggleType() {
    if (this.hide) {
      this.hide = false;
      this.type = 'text';
    } else {
      this.hide = true;
      this.type = 'password';
    }
  }
}
