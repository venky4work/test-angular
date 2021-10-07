import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-create-pwd',
  templateUrl: './create-pwd.component.html',
  styleUrls: ['./create-pwd.component.scss'],
  providers: [MessageService],
})
export class CreatePwdComponent implements OnInit {
  createPwdForm: FormGroup;
  isLoading: boolean;
  showNewPasswordText: boolean;
  showConfirmPasswordText: boolean;
  @ViewChild('password1') newPasswordInput: ElementRef;
  @ViewChild('password2') confirmPasswordInput: ElementRef;
  showEye: any = '../../../assets/images/eye-show.svg';
  hideEye: any = '../../../assets/images/eye-hide.svg';
  passwordMismatch: boolean;
  userId: any;
  disableSubmit: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticateService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('u_id');
    this.createPwdForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  onShowNewPassword() {
    this.showNewPasswordText = !this.showNewPasswordText;
  }

  onShowConfirmPassword() {
    this.showConfirmPasswordText = !this.showConfirmPasswordText;
  }

  onChangePwd() {
    if (
      this.createPwdForm.value.confirmPassword !=
      this.createPwdForm.value.newPassword
    ) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }

  onNewChangePwd() {
    if (
      this.createPwdForm.value.confirmPassword !=
      this.createPwdForm.value.newPassword
    ) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
    }
  }

  goBack() {
    this.router.navigateByUrl('/enter-otp');
  }

  resetPassword() {
    this.disableSubmit = true;
    this.isLoading = true;
    let otp = (parseInt(sessionStorage.getItem('otp')) * 3)
      .toString()
      .substr(0, 4);
    let pwdObj = {
      userId: Number(this.userId),
      newPassWord: this.createPwdForm.value.confirmPassword,
      confirmOTP: Number(otp),
    };

    console.log(pwdObj);
    this.authService
      .resetPassword(pwdObj)
      .toPromise()
      .then(
        (res: any) => {
          console.log(res);
          if (res) {
            this.isLoading = false;
            this.createPwdForm.reset();
            sessionStorage.clear();
            this.showToast(200);
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 2000);
          }
        },
        (error) => {
          this.isLoading = false;
          this.showToast(400);
        }
      );
  }

  showToast(code) {
    if (code === 400) {
      this.messageService.add({
        key: 'tl',
        severity: 'error',
        summary: 'Error',
        detail: 'There was an error changing password, please try again',
      });
    } else if (code === 200) {
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Success',
        detail: 'Your password has been reset successfully.',
      });
    }
  }
}
