import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SWPNigeriaContentComponent } from './nigeriacontent.component';
import { SWPStrategicPlansComponent } from './strategicplans.component';
import { SWPLegalProceedingsComponent } from './legalproceedings.component';

const routes: Routes = [
{
  path: '',
  component: SWPNigeriaContentComponent
},
{
    path: 'nigeriacontent',
    component: SWPNigeriaContentComponent
},
{
  path: 'strategicplans',
  component: SWPStrategicPlansComponent
},
{
    path: 'legalproceedings',
    component: SWPLegalProceedingsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step4RoutingModule { }
