import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AllApplicationsComponent } from './allapplications/allapplications.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { ViewApplicationComponent } from './viewapplication/viewapplication.component';
import { MydeskComponent } from './mydesk/mydesk.component';
import { AllcompaniesComponent } from './allcompanies/allcompanies.component';
import { ProcessApplicationComponent } from './process-application/process-application.component';
import { AllapprovalsComponent } from './allapprovals/allapprovals.component';
import { PushApplicationFormComponent } from './process-application/push-application-form/push-application-form.component';
import { SendBackFormComponent } from './process-application/send-back-form/send-back-form.component';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ApproveFormComponent } from './process-application/approve-form/approve-form.component';
import { ViewApplicationDataComponent } from './process-application/view-application-data/view-application-data.component';

@NgModule({
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    //NgMultiSelectDropDownModule,
  ],
  declarations: [
    AllApplicationsComponent,
    ProcessApplicationComponent,
    ViewApplicationComponent,
    MydeskComponent,
    AllcompaniesComponent,
    AllapprovalsComponent,
    PushApplicationFormComponent,
    SendBackFormComponent,
    ApproveFormComponent,
    ViewApplicationDataComponent,
  ],
})
export class ApplicationModule {}
