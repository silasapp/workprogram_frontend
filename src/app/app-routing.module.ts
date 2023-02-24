import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ApplicationComponent } from './application/application.component';
import { GeneralReportComponent } from './general-report/general-report.component';
import { VideoGuideComponent } from './video-guide/video-guide.component';

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
    path:'video-guide',
    component: VideoGuideComponent
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
      import('./admin/admin.module').then((m) => m.AdminModule),
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
  {
    path: 'process-flow-configuration',
    component: CompanyComponent,
    loadChildren: () =>
      import(
        './process-flow-configuration/process-flow-configuration.module'
      ).then((m) => m.ProcessFlowConfigurationModule),
  },
  {
    path: 'sbu-configuration',
    component: CompanyComponent,
    loadChildren: () =>
      import('./sbu-configuration/sbu-configuration.module').then(
        (m) => m.SBUConfigurationModule
      ),
  },
  {
    path: 'role-configuration',
    component: CompanyComponent,
    loadChildren: () =>
      import('./role-configuration/role-configuration.module').then(
        (m) => m.RoleConfigurationModule
      ),
  },
  {
    path: 'manage-applications',
    component: CompanyComponent,
    loadChildren: () =>
      import('./manager-applications/manage-applications.module').then(
        (m) => m.ManageApplicationsModule
      ),
  },
  {
    path: 'company-profiling',
    component: CompanyComponent,
    loadChildren: () =>
      import('./company-profiling/company-profiling.module').then(
        (m) => m.CompanyProfilingModule
      ),
  },
  {
    path: 'admin-manage-applications',
    component: CompanyComponent,
    loadChildren: () =>
      import(
        './admin-manage-applications/admin-manage-applications.module'
      ).then((m) => m.AdminManageApplicationsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
