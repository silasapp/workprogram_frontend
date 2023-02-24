import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageApplicationsRoutingModule } from './manage-applications-routing/manage-applications-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { MoveApplicationFormComponent } from './manage-applications/move-application/move-application-form.component';
import { DeleteProcessFlowComponent } from './manage-applications/delete-process-flow-form/delete-process-flow.component';
import { GetRolenamePipe } from './manage-applications/get-rolename.pipe';
import { GetNoOfJobsOnDeskPipe } from './manage-applications/get-no-of-jobs-on-desk.pipe';
import { GetNoOfJobsProcessedPipe } from './manage-applications/get-no-of-jobs-processed.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    ManageApplicationsComponent,
    MoveApplicationFormComponent,
    DeleteProcessFlowComponent,
    GetRolenamePipe,
    GetNoOfJobsOnDeskPipe,
    GetNoOfJobsProcessedPipe,
  ],
  providers: [GetRolenamePipe],
  imports: [
    CommonModule,
    ManageApplicationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class AdminManageApplicationsModule {}
