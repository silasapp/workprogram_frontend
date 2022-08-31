import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SWPFieldDevelopmentComponent } from './field-development.component';
import { SWPGasProductionComponent } from './gas-production-activities.component';
import { SWPInitialWellCompletionComponent } from './initial-well-completion.component';
import { SWPProductionOilComponent } from './production-oil.component';
import { SWPReserveUpdateComponent } from './reserves-update-mmbls.component';
import { SWPWorkoverRecompletionComponent } from './workover-recompletion.component';
import { OilGasProductionActivitiesComponent } from './oil-gas-production-activities.component';

const routes: Routes = [
{
  path: '',
  component: SWPInitialWellCompletionComponent
},
{
    path: 'initialwellcompletion',
    component: SWPInitialWellCompletionComponent
},
{
  path: 'workoverrecompletion',
  component: SWPWorkoverRecompletionComponent
},
{
    path: 'fielddevelopmentplan',
    component: SWPFieldDevelopmentComponent
},
{
  path: 'oilgasproductionactivities',
  component: OilGasProductionActivitiesComponent
},
{
  path: 'gasproductionactivities',
  component: SWPGasProductionComponent
},
{
  path: 'reservesupdate',
  component: SWPReserveUpdateComponent
},
{
  path: 'productionoil',
  component: SWPProductionOilComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step2RoutingModule { }
