import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-approve',
  standalone: true,
  imports: [],
  templateUrl: './approve.component.html',
  styleUrl: './approve.component.scss',
})
export class ApproveComponent {
  msg: string = 'Are you sure ?';

  constructor(
    public dialogRef: MatDialogRef<ApproveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.msg && data.msg !== '') {
      this.msg = data.msg;
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  yes() {
    this.dialogRef.close(true);
  }
}
