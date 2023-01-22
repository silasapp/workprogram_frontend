import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationProcessFlowConfigurationComponent } from '../application-process-flow-configuration/application-process-flow-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationProcessFlowConfigurationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessFlowConfigurationRoutingModule {}
