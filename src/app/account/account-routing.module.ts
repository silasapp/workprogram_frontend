import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeCompanyCodeComponent } from './changecompanycode.component';
import { CompanyResourceComponent } from './companyresource.component';
import { ForgotPasswordComponent } from './forgotpassword.component';

import { LoginComponent } from './login.component';
import { NewUserComponent } from './newuser.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  { path: 'login', component: LoginComponent},
  { path: 'newuser', component: NewUserComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'changecompanycode', component: ChangeCompanyCodeComponent},
  { path: 'companyresource', component: CompanyResourceComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
