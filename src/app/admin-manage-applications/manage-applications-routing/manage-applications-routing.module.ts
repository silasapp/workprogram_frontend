import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageApplicationsComponent } from '../manage-applications/manage-applications.component';

const routes: Routes = [
  {
    path: '',
    component: ManageApplicationsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageApplicationsRoutingModule {}
