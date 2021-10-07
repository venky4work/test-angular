import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}

  getLeaveType(leavetypeId) {
    return this.http.get(`${environment.API}/LeaveType/`, leavetypeId);
  }

  updateLeaveType(leaveTypeObj) {
    return this.http.put(`${environment.API}/LeaveType`, leaveTypeObj);
  }

  deleteLeaveType(leavetypeId) {
    return this.http.delete(`${environment.API}/LeaveType/`, leavetypeId);
  }

  addLeaveType(leaveTypeObj) {
    return this.http.post(`${environment.API}/LeaveType`, leaveTypeObj);
  }
}
