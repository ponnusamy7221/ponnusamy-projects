import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputControlComponent } from '../../common/form-control/input-control/input-control.component';
import { PasswordControlComponent } from '../../common/form-control/password-control/password-control.component';
import { ApiService } from '../../common/api-services/api.service';
import { loginCredentials } from '../../common/api-services/app.classes';
import { finalize } from 'rxjs';
import { AppService } from '../../app.service';
import { AppStorageService } from '../../common/services/app-storage/app-storage.service';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../common/services/data/data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    InputControlComponent,
    PasswordControlComponent,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credential = new loginCredentials();
  errorTrue: boolean = false;

  constructor(
    private apiService: ApiService,
    public appService: AppService,
    public storage: AppStorageService,
    public router: Router,
    private data: DataService
  ) {}

  login(l: any) {
    if (l.valid) {
      this.errorTrue = false;
      this.apiService
        .authenticateUser(this.credential)
        .pipe(finalize(() => {}))
        .subscribe((success) => {
          this.appService.user = success;
          this.data.successMessage('Login Successfully');
          this.storage.set('userData', this.appService.user);
          this.router.navigateByUrl('/home/dashboard');
        });
    } else {
      this.errorTrue = true;
    }
  }
}
