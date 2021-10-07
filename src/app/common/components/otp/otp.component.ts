import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [MessageService],
})
export class OtpComponent implements OnInit {
  userEmail: any;
  sentOtp: number;
  userId: any;
  enteredOtp: any;
  disableSubmit: boolean = true;
  resendingOtp: boolean;
  invalidOtp: boolean;

  constructor(
    public route: Router,
    private authService: AuthenticateService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userEmail = sessionStorage.getItem('email');
    this.userId = sessionStorage.getItem('u_id');
    this.sentOtp = Number(sessionStorage.getItem('otp'));
  }

  goBack() {
    this.route.navigateByUrl('/reset-password');
  }

  onOtpChange(e) {
    if (e.length === 4) {
      this.enteredOtp = e;
      this.disableSubmit = false;
      this.invalidOtp = false;
    } else {
      this.disableSubmit = true;
      this.invalidOtp = true;
    }
  }

  verifyOtp() {
    console.log(this.enteredOtp);
    let recievedOtp = (this.sentOtp * 3).toString().substr(0, 4);
    console.log(recievedOtp);
    if (Number(this.enteredOtp) === Number(recievedOtp)) {
      this.disableSubmit = true;
      this.showToast(200);
      setTimeout(() => {
        this.route.navigateByUrl('/create-pwd');
      }, 2000);
    } else {
      // this.showToast(400);
      this.invalidOtp = true;
      this.disableSubmit = false;
    }
  }

  resendOtp() {
    this.resendingOtp = true;
    this.authService
      .resendOTP(this.userId)
      .toPromise()
      .then(
        (res: any) => {
          console.log(res);
          if (res) {
            this.resendingOtp = false;
            this.showToast(201);
          }
        },
        (error) => {
          this.resendingOtp = false;
        }
      );
  }

  showToast(code) {
    if (code === 400) {
      this.messageService.add({
        key: 'tl',
        severity: 'error',
        summary: 'Error',
        detail: 'The OTP you entered is incorrect, please try again',
      });
    } else if (code === 200) {
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Success',
        detail: 'OTP validated successfully',
      });
    } else if (code === 201) {
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Success',
        detail: 'OTP resent successfully',
      });
    }
  }
}
