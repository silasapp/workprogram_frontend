import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddConcessionComponent } from './add-concession.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParameterConfigComponent } from './parameterconfig/parameter.component';
import { UploadCodeComponent } from './upload-code/uploadcode.component';
import { UploadedCompanyComponent } from './uploaded-company.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/uploaded_company',
    pathMatch: 'full'
  },
  {
    path: 'uploaded_company',
    component: UploadedCompanyComponent,
  },
  {
    path: 'add_users',
    component: AddUsersComponent
  },
  {
    path: 'add_concession',
    component: AddConcessionComponent
  },
  {
    path: 'upload_code',
    component: UploadCodeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'report_editor',
    component: UploadCodeComponent
  },
  {
    path: 'parameter_config',
    component: ParameterConfigComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
