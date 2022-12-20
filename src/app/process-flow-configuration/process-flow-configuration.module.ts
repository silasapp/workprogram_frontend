import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationProcessFlowConfigurationComponent } from './application-process-flow-configuration/application-process-flow-configuration.component';
import { ProcessFlowConfigurationRoutingModule } from './process-flow-configuration-routing/process-flow-configuration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddProcessFlowFormComponent } from './application-process-flow-configuration/add-process-flow/add-process-flow-form.component';
import { DeleteProcessFlowComponent } from './application-process-flow-configuration/delete-process-flow-form/delete-process-flow.component';

@NgModule({
  declarations: [
    ApplicationProcessFlowConfigurationComponent,
    AddProcessFlowFormComponent,
    DeleteProcessFlowComponent,
  ],
  imports: [
    CommonModule,
    ProcessFlowConfigurationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ProcessFlowConfigurationModule {}
