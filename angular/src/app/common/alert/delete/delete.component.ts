import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  msg: string = 'Are you sure ?';

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
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
