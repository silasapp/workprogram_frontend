import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '../../../../admin-routing.module';
import { AddUsersComponent } from '../../admin/add-users/add-users.component';
import { AddConcessionComponent } from '../../admin/add-concession.component';
import { UploadedCompanyComponent } from '../../admin/uploaded-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UpdateUserComponent } from '../../admin/add-users/update-user/update-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UploadCodeComponent } from '../../admin/upload-code/uploadcode.component';
import { ReportEditorComponent } from '../../admin/report-editor/reporteditor.component';




@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [
    AddUsersComponent,
    AddConcessionComponent,
    UploadedCompanyComponent,
    UpdateUserComponent,
    UploadCodeComponent,
    ReportEditorComponent,

  ]
})
export class AdminModule { }
