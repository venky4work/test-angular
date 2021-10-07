import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit {
  tabIndex: number = 1;
  companyDetails: any = {};
  companyId: number;
  isCompanyDataLoaded: boolean

  constructor(private router: Router, private companyService: CompanyService) { }

  async ngOnInit() {
    this.companyId = Number(sessionStorage.getItem('comp_id'));
    await this.companyService.getCompanyById(this.companyId).toPromise().then((res: any) => {
      console.log(res)
      if (res) {
        this.companyDetails = res
        this.isCompanyDataLoaded = true
      }
    }, error => { this.isCompanyDataLoaded = true })
  }

  onCancelClick() {
    this.router.navigate(['/companies']);
  }

  switchActiveTabs(tabIndex) {
    this.tabIndex = tabIndex;
  }

  editCompany() {
    this.router.navigate(['add-company'])
  }
}
