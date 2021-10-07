import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PayService {
  constructor(private http: HttpClient) {}

  getPayComponent(payComponentId) {
    return this.http.get(`${environment.API}/PayComponent/`, payComponentId);
  }

  updatePayComponent(payComponentObj) {
    return this.http.put(`${environment.API}/PayComponent`, payComponentObj);
  }

  deletePayComponent(payComponentId) {
    return this.http.delete(`${environment.API}/PayComponent/`, payComponentId);
  }

  addPayComponent(payComponentObj) {
    return this.http.post(`${environment.API}/PayComponent`, payComponentObj);
  }

  updatePayComponentStatusById(payComponentId) {
    return this.http.put(
      `${environment.API}/PayComponent/Update/`,
      payComponentId
    );
  }
}
