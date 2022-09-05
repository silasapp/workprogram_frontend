import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Colum } from './colum';
import { ExecutiveSummaryComponent } from './executive-summary.component';
import { SeismicActivitiesApprovedComponent } from './seismic-activities.component';
import { SeismicDataApprovedPreviousComponent } from './seismic-data-approved-previous.component';

const routes: Routes = [
{
  path: '',
  component: ExecutiveSummaryComponent
},
{
  path: 'seismic',
  component: SeismicActivitiesApprovedComponent
},
{
  path: 'seismicprevious',
  component: SeismicDataApprovedPreviousComponent
},
{
  path: 'executivesummary',
  component: ExecutiveSummaryComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralReportRoutingModule { }
