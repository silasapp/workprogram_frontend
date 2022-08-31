import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SWPHseComponent } from './hse.component';
import { SWPScdpComponent } from './scdp.component';

const routes: Routes = [
{
  path: '',
  component: SWPHseComponent
},
{
    path: 'hse',
    component: SWPHseComponent
},
{
  path: 'scdp',
  component: SWPScdpComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Step5RoutingModule { }
