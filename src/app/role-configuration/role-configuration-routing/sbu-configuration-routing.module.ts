import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleConfigurationComponent } from '../role-configuration/role-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: RoleConfigurationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleConfigurationRoutingModule {}
