import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss'],
  providers: [MessageService],
})
export class ResetPwdComponent implements OnInit {
  passwordReset: FormGroup;
  otp: any;
  currentUserId: any;
  disableSubmit: boolean;

  constructor(
    public router: Router,
    private authService: AuthenticateService,
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.passwordReset = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  resetPassword() {
    if (this.passwordReset.valid) {
      this.disableSubmit = true;
      let value = { email: this.passwordReset.value.email };
      sessionStorage.setItem('email', this.passwordReset.value.email);

      // this.dataService.userEmail.next(this.passwordReset.value.email);
      this.authService
        .sendOTPToEmail(value)
        .toPromise()
        .then(
          (res: any) => {
            console.log(res);
            if (res?.userId) {
              // this.currentUserId = res?.userId;
              // this.otp = res?.otp;
              // this.dataService.userId.next(res?.userId);
              // this.dataService.actualOtp.next(res?.otp);
              sessionStorage.setItem('u_id', res?.userId);
              sessionStorage.setItem('otp', res?.otp);
              this.disableSubmit = false;
              this.showToast(200);
              setTimeout(() => {
                this.router.navigate(['enter-otp']);
              }, 2000);
            }
          },
          (error) => {
            this.disableSubmit = false;
            this.showToast(400);
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
        detail: 'Please enter valid Email ID',
      });
    } else if (code === 200) {
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Success',
        detail: 'OTP is sent to your email successfully',
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }
}
