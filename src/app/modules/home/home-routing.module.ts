import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyFormComponent } from 'src/app/common/components/add-company-form/add-company-form.component';
import { CompaniesComponent } from 'src/app/common/components/companies/companies.component';
import { CompanyDetailsComponent } from 'src/app/common/components/company-details/company-details.component';
import { CreatePwdComponent } from 'src/app/common/components/create-pwd/create-pwd.component';
import { LoginComponent } from 'src/app/common/components/login/login.component';
import { OtpComponent } from 'src/app/common/components/otp/otp.component';
import { ResetPwdComponent } from 'src/app/common/components/reset-pwd/reset-pwd.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPwdComponent },
  { path: 'enter-otp', component: OtpComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'create-pwd', component: CreatePwdComponent },
  { path: 'add-company', component: AddCompanyFormComponent },
  { path: 'company-details', component: CompanyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
