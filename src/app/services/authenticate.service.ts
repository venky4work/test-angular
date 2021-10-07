import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private http: HttpClient) {}

  login(loginObj) {
    return this.http.post(`${environment.API}/admin/login`, loginObj);
  }

  sendOTPToEmail(value) {
    return this.http.patch(`${environment.API}/admin/forgetpassword`, value);
  }

  resetPassword(otpObject) {
    return this.http.put(`${environment.API}/admin/ResetPassword`, otpObject);
  }

  logout() {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.get(`${environment.API}/admin/logout`, { headers });
  }

  resendOTP(userId) {
    return this.http.get(`${environment.API}/admin/resendOTP?userId=${userId}`);
  }
}
