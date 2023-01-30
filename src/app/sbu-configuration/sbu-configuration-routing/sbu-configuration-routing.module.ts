import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SBUConfigurationComponent } from '../sbu-configuration/sbu-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: SBUConfigurationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SBUConfigurationRoutingModule {}
