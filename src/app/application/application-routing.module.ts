import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AllApplicationsComponent } from './allapplications/allapplications.component';
import { AllapprovalsComponent } from './allapprovals/allapprovals.component';
import { AllcompaniesComponent } from './allcompanies/allcompanies.component';
import { MydeskComponent } from './mydesk/mydesk.component';
import { ProcessApplicationComponent } from './process-application/process-application.component';
import { ViewApplicationComponent } from './viewapplication/viewapplication.component';

const routes: Routes = [
  { path: 'allcompanies', component: AllcompaniesComponent },
  { path: 'allapplications', component: AllApplicationsComponent },
  { path: 'process-application/:year', component: ProcessApplicationComponent },
  { path: 'viewapplication', component: ViewApplicationComponent },
  { path: 'allapprovals', component: AllapprovalsComponent },
  { path: 'mydesk', component: MydeskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
