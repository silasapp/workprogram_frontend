import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ApplicationComponent } from './application/application.component';
import { GeneralReportComponent } from './general-report/general-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    component: CompanyComponent,
    path: 'application',
    loadChildren: () =>
      import('./application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'company',
    component: CompanyComponent,
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'reports',
    component: CompanyComponent,
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'generalreport',
    component: GeneralReportComponent,
    loadChildren: () =>
      import('./general-report/general-report.module').then(
        (m) => m.GeneralReportModule
      ),
  },
  {
    path: 'admin',
    component: CompanyComponent,
    loadChildren: () =>
      import('./application/application.module').then(
        (m) => m.ApplicationModule
      ),
  },

  {
    path: 'schedule',
    component: CompanyComponent,
    loadChildren: () =>
      import('./presentation-schedule/presentation-schedule.module').then(
        (m) => m.PresentationScheduleModule
      ),
  },
  {
    path: 'performance_evaluation',
    component: CompanyComponent,
    loadChildren: () =>
      import('./performance-evaluation/performance-evaluation.module').then(
        (m) => m.PerformanceEvaluationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
