import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SWPBudgetPerformanceComponent } from './budget-performance.component';
import { SWPBudgetProposalComponent } from './budget-proposal.component';
import { SWPOilAndGasFacilityMaintenanceComponent } from './oil-and-gas-facility-maintenance.component';

const routes: Routes = [
{
  path: '',
  component: SWPBudgetPerformanceComponent
},
{
    path: 'budgetperformance',
    component: SWPBudgetPerformanceComponent
},
{
  path: 'budgetproposal',
  component: SWPBudgetProposalComponent
},
{
    path: 'oilandgasfacilitymaintenance',
    component: SWPOilAndGasFacilityMaintenanceComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step1RoutingModule { }
