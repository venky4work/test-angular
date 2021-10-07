import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('cur_user');
    if (this.currentUser) {
      // this.router.navigate(['/companies']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
