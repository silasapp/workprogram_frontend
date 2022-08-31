import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { LoginComponent } from './login.component';
import { NewUserComponent } from './newuser.component';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangeCompanyCodeComponent } from './changecompanycode.component';
import { CompanyResourceComponent } from './companyresource.component';

@NgModule({
    imports: [CommonModule, AccountRoutingModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, HttpClientModule],
    declarations: [LoginComponent, NewUserComponent, ForgotPasswordComponent, ChangeCompanyCodeComponent, CompanyResourceComponent],
})
export class AccountModule {}
