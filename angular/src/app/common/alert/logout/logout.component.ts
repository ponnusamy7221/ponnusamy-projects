import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatRipple],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  constructor(public dialogRef: MatDialogRef<LogoutComponent>) {}

  close(): void {
    this.dialogRef.close(false);
  }

  yesLogout() {
    this.dialogRef.close(true);
  }
}
