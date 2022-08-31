import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddConcessionComponent } from './add-concession/add-concession.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { UploadedCompanyComponent } from './uploaded-company/uploaded-company.component';

const routes: Routes = [

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
