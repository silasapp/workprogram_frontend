import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppraisalWellsComponent } from './appraisal-wells.component';
import { DevelopmentWellsComponent } from './development-wells.component';
import { ExecutiveSummaryComponent } from './executive-summary.component';
import { ExplorationWellsComponent } from './exploration-wells.component';
import { MonthlyOilProductionComponent } from './monthly-oil-production.component';
import { OilProductionContractComponent } from './oil-production-contract.component';
import { OilProductionComponent } from './oil-production.component';
import { ReserveUpdateComponent } from './reserves-update.component';
import { SeismicActivitiesApprovedComponent } from './seismic-activities.component';
import { SeismicDataApproved2yrsagoComponent } from './seismic-data-approved-2yrsago.component';
import { SeismicDataApprovedPreviousComponent } from './seismic-data-approved-previous.component';
import { SeismicProcessingCurrentComponent } from './seismic-process-current.component';
import { SeismicProcessingPreviousComponent } from './seismic-processing-previous.component';

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
  path: 'seismic2yrsago',
  component: SeismicDataApproved2yrsagoComponent
},
{
  path: 'seismicprocessingcurrent',
  component: SeismicProcessingCurrentComponent
},
{
  path: 'seismicprocessingprevious',
  component: SeismicProcessingPreviousComponent
},
{
  path: 'exploration',
  component: ExplorationWellsComponent
},
{
  path: 'appraisal',
  component: AppraisalWellsComponent
},
{
  path: 'development',
  component: DevelopmentWellsComponent
},
{
  path: 'executivesummary',
  component: ExecutiveSummaryComponent
},
{
  path: 'reservesupdate',
  component: ReserveUpdateComponent
},
{
  path: 'oilproduction',
  component: OilProductionComponent
},
{
  path: 'oilproductioncontract',
  component: OilProductionContractComponent
},
{
  path: 'monthlyoilproduction',
  component: MonthlyOilProductionComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralReportRoutingModule { }
