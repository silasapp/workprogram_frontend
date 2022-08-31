import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DivisionComponent } from './division/division.component';
import { ScribesAndChairmenComponent } from './scribes-and-chairmen/scribes-and-chairmen.component';

const routes: Routes = [
  {
    path: "scribes",
    component: ScribesAndChairmenComponent
  },
  {
    path: "divisional",
    component: DivisionComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationScheduleRoutingModule { }
