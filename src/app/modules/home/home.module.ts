import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SidebarComponent } from 'src/app/common/components/sidebar/sidebar.component';
import { LoginComponent } from 'src/app/common/components/login/login.component';
import { ResetPwdComponent } from '../../common/components/reset-pwd/reset-pwd.component';
import { CompaniesComponent } from '../../common/components/companies/companies.component';
import { AddCompanyFormComponent } from '../../common/components/add-company-form/add-company-form.component';
import { CompanyDetailsComponent } from '../../common/components/company-details/company-details.component';
import { UserManagementComponent } from '../../common/components/user-management/user-management.component';
import { AddUserFormComponent } from '../../common/components/add-user-form/add-user-form.component';
import { UserDetailsComponent } from '../../common/components/user-details/user-details.component';
import { SetupConfigComponent } from '../../common/components/setup-config/setup-config.component';
import { EmployeesComponent } from '../../common/components/employees/employees.component';
import { AddEmployeeFormComponent } from '../../common/components/add-employee-form/add-employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OtpComponent } from 'src/app/common/components/otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { CreatePwdComponent } from '../../common/components/create-pwd/create-pwd.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NavbarComponent } from '../../common/components/navbar/navbar.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    LoginComponent,
    ResetPwdComponent,
    CompaniesComponent,
    AddCompanyFormComponent,
    CompanyDetailsComponent,
    UserManagementComponent,
    AddUserFormComponent,
    UserDetailsComponent,
    SetupConfigComponent,
    EmployeesComponent,
    AddEmployeeFormComponent,
    OtpComponent,
    CreatePwdComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    NgOtpInputModule,
    ProgressBarModule,
    ToastModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
  ],
})
export class HomeModule {}
