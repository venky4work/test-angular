import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByComapnyRole(companyRoleObj) {
    return this.http.get(`${environment.API}/user`, companyRoleObj);
  }

  getUserById(userId) {
    return this.http.get(`${environment.API}/user/${userId}`);
  }

  updateUser(userId, userObj) {
    return this.http.put(`${environment.API}/user/${userId}`, userObj);
  }

  deleteUserById(userId) {
    return this.http.delete(`${environment.API}/user?userId=`, userId);
  }

  addUser(userObj) {
    return this.http.post(`${environment.API}/user`, userObj);
  }

  updateUserImage(imageObj) {
    return this.http.put(`${environment.API}/user/UserImage`, imageObj);
  }
}
