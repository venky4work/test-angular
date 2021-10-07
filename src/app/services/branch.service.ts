import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  addBranch(branchObj) {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.post(`${environment.API}/Branch`, branchObj, { headers });
  }

  updateBranch(branchObj) {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.put(`${environment.API}/Branch`, branchObj, { headers });
  }

  getCountries() {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.get(`${environment.API}/Country`, { headers });
  }
}
