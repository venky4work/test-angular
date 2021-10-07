import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  getAllCompany() {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.get(`${environment.API}/company`, { headers });
  }

  addCompany(companyObj) {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.post(`${environment.API}/company`, companyObj, {
      headers,
    });
  }

  getCompanyById(companyId) {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.get(`${environment.API}/company/${companyId}`, {
      headers,
    });
  }

  updateCompanyById(companyId, companyObj) {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.put(
      `${environment.API}/company/${companyId}`,
      companyObj,
      { headers }
    );
  }

  deleteCompanyById(companyId) {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.delete(`${environment.API}/company/${companyId}`, {
      headers,
    });
  }

  getCompanyDashboard() {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.get(`${environment.API}/company/dashboard`, { headers });
  }

  updateCompanyLogo(companyObj) {
    let headers = new HttpHeaders();
    const userToken = JSON.parse(sessionStorage.getItem('cur_user'))?.token;
    headers = headers.set('Authorization', 'bearer ' + userToken);
    return this.http.post(
      `${environment.API}/company/CompanyLogo`,
      companyObj,
      {
        headers,
      }
    );
  }
}
