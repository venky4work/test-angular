import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import * as  from 'events';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchKey: any;
  @Output() logoutConfirm = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  viewProfile() {}

  logout() {
    this.logoutConfirm.emit(true);
  }
}
