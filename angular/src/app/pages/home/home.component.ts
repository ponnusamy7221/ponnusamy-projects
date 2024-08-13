import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../common/templates/header/header.component';
import { MenuButtonComponent } from '../../common/templates/menu-button/menu-button.component';
import { AppService } from '../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { AppStorageService } from '../../common/services/app-storage/app-storage.service';
import { AppSettingsService } from '../../common/services/app-settings/app-settings.service';
import { LogoutComponent } from '../../common/alert/logout/logout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MenuButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  baseAppPath = '';
  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    public storage: AppStorageService,
    public appSetting: AppSettingsService
  ) {
    this.baseAppPath = this.appSetting.environment.baseAppPath || '/';
  }

  confirmLogout() {
    const dialogRef = this.dialog.open(LogoutComponent, {
      disableClose: true,
      width: '450px',
      height: '250px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.logout();
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.storage.clear();
    window.location.assign(this.baseAppPath);
  }
}
