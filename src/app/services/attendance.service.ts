import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  getAttendance(attendId) {
    return this.http.get(`${environment.API}/Attendance/`, attendId);
  }

  updateAttendance(attendObj) {
    return this.http.put(`${environment.API}/Attendance`, attendObj);
  }

  deleteAttendance(attendId) {
    return this.http.delete(`${environment.API}/Attendance/`, attendId);
  }

  getAttendanceType(attendObj) {
    return this.http.get(`${environment.API}/Attendance/`, attendObj);
  }
}
