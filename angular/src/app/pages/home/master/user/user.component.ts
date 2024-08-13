import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { InputControlComponent } from '../../../../common/form-control/input-control/input-control.component';
import { DataService } from '../../../../common/services/data/data.service';
import { ApiService } from '../../../../common/api-services/api.service';
import { AppService } from '../../../../app.service';
import {
  protoUser,
  searchParams,
  user,
} from '../../../../common/api-services/app.classes';
import { SlideDialogService } from '../../../../common/templates/slide-dialog/slide-dialog.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatRipple, FormsModule, InputControlComponent, NgClass],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user = new protoUser();
  searchResult: any[] = [];
  searchParams = new searchParams();
  errorTrue: boolean = false;
  @ViewChild('l', { static: false }) lform!: NgForm;
  type: string = '';
  @ViewChild('userTemplate', { static: true })
  userTemplate!: TemplateRef<any>;
  constructor(
    private data: DataService,
    private api: ApiService,
    private appService: AppService,
    private slideDialog: SlideDialogService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.data.checkToken();
    this.search();
  }

  search() {
    this.searchParams.pageNumber = 1;
    this.searchParams.rowPerPage = 100;
    this.result(true);
  }

  result(val: any, options?: any) {
    this.api.searchUser(this.searchParams).subscribe((success) => {
      this.searchResult = success.plstprotoUserSearchResultSet;
    });
  }

  save() {
    if (this.type === 'new') {
      this.saveUser();
    } else {
      this.updateUser();
    }
  }

  saveUser() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.saveUser(this.user).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Saved Successfully');
        this.slideClose();
      });
    } else {
      this.errorTrue = true;
    }
  }

  updateUser() {
    if (this.lform.valid) {
      this.errorTrue = false;
      this.api.updateUser(this.user).subscribe((success) => {
        console.log(success);
        this.data.successMessage('User Updated Successfully');
        this.slideClose();
      });
    } else {
      this.errorTrue = true;
    }
  }

  openUser(id: any) {
    this.type = 'edit';
    const obj = {
      data: id,
    };
    this.api.openUser(obj).subscribe((success) => {
      this.user = success;
      this.openDialog();
      this.data.successMessage('User Data Opened Successfully');
    });
  }

  createUser() {
    this.type = 'new';
    this.openDialog();
  }

  openDialog() {
    this.data.slideDialogRef = this.slideDialog.open({
      data: {
        template: this.userTemplate,
      },
    });
  }

  slideClose() {
    this.data.slideDialogRef.close();
  }
}
