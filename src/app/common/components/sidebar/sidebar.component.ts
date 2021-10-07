import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  selectedValue = '';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateURL(type) {
    this.selectedValue = 'company';

    switch (type) {
      case 'user':
        // this.router.navigate(['/user-mgmt']);
        this.selectedValue = type;
        break;
      case 'company':
        this.selectedValue = type;
        this.router.navigate(['/companies']);

        break;
      case 'setup':
        // this.router.navigate(['/setup']);
        this.selectedValue = type;
        break;
      case 'dashboard':
        // this.router.navigate(['/setup']);
        this.selectedValue = type;
        break;
      case 'employee':
        // this.router.navigate(['/setup']);
        this.selectedValue = type;
        break;
      case 'payroll':
        // this.router.navigate(['/setup']);
        this.selectedValue = type;
        break;
      case 'reports':
        // this.router.navigate(['/setup']);
        this.selectedValue = type;
        break;
    }
  }
  // selectedMenu(type) {
  //   if (type == 'user') {
  //     if (
  //       this.router.url.includes('user') ||
  //       this.router.url.includes('admin')
  //     ) {
  //       return true;
  //     }
  //   } else if (type == 'company') {
  //     if (this.router.url.includes('comp')) {
  //       return true;
  //     }
  //   } else if (type == 'setup') {
  //     if (this.router.url.includes('set')) {
  //       return true;
  //     }
  //   } else {
  //     return false;
  //   }
  // }
}
