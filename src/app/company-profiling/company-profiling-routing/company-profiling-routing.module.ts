import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfilingComponent } from '../company-profiling/company-profiling.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyProfilingComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyProfilingRoutingModule {}
