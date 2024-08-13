import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApproveComponent } from './approve/approve.component';
import { DeleteComponent } from './delete/delete.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public dialog: MatDialog) {}

  async approveAlert(msg: string): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ApproveComponent, {
        position: {
          bottom: '1rem',
          right: '1rem',
        },
        width: '450px',
        disableClose: true,
        data: {
          msg: msg,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        resolve(result);
      });
    });
  }

  async deleteAlert(msg: string): Promise<boolean> {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(DeleteComponent, {
        position: {
          bottom: '1rem',
          right: '1rem',
        },
        width: '450px',
        disableClose: true,
        data: {
          msg: msg,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        resolve(result);
      });
    });
  }
}
