import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { ConcessionsfieldsComponent } from './dashboard/concessionsfields.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './dashboard/landing.component';
import { ResetPasswordComponent } from './dashboard/resetpassword.component';
import { BoardComponent } from './workprogram/board.component';

const routes: Routes = [
{
  path: '',
  component: DashboardComponent
},
{
  path: 'presentation',
  loadChildren: () => import('./presentation/presentation.module').then(m => m.PresentationModule)
},
{
  path: 'details',
  component: CompanyDetailsComponent
},
{
  path: 'concessionsfields',
  component: ConcessionsfieldsComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},

{
  path: 'landing',
  component: LandingComponent
},

{
  path: 'resetpassword',
  component: ResetPasswordComponent
},

{
  path: 'reports',
  loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule)
},

{
  path: 'workprogram',
  loadChildren: () => import('./workprogram/workprogram.module').then(m => m.WorkProgramModule)
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
