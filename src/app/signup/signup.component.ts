import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from '../services/notifier.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private notifier: NotifierService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(() => {
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      this.notifier.Notification("success", "successfully signed up");
      const url = `/login`;
      this.router.navigate([url]);
    }, err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
      this.notifier.Notification("warning", "failed to signup");
    })
  }
}
