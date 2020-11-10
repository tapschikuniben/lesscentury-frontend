import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from '../services/notifier.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: any = {};
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';
  public roles: string[] = [];
  public loading = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private notifier: NotifierService,) { }

  hide = true;

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log('user data', this.roles)
        //this.reloadPage();
        let i = 0;
        for (i = 0; i <= this.roles.length; i++) {
          if (this.roles[i] === 'ROLE_ADMIN') {
            console.log('This is Admin')
            const url = `/dashboard`;
            this.router.navigate([url]);
            this.notifier.Notification("success", "successfully logged as Admin");
          } else if (this.roles[i] === 'ROLE_USER') {
            const url = `/home`;
            this.router.navigate([url]);
            this.notifier.Notification("success", "successfully logged in")
          } else if (this.roles[i] === 'ROLE_MODERATOR') {
          }
        }

        if (this.roles.includes('ROLE_MODERATOR')) {
        }

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.notifier.Notification("warning", "Failed to Login (Enter Correct Username or Password)");
        this.loading = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
