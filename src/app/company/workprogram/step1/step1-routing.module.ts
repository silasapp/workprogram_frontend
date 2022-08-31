import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SWPConcessionSituationComponent} from './concession-situation.component';
import { SWPDrillingOperationsComponent } from './drilling-operations.component';
import { SWPGeophysicalActivitiesComponent } from './geophysical-activities.component';

const routes: Routes = [
{
  path: '',
  component: SWPConcessionSituationComponent
},
{
    path: 'concessionsituation',
    component: SWPConcessionSituationComponent
},
{
  path: 'drillingoperation',
  component: SWPDrillingOperationsComponent
},
{
    path: 'geophysicalactivities',
    component: SWPGeophysicalActivitiesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step1RoutingModule { }
