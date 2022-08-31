import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Colum } from './colum';
import { SeismicActivitiesApprovedComponent } from './seismic-activities.component';

const routes: Routes = [
{
  path: '',
  component: Colum
},
{path: 'seismic',
component: SeismicActivitiesApprovedComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralReportRoutingModule { }
