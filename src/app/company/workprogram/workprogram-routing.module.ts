import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BoardComponent} from './board.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';

const routes: Routes = [
{
  path: '',
  component: BoardComponent
},
{
  path: 'step1',
  component: Step1Component,
  loadChildren: () => import('./step1/step1.module').then(m => m.Step1Module)
},
{
  path: 'step2',
  component: Step2Component,
  loadChildren: () => import('./step2/step2.module').then(m => m.Step2Module)
},
{
  path: 'step3',
  component: Step3Component,
  loadChildren: () => import('./step3/step3.module').then(m => m.Step3Module)
},
{
  path: 'step4',
  component: Step4Component,
  loadChildren: () => import('./step4/step4.module').then(m => m.Step4Module)
},
{
  path: 'step5',
  component: Step5Component,
  loadChildren: () => import('./step5/step5.module').then(m => m.Step5Module)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkProgramRoutingModule { }
