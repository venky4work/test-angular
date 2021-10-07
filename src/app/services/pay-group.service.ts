import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PayGroupService {
  constructor(private http: HttpClient) {}

  getPayGroup(payGroupId) {
    return this.http.get(`${environment.API}/PayGroup/`, payGroupId);
  }

  updatePayGroup(payGroupObj) {
    return this.http.put(`${environment.API}/PayGroup`, payGroupObj);
  }

  deletePayGroup(payGroupId) {
    return this.http.delete(`${environment.API}/PayGroup/`, payGroupId);
  }

  addPayGroup(payGroupObj) {
    return this.http.post(`${environment.API}/PayGroup`, payGroupObj);
  }

  updatePayGroupStatusById(payGroupId) {
    return this.http.put(`${environment.API}/PayGroup/Update/`, payGroupId);
  }
}
