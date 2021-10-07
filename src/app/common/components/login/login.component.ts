import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPasswordText: boolean;
  @ViewChild('password') passwordInput: ElementRef;
  showEye: any = '../../../assets/images/eye-show.svg';
  hideEye: any = '../../../assets/images/eye-hide.svg';
  isLoggingIn: boolean;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onShowPassword() {
    this.showPasswordText = !this.showPasswordText;
    // this.passwordInput.nativeElement.focus();
  }

  login() {
    if (this.loginForm.valid) {
      let loginObj = {
        userName: this.loginForm.value['email'],
        password: this.loginForm.value['password'],
      };
      this.isLoggingIn = true;
      console.log(loginObj);
      this.authService.login(loginObj).subscribe(
        (res: any) => {
          console.log(res);
          console.log(res.status);
          if (res?.userId) {
            this.showToast(200);
            sessionStorage.setItem('cur_user', JSON.stringify(res));
            this.router.navigate(['/companies']);
          } else {
          }
        },
        (error) => {
          this.isLoggingIn = false;
          console.log(error);
          this.showToast(400);
          // this.loginForm.reset();
        }
      );
    }
  }

  showToast(code) {
    if (code === 400) {
      this.messageService.add({
        key: 'tl',
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid username/password',
      });
    } else if (code === 200) {
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Success',
        detail: 'Login Successful',
      });
    }
  }

  gotoResetPwd() {
    this.router.navigate(['reset-password']);
  }
}
