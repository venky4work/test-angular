import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CompanyService } from 'src/app/services/company.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CompaniesComponent implements OnInit {
  searchKey: any;
  companyStatus: any;
  companyList: any = [];
  currentUser: any;
  isSuperAdmin: boolean;
  allCompanyList: any = [];

  constructor(
    private companyService: CompanyService,
    private authService: AuthenticateService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    sessionStorage.removeItem("comp_id")
    this.currentUser = JSON.parse(sessionStorage.getItem('cur_user'));
    if (this.currentUser.roleId === 1) {
      this.isSuperAdmin = true;
    }
    this.companyStatus = 1;
    this.companyService
      .getCompanyDashboard()
      .toPromise()
      .then((res: any) => {
        console.log(res);
        this.companyList = res;
        this.allCompanyList = res;
      });
  }

  onChangeStatus(event) {
    let filterCo;
    console.log(event);
    if (event == 1) {
      console.log('active');
      this.companyList = this.allCompanyList.filter((company) => {
        return company?.isActive;
      });
    } else {
      console.log('inactive');
      this.companyList = this.allCompanyList.filter((company) => {
        return !company?.isActive;
      });
    }
  }

  viewCompanyDetails(companyId) {
    sessionStorage.setItem('comp_id', companyId);
    this.router.navigate(['/company-details']);
  }

  viewProfile() { }

  onLogout(event) {
    console.log(event);
    if (event) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to logout?',
        header: 'Logout',
        accept: () => {
          this.confirmLogout();
        },
        reject: (type) => { },
      });
    }
  }

  confirmLogout() {
    this.authService
      .logout()
      .toPromise()
      .then((res: any) => {
        console.log(res);
        if (res.results === 'Success') {
          sessionStorage.clear();
          this.router.navigate(['login']);
        }
      });
  }
}
