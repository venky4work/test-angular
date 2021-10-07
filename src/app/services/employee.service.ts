import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  addEmployeeImage(imageObj) {
    return this.http.get(`${environment.API}/Employee/EmployeeImage`, imageObj);
  }

  getAllEmployees() {
    return this.http.get(`${environment.API}/Employee`);
  }

  addEmployee(empObj) {
    return this.http.post(`${environment.API}/Employee`, empObj);
  }

  updateEmployee(empObj) {
    return this.http.put(`${environment.API}/Employee`, empObj);
  }

  deleteCompanyById(empId) {
    return this.http.delete(`${environment.API}/Employee/`, empId);
  }

  getEmployeeByCompanyId(companyId) {
    return this.http.get(`${environment.API}/Employee/company`, companyId);
  }
}
