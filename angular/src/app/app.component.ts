import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStorageService } from './common/services/app-storage/app-storage.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'chennai_exports';
  constructor(public storage: AppStorageService) {}

  ngOnInit(): void {
    this.storage.init();
  }
}
